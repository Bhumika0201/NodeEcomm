

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

module.exports = function () {

 

  var FbUserSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {
      type: String, required: true,
      trim: true, unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    facebookProvider: {
      type: {
        id: String,
        token: String
      },
      select: false
    }
  });

  FbUserSchema.set('toJSON', {getters: true, virtuals: true});

  FbUserSchema.statics.upsertFbUser = function(accessToken, refreshToken, profile, cb) {
    var that = this;
    return this.findOne({
      'facebookProvider.id': profile.id
    }, function(err, user) {
      // no user was found, lets create a new one
      if (!user) {
        var newUser = new that({
          fullName: profile.displayName,
          email: profile.emails[0].value,
          facebookProvider: {
            id: profile.id,
            token: accessToken
          }
        });

        newUser.save(function(error, savedUser) {
          if (error) {
            console.log(error);
          }
          return cb(error, savedUser);
        });
      } else {
        return cb(err, user);
      }
    });
  };

  mongoose.model('FbUser', FbUserSchema);

};