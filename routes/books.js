const router = require("express").Router();
const Book = require('../models/Book');
const Author = require('../models/Author');

router.get('/books', (req, res) => {
  // get all the books from the database -> find() returns all the documents
  Book.find().then(booksFromDB => {
    // console.log(booksFromDB);
    const books = booksFromDB.filter(book=>{
      // console.log("our book is:  ", typeof book.owner, typeof req.session.user._id );
      return book.owner == req.session.user._id;
    })
    // console.log("books:  ", books );
    // render a books view to display them
  
    res.render('books', { booksList: books, user: req.session.user })
  }).catch(err => {
    console.log(err);
  })
})

router.post('/books', (req, res) => {
  const { title, author, description, rating } = req.body; 
  const user = req.session.user._id;
console.log(" our user is: ", user);
  Book.create({
    title: title,
    author: author,
    description: description,
    rating: rating,
    owner: user
  })
    .then(book => {
      console.log('this book was just created: ', book);
      res.redirect(`/books/${book._id}`)
      // res.render('bookDetails', { bookDetails: book });
    })
})

router.get('/books/delete/:id', (req, res) => {
  const bookId = req.params.id;
  Book.findByIdAndDelete(bookId)
    .then(() => {
      // redirect to the books list
      res.redirect('/books')
    })
    .catch(err => {
      console.log(err);
    })
})

router.get('/books/edit/:id', (req, res) => {
  const bookId = req.params.id;
  Book.findById(bookId)
    .then(bookFromDB => {
      console.log(bookFromDB);
      res.render('bookEdit', { book: bookFromDB });
    })
})

router.get('/books/add', (req, res) => {
  // to render the select we also need all the authors in the view
  Author.find()
    .then(authorsFromDB => {
      res.render('bookForm', { authors: authorsFromDB });
    })
    .catch(err => {
      console.log(err);
    })
})

router.get('/books/:id', (req, res) => {
  const bookId = req.params.id;
  // get the book with this id
  // we need to call populate to replace the id of the author in the 'author' field
  // with all the information from the author model
  Book.findById(bookId)
    .populate('author')
    .then(book => {
      console.log(book);
      // render a book details view
      res.render('bookDetails', { bookDetails: book });
    })
})

router.post('/books/edit/:id', (req, res) => {
  const bookId = req.params.id;
  const user = req.session.user._id;
  const { title, author, description, rating, comments } = req.body; 
  Book.findByIdAndUpdate(bookId, {
    title: title,
    description: description,
    author: author,
    rating: rating,
    }, { $push: { reviews: { user: user, comments: comments } } })
    .then(book => {
      console.log("This is Write Any Notes: ", comments);
      res.redirect(`/books/${bookId}`);
    })
    .catch(err => {
      console.log(err);
    })
})

router.post('/books/:id/reviews', (req, res) => {
  const bookId = req.params.id;
  const user = req.session.user._id;
  const comments = req.body.comments;
  console.log(user, comments);
  // const { user, comments } = req.body;
  // here we add the reviews from the form to the reviews array in the book document
  Book.findOneAndUpdate({ _id: bookId }, { $push: { reviews: { user: user, comments: comments } } })
    .then(() => {
      res.redirect(`/books/${bookId}`);
    })
    .catch(err => {
      console.log(err);
    })
})

module.exports = router;