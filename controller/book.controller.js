const req = require("express/lib/request");
let Book = require("../model/book.model");
const res = require("express/lib/response");

// create and save book
exports.create = (req, res, next) => {
  const book = new Book({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
  });

  book
    .save()
    .then((data) => {
      console.log(data);
      return res.status(200).send({
        message: "book added successfully",
        // data:{data}
      });
      res.render("/allBooks");
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "something error occured while creating book",
      });
    });


};

// retrive all books from data base

exports.findAll = (req, res) => {
  Book.find()
    .then((books) => {
      return res.status(200).send({
        message: "",
        data: books,
      });

      return res.send(books);
      res.json(books);
      res.render("/");
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "some error",
      });
      console.log(err);
    });
};

//get book by ID
exports.find_by_id = (req, res) => {
  Book.findById(req.params.id)
    .then((books) => {
      res.send(books);
      // res.json(books);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error",
      });
    });
};

//update book by id
exports.update_by_id = (req, res) => {
  Book.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then((data) => {
      console.log(data);
      return res
        .status(200)
        .send({message: "book updated successfully"});
      res.render("/allBooks");
      // console.log("book updated successfull");
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "some error",
      });
    });
};

// delete book
exports.deleteBook = (req, res) => {
  Book.findByIdAndRemove(req.params.id)
    .then((books) => {
      res.status(200).send({
        message: "book deleted successfully",
      });
      // res.send('book deleted successfully');
      // res.json(book);

      // res.send(books + 'book deleted successfully');
      // console.log("book deleted successfull");
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "some error",
      });
    });
};
