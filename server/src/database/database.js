const mongoose = require("mongoose");
    // "mongodb+srv://prasad:12345@cluster0.5afsg.mongodb.net/examler?retryWrites=true&w=majority",

mongoose
  .connect(
    "mongodb://localhost:27017",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("database connected !!");
  })
  .catch((err) => {
    console.log("database not connected !!");
  });
