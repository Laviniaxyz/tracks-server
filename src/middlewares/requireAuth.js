const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
  // Extract the JSON Web Token
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: " You must be logged in" });
  }

  const token = authorization.replace("Bearer ", "");

  //Verify it's a valid token extract userId
  jwt.verify(token, "MY_SECRET_KEY", async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: " You must be logged in" });
    }
    const { userId } = payload;
    //use the userId to find appropriate user inside our DB
    const user = await User.findById(userId);
    //assign that user model to our req obj
    req.user = user;
    next();
  });
};
