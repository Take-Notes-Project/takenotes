const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  description: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author' // that is the name  of the model that this id refers to
  },
  rating: Number,
  reviews: [
    {
      user: String,
      comments: String
    }
  ]
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;