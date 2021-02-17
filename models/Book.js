const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  owner:{
    type: Schema.Types.ObjectId,
    ref: 'User.model' // that is the name  of the model that this id refers to
  },
  title: String,
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author' // that is the name  of the model that this id refers to
  },
  rating: Number,
  pictureUrl: String,
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User.model' // that is the name  of the model that this id refers to
      },
      comments: String
    }
  ]
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;