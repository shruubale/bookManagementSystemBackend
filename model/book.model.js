const mongoose = require("mongoose");

const Book = mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  
},
{
    collection:'books'
});
module.exports = mongoose.model("Book", Book);
