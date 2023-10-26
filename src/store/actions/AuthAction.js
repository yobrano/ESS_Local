import swal from "sweetalert";
import  secureLocalStorage  from  "react-secure-storage"; import { decryptToken} from "./../../AppUtility"; import jwt_decode from "jwt-decode";
import RedirectToDocIfNotRead from "../../jsx/components/Admin/GlobalComponents/RedirectToDocIfNotRead";
import {
  formatError,
  login,
  RedirectToDocIfNotReadFn,
  runLogoutTimer,
  saveTokenInLocalStorage,
  signUp,
  signUpAdmin,
} from "../../services/AuthService";

export const SIGNUP_CONFIRMED_ACTION = "[signup action] confirmed signup";
export const SIGNUP_FAILED_ACTION = "[signup action] failed signup";
export const LOGIN_CONFIRMED_ACTION = "[login action] confirmed login";
export const LOGIN_FAILED_ACTION = "[login action] failed login";
export const LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";
export const LOGOUT_ACTION = "[Logout action] logout action";


export function signupActionAdmin(email, password, name, hrID, history) {
  return (dispatch) => {
    signUpAdmin(email, password, name, hrID, history)
      .then((response) => {
        if (response.status === 208) {
          dispatch(signupFailedAction(response.data.message));
          // alert(response.data.message)
          // =>console.log(response.data);
        } else {
          saveTokenInLocalStorage(response.data);
          runLogoutTimer(dispatch, response.data.expiresIn * 1000, history);
          dispatch(confirmedSignupAction(response.data));
          history.push("/");
        }
      })
      .catch((error) => {
       // swal("Ops",error.response.data.message.toString(),"error")
        // // =>console.log(error.response.data.message);
        const errorMessage = formatError(error.response.data);
        dispatch(signupFailedAction(errorMessage));
      });
  };
}

export function signupAction(email, password, username, name, history) {
  return (dispatch) => {
    signUp(email, password, username, name)
      .then((response) => {
        if (response.status === 208) {
          dispatch(signupFailedAction(response.data.message));
          // alert(response.data.message)
          // =>console.log(response.data);
        } else {
          // =>console.log(response.data);
          // saveTokenInLocalStorage(response.data);
          // runLogoutTimer(
          //     dispatch,
          //     response.data.expiresIn * 1000,
          //     history,
          // );

          dispatch(confirmedSignupAction(response.data));
          history.push("/login");
        }
      })
      .catch((error) => {
        // dispatch(loadingToggleAction(false));
        const errorMessage = formatError(error.response.data.message);
        dispatch(signupFailedAction(errorMessage));
      });
  };
}

export function logout(history) {
  secureLocalStorage.removeItem("userDetails");
  secureLocalStorage.removeItem("expireDate");
  history.push("/");
  return {
    type: LOGOUT_ACTION,
  };
}


