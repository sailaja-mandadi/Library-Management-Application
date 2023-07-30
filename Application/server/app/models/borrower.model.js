const sql = require("./db.js");

// constructor
const borrower = function(input) {
  this.bname = input.name ;
  this.ssn = input.ssn;
  this.address = input.address;
  this.phone = input.phone;
};

borrower.createBorrower = (borrower, result) => {
  sql.query(`SELECT COUNT(*) AS flag FROM BORROWER WHERE ssn like '${borrower.ssn}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;`  `
      }
      // console.log("here:",res, );
      if (res[0].flag >= 1) {
        console.log("Borrower Exists!" );
        const custom_err = {message : "Borrower Exists!"};
        result(custom_err, null);
        return;
      }
      else {
          let res1;
          sql.query("INSERT INTO BORROWER SET ?", borrower, (err, res) => {
              if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
              }
            });
          sql.query("SELECT Card_id FROM BORROWER WHERE ssn like "+ `'${borrower.ssn}'`, (err, res) => {
              if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
              }
              res1 = res[0].Card_id;
              // return;
              console.log("created borrower: ", { Card_id: res1, ...borrower });
              result(null, { Card_id: res1, ...borrower });
          });
             
      }
      
      
  });

};
module.exports = borrower;
