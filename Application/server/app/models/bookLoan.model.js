const sql = require("./db.js");

// constructor
const bookLoan = function(input) {
  this.Isbn = input.Isbn ;
  this.Card_id = input.Card_id;
  this.ip = input.search_val;
};

bookLoan.createBookLoan = (bookLoan, result) => {
    sql.query(`SELECT IF(EXISTS(SELECT Date_in from Book_loans where  Book_loans.Isbn = '${bookLoan.Isbn}' order by Loan_id DESC limit 0,1) AND 
    (SELECT Date_in from Book_loans where  Book_loans.Isbn =  '${bookLoan.Isbn}' order by Loan_id DESC limit 0,1) is null,0,1) as flag`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
           console.log("testhere:",res, );
          
          if (res[0].flag === 0 ) {
            console.log("Book is not available. Can't check out!" );
            const custom_err = {message : "Book is not available. Can't check out!"};
            result(custom_err, null);
            return;
          }

        else {
            sql.query(`SELECT COUNT(*) AS flag FROM BOOK_LOANS WHERE BOOK_LOANS.Card_id = '${bookLoan.Card_id}' AND Date_in is null`, (err, res1) => {
                
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;`  `
                  }
                  // console.log("here:",res, );
                  if (res1[0].flag >= 3) {
                    console.log("Maximum number of books checked out! Can't check out anymore!" );
                    const custom_err = {message : "Maximum number of books checked out! Can't check out anymore!"};
                    result(custom_err, null);
                    return;
                  }

                  else{
                    sql.query( `INSERT INTO BOOK_LOANS(Isbn,Card_id) VALUES ('${bookLoan.Isbn}','${bookLoan.Card_id}')`,(err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                           
                        }
                        console.log("created bookloan: ", { id: res.insertId, ...bookLoan });
                        result(null, { id: res.insertId, ...bookLoan });
                        });

                  }
            });
           
              
        }
    });
};

  
bookLoan.findBookLoans = (ip, result) => {
    sql.query(`SELECT BOOK_LOANS.Loan_id,BOOK_LOANS.Card_id, BORROWER.bname,BOOK_LOANS.Isbn,BOOK_LOANS.Date_out,BOOK_LOANS.Date_due, BOOK_LOANS.Date_in
    FROM (BOOK JOIN BOOK_LOANS ON BOOK.Isbn = BOOK_LOANS.Isbn ) JOIN BORROWER ON BORROWER.Card_id = BOOK_LOANS.Card_id
    WHERE (BOOK.Isbn LIKE '%${ip}%' OR BOOK_LOANS.Card_id LIKE '%${ip}%' OR BORROWER.bname LIKE '%${ip}%') AND BOOK_LOANS.Date_in is null;`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found BOOK LOANS: ", res);
        result(null, res);
        return;
      }
  
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
    });
};


bookLoan.updateBookLoan = (id, date_in, result) => {
  if(date_in === 0 ){
    sql.query(
      `UPDATE BOOK_LOANS SET date_in = CURDATE()  WHERE Loan_id = ${id}`,(err, res) => {
      if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
      }

      if (res.affectedRows == 0) {
          // not found Tutorial with the id
          result({ kind: "not_found" }, null);
          return;
      }

      console.log("Checked in book: ", { id: id});
      result(null, { id: id });
    });
  }
  else{
    sql.query(
      `UPDATE BOOK_LOANS SET date_in = '${date_in}'  WHERE Loan_id = ${id}`,(err, res) => {
      if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
      }

      if (res.affectedRows == 0) {
          // not found Tutorial with the id
          result({ kind: "not_found" }, null);
          return;
      }

      console.log("Checked in book: ", { id: id});
      result(null, { id: id });
    });
  }

};
module.exports = bookLoan;
