import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./InTestPaper.css";
import Card from "@mui/material/Card";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import RadioGroup, { useRadioGroup } from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import { CardHeader, Divider } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

function InTestPaper() {
  // ----------------------------------------------------------

  const StyledFormControlLabel = styled((props) => (
    <FormControlLabel {...props} />
  ))(({ theme, checked }) => ({
    ".MuiFormControlLabel-label": checked && {
      color: theme.palette.primary.main,
    },
  }));

  function MyFormControlLabel(props) {
    const radioGroup = useRadioGroup();

    let checked = false;

    if (radioGroup) {
      checked = radioGroup.value === props.value;
    }

    return <StyledFormControlLabel checked={checked} {...props} />;
  }

  MyFormControlLabel.propTypes = {
    /**
     * The value of the component.
     */
    value: PropTypes.any,
  };

  // ------------------------------------------------------------

  const [students, setStudents] = useState({
    testid: "",
    firstname: "",
    lastname: "",
    classroom: "",
    mark: "",
  });

  const [about, setAbout] = useState({
    tid: "",
    subject: "",
    date: "",
    time: "",
    instruction: "",
    testpaper: [],
    student: [],
  });

  const [uans, setUans] = useState([]);
  const [fans, setFans] = useState([]);

  const gettest = async () => {
    await axios
      .get("/exam/admintest")
      .then((responce) => {
        setAbout({
          tid: responce.data._id,
          subject: responce.data.subject,
          date: responce.data.date,
          time: responce.data.time,
          instruction: responce.data.instruction,
          testpaper: responce.data.testpaper,
        });
        setFans(responce.data.testpaper.map((i) => i.answer));
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get("/exam/studenttest")
      .then((responce) => {
        setStudents({
          firstname: responce.data.firstname,
          lastname: responce.data.lastname,
          classroom: responce.data.classroom,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    gettest();
  }, []);

  const handleclick = async () => {
    var count = 0;
    fans.map((data, index) => {
      if (data === uans[index]) {
        count = count + 1;
      }
    });

    console.log(count);
    setStudents((students.mark = count));
    console.log("in patch");
    setStudents((students.testid = about.tid));
    console.log(students);

    await axios
      .post("/result/resultdb", students)
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));

    console.log(about);

    alert("Your test is successfully submitted! Check the result in the Help section of the page!!")

  };

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
                <div className="col-10 m-3">
                  {index + 1}) {home.question}
                </div>

                <RadioGroup
                  name="use-radio-group"
                  defaultValue="first"
                  className="m-3"
                >
                  <MyFormControlLabel
                    value={home.option1}
                    label={home.option1}
                    control={<Radio />}
                    onChange={(e) =>
                      setUans({ ...uans, [index]: e.target.value })
                    }
                  />
                  <MyFormControlLabel
                    value={home.option2}
                    label={home.option2}
                    control={<Radio />}
                    onChange={(e) =>
                      setUans({ ...uans, [index]: e.target.value })
                    }
                  />
                  <MyFormControlLabel
                    value={home.option3}
                    label={home.option3}
                    control={<Radio />}
                    onChange={(e) =>
                      setUans({ ...uans, [index]: e.target.value })
                    }
                  />
                  <MyFormControlLabel
                    value={home.option4}
                    label={home.option4}
                    control={<Radio />}
                    onChange={(e) =>
                      setUans({ ...uans, [index]: e.target.value })
                    }
                  />
                </RadioGroup>

                {/* <TextField
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
                /> */}
              </Card>
            </div>
          ))}
          <div className="col-lg-4 col-7 m-4 p-2 mx-auto">
            <Button
              className="mx-2"
              variant="outlined"
              component={Link}
              to="/student/activetest"
            >
              <h6>
                <i className="fas fa-sign-in-alt"> Go back</i>
              </h6>
            </Button>
            <Button className="mx-2" variant="outlined" onClick={handleclick}>
              <h6>
                <i className="fas fa-sign-in-alt"> Submit</i>
              </h6>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InTestPaper;
