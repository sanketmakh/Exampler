import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./InTestPaper.css";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { Divider } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

function InTestPaper() {
  const [about, setAbout] = useState({
    subject: "",
    date: "",
    time: "",
    instruction: "",
    testpaper: [],
  });

  const gettest = async () => {
    await axios
      .get("/exam/admintest")
      .then((responce) => {
        setAbout({
          subject: responce.data.subject,
          date: responce.data.date,
          time: responce.data.time,
          instruction: responce.data.instruction,
          testpaper: responce.data.testpaper,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    gettest();
  }, []);

  return (
    <div>
      <div className="col-lg-7 col-12 border border-2 border-dark mx-auto ">
        <div className="heading col-11 mx-auto">
          <h4 className="text-center m-2 my-3 fw-bold">
            Subject - {about.subject}
          </h4>
          <Divider className="my-3" />

          <p>Date - {about.date}</p>
          <p>Time - {about.time}</p>
          <p>Instructions - {about.instruction}</p>
        </div>
        <div className="heading col-lg-11 col-12 mx-auto">
          <Divider className="my-3" />

          {about.testpaper.map((home, index) => (
            <div>
              <Card className="col-lg-10 col-12 mx-auto my-4">
                <TextField
                  disabled
                  id="standard-basic"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment className="text-dark" position="start">
                        {index + 1}
                      </InputAdornment>
                    ),
                  }}
                  label="question"
                  name="question"
                  variant="standard"
                  className="col-10 m-2"
                  value={home.question}
                />

                <TextField
                  disabled
                  id="standard-basic"
                  label="option1"
                  name="option1"
                  variant="standard"
                  className="col-5 m-2"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment className="text-dark" position="start">
                        A
                      </InputAdornment>
                    ),
                  }}
                  value={home.option1}
                />
                <TextField
                  disabled
                  id="standard-basic"
                  label="option2"
                  name="option2"
                  variant="standard"
                  className="col-5 m-2"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment className="text-dark" position="start">
                        B
                      </InputAdornment>
                    ),
                  }}
                  value={home.option2}
                />
                <TextField
                  disabled
                  id="standard-basic"
                  label="option3"
                  name="option3"
                  variant="standard"
                  className="col-5 m-2"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment className="text-dark" position="start">
                        C
                      </InputAdornment>
                    ),
                  }}
                  value={home.option3}
                />
                <TextField
                  disabled
                  id="standard-basic"
                  label="option4"
                  name="option4"
                  variant="standard"
                  className="col-5 m-2"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment className="text-dark" position="start">
                        D
                      </InputAdornment>
                    ),
                  }}
                  value={home.option4}
                />
                <TextField
                  disabled
                  id="standard-basic"
                  label="answer"
                  name="answer"
                  variant="standard"
                  className="col-5 m-2"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        className="text-dark"
                        position="start"
                      ></InputAdornment>
                    ),
                  }}
                  value={home.answer}
                />
              </Card>
            </div>
          ))}
          <div className="col-lg-3 col-7 m-4 p-2 mx-auto">
            <Button variant="outlined" component={Link} to="/admin/activetest">
              <h6>
                <i className="fas fa-sign-in-alt"> Go back</i>
              </h6>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InTestPaper;
