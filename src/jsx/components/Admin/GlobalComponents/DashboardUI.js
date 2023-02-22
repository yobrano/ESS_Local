import { Link, withRouter } from "react-router-dom";
import "./DashboardUI.css";

const DashboardUI = () => {
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  return (
    <>
      <div className="col-md-4">
        <div className="card yellow-bg">
          <div className="card-header">
            <h4>Leave Shortcut</h4>
          </div>
          <div className="card-body">
            <ul className="shortcut-menu">
              <li>
                <Link to="/new-leave" style={{ textDecoration: "none" }} className="dui-a">
                  <i className="flaticon-381-add-1 mr-3"></i>
                  <span className="nav-text-drop">New Leave</span>
                </Link>
              </li>

              <li>
                <Link to="/leave-lists" style={{ textDecoration: "none" }} className="dui-a">
                  <i className="flaticon-381-album-1  mr-3"></i>
                  <span className="nav-text-drop">Pending Leaves</span>
                </Link>
              </li>

              <li>
                <Link to="/leave-approval" style={{ textDecoration: "none" }} className="dui-a">
                  <i className="flaticon-381-layer-1 mr-3"></i>
                  <span className="nav-text-drop">Approval Request</span>
                </Link>
              </li>
              <li>
                <Link style={{ textDecoration: "none" }} to="/supervisees" className="dui-a">
                  <i className="flaticon-381-sunglasses mr-3"></i>
                  <span className="nav-text-drop">Supervisees List</span>
                </Link>
              </li>
              <li className={`${path === "HR-dashboard" ? "" : "d-none"}`}>
                  <Link
                    to="/leave-dashboard"
                    style={{ textDecoration: "none" }}
                    className="dui-a"
                  >
                    <i className="flaticon-381-command mr-3"></i>
                    <span className="nav-text-drop">Leave Dashboard</span>
                  </Link>
                </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card pink-bg">
          <div className="card-header">
            <h4>Payroll Shortcut</h4>
          </div>
          <div className="card-body">
            <ul className="shortcut-menu">
              <li>
                <Link
                  className={`${path === "Payslip" ? "mm-active" : ""} dui-a`}
                  style={{ textDecoration: "none" }}
                  to="/Payslip"
                >
                  <i className="flaticon-381-stop mr-3"></i>
                  <span className="nav-text-drop">Payslip</span>
                </Link>
              </li>

              <li>
                <Link
                  className={`${path === "P-nine" ? "mm-active" : ""} dui-a`}
                  style={{ textDecoration: "none" }}
                  to="/P-nine"
                >
                  <i className="flaticon-381-blueprint  mr-3"></i>
                  <span className="nav-text-drop">P9</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card green-bg">
          <div className="card-header">
            <h4>Performance Appraisal Shortcut</h4>
          </div>
          <div className="card-body">
            <ul className="shortcut-menu">
              <li>
                <Link
                  className={`${
                    path === "employee-appraisal" ? "mm-active" : ""
                  } dui-a`}
                  to="/employee-appraisal"
                  style={{ textDecoration: "none" }}
                >
                  <i className="fa fa-ellipsis-h mr-1"></i>
                  <span className="nav-text-drop">Employee Appraisal</span>
                </Link>
              </li>

              <li>
                <Link
                  className={`${
                    path === "supervisor-appraisal" ? "mm-active" : ""
                  } dui-a`}
                  to="/supervisor-appraisal"
                  style={{ textDecoration: "none" }}
                >
                  <i className="fa fa-slideshare mr-1"></i>
                  <span className="nav-text-drop">Supervisor Appraisals</span>
                </Link>
              </li>

              <li>
                <Link
                  className={`${
                    path === "employee-moderation" ? "mm-active" : ""
                  } dui-a`}
                  to="/employee-moderation"
                  style={{ textDecoration: "none" }}
                >
                  <i className=" 	fa fa-delicious mr-1"></i>
                  <span className="nav-text-drop">Employee Moderated</span>
                </Link>
              </li>

              <li>
                <Link
                  className={`${
                    path === "supervisor-moderation" ? "mm-active" : ""
                  } dui-a`}
                  to="/supervisor-moderation"
                  style={{ textDecoration: "none" }}
                >
                  <i className="fa fa-crosshairs mr-1"></i>
                  <span className="nav-text-drop">Supervisor Moderated</span>
                </Link>
              </li>

              <li>
                <Link
                  className={`${
                    path === "employee-complete" ? "mm-active" : ""
                  } dui-a`}
                  to="/employee-complete"
                  style={{ textDecoration: "none" }}
                >
                  <i className="fa fa-first-order mr-1"></i>
                  <span className="nav-text-drop">Employee Completed</span>
                </Link>
              </li>

              <li>
                <Link
                  className={`${
                    path === "supervisor-complete" ? "mm-active" : ""
                  } dui-a`}
                  to="/supervisor-complete"
                  style={{ textDecoration: "none" }}
                >
                  <i className="fa fa-empire mr-1"></i>
                  <span className="nav-text-drop">Supervisor Completed</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card brown-bg">
          <div className="card-header">
            <h4>Documents Shortcut</h4>
          </div>
          <div className="card-body">
            <ul className="shortcut-menu">
              <li>
                <Link style={{ textDecoration: "none" }} to="/document-list" className="dui-a">
                  <i className="flaticon-381-album-1 mr-3"></i>
                  <span className="nav-text-drop">Document List</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(DashboardUI);
