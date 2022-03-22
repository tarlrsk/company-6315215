var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", (req, res, next) => {
  const predefinedUsers = [
    {
      email: "abc@xyz.com",
      password: "123",
      name: "Regular User",
      admin: false,
    },
    {
      email: "xyz@abc.com",
      password: "123",
      name: "Admin User",
      admin: true,
    },
  ];

  const data = req.body;
  const foundUser = predefinedUsers.find(
    (u) => u.email === data.email && u.password === data.password
  );

  console.log(data);
  console.log(foundUser);

  if (foundUser) {
    delete foundUser.password;
    res.send(foundUser);
  } else {
    res.send({
      error: "user not found",
    });
  }
});

module.exports = router;
