const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const examschema = new mongoose.Schema({
  subject: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  instruction: {
    type: String,
  },
  testpaper: {
    type: Array,
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

examschema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, "dungeon");
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};


const exammodel = mongoose.model("exam", examschema);

module.exports = exammodel;
