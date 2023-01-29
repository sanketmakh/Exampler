const express = require("express");
const router = express.Router();
const adminmodel = require("../schema/admindatabase");
const authenticate = require("../middleware/authadmin")

const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

router.use(cookieParser());
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/home", (req, res) => {
  res.send("welcome to admin home !!");
});

router.get("/activetest",authenticate,(req,res)=>{
    console.log("hello activetest");
    res.send(req.rootUser);
})

router.get("/pasttest",authenticate,(req,res)=>{
    console.log("hello pasttest!");
    res.send(req.rootUser);
})

router.get("/profile",authenticate,(req,res)=>{
    console.log("hello profile!");
    res.send(req.rootUser);
})

router.get("/admindb", async (req, res) => {
  const admins = await adminmodel.find({});
  console.log(admins);
  res.send(admins);
});

router.post("/admindb", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res
        .status(422)
        .json({ error: "All fields are compulsory to fill !!" });
    }

    const userExist = await adminmodel.findOne({ email: email });

    if (userExist) {
      return res.status(421).json({ error: "Email already Exists !!!" });
    }

    const newuser = new adminmodel({
      firstname,
      lastname,
      email,
      password,
    });

    await newuser.save();

    res.status(201).send("newuser added !!!");
  } catch {
    (e) => {
      console.log(e);
    };
  }
});

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body)
  
      if (!email || !password) {
        return res
          .status(422)
          .json({ error: "All fields are compulsory to fill !!" });
      }
  
      const userlog = await adminmodel.findOne({ email: email });
  
      if (userlog) {
        const isMatch = await bcrypt.compare(password, userlog.password);
  
        const token = await userlog.generateAuthToken();
        console.log(token);
  
        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 10000000),
          httpOnly: true,
        });
  
        if (!isMatch) 
        {
          res.status(422).json({ error: "Invalid credentialss !!!!!" });
        }
        else 
        {
          res.status(201).json({ message: "Welcome !!" });
        }
  
      } 
      else
      {
        res.status(422).json({ error: "Invalid credentials !!!" });
      }
    } catch (e){
      console.log(e);
    }
  });


module.exports = router;
