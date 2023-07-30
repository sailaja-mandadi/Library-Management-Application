const fines_model = require("../models/fines.model.js");

exports.newAll = (req, res) => {
    fines_model.refreshAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while newAll fines table."
        });
      else res.send(data);
    });
  };

  exports.getAll = (req, res) => {
    fines_model.findAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while getAll fines table."
        });
      else res.send(data);
    });
  };

  exports.getUnpaid = (req, res) => {
    fines_model.findUnpaid((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while getAll fines table."
        });
      else res.send(data);
    });
  };

  exports.getByCId = (req, res) => {
    const Card_Id = req.query.id;
    fines_model.findByCId(Card_Id,(err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while getByCId fines table."
        });
      else res.send(data);
    });
  };

  
  exports.putByCId = (req, res) => {
    // Validate Request
    const id = req.query.id;
    fines_model.updateByCId(id , (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found customer loan with Cid` +id
            });
          } else {
            res.status(500).send({
              message: "Error updating customer Loan with Cid " + id
            });
          }
        } else res.send(data);
      }
    );
  };
  exports.putByLId = (req, res) => {
    // Validate Request
    const id = req.query.id;
    fines_model.updateByLId(id , (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found customer loan with id `+ id
            });
          } else {
            res.status(500).send({
              message: "Error updating customer Loan with id " + id
            });
          }
        } else res.send(data);
      }
    );
  };
