var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var Customer = require("../db/models/customers");

/* GET customers listing. */
router.get("/", (req, res, next) => {
  Customer.find({}, (err, result) => {
    if (err) {
      console.debug("Hey Look! Error", err);
      res.json(err);
    } else {
      // console.log(res);
      res.json(result);
    }
  });
});



// Create new customer
router.post("/", (req, res, next) => {
  console.debug(req.body);
  const data = req.body;
  const newCustomer = new Customer({
    name: data.name,
    address: data.address,
    dob: data.dob,
    email: data.email,
    phone: data.phone
  });
  
  newCustomer.save((err, newInstance) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.json(newInstance);
    }
  });
});


router.delete("/", (req, res, next) => {
  const id = req.body._id;
  console.debug(id);
  Customer.findByIdAndDelete(id, (err, doc) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});

router.put("/", async (req, res, next) => {
  console.debug(req.body);
  const data = req.body;
  var customer1 = await Customer.findOne({ _id: data._id });
  customer1.name = data.name;
  customer1.address = data.address;
  customer1.phone = data.phone;
  customer1.email = data.email;
  customer1.dob = data.dob;

  await customer1.save();
  res.status(200).json(customer1);
});

module.exports = router;

