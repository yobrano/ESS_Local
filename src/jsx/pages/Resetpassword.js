import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
// import {
//   loadingToggleAction,
//   loginAction,
// } from "../../store/actions/AuthAction";

//
import logo from "../../images/logo.png";
// import logotext from "../../images/logo-text.png";
import login from "../../images/bg-login2.png";
import loginbg from "../../images/bg-login.jpg";
import axios from "axios";
import swal from "sweetalert";
import "./UIStyle.css";

function Resetpassword(props) {
  const [email, setEmail] = useState("");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [showLoading, setShowLoading] = useState(false);
  // const dispatch = useDispatch();

  // function onLogin(e) {
  //   e.preventDefault();
  //   let error = false;
  //   const errorObj = { ...errorsObj };
  //   if (email === "") {
  //     errorObj.email = "Email is Required";
  //     error = true;
  //   }
  //   setErrors(errorObj);
  //   if (error) {
  //     return;
  //   }

  // }

  const onRequest = (e) => {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === "") {
      errorObj.email = "Email is Required";
      error = true;
    }

    setShowLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/home/reset/${email}`
        // config
      )
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          props.history.push("forgot", [{ datax: email }]);
          // swal("Success!", "Job Application Created", "success");
        }
        if (response.status === 404) {
          // alert(response.data.message);
        }
        setShowLoading(false);
      })
      .catch((err) => {
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        setShowLoading(false);
        console.log({ err: err });
      });
  };

  const rewindpge = () => {
    // alert("")
    return props.history.push("login");
  };

  const buton = showLoading === true ? "Loading..." : "Request";

  let UI = "";
  if  (process.env.REACT_APP_MOMENTUM_ESS==="true") {
    UI = (
      <div
        className="login-main-page"
        style={{ backgroundImage: "url(" + loginbg + ")" }}
      >
        <div className="login-wrapper">
          <div
            className="login-aside-left"
            style={{ backgroundImage: "url(" + login + ")" }}
          >
            <Link to="/" className="login-logo" style={{ width: "150px" }}>
              <img
                src={logo}
                alt=""
                className="mr-2"
                style={{ width: "100%", height: "100%" }}
              />
              {/* <img src={logotext} alt="" className="ml-1"/> */}
              {/* <h3>LOGO</h3> */}
            </Link>
            <div className="login-description">
              <ul className="social-icons mt-4">
                <li>
                  <Link to={"#"}>
                    <i className="fa fa-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link to={"#"}>
                    <i className="fa fa-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link to={"#"}>
                    <i className="fa fa-linkedin"></i>
                  </Link>
                </li>
              </ul>
              <div className="mt-5 ml-4">
                <a
                  href={"https://intergral-gs.com/"}
                  rel="noreferrer"
                  target="_blank"
                  className="text-black"
                  style={{ textDecoration: "none", fontSize: "13px" }}
                >
                  © {new Date().getFullYear()} {process.env.REACT_APP_NAME}{" "}
                  Design by Intergral Group Solution Ltd
                </a>
              </div>
            </div>
          </div>
          <div className="login-aside-right momentum">
            <div className="row m-0 justify-content-center h-100 align-items-center">
              <div className="col-xl-9 col-xxl-9">
                <div className="authincation-content">
                  <div className="row no-gutters">
                    <div className="col-xl-12">
                      <div className="auth-form-1">
                        <div className="mb-4">
                          <h3 className="text-white mb-1 welcome-text">
                            Welcome to {process.env.REACT_APP_NAME}
                          </h3>
                          <p className="text-white">
                            Continue by entering information below
                          </p>
                        </div>
                        {props.errorMessage && (
                          <div className="bg-success text-danger bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                            {props.errorMessage}
                          </div>
                        )}
                        {props.successMessage && (
                          <div className="bg-success text-white bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                            {props.successMessage}
                          </div>
                        )}
                        <form>
                          <div className="form-group">
                            <label className="mb-2 ">
                              <strong className="text-white">Email</strong>
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && (
                              <div className="text-danger fs-12">
                                {errors.email}
                              </div>
                            )}
                          </div>

                          <div className="text-center">
                            <button
                              // type="submit"
                              className="btn bg-white text-primary btn-block"
                              onClick={onRequest}
                            >
                              {buton}
                            </button>
                          </div>
                        </form>
                        <div className="pagelinks mt-3">
                          <Link
                            className="text-white"
                            to="#"
                            onClick={rewindpge}
                            style={{ textDecoration: "none" }}
                          >
                            <i className="fa fa-arrow-left"></i>
                            <span className="ml-3"> Go Back Link</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    UI = (
      <div
        className="login-main-page"
        style={{ backgroundImage: "url(" + loginbg + ")" }}
      >
        <div className="login-wrapper">
          <div
            className="login-aside-left"
            style={{ backgroundImage: "url(" + login + ")" }}
          >
            <Link to="/" className="login-logo" style={{ width: "150px" }}>
              <img
                src={logo}
                alt=""
                className="mr-2"
                style={{ width: "100%", height: "100%" }}
              />
              {/* <img src={logotext} alt="" className="ml-1"/> */}
              {/* <h3>LOGO</h3> */}
            </Link>
            <div className="login-description">
              <ul className="social-icons mt-4">
                <li>
                  <Link to={"#"}>
                    <i className="fa fa-facebook"></i>
                  </Link>
                </li>
                <li>
                  <Link to={"#"}>
                    <i className="fa fa-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link to={"#"}>
                    <i className="fa fa-linkedin"></i>
                  </Link>
                </li>
              </ul>
              <div className="mt-5 ml-4">
                <a
                  href={"https://intergral-gs.com/"}
                  rel="noreferrer"
                  target="_blank"
                  className="text-black"
                  style={{ textDecoration: "none", fontSize: "13px" }}
                >
                  © {new Date().getFullYear()} {process.env.REACT_APP_NAME}{" "}
                  Design by Intergral Group Solution Ltd
                </a>
              </div>
            </div>
          </div>
          <div className="login-aside-right">
            <div className="row m-0 justify-content-center h-100 align-items-center">
              <div className="col-xl-9 col-xxl-9">
                <div className="authincation-content">
                  <div className="row no-gutters">
                    <div className="col-xl-12">
                      <div className="auth-form-1">
                        <div className="mb-4">
                          <h3 className="text-white mb-1 welcome-text">
                            Welcome to {process.env.REACT_APP_NAME}
                          </h3>
                          <p className="text-white">
                            Continue by entering information below
                          </p>
                        </div>
                        {props.errorMessage && (
                          <div className="bg-success text-danger bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                            {props.errorMessage}
                          </div>
                        )}
                        {props.successMessage && (
                          <div className="bg-success text-white bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                            {props.successMessage}
                          </div>
                        )}
                        <form>
                          <div className="form-group">
                            <label className="mb-2 ">
                              <strong className="text-white">Email</strong>
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && (
                              <div className="text-danger fs-12">
                                {errors.email}
                              </div>
                            )}
                          </div>

                          <div className="text-center">
                            <button
                              // type="submit"
                              className="btn bg-white text-primary btn-block"
                              onClick={onRequest}
                            >
                              {buton}
                            </button>
                          </div>
                        </form>
                        <div className="pagelinks mt-3">
                          <Link
                            className="text-white"
                            to="#"
                            onClick={rewindpge}
                            style={{ textDecoration: "none" }}
                          >
                            <i className="fa fa-arrow-left"></i>
                            <span className="ml-3"> Go Back Link</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return UI;
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default withRouter(connect(mapStateToProps)(Resetpassword));
