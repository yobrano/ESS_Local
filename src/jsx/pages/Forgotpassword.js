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
import "./UIStyle.css";
import  secureLocalStorage  from  "react-secure-storage"; 
import { decryptToken} from "./../../AppUtility"; 

function Forgot(props) {
  const [email, setEmail] = useState("");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("");
  const [passwordt, setPasswordt] = useState("");
  const [token, setToken] = useState("");
  // const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(false);
  // const {id} = props.match.params

  // secureLocalStorage.setItem('resettoken',id)

  // function onLogin(e) {
  //   e.preventDefault();
  //   let error = false;
  //   const errorObj = { ...errorsObj };
  //   if (email === "") {
  //     errorObj.email = "Email is Required";
  //     error = true;
  //   }
  //   if (password === "") {
  //     errorObj.password = "Password is Required";
  //     error = true;
  //   }
  //   setErrors(errorObj);
  //   if (error) {
  //     return;
  //   }
  //   dispatch(loadingToggleAction(true));
  //   dispatch(loginAction(email, password, props.history));
  // }

  const onRequest = (e) => {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (password !== passwordt || password === "") {
      errorObj.password = "Password must match";
      error = true;
    }

    let Email = props.location.state[0].datax;
    // let Email = lcal.mail;

    let datum = {
      Token: token,
      Email: Email,
      Password: password,
    };

    setShowLoading(true);
    axios
      .post(`${process.env.REACT_APP_API_S_LINK}/home/forgotten`, datum)
      .then(function (response) {
        if (response.status === 200) {
          swal("Success!", "Successfully reset", "success");
          setShowLoading(false);
          // =>console.log(response.data);
        }
        if (response.status === 404) {
          // alert(response.data.message);
        }
      })
      .catch((err) => {
        if(err.response!==undefined){
          swal("Oh!", err.response.data.message, "error");
        }else{
          swal("Oh!", err.message, "error");
        }
        setShowLoading(false);
        console.log({ err: err });
      });
  };

  const buton = showLoading === true ? "Loading..." : "Change";

  let UI = ""
  if  (process.env.REACT_APP_MOMENTUM_ESS==="true") {
    UI =( <div
      className="login-main-page"
      style={{ backgroundImage: "url(" + loginbg + ")" }}
    >
      <div className="login-wrapper">
        <div
          className="login-aside-left"
          style={{ backgroundImage: "url(" + login + ")" }}
        >
 <Link to="/" className="login-logo" style={{width:'150px'}}>
            <img src={logo} alt="" className="mr-2" style={{width:'100%',height:'100%'}} />
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
            <a href={"https://intergral-gs.com/"} rel="noreferrer" target="_blank" className="text-black" style={{textDecoration:'none',fontSize: '13px'}}>© {new Date().getFullYear()} {process.env.REACT_APP_NAME} Design by Intergral Group Solution Ltd</a>
             
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
                        </div>
                        <div className="form-group">
                          <label className="mb-2 ">
                            <strong className="text-white">Password</strong>
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          {errors.password && (
                            <div className="text-danger fs-12">
                              {errors.password}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label className="mb-2 ">
                            <strong className="text-white">Re-Password</strong>
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            value={passwordt}
                            onChange={(e) => setPasswordt(e.target.value)}
                          />
                          {errors.password && (
                            <div className="text-danger fs-12">
                              {errors.password}
                            </div>
                          )}
                        </div>

                        <div className="text-center">
                          <button
                            // type="submit"
                            onClick={onRequest}
                            className="btn bg-white text-primary btn-block"
                          >
                            {buton}
                          </button>
                        </div>
                      </form>
                      <div className="new-account mt-2">
                        <p className="text-white">
                          {/* Don't have an account?{" "} */}
                          <Link className="text-white" to="/login">
                            Login
                          </Link>
                          {" "}
                          {/* <Link className="text-white" to="/resetpwd">
                            Reset Password
                          </Link> */}
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
    UI =( <div
      className="login-main-page"
      style={{ backgroundImage: "url(" + loginbg + ")" }}
    >
      <div className="login-wrapper">
        <div
          className="login-aside-left"
          style={{ backgroundImage: "url(" + login + ")" }}
        >
 <Link to="/" className="login-logo" style={{width:'150px'}}>
            <img src={logo} alt="" className="mr-2" style={{width:'100%',height:'100%'}} />
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
            <a href={"https://intergral-gs.com/"} rel="noreferrer" target="_blank" className="text-black" style={{textDecoration:'none',fontSize: '13px'}}>© {new Date().getFullYear()} {process.env.REACT_APP_NAME} Design by Intergral Group Solution Ltd</a>
             
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
                        </div>
                        <div className="form-group">
                          <label className="mb-2 ">
                            <strong className="text-white">Password</strong>
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          {errors.password && (
                            <div className="text-danger fs-12">
                              {errors.password}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label className="mb-2 ">
                            <strong className="text-white">Re-Password</strong>
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            value={passwordt}
                            onChange={(e) => setPasswordt(e.target.value)}
                          />
                          {errors.password && (
                            <div className="text-danger fs-12">
                              {errors.password}
                            </div>
                          )}
                        </div>

                        <div className="text-center">
                          <button
                            // type="submit"
                            onClick={onRequest}
                            className="btn bg-white text-primary btn-block"
                          >
                            {buton}
                          </button>
                        </div>
                      </form>
                      <div className="new-account mt-2">
                        <p className="text-white">
                          {/* Don't have an account?{" "} */}
                          <Link className="text-white" to="/login">
                            Login
                          </Link>
                          {" "}
                          {/* <Link className="text-white" to="/resetpwd">
                            Reset Password
                          </Link> */}
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

// const mapStateToProps = (state) => {
//   return {
//     errorMessage: state.auth.errorMessage,
//     successMessage: state.auth.successMessage,
//     showLoading: state.auth.showLoading,
//   };
// };
export default withRouter(Forgot);
