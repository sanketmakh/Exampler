const jwt = require("jsonwebtoken");
const adminmodel = require("../schema/admindatabase");

const Authenticationadmin = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    const verifyToken = jwt.verify(token, "dungeon_master");
    const rootUser = await adminmodel.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });
    // console.log(rootUser);
    if (!rootUser) {
      throw new Error("User not found!!!!");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (err) {
    res.status(401).send("Unauthorised User !!!!!");
    console.log(err);
  }
};

module.exports = Authenticationadmin;
