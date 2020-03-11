const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const Category = require("../../models/Categories");
const TaxRate = require("../../models/TaxRate");
router.get("/findCategories", (req, res) => {

  Category.find().then(category => {
    res.json(category)

  });
});

router.get("/getTax", (req, res) => {
TaxRate.find().then(taxrate => {
  res.json(taxrate)

});
});


    

router.post("/addcategories", (req, res) => {
  console.log(req.body)
  const newcategory = new Category({
    categoryname: req.body.categoryname,
    categoryparent: req.body.categoryparent,
    categorysort: req.body.categorysort,

  });
  newcategory.save().then(category => {
    res.status(200).json(category);
  })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });

})


module.exports = router;