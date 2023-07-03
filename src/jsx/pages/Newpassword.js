import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  loadingToggleAction,
  loginAction,
} from "../../store/actions/AuthAction";

//
import logo from "../../images/logo.png";
// import logotext from "../../images/logo-text.png";
import login from "../../images/bg-login2.png";
import loginbg from "../../images/bg-login.jpg";
import axios from "axios";
import swal from "sweetalert";
import validator from "validator";

import "./UIStyle.css";

function Newpassword(props) {
  let errorsObj = { email: "", password: "", token: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("");
  const [passwordt, setPasswordt] = useState("");
  const [token, setToken] = useState("");
  const [staffNo, setStaffNo] = useState("");

  const [showLoading, setShowLoading] = useState(false);
  const [continueDeactive, setContinueDeactive] = useState(true);

  const [passwordShown, setPasswordShown] = useState(false);
  const [disableRePW, setDisableRW] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");


  const onRequest = (e) => {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (password !== passwordt || password === "") {
      errorObj.password = "Password must match";
      error = true;
    }

    if (token === "") {
      errorObj.token = "Token is Required";
      error = true;
    }
    if (staffNo === "") {
      errorObj.staffNo = "Staff No is Required";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }

    let datum = {
      Token: token,
      Password: password,
      EmployeeId: staffNo,
    };

    setShowLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API_S_LINK}/authenticate/setpassword`,
        datum
      )
      .then(function (response) {
        if (response.status === 200) {
          swal("Success!", "Successfully reset", "success");
          setShowLoading(false);
          setContinueDeactive(false);
          console.log(response.data);
        }
      })
      .catch((err) => {
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        setShowLoading(false);
        // setContinueDeactive(false);
        console.log({ err: err });
      });
  };

  const validate = (value) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage("");
      setDisableRW(false)
    } else {
      setErrorMessage("Weak Password");
      setDisableRW(true)
    }
  };

  const buton = showLoading === true ? "Loading..." : "Change";

  const rewindpge = () => {
    props.history.go(-1);
  };
  const moveToSync = ()=>{
    return props.history.push('asignup');
  }

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  let UI = ""
  if  (process.env.REACT_APP_MOMENTUM_ESS==="true") {
    UI = (    <div
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
            {/* <h2 className="text-black  mb-2">Check the Status</h2>
            <p className="fs-12 text-black">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters,
            </p> */}
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
                © {new Date().getFullYear()} {process.env.REACT_APP_NAME} Design
                by Intergral Group Solution Ltd
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
                          {/* Sign in by entering information below */}
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
                            <strong className="text-white">Token</strong>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                          />
                          {errors.token && (
                            <div className=" fs-12"
                            style={{
                              fontWeight: "bold",
                              color: "#b31919",
                            }}
                            >
                              {errors.token}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label className="mb-2 ">
                            <strong className="text-white">
                              Employee Number
                            </strong>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={staffNo}
                            onChange={(e) => setStaffNo(e.target.value)}
                          />
                          {errors.staffNo && (
                            <div className=" fs-12" 
                            style={{
                              fontWeight: "bold",
                              color: "#b31919",
                            }}
                            >
                              {errors.staffNo}
                            </div>
                          )}
                        </div>

                        <label className="mb-2 ">
                          <strong className="text-white">
                            Password (minimum 6 characters with special case)
                          </strong>
                        </label>
                        <div className="input-group">
                          <input
                            type={passwordShown ? "text" : "password"}
                            className="form-control"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              validate(e.target.value);
                            }}
                            aria-label="Input group Password"
                            aria-describedby="btnGroupAddon"
                          />
                          <div class="input-group-append">
                            <div
                              class="input-group-text"
                              id="btnGroupAddon"
                              onClick={togglePassword}
                            >
                              <i className="fa fa-eye"></i>
                            </div>
                          </div>
                        </div>
                        {errorMessage === "" ? null : (
                          <span
                            style={{
                              fontWeight: "bold",
                              color: "#b31919",
                            }}
                          >
                            {errorMessage}
                          </span>
                        )}

                        {errors.password && (
                          <div
                            className=" fs-12"
                            style={{
                              fontWeight: "bold",
                              color: "#b31919",
                            }}
                          >
                            {errors.password}
                          </div>
                        )}

                        <label className="mb-2 mt-2">
                          <strong className="text-white">
                            Re-Password (minimum 6 characters with special case)
                          </strong>
                        </label>
                        <div className="input-group">
                          <input
                            type={passwordShown ? "text" : "password"}
                            className="form-control"
                            value={passwordt}
                            onChange={(e) => setPasswordt(e.target.value)}
                            aria-label="Input group Re-Password"
                            aria-describedby="btnGroupAddon2"
                            disabled={disableRePW}
                          />
                          <div class="input-group-append">
                            <div
                              class="input-group-text"
                              id="btnGroupAddon2"
                              onClick={togglePassword}
                            >
                              <i className="fa fa-eye"></i>
                            </div>
                          </div>
                        </div>
                        {errors.password && (
                          <div
                            className=" fs-12"
                            style={{
                              fontWeight: "bold",
                              color: "#b31919",
                            }}
                          >
                            {errors.password}
                          </div>
                        )}
                        <div className="text-center mt-3">
                          <button
                            // type="submit"
                            onClick={onRequest}
                            className="btn bg-white text-primary btn-block"
                          >
                            {buton}
                          </button>
                        </div>
                      </form>
                      <div className="new-account mt-4 pr-3">
                        <p className="text-white d-flex align-items-center">
                          {/* Don't have an account?{" "} */}

                          {/* <Link className="text-white" to="/resetpwd">
                            Reset Password
                          </Link> */}
                          <Link
                            className="text-white"
                            to="#"
                            onClick={rewindpge}
                            style={{ textDecoration: "none" }}
                          >
                            <i className="fa fa-arrow-left"></i>
                            <span className="ml-3"> Go Back Link</span>
                          </Link>
                          <button
                            className="btn btn-success text-white ml-auto p-1"
                            // to="/asignup"
                            // style={{ textDecoration: "none" }}
                            onClick={moveToSync}
                            disabled={continueDeactive}
                          > 
                            <span className="mr-3">Continue</span>
                            <i className="fa fa-arrow-right"></i>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
  }else{
    UI = (    <div
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
            {/* <h2 className="text-black  mb-2">Check the Status</h2>
            <p className="fs-12 text-black">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters,
            </p> */}
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
                © {new Date().getFullYear()} {process.env.REACT_APP_NAME} Design
                by Intergral Group Solution Ltd
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
                          {/* Sign in by entering information below */}
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
                            <strong className="text-white">Token</strong>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                          />
                          {errors.token && (
                            <div className=" fs-12"
                            style={{
                              fontWeight: "bold",
                              color: "#b31919",
                            }}
                            >
                              {errors.token}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label className="mb-2 ">
                            <strong className="text-white">
                              Employee Number
                            </strong>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={staffNo}
                            onChange={(e) => setStaffNo(e.target.value)}
                          />
                          {errors.staffNo && (
                            <div className=" fs-12" 
                            style={{
                              fontWeight: "bold",
                              color: "#b31919",
                            }}
                            >
                              {errors.staffNo}
                            </div>
                          )}
                        </div>

                        <label className="mb-2 ">
                          <strong className="text-white">
                            Password (minimum 6 characters with special case)
                          </strong>
                        </label>
                        <div className="input-group">
                          <input
                            type={passwordShown ? "text" : "password"}
                            className="form-control"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              validate(e.target.value);
                            }}
                            aria-label="Input group Password"
                            aria-describedby="btnGroupAddon"
                          />
                          <div class="input-group-append">
                            <div
                              class="input-group-text"
                              id="btnGroupAddon"
                              onClick={togglePassword}
                            >
                              <i className="fa fa-eye"></i>
                            </div>
                          </div>
                        </div>
                        {errorMessage === "" ? null : (
                          <span
                            style={{
                              fontWeight: "bold",
                              color: "#b31919",
                            }}
                          >
                            {errorMessage}
                          </span>
                        )}

                        {errors.password && (
                          <div
                            className=" fs-12"
                            style={{
                              fontWeight: "bold",
                              color: "#b31919",
                            }}
                          >
                            {errors.password}
                          </div>
                        )}

                        <label className="mb-2 mt-2">
                          <strong className="text-white">
                            Re-Password (minimum 6 characters with special case)
                          </strong>
                        </label>
                        <div className="input-group">
                          <input
                            type={passwordShown ? "text" : "password"}
                            className="form-control"
                            value={passwordt}
                            onChange={(e) => setPasswordt(e.target.value)}
                            aria-label="Input group Re-Password"
                            aria-describedby="btnGroupAddon2"
                            disabled={disableRePW}
                          />
                          <div class="input-group-append">
                            <div
                              class="input-group-text"
                              id="btnGroupAddon2"
                              onClick={togglePassword}
                            >
                              <i className="fa fa-eye"></i>
                            </div>
                          </div>
                        </div>
                        {errors.password && (
                          <div
                            className=" fs-12"
                            style={{
                              fontWeight: "bold",
                              color: "#b31919",
                            }}
                          >
                            {errors.password}
                          </div>
                        )}
                        <div className="text-center mt-3">
                          <button
                            // type="submit"
                            onClick={onRequest}
                            className="btn bg-white text-primary btn-block"
                          >
                            {buton}
                          </button>
                        </div>
                      </form>
                      <div className="new-account mt-4 pr-3">
                        <p className="text-white d-flex align-items-center">
                          {/* Don't have an account?{" "} */}

                          {/* <Link className="text-white" to="/resetpwd">
                            Reset Password
                          </Link> */}
                          <Link
                            className="text-white"
                            to="#"
                            onClick={rewindpge}
                            style={{ textDecoration: "none" }}
                          >
                            <i className="fa fa-arrow-left"></i>
                            <span className="ml-3"> Go Back Link</span>
                          </Link>
                          <button
                            className="btn btn-success text-white ml-auto p-1"
                            // to="/asignup"
                            // style={{ textDecoration: "none" }}
                            onClick={moveToSync}
                            disabled={continueDeactive}
                          > 
                            <span className="mr-3">Continue</span>
                            <i className="fa fa-arrow-right"></i>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
  }

  return UI
}

export default withRouter(Newpassword);
