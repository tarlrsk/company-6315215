var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var Quotations = require("../db/models/quotations");

/* GET products listing. */
router.get("/", (req, res, next) => {
  Quotations.find({}, (err, result) => {
    if (err) {
      console.debug("Hey Look! Error", err);
      res.json(err);
    } else {
      // console.log(res);
      res.json(result);
    }
  });
});

// Create new product
router.post("/", (req, res, next) => {
  console.debug(req.body);
  const data = req.body;
  const quotation1 = new Quotations({
    code: data.code,
    name: data.name,
    price: data.price,
    qty: data.qty,
  });
  quotation1.save((err, newInstance) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.json(newInstance);
    }
  });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params["id"]; // use ID from the route parameter
  // const id = req.body._id;
  console.log("Delete this id ", id);
  console.debug("Product ID to delete", id);
  Quotations.findByIdAndDelete(id, (err, doc) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});

// Update whole object or partially (PATCH)
router.put("/", async (req, res, next) => {
  console.debug(req.body);
  const data = req.body;
  const id = data._id;
  delete data._id;
  console.debug(data);

  Quotations.findByIdAndUpdate(id, data, (err, doc) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});
module.exports = router;
