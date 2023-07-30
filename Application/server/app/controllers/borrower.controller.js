const borrower_model = require("../models/borrower.model.js");

// Create and Save a new borrower
exports.newBorrower = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    let borrower;
    // Create a new Borrower
    if(typeof req.body.phone == 'undefined') {
        borrower = new borrower_model({
        name: req.body.fname + '_' + req.body.lname,
        ssn: req.body.ssn.substr(0,3)+'-'+req.body.ssn.substr(3,2)+'-'+req.body.ssn.substr(5,4),
        address:  req.body.address + ',' + req.body.city + ',' + req.body.state,
        phone: req.body.phone
        });
    }
    else
    {
        borrower = new borrower_model({
            name: req.body.fname + '_' + req.body.lname,
            ssn: req.body.ssn.substr(0,3)+'-'+req.body.ssn.substr(3,2)+'-'+req.body.ssn.substr(5,4),
            address:  req.body.address + ',' + req.body.city + ',' + req.body.state,
            phone: '('+req.body.phone.substr(0,3)+') '+req.body.phone.substr(3,3)+'-'+req.body.phone.substr(5,4)
          });

    }

    // Save borrower in the database
    borrower_model.createBorrower(borrower, (err, data) => {
      if (err){
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the borrower."
        });
      }
      else res.send(data);
    });
};
