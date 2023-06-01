import React, { Component } from "react";
/// Menu
import MetisMenu from "metismenujs";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new MetisMenu(this.$el);
  }
  componentWillUnmount() {}
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

class SideBar extends Component {
  /// Open menu
  componentDidMount() {
    // sidebar open/close
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);
  }
  state = {
    loveEmoji: false,
  };
  render() {
    /// Path
    let path = window.location.pathname;
    path = path.split("/");
    path = path[path.length - 1];

    let Leaves = [
      "leave-lists",
      "new-leave",
      "leave-approval",
      "supervisees",
      "leave-dashboard",
    ];
    let Exits = ["HRExitInterview", "HRExitInterviewList"];
    let Settings = ["HRUsers", "HRDocument"];
    let EmpClearance = ["HRClearance", "HRClearanceList"];
    let EmpUpdateDetail = [
      "new-probation",
      "probation-list",
      "immediate-probation-list",
      "EndofContract",
      "MD-probation",
      "FD-probation",
      "probation-approval-hod",
      "bucketed-probations",
      "bucketed-probations-head",
    ];
    let EmpUpdateDetailCont = [
      "Contract",
      "contract-list",
      "contract-card",
      "MD-approvals",
      "FD-approvals",
      "HR-contract",
      "contract-approval-hod",
      "bucketed-contracts",
      "bucketed-contracts-head",
    ];
    let Grievance = ["Grievance", "GrievanceList","grievance-list","grievance-approval-list","grievance-escalated-list","grievance-appeal-list","completed-grievance-list"];
    let Documents = ["document-list"];
    let ContProbDocuments = ["contractprobation-list"];
    let Payroll = ["Payslip", "P9"];
    let TrainingNeeds = ["new-need", "need-list"];
    let KPIS = [
      "KPIs",
      "Appraisal",
      "CompletedAppraisal",
      "employee-appraisal",
      "supervisor-appraisal",
      "supervisor-moderation",
      "employee-moderation",
      "employee-complete",
      "supervisor-complete",
    ];

    /// Active menu
    // let dashBoard = [
    //     "",
    //     "analytics",
    //     "review",
    //     "order",
    //     "order-list",
    //     "customer-list",
    //     "task",
    //   ]
    // let aux = ""
    // if(JSON.parse(localStorage.getItem("userDetails")).user.length>0){
    //   aux=JSON.parse(localStorage.getItem("userDetails")).user[0];
    // }
    let FDNav = (
      <>
        <li className={`${path === "FD-dashboard" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/FD-dashboard"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-home-2"></i>
            <span className="nav-text">Dashboard</span>
          </Link>
        </li>
        {/* <li className={`${path === "FDProbation" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/FDProbation"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-folder-10"></i>
            <span className="nav-text">Probation List</span>
          </Link>
        </li> */}

        {/* Every Employer Menus */}

        <li className={`${EmpUpdateDetail.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-10"></i>
            <span className="nav-text">Employee Probation</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "new-probation" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-probation"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New Probation</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "probation-list" ? "mm-active" : ""}`}
                to="/probation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Probation List</span>
              </Link>
            </li>
            {/* <li>
              <Link
                className={`${path === "immediate-probation-list" ? "mm-active" : ""}`}
                to="/immediate-probation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Immediate Manager</span>
              </Link>
            </li> */}
            <li>
              <Link
                className={`${path === "FD-probation" ? "mm-active" : ""}`}
                to="/FD-probation"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-like  mr-3"></i>
                <span className="nav-text-drop">Approval Request</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${EmpUpdateDetailCont.includes(path) ? "mm-active" : ""}`}
        >
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-2"></i>
            <span className="nav-text">Staff End of Contract</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "Contract" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Contract"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New End of Contract</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "contract-list" ? "mm-active" : ""}`}
                to="/contract-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">End of Contract List</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "FD-approvals" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/FD-approvals"
              >
                <i className="flaticon-381-like mr-3"></i>
                <span className="nav-text-drop">Approval Request</span>
              </Link>
            </li>
          </ul>
        </li>

      

        <li className={`${Leaves.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-time"></i>
            <span className="nav-text">Leave Operation</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "new-leave" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-leave"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New Leave</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "leave-lists" ? "mm-active" : ""}`}
                to="/leave-lists"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Pending Leaves</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "leave-approval" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/leave-approval"
              >
                <i className="flaticon-381-layer-1 mr-3"></i>
                <span className="nav-text-drop">Approval Request</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "supervisees" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/supervisees"
              >
                <i className="flaticon-381-sunglasses mr-3"></i>
                <span className="nav-text-drop">Supervisees List</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${Payroll.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-database"></i>
            <span className="nav-text">Payroll</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "Payslip" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Payslip"
              >
                <i className="flaticon-381-stop mr-3"></i>
                <span className="nav-text-drop">Payslip</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "P-nine" ? "mm-active" : ""}`}
                to="/P-nine"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-blueprint  mr-3"></i>
                <span className="nav-text-drop">P9</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${KPIS.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-network-1"></i>
            <span className="nav-text">KPIs</span>
          </Link>
          <ul>
            {/* <li>
              <Link
                className={`${path === "KPIs" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/KPIs"
              >
                <i className="flaticon-381-menu mr-3"></i>
                <span className="nav-text-drop">Job KPIs</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "Appraisals" ? "mm-active" : ""}`}
                to="/Appraisals"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-more-1  mr-3"></i>
                <span className="nav-text-drop">Performance Target</span>
              </Link>
            </li> */}

            <li>
              <Link
                className={`${
                  path === "employee-appraisal" ? "mm-active" : ""
                }`}
                to="/employee-appraisal"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-ellipsis-h mr-1"></i>
                <span className="nav-text-drop">Employee Appraisal</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-appraisal" ? "mm-active" : ""
                }`}
                to="/supervisor-appraisal"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-slideshare mr-1"></i>
                <span className="nav-text-drop">Supervisor Appraisals</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "employee-moderation" ? "mm-active" : ""
                }`}
                to="/employee-moderation"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className=" 	fa fa-delicious mr-1"></i>
                <span className="nav-text-drop">Employee Moderated</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-moderation" ? "mm-active" : ""
                }`}
                to="/supervisor-moderation"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-crosshairs mr-1"></i>
                <span className="nav-text-drop">Supervisor Moderated</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "employee-complete" ? "mm-active" : ""}`}
                to="/employee-complete"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-first-order mr-1"></i>
                <span className="nav-text-drop">Employee Completed</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-complete" ? "mm-active" : ""
                }`}
                to="/supervisor-complete"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-empire mr-1"></i>
                <span className="nav-text-drop">Supervisor Completed</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* <li className={`${TrainingNeeds.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-notebook-4"></i>
            <span className="nav-text">Training Needs</span>
          </Link>
          <ul>
            <li className={`${path === "new-need" ? "mm-active" : ""}`}>
              <Link
                className=""
                to="/new-need"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text">New</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "need-list" ? "mm-active" : ""
                }`}
                to="/need-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>
          </ul>
        </li> */}
        <li className={`${path === "job-vacancy" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/job-vacancy"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-target"></i>
            <span className="nav-text">Job Vacancy</span>
          </Link>
        </li>
        <li className={`${Documents.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-5"></i>
            <span className="nav-text">Documents</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "document-list" ? "mm-active" : ""}`}
                to="/document-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${ContProbDocuments.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-7"></i>
            <span className="nav-text">Contract/Probation</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "contractprobation-list" ? "mm-active" : ""}`}
                to="/contractprobation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Documents</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className={`${path === "exit-interview" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/exit-interview"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-panel-1"></i>
            <span className="nav-text">Exit Interview</span>
          </Link>
        </li>
      </>
    );

    let MDNavi = (
      <>
        <li className={`${path === "MD-dashboard" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/MD-dashboard"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-home-2"></i>
            <span className="nav-text">Dashboard</span>
          </Link>
        </li>
        <li className={`${path === "MD-employee-requisition" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/MD-employee-requisition"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-background-1"></i>
            <span className="nav-text">Requisition Approval</span>
          </Link>
        </li>

        {/* Every Employer Menus */}

        <li className={`${EmpUpdateDetail.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-10"></i>
            <span className="nav-text">Employee Probation</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "new-probation" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-probation"
              >
                <i className="flaticon-381-add-1 mr-1"></i>
                <span className="nav-text-drop">New Probation</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "probation-list" ? "mm-active" : ""}`}
                to="/probation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-1"></i>
                <span className="nav-text-drop">Pending Probations</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "MD-probation" ? "mm-active" : ""}`}
                to="/MD-probation"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-like  mr-1"></i>
                <span className="nav-text-drop">Approval Request</span>
              </Link>
            </li>
            {/* <li>
              <Link
                className={`${path === "immediate-probation-list" ? "mm-active" : ""}`}
                to="/immediate-probation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Immediate Manager</span>
              </Link>
            </li> */}
          </ul>
        </li>
        <li className={`${EmpUpdateDetailCont.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-2"></i>
            <span className="nav-text">Staff End of Contract</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "Contract" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Contract"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New End of Contract</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "contract-list" ? "mm-active" : ""}`}
                to="/contract-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">End of Contract List</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "MD-approvals" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/MD-approvals"
              >
                <i className="flaticon-381-like mr-3"></i>
                <span className="nav-text-drop">Approval Request</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* className={`${Leaves.includes(path) ? "mm-active" : ""}`} */}
        <li>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-time"></i>
            <span className="nav-text">Leave Operation</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "new-leave" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-leave"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New Leave</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "leave-lists" ? "mm-active" : ""}`}
                to="/leave-lists"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Pending Leaves</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "leave-approval" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/leave-approval"
              >
                <i className="flaticon-381-layer-1 mr-3"></i>
                <span className="nav-text-drop">Approval Request</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "supervisees" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/supervisees"
              >
                <i className="flaticon-381-sunglasses mr-3"></i>
                <span className="nav-text-drop">Supervisees List</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* className={`${Payroll.includes(path) ? "mm-active" : ""}`} */}
        <li>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-database"></i>
            <span className="nav-text">Payroll</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "Payslip" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Payslip"
              >
                <i className="flaticon-381-stop mr-3"></i>
                <span className="nav-text-drop">Payslip</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "P-nine" ? "mm-active" : ""}`}
                to="/P-nine"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-blueprint  mr-3"></i>
                <span className="nav-text-drop">P9</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* className={`${KPIS.includes(path) ? "mm-active" : ""}`} */}
        <li>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-network-1"></i>
            <span className="nav-text">KPIs</span>
          </Link>
          <ul>
            {/* <li>
              <Link
                className={`${path === "KPIs" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/KPIs"
              >
                <i className="flaticon-381-menu mr-3"></i>
                <span className="nav-text-drop">Job KPIs</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "Appraisals" ? "mm-active" : ""}`}
                to="/Appraisals"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-more-1  mr-3"></i>
                <span className="nav-text-drop">Performance Target</span>
              </Link>
            </li> */}

            <li>
              <Link
                className={`${
                  path === "employee-appraisal" ? "mm-active" : ""
                }`}
                to="/employee-appraisal"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-ellipsis-h mr-1"></i>
                <span className="nav-text-drop">Employee Appraisal</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-appraisal" ? "mm-active" : ""
                }`}
                to="/supervisor-appraisal"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-slideshare mr-1"></i>
                <span className="nav-text-drop">Supervisor Appraisals</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "employee-moderation" ? "mm-active" : ""
                }`}
                to="/employee-moderation"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className=" 	fa fa-delicious mr-1"></i>
                <span className="nav-text-drop">Employee Moderated</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-moderation" ? "mm-active" : ""
                }`}
                to="/supervisor-moderation"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-crosshairs mr-1"></i>
                <span className="nav-text-drop">Supervisor Moderated</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "employee-complete" ? "mm-active" : ""}`}
                to="/employee-complete"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-first-order mr-1"></i>
                <span className="nav-text-drop">Employee Completed</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-complete" ? "mm-active" : ""
                }`}
                to="/supervisor-complete"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-empire mr-1"></i>
                <span className="nav-text-drop">Supervisor Completed</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* <li className={`${TrainingNeeds.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-notebook-4"></i>
            <span className="nav-text">Training Needs</span>
          </Link>
          <ul>
            <li className={`${path === "new-need" ? "mm-active" : ""}`}>
              <Link
                className=""
                to="/new-need"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text">New</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "need-list" ? "mm-active" : ""
                }`}
                to="/need-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>
          </ul>
        </li> */}

        <li className={`${Grievance.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-id-card"></i>
            <span className="nav-text">Grievance</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "grievance-appeal-list" ? "mm-active" : ""}`}
                to="/grievance-appeal-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Appeal List</span>
              </Link>
            </li>
          <li>
              <Link
                className={`${path === "grievance-escalated-list" ? "mm-active" : ""}`}
                to="/grievance-escalated-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-repeat-1  mr-3"></i>
                <span className="nav-text-drop">Escalated List</span>
              </Link>
            </li>
          <li>
              <Link
                className={`${path === "grievance-approval-list" ? "mm-active" : ""}`}
                to="/grievance-approval-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-layer-1  mr-3"></i>
                <span className="nav-text-drop">Approval List</span>
              </Link>
            </li>
           
            <li>
              <Link
                className={`${path === "grievance" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/grievance"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "completed-grievance-list" ? "mm-active" : ""}`}
                to="/completed-grievance-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-box-2  mr-3"></i>
                <span className="nav-text-drop">Completed Records</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${path === "job-vacancy" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/job-vacancy"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-target"></i>
            <span className="nav-text">Job Vacancy</span>
          </Link>
        </li>
        <li className={`${Documents.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-5"></i>
            <span className="nav-text">Documents</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "document-list" ? "mm-active" : ""}`}
                to="/document-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${ContProbDocuments.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-7"></i>
            <span className="nav-text">Contract/Probation</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "contractprobation-list" ? "mm-active" : ""}`}
                to="/contractprobation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Documents</span>
              </Link>
            </li>
          </ul>
        </li>


        <li className={`${path === "exit-interview" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/exit-interview"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-panel-1"></i>
            <span className="nav-text">Exit Interview</span>
          </Link>
        </li>
      </>
    );

    let HRNavi = (
      <>
        <li className={`${path === "HR-dashboard" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/HR-dashboard"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-home-2"></i>
            <span className="nav-text">Dashboard</span>
          </Link>
        </li>
        <li className={`${path === "applicants" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/applicants"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-user-4"></i>
            <span className="nav-text">Job Applicants</span>
          </Link>
        </li>
        <li className={`${path === "approved-applicants" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/approved-applicants"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-user-9"></i>
            <span className="nav-text">Viewed Job Applicants</span>
          </Link>
        </li>
        <li className={`${path === "requisition-approval" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/requisition-approval"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-background-1"></i>
            <span className="nav-text">Job Requisition Approval</span>
          </Link>
        </li>
        <li className={`${path === "HR-monitoring" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/HR-monitoring"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-notepad-1"></i>
            <span className="nav-text">Performance Monitoring</span>
          </Link>
        </li>
        <li className={`${EmpUpdateDetail.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-10"></i>
            <span className="nav-text">Employee Probation</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "new-probation" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-probation"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New Probation</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "probation-list" ? "mm-active" : ""}`}
                to="/probation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Probation List</span>
              </Link>
            </li>
          
            <li>
              <Link
                className={`${path === "HR-probation" ? "mm-active" : ""}`}
                to="/HR-probation"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-2  mr-3"></i>
                <span className="nav-text-drop">Probation Approval</span>
              </Link>
            </li>
            <li >
              <Link
               className={`${path === "bucketed-probations" ? "mm-active" : ""}`}
                to="/bucketed-probations"
                onClick={() => this.props.onClick3()}

              >
                <i className="flaticon-381-trash-2 mr-3"></i>
                <span className="nav-text-drop">Bucketed Probations </span>
              </Link>
            </li>
          </ul>
        </li>
        
        <li className={`${EmpUpdateDetailCont.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-2"></i>
            <span className="nav-text">Staff End of Contract</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "Contract" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Contract"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New End of Contract</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "contract-list" ? "mm-active" : ""}`}
                to="/contract-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">End of Contract List</span>
              </Link>
            </li>

            <li >
              <Link
               className={`${path === "HR-contract" ? "mm-active" : ""}`}
                to="/HR-contract"
                onClick={() => this.props.onClick3()}

              >
                <i className="flaticon-381-folder-2 mr-3"></i>
                <span className="nav-text-drop">Contracts Approval</span>
              </Link>
            </li>

            <li >
              <Link
               className={`${path === "bucketed-contracts" ? "mm-active" : ""}`}
                to="/bucketed-contracts"
                onClick={() => this.props.onClick3()}

              >
                <i className="flaticon-381-trash-2 mr-3"></i>
                <span className="nav-text-drop">Bucketed Contracts </span>
              </Link>
            </li>
          </ul>
        </li>


        {/* <li className={`${path === "HR-probation" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/HR-probation"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-folder-10"></i>
            <span className="nav-text">Employee Probation</span>
          </Link>
        </li> */}

        {/* <li className={`${path === "HR-contract" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/HR-contract"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-folder-2"></i>
            <span className="nav-text">Staff End of Contract</span>
          </Link>
        </li> */}
        <li className={`${path === "HR-probation-contract" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/HR-probation-contract"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-list-1"></i>
            <span className="nav-text">Probation Contact Docs</span>
          </Link>
        </li>

        {/* className={`${Leaves.includes(path) ? "mm-active" : ""}`} */}
        <li>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-time"></i>
            <span className="nav-text">Leave Operations</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "new-leave" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-leave"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New Leave</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "leave-lists" ? "mm-active" : ""}`}
                to="/leave-lists"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Pending Leaves</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "leave-approval" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/leave-approval"
              >
                <i className="flaticon-381-layer-1 mr-3"></i>
                <span className="nav-text-drop">Approval Request</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "supervisees" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/supervisees"
              >
                <i className="flaticon-381-sunglasses mr-3"></i>
                <span className="nav-text-drop">Supervisees List</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "leave-dashboard" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/leave-dashboard"
              >
                <i className="flaticon-381-command mr-3"></i>
                <span className="nav-text-drop">Leave Dashboard</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* className={`${Payroll.includes(path) ? "mm-active" : ""}`} */}
        <li >
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-database"></i>
            <span className="nav-text">Payroll</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "Payslip" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Payslip"
              >
                <i className="flaticon-381-stop mr-3"></i>
                <span className="nav-text-drop">Payslip</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "P-nine" ? "mm-active" : ""}`}
                to="/P-nine"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-blueprint  mr-3"></i>
                <span className="nav-text-drop">P9</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* className={`${KPIS.includes(path) ? "mm-active" : ""}`} */}
        <li >
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-network-1"></i>
            <span className="nav-text">Job KPIS</span>
          </Link>
          <ul>
            {/* <li>
              <Link
                className={`${path === "KPIs" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/KPIs"
              >
                <i className="flaticon-381-menu mr-1"></i>
                <span className="nav-text-drop">Job KPIs</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "Appraisals" ? "mm-active" : ""}`}
                to="/Appraisals"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-more-1  mr-1"></i>
                <span className="nav-text-drop">Performance Target</span>
              </Link>
            </li> */}

            <li>
              <Link
                className={`${
                  path === "employee-appraisal" ? "mm-active" : ""
                }`}
                to="/employee-appraisal"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-ellipsis-h mr-1"></i>
                <span className="nav-text-drop">Employee Appraisals</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-appraisal" ? "mm-active" : ""
                }`}
                to="/supervisor-appraisal"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-slideshare mr-1"></i>
                <span className="nav-text-drop">Supervisor Appraisals</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "employee-moderation" ? "mm-active" : ""
                }`}
                to="/employee-moderation"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className=" 	fa fa-delicious mr-1"></i>
                <span className="nav-text-drop">Employee Moderated</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-moderation" ? "mm-active" : ""
                }`}
                to="/supervisor-moderation"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-crosshairs mr-1"></i>
                <span className="nav-text-drop">Supervisor Moderated</span>
              </Link>
            </li>

            {/* <li>
              <Link
                className={`${path === "CompletedAppraisal" ? "mm-active" : ""}`}
                to="/CompletedAppraisal"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-first-order mr-1"></i>
                <span className="nav-text-drop">Completed KPI</span>
              </Link>
            </li> */}
            <li>
              <Link
                className={`${path === "employee-complete" ? "mm-active" : ""}`}
                to="/employee-complete"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-first-order mr-1"></i>
                <span className="nav-text-drop">Employee Completed</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-complete" ? "mm-active" : ""
                }`}
                to="/supervisor-complete"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-empire mr-1"></i>
                <span className="nav-text-drop">Supervisor Completed</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className={`${EmpClearance.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-box-2"></i>
            <span className="nav-text">Employee Clearance</span>
          </Link>
          <ul>
            <li className={`${path === "HR-clearance" ? "mm-active" : ""}`}>
              <Link
                className=""
                to="/HR-clearance"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text">New Clearance</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "HR-clearance-list" ? "mm-active" : ""}`}
                to="/HR-clearance-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Clearance Lists</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className={`${Grievance.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-id-card"></i>
            <span className="nav-text">Grievance</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "grievance-appeal-list" ? "mm-active" : ""}`}
                to="/grievance-appeal-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Appeal List</span>
              </Link>
            </li>
          <li>
              <Link
                className={`${path === "grievance-escalated-list" ? "mm-active" : ""}`}
                to="/grievance-escalated-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-repeat-1  mr-3"></i>
                <span className="nav-text-drop">Escalated List</span>
              </Link>
            </li>
          <li>
              <Link
                className={`${path === "grievance-approval-list" ? "mm-active" : ""}`}
                to="/grievance-approval-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-layer-1  mr-3"></i>
                <span className="nav-text-drop">Approval List</span>
              </Link>
            </li>
           
            <li>
              <Link
                className={`${path === "grievance" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/grievance"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "completed-grievance-list" ? "mm-active" : ""}`}
                to="/completed-grievance-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-box-2  mr-3"></i>
                <span className="nav-text-drop">Completed Records</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* <li className={`${TrainingNeeds.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-notebook-4"></i>
            <span className="nav-text">Training Needs</span>
          </Link>
          <ul>
            <li className={`${path === "new-need" ? "mm-active" : ""}`}>
              <Link
                className=""
                to="/new-need"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text">New</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "need-list" ? "mm-active" : ""
                }`}
                to="/need-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>
          </ul>
        </li> */}

        <li className={`${Documents.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-5"></i>
            <span className="nav-text">Documents</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "document-list" ? "mm-active" : ""}`}
                to="/document-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className={`${ContProbDocuments.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-7"></i>
            <span className="nav-text">Contract/Probation</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "contractprobation-list" ? "mm-active" : ""}`}
                to="/contractprobation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Documents</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className={`${Exits.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-panel-1"></i>
            <span className="nav-text">Exit Interview</span>
          </Link>
          <ul>
            <li
              className={`${path === "HR-exit-interview" ? "mm-active" : ""}`}
            >
              <Link
                className=""
                to="/HR-exit-interview"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text">New Exit Form</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "HR-exit-interview-list" ? "mm-active" : ""
                }`}
                to="/HR-exit-interview-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Exit Forms</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${path === "exit-interview" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/exit-interview"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-exit-1"></i>
            <span className="nav-text">Your Exit Form</span>
          </Link>
        </li>
        <li className={`${path === "job-vacancy" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/job-vacancy"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-target"></i>
            <span className="nav-text">Job Vacancy</span>
          </Link>
        </li>

        <li className={`${Settings.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-settings-2"></i>
            <span className="nav-text">Settings</span>
          </Link>
          <ul>
            <li className={`${path === "HR-users" ? "mm-active" : ""}`}>
              <Link
                className=""
                to="/HR-users"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-user-8 mr-3"></i>
                <span className="nav-text">Users</span>
              </Link>
            </li>
            <li className={`${path === "HR-document" ? "mm-active" : ""}`}>
              <Link
                className=""
                to="/HR-document"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-box mr-3"></i>
                <span className="nav-text">Documents</span>
              </Link>
            </li>
          </ul>
        </li>
      </>
    );

    let HEADHRNavi = (
      <>
        <li className={`${path === "HR-dashboard" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/HR-dashboard"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-home-2"></i>
            <span className="nav-text">Dashboard</span>
          </Link>
        </li>
        <li className={`${path === "applicants" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/applicants"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-user-4"></i>
            <span className="nav-text">Job Applicants</span>
          </Link>
        </li>
        <li className={`${path === "approved-applicants" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/approved-applicants"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-user-9"></i>
            <span className="nav-text">Viewed Job Applicants</span>
          </Link>
        </li>
        <li className={`${path === "requisition-approval" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/requisition-approval"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-background-1"></i>
            <span className="nav-text">Job Requisition Approval</span>
          </Link>
        </li>
        <li className={`${path === "HR-monitoring" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/HR-monitoring"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-notepad-1"></i>
            <span className="nav-text">Performance Monitoring</span>
          </Link>
        </li>

        <li className={`${EmpUpdateDetail.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-10"></i>
            <span className="nav-text">Employee Probation</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "new-probation" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-probation"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New Probation</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "probation-list" ? "mm-active" : ""}`}
                to="/probation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Probation List</span>
              </Link>
            </li>
          
            <li>
              <Link
                className={`${path === "HR-probation" ? "mm-active" : ""}`}
                to="/HR-probation"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-2  mr-3"></i>
                <span className="nav-text-drop">Probation Approval</span>
              </Link>
            </li>
            <li >
              <Link
               className={`${path === "bucketed-probations-head" ? "mm-active" : ""}`}
                to="/bucketed-probations-head"
                onClick={() => this.props.onClick3()}

              >
                <i className="flaticon-381-trash-2 mr-3"></i>
                <span className="nav-text-drop">Bucketed Probations </span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${EmpUpdateDetailCont.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-2"></i>
            <span className="nav-text">Staff End of Contract</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "Contract" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Contract"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New End of Contract</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "contract-list" ? "mm-active" : ""}`}
                to="/contract-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">End of Contract List</span>
              </Link>
            </li>

            <li >
              <Link
               className={`${path === "HR-contract" ? "mm-active" : ""}`}
                to="/HR-contract"
                onClick={() => this.props.onClick3()}

              >
                <i className="flaticon-381-folder-2 mr-3"></i>
                <span className="nav-text-drop">Contracts Approval</span>
              </Link>
            </li>
            <li >
              <Link
               className={`${path === "bucketed-contracts-head" ? "mm-active" : ""}`}
                to="/bucketed-contracts-head"
                onClick={() => this.props.onClick3()}

              >
                <i className="flaticon-381-trash-2 mr-3"></i>
                <span className="nav-text-drop">Bucketed Contracts </span>
              </Link>
            </li>
          </ul>
        </li>

        {/* <li className={`${EmpUpdateDetail.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-10"></i>
            <span className="nav-text">Employee Probation</span>
          </Link>
          <ul>
        

            <li>
              <Link
                className={`${path === "HR-probation" ? "mm-active" : ""}`}
                to="/HR-probation"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Probation List</span>
              </Link>
            </li>
          
            <li>
              <Link
                className={`${path === "immediate-probation-list" ? "mm-active" : ""}`}
                to="/immediate-probation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Immediate Manager</span>
              </Link>
            </li>
          </ul>
        </li> */}


        {/* <li className={`${path === "HR-probation" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/HR-probation"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-folder-10"></i>
            <span className="nav-text">Employee Probation</span>
          </Link>
        </li> */}

      

        <li className={`${path === "HR-probation-contract" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/HR-probation-contract"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-list-1"></i>
            <span className="nav-text">Probation Contact Docs</span>
          </Link>
        </li>

        <li className={`${Leaves.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-time"></i>
            <span className="nav-text">Leave Operations</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "new-leave" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-leave"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New Leave</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "leave-lists" ? "mm-active" : ""}`}
                to="/leave-lists"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Pending Leaves</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "leave-approval" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/leave-approval"
              >
                <i className="flaticon-381-layer-1 mr-3"></i>
                <span className="nav-text-drop">Approval Request</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "supervisees" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/supervisees"
              >
                <i className="flaticon-381-sunglasses mr-3"></i>
                <span className="nav-text-drop">Supervisees List</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "leave-dashboard" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/leave-dashboard"
              >
                <i className="flaticon-381-command mr-3"></i>
                <span className="nav-text-drop">Leave Dashboard</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${Payroll.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-database"></i>
            <span className="nav-text">Payroll</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "Payslip" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Payslip"
              >
                <i className="flaticon-381-stop mr-3"></i>
                <span className="nav-text-drop">Payslip</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "P-nine" ? "mm-active" : ""}`}
                to="/P-nine"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-blueprint  mr-3"></i>
                <span className="nav-text-drop">P9</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className={`${KPIS.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-network-1"></i>
            <span className="nav-text">Job KPIS</span>
          </Link>
          <ul>
            {/* <li>
              <Link
                className={`${path === "KPIs" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/KPIs"
              >
                <i className="flaticon-381-menu mr-1"></i>
                <span className="nav-text-drop">Job KPIs</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "Appraisals" ? "mm-active" : ""}`}
                to="/Appraisals"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-more-1  mr-1"></i>
                <span className="nav-text-drop">Performance Target</span>
              </Link>
            </li> */}

            <li>
              <Link
                className={`${
                  path === "employee-appraisal" ? "mm-active" : ""
                }`}
                to="/employee-appraisal"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-ellipsis-h mr-1"></i>
                <span className="nav-text-drop">Employee Appraisals</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-appraisal" ? "mm-active" : ""
                }`}
                to="/supervisor-appraisal"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-slideshare mr-1"></i>
                <span className="nav-text-drop">Supervisor Appraisals</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "employee-moderation" ? "mm-active" : ""
                }`}
                to="/employee-moderation"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className=" 	fa fa-delicious mr-1"></i>
                <span className="nav-text-drop">Employee Moderated</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-moderation" ? "mm-active" : ""
                }`}
                to="/supervisor-moderation"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-crosshairs mr-1"></i>
                <span className="nav-text-drop">Supervisor Moderated</span>
              </Link>
            </li>

            {/* <li>
              <Link
                className={`${path === "CompletedAppraisal" ? "mm-active" : ""}`}
                to="/CompletedAppraisal"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-first-order mr-1"></i>
                <span className="nav-text-drop">Completed KPI</span>
              </Link>
            </li> */}
            <li>
              <Link
                className={`${path === "employee-complete" ? "mm-active" : ""}`}
                to="/employee-complete"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-first-order mr-1"></i>
                <span className="nav-text-drop">Employee Completed</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-complete" ? "mm-active" : ""
                }`}
                to="/supervisor-complete"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-empire mr-1"></i>
                <span className="nav-text-drop">Supervisor Completed</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className={`${EmpClearance.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-box-2"></i>
            <span className="nav-text">Employee Clearance</span>
          </Link>
          <ul>
            <li className={`${path === "HR-clearance" ? "mm-active" : ""}`}>
              <Link
                className=""
                to="/HR-clearance"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text">New Clearance</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "HR-clearance-list" ? "mm-active" : ""}`}
                to="/HR-clearance-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Clearance Lists</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className={`${Grievance.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-id-card"></i>
            <span className="nav-text">Grievance</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "grievance-appeal-list" ? "mm-active" : ""}`}
                to="/grievance-appeal-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Appeal List</span>
              </Link>
            </li>
          <li>
              <Link
                className={`${path === "grievance-escalated-list" ? "mm-active" : ""}`}
                to="/grievance-escalated-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-repeat-1  mr-3"></i>
                <span className="nav-text-drop">Escalated List</span>
              </Link>
            </li>
          <li>
              <Link
                className={`${path === "grievance-approval-list" ? "mm-active" : ""}`}
                to="/grievance-approval-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-layer-1  mr-3"></i>
                <span className="nav-text-drop">Approval List</span>
              </Link>
            </li>
           
            <li>
              <Link
                className={`${path === "grievance" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/grievance"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "completed-grievance-list" ? "mm-active" : ""}`}
                to="/completed-grievance-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-box-2  mr-3"></i>
                <span className="nav-text-drop">Completed Records</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* <li className={`${TrainingNeeds.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-notebook-4"></i>
            <span className="nav-text">Training Needs</span>
          </Link>
          <ul>
            <li className={`${path === "new-need" ? "mm-active" : ""}`}>
              <Link
                className=""
                to="/new-need"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text">New</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "need-list" ? "mm-active" : ""
                }`}
                to="/need-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>
          </ul>
        </li> */}

        <li className={`${path === "job-vacancy" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/job-vacancy"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-target"></i>
            <span className="nav-text">Job Vacancy</span>
          </Link>
        </li>
        <li className={`${Documents.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-5"></i>
            <span className="nav-text">Documents</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "document-list" ? "mm-active" : ""}`}
                to="/document-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className={`${ContProbDocuments.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-7"></i>
            <span className="nav-text">Contract/Probation</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "contractprobation-list" ? "mm-active" : ""}`}
                to="/contractprobation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Documents</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className={`${Exits.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-panel-1"></i>
            <span className="nav-text">Exit Interview</span>
          </Link>
          <ul>
            <li
              className={`${path === "HR-exit-interview" ? "mm-active" : ""}`}
            >
              <Link
                className=""
                to="/HR-exit-interview"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text">New Exit Form</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "HR-exit-interview-list" ? "mm-active" : ""
                }`}
                to="/HR-exit-interview-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Exit Forms</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${path === "exit-interview" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/exit-interview"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-exit-1"></i>
            <span className="nav-text">Your Exit Form</span>
          </Link>
        </li>
        <li className={`${path === "job-vacancy" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/job-vacancy"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-target"></i>
            <span className="nav-text">Job Vacancy</span>
          </Link>
        </li>

        <li className={`${Settings.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-settings-2"></i>
            <span className="nav-text">Settings</span>
          </Link>
          <ul>
            <li className={`${path === "HR-users" ? "mm-active" : ""}`}>
              <Link
                className=""
                to="/HR-users"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-user-8 mr-3"></i>
                <span className="nav-text">Users</span>
              </Link>
            </li>
            <li className={`${path === "HR-document" ? "mm-active" : ""}`}>
              <Link
                className=""
                to="/HR-document"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-box mr-3"></i>
                <span className="nav-text">Documents</span>
              </Link>
            </li>
          </ul>
        </li>
      </>
    );

    let HODNavi = (
      <>
        <li className={`${path === "HOD-dashboard" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/HOD-dashboard"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-home-2"></i>
            <span className="nav-text">Dashboard</span>
          </Link>
        </li>
        <li className={`${path === "employee-requisition" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/employee-requisition"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-background-1"></i>
            <span className="nav-text">New Job Requisition</span>
          </Link>
        </li>
        <li className={`${path === "HOD-requisition-list" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/HOD-requisition-list"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-layer-1"></i>
            <span className="nav-text">Job Requisition List</span>
          </Link>
        </li>
        <li className={`${path === "Monitoring" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/Monitoring"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-notepad"></i>
            <span className="nav-text">New Performance Monitoring</span>
          </Link>
        </li>
        <li className={`${path === "monitoring-list" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/monitoring-list"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-notepad-1"></i>
            <span className="nav-text">Performance Monitoring List</span>
          </Link>
        </li>
        <li className={`${path === "clearance-list" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/clearance-list"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-box-2"></i>
            <span className="nav-text">Staff Clearance List</span>
          </Link>
        </li>

        {/* Every Employer Menus */}

        <li className={`${EmpUpdateDetail.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-10"></i>
            <span className="nav-text">Employee Probation</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "new-probation" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-probation"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New Probation</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "probation-list" ? "mm-active" : ""}`}
                to="/probation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Probation List</span>
              </Link>
            </li>
          
            <li>
              <Link
                className={`${path === "probation-approval-hod" ? "mm-active" : ""}`}
                to="/probation-approval-hod"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Probation Approval</span>
              </Link>
            </li>

            <li >
              <Link
               className={`${path === "bucketed-probations" ? "mm-active" : ""}`}
                to="/bucketed-probations"
                onClick={() => this.props.onClick3()}

              >
                <i className="flaticon-381-trash-2 mr-3"></i>
                <span className="nav-text-drop">Bucketed Probations </span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${EmpUpdateDetailCont.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-2"></i>
            <span className="nav-text">Staff End of Contract</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "Contract" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Contract"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New End of Contract</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "contract-list" ? "mm-active" : ""}`}
                to="/contract-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">End of Contract List</span>
              </Link>
            </li>
            <li >
              <Link
               className={`${path === "contract-approval-hod" ? "mm-active" : ""}`}
                to="/contract-approval-hod"
                onClick={() => this.props.onClick3()}

              >
                <i className="flaticon-381-folder-2 mr-3"></i>
                <span className="nav-text-drop">Contracts Approval</span>
              </Link>
            </li>
            <li >
              <Link
               className={`${path === "bucketed-contracts" ? "mm-active" : ""}`}
                to="/bucketed-contracts"
                onClick={() => this.props.onClick3()}

              >
                <i className="flaticon-381-trash-2 mr-3"></i>
                <span className="nav-text-drop">Bucketed Contracts </span>
              </Link>
            </li>

          </ul>
        </li>
        {/* className={`${Leaves.includes(path) ? "mm-active" : ""}`} */}
        <li>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-time"></i>
            <span className="nav-text">Leave Operations</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "new-leave" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-leave"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New Leave</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "leave-lists" ? "mm-active" : ""}`}
                to="/leave-lists"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Pending Leaves</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "leave-approval" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/leave-approval"
              >
                <i className="flaticon-381-layer-1 mr-3"></i>
                <span className="nav-text-drop">Approval Request</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "supervisees" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/supervisees"
              >
                <i className="flaticon-381-sunglasses mr-3"></i>
                <span className="nav-text-drop">Supervisees List</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* className={`${Payroll.includes(path) ? "mm-active" : ""}`} */}
        <li>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-database"></i>
            <span className="nav-text">Payroll</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "Payslip" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Payslip"
              >
                <i className="flaticon-381-stop mr-3"></i>
                <span className="nav-text-drop">Payslip</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "P-nine" ? "mm-active" : ""}`}
                to="/P-nine"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-blueprint  mr-3"></i>
                <span className="nav-text-drop">P9</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* className={`${KPIS.includes(path) ? "mm-active" : ""}`} */}
        <li>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-network-1"></i>
            <span className="nav-text">Job KPIs</span>
          </Link>
          <ul>
            {/* <li>
              <Link
                className={`${path === "KPIs" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/KPIs"
              >
                <i className="flaticon-381-menu mr-1"></i>
                <span className="nav-text-drop">Job KPIs</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "Appraisals" ? "mm-active" : ""}`}
                to="/Appraisals"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-more-1  mr-1"></i>
                <span className="nav-text-drop">Performance Target</span>
              </Link>
            </li> */}

            <li>
              <Link
                className={`${
                  path === "employee-appraisal" ? "mm-active" : ""
                }`}
                to="/employee-appraisal"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-ellipsis-h mr-1"></i>
                <span className="nav-text-drop">Employee Appraisal</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-appraisal" ? "mm-active" : ""
                }`}
                to="/supervisor-appraisal"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-slideshare mr-1"></i>
                <span className="nav-text-drop">Supervisor Appraisals</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "employee-moderation" ? "mm-active" : ""
                }`}
                to="/employee-moderation"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className=" 	fa fa-delicious mr-1"></i>
                <span className="nav-text-drop">Employee Moderated</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-moderation" ? "mm-active" : ""
                }`}
                to="/supervisor-moderation"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-crosshairs mr-1"></i>
                <span className="nav-text-drop">Supervisor Moderated</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "employee-complete" ? "mm-active" : ""}`}
                to="/employee-complete"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-first-order mr-1"></i>
                <span className="nav-text-drop">Employee Completed</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-complete" ? "mm-active" : ""
                }`}
                to="/supervisor-complete"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-empire mr-1"></i>
                <span className="nav-text-drop">Supervisor Completed</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* <li className={`${TrainingNeeds.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-notebook-4"></i>
            <span className="nav-text">Training Needs</span>
          </Link>
          <ul>
            <li className={`${path === "new-need" ? "mm-active" : ""}`}>
              <Link
                className=""
                to="/new-need"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text">New</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "need-list" ? "mm-active" : ""
                }`}
                to="/need-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>
          </ul>
        </li> */}
        <li className={`${Grievance.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-id-card"></i>
            <span className="nav-text">Grievance</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "grievance-appeal-list" ? "mm-active" : ""}`}
                to="/grievance-appeal-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Appeal List</span>
              </Link>
            </li>
          <li>
              <Link
                className={`${path === "grievance-escalated-list" ? "mm-active" : ""}`}
                to="/grievance-escalated-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-repeat-1  mr-3"></i>
                <span className="nav-text-drop">Escalated List</span>
              </Link>
            </li>
          <li>
              <Link
                className={`${path === "grievance-approval-list" ? "mm-active" : ""}`}
                to="/grievance-approval-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-layer-1  mr-3"></i>
                <span className="nav-text-drop">Approval List</span>
              </Link>
            </li>
           
            <li>
              <Link
                className={`${path === "grievance" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/grievance"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "completed-grievance-list" ? "mm-active" : ""}`}
                to="/completed-grievance-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-box-2  mr-3"></i>
                <span className="nav-text-drop">Completed Records</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${path === "job-vacancy" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/job-vacancy"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-target"></i>
            <span className="nav-text">Job Vacancy</span>
          </Link>
        </li>
        <li className={`${Documents.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-5"></i>
            <span className="nav-text">Documents</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "document-list" ? "mm-active" : ""}`}
                to="/document-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${ContProbDocuments.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-7"></i>
            <span className="nav-text">Contract/Probation</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "contractprobation-list" ? "mm-active" : ""}`}
                to="/contractprobation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Documents</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className={`${path === "exit-interview" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/exit-interview"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-panel-1"></i>
            <span className="nav-text">Exit Interview</span>
          </Link>
        </li>
      </>
    );

    let HODADMINNavi = (
      <>
        <li className={`${path === "HOD-dashboard" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/HOD-dashboard"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-home-2"></i>
            <span className="nav-text">Dashboard</span>
          </Link>
        </li>

        <li className={`${path === "employee-requisition" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/employee-requisition"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-background-1"></i>
            <span className="nav-text">New Job Requisition</span>
          </Link>
        </li>
        <li className={`${path === "HOD-requisition-list" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/HOD-requisition-list"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-layer-1"></i>
            <span className="nav-text">Job Requisition List</span>
          </Link>
        </li>
        <li className={`${path === "Monitoring" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/Monitoring"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-notepad"></i>
            <span className="nav-text">New Performance Monitoring</span>
          </Link>
        </li>
        <li className={`${path === "monitoring-list" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/monitoring-list"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-notepad-1"></i>
            <span className="nav-text">Performance Monitoring List</span>
          </Link>
        </li>
        {/* flaticon-381-box-2 */}
        <li className={`${path === "ADMIN-clearance-list" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/ADMIN-clearance-list"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-box-2"></i>
            <span className="nav-text">Staff Clearance List</span>
          </Link>
        </li>

        {/* Every Employer Menus */}

        {/* <li className={`${EmpUpdateDetail.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-10"></i>
            <span className="nav-text">Employee Probation</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "immediate-probation-list" ? "mm-active" : ""}`}
                to="/immediate-probation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Immediate Manager</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "probation-list" ? "mm-active" : ""}`}
                to="/probation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "new-probation" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-probation"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New</span>
              </Link>
            </li>
          </ul>
        </li>
        <li
          className={`${EmpUpdateDetailCont.includes(path) ? "mm-active" : ""}`}
        >
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-2"></i>
            <span className="nav-text">Staff End of Contract</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "contract-list" ? "mm-active" : ""}`}
                to="/contract-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "Contract" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Contract"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New</span>
              </Link>
            </li>
          </ul>
        </li> */}

        <li className={`${EmpUpdateDetail.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-10"></i>
            <span className="nav-text">Employee Probation</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "new-probation" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-probation"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New Probation</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "probation-list" ? "mm-active" : ""}`}
                to="/probation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Probation List</span>
              </Link>
            </li>
          
            <li>
              <Link
                className={`${path === "probation-approval-hod" ? "mm-active" : ""}`}
                to="/probation-approval-hod"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-2  mr-3"></i>
                <span className="nav-text-drop">Probation Approval</span>
              </Link>
            </li>
            <li >
              <Link
               className={`${path === "bucketed-probations" ? "mm-active" : ""}`}
                to="/bucketed-probations"
                onClick={() => this.props.onClick3()}

              >
                <i className="flaticon-381-trash-2 mr-3"></i>
                <span className="nav-text-drop">Bucketed Probations </span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${EmpUpdateDetailCont.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-2"></i>
            <span className="nav-text">Staff End of Contract</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "Contract" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Contract"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New End of Contract</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "contract-list" ? "mm-active" : ""}`}
                to="/contract-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">End of Contract List</span>
              </Link>
            </li>

            <li >
              <Link
               className={`${path === "contract-approval-hod" ? "mm-active" : ""}`}
                to="/contract-approval-hod"
                onClick={() => this.props.onClick3()}

              >
                <i className="flaticon-381-folder-2 mr-3"></i>
                <span className="nav-text-drop">Contracts Approval</span>
              </Link>
            </li>
            <li >
              <Link
               className={`${path === "bucketed-contracts" ? "mm-active" : ""}`}
                to="/bucketed-contracts"
                onClick={() => this.props.onClick3()}

              >
                <i className="flaticon-381-trash-2 mr-3"></i>
                <span className="nav-text-drop">Bucketed Contracts </span>
              </Link>
            </li>
          </ul>
        </li>

        {/* className={`${Leaves.includes(path) ? "mm-active" : ""}`} */}
        <li>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-time"></i>
            <span className="nav-text">Leave Operation</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "new-leave" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-leave"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "leave-lists" ? "mm-active" : ""}`}
                to="/leave-lists"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "leave-approval" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/leave-approval"
              >
                <i className="flaticon-381-layer-1 mr-3"></i>
                <span className="nav-text-drop">Approvals</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "supervisees" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/supervisees"
              >
                <i className="flaticon-381-sunglasses mr-3"></i>
                <span className="nav-text-drop">Supervisees</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* className={`${Payroll.includes(path) ? "mm-active" : ""}`} */}
        <li>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-database"></i>
            <span className="nav-text">Payroll</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "Payslip" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Payslip"
              >
                <i className="flaticon-381-stop mr-3"></i>
                <span className="nav-text-drop">Payslip</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "P-nine" ? "mm-active" : ""}`}
                to="/P-nine"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-blueprint  mr-3"></i>
                <span className="nav-text-drop">P9</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* className={`${KPIS.includes(path) ? "mm-active" : ""}`} */}
        <li>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-network-1"></i>
            <span className="nav-text">KPIs</span>
          </Link>
          <ul>
            {/* <li>
              <Link
                className={`${path === "KPIs" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/KPIs"
              >
                <i className="flaticon-381-menu mr-3"></i>
                <span className="nav-text-drop">Job KPIs</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "Appraisals" ? "mm-active" : ""}`}
                to="/Appraisals"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-more-1  mr-3"></i>
                <span className="nav-text-drop">Performance Target</span>
              </Link>
            </li> */}

            <li>
              <Link
                className={`${
                  path === "employee-appraisal" ? "mm-active" : ""
                }`}
                to="/employee-appraisal"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-ellipsis-h mr-1"></i>
                <span className="nav-text-drop">Employee Appraisal</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-appraisal" ? "mm-active" : ""
                }`}
                to="/supervisor-appraisal"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-slideshare mr-1"></i>
                <span className="nav-text-drop">Supervisor Appraisals</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "employee-moderation" ? "mm-active" : ""
                }`}
                to="/employee-moderation"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className=" 	fa fa-delicious mr-1"></i>
                <span className="nav-text-drop">Employee Moderated</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-moderation" ? "mm-active" : ""
                }`}
                to="/supervisor-moderation"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-crosshairs mr-1"></i>
                <span className="nav-text-drop">Supervisor Moderated</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "employee-complete" ? "mm-active" : ""}`}
                to="/employee-complete"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-first-order mr-1"></i>
                <span className="nav-text-drop">Employee Completed</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-complete" ? "mm-active" : ""
                }`}
                to="/supervisor-complete"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-empire mr-1"></i>
                <span className="nav-text-drop">Supervisor Completed</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* <li className={`${TrainingNeeds.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-notebook-4"></i>
            <span className="nav-text">Training Needs</span>
          </Link>
          <ul>
            <li className={`${path === "new-need" ? "mm-active" : ""}`}>
              <Link
                className=""
                to="/new-need"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text">New</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "need-list" ? "mm-active" : ""
                }`}
                to="/need-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>
          </ul>
        </li> */}
        <li className={`${Grievance.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-id-card"></i>
            <span className="nav-text">Grievance</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "grievance-appeal-list" ? "mm-active" : ""}`}
                to="/grievance-appeal-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Appeal List</span>
              </Link>
            </li>
          <li>
              <Link
                className={`${path === "grievance-escalated-list" ? "mm-active" : ""}`}
                to="/grievance-escalated-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-repeat-1  mr-3"></i>
                <span className="nav-text-drop">Escalated List</span>
              </Link>
            </li>
          <li>
              <Link
                className={`${path === "grievance-approval-list" ? "mm-active" : ""}`}
                to="/grievance-approval-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-layer-1  mr-3"></i>
                <span className="nav-text-drop">Approval List</span>
              </Link>
            </li>
           
            <li>
              <Link
                className={`${path === "grievance" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/grievance"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "completed-grievance-list" ? "mm-active" : ""}`}
                to="/completed-grievance-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-box-2  mr-3"></i>
                <span className="nav-text-drop">Completed Records</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className={`${path === "job-vacancy" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/job-vacancy"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-target"></i>
            <span className="nav-text">Job Vacancy</span>
          </Link>
        </li>
        <li className={`${Documents.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-5"></i>
            <span className="nav-text">Documents</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "document-list" ? "mm-active" : ""}`}
                to="/document-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${ContProbDocuments.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-7"></i>
            <span className="nav-text">Contract/Probation</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "contractprobation-list" ? "mm-active" : ""}`}
                to="/contractprobation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Documents</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className={`${path === "exit-interview" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/exit-interview"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-panel-1"></i>
            <span className="nav-text">Exit Interview</span>
          </Link>
        </li>
      </>
    );

    let HODICTNavi = (
      <>
        <li className={`${path === "HOD-dashboard" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/HOD-dashboard"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-home-2"></i>
            <span className="nav-text">Dashboard</span>
          </Link>
        </li>

        <li className={`${path === "employee-requisition" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/employee-requisition"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-background-1"></i>
            <span className="nav-text">New Job Requisition</span>
          </Link>
        </li>
        <li className={`${path === "HOD-requisition-list" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/HOD-requisition-list"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-layer-1"></i>
            <span className="nav-text">Job Requisition List</span>
          </Link>
        </li>
        <li className={`${path === "Monitoring" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/Monitoring"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-notepad"></i>
            <span className="nav-text">New Performance Monitoring</span>
          </Link>
        </li>
        <li className={`${path === "monitoring-list" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/monitoring-list"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-notepad-1"></i>
            <span className="nav-text">Performance Monitoring List</span>
          </Link>
        </li>
        <li className={`${path === "ICT-clearance-list" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/ICT-clearance-list"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-box-2"></i>
            <span className="nav-text">Staff Clearance List</span>
          </Link>
        </li>

        {/* Every Employer Menus */}

        {/* <li className={`${EmpUpdateDetail.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-10"></i>
            <span className="nav-text">Employee Probation</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "immediate-probation-list" ? "mm-active" : ""}`}
                to="/immediate-probation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Immediate Manager</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "probation-list" ? "mm-active" : ""}`}
                to="/probation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Probation List</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "new-probation" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-probation"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New Probation</span>
              </Link>
            </li>
          </ul>
        </li>
        <li
          className={`${EmpUpdateDetailCont.includes(path) ? "mm-active" : ""}`}
        >
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-2"></i>
            <span className="nav-text">Staff End of Contract</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "contract-list" ? "mm-active" : ""}`}
                to="/contract-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">End of Contract List</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "Contract" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Contract"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New End of Contract</span>
              </Link>
            </li>
          </ul>
        </li> */}
        <li className={`${EmpUpdateDetail.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-10"></i>
            <span className="nav-text">Employee Probation</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "new-probation" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-probation"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New Probation</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "probation-list" ? "mm-active" : ""}`}
                to="/probation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Probation List</span>
              </Link>
            </li>
          
            <li>
              <Link
                className={`${path === "probation-approval-hod" ? "mm-active" : ""}`}
                to="/probation-approval-hod"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-2  mr-3"></i>
                <span className="nav-text-drop">Probation Approval</span>
              </Link>
            </li>
            <li >
              <Link
               className={`${path === "bucketed-probations" ? "mm-active" : ""}`}
                to="/bucketed-probations"
                onClick={() => this.props.onClick3()}

              >
                <i className="flaticon-381-trash-2 mr-3"></i>
                <span className="nav-text-drop">Bucketed Probations </span>
              </Link>
            </li>
          </ul>
        </li>
        
        <li className={`${EmpUpdateDetailCont.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-2"></i>
            <span className="nav-text">Staff End of Contract</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "Contract" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Contract"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New End of Contract</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "contract-list" ? "mm-active" : ""}`}
                to="/contract-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">End of Contract List</span>
              </Link>
            </li>

            <li >
              <Link
               className={`${path === "contract-approval-hod" ? "mm-active" : ""}`}
                to="/contract-approval-hod"
                onClick={() => this.props.onClick3()}

              >
                <i className="flaticon-381-folder-2 mr-3"></i>
                <span className="nav-text-drop">Contracts Approval</span>
              </Link>
            </li>
            <li >
              <Link
               className={`${path === "bucketed-contracts" ? "mm-active" : ""}`}
                to="/bucketed-contracts"
                onClick={() => this.props.onClick3()}

              >
                <i className="flaticon-381-trash-2 mr-3"></i>
                <span className="nav-text-drop">Bucketed Contracts </span>
              </Link>
            </li>
          </ul>
        </li>

        {/* className={`${Leaves.includes(path) ? "mm-active" : ""}`} */}
        <li>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-time"></i>
            <span className="nav-text">Leave Operation</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "new-leave" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-leave"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New Leave</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "leave-lists" ? "mm-active" : ""}`}
                to="/leave-lists"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Pending Leaves</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "leave-approval" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/leave-approval"
              >
                <i className="flaticon-381-layer-1 mr-3"></i>
                <span className="nav-text-drop">Approval Request</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "supervisees" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/supervisees"
              >
                <i className="flaticon-381-sunglasses mr-3"></i>
                <span className="nav-text-drop">Supervisees List</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* className={`${Payroll.includes(path) ? "mm-active" : ""}`} */}
        <li>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-database"></i>
            <span className="nav-text">Payroll</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "Payslip" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Payslip"
              >
                <i className="flaticon-381-stop mr-3"></i>
                <span className="nav-text-drop">Payslip</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "P-nine" ? "mm-active" : ""}`}
                to="/P-nine"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-blueprint  mr-3"></i>
                <span className="nav-text-drop">P9</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* className={`${KPIS.includes(path) ? "mm-active" : ""}`} */}
        <li>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-network-1"></i>
            <span className="nav-text">KPIs</span>
          </Link>
          <ul>
            {/* <li>
              <Link
                className={`${path === "KPIs" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/KPIs"
              >
                <i className="flaticon-381-menu mr-1"></i>
                <span className="nav-text-drop">Job KPIs</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "Appraisals" ? "mm-active" : ""}`}
                to="/Appraisals"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-more-1  mr-1"></i>
                <span className="nav-text-drop">Performance Target</span>
              </Link>
            </li> */}

            <li>
              <Link
                className={`${
                  path === "employee-appraisal" ? "mm-active" : ""
                }`}
                to="/employee-appraisal"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-ellipsis-h mr-1"></i>
                <span className="nav-text-drop">Employee Appraisal</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-appraisal" ? "mm-active" : ""
                }`}
                to="/supervisor-appraisal"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-slideshare mr-1"></i>
                <span className="nav-text-drop">Supervisor Appraisals</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "employee-moderation" ? "mm-active" : ""
                }`}
                to="/employee-moderation"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className=" 	fa fa-delicious mr-1"></i>
                <span className="nav-text-drop">Employee Moderated</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-moderation" ? "mm-active" : ""
                }`}
                to="/supervisor-moderation"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-crosshairs mr-1"></i>
                <span className="nav-text-drop">Supervisor Moderated</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "employee-complete" ? "mm-active" : ""}`}
                to="/employee-complete"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-first-order mr-1"></i>
                <span className="nav-text-drop">Employee Completed</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-complete" ? "mm-active" : ""
                }`}
                to="/supervisor-complete"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-empire mr-1"></i>
                <span className="nav-text-drop">Supervisor Completed</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* <li className={`${TrainingNeeds.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-notebook-4"></i>
            <span className="nav-text">Training Needs</span>
          </Link>
          <ul>
            <li className={`${path === "new-need" ? "mm-active" : ""}`}>
              <Link
                className=""
                to="/new-need"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text">New</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "need-list" ? "mm-active" : ""
                }`}
                to="/need-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>
          </ul>
        </li> */}
        <li className={`${Grievance.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-id-card"></i>
            <span className="nav-text">Grievance</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "grievance-appeal-list" ? "mm-active" : ""}`}
                to="/grievance-appeal-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Appeal List</span>
              </Link>
            </li>
          <li>
              <Link
                className={`${path === "grievance-escalated-list" ? "mm-active" : ""}`}
                to="/grievance-escalated-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-repeat-1  mr-3"></i>
                <span className="nav-text-drop">Escalated List</span>
              </Link>
            </li>
          <li>
              <Link
                className={`${path === "grievance-approval-list" ? "mm-active" : ""}`}
                to="/grievance-approval-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-layer-1  mr-3"></i>
                <span className="nav-text-drop">Approval List</span>
              </Link>
            </li>
           
            <li>
              <Link
                className={`${path === "grievance" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/grievance"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "completed-grievance-list" ? "mm-active" : ""}`}
                to="/completed-grievance-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-box-2  mr-3"></i>
                <span className="nav-text-drop">Completed Records</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${path === "job-vacancy" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/job-vacancy"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-target"></i>
            <span className="nav-text">Job Vacancy</span>
          </Link>
        </li>
        <li className={`${Documents.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-5"></i>
            <span className="nav-text">Documents</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "document-list" ? "mm-active" : ""}`}
                to="/document-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${ContProbDocuments.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-7"></i>
            <span className="nav-text">Contract/Probation</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "contractprobation-list" ? "mm-active" : ""}`}
                to="/contractprobation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Documents</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className={`${path === "exit-interview" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/exit-interview"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-panel-1"></i>
            <span className="nav-text">Exit Interview</span>
          </Link>
        </li>
      </>
    );

    let HODHRNavi = (
      <>
        <li className={`${path === "HOD-dashboard" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/HOD-dashboard"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-home-2"></i>
            <span className="nav-text">Dashboard</span>
          </Link>
        </li>
        <li className={`${path === "employee-requisition" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/employee-requisition"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-background-1"></i>
            <span className="nav-text">New Job Requisition</span>
          </Link>
        </li>
        <li className={`${path === "HOD-requisition-list" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/HOD-requisition-list"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-layer-1"></i>
            <span className="nav-text">Job Requisition List</span>
          </Link>
        </li>
        <li className={`${path === "Monitoring" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/Monitoring"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-notepad"></i>
            <span className="nav-text">New Performance Monitoring</span>
          </Link>
        </li>
        <li className={`${path === "monitoring-list" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/monitoring-list"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-notepad-1"></i>
            <span className="nav-text">Performance Monitoring List</span>
          </Link>
        </li>
        <li
          className={`${path === "HOD-HR-clearance-list" ? "mm-active" : ""}`}
        >
          <Link
            className=""
            to="/HOD-HR-clearance-list"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-box-2"></i>
            <span className="nav-text">Staff Clearance List</span>
          </Link>
        </li>

        {/* Every Employer Menus */}

        {/* <li className={`${EmpUpdateDetail.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-10"></i>
            <span className="nav-text">Employee Probation</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "new-probation" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-probation"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New Probation</span>
              </Link>
            </li>
          <li>
              <Link
                className={`${path === "immediate-probation-list" ? "mm-active" : ""}`}
                to="/immediate-probation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Immediate Manager</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "probation-list" ? "mm-active" : ""}`}
                to="/probation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Probation List</span>
              </Link>
            </li>
           
          </ul>
        </li>
        <li
          className={`${EmpUpdateDetailCont.includes(path) ? "mm-active" : ""}`}
        >
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-2"></i>
            <span className="nav-text">Staff End of Contract</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "contract-list" ? "mm-active" : ""}`}
                to="/contract-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">End of Contract List</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "Contract" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Contract"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New End of Contract</span>
              </Link>
            </li>
          </ul>
        </li> */}
        <li className={`${EmpUpdateDetail.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-10"></i>
            <span className="nav-text">Employee Probation</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "new-probation" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-probation"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New Probation</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "probation-list" ? "mm-active" : ""}`}
                to="/probation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Probation List</span>
              </Link>
            </li>
          
            <li>
              <Link
                className={`${path === "probation-approval-hod" ? "mm-active" : ""}`}
                to="/probation-approval-hod"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-2  mr-3"></i>
                <span className="nav-text-drop">Probation Approval</span>
              </Link>
            </li>
            <li >
              <Link
               className={`${path === "bucketed-probations" ? "mm-active" : ""}`}
                to="/bucketed-probations"
                onClick={() => this.props.onClick3()}

              >
                <i className="flaticon-381-trash-2 mr-3"></i>
                <span className="nav-text-drop">Bucketed Probations </span>
              </Link>
            </li>
          </ul>
        </li>
        
        <li className={`${EmpUpdateDetailCont.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-2"></i>
            <span className="nav-text">Staff End of Contract</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "Contract" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Contract"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New End of Contract</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "contract-list" ? "mm-active" : ""}`}
                to="/contract-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">End of Contract List</span>
              </Link>
            </li>

            <li >
              <Link
               className={`${path === "contract-approval-hod" ? "mm-active" : ""}`}
                to="/contract-approval-hod"
                onClick={() => this.props.onClick3()}

              >
                <i className="flaticon-381-folder-2 mr-3"></i>
                <span className="nav-text-drop">Contracts Approval</span>
              </Link>
            </li>
            <li >
              <Link
               className={`${path === "bucketed-contracts" ? "mm-active" : ""}`}
                to="/bucketed-contracts"
                onClick={() => this.props.onClick3()}

              >
                <i className="flaticon-381-trash-2 mr-3"></i>
                <span className="nav-text-drop">Bucketed Contracts </span>
              </Link>
            </li>
          </ul>
        </li>

        {/* className={`${Leaves.includes(path) ? "mm-active" : ""}`} */}
        <li >
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-time"></i>
            <span className="nav-text">Leave Operation</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "new-leave" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-leave"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New Leave</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "leave-lists" ? "mm-active" : ""}`}
                to="/leave-lists"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Pending Leaves</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "leave-approval" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/leave-approval"
              >
                <i className="flaticon-381-layer-1 mr-3"></i>
                <span className="nav-text-drop">Approval Request</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "supervisees" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/supervisees"
              >
                <i className="flaticon-381-sunglasses mr-3"></i>
                <span className="nav-text-drop">Supervisees List</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* className={`${Payroll.includes(path) ? "mm-active" : ""}`} */}
        <li>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-database"></i>
            <span className="nav-text">Payroll</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "Payslip" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Payslip"
              >
                <i className="flaticon-381-stop mr-3"></i>
                <span className="nav-text-drop">Payslip</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "P-nine" ? "mm-active" : ""}`}
                to="/P-nine"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-blueprint  mr-3"></i>
                <span className="nav-text-drop">P9</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* className={`${KPIS.includes(path) ? "mm-active" : ""}`} */}
        <li>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-network-1"></i>
            <span className="nav-text">KPIs</span>
          </Link>
          <ul>
            {/* <li>
              <Link
                className={`${path === "KPIs" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/KPIs"
              >
                <i className="flaticon-381-menu mr-1"></i>
                <span className="nav-text-drop">Job KPIs</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "Appraisals" ? "mm-active" : ""}`}
                to="/Appraisals"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-more-1  mr-1"></i>
                <span className="nav-text-drop">Performance Target</span>
              </Link>
            </li> */}

            <li>
              <Link
                className={`${
                  path === "employee-appraisal" ? "mm-active" : ""
                }`}
                to="/employee-appraisal"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-ellipsis-h mr-1"></i>
                <span className="nav-text-drop">Employee Appraisal</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-appraisal" ? "mm-active" : ""
                }`}
                to="/supervisor-appraisal"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-slideshare mr-1"></i>
                <span className="nav-text-drop">Supervisor Appraisals</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "employee-moderation" ? "mm-active" : ""
                }`}
                to="/employee-moderation"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className=" 	fa fa-delicious mr-1"></i>
                <span className="nav-text-drop">Employee Moderated</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-moderation" ? "mm-active" : ""
                }`}
                to="/supervisor-moderation"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-crosshairs mr-1"></i>
                <span className="nav-text-drop">Supervisor Moderated</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "employee-complete" ? "mm-active" : ""}`}
                to="/employee-complete"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-first-order mr-1"></i>
                <span className="nav-text-drop">Employee Completed</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-complete" ? "mm-active" : ""
                }`}
                to="/supervisor-complete"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-empire mr-1"></i>
                <span className="nav-text-drop">Supervisor Completed</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* <li className={`${TrainingNeeds.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-notebook-4"></i>
            <span className="nav-text">Training Needs</span>
          </Link>
          <ul>
            <li className={`${path === "new-need" ? "mm-active" : ""}`}>
              <Link
                className=""
                to="/new-need"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text">New</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "need-list" ? "mm-active" : ""
                }`}
                to="/need-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>
          </ul>
        </li> */}
            <li className={`${Grievance.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-id-card"></i>
            <span className="nav-text">Grievance</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "grievance-appeal-list" ? "mm-active" : ""}`}
                to="/grievance-appeal-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Appeal List</span>
              </Link>
            </li>
          <li>
              <Link
                className={`${path === "grievance-escalated-list" ? "mm-active" : ""}`}
                to="/grievance-escalated-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-repeat-1  mr-3"></i>
                <span className="nav-text-drop">Escalated List</span>
              </Link>
            </li>
          <li>
              <Link
                className={`${path === "grievance-approval-list" ? "mm-active" : ""}`}
                to="/grievance-approval-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-layer-1  mr-3"></i>
                <span className="nav-text-drop">Approval List</span>
              </Link>
            </li>
           
            <li>
              <Link
                className={`${path === "grievance" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/grievance"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "completed-grievance-list" ? "mm-active" : ""}`}
                to="/completed-grievance-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-box-2  mr-3"></i>
                <span className="nav-text-drop">Completed Records</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${path === "job-vacancy" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/job-vacancy"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-target"></i>
            <span className="nav-text">Job Vacancy</span>
          </Link>
        </li>
        <li className={`${Documents.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-5"></i>
            <span className="nav-text">Documents</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "document-list" ? "mm-active" : ""}`}
                to="/document-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${ContProbDocuments.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-7"></i>
            <span className="nav-text">Contract/Probation</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "contractprobation-list" ? "mm-active" : ""}`}
                to="/contractprobation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Documents</span>
              </Link>
            </li>
          </ul>
        </li>


        <li className={`${path === "exit-interview" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/exit-interview"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-panel-1"></i>
            <span className="nav-text">Exit Interview</span>
          </Link>
        </li>
        <li className={`${Settings.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-settings-2"></i>
            <span className="nav-text">Settings</span>
          </Link>
          <ul>
            <li className={`${path === "HR-users" ? "mm-active" : ""}`}>
              <Link
                className=""
                to="/HR-users"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-user-8 mr-3"></i>
                <span className="nav-text">Users</span>
              </Link>
            </li>
            <li className={`${path === "HR-document" ? "mm-active" : ""}`}>
              <Link
                className=""
                to="/HR-document"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-box mr-3"></i>
                <span className="nav-text">Documents</span>
              </Link>
            </li>
          </ul>
        </li>
      </>
    );

    let HODFINNavi = (
      <>
        <li className={`${path === "HOD-dashboard" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/HOD-dashboard"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-home-2"></i>
            <span className="nav-text">Dashboard</span>
          </Link>
        </li>

        <li className={`${path === "employee-requisition" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/employee-requisition"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-background-1"></i>
            <span className="nav-text">New Job Requisition</span>
          </Link>
        </li>
        <li className={`${path === "HOD-requisition-list" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/HOD-requisition-list"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-layer-1"></i>
            <span className="nav-text">Job Requisition List</span>
          </Link>
        </li>
        <li className={`${path === "Monitoring" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/Monitoring"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-notepad"></i>
            <span className="nav-text">New Performance Monitoring</span>
          </Link>
        </li>
        <li className={`${path === "monitoring-list" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/monitoring-list"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-notepad-1"></i>
            <span className="nav-text">Performance Monitoring List</span>
          </Link>
        </li>
        <li className={`${path === "HOD-financial-list" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/HOD-financial-list"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-box-2"></i>
            <span className="nav-text">Staff Clearance List</span>
          </Link>
        </li>

        {/* Every Employer Menus */}

        {/* <li className={`${EmpUpdateDetail.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-10"></i>
            <span className="nav-text">Employee Probation</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "new-probation" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-probation"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New Probation</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "immediate-probation-list" ? "mm-active" : ""}`}
                to="/immediate-probation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Immediate Manager</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "probation-list" ? "mm-active" : ""}`}
                to="/probation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Probation List</span>
              </Link>
            </li>
          
          </ul>
        </li>
        <li
          className={`${EmpUpdateDetailCont.includes(path) ? "mm-active" : ""}`}
        >
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-2"></i>
            <span className="nav-text">Staff End of Contract</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "contract-list" ? "mm-active" : ""}`}
                to="/contract-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">End of Contract List</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "Contract" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Contract"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New End of Contract</span>
              </Link>
            </li>
          </ul>
        </li> */}
        <li className={`${EmpUpdateDetail.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-10"></i>
            <span className="nav-text">Employee Probation</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "new-probation" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-probation"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New Probation</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "probation-list" ? "mm-active" : ""}`}
                to="/probation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Probation List</span>
              </Link>
            </li>
          
            <li>
              <Link
                className={`${path === "probation-approval-hod" ? "mm-active" : ""}`}
                to="/probation-approval-hod"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-2  mr-3"></i>
                <span className="nav-text-drop">Probation Approval</span>
              </Link>
            </li>
            <li >
              <Link
               className={`${path === "bucketed-probations" ? "mm-active" : ""}`}
                to="/bucketed-probations"
                onClick={() => this.props.onClick3()}

              >
                <i className="flaticon-381-trash-2 mr-3"></i>
                <span className="nav-text-drop">Bucketed Probations </span>
              </Link>
            </li>

          </ul>
        </li>
        
        <li className={`${EmpUpdateDetailCont.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-2"></i>
            <span className="nav-text">Staff End of Contract</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "Contract" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Contract"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New End of Contract</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "contract-list" ? "mm-active" : ""}`}
                to="/contract-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">End of Contract List</span>
              </Link>
            </li>

            <li >
              <Link
               className={`${path === "contract-approval-hod" ? "mm-active" : ""}`}
                to="/contract-approval-hod"
                onClick={() => this.props.onClick3()}

              >
                <i className="flaticon-381-folder-2 mr-3"></i>
                <span className="nav-text-drop">Contracts Approval</span>
              </Link>
            </li>
            <li >
              <Link
               className={`${path === "bucketed-contracts" ? "mm-active" : ""}`}
                to="/bucketed-contracts"
                onClick={() => this.props.onClick3()}

              >
                <i className="flaticon-381-trash-2 mr-3"></i>
                <span className="nav-text-drop">Bucketed Contracts </span>
              </Link>
            </li>

          </ul>
        </li>

        {/* className={`${Leaves.includes(path) ? "mm-active" : ""}`} */}
        <li>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-time"></i>
            <span className="nav-text">Leave Operation</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "new-leave" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-leave"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New Leave</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "leave-lists" ? "mm-active" : ""}`}
                to="/leave-lists"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Pending Leaves</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "leave-approval" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/leave-approval"
              >
                <i className="flaticon-381-layer-1 mr-3"></i>
                <span className="nav-text-drop">Approval Request</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "supervisees" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/supervisees"
              >
                <i className="flaticon-381-sunglasses mr-3"></i>
                <span className="nav-text-drop">Supervisees List</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* className={`${Payroll.includes(path) ? "mm-active" : ""}`} */}
        <li>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-database"></i>
            <span className="nav-text">Payroll</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "Payslip" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Payslip"
              >
                <i className="flaticon-381-stop mr-3"></i>
                <span className="nav-text-drop">Payslip</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "P-nine" ? "mm-active" : ""}`}
                to="/P-nine"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-blueprint  mr-3"></i>
                <span className="nav-text-drop">P9</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* className={`${KPIS.includes(path) ? "mm-active" : ""}`} */}
        <li>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-network-1"></i>
            <span className="nav-text">KPIs</span>
          </Link>
          <ul>
            {/* <li>
              <Link
                className={`${path === "KPIs" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/KPIs"
              >
                <i className="flaticon-381-menu mr-3"></i>
                <span className="nav-text-drop">Job KPIs</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "Appraisals" ? "mm-active" : ""}`}
                to="/Appraisals"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-more-1  mr-3"></i>
                <span className="nav-text-drop">Performance Target</span>
              </Link>
            </li> */}

            <li>
              <Link
                className={`${
                  path === "employee-appraisal" ? "mm-active" : ""
                }`}
                to="/employee-appraisal"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-ellipsis-h mr-1"></i>
                <span className="nav-text-drop">Employee Appraisal</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-appraisal" ? "mm-active" : ""
                }`}
                to="/supervisor-appraisal"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-slideshare mr-1"></i>
                <span className="nav-text-drop">Supervisor Appraisals</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "employee-moderation" ? "mm-active" : ""
                }`}
                to="/employee-moderation"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className=" 	fa fa-delicious mr-1"></i>
                <span className="nav-text-drop">Employee Moderated</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-moderation" ? "mm-active" : ""
                }`}
                to="/supervisor-moderation"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-crosshairs mr-1"></i>
                <span className="nav-text-drop">Supervisor Moderated</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "employee-complete" ? "mm-active" : ""}`}
                to="/employee-complete"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-first-order mr-1"></i>
                <span className="nav-text-drop">Employee Completed</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-complete" ? "mm-active" : ""
                }`}
                to="/supervisor-complete"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-empire mr-1"></i>
                <span className="nav-text-drop">Supervisor Completed</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* <li className={`${TrainingNeeds.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-notebook-4"></i>
            <span className="nav-text">Training Needs</span>
          </Link>
          <ul>
            <li className={`${path === "new-need" ? "mm-active" : ""}`}>
              <Link
                className=""
                to="/new-need"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text">New</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "need-list" ? "mm-active" : ""
                }`}
                to="/need-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>
          </ul>
        </li> */}
          <li className={`${Grievance.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-id-card"></i>
            <span className="nav-text">Grievance</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "grievance-appeal-list" ? "mm-active" : ""}`}
                to="/grievance-appeal-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Appeal List</span>
              </Link>
            </li>
          <li>
              <Link
                className={`${path === "grievance-escalated-list" ? "mm-active" : ""}`}
                to="/grievance-escalated-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-repeat-1  mr-3"></i>
                <span className="nav-text-drop">Escalated List</span>
              </Link>
            </li>
          <li>
              <Link
                className={`${path === "grievance-approval-list" ? "mm-active" : ""}`}
                to="/grievance-approval-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-layer-1  mr-3"></i>
                <span className="nav-text-drop">Approval List</span>
              </Link>
            </li>
           
            <li>
              <Link
                className={`${path === "grievance" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/grievance"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "completed-grievance-list" ? "mm-active" : ""}`}
                to="/completed-grievance-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-box-2  mr-3"></i>
                <span className="nav-text-drop">Completed Records</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${path === "job-vacancy" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/job-vacancy"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-target"></i>
            <span className="nav-text">Job Vacancy</span>
          </Link>
        </li>
        <li className={`${Documents.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-5"></i>
            <span className="nav-text">Documents</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "document-list" ? "mm-active" : ""}`}
                to="/document-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${ContProbDocuments.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-7"></i>
            <span className="nav-text">Contract/Probation</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "contractprobation-list" ? "mm-active" : ""}`}
                to="/contractprobation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Documents</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className={`${path === "exit-interview" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/exit-interview"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-panel-1"></i>
            <span className="nav-text">Exit Interview</span>
          </Link>
        </li>
      </>
    );

    let NOSNavi = (
      <>
        <li className={`${path === "staff-dashboard" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/staff-dashboard"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-home-2"></i>
            <span className="nav-text">Dashboard</span>
          </Link>
        </li>

        {/* <li className={`${EmpUpdateDetail.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-10"></i>
            <span className="nav-text">Employee Probation</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "new-probation" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-probation"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New Probation</span>
              </Link>
            </li>
          <li>
              <Link
                className={`${path === "immediate-probation-list" ? "mm-active" : ""}`}
                to="/immediate-probation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Immediate Manager</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "probation-list" ? "mm-active" : ""}`}
                to="/probation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Probation List</span>
              </Link>
            </li>
           
          </ul>
        </li>

        <li
          className={`${EmpUpdateDetailCont.includes(path) ? "mm-active" : ""}`}
        >
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-2"></i>
            <span className="nav-text">Staff End of Contract</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "contract-list" ? "mm-active" : ""}`}
                to="/contract-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">End of Contract List</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "Contract" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Contract"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New End of Contract</span>
              </Link>
            </li>
          </ul>
        </li> */}
        <li className={`${EmpUpdateDetail.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-10"></i>
            <span className="nav-text">Employee Probation</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "new-probation" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-probation"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New Probation</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "probation-list" ? "mm-active" : ""}`}
                to="/probation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Probation List</span>
              </Link>
            </li>
          
            <li>
              <Link
                className={`${path === "HR-probation" ? "mm-active" : ""}`}
                to="/HR-probation"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-2  mr-3"></i>
                <span className="nav-text-drop">Probation Approval</span>
              </Link>
            </li>
            <li >
              <Link
               className={`${path === "bucketed-probations" ? "mm-active" : ""}`}
                to="/bucketed-probations"
                onClick={() => this.props.onClick3()}

              >
                <i className="flaticon-381-trash-2 mr-3"></i>
                <span className="nav-text-drop">Bucketed Probations </span>
              </Link>
            </li>
          </ul>
        </li>
        
        <li className={`${EmpUpdateDetailCont.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-2"></i>
            <span className="nav-text">Staff End of Contract</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "Contract" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Contract"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New End of Contract</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "contract-list" ? "mm-active" : ""}`}
                to="/contract-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">End of Contract List</span>
              </Link>
            </li>

            <li >
              <Link
               className={`${path === "HR-contract" ? "mm-active" : ""}`}
                to="/HR-contract"
                onClick={() => this.props.onClick3()}

              >
                <i className="flaticon-381-folder-2 mr-3"></i>
                <span className="nav-text-drop">Contracts Approval</span>
              </Link>
            </li>
            <li >
              <Link
               className={`${path === "bucketed-contracts" ? "mm-active" : ""}`}
                to="/bucketed-contracts"
                onClick={() => this.props.onClick3()}

              >
                <i className="flaticon-381-trash-2 mr-3"></i>
                <span className="nav-text-drop">Bucketed Contracts </span>
              </Link>
            </li>
          </ul>
        </li>


        {/* <li className={`${Grievance.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-id-card"></i>
            <span className="nav-text">Grievance</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "GrievanceList" ? "mm-active" : ""}`}
                to="/GrievanceList"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "Grievance" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Grievance"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New</span>
              </Link>
            </li>
          </ul>
        </li> */}

        <li className={`${Leaves.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-time"></i>
            <span className="nav-text">Leave Operation</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "new-leave" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-leave"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New Leave</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "leave-lists" ? "mm-active" : ""}`}
                to="/leave-lists"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Pending Leave</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "leave-approval" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/leave-approval"
              >
                <i className="flaticon-381-layer-1 mr-3"></i>
                <span className="nav-text-drop">Approval Request</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "supervisees" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/supervisees"
              >
                <i className="flaticon-381-sunglasses mr-3"></i>
                <span className="nav-text-drop">Supervisees List</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${Payroll.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-database"></i>
            <span className="nav-text">Payroll</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "Payslip" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Payslip"
              >
                <i className="flaticon-381-stop mr-3"></i>
                <span className="nav-text-drop">Payslip</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "P-nine" ? "mm-active" : ""}`}
                to="/P-nine"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-blueprint  mr-3"></i>
                <span className="nav-text-drop">P9</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${KPIS.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-network-1"></i>
            <span className="nav-text">KPIs</span>
          </Link>
          <ul>
            {/* <li>
              <Link
                className={`${path === "KPIs" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/KPIs"
              >
                <i className="flaticon-381-menu mr-3"></i>
                <span className="nav-text-drop">Job KPIs</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "Appraisals" ? "mm-active" : ""}`}
                to="/Appraisals"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-more-1  mr-3"></i>
                <span className="nav-text-drop">Performance Target</span>
              </Link>
            </li> */}

            <li>
              <Link
                className={`${
                  path === "employee-appraisal" ? "mm-active" : ""
                }`}
                to="/employee-appraisal"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-ellipsis-h mr-1"></i>
                <span className="nav-text-drop">Employee Appraisal</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-appraisal" ? "mm-active" : ""
                }`}
                to="/supervisor-appraisal"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-slideshare mr-1"></i>
                <span className="nav-text-drop">Supervisor Appraisals</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "employee-moderation" ? "mm-active" : ""
                }`}
                to="/employee-moderation"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className=" 	fa fa-delicious mr-1"></i>
                <span className="nav-text-drop">Employee Moderated</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-moderation" ? "mm-active" : ""
                }`}
                to="/supervisor-moderation"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-crosshairs mr-1"></i>
                <span className="nav-text-drop">Supervisor Moderated</span>
              </Link>
            </li>

            {/* <li>
              <Link
                className={`${path === "CompletedAppraisal" ? "mm-active" : ""}`}
                to="/CompletedAppraisal"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-first-order mr-1"></i>
                <span className="nav-text-drop">Completed KPI</span>
              </Link>
            </li> */}
            <li>
              <Link
                className={`${path === "employee-complete" ? "mm-active" : ""}`}
                to="/employee-complete"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-first-order mr-1"></i>
                <span className="nav-text-drop">Employee Completed</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-complete" ? "mm-active" : ""
                }`}
                to="/supervisor-complete"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-empire mr-1"></i>
                <span className="nav-text-drop">Supervisor Completed</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* <li className={`${TrainingNeeds.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-notebook-4"></i>
            <span className="nav-text">Training Needs</span>
          </Link>
          <ul>
            <li className={`${path === "new-need" ? "mm-active" : ""}`}>
              <Link
                className=""
                to="/new-need"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text">New</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "need-list" ? "mm-active" : ""
                }`}
                to="/need-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>
          </ul>
        </li> */}
          <li className={`${Grievance.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-id-card"></i>
            <span className="nav-text">Grievance</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "grievance-appeal-list" ? "mm-active" : ""}`}
                to="/grievance-appeal-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Appeal List</span>
              </Link>
            </li>
          <li>
              <Link
                className={`${path === "grievance-escalated-list" ? "mm-active" : ""}`}
                to="/grievance-escalated-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-repeat-1  mr-3"></i>
                <span className="nav-text-drop">Escalated List</span>
              </Link>
            </li>
          <li>
              <Link
                className={`${path === "grievance-approval-list" ? "mm-active" : ""}`}
                to="/grievance-approval-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-layer-1  mr-3"></i>
                <span className="nav-text-drop">Approval List</span>
              </Link>
            </li>
           
            <li>
              <Link
                className={`${path === "grievance" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/grievance"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "completed-grievance-list" ? "mm-active" : ""}`}
                to="/completed-grievance-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-box-2  mr-3"></i>
                <span className="nav-text-drop">Completed Records</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${path === "job-vacancy" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/job-vacancy"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-target"></i>
            <span className="nav-text">Job Vacancy</span>
          </Link>
        </li>
        <li className={`${Documents.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-5"></i>
            <span className="nav-text">Documents</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "document-list" ? "mm-active" : ""}`}
                to="/document-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>
            {/* <li>
              <Link
                className={`${path === "Grievance" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Grievance"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New</span>
              </Link>
            </li> */}
          </ul>
        </li>
        <li className={`${ContProbDocuments.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-7"></i>
            <span className="nav-text">Contract/Probation</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "contractprobation-list" ? "mm-active" : ""}`}
                to="/contractprobation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Documents</span>
              </Link>
            </li>
          </ul>
        </li>


        <li className={`${path === "exit-interview" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/exit-interview"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-panel-1"></i>
            <span className="nav-text">Exit Interview</span>
          </Link>
        </li>
      </>
    );

    let NormalNavi = (
      <>
        <li className={`${path === "dashboard" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/dashboard"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-home-2"></i>
            <span className="nav-text">Dashboard</span>
          </Link>
        </li>

        <li className={`${path === "posted-job" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/posted-job"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-album-1"></i>
            <span className="nav-text">Posted Job</span>
          </Link>
        </li>
        <li className={`${path === "applied-job" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/applied-job"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-album-2"></i>
            <span className="nav-text">Applied Job</span>
          </Link>
        </li>

        <li className={`${path === "profile" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/profile"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-user-4"></i>
            <span className="nav-text">Profile</span>
          </Link>
        </li>
      </>
    );

    let NormalEmployeeNavi = (
      <>
        <li className={`${path === "staff-dashboard" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/staff-dashboard"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-home-2"></i>
            <span className="nav-text">Dashboard</span>
          </Link>
        </li>

        {/* <li className={`${EmpUpdateDetail.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-10"></i>
            <span className="nav-text">Employee Probation</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "immediate-probation-list" ? "mm-active" : ""}`}
                to="/immediate-probation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Probation List</span>
              </Link>
            </li>
            
          </ul>
        </li> */}

        {/* <li className={`${EmpUpdateDetailCont.includes(path) ? "mm-active" : ""}`} >
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-2"></i>
            <span className="nav-text">Staff End of Contract</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "contract-list" ? "mm-active" : ""}`}
                to="/contract-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">End of Contract List</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "Contract" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Contract"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New End of Contract</span>
              </Link>
            </li>
          </ul>
        </li> */}

     

        {/* className={`${Leaves.includes(path) ? "mm-active" : ""}`} */}
        <li>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-time"></i>
            <span className="nav-text">Leave Operation</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "new-leave" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-leave"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New Leave</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "leave-lists" ? "mm-active" : ""}`}
                to="/leave-lists"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Pending Leave</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "leave-approval" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/leave-approval"
              >
                <i className="flaticon-381-layer-1 mr-3"></i>
                <span className="nav-text-drop">Approval Request</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "supervisees" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/supervisees"
              >
                <i className="flaticon-381-sunglasses mr-3"></i>
                <span className="nav-text-drop">Supervisees List</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* className={`${Payroll.includes(path) ? "mm-active" : ""}`} */}
        <li>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-database"></i>
            <span className="nav-text">Payroll</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "Payslip" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Payslip"
              >
                <i className="flaticon-381-stop mr-3"></i>
                <span className="nav-text-drop">Payslip</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "P-nine" ? "mm-active" : ""}`}
                to="/P-nine"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-blueprint  mr-3"></i>
                <span className="nav-text-drop">P9</span>
              </Link>
            </li>
          </ul>
        </li>
        {/* className={`${KPIS.includes(path) ? "mm-active" : ""}`} */}
        <li>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-network-1"></i>
            <span className="nav-text">Job KPIs</span>
          </Link>
          <ul>
            {/* <li>
              <Link
                className={`${path === "KPIs" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/KPIs"
              >
                <i className="flaticon-381-menu mr-1"></i>
                <span className="nav-text-drop">Job KPIs</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "Appraisals" ? "mm-active" : ""}`}
                to="/Appraisals"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-more-1  mr-1"></i>
                <span className="nav-text-drop">Performance Target</span>
              </Link>
            </li> */}

            <li>
              <Link
                className={`${
                  path === "employee-appraisal" ? "mm-active" : ""
                }`}
                to="/employee-appraisal"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-ellipsis-h mr-1"></i>
                <span className="nav-text-drop">Employee Appraisal</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-appraisal" ? "mm-active" : ""
                }`}
                to="/supervisor-appraisal"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-slideshare mr-1"></i>
                <span className="nav-text-drop">Supervisor Appraisals</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "employee-moderation" ? "mm-active" : ""
                }`}
                to="/employee-moderation"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className=" 	fa fa-delicious mr-1"></i>
                <span className="nav-text-drop">Employee Moderated</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-moderation" ? "mm-active" : ""
                }`}
                to="/supervisor-moderation"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-crosshairs mr-1"></i>
                <span className="nav-text-drop">Supervisor Moderated</span>
              </Link>
            </li>

            {/* <li>
              <Link
                className={`${path === "CompletedAppraisal" ? "mm-active" : ""}`}
                to="/CompletedAppraisal"
                onClick={() => this.props.onClick3()}
                style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-first-order mr-1"></i>
                <span className="nav-text-drop">Completed KPI</span>
              </Link>
            </li> */}
            <li>
              <Link
                className={`${path === "employee-complete" ? "mm-active" : ""}`}
                to="/employee-complete"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-first-order mr-1"></i>
                <span className="nav-text-drop">Employee Completed</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "supervisor-complete" ? "mm-active" : ""
                }`}
                to="/supervisor-complete"
                onClick={() => this.props.onClick3()}
                // style={{ paddingLeft: "2rem" }}
              >
                <i className="fa fa-empire mr-1"></i>
                <span className="nav-text-drop">Supervisor Completed</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* <li className={`${TrainingNeeds.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-notebook-4"></i>
            <span className="nav-text">Training Needs</span>
          </Link>
          <ul>
            <li className={`${path === "new-need" ? "mm-active" : ""}`}>
              <Link
                className=""
                to="/new-need"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text">New</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${
                  path === "need-list" ? "mm-active" : ""
                }`}
                to="/need-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>
          </ul>
        </li> */}
        <li className={`${EmpUpdateDetail.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-10"></i>
            <span className="nav-text">Employee Probation</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "new-probation" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/new-probation"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New Probation</span>
              </Link>
            </li>

            <li>
              <Link
                className={`${path === "probation-list" ? "mm-active" : ""}`}
                to="/probation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Probation List</span>
              </Link>
            </li>
          
            {/* <li>
              <Link
                className={`${path === "HR-probation" ? "mm-active" : ""}`}
                to="/HR-probation"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-2  mr-3"></i>
                <span className="nav-text-drop">Probation Approval</span>
              </Link>
            </li> */}
          </ul>
        </li>
        
        <li className={`${EmpUpdateDetailCont.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-2"></i>
            <span className="nav-text">Staff End of Contract</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "Contract" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Contract"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New End of Contract</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "contract-list" ? "mm-active" : ""}`}
                to="/contract-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">End of Contract List</span>
              </Link>
            </li>

            {/* <li >
              <Link
               className={`${path === "HR-contract" ? "mm-active" : ""}`}
                to="/HR-contract"
                onClick={() => this.props.onClick3()}

              >
                <i className="flaticon-381-folder-2 mr-3"></i>
                <span className="nav-text-drop">Contracts Approval</span>
              </Link>
            </li> */}
          </ul>
        </li>

        <li className={`${ContProbDocuments.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-7"></i>
            <span className="nav-text">Contract/Probation</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "contractprobation-list" ? "mm-active" : ""}`}
                to="/contractprobation-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Documents</span>
              </Link>
            </li>
          </ul>
        </li>

        {/* className={`${Documents.includes(path) ? "mm-active" : ""}`} */}
        <li>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-folder-5"></i>
            <span className="nav-text">Documents</span>
          </Link>
          <ul>
            <li>
              <Link
                className={`${path === "document-list" ? "mm-active" : ""}`}
                to="/document-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Lists</span>
              </Link>
            </li>
            {/* <li>
              <Link
                className={`${path === "Grievance" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Grievance"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New</span>
              </Link>
            </li> */}
          </ul>
        </li>
        <li className={`${Grievance.includes(path) ? "mm-active" : ""}`}>
          <Link className="has-arrow ai-icon" to="#">
            <i className="flaticon-381-id-card"></i>
            <span className="nav-text">Grievances</span>
          </Link>
          <ul>
          <li>
              <Link
                className={`${path === "grievance-escalated-list" ? "mm-active" : ""}`}
                to="/grievance-escalated-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-repeat-1  mr-3"></i>
                <span className="nav-text-drop">Escalated List</span>
              </Link>
            </li>
          <li>
              <Link
                className={`${path === "grievance-approval-list" ? "mm-active" : ""}`}
                to="/grievance-approval-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-layer-1  mr-3"></i>
                <span className="nav-text-drop">Approval List</span>
              </Link>
            </li>
            {/* <li>
              <Link
                className={`${path === "GrievanceList" ? "mm-active" : ""}`}
                to="/GrievanceList"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-album-1  mr-3"></i>
                <span className="nav-text-drop">Grievance Lists</span>
              </Link>
            </li> */}
            <li>
              <Link
                className={`${path === "Grievance" ? "mm-active" : ""}`}
                onClick={() => this.props.onClick()}
                to="/Grievance"
              >
                <i className="flaticon-381-add-1 mr-3"></i>
                <span className="nav-text-drop">New</span>
              </Link>
            </li>
            <li>
              <Link
                className={`${path === "completed-grievance-list" ? "mm-active" : ""}`}
                to="/completed-grievance-list"
                onClick={() => this.props.onClick3()}
              >
                <i className="flaticon-381-box-2  mr-3"></i>
                <span className="nav-text-drop">Completed Records</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className={`${path === "job-vacancy" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/job-vacancy"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-target"></i>
            <span className="nav-text">Job Vacancy</span>
          </Link>
        </li>
        <li className={`${path === "exit-interview" ? "mm-active" : ""}`}>
          <Link
            className=""
            to="/exit-interview"
            onClick={() => this.props.onClick3()}
          >
            <i className="flaticon-381-panel-1"></i>
            <span className="nav-text">Exit Interview</span>
          </Link>
        </li>
      </>
    );

    let finalNani = "";
    if (JSON.parse(localStorage.getItem("userDetails")).user.length === 0) {
      finalNani = NormalNavi;
    } else if (
      JSON.parse(localStorage.getItem("userDetails")).user[0] === "HOD"
    ) {
      finalNani = HODNavi;
    } else if (
      JSON.parse(localStorage.getItem("userDetails")).user[0] === "HOD-ADMIN"
    ) {
      finalNani = HODADMINNavi;
    } else if (
      JSON.parse(localStorage.getItem("userDetails")).user[0] === "HOD-IT"
    ) {
      finalNani = HODICTNavi;
    } else if (
      JSON.parse(localStorage.getItem("userDetails")).user[0] === "HOD-HR"
    ) {
      finalNani = HODHRNavi;
    } else if (
      JSON.parse(localStorage.getItem("userDetails")).user[0] === "HOD-FIN"
    ) {
      finalNani = HODFINNavi;
    } else if (
      JSON.parse(localStorage.getItem("userDetails")).user[0] === "HR"
    ) {
      finalNani = HRNavi;
    } else if (
      JSON.parse(localStorage.getItem("userDetails")).user[0] === "HEAD-HR"
    ) {
      finalNani = HEADHRNavi;
    } else if (
      JSON.parse(localStorage.getItem("userDetails")).user[0] === "MD"
    ) {
      finalNani = MDNavi;
    } else if (
      JSON.parse(localStorage.getItem("userDetails")).user[0] === "FD"
    ) {
      finalNani = FDNav;
    } else if (
      JSON.parse(localStorage.getItem("userDetails")).user[0] === "NOS"
    ) {
      finalNani = NOSNavi;
    } else if (
      JSON.parse(localStorage.getItem("userDetails")).user[0] === "NORMAL"
    ) {
      finalNani = NormalEmployeeNavi;
    } else {
    }

    return (
      <div className="deznav">
        <PerfectScrollbar className="deznav-scroll">
          <MM className="metismenu" id="menu">
            {finalNani}
          </MM>
        </PerfectScrollbar>
      </div>
    );
  }
}

export default SideBar;
