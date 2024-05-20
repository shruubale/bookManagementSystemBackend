module.exports =(app) =>{
    const book = require('../controller/book.controller');

    //create  a book
    app.post('/add-book',book.create);

    // retrive all books 
    app.get('/allBooks',book.findAll);

    //find by id
    app.get('/get-book/:id',book.find_by_id);

    // update book
    app.put('/update-book/:id',book.update_by_id);

    //delete book
    app.delete('/delete-book/:id',book.deleteBook);
}  
