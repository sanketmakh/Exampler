import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import TextareaAutosize from "@mui/material/TextareaAutosize";

function Test() {
  const navigate = useNavigate();

  const [testabout, setTestabout] = useState({
    subject: "",
    date: "",
    time: "",
    instruction: "",
  });

  const [formValues, setFormValues] = useState([
    {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
    },
  ]);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([
      ...formValues,
      {
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
      },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch("/exam/examdb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: testabout.subject,
        date: testabout.date,
        time: testabout.time,
        instruction: testabout.instruction,
        testpaper: formValues.map((i) => i),
      }),
    });

    const stat = res.status;

    console.log(stat);

    if (stat !== 201) {
      window.alert("Invalid !!");
      navigate("/exam/Test");
    }

    if (stat === 201) {
      window.alert("Test Created successful !!");
      navigate("/admin/activetest");
    }
  };

  return (
    <div>
      <div className="col-lg-6 col-12 mx-auto border border-2 border-danger">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="col-lg-4 col-7 m-4 p-2 mx-auto">
            <Button variant="outlined" type="submit" className="mx-2">
              <h6>
                <i className="fas fa-sign-in-alt"> Submit</i>
              </h6>
            </Button>
            <Button
                variant="outlined"
                component={Link}
                to="/admin/activetest"
                className="mx-2"
              >
                <h6>
                  <i className="fas fa-sign-in-alt"> Go back</i>
                </h6>
              </Button>
          </div>
          <Card className="col-lg-10 col-12 mx-auto my-5">
            <TextField
              id="standard-basic"
              label="subject"
              name="subject"
              variant="standard"
              className="col-5 m-2"
              value={testabout.subject}
              onChange={(e) =>
                setTestabout({ ...testabout, subject: e.target.value })
              }
            />
            <input
              type="date"
              className="col-5 m-2 p-2"
              name="date"
              value={testabout.date}
              onChange={(e) =>
                setTestabout({ ...testabout, date: e.target.value })
              }
            />

            <input
              type="time"
              name="time"
              className="col-5 m-2 p-2"
              value={testabout.time}
              onChange={(e) =>
                setTestabout({ ...testabout, time: e.target.value })
              }
            />
          </Card>
          <Card className="col-lg-10 col-12 mx-auto my-5">
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Instructions for the test.."
              className="col-10 p-2 m-3"
              name="testinstructions"
              value={testabout.instruction}
              onChange={(e) =>
                setTestabout({ ...testabout, instruction: e.target.value })
              }
            />
          </Card>

          {formValues.map((element, index) => (
            <div className="form-inline" key={index}>
              <Card className="col-lg-10 col-12 mx-auto my-5">
                <TextField
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
                  value={element.question || ""}
                  onChange={(e) => handleChange(index, e)}
                />

                <TextField
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
                  value={element.option1 || ""}
                  onChange={(e) => handleChange(index, e)}
                />
                <TextField
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
                  value={element.option2 || ""}
                  onChange={(e) => handleChange(index, e)}
                />
                <TextField
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
                  value={element.option3 || ""}
                  onChange={(e) => handleChange(index, e)}
                />
                <TextField
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
                  value={element.option4 || ""}
                  onChange={(e) => handleChange(index, e)}
                />
                <TextField
                  id="standard-basic"
                  label="answer"
                  name="answer"
                  variant="standard"
                  className="col-5 m-2"
                  value={element.answer || ""}
                  onChange={(e) => handleChange(index, e)}
                />
                {index ? (
                  <Button
                    variant="outlined"
                    className="col-3 m-4"
                    onClick={() => removeFormFields(index)}
                  >
                    <h6>
                      <i className="fas fa-trash"> Remove</i>
                    </h6>
                  </Button>
                ) : null}
              </Card>
            </div>
          ))}
        </form>
        <div className="col-lg-3 col-7 m-4 p-2 mx-auto">
          <Button variant="outlined" onClick={() => addFormFields()}>
            <h6>
              <i className="fas fa-plus"> Add Question</i>
            </h6>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Test;
