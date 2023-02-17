// import React from "react";
import { Link, withRouter } from "react-router-dom";

const BreadCrumb = (props) => {
    const Home =()=>{
        return props.history.push('staff-dashboard')
    }
    const Back=()=>{
        
        return props.history.push(props.backlink)
        // return props.history.go(-1)
    }
  return (
    <>
      <nav className="breadcrumbs">
        <a href="#" onClick={Home} className="breadcrumbs__item">
          Dashboard
        </a>
        <a href="#"onClick={Back} className="breadcrumbs__item">
          Back
        </a>
      </nav>
    </>
  );
};
export default withRouter(BreadCrumb);
