var mongoose = require('mongoose-q')(require('mongoose',{spread:true}));
var Schema = mongoose.Schema;

var Post = new Schema({
  title: {type: String, unique: true},
  createDate: Date,
  post: String,
  comments: [
    {
      comment: String,
      author: String,
      createDate: Date
    }
  ]
});


module.exports = mongoose.model('posts', Post);
