const book_model = require("../models/book.model.js");

exports.getBooks = (req, res) => {
  const search_val = req.query.search_val;

  book_model.findBooks(search_val, (err, data) => {
    //console.log(id);
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};