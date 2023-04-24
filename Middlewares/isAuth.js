const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const isAuth = (req, res, next) => {
  if (req.headers.jwt_token) {
    jwt.verify(req.headers.jwt_token, "GYANPRAKASHGPS", async (err, data) => {
      if (err) {
        console.log(err)
        return res.send({
          status: 401,
          message: "Invalid Session, Please log in",
          error: err,
        });
      }
      req.JWT_TOKEN = data;

      //verify the userid, reject if not present
      try {
        const userId = data.userId;
        await User.verifyUserId({ userId });
        // console.log(x);
      } catch (err) {
        console.log(err);
        return res.send({
          status: 400,
          message: "Error occured",
          error: err,
        });
      }
      next();
    });
  } else {
    res.send({
      status: 401,
      message: "Invalid Session, Please log in",
    });
  }
};

module.exports = isAuth;
