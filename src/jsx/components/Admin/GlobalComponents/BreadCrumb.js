// import React from "react";
import { Link, withRouter } from "react-router-dom";

const BreadCrumb = (props) => {
  const Home = () => {
    let rank = JSON.parse(localStorage.getItem("userDetails")).user[0];
    switch (rank) {
      case "HR":
        return props.history.push("HR-dashboard");
      case "HOD":
        return props.history.push("HOD-dashboard");
      case "HOD-ADMIN":
        return props.history.push("HOD-dashboard");
      case "MD":
        return props.history.push("MD-dashboard");
      case "FD":
        return props.history.push("FD-dashboard");
      default:
        return props.history.push("staff-dashboard");
    }
  };
  const Back = () => {
    if (props.backlink == "") {
      return props.history.go(-2);
    } else {
      return props.history.push(props.backlink);
    }
    // return props.history.go(-1)
  };
  return (
    <>
      <nav className="breadcrumbs">
        <a href="#" onClick={Home} className="breadcrumbs__item">
          Dashboard
        </a>
        <a href="#" onClick={Back} className="breadcrumbs__item">
          Back
        </a>
      </nav>
    </>
  );
};
export default withRouter(BreadCrumb);
