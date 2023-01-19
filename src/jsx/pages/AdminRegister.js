import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  loadingToggleAction,
  signupActionAdmin,
} from "../../store/actions/AuthAction";

//
import logo from "../../images/logo.png";
import logotext from "../../images/logo-text.png";
import login from "../../images/bg-login2.png";
import loginbg from "../../images/bg-login.jpg";

function AdminRegister(props) {
  // const [email, setEmail] = useState('demo@example.com');
  // let errorsObj = { email: '', password: '' };
  // const [errors, setErrors] = useState(errorsObj);
  // const [password, setPassword] = useState('123456');
  // const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [empid, setEmpid] = useState("");
  const [username, setUsername] = useState("");
  let errorsObj = { email: "", username: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const dispatch = useDispatch();

  function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === "") {
      errorObj.email = "Email is Required";
      error = true;
    }
    if (empid === "") {
      errorObj.empid = "Employee ID is Required";
      error = true;
    }
    if (username === "") {
      errorObj.username = "Username is Required";
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
    dispatch(
      signupActionAdmin(email, password, username, empid, props.history)
    );
  }

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  return (
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
                        <p className="fs-12 text-black">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,</p> */}
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
              {/* <Link to={"#"} className="text-black mr-4">Privacy Policy</Link> */}
              {/* <Link to={"#"} className="text-black mr-4">Contact</Link> */}
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
                        {/* <h3 className="text-white mb-1">Welcome to Platinum Credit Jobs</h3> */}
                        <p className="text-white">
                          Sign Up by entering information below
                        </p>
                      </div>
                      {props.errorMessage && (
                        <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                          {props.errorMessage}
                        </div>
                      )}
                      {props.successMessage && (
                        <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                          {props.successMessage}
                        </div>
                      )}
                      <form onSubmit={onLogin}>
                        <div className="form-group">
                          <label className="mb-2 ">
                            <strong className="text-white">
                              Employee Number
                            </strong>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={empid}
                            onChange={(e) => {setEmpid(e.target.value);setUsername(e.target.value)}}
                          />
                          {errors.empid && (
                            <div className="text-danger fs-12">
                              {errors.empid}
                            </div>
                          )}
                        </div>
                        {/* <div className="form-group">
                          <label className="mb-2 ">
                            <strong className="text-white">Username</strong>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                          {errors.username && (
                            <div className="text-danger fs-12">
                              {errors.username}
                            </div>
                          )}
                        </div> */}
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
                         
                        </div>
                        {errors.password && (
                            <div className=" fs-12" 
                            style={{
                              fontWeight: "bold",
                              color: "#b31919",
                            }}
                            >
                              {errors.password}
                            </div>
                          )}
                        {/* <div className="form-row d-flex justify-content-between mt-4 mb-2">
                                    <div className="form-group">
                                      <div className="custom-control custom-checkbox ml-1 ">
                                        <input
                                          type="checkbox"
                                          className="form-check-input"
                                          id="basic_checkbox_1"
                                        />
                                        <label
                                          className="form-check-label text-white"
                                          htmlFor="basic_checkbox_1 "
                                        >
                                          Remember my preference
                                        </label>
                                      </div>
                                    </div>
                                  </div> */}
                        <div className="text-center mt-2">
                          <button
                            type="submit"
                            className="btn bg-white text-primary btn-block"
                          >
                            Sign In
                          </button>
                        </div>
                      </form>
                      <div className="new-account mt-4">
                        <p className="text-white d-flex align-items-center">
                          <span>Don't have an account as Staff?</span>
                          <Link className="btn btn-dark text-white ml-auto" to="/sendpasswordreset">
                            New Staff
                          </Link>
                        </p>

                        <p className="text-white mt-3">
                          <Link
                            className="text-white"
                            to="/"
                            style={{ textDecoration: "none" }}
                          >
                            <i className="fa fa-arrow-left"></i>
                            <span className="ml-3"> Go Back Link</span>
                          </Link>
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
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(AdminRegister);
// export default AdminRegister;
