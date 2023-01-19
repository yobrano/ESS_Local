import React from "react";
import { connect, useDispatch } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { logout } from "../../../store/actions/AuthAction";
import { isAuthenticated } from "../../../store/selectors/AuthSelectors";

function LogoutPage(props) {
  const dispatch = useDispatch();

  function onLogout() {
    dispatch(logout(props.history));
    // window.location.reload();
  }
  return (
    <>
     <Link
        className="dropdown-item ai-icon"
        // onClick={onLogout}
        to="/profile"
      >
       
        <svg
          //   width="24"
          //   height="24"
          //   viewBox="0 0 24 24"
          //   fill="none"
          //   xmlns="http://www.w3.org/2000/svg"
          id="icon-profile"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M12 2C6.579 2 2 6.579 2 12C2 17.421 6.579 22 12 22C17.421 22 22 17.421 22 12C22 6.579 17.421 2 12 2ZM12 7C13.727 7 15 8.272 15 10C15 11.728 13.727 13 12 13C10.274 13 9 11.728 9 10C9 8.272 10.274 7 12 7ZM6.894 16.772C7.791 15.452 9.287 14.572 11 14.572H13C14.714 14.572 16.209 15.452 17.106 16.772C15.828 18.14 14.015 19 12 19C9.985 19 8.172 18.14 6.894 16.772Z"
            // fill="white"
          />
        </svg>

        <span className="ml-2">Profile </span>

      </Link>
      <Link className="dropdown-item ai-icon" onClick={onLogout} to={"#"}>
        <svg
          id="icon-logout"
          xmlns="http://www.w3.org/2000/svg"
          className="text-danger"
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1={21} y1={12} x2={9} y2={12} />
        </svg>
        <span className="ml-2">Logout </span>
      </Link>
     
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

export default withRouter(connect(mapStateToProps)(LogoutPage));