export function loginAction(email, password, history) {
  return (dispatch) => {
    login(email, password)
      .then((response) => {
        // // =>console.log(response.data);
        saveTokenInLocalStorage(response.data);

        // runLogoutTimer(
        //     dispatch,
        //     response.data.expiresIn * 1000,
        //     history,
        // );
        dispatch(loginConfirmedAction(response.data));
        // if (response.data.user.length > 0) {
          
        // } else {
          
        // }
        // // =>console.log(jwt_decode(decryptToken(secureLocalStorage.getItem("userDetails"))));
        if (jwt_decode(decryptToken(secureLocalStorage.getItem("userDetails"))).Role.length === 0) {
          history.push("/dashboard");
        } else if (
          jwt_decode(decryptToken(secureLocalStorage.getItem("userDetails"))).Role === "HOD"
        ) {
         
          // history.push("/HOD-dashboard");
          RedirectToDocIfNotReadFn().then(function (response) {
            // =>console.log( response.data);
            if(response.data.return_value){
              history.push("/HOD-dashboard");
             }else{
              history.push("/document-list");
             }
  
          })
          .catch((err) => {
            console.log({ err: err });
          
            if (err.response !== undefined) {
              swal("Ooh!", err.response.data.message, "error");

            } else {

              swal("Oh!", err.message, "error");
            }
            
          });

        }

        else if (
          jwt_decode(decryptToken(secureLocalStorage.getItem("userDetails"))).Role === "HOD-ADMIN"
        ) {
          //history.push("/HOD-dashboard");
          RedirectToDocIfNotReadFn().then(function (response) {
            // =>console.log( response.data);
            if(response.data.return_value){
              history.push("/HOD-dashboard");
             }else{
              history.push("/document-list");
             }
  
          })
          .catch((err) => {
            console.log({ err: err });
          
            if (err.response !== undefined) {
              swal("Ooh!", err.response.data.message, "error");

            } else {

              swal("Oh!", err.message, "error");
            }
            
          });

        }

        else if (
          jwt_decode(decryptToken(secureLocalStorage.getItem("userDetails"))).Role === "HOD-IT"
        ) {
          //history.push("/HOD-dashboard");
          RedirectToDocIfNotReadFn().then(function (response) {
            // =>console.log( response.data);
            if(response.data.return_value){
              history.push("/HOD-dashboard");
             }else{
              history.push("/document-list");
             }
  
          })
          .catch((err) => {
            console.log({ err: err });
          
            if (err.response !== undefined) {
              swal("Ooh!", err.response.data.message, "error");

            } else {

              swal("Oh!", err.message, "error");
            }
            
          });

        }

        else if (
          jwt_decode(decryptToken(secureLocalStorage.getItem("userDetails"))).Role === "HOD-HR"
        ) {
          //history.push("/HOD-dashboard");
          RedirectToDocIfNotReadFn().then(function (response) {
            // =>console.log( response.data);
            if(response.data.return_value){
              history.push("/HOD-dashboard");
             }else{
              history.push("/document-list");
             }
  
          })
          .catch((err) => {
            console.log({ err: err });
          
            if (err.response !== undefined) {
              swal("Ooh!", err.response.data.message, "error");

            } else {

              swal("Oh!", err.message, "error");
            }
            
          });

        }

        else if (
          jwt_decode(decryptToken(secureLocalStorage.getItem("userDetails"))).Role === "HOD-FIN"
        ) {
          //history.push("/HOD-dashboard");
          RedirectToDocIfNotReadFn().then(function (response) {
            // =>console.log( response.data);
            if(response.data.return_value){
              history.push("/HOD-dashboard");
             }else{
              history.push("/document-list");
             }
  
          })
          .catch((err) => {
            console.log({ err: err });
          
            if (err.response !== undefined) {
              swal("Ooh!", err.response.data.message, "error");

            } else {

              swal("Oh!", err.message, "error");
            }
            
          });

        }

        
        else if (
          jwt_decode(decryptToken(secureLocalStorage.getItem("userDetails"))).Role === "MD"
        ) {
        
          // history.push("/MD-dashboard");
          RedirectToDocIfNotReadFn().then(function (response) {
            // =>console.log( response.data);
            if(response.data.return_value){
              history.push("/MD-dashboard");
             }else{
              history.push("/document-list");
             }
  
          })
          .catch((err) => {
            console.log({ err: err });
          
            if (err.response !== undefined) {
              swal("Ooh!", err.response.data.message, "error");

            } else {

              swal("Oh!", err.message, "error");
            }
            
          });

        }
        else if (
          jwt_decode(decryptToken(secureLocalStorage.getItem("userDetails"))).Role === "FD"
        ) {
          //history.push("/FD-dashboard");
          RedirectToDocIfNotReadFn().then(function (response) {
            // =>console.log( response.data);
            if(response.data.return_value){
              history.push("/FD-dashboard");
             }else{
              history.push("/document-list");
             }
  
          })
          .catch((err) => {
            console.log({ err: err });
          
            if (err.response !== undefined) {
              swal("Ooh!", err.response.data.message, "error");

            } else {

              swal("Oh!", err.message, "error");
            }
            
          }); 
        }

        else if (
          jwt_decode(decryptToken(secureLocalStorage.getItem("userDetails"))).Role === "NOS"
        ) {
          //history.push("/FD-dashboard");
          RedirectToDocIfNotReadFn().then(function (response) {
            // =>console.log( response.data);
            if(response.data.return_value){
              history.push("/NOS-dashboard");
             }else{
              history.push("/document-list");
             }
  
          })
          .catch((err) => {
            console.log({ err: err });
          
            if (err.response !== undefined) {
              swal("Ooh!", err.response.data.message, "error");

            } else {

              swal("Oh!", err.message, "error");
            }
            
          });
        }


        else if (
          jwt_decode(decryptToken(secureLocalStorage.getItem("userDetails"))).Role === "NORMAL"
        ) {
          //history.push("/staff-dashboard");
          RedirectToDocIfNotReadFn().then(function (response) {
            // =>console.log( response.data);
            if(response.data.return_value){
              history.push("/staff-dashboard");
             }else{
              history.push("/document-list");
             }
  
          })
          .catch((err) => {
            console.log({ err: err });
          
            if (err.response !== undefined) {
              swal("Ooh!", err.response.data.message, "error");

            } else {

              swal("Oh!", err.message, "error");
            }
            
          });
        }
         else if (
          jwt_decode(decryptToken(secureLocalStorage.getItem("userDetails"))).Role === "HR"
        ) {


          RedirectToDocIfNotReadFn().then(function (response) {
            // =>console.log( response.data);
            if(response.data.return_value){
              history.push("/HR-dashboard");
             }else{
              history.push("/document-list");
             }
  
          })
          .catch((err) => {
            console.log({ err: err });
          
            if (err.response !== undefined) {
              swal("Ooh!", err.response.data.message, "error");

            } else {

              swal("Oh!", err.message, "error");
            }
            
          });

           //history.push("/HRdashboard");
        
          //dispatch(logout(history));
         
        } 
        else if (
          jwt_decode(decryptToken(secureLocalStorage.getItem("userDetails"))).Role === "HEAD-HR"
        ) {


          RedirectToDocIfNotReadFn().then(function (response) {
            // =>console.log( response.data);
            if(response.data.return_value){
              history.push("/HR-dashboard");
             }else{
              history.push("/document-list");
             }
  
          })
          .catch((err) => {
            console.log({ err: err });
          
            if (err.response !== undefined) {
              swal("Ooh!", err.response.data.message, "error");

            } else {

              swal("Oh!", err.message, "error");
            }
            
          });

           //history.push("/HRdashboard");
        
          //dispatch(logout(history));
         
        }
        else {
        }

        // //window.location.reload();

        // //history.pushState('/index');
      })
      .catch((error) => {
        // dispatch(loadingToggleAction(false));
        // =>console.log(error);
        // const errorMessage = formatError(error.response.data);
        // dispatch(loginFailedAction(errorMessage));
      });
  };
}

export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(data) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}

export function confirmedSignupAction(payload) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function signupFailedAction(message) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload: message,
  };
}

export function loadingToggleAction(status) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}
