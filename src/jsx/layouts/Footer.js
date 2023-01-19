import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="copyright">
        <p>
         © {new Date().getFullYear()} {process.env.REACT_APP_NAME}  Designed &amp; Developed by{" "}
          <a href="https://intergral-gs.com" target="_blank"  rel="noreferrer" style={{textDecoration:'none',color:'inherit'}}>
            Intergral Group Solution Ltd
          </a>{" "}
   
        </p>
      </div>
    </div>
  );
};

export default Footer;
