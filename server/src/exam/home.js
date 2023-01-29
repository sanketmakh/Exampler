const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const exammodel = require("../schema/exammodel");
const auth = require("../middleware/authtest");
const authstudent = require("../middleware/authentication");

const cookieParser = require("cookie-parser");
router.use(cookieParser());
router.use(express.urlencoded({ extended: false }));
router.use(express.json());




router.get("/home", (req, res) => {
  res.send("Hello from exam !!");
});

router.get("/examdb", async (req, res) => {
  const tests = await exammodel.find({}).sort({ _id: -1 });
  res.send(tests);
});

router.get("/admintest", auth, (req, res) => {
  console.log("Inside admintest!!!");
  res.send(req.rootUser);
});

router.get("/studenttest", authstudent, (req, res) => {
  console.log("Inside authstudent!!!");
  res.send(req.rootUser);
});

router.post("/examdb/logtest", async (req, res) => {
  try {
    const { idtest } = req.body;

    const testlog = await exammodel.findOne({ _id: idtest });
    console.log(testlog);

    if (testlog) {
      const token = await testlog.generateAuthToken();
      console.log(token);

      res.cookie("jwtokenfortest", token, {
        expires: new Date(Date.now() + 10000000),
        httpOnly: true,
      });

      res.status(200).json({ message: "Welcome !!" });
    } else {
      res.status(400).json({ error: "Invalid credentials !!!!!" });
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});



router.post("/examdb", async (req, res) => {
  try {
    const { subject, date, time, instruction, testpaper } = req.body;

    const newexam = new exammodel({
      subject,
      date,
      time,
      instruction,
      testpaper,
    });

    await newexam.save();

    res.status(201).send("sent!");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;


// {
//   "firstname":"prasad",
//   "lastname":"gosavi",
//   "class":"33128",
//   "mark":"100"
// }