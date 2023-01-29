const express = require("express");
const router = express.Router();
const studentmodel = require("../schema/studentmodel");
const authenticate = require("../middleware/authentication")

const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");

router.use(cookieParser());
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/home", (req, res) => {
  res.send("welcome to home !!!");
});

router.get("/activetest",authenticate,(req,res)=>{
  console.log("hello activetest");
  res.send(req.rootUser);
})
router.get("/pasttest",authenticate,(req,res)=>{
  console.log("hello pasttest");
  res.send(req.rootUser);
})

router.get("/profile",authenticate,(req,res)=>{
  console.log("hello profile");
  res.send(req.rootUser);
})

router.get("/studentdb", async (req, res) => {
  const users = await studentmodel.find({});
  res.send(users);
});

router.post("/studentdb", async (req, res) => {
  try {
    const { firstname, lastname, email, classroom, password } = req.body;

    if (!firstname || !lastname || !email || !classroom || !password) {
      return res
        .status(422)
        .json({ error: "All fields are compulsory to fill !!" });
    }

    const userExist = await studentmodel.findOne({ email: email });

    if (userExist) {
      return res.status(421).json({ error: "Email already Exists !!!" });
    }

    const newuser = new studentmodel({
      firstname,
      lastname,
      email,
      classroom,
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

    const userlog = await studentmodel.findOne({ email: email });

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
      res.status(422).json({ error: "Invalid credentials !!!!!" });
    }
  } catch (e){
    console.log(e);
  }
});


router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.send("cookie cleared");
});


module.exports = router;
