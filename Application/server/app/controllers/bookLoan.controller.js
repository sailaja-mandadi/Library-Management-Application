const bookLoan_model = require("../models/bookLoan.model.js");

// Create and Save a new borrower
exports.newBookLoan = (req, res) => {
    // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a new Borrower
  const bookLoan = new bookLoan_model({
          Isbn: req.body.Isbn ,
          Card_id: req.body.Card_id,
        });
  // Save bookLoan in the database
  bookLoan_model.createBookLoan(bookLoan, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while inserting the book loan record."
      });
    else res.send(data);
  });
};

exports.getBookLoans = (req, res) => {
  const search_val = req.query.search_val;

  bookLoan_model.findBookLoans(search_val, (err, data) => {
    //console.log(id);
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving book loans."
      });
    else res.send(data);
  });
};

exports.putBookLoan = (req, res) => {
  // Validate Request
  const id = req.query.id;
  if(typeof req.query.date_in == 'undefined' ) date_in = 0;
  else date_in = req.query.date_in;
  bookLoan_model.updateBookLoan(id ,date_in, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Book Loan with id ${id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Book Loan with id " + id
          });
        }
      } else res.send(data);
    }
  );
};
