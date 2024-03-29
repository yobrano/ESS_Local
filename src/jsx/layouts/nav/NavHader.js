import React, { useState } from "react";
import { withRouter } from "react-router-dom";

/// React router dom
import { Link } from "react-router-dom";

/// images
import logo from "../../../images/dashbord-icon.png";
import logoText from "../../../images/logo-text.png";

const NavHader = (props) => {
   const [toggle, setToggle] = useState(false);
   const landing = ()=>{props.history.push('/')}
   return (
      <div className="nav-header">
         <Link to="/dashboard" className="brand-logo">
            {/* <img className="logo-abbr" src={logo} alt="" />
            <img className="logo-compact" src={logoText} alt="" />
            <img className="brand-title" src={logoText} alt="" /> */}
            <img className="logo-abbr" src={logo} alt="" />
            <img className="brand-title" src={logo} alt="" />
         </Link>

         <div className="nav-control" onClick={() => setToggle(!toggle)}>
            <div className={`hamburger ${toggle ? "is-active" : ""}`}>
               <span className="line"></span>
               <span className="line"></span>
               <span className="line"></span>
            </div>
         </div>
      </div>
   );
};

export default withRouter(NavHader);
