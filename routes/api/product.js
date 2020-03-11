const express = require("express");
const router = express.Router();
var fs = require('fs');
let productId;

const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage')
let storage = new GridFsStorage({
    url: "mongodb://127.0.0.1:27017/ecomm",
    file: (req, file) => {
        return {
            bucketName: 'test',       //Setting collection name, default name is fs
            filename: file.originalname     //Setting file name to original name of file
        }
    }
});

// Load User model
const Products = require("../../models/product");
const DeliveryInfo = require("../../models/DeliveryInfo");

// @route POST api/users/register
// @desc Register user
let upload = multer();
router.post("/addDeliveryInfo", (req, res) => {
    console.log(req.body)
    //console.log(req.file)
    const newDeliveryInfo = new DeliveryInfo ({
        user: req.body.user,
        products: req.body.products,
        address: req.body.address,
      
       

    });
    newDeliveryInfo
        .save()
        .then((deliveryinfo) => {
            res.json(deliveryinfo), 
                console.log(deliveryinfo._id),
                deliveryId = deliveryinfo._id
        })
        .catch(err => console.log(err));


});

router.post("/addProduct", upload.single('uploadedfile'), (req, res) => {
    console.log(req.body)
    //console.log(req.file)
    const newProduct = new Products({
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productQuatity: req.body.productQuatity,
        productSeller: req.body.productSeller,
        productSubCategory: req.body.productSubCategory,
        productCategory: req.body.productCategory,
        productDescription: req.body.productDescription,
        sgst: req.body.sgst,
        cgst: req.body.cgst,
        igst: req.body.igst,
        hsnCode: req.body.hsncode,
      //   photos: { photo:'' }
        // img:req.file.buffer,

    });
    newProduct
        .save()
        .then((product) => {
            res.json(product), 
                console.log(product._id),
                productId = product._id
        })
        .catch(err => console.log(err));


});

router.post("/uploadPhoto",upload.single('uploadedfile'), (req, res) => {
    console.log(req.file);
    
    Products
        .findOneAndUpdate(
            {_id : productId },
            
            {$push: {
                photos:  req.file.buffer ,
               // productName: 'bhumika'
            
            }},
           
        )
        .then((product) => {
            res.json(product)
               
        })
        .catch(err => console.log(err));


});

router.get("/productlist", (req, res) => {

    Products.find().then((product) => {
        res.json(product)
           
    })
    .catch(err => console.log(err));
});

router.post("/productlistcategorywise", (req, res) => {
    console.log(req.body)
    var query = req.body;
    Products.find(query).then((product) => {
        res.json(product)
           
    })
    .catch(err => console.log(err));

   
});



router.post("/searchTerms", (req, res) => {
    console.log(req.body.searchTerm);
    
   
    //Products.createIndex( { productName: "text", productCategory: "text" ,productDescription:"text"} )

    Products.find({ $text: { $search: req.body.searchTerm} }).then((product) => {
        res.json(product)
           
    })
    .catch(err => console.log(err));

   
});
router.post("/findbyId", (req, res) => {
    console.log(req.body.idString);
    
   
    //Products.createIndex( { productName: "text", productCategory: "text" ,productDescription:"text"} )

    DeliveryInfo.find({ $text: { $search: req.body.idString} }).then((deliveryinfo) => {
        console.log(deliveryinfo)
           
    })
    .catch(err => console.log(err));

   
});


router.get('/productDetail/:id', (req, res) => {
    let id = req.params.id;
    Products.findById(id).then((product) => {
        res.json(product)
           
    })
    .catch(err => console.log(err));
});


module.exports = router;