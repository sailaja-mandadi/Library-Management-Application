const sql = require("./db.js");

// constructor
const fines = function(input) {
  this.Card_Id = input.Card_id ;
  this.Loan_Id = input.Loan_id;
  this.search_val = input.search_val;
};

fines.refreshAll = (result) => {
    sql.query(`CALL UpdateFines()`, (err,res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          // console.log("here:",res, );
          //console.log(res);
          //if (res.length) {
            console.log("Refreshed Fines! ");
            result(null, {message: "Refreshed Fines! "});
           return;
       
       // }
    });
};

fines.findUnpaid = (result) => {
    sql.query(`SELECT BORROWER.Card_id,Bname, SUM(Fine_amt) as Fine_amt ,Paid FROM (FINES JOIN BOOK_LOANS ON FINES.Loan_id = BOOK_LOANS.Loan_id)
    JOIN BORROWER ON BOOK_LOANS.Card_id = BORROWER.Card_id 
    WHERE Paid = '0'
    GROUP BY BORROWER.Card_id,Bname, Paid `, (err,res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
          // console.log("here:",res, );
          //console.log(res);
          //if (res.length) {
            console.log("Returned Fines rows! ");
            result(null, res);
           return;
       
       // }
    });
};

fines.findAll = (result) => {
  sql.query(`SELECT BORROWER.Card_id,Bname, SUM(Fine_amt) as Fine_amt ,Paid FROM (FINES JOIN BOOK_LOANS ON FINES.Loan_id = BOOK_LOANS.Loan_id)
  JOIN BORROWER ON BOOK_LOANS.Card_id = BORROWER.Card_id 
  GROUP BY BORROWER.Card_id,Bname, Paid`, (err,res) => {
      if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        // console.log("here:",res, );
        //console.log(res);
        //if (res.length) {
          console.log("Returned Fines rows! ");
          result(null, res);
         return;
     
     // }
  });
};


fines.findByCId = (id,result) => {
  let test = `
  SELECT BORROWER.Card_id,Bname,BOOK_LOANS.Loan_id,BOOK_LOANS.Isbn, Fine_amt ,Date_in FROM (FINES JOIN BOOK_LOANS ON FINES.Loan_id = BOOK_LOANS.Loan_id)
    JOIN BORROWER ON BOOK_LOANS.Card_id = BORROWER.Card_id 
    WHERE BORROWER.Card_id LIKE '%${id}%' AND Paid = '0'`;
  //console.log("vhscgbjgh "+test);

    sql.query(test, (err,res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
            console.log("here:",id );
          //console.log(res);
          //if (res.length) {
            console.log("Returned Fines rows by CID! ");
            result(null, res);
        // }
    });
};
/*
fines.findByCId = (id,result) => {
  let test = `SELECT BORROWER.Card_id,Bname, SUM(Fine_amt) as Fine_amt ,Paid FROM (FINES JOIN BOOK_LOANS ON FINES.Loan_id = BOOK_LOANS.Loan_id)
  JOIN BORROWER ON BOOK_LOANS.Card_id = BORROWER.Card_id 
  GROUP BY BORROWER.Card_id,Bname, Paid 
  HAVING BORROWER.Card_id LIKE '%${id}%'`;
  //console.log("vhscgbjgh "+test);

    sql.query(test, (err,res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }
           console.log("here:",id );
          //console.log(res);
          //if (res.length) {
            console.log("Returned Fines rows by CID! ");
            result(null, res);
       // }
    });
};
*/

 fines.updateByCId = (id, result) => {
    sql.query(
      `UPDATE FINES
      SET Paid = 1
      WHERE FINES.Loan_id IN (SELECT FINES2.Loan_id FROM BOOK_LOANS JOIN (SELECT * FROM FINES) AS FINES2
       ON BOOK_LOANS.Loan_id = FINES2.Loan_id
       WHERE Card_id LIKE '%${id}%' AND Paid = 0)`,
      (err, res) => {
        console.log("loll: ", res);
        console.log("here:",id );
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
  
        console.log("updated fines: ", { id: id, ...fines });
        result(null, { id: id, ...fines });
      }
    );
  };


 fines.updateByLId = (id, result) => {
  sql.query(
    `UPDATE FINES
    SET Paid = 1
    WHERE FINES.Loan_id LIKE '%${id}%' `,
    (err, res) => {
      //console.log("loll: ", res);
      console.log("here:",id );
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

      console.log("updated fines1: ", { id: id, ...fines });
      result(null, { id: id, ...fines });
    }
  );
};

  
module.exports = fines;
