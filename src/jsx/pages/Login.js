import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  loadingToggleAction,
  loginAction,
} from "../../store/actions/AuthAction";

//
import logo from "../../images/logo.png";
// import logotext from "../../images/logo-text.png";
import login from "../../images/bg-login2.png";
import loginbg from "../../images/bg-login.jpg";
import "./UIStyle.css";

function Login(props) {
  const [email, setEmail] = useState("");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const [passwordShown, setPasswordShown] = useState(false);

  function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === "") {
      errorObj.email = "Email is Required";
      error = true;
    }
    if (password === "") {
      errorObj.password = "Password is Required";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }
    dispatch(loadingToggleAction(true));
    dispatch(loginAction(email, password, props.history));
  }
    // Password toggle handler
    const togglePassword = () => {
      // When the handler is invoked
      // inverse the boolean state of passwordShown
      setPasswordShown(!passwordShown);
    };


  // const buton = (
  //   props.showLoading===true?
  //   <button
  //   type="submit"
  //   className="btn bg-white text-primary btn-block"
  //   disabled
  // >
  //   Loading...
  // </button>:
  //     <button
  //     type="submit"
  //     className="btn bg-white text-primary btn-block"
  //   >
  //     Sign In
  //   </button>
  // )

  const buton = props.showLoading === true ? "Loading..." : "Sign In";
    // console.log(process.env.REACT_APP_MOMENTUM_ESS);
  let UI = ""
  if (process.env.REACT_APP_MOMENTUM_ESS==="true") {
    // alert("if")
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
                          Sign in by entering information below
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
                      <form onSubmit={onLogin}>
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
                        <label className="mb-2 ">
                            <strong className="text-white">Password</strong>
                          </label>
                        <div className="input-group">
                         
                          <input
                            type={passwordShown ? "text" : "password"}
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                          {errors.password && (
                            <div className="text-danger fs-12">
                              {errors.password}
                            </div>
                          )}
                        </div>

                        <div className="text-center mt-2">
                          <button
                            type="submit"
                            className="btn bg-white text-primary btn-block"
                          >
                            {buton}
                          </button>
                        </div>
                      </form>
                      <div className="new-account mt-2">
                        <p className="text-white">
                          Don't have an account?{" "}
                          <Link className="text-white" to="/signup">
                            Sign up
                          </Link>{" "}
                          <Link className="text-white" to="/resetpwd">
                            Reset Password
                          </Link>
                        </p>
                        {/* <p className="text-white">
                          Don't have an account as Staff?{" "}
                          <Link className="text-white" to="/sendpasswordreset">
                            New Staff
                          </Link>
                        </p> */}
                          <Link className="text-white" to="/" style={{textDecoration:'none',}}>
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
    )
  }
  else{
    // alert("else")
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
                            Sign in by entering information below
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
                        <form onSubmit={onLogin}>
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
                          <label className="mb-2 ">
                              <strong className="text-white">Password</strong>
                            </label>
                          <div className="input-group">
                           
                            <input
                              type={passwordShown ? "text" : "password"}
                              className="form-control"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
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
                            {errors.password && (
                              <div className="text-danger fs-12">
                                {errors.password}
                              </div>
                            )}
                          </div>
  
                          <div className="text-center mt-2">
                            <button
                              type="submit"
                              className="btn bg-white text-primary btn-block"
                            >
                              {buton}
                            </button>
                          </div>
                        </form>
                        <div className="new-account mt-2">
                          <p className="text-white">
                            Don't have an account?{" "}
                            <Link className="text-white" to="/signup">
                              Sign up
                            </Link>{" "}
                            <Link className="text-white" to="/resetpwd">
                              Reset Password
                            </Link>
                          </p>
                          {/* <p className="text-white">
                            Don't have an account as Staff?{" "}
                            <Link className="text-white" to="/sendpasswordreset">
                              New Staff
                            </Link>
                          </p> */}
                            <Link className="text-white" to="/" style={{textDecoration:'none',}}>
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
      )
  }
  return UI
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Login);
