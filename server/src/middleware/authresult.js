const jwt = require("jsonwebtoken");
const resultmodel = require("../schema/resultmodel");

const Authenticationresult = async (req, res, next) => {
  try {
    const token = req.cookies.jwtokenforresult;
    const verifyToken = jwt.verify(token, "master");
    const rootUser = await resultmodel.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    console.log(rootUser);
    if (!rootUser) {
      throw new Error("result not found!!!!");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (err) {
    res.status(401).send("Unauthorised result !!!!!");
    console.log(err);
  }
};

module.exports = Authenticationresult;