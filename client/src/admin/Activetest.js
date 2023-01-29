import React, { useState, useEffect } from "react";
import Testcard from "./Testcard";
import Topnav from "./Topnavactivetest";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Activetest() {
  const navigate = useNavigate();

  const [dataitem, setDataitem] = useState({});
  const [test, setTest] = useState([]);

  const getdetails = async () => {
    try {
      const res = await fetch("/admin/activetest", {
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

      setDataitem(data);

      if (!(stat === 200)) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      navigate("/admin/signin");
      console.log(err);
    }
  };

  const getdata = () => {
    axios
      .get("/exam/examdb")
      .then(function (response) {
        setTest(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getdetails();
    getdata();
  }, []);

  return (
    <div>
      <Topnav fname={dataitem.firstname} lname={dataitem.lastname} />

      <div className="col-lg-6 col-12 mx-auto">
        <div className="col-12 mx-auto my-5">
          {test.map((p) => (
            <Testcard
              testid={p._id}
              subject={p.subject}
              date={p.date}
              time={p.time}
              instruction={p.instruction}
            />
          ))}
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default Activetest;
