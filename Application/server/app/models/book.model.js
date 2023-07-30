const sql = require("./db.js");

// constructor
const book = function(input) {
  this.ip = input.search_val;
};


book.findBooks = (ip, result) => {
  
  sql.query(`SELECT M.Isbn , M.Title, group_concat(M.Name) as Authors, 
            IF(EXISTS(SELECT Date_in from Book_loans where  Book_loans.Isbn = M.Isbn order by Loan_id DESC limit 0,1) AND 
            (SELECT Date_in from Book_loans where  Book_loans.Isbn = M.Isbn order by Loan_id DESC limit 0,1) is null,0,1) as Availability
            FROM (SELECT B.Isbn as Isbn,B.Title as Title,A.Name as Name FROM book B JOIN book_authors BA ON B.Isbn = BA.Isbn
            JOIN authors A ON BA.Author_id = A.Author_id 
            Where B.Isbn LIKE '%${ip}%' OR A.Name LIKE '%${ip}%' OR B.Title LIKE '%${ip}%') AS M
            GROUP BY M.Isbn,M.Title`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found BOOKS: ", res);
      result(null, res);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

module.exports = book;
