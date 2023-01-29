const express = require("express");
const router = express.Router();
const resultmodel = require("../schema/resultmodel");
const authtest = require("../middleware/authresult");
// const auth = require("../middleware/authentication")

const cookieParser = require("cookie-parser");
router.use(cookieParser());
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.get("/home", (req, res) => {
  res.send("welcome to result home !!");
});

router.get("/resultdb/:id", async (req, res) => {
  try{

    const tid = req.params.id;
    console.log(tid)

    const data = await resultmodel.find({testid:tid});
    console.log(data)
    res.status(201).send(data);

  }catch(e)
  {
    console.log(e);
  }
});

router.post("/resultdb", async (req, res) => {
  const { testid, firstname, lastname, classroom, mark } = req.body;

  try {
    const newresult = new resultmodel({
      testid,
      firstname,
      lastname,
      classroom,
      date: Date.now(),
      mark,
    });

    await newresult.save();

    res.status(201).send("Inserted a result!!");
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
