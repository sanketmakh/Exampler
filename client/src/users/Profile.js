import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./Profile.css";
import { Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [dataitem, setDataitem] = useState({});

  const getdetails = async () => {
    console.log("in getdetails");
    try {
      const res = await fetch("/student/profile", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
        credentials: "include",
      });

      const data = await res.json();
      const stat = res.status;

      console.log(stat);

      setDataitem(data);

      if (!(stat === 200)) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      navigate("/student/signin");
      console.log(err);
    }
  };

  useEffect(() => {
    getdetails();
  }, []);

  const logout = () => {
    fetch("/student/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then(navigate("/Splash"))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="text-danger">
      <div className="outer">
        <div className="inner col-lg-5 m-2 col-12 mx-auto border border-2 border-dark">
          {/* profile */}
          <div className="row col-12 mx-auto d-flex flex-column justify-content-center align-items-center">
            <img
              alt="profilepic"
              src="https://www.w3schools.com/howto/img_avatar.png"
              className="profilepic"
            />
          </div>
          <Divider className="text-dark" />
          <div className="row col-12 mx-auto d-flex flex-column justify-content-center align-items-center text-dark">
            <div className="row my-5">
              <div className="col-lg-5 text-center col-12 profileattr m-3">
                <p>
                  <i className="fas fa-user">
                    {" "}
                    {dataitem.firstname} {dataitem.lastname}
                  </i>
                </p>
              </div>
              <div className="col-lg-5 text-center col-12 profileattr m-3">
                <p>
                  <i className="fas fa-envelope"> {dataitem.email}</i>
                </p>
              </div>
              <div className="col-lg-5 text-center col-12 profileattr m-3">
                <i className="fas fa-school"> {dataitem.classroom}</i>
              </div>
              <div className="col-lg-5 text-center col-12 profileattr m-3">
                <i className="fas fa-user-graduate"> Student</i>
              </div>
              <div className="col-lg-5 text-center col-12 profileattr m-3"></div>
              <div className="col-lg-5 text-center col-12 profileattr m-3">
                <Button
                  className="col-6 my-3"
                  variant="outlined"
                  onClick={logout}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
          <Divider className="text-dark" />
          {/* <div className="col-12 border border-2 border-yellow">
            <h3 className="text-center text-dark my-4">Progress</h3>
          </div> */}
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default Profile;
