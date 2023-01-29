import React from "react";
import "./Splash.css";

function Splash() {
  return (
    <div className="height">
      <div className="outerbox height col-lg-4 col-12 mx-auto d-flex flex-column justify-content-center align-items-center">
        <div className="name">
          <h1 className="textsplash">Examler</h1>
        </div>
        <div className="buttons">
          <a
            href="/student/signin"
            class="btn btn-outline-danger btnsplash"
            role="button"
          >
            Student
          </a>

          <a
            href="/admin/signin"
            class="btn btn-outline-success btnsplash"
            role="button"
          >
            Admin
          </a>
        </div>
      </div>
    </div>
  );
}

export default Splash;
