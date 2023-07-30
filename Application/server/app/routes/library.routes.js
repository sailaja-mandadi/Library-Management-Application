module.exports = app => {
  const book_controller = require("../controllers/book.controller.js");
  const borrower_controller = require("../controllers/borrower.controller.js");
  const bookLoan_controller = require("../controllers/bookLoan.controller.js");
  const fines_controller = require("../controllers/fines.controller.js")
  var router = require("express").Router();

  //Search books with given title or ISBN or Author Name 
  router.get("/books", book_controller.getBooks);
  //Create new borrower
  router.post("/borrower", borrower_controller.newBorrower);
  //Create new tuple in Book Loans
  router.post("/book-loan", bookLoan_controller.newBookLoan);
  //Get Book Loans Tuple
  router.get("/book-loan", bookLoan_controller.getBookLoans);
  //Update Check In
  router.put("/book-loan", bookLoan_controller.putBookLoan);

  //To daily refresh
  router.post("/fines", fines_controller.newAll);

  router.get("/fines/all", fines_controller.getAll);
  router.get("/fines/unpaid", fines_controller.getUnpaid);

  router.get("/fines/card", fines_controller.getByCId);

  router.put("/fines/card", fines_controller.putByCId);

  router.put("/fines/loan", fines_controller.putByLId);



  app.use('/api/library', router);
};
