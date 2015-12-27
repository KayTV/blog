var mongoose = require('mongoose-q')(require('mongoose',{spread:true}));
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  username: {type: String, unique:true},
  password: String,
  posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
      }],
  admin: Boolean
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);