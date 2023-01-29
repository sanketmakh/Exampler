const express = require("express");
const app = express();
// const Port = 8000;
require("./src/database/database")

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const student = require("./src/students/home")
const admin = require("./src/admin/home")
const exam = require("./src/exam/home")
const result = require("./src/result/home")

app.use("/student",student);
app.use("/admin",admin);
app.use("/exam",exam);
app.use("/result",result);


app.listen(5000,()=>{
    console.log("Server connected !!!")
});
