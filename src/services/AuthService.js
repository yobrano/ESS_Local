import axios from "axios";
import swal from "sweetalert";
import { loginConfirmedAction, logout } from "../store/actions/AuthAction";

export function signUpAdmin(email, password, Username, EmployeeId, history) {
  //axios call

  const postData = {
    email,
    password,
    Username,
    EmployeeId,
    returnSecureToken: true,
  };

  return axios.post(
    `${process.env.REACT_APP_API_S_LINK}/authenticate/register-admin`,
    postData
  );
  // return axios.post(
  //     `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3RPAp3nuETDn9OQimqn_YF6zdzqWITII`,
  //     postData,
  // );
}

export function signUp(Email, Password, Username, Name) {
  //axios call

  const postData = {
    Email,
    Password,
    Username,
    Name,
    returnSecureToken: true,
  };

  return axios.post(
    `${process.env.REACT_APP_API_S_LINK}/authenticate/register`,
    postData
  );
  // return axios.post(
  //     `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3RPAp3nuETDn9OQimqn_YF6zdzqWITII`,
  //     postData,
  // );
}

export function login(Email, Password) {
  const postData = {
    Email,
    Password,
    // returnSecureToken: true,
  };

  // const postData = {
  //     email,
  //     password,
  //     returnSecureToken: true,
  // };

  return axios.post(
    `${process.env.REACT_APP_API_S_LINK}/authenticate/login`,
    postData
  );
  // return axios.post(
  //     `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3RPAp3nuETDn9OQimqn_YF6zdzqWITII`,
  //     postData,
  // );
}

export function formatError(errorResponse) {
  switch (errorResponse.message) {
    case "EMAIL_EXISTS":
      //return 'Email already exists';
      swal("Oops", "Email already exists", "error");
      break;
    case "EMAIL_NOT_FOUND":
      //return 'Email not found';
      swal("Oops", "Email not found", "error", { button: "Try Again!" });
      break;
    case "INVALID_PASSWORD":
      //return 'Invalid Password';
      swal("Oops", "Invalid Password", "error", { button: "Try Again!" });
      break;
    case "INVALID_USER":
      //return 'Invalid Password';
      swal("Oops", "Invalid Credential", "error", { button: "Try Again!" });
      break;
      case "USER_EXIST":
      //return 'Invalid Password';
      swal("Oops", "User Exist", "error", { button: "Try Again!" });
      break;
      case "CREATION_FAILED":
        //return 'Invalid Password';
        swal("Oops", "Registration Failed", "error", { button: "Try Again!" });
        break;
    case "INVALID_USER_D365":
      //return 'Invalid Password';
      swal("Oops", "Invalid D365 User", "error", { button: "Try Again!" });
      break;
    case "USER_DISABLED":
      return "User Disabled";

    default:
      return errorResponse.message;
  }
}

export function saveTokenInLocalStorage(tokenDetails) {
  // tokenDetails.expireDate = new Date(
  //     new Date().getTime() + tokenDetails.expiresIn * 1000,
  // );
  localStorage.setItem("userDetails", JSON.stringify(tokenDetails));
}

export function runLogoutTimer(dispatch, timer, history) {
  setTimeout(() => {
    dispatch(logout(history));
  }, timer);
}

export function checkAutoLogin(dispatch, history) {
  const tokenDetailsString = localStorage.getItem("userDetails");
  let tokenDetails = "";
  if (!tokenDetailsString) {
    dispatch(logout(history));
    return;
  }

  tokenDetails = JSON.parse(tokenDetailsString);
  let expireDate = new Date(tokenDetails.expireDate);
  let todaysDate = new Date();

  if (todaysDate > expireDate) {
    dispatch(logout(history));
    return;
  }
  dispatch(loginConfirmedAction(tokenDetails));

  const timer = expireDate.getTime() - todaysDate.getTime();
  runLogoutTimer(dispatch, timer, history);
}


export function RedirectToDocIfNotReadFn(){

      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userDetails")).idToken
          }`,
        },
      };
      return axios
        .get(
          `${process.env.REACT_APP_API_S_LINK}/documents/checkifdocumentisread/`,
          config
        )
  
      
    }
   

