const jwt = require("jsonwebtoken");
const exammodel = require("../schema/exammodel");

const Authenticationtest = async (req, res, next) => {
  try {
    const token = req.cookies.jwtokenfortest;
    const verifyToken = jwt.verify(token, "dungeon");
    const rootUser = await exammodel.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    console.log(rootUser);
    if (!rootUser) {
      throw new Error("Test not found!!!!");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (err) {
    res.status(401).send("Unauthorised Test !!!!!");
    console.log(err);
  }
};

module.exports = Authenticationtest;