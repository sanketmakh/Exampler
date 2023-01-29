const mongoose = require("mongoose");

const resultschema = new mongoose.Schema({
  testid: {
    type: String,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  clasroom: {
    type: String,
  },
  date: {
    type: Date,
  },
  mark: {
    type: String,
  },
  
});


const resultmodel = mongoose.model("result", resultschema);

module.exports = resultmodel;
