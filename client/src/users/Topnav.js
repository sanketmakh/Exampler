import React from "react";

function Topnav(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand">
            <h3>welcome, {props.fname} {props.lname}</h3>
          </a> 
        </div>
      </nav>
    </div>
  );
}

export default Topnav;
