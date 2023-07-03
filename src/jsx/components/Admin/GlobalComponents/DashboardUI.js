import { useState } from "react";
import { Collapse } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import "./DashboardUI.css";

const DashboardUI = () => {
  const [payrollCollapse, setPayrollCollapse] = useState(false);
  const [leaveCollapse, setLeaveCollapse] = useState(false);
  const [kpiCollapse, setKPICollapse] = useState(false);
  const [docCollapse, setDocsCollapse] = useState(false);
  const [compentenceCollapse, setCompentenceCollapse] = useState(false);

  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  const toggleCollapse = (from) => {
    switch (from) {
      case "payroll":
        setPayrollCollapse(!payrollCollapse);
        setLeaveCollapse(false);
        setKPICollapse(false);
        setDocsCollapse(false);
        setCompentenceCollapse(false);
        break;
      case "leave":
        setLeaveCollapse(!leaveCollapse);
        setPayrollCollapse(false);
        setKPICollapse(false);
        setDocsCollapse(false);
        setCompentenceCollapse(false);
        break;
      case "kpi":
        setKPICollapse(!kpiCollapse);
        setPayrollCollapse(false);
        setLeaveCollapse(false);
        setDocsCollapse(false);
        setCompentenceCollapse(false);
        break;
      case "compentence":
        setCompentenceCollapse(!compentenceCollapse);
        setKPICollapse(false);
        setPayrollCollapse(false);
        setLeaveCollapse(false);
        setDocsCollapse(false);
        break;
      default:
        setDocsCollapse(!docCollapse);
        setKPICollapse(false);
        setPayrollCollapse(false);
        setLeaveCollapse(false);
        setCompentenceCollapse(false);
        break;
    }
  };

  let competenceVisibility = "dashboard-item";
  if (process.env.REACT_APP_COMPETENCE_VISIBLE === "false") {
    competenceVisibility = "dashboard-item d-none";
  }

  let essdashboard = "";
  console.log(process.env.REACT_APP_MOMENTUM_ESS);
  if  (process.env.REACT_APP_MOMENTUM_ESS==="true") {
    essdashboard = (
      <>
        <div className="dashboard-item" onClick={() => toggleCollapse("leave")}>
          <div className="card moment dashui prussian-bg">
            <div className="card-header">
              <h4>Leave </h4>
              <i className="flaticon-381-time ml-3"></i>
            </div>
            <Collapse in={leaveCollapse}>
              <div className="card-body">
                <ul className="shortcut-menu">
                  <li>
                    <Link
                      to="/new-leave"
                      style={{ textDecoration: "none" }}
                      className="dui-am"
                    >
                      {/* <i className="flaticon-381-add-1 mr-3"></i> */}
                      <span className="nav-text-drop">New Leave</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/leave-lists"
                      style={{ textDecoration: "none" }}
                      className="dui-am"
                    >
                      {/* <i className="flaticon-381-album-1  mr-3"></i> */}
                      <span className="nav-text-drop">Pending Leaves</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/leave-approval"
                      style={{ textDecoration: "none" }}
                      className="dui-am"
                    >
                      {/* <i className="flaticon-381-layer-1 mr-3"></i> */}
                      <span className="nav-text-drop">Approval Request</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/supervisees"
                      className="dui-am"
                    >
                      {/* <i className="flaticon-381-sunglasses mr-3"></i> */}
                      <span className="nav-text-drop">Supervisees List</span>
                    </Link>
                  </li>
                  <li className={`${path === "HR-dashboard" ? "" : "d-none"}`}>
                    <Link
                      to="/leave-dashboard"
                      style={{ textDecoration: "none" }}
                      className="dui-am"
                    >
                      {/* <i className="flaticon-381-command mr-3"></i> */}
                      <span className="nav-text-drop">Leave Dashboard</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </div>
        </div>

        <div
          className="dashboard-item"
          onClick={() => toggleCollapse("payroll")}
        >
          <div className="card moment dashui mango-bg">
            <div className="card-header">
              <h4>Payroll </h4>
              <i className="flaticon-381-database ml-3"></i>
            </div>

            <Collapse in={payrollCollapse}>
              <div className="card-body">
                <ul className="shortcut-menu">
                  <li>
                    <Link
                      className={`${
                        path === "Payslip" ? "mm-active" : ""
                      } dui-am`}
                      style={{ textDecoration: "none" }}
                      to="/Payslip"
                    >
                      {/* <i className="flaticon-381-stop mr-3"></i> */}
                      <span className="nav-text-drop">Payslip</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      className={`${
                        path === "P-nine" ? "mm-active" : ""
                      } dui-am`}
                      style={{ textDecoration: "none" }}
                      to="/P-nine"
                    >
                      {/* <i className="flaticon-381-blueprint  mr-3"></i> */}
                      <span className="nav-text-drop">P9</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </div>
        </div>

        <div className="dashboard-item" onClick={() => toggleCollapse("kpi")}>
          <div className="card moment dashui windsor-bg">
            <div className="card-header">
              <h4>KPI </h4>
              <i className="flaticon-381-network-1 ml-3"></i>
            </div>
            <Collapse in={kpiCollapse}>
              <div className="card-body">
                <ul className="shortcut-menu">
                  <li>
                    <Link
                      className={`${
                        path === "employee-appraisal" ? "mm-active" : ""
                      } dui-am`}
                      to="/employee-appraisal"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="fa fa-ellipsis-h mr-1"></i> */}
                      <span className="nav-text-drop">Employee Appraisal</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      className={`${
                        path === "supervisor-appraisal" ? "mm-active" : ""
                      } dui-am`}
                      to="/supervisor-appraisal"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="fa fa-slideshare mr-1"></i> */}
                      <span className="nav-text-drop">
                        Supervisor Appraisals
                      </span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      className={`${
                        path === "employee-moderation" ? "mm-active" : ""
                      } dui-am`}
                      to="/employee-moderation"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className=" 	fa fa-delicious mr-1"></i> */}
                      <span className="nav-text-drop">Employee Moderated</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      className={`${
                        path === "supervisor-moderation" ? "mm-active" : ""
                      } dui-am`}
                      to="/supervisor-moderation"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="fa fa-crosshairs mr-1"></i> */}
                      <span className="nav-text-drop">
                        Supervisor Moderated
                      </span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      className={`${
                        path === "employee-complete" ? "mm-active" : ""
                      } dui-am`}
                      to="/employee-complete"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="fa fa-first-order mr-1"></i> */}
                      <span className="nav-text-drop">Employee Completed</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      className={`${
                        path === "supervisor-complete" ? "mm-active" : ""
                      } dui-am`}
                      to="/supervisor-complete"
                      style={{ textDecoration: "none" }}
                    >
                      {/* <i className="fa fa-empire mr-1"></i> */}
                      <span className="nav-text-drop">
                        Supervisor Completed
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </div>
        </div>

        <div className="dashboard-item" onClick={() => toggleCollapse("doc")}>
          <div className="card moment dashui spotblack-bg">
            <div className="card-header">
              <h4>Policies </h4>
              <i className="flaticon-381-folder-5 ml-3"></i>
            </div>
            <Collapse in={docCollapse}>
              <div className="card-body">
                <ul className="shortcut-menu">
                  <li>
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/document-list"
                      className="dui-am"
                    >
                      {/* <i className="flaticon-381-album-1 mr-3"></i> */}
                      <span className="nav-text-drop">Document List</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </div>
        </div>

        <div
          className={competenceVisibility}
          onClick={() => toggleCollapse("compentence")}
        >
          <div className="card moment dashui umberburnt-bg">
            <div className="card-header">
              <h4>Competency Framework </h4>
              <i className="flaticon-381-app ml-3"></i>
            </div>
            <Collapse in={compentenceCollapse}>
              <div className="card-body">
                <ul className="shortcut-menu">
                  <li>
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/competency-list"
                      className="dui-am"
                    >
                      <span className="nav-text-drop">Competency List</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/approve-competency"
                      className="dui-am"
                    >
                      <span className="nav-text-drop">Approve Competence</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </div>
        </div>
      </>
    );
  } else {
    essdashboard = (
      <>
        <div className="dashboard-item" onClick={() => toggleCollapse("leave")}>
          <div className="card yellow-bg">
            <div className="card-header">
              <h4>Leave</h4>
              <i className="flaticon-381-time ml-3"></i>
            </div>
            <Collapse in={leaveCollapse}>
              <div className="card-body">
                <ul className="shortcut-menu">
                  <li>
                    <Link
                      to="/new-leave"
                      style={{ textDecoration: "none" }}
                      className="dui-a"
                    >
                      {/* <i className="flaticon-381-add-1 mr-3"></i> */}
                      <span className="nav-text-drop">New Leave</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/leave-lists"
                      style={{ textDecoration: "none" }}
                      className="dui-a"
                    >
                      {/* <i className="flaticon-381-album-1  mr-3"></i> */}
                      <span className="nav-text-drop">Pending Leaves</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/leave-approval"
                      style={{ textDecoration: "none" }}
                      className="dui-a"
                    >
                      {/* <i className="flaticon-381-layer-1 mr-3"></i> */}
                      <span className="nav-text-drop">Approval Request</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/supervisees"
                      className="dui-a"
                    >
                      {/* <i className="flaticon-381-sunglasses mr-3"></i> */}
                      <span className="nav-text-drop">Supervisees List</span>
                    </Link>
                  </li>
                  <li className={`${path === "HR-dashboard" ? "" : "d-none"}`}>
                    <Link
                      to="/leave-dashboard"
                      style={{ textDecoration: "none" }}
                      className="dui-a"
                    >
                      {/* <i className="flaticon-381-command mr-3"></i> */}
                      <span className="nav-text-drop">Leave Dashboard</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </div>
        </div>

        <div
          className="dashboard-item"
          onClick={() => toggleCollapse("payroll")}
        >
          <div className="card pink-bg">
            <div className="card-header">
              <h4>Payroll </h4>
              <i className="flaticon-381-database ml-3"></i>
            </div>

            <Collapse in={payrollCollapse}>
              <div className="card-body">
                <ul className="shortcut-menu">
                  <li>
                    <Link
                      className={`${
                        path === "Payslip" ? "mm-active" : ""
                      } dui-a`}
                      style={{ textDecoration: "none" }}
                      to="/Payslip"
                    >
                      {/* <i className="flaticon-381-stop mr-3"></i> */}
                      <span className="nav-text-drop">Payslip</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      className={`${
                        path === "P-nine" ? "mm-active" : ""
                      } dui-a`}
                      style={{ textDecoration: "none" }}
                      to="/P-nine"
                    >
                      {/* <i className="flaticon-381-blueprint  mr-3"></i> */}
                      <span className="nav-text-drop">P9</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </div>
        </div>

        <div className="dashboard-item" onClick={() => toggleCollapse("kpi")}>
          <div className="card green-bg">
            <div className="card-header">
              <h4>KPI </h4>
              <i className="flaticon-381-network-1 ml-3"></i>
            </div>
            <Collapse in={kpiCollapse}>
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
                      {/* <i className="fa fa-ellipsis-h mr-1"></i> */}
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
                      {/* <i className="fa fa-slideshare mr-1"></i> */}
                      <span className="nav-text-drop">
                        Supervisor Appraisals
                      </span>
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
                      {/* <i className=" 	fa fa-delicious mr-1"></i> */}
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
                      {/* <i className="fa fa-crosshairs mr-1"></i> */}
                      <span className="nav-text-drop">
                        Supervisor Moderated
                      </span>
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
                      {/* <i className="fa fa-first-order mr-1"></i> */}
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
                      {/* <i className="fa fa-empire mr-1"></i> */}
                      <span className="nav-text-drop">
                        Supervisor Completed
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </div>
        </div>

        <div className="dashboard-item" onClick={() => toggleCollapse("doc")}>
          <div className="card brown-bg">
            <div className="card-header">
              <h4>Policies </h4>
              <i className="flaticon-381-folder-5 ml-3"></i>
            </div>
            <Collapse in={docCollapse}>
              <div className="card-body">
                <ul className="shortcut-menu">
                  <li>
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/document-list"
                      className="dui-a"
                    >
                      {/* <i className="flaticon-381-album-1 mr-3"></i> */}
                      <span className="nav-text-drop">Document List</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </div>
        </div>

        <div
          className={competenceVisibility}
          onClick={() => toggleCollapse("compentence")}
        >
          <div className="card orange-bg">
            <div className="card-header">
              <h4>Competency Framework </h4>
              <i className="flaticon-381-app ml-3"></i>
            </div>
            <Collapse in={compentenceCollapse}>
              <div className="card-body">
                <ul className="shortcut-menu">
                  <li>
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/competency-list"
                      className="dui-a"
                    >
                      <span className="nav-text-drop">Competency List</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ textDecoration: "none" }}
                      to="/approve-competency"
                      className="dui-a"
                    >
                      <span className="nav-text-drop">Approve Competence</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </div>
        </div>
      </>
    );
  }

  return essdashboard;
};

export default withRouter(DashboardUI);
