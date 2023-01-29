import React, { useState } from "react";
import "./Signin.css";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // -------------------------------------------------------------------------------------------------

  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });

  const submithandler = async (e) => {
    e.preventDefault();

    const { email, password } = data;
    const res = await fetch("/student/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const stat = res.status;

    console.log(stat);

    if (stat === 422) {
      window.alert("Invalid Credentials !!");
      navigate("/student/signin");
    }

    if (stat === 201) {
      window.alert("Login successful !!");
      navigate("/student/activetest");
    }
  };

  return (
    <div>
      <div>
        <div className="outer col-lg-4 col-11  mx-auto d-flex flex-column justify-content-center align-items-center ">
          <div className="inner col-12 border border-2 border-dark px-3 py-5">
            <h3 className="text-center">Signin</h3>
            <form>
              {/* email */}
              <div className="col-lg-8 col-11 mx-auto input-signup">
                <TextField
                  className="col-12 inpt"
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              {/* password */}
              <div className="col-lg-8 col-11 mx-auto input-signup">
                <FormControl
                  variant="outlined"
                  className="col-12 inpt"
                  value={data.email}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </div>
              {/* submit */}
              <div className="col-lg-8 col-11 input-signup mx-auto">
                <Button
                  className="col-12 btnsplash py-3"
                  variant="outlined"
                  onClick={submithandler}
                >
                  Submit
                </Button>
              </div>
            </form>
            <p className="text-center mt-4">
              Create an account ?<a href="/student/signup"> Signup</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
