import React, { useState } from "react";
/// React router dom
import { Switch, Route } from "react-router-dom";
/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";

/// Dashboard
import Home from "./components/Dashboard/Home/Home";
import SearchTable from "./components/Dashboard/Search/SearchTable";
import Profile from "./components/Dashboard/Profile/Profile copy";
import Jobdata from "./components/Dashboard/Search/Jobdata";
import AppliedJob from "./components/Dashboard/Appliedjobs/AppliedJob";

import HRHome from "./components/Dashboard/Home/HRHome";
import HRAppliedJob from "./components/Dashboard/Appliedjobs/HRAppliedJob";
import ViewApplication from "./components/Admin/ViewApplication/ViewApplications";
import HRProfile from "./components/Dashboard/Profile/HRProfile";
import ApprovedApplications from "./components/Admin/ViewApplication/ApprovedApplications";
import EmployeeRequision from "./components/Admin/HOD/EmployeeRequision";
import EmployeeRequisitionCard from "./components/Admin/HOD/EmployeeRequisitionCard";
import RequisitionApproval from "./components/Admin/HR/RequisitionApproval";
import HRRequisionCard from "./components/Admin/HR/HRRequisionCard";
import MDDashboard from "./components/Admin/MD/MDDashboard";
import MDRequisitionApproval from "./components/Admin/MD/MDRequisitionApproval";
import MDRequisionCard from "./components/Admin/MD/MDRequisionCard";
import HODDashboard from "./components/Admin/HOD/HODDashboard";
import HODRequisitionApproval from "./components/Admin/HOD/HODRequisitionApproval";
import Performancemonitoring from "./components/Admin/HOD/Performancemonitoring";
import PerformanceList from "./components/Admin/HOD/PerformanceList";
import MonitoringCard from "./components/Admin/HOD/MonitoringCard";
import HRPerformanceList from "./components/Admin/HR/HRPerformanceList";
import HRMonitoringCard from "./components/Admin/HR/HRMonitoringCard";
import StaffDashboard from "./components/Admin/Staff/StaffDashboard";
import ExitForm from "./components/Admin/Staff/ExitForm";
import HRExitInterviewCard from "./components/Admin/HR/HRExitInterviewCard";
import HRExitInterviewList from "./components/Admin/HR/HRExitInterviewList";
import HRExitForm from "./components/Admin/HR/HRExitForm";
import HRUserList from "./components/Admin/HR/HRUserList";
import HRUserCard from "./components/Admin/HR/HRUserCard";
import HRClearanceCard from "./components/Admin/HR/HRClearanceCard";
import HRClearanceList from "./components/Admin/HR/HRClearanceList";
import HRClearanceFullCard from "./components/Admin/HR/HRClearanceFullCard";
import HODClearanceList from "./components/Admin/HOD/HODClearanceList";
import HODClearanceCard from "./components/Admin/HOD/HODClearanceCard";
import HODADMINClearanceList from "./components/Admin/HOD/ADMIN/HODADMINClearanceList";
import HODADMINClearanceCard from "./components/Admin/HOD/ADMIN/HODADMINClearanceCard";
import HODICTClearanceList from "./components/Admin/HOD/ICT/HODICTClearanceList";
import HODICTClearanceCard from "./components/Admin/HOD/ICT/HODICTClearanceCard";
import HODHRClearanceList from "./components/Admin/HOD/HR/HODHRClearanceList";
import HODHRClearanceCard from "./components/Admin/HOD/HR/HODHRClearanceCard";
import HROwnClearanceCard from "./components/Admin/HOD/HR/HODOwnClearanceCard"; 
import HODFINClearanceList from "./components/Admin/HOD/FINANCE/HODFINClearanceList";
import HODFINClearanceCard from "./components/Admin/HOD/FINANCE/HODFINClearanceCard";
import HODFINOwnClearanceCard from "./components/Admin/HOD/FINANCE/HODFINOwnClearanceCard";
import NewProbation from "./components/Admin/Staff/NewProbation";
import ProbationList from "./components/Admin/Staff/ProbationList";
import ProbationCard from "./components/Admin/Staff/ProbationCard";
import FDDashboard from "./components/Admin/FD/FDDashboard";
import HRProbationList from "./components/Admin/HR/HRProbationList";
import HRProbationCard from "./components/Admin/HR/HRProbationCard";
import FDProbationList from "./components/Admin/FD/FDProbationList";
import FDProbationCard from "./components/Admin/FD/FDProbationCard";
import MDProbationList from "./components/Admin/MD/MDProbationList";
import MDProbationCard from "./components/Admin/MD/MDProbationCard";
import NewContract from "./components/Admin/Staff/NewContract";
import ContractList from "./components/Admin/Staff/ContractList";
import ContractCard from "./components/Admin/Staff/ContractCard";
// import ContractCard from "./components/Admin/Staff/BucketContractCard";
import HRContractList from "./components/Admin/HR/HRContractList";
import HRContractCard from "./components/Admin/HR/HRContractCard";
import FDContractList from "./components/Admin/FD/FDContractList";
import FDContractCard from "./components/Admin/FD/FDContractCard";
import MDContractList from "./components/Admin/MD/MDContractList";
import MDContractCard from "./components/Admin/MD/MDContractCard";
import NewGrievance from "./components/Admin/GlobalComponents/NewGrievance";
import GrievanceList from "./components/Admin/GlobalComponents/GrievanceList";
import GrievanceCard from "./components/Admin/GlobalComponents/GrievanceCard";
import HRGrievanceList from "./components/Admin/GlobalComponents/HR/HRGrievanceList";
import HRGrievanceCard from "./components/Admin/GlobalComponents/HR/HRGrievanceCard";
import DocumentList from "./components/Admin/GlobalComponents/DocumentList";
import DocumentCard from "./components/Admin/GlobalComponents/DocumentCard";
import LeaveApplicationList from "./components/Admin/GlobalComponents/LeaveApplicationList";
import NewLeaveCard from "./components/Admin/GlobalComponents/NewLeaveCard";
import EditLeaveCard from "./components/Admin/GlobalComponents/EditLeaveCard";
import LeaveApproveeList from "./components/Admin/GlobalComponents/LeaveApproveeList";
import LeaveApproveeCard from "./components/Admin/GlobalComponents/LeaveApproveeCard";
import PayslipCard from "./components/Admin/GlobalComponents/PayslipCard";
import PnineCard from "./components/Admin/GlobalComponents/PnineCard";
import JobKPIs from "./components/Admin/GlobalComponents/JobKPIs";
import JobKPICard from "./components/Admin/GlobalComponents/JobKPICard";
import NewPerformanceActivity from "./components/Admin/GlobalComponents/NewPerformanceActivity";
import NewPerformanceStandard from "./components/Admin/GlobalComponents/NewPerformanceStandard";
import JobAppraisalTargetList from "./components/Admin/GlobalComponents/JobAppraisalTargetList";
import JobAppraisalTargetCard from "./components/Admin/GlobalComponents/JobAppraisalTargetCard";
import EmployeeAppraisalList from "./components/Admin/GlobalComponents/EmployeeAppraisalList";
import EmployeeAppraisalCard from "./components/Admin/GlobalComponents/EmployeeAppraisalCard";
import EditAppraisal from "./components/Admin/GlobalComponents/EditAppraisal";
import SupervisorAppraisalList from "./components/Admin/GlobalComponents/SupervisorAppraisalList";
import SupervisorAppraisalCard from "./components/Admin/GlobalComponents/SupervisorAppraisalCard";
import SupervisorEditAppraisal from "./components/Admin/GlobalComponents/SupervisorEditAppraisal";
import SupervisorModeratedAppraisalList from "./components/Admin/GlobalComponents/SupervisorModeratedAppraisalList";
import SupervisorModerationAppraisalCard from "./components/Admin/GlobalComponents/SupervisorModerationAppraisalCard";
import SupervisorModerateEditAppraisal from "./components/Admin/GlobalComponents/SupervisorModerateEditAppraisal";
import EmployeeModeratedAppraisalList from "./components/Admin/GlobalComponents/EmployeeModeratedAppraisalList";
import EmployeeModerationAppraisalCard from "./components/Admin/GlobalComponents/EmployeeModerationAppraisalCard";
import EmployeeCompleteAppraisalList from "./components/Admin/GlobalComponents/EmployeeCompleteAppraisalList";
import EmployeeCompleteAppraisalCard from "./components/Admin/GlobalComponents/EmployeeCompleteAppraisalCard";
import SupervisorCompleteAppraisalList from "./components/Admin/GlobalComponents/SupervisorCompleteAppraisalList";
import LeaveSupervisee from "./components/Admin/GlobalComponents/LeaveSupervisee";
import LeaveSuperviseeCard from "./components/Admin/GlobalComponents/LeaveSuperviseeCard";
import HRDocumentSettings from "./components/Admin/HR/HRDocumentSettings";
import NewTrainingNeedsCard from "./components/Admin/GlobalComponents/NewTrainingNeedsCard";
import NewTrainingNeedList from "./components/Admin/GlobalComponents/NewTrainingNeedList";
import NewTrainingNeedsUpdateCard from "./components/Admin/GlobalComponents/NewTrainingNeedsUpdateCard";
import NewTrainingNeedsHODCard from "./components/Admin/HOD/NewTrainingNeedsHODCard";
import NewTrainingNeedsUpdateHODCard from "./components/Admin/HOD/NewTrainingNeedsUpdateHODCard";
import HRNewTrainingNeedList from "./components/Admin/HR/HRNewTrainingNeedList";
import HRNewTrainingNeedsCard from "./components/Admin/HR/HRNewTrainingNeedsCard";
import HRNewTrainingNeedsUpdateCard from "./components/Admin/HR/HRNewTrainingNeedsUpdateCard";
import MDNewTrainingNeedsCard from "./components/Admin/MD/MDNewTrainingNeedsCard";
import MDNewTrainingNeedList from "./components/Admin/MD/MDNewTrainingNeedList";
import MDNewTrainingNeedsUpdateCard from "./components/Admin/MD/MDNewTrainingNeedsUpdateCard";
import NewTrainingNeedHODList from "./components/Admin/HOD/NewTrainingNeedHODList";
import InternalJobAdvertList from "./components/Admin/GlobalComponents/InternalJobAdvertList";
import HRHEADProbationList from "./components/Admin/HR/HRHEADProbationList";
import HRHEADContractList from "./components/Admin/HR/HRHEADContractList";
import StaffProfile from "./components/Admin/GlobalComponents/StaffProfile";
import InternalJobAdvertCard from "./components/Admin/GlobalComponents/InternalJobAdvertCard";
import LeaveDashboard from "./components/Admin/GlobalComponents/LeaveDashboard";
import LeaveDashboardPage from "./components/Admin/GlobalComponents/LeaveDashboardPage";
import ImmediateMgrProbationList from "./components/Admin/Staff/ImmediateMgrProbationList";
import ImmediateMgrProbationCard from "./components/Admin/Staff/ImmediateMgrProbationCard";
import ContProbDocumentList from "./components/Admin/GlobalComponents/ContProbDocumentList";
import ContProbDocumentCard from "./components/Admin/GlobalComponents/ContProbDocumentCard";
import ContProbDocumentListHR from "./components/Admin/GlobalComponents/ContProbDocumentListHR";
import ImmediateHODEOC from "./components/Admin/GlobalComponents/ImmediateHODEOC";
import ImmediateHODEOCCard from "./components/Admin/GlobalComponents/ImmediateHODEOCCard";
import ImmediateHODPROBCard from "./components/Admin/GlobalComponents/ImmediateHODPROBCard";
import ImmediateHODPROB from "./components/Admin/GlobalComponents/ImmediateHODPROB";
import BucketContractList from "./components/Admin/Staff/BucketContractList";
import BucketContractListHOD from "./components/Admin/Staff/BucketContractListHOD";
import BucketContractListHEAD from "./components/Admin/Staff/BucketContractListHEAD";
import BucketProbationList from "./components/Admin/Staff/BucketProbationList";
import BucketProbationListHOD from "./components/Admin/Staff/BucketProbationListHOD";
import BucketProbationListHEAD from "./components/Admin/Staff/BucketProbationListHEAD";
import BucketProbationHODCard from "./components/Admin/Staff/BucketProbationHODCard";
import BucketContractCard from "./components/Admin/Staff/BucketContractCard";
import CompetenceList from "./components/Admin/GlobalComponents/CompetenceList";
import CompetenceCard from "./components/Admin/GlobalComponents/CompetenceCard";
import CompetenceLineEdit from "./components/Admin/GlobalComponents/CompetenceLineEdit";
import CompetenceListApprove from "./components/Admin/GlobalComponents/CompetenceListApprove";
import CompetenceCardApprove from "./components/Admin/GlobalComponents/CompetenceCardApprove";
import CompetenceLineEditSuper from "./components/Admin/GlobalComponents/CompetenceLineEditSuper";
import GrievanceApprovalList from "./components/Admin/GlobalComponents/GrievanceApprovalList";
import GrievanceApprovalCard from "./components/Admin/GlobalComponents/GrievanceApprovalCard";
import GrievanceEscalatedList from "./components/Admin/GlobalComponents/GrievanceEscalatedList";
import GrievanceEscalatedCard from "./components/Admin/GlobalComponents/GrievanceEscalatedCard";
import GrievanceAppealList from "./components/Admin/GlobalComponents/GrievanceAppealList";
import GrievanceAppealCard from "./components/Admin/GlobalComponents/GrievanceAppealCard";
import GrievanceCompletedList from "./components/Admin/GlobalComponents/GrievanceCompletedList";
import GrievanceCompletedCard from "./components/Admin/GlobalComponents/GrievanceCompletedCard";
import HRJobseekerList from "./components/Admin/HR/HRJobseekerList";
import EmployeeRequisitionCardModify from "./components/Admin/HOD/EmployeeRequisitionCardModify";
import RequisitionApprovalHead from "./components/Admin/HR/RequisitionApprovalHead";

// import Landing from './pages/Landing'

// //Scroll To Top
// import ScrollToTop from './layouts/ScrollToTop';

const Markup = () => {
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  let pagePath = path.split("-").includes("page");
  const [activeEvent, setActiveEvent] = useState(!path);
  
  //HR
  const routes = [
    /// Dashboard
    // { url: "", component: Home },
    { url: "applicants", component: ViewApplication, usr: "HR" },
    { url: "approved-applicants", component: ApprovedApplications, usr: "HR" },
    { url: "jobsapplied", component: HRAppliedJob, usr: "HR" },
    { url: "HR-dashboard", component: HRHome, usr: "HR" },
    { url: "HR-profile", component: HRProfile,usr:"HR" },
    { url: "requisition-approval", component: RequisitionApproval,usr:"HR" },
    { url: "HR-requisition-card", component:HRRequisionCard ,usr:"HR" },
    { url: "HR-monitoring", component:HRPerformanceList ,usr:"HR" },
    { url: "HR-monitoring-card", component:HRMonitoringCard ,usr:"HR" },
    { url: "HR-exit-interview", component:HRExitInterviewCard ,usr:"HR" },
    { url: "HR-exit-interview-list", component:HRExitInterviewList ,usr:"HR" },
    { url: "exit-interview", component:ExitForm, usr: "HR" },
    { url: "HR-exit-form", component:HRExitForm ,usr:"HR" },
    { url: "HR-users", component:HRUserList ,usr:"HR" },
    { url: "HR-user-card", component:HRUserCard ,usr:"HR" },
    { url: "HR-jobseekers", component:HRJobseekerList ,usr:"HR" },
    { url: "HR-jobseekers-card", component:HRUserCard ,usr:"HR" },
    { url: "HR-document", component:HRDocumentSettings ,usr:"HR" },
    { url: "HR-clearance", component:HRClearanceCard ,usr:"HR" },
    { url: "HR-clearance-list", component:HRClearanceList ,usr:"HR" },
    { url: "HR-clearance-card", component:HRClearanceFullCard ,usr:"HR" },
    { url: "HR-probation", component:HRProbationList ,usr:"HR" },
    { url: "HR-probation-card", component:HRProbationCard ,usr:"HR" },
    { url: "immediate-probation-list", component:ImmediateMgrProbationList, usr: "HR" },
    { url: "immediate-probation-card", component:ImmediateMgrProbationCard, usr: "HR" },

    { url: "HR-contract", component:HRContractList ,usr:"HR" },
    { url: "HR-contract-card", component:HRContractCard ,usr:"HR" },

    { url: "grievance", component:NewGrievance, usr: "HR" },
    { url: "grievance-list", component:HRGrievanceList, usr: "HR" },
    { url: "grievance-card", component:HRGrievanceCard, usr: "HR" },
    { url: "grievance-approval-list", component:GrievanceApprovalList, usr: "HR" },
    { url: "grievance-approval-card", component:GrievanceApprovalCard, usr: "HR" },
    { url: "grievance-escalated-list", component:GrievanceEscalatedList, usr: "HR" },
    { url: "grievance-escalated-card", component:GrievanceEscalatedCard, usr: "HR" },
    { url: "grievance-appeal-list", component:GrievanceAppealList, usr: "HR" },
    { url: "grievance-appeal-card", component:GrievanceAppealCard, usr: "HR" },
    { url: "completed-grievance-list", component:GrievanceCompletedList, usr: "HR" },
    { url: "completed-grievance-card", component:GrievanceCompletedCard, usr: "HR" },

    { url: "document-list", component:DocumentList, usr: "HR" },
    { url: "document-display", component:DocumentCard, usr: "HR" },
    { url: "leave-lists", component:LeaveApplicationList, usr: "HR" },
    { url: "new-leave", component:NewLeaveCard, usr: "HR" },
    { url: "edit-leave", component:EditLeaveCard, usr: "HR" },
    { url: "leave-approval", component:LeaveApproveeList, usr: "HR" },
    { url: "approval-card", component:LeaveApproveeCard, usr: "HR" },
    { url: "supervisees", component:LeaveSupervisee, usr: "HR" },
    { url: "supervisees-card", component:LeaveSuperviseeCard, usr: "HR" },
    { url: "Payslip", component:PayslipCard, usr: "HR" },
    { url: "P-nine", component:PnineCard, usr: "HR" },
    //from 27/06/22- 30/06/22
    { url: "KPIs", component:JobKPIs, usr: "HR" },
    { url: "KPI-card", component:JobKPICard, usr: "HR" },
    { url: "new-activity", component:NewPerformanceActivity, usr: "HR" },
    { url: "new-standard", component:NewPerformanceStandard, usr: "HR" },
    { url: "Appraisals", component:JobAppraisalTargetList, usr: "HR" },
    { url: "appraisal-card", component:JobAppraisalTargetCard, usr: "HR" },
    { url: "employee-appraisal", component:EmployeeAppraisalList, usr: "HR" },
    { url: "view-employee-appraisal", component:EmployeeAppraisalCard, usr: "HR" },
    { url: "edit-appraisal", component:EditAppraisal, usr: "HR" },
    { url: "supervisor-appraisal", component:SupervisorAppraisalList, usr: "HR" },
    { url: "view-supervisor-appraisal", component:SupervisorAppraisalCard, usr: "HR" },
    { url: "edit-supervisor-appraisal", component:SupervisorEditAppraisal, usr: "HR" },
    { url: "supervisor-moderation", component:SupervisorModeratedAppraisalList, usr: "HR" },
    { url: "view-supervisor-moderation", component:SupervisorModerationAppraisalCard, usr: "HR" },
    { url: "edit-supervisor-moderated", component:SupervisorModerateEditAppraisal, usr: "HR" },
    { url: "employee-moderation", component:EmployeeModeratedAppraisalList, usr: "HR" },
    { url: "view-employee-moderation", component:EmployeeModerationAppraisalCard, usr: "HR" },
    { url: "employee-complete", component:EmployeeCompleteAppraisalList, usr: "HR" },
    { url: "supervisor-complete", component:SupervisorCompleteAppraisalList, usr: "HR" },
    { url: "view-completed", component:EmployeeCompleteAppraisalCard, usr: "HR" },
    // { url: "ViewSupCompleted", component:EmployeeCompleteAppraisalCard, usr: "HR" },
    
    //from 26/08/22
    { url: "new-need", component:HRNewTrainingNeedsCard, usr: "HR" },
    { url: "need-list", component:HRNewTrainingNeedList, usr: "HR" },
    { url: "update-need", component:HRNewTrainingNeedsUpdateCard, usr: "HR" },

    // from 11/10/22
    {url:"job-vacancy",component:InternalJobAdvertList,usr:"HR"},
    {url:"vacancy-card",component:InternalJobAdvertCard,usr:"HR"},
    {url:"profile",component:StaffProfile,usr:"HR"},
    {url:"leave-dashboard",component:LeaveDashboard,usr:"HR"},
    {url:"dashboard-list",component:LeaveDashboardPage,usr:"HR"},
    //02/02/23
    { url: "HR-probation-contract", component:ContProbDocumentListHR, usr: "HR" },
    { url: "contractprobation-list", component:ContProbDocumentList, usr: "HR" },
    { url: "contract-probation-display", component:ContProbDocumentCard, usr: "HR" },
    { url: "Contract", component:NewContract, usr: "HR" },
    { url: "contract-list", component:ContractList, usr: "HR" },
    { url: "contract-card", component:ContractCard, usr: "HR" },
    { url: "bucketed-contracts", component:BucketContractList, usr: "HR" },
    { url: "bucket-contract-card", component:BucketContractCard, usr: "HR" },

    { url: "new-probation", component:NewProbation, usr: "HR" },
    { url: "probation-list", component:ProbationList, usr: "HR" },
    { url: "probation-card", component:ProbationCard, usr: "HR" },
    { url: "bucketed-probations", component:BucketProbationList, usr: "HR" },
    { url: "bucket-probation-card", component:BucketProbationHODCard, usr: "HR" },
    //from 11/05/23
    { url: "competency-list", component:CompetenceList, usr: "HR" },
    { url: "competency-card", component:CompetenceCard, usr: "HR" },
    { url: "edit-competence-line", component:CompetenceLineEdit, usr: "HR" },

    { url: "approve-competency", component:CompetenceListApprove, usr: "HR" },
    { url: "approve-competency-card", component:CompetenceCardApprove, usr: "HR" },
    { url: "edit-competence-line-super", component:CompetenceLineEditSuper, usr: "HR" },
  ];

  //HEAD-HR
  const routes12 = [
    /// Dashboard
    // { url: "", component: Home },
    { url: "applicants", component: ViewApplication, usr: "HEAD-HR" },
    { url: "approved-applicants", component: ApprovedApplications, usr: "HEAD-HR" },
    { url: "jobsapplied", component: HRAppliedJob, usr: "HEAD-HR" },
    { url: "HR-dashboard", component: HRHome, usr: "HEAD-HR" },
    { url: "HR-profile", component: HRProfile,usr:"HEAD-HR" },
    { url: "requisition-approval", component: RequisitionApprovalHead,usr:"HEAD-HR" },
    { url: "HR-requisition-card", component:HRRequisionCard ,usr:"HEAD-HR" },
    { url: "HR-monitoring", component:HRPerformanceList ,usr:"HEAD-HR" },
    { url: "HR-monitoring-card", component:HRMonitoringCard ,usr:"HEAD-HR" },
    { url: "HR-exit-interview", component:HRExitInterviewCard ,usr:"HEAD-HR" },
    { url: "HR-exit-interview-list", component:HRExitInterviewList ,usr:"HEAD-HR" },
    { url: "exit-interview", component:ExitForm, usr: "HEAD-HR" },
    { url: "HR-exit-form", component:HRExitForm ,usr:"HEAD-HR" },
    { url: "HR-users", component:HRUserList ,usr:"HEAD-HR" },
    { url: "HR-user-card", component:HRUserCard ,usr:"HEAD-HR" },
    { url: "HR-document", component:HRDocumentSettings ,usr:"HEAD-HR" },
    { url: "HR-clearance", component:HRClearanceCard ,usr:"HEAD-HR" },
    { url: "HR-clearance-list", component:HRClearanceList ,usr:"HEAD-HR" },
    { url: "HR-clearance-card", component:HRClearanceFullCard ,usr:"HEAD-HR" },
    { url: "HR-probation", component:HRHEADProbationList ,usr:"HEAD-HR" },
    { url: "HR-probation-card", component:HRProbationCard ,usr:"HEAD-HR" },
    { url: "immediate-probation-list", component:ImmediateMgrProbationList, usr: "HEAD-HR" },
    { url: "immediate-probation-card", component:ImmediateMgrProbationCard, usr: "HEAD-HR" },


    { url: "HR-contract", component:HRHEADContractList ,usr:"HEAD-HR" },
    { url: "HR-contract-card", component:HRContractCard ,usr:"HEAD-HR" },

    { url: "grievance", component:NewGrievance, usr: "HEAD-HR" },
    { url: "grievance-list", component:HRGrievanceList, usr: "HEAD-HR" },
    { url: "grievance-card", component:HRGrievanceCard, usr: "HEAD-HR" },
    { url: "grievance-approval-list", component:GrievanceApprovalList, usr: "HEAD-HR" },
    { url: "grievance-approval-card", component:GrievanceApprovalCard, usr: "HEAD-HR" },
    { url: "grievance-escalated-list", component:GrievanceEscalatedList, usr: "HEAD-HR" },
    { url: "grievance-escalated-card", component:GrievanceEscalatedCard, usr: "HEAD-HR" },
    { url: "grievance-appeal-list", component:GrievanceAppealList, usr: "HEAD-HR" },
    { url: "grievance-appeal-card", component:GrievanceAppealCard, usr: "HEAD-HR" },
    { url: "completed-grievance-list", component:GrievanceCompletedList, usr: "HEAD-HR" },
    { url: "completed-grievance-card", component:GrievanceCompletedCard, usr: "HEAD-HR" },

    { url: "document-list", component:DocumentList, usr: "HEAD-HR" },
    { url: "document-display", component:DocumentCard, usr: "HEAD-HR" },
    { url: "leave-lists", component:LeaveApplicationList, usr: "HEAD-HR" },
    { url: "new-leave", component:NewLeaveCard, usr: "HEAD-HR" },
    { url: "edit-leave", component:EditLeaveCard, usr: "HEAD-HR" },
    { url: "leave-approval", component:LeaveApproveeList, usr: "HEAD-HR" },
    { url: "approval-card", component:LeaveApproveeCard, usr: "HEAD-HR" },
    { url: "supervisees", component:LeaveSupervisee, usr: "HEAD-HR" },
    { url: "supervisees-card", component:LeaveSuperviseeCard, usr: "HEAD-HR" },
    { url: "Payslip", component:PayslipCard, usr: "HEAD-HR" },
    { url: "P-nine", component:PnineCard, usr: "HEAD-HR" },
    //from 27/06/22- 30/06/22
    { url: "KPIs", component:JobKPIs, usr: "HEAD-HR" },
    { url: "KPI-card", component:JobKPICard, usr: "HEAD-HR" },
    { url: "new-activity", component:NewPerformanceActivity, usr: "HEAD-HR" },
    { url: "new-standard", component:NewPerformanceStandard, usr: "HEAD-HR" },
    { url: "Appraisals", component:JobAppraisalTargetList, usr: "HEAD-HR" },
    { url: "appraisal-card", component:JobAppraisalTargetCard, usr: "HEAD-HR" },
    { url: "employee-appraisal", component:EmployeeAppraisalList, usr: "HEAD-HR" },
    { url: "view-employee-appraisal", component:EmployeeAppraisalCard, usr: "HEAD-HR" },
    { url: "edit-appraisal", component:EditAppraisal, usr: "HEAD-HR" },
    { url: "supervisor-appraisal", component:SupervisorAppraisalList, usr: "HEAD-HR" },
    { url: "view-supervisor-appraisal", component:SupervisorAppraisalCard, usr: "HEAD-HR" },
    { url: "edit-supervisor-appraisal", component:SupervisorEditAppraisal, usr: "HEAD-HR" },
    { url: "supervisor-moderation", component:SupervisorModeratedAppraisalList, usr: "HEAD-HR" },
    { url: "view-supervisor-moderation", component:SupervisorModerationAppraisalCard, usr: "HEAD-HR" },
    { url: "edit-supervisor-moderated", component:SupervisorModerateEditAppraisal, usr: "HEAD-HR" },
    { url: "employee-moderation", component:EmployeeModeratedAppraisalList, usr: "HEAD-HR" },
    { url: "view-employee-moderation", component:EmployeeModerationAppraisalCard, usr: "HEAD-HR" },
    { url: "employee-complete", component:EmployeeCompleteAppraisalList, usr: "HEAD-HR" },
    { url: "supervisor-complete", component:SupervisorCompleteAppraisalList, usr: "HEAD-HR" },
    { url: "view-completed", component:EmployeeCompleteAppraisalCard, usr: "HEAD-HR" },
    // { url: "ViewSupCompleted", component:EmployeeCompleteAppraisalCard, usr: "HEAD-HR" },
    
    //from 26/08/22
    { url: "new-need", component:HRNewTrainingNeedsCard, usr: "HEAD-HR" },
    { url: "need-list", component:HRNewTrainingNeedList, usr: "HEAD-HR" },
    { url: "update-need", component:HRNewTrainingNeedsUpdateCard, usr: "HEAD-HR" },

    // from 11/10/22
    {url:"job-vacancy",component:InternalJobAdvertList,usr:"HEAD-HR"},
    {url:"vacancy-card",component:InternalJobAdvertCard,usr:"HEAD-HR"},
    {url:"profile",component:StaffProfile,usr:"HEAD-HR"},
    {url:"leave-dashboard",component:LeaveDashboard,usr:"HEAD-HR"},
    {url:"dashboard-list",component:LeaveDashboardPage,usr:"HEAD-HR"},

    //02/02/23
    { url: "HR-probation-contract", component:ContProbDocumentListHR, usr: "HEAD-HR" },
    { url: "contractprobation-list", component:ContProbDocumentList, usr: "HEAD-HR" },
    { url: "contract-probation-display", component:ContProbDocumentCard, usr: "HEAD-HR" },
    //21/02/23
    { url: "Contract", component:NewContract, usr: "HEAD-HR" },
    { url: "contract-list", component:ContractList, usr: "HEAD-HR" },
    { url: "contract-card", component:ContractCard, usr: "HEAD-HR" },
    { url: "new-probation", component:NewProbation, usr: "HEAD-HR" },
    { url: "probation-list", component:ProbationList, usr: "HEAD-HR" },
    { url: "probation-card", component:ProbationCard, usr: "HEAD-HR" },

    { url: "bucketed-contracts-head", component:BucketContractListHEAD, usr: "HEAD-HR" },
    { url: "bucket-contract-card", component:BucketContractCard, usr: "HEAD-HR" },
    { url: "bucketed-probations-head", component:BucketProbationListHEAD, usr: "HEAD-HR" },
    { url: "bucket-probation-card", component:BucketProbationHODCard, usr: "HEAD-HR" },

    //from 11/05/23
    { url: "competency-list", component:CompetenceList, usr: "HEAD-HR" },
    { url: "competency-card", component:CompetenceCard, usr: "HEAD-HR" },
    { url: "edit-competence-line", component:CompetenceLineEdit, usr: "HEAD-HR" },

    { url: "approve-competency", component:CompetenceListApprove, usr: "HEAD-HR" },
    { url: "approve-competency-card", component:CompetenceCardApprove, usr: "HEAD-HR" },
    { url: "edit-competence-line-super", component:CompetenceLineEditSuper, usr: "HEAD-HR" },

    { url: "HR-jobseekers", component:HRJobseekerList ,usr:"HEAD-HR" },
    { url: "HR-jobseekers-card", component:HRUserCard ,usr:"HEAD-HR" },
  ];
  //Job Seeker
  const routes2=[
    { url: "dashboard", component: Home,usr:"" },
    { url: "posted-job", component: SearchTable,usr:"" },
    { url: "applied-job", component: AppliedJob,usr:""},
    { url: "profile", component: Profile,usr:"" },
    { url: "jobdata", component: Jobdata,usr:"" },
  ]
  //HOD
  const routes3 = [
    /// Dashboard
    { url: "HOD-dashboard", component:HODDashboard, usr: "HOD" },
    { url: "employee-requisition", component: EmployeeRequision,usr:"HOD" },
    { url: "employee-requisition-card", component: EmployeeRequisitionCard,usr:"HOD" },
    { url: "employee-requisition-modify", component: EmployeeRequisitionCardModify,usr:"HOD" },
    { url: "HOD-requisition-list", component: HODRequisitionApproval,usr:"HOD" },
    { url: "Monitoring", component: Performancemonitoring,usr:"HOD" },
    { url: "monitoring-list", component: PerformanceList,usr:"HOD" },
    { url: "monitoring-card", component: MonitoringCard,usr:"HOD" },
    { url: "clearance-list", component:HODClearanceList ,usr:"HOD" },
    { url: "clearance-card", component:HODClearanceCard ,usr:"HOD" },

    { url: "new-probation", component:NewProbation, usr: "HOD" },
    { url: "probation-list", component:ProbationList, usr: "HOD" },
    { url: "probation-card", component:ProbationCard, usr: "HOD" },
    { url: "immediate-probation-list", component:ImmediateMgrProbationList, usr: "HOD" },
    { url: "immediate-probation-card", component:ImmediateMgrProbationCard, usr: "HOD" },

    { url: "exit-interview", component:ExitForm, usr: "HOD" },
    { url: "Contract", component:NewContract, usr: "HOD" },
    { url: "contract-list", component:ContractList, usr: "HOD" },
    { url: "contract-card", component:ContractCard, usr: "HOD" },

    { url: "grievance", component:NewGrievance, usr: "HOD" },
    { url: "grievance-list", component:HRGrievanceList, usr: "HOD" },
    { url: "grievance-card", component:HRGrievanceCard, usr: "HOD" },
    { url: "grievance-approval-list", component:GrievanceApprovalList, usr: "HOD" },
    { url: "grievance-approval-card", component:GrievanceApprovalCard, usr: "HOD" },
    { url: "grievance-escalated-list", component:GrievanceEscalatedList, usr: "HOD" },
    { url: "grievance-escalated-card", component:GrievanceEscalatedCard, usr: "HOD" },
    { url: "grievance-appeal-list", component:GrievanceAppealList, usr: "HOD" },
    { url: "grievance-appeal-card", component:GrievanceAppealCard, usr: "HOD" },
    { url: "completed-grievance-list", component:GrievanceCompletedList, usr: "HOD" },
    { url: "completed-grievance-card", component:GrievanceCompletedCard, usr: "HOD" },

    { url: "document-list", component:DocumentList, usr: "HOD" },
    { url: "document-display", component:DocumentCard, usr: "HOD" },
    { url: "leave-lists", component:LeaveApplicationList, usr: "HOD" },
    { url: "new-leave", component:NewLeaveCard, usr: "HOD" },
    { url: "edit-leave", component:EditLeaveCard, usr: "HOD" },
    { url: "leave-approval", component:LeaveApproveeList, usr: "HOD" },
    { url: "approval-card", component:LeaveApproveeCard, usr: "HOD" },
    { url: "supervisees", component:LeaveSupervisee, usr: "HOD" },
    { url: "supervisees-card", component:LeaveSuperviseeCard, usr: "HOD" },
    { url: "Payslip", component:PayslipCard, usr: "HOD" },
    { url: "P-nine", component:PnineCard, usr: "HOD" },

    
          //from 27/06/22- 30/06/22
    { url: "KPIs", component:JobKPIs, usr: "HOD" },
    { url: "KPI-card", component:JobKPICard, usr: "HOD" },
    { url: "new-activity", component:NewPerformanceActivity, usr: "HOD" },
    { url: "new-standard", component:NewPerformanceStandard, usr: "HOD" },
    { url: "Appraisals", component:JobAppraisalTargetList, usr: "HOD" },
    { url: "appraisal-card", component:JobAppraisalTargetCard, usr: "HOD" },
    { url: "employee-appraisal", component:EmployeeAppraisalList, usr: "HOD" },
    { url: "view-employee-appraisal", component:EmployeeAppraisalCard, usr: "HOD" },
    { url: "edit-appraisal", component:EditAppraisal, usr: "HOD" },
    { url: "supervisor-appraisal", component:SupervisorAppraisalList, usr: "HOD" },
    { url: "view-supervisor-appraisal", component:SupervisorAppraisalCard, usr: "HOD" },
    { url: "edit-supervisor-appraisal", component:SupervisorEditAppraisal, usr: "HOD" },
    { url: "supervisor-moderation", component:SupervisorModeratedAppraisalList, usr: "HOD" },
    { url: "view-supervisor-moderation", component:SupervisorModerationAppraisalCard, usr: "HOD" },
    { url: "edit-supervisor-moderated", component:SupervisorModerateEditAppraisal, usr: "HOD" },
    { url: "employee-moderation", component:EmployeeModeratedAppraisalList, usr: "HOD" },
    { url: "view-employee-moderation", component:EmployeeModerationAppraisalCard, usr: "HOD" },
    { url: "employee-complete", component:EmployeeCompleteAppraisalList, usr: "HOD" },
    { url: "view-completed", component:EmployeeCompleteAppraisalCard, usr: "HOD" },
    { url: "supervisor-complete", component:SupervisorCompleteAppraisalList, usr: "HOD" },

    //from 26/08/22
    { url: "new-need", component:NewTrainingNeedsHODCard, usr: "HOD" },
    { url: "need-list", component:NewTrainingNeedHODList, usr: "HOD" },
    { url: "update-need", component:NewTrainingNeedsUpdateHODCard, usr: "HOD" },
    { url:"profile",component:StaffProfile,usr:"HOD"},
    {url:"job-vacancy",component:InternalJobAdvertList,usr:"HOD"},
    {url:"vacancy-card",component:InternalJobAdvertCard,usr:"HOD"},

    { url: "contractprobation-list", component:ContProbDocumentList, usr: "HOD" },
    { url: "contract-probation-display", component:ContProbDocumentCard, usr: "HOD" },

    { url: "contract-approval-hod", component:ImmediateHODEOC, usr: "HOD" },
    { url: "contract-approval-card-hod", component:ImmediateHODEOCCard, usr: "HOD" },
    { url: "probation-approval-hod", component:ImmediateHODPROB, usr: "HOD" },
    { url: "probation-approval-card-hod", component:ImmediateHODPROBCard, usr: "HOD" },
    
    { url: "bucketed-contracts", component:BucketContractListHOD, usr: "HOD" },
    { url: "bucket-contract-card", component:BucketContractCard, usr: "HOD" },
    { url: "bucketed-probations", component:BucketProbationListHOD, usr: "HOD" },
    { url: "bucket-probation-card", component:BucketProbationHODCard, usr: "HOD" },

    //10/05/2023
    { url: "competency-list", component:CompetenceList, usr: "HOD" },
    { url: "competency-card", component:CompetenceCard, usr: "HOD" },
    { url: "edit-competence-line", component:CompetenceLineEdit, usr: "HOD" },

    { url: "approve-competency", component:CompetenceListApprove, usr: "HOD" },
    { url: "approve-competency-card", component:CompetenceCardApprove, usr: "HOD" },
    { url: "edit-competence-line-super", component:CompetenceLineEditSuper, usr: "HOD" },

  ];
  //HOD-ADMIN
  const routes6 = [
    /// Dashboard
    { url: "HOD-dashboard", component:HODDashboard, usr: "HOD-ADMIN" },
    { url: "employee-requisition", component: EmployeeRequision,usr:"HOD-ADMIN" },
    { url: "employee-requisition-card", component: EmployeeRequisitionCard,usr:"HOD-ADMIN" },
    { url: "employee-requisition-modify", component: EmployeeRequisitionCardModify,usr:"HOD-ADMIN" },
    { url: "HOD-requisition-list", component: HODRequisitionApproval,usr:"HOD-ADMIN" },
    { url: "Monitoring", component: Performancemonitoring,usr:"HOD-ADMIN" },
    { url: "monitoring-list", component: PerformanceList,usr:"HOD-ADMIN" },
    { url: "monitoring-card", component: MonitoringCard,usr:"HOD-ADMIN" },
    { url: "ADMIN-clearance-list", component:HODADMINClearanceList ,usr:"HOD-ADMIN" },
    { url: "ADMIN-clearance-card", component:HODADMINClearanceCard ,usr:"HOD-ADMIN" },


    { url: "new-probation", component:NewProbation, usr: "HOD-ADMIN" },
    { url: "probation-list", component:ProbationList, usr: "HOD-ADMIN" },
    { url: "probation-card", component:ProbationCard, usr: "HOD-ADMIN" },
    { url: "immediate-probation-list", component:ImmediateMgrProbationList, usr: "HOD-ADMIN" },
    { url: "immediate-probation-card", component:ImmediateMgrProbationCard, usr: "HOD-ADMIN" },

    { url: "exit-interview", component:ExitForm, usr: "HOD-ADMIN" },
    { url: "Contract", component:NewContract, usr: "HOD-ADMIN" },
    { url: "contract-list", component:ContractList, usr: "HOD-ADMIN" },
    { url: "contract-card", component:ContractCard, usr: "HOD-ADMIN" },

    { url: "grievance", component:NewGrievance, usr: "HOD-ADMIN" },
    { url: "grievance-list", component:HRGrievanceList, usr: "HOD-ADMIN" },
    { url: "grievance-card", component:HRGrievanceCard, usr: "HOD-ADMIN" },
    { url: "grievance-approval-list", component:GrievanceApprovalList, usr: "HOD-ADMIN" },
    { url: "grievance-approval-card", component:GrievanceApprovalCard, usr: "HOD-ADMIN" },
    { url: "grievance-escalated-list", component:GrievanceEscalatedList, usr: "HOD-ADMIN" },
    { url: "grievance-escalated-card", component:GrievanceEscalatedCard, usr: "HOD-ADMIN" },
    { url: "grievance-appeal-list", component:GrievanceAppealList, usr: "HOD-ADMIN" },
    { url: "grievance-appeal-card", component:GrievanceAppealCard, usr: "HOD-ADMIN" },
    { url: "completed-grievance-list", component:GrievanceCompletedList, usr: "HOD-ADMIN" },
    { url: "completed-grievance-card", component:GrievanceCompletedCard, usr: "HOD-ADMIN" },

    { url: "document-list", component:DocumentList, usr: "HOD-ADMIN" },
    { url: "document-display", component:DocumentCard, usr: "HOD-ADMIN" },
    { url: "leave-lists", component:LeaveApplicationList, usr: "HOD-ADMIN" },
    { url: "new-leave", component:NewLeaveCard, usr: "HOD-ADMIN" },
    { url: "edit-leave", component:EditLeaveCard, usr: "HOD-ADMIN" },
    { url: "leave-approval", component:LeaveApproveeList, usr: "HOD-ADMIN" },
    { url: "supervisees-card", component:LeaveSuperviseeCard, usr: "HOD-ADMIN" },
    { url: "approval-card", component:LeaveApproveeCard, usr: "HOD-ADMIN" },
    { url: "supervisees", component:LeaveSupervisee, usr: "HOD-ADMIN" },
    { url: "Payslip", component:PayslipCard, usr: "HOD-ADMIN" },
    { url: "P-nine", component:PnineCard, usr: "HOD-ADMIN" },

    
          //from 27/06/22- 30/06/22
    { url: "KPIs", component:JobKPIs, usr: "HOD-ADMIN" },
    { url: "KPI-card", component:JobKPICard, usr: "HOD-ADMIN" },
    { url: "new-activity", component:NewPerformanceActivity, usr: "HOD-ADMIN" },
    { url: "new-standard", component:NewPerformanceStandard, usr: "HOD-ADMIN" },
    { url: "Appraisals", component:JobAppraisalTargetList, usr: "HOD-ADMIN" },
    { url: "appraisal-card", component:JobAppraisalTargetCard, usr: "HOD-ADMIN" },
    { url: "employee-appraisal", component:EmployeeAppraisalList, usr: "HOD-ADMIN" },
    { url: "view-employee-appraisal", component:EmployeeAppraisalCard, usr: "HOD-ADMIN" },
    { url: "edit-appraisal", component:EditAppraisal, usr: "HOD-ADMIN" },
    { url: "supervisor-appraisal", component:SupervisorAppraisalList, usr: "HOD-ADMIN" },
    { url: "view-supervisor-appraisal", component:SupervisorAppraisalCard, usr: "HOD-ADMIN" },
    { url: "edit-supervisor-appraisal", component:SupervisorEditAppraisal, usr: "HOD-ADMIN" },
    { url: "supervisor-moderation", component:SupervisorModeratedAppraisalList, usr: "HOD-ADMIN" },
    { url: "view-supervisor-moderation", component:SupervisorModerationAppraisalCard, usr: "HOD-ADMIN" },
    { url: "edit-supervisor-moderated", component:SupervisorModerateEditAppraisal, usr: "HOD-ADMIN" },
    { url: "employee-moderation", component:EmployeeModeratedAppraisalList, usr: "HOD-ADMIN" },
    { url: "view-employee-moderation", component:EmployeeModerationAppraisalCard, usr: "HOD-ADMIN" },
    { url: "employee-complete", component:EmployeeCompleteAppraisalList, usr: "HOD-ADMIN" },
    { url: "view-completed", component:EmployeeCompleteAppraisalCard, usr: "HOD-ADMIN" },
    { url: "supervisor-complete", component:SupervisorCompleteAppraisalList, usr: "HOD-ADMIN" },

    //from 26/08/22
    { url: "new-need", component:NewTrainingNeedsHODCard, usr: "HOD-ADMIN" },
    { url: "need-list", component:NewTrainingNeedHODList, usr: "HOD-ADMIN" },
    { url: "update-need", component:NewTrainingNeedsUpdateHODCard, usr: "HOD-ADMIN" },
    {url:"profile",component:StaffProfile,usr:"HOD-ADMIN"},
    {url:"job-vacancy",component:InternalJobAdvertList,usr:"HOD-ADMIN"},
    {url:"vacancy-card",component:InternalJobAdvertCard,usr:"HOD-ADMIN"},

    //from 01/02/23
    { url: "contractprobation-list", component:ContProbDocumentList, usr: "HOD-ADMIN" },
    { url: "contract-probation-display", component:ContProbDocumentCard, usr: "HOD-ADMIN" },

    { url: "contract-approval-hod", component:ImmediateHODEOC, usr: "HOD-ADMIN" },
    { url: "contract-approval-card-hod", component:ImmediateHODEOCCard, usr: "HOD-ADMIN" },
    { url: "probation-approval-hod", component:ImmediateHODPROB, usr: "HOD-ADMIN" },
    { url: "probation-approval-card-hod", component:ImmediateHODPROBCard, usr: "HOD-ADMIN" },

    { url: "bucketed-contracts", component:BucketContractListHOD, usr: "HOD-ADMIN" },
    { url: "bucketed-probations", component:BucketProbationListHOD, usr: "HOD-ADMIN" },
    { url: "bucket-contract-card", component:BucketContractCard, usr: "HOD-ADMIN" },
    { url: "bucket-probation-card", component:BucketProbationHODCard, usr: "HOD-ADMIN" },
    //10/05/2023
    { url: "competency-list", component:CompetenceList, usr: "HOD-ADMIN" },
    { url: "competency-card", component:CompetenceCard, usr: "HOD-ADMIN" },
    { url: "edit-competence-line", component:CompetenceLineEdit, usr: "HOD-ADMIN" },

    { url: "approve-competency", component:CompetenceListApprove, usr: "HOD-ADMIN" },
    { url: "approve-competency-card", component:CompetenceCardApprove, usr: "HOD-ADMIN" },
    { url: "edit-competence-line-super", component:CompetenceLineEditSuper, usr: "HOD-ADMIN" },
  ];
  //HOD-ICT
  const routes7 = [
    /// Dashboard
    { url: "HOD-dashboard", component:HODDashboard, usr: "HOD-ICT" },
    { url: "employee-requisition", component: EmployeeRequision,usr:"HOD-ICT" },
    { url: "employee-requisition-card", component: EmployeeRequisitionCard,usr:"HOD-ICT" },
    { url: "employee-requisition-modify", component: EmployeeRequisitionCardModify,usr:"HOD-ICT" },
    { url: "HOD-requisition-list", component: HODRequisitionApproval,usr:"HOD-ICT" },
    { url: "Monitoring", component: Performancemonitoring,usr:"HOD-ICT" },
    { url: "monitoring-list", component: PerformanceList,usr:"HOD-ICT" },
    { url: "monitoring-card", component: MonitoringCard,usr:"HOD-ICT" },
    { url: "ICT-clearance-list", component:HODICTClearanceList ,usr:"HOD-ICT" },
    { url: "ICT-clearance-card", component:HODICTClearanceCard,usr:"HOD-ICT" },

    { url: "new-probation", component:NewProbation, usr: "HOD-ICT" },
    { url: "probation-list", component:ProbationList, usr: "HOD-ICT" },
    { url: "probation-card", component:ProbationCard, usr: "HOD-ICT" },
    { url: "immediate-probation-list", component:ImmediateMgrProbationList, usr: "HOD-ICT" },
    { url: "immediate-probation-card", component:ImmediateMgrProbationCard, usr: "HOD-ICT" },

    { url: "exit-interview", component:ExitForm, usr: "HOD-ICT" },
    { url: "Contract", component:NewContract, usr: "HOD-ICT" },
    { url: "contract-list", component:ContractList, usr: "HOD-ICT" },
    { url: "contract-card", component:ContractCard, usr: "HOD-ICT" },

    { url: "grievance", component:NewGrievance, usr: "HOD-ICT" },
    { url: "grievance-list", component:HRGrievanceList, usr: "HOD-ICT" },
    { url: "grievance-card", component:HRGrievanceCard, usr: "HOD-ICT" },
    { url: "grievance-approval-list", component:GrievanceApprovalList, usr: "HOD-ICT" },
    { url: "grievance-approval-card", component:GrievanceApprovalCard, usr: "HOD-ICT" },
    { url: "grievance-escalated-list", component:GrievanceEscalatedList, usr: "HOD-ICT" },
    { url: "grievance-escalated-card", component:GrievanceEscalatedCard, usr: "HOD-ICT" },
    { url: "grievance-appeal-list", component:GrievanceAppealList, usr: "HOD-ICT" },
    { url: "grievance-appeal-card", component:GrievanceAppealCard, usr: "HOD-ICT" },
    { url: "completed-grievance-list", component:GrievanceCompletedList, usr: "HOD-ICT" },
    { url: "completed-grievance-card", component:GrievanceCompletedCard, usr: "HOD-ICT" },

    { url: "document-list", component:DocumentList, usr: "HOD-ICT" },
    { url: "document-display", component:DocumentCard, usr: "HOD-ICT" },
    { url: "leave-lists", component:LeaveApplicationList, usr: "HOD-ICT" },
    { url: "new-leave", component:NewLeaveCard, usr: "HOD-ICT" },
    { url: "edit-leave", component:EditLeaveCard, usr: "HOD-ICT" },
    { url: "leave-approval", component:LeaveApproveeList, usr: "HOD-ICT" },
    { url: "supervisees-card", component:LeaveSuperviseeCard, usr: "HOD-ICT" },
    { url: "approval-card", component:LeaveApproveeCard, usr: "HOD-ICT" },
    { url: "supervisees", component:LeaveSupervisee, usr: "HOD-ICT" },
    { url: "Payslip", component:PayslipCard, usr: "HOD-ICT" },
    { url: "P-nine", component:PnineCard, usr: "HOD-ICT" },

    
          //from 27/06/22- 30/06/22
    { url: "KPIs", component:JobKPIs, usr: "HOD-ICT" },
    { url: "KPI-card", component:JobKPICard, usr: "HOD-ICT" },
    { url: "new-activity", component:NewPerformanceActivity, usr: "HOD-ICT" },
    { url: "new-standard", component:NewPerformanceStandard, usr: "HOD-ICT" },
    { url: "Appraisals", component:JobAppraisalTargetList, usr: "HOD-ICT" },
    { url: "appraisal-card", component:JobAppraisalTargetCard, usr: "HOD-ICT" },
    { url: "employee-appraisal", component:EmployeeAppraisalList, usr: "HOD-ICT" },
    { url: "view-employee-appraisal", component:EmployeeAppraisalCard, usr: "HOD-ICT" },
    { url: "edit-appraisal", component:EditAppraisal, usr: "HOD-ICT" },
    { url: "supervisor-appraisal", component:SupervisorAppraisalList, usr: "HOD-ICT" },
    { url: "view-supervisor-appraisal", component:SupervisorAppraisalCard, usr: "HOD-ICT" },
    { url: "edit-supervisor-appraisal", component:SupervisorEditAppraisal, usr: "HOD-ICT" },
    { url: "supervisor-moderation", component:SupervisorModeratedAppraisalList, usr: "HOD-ICT" },
    { url: "view-supervisor-moderation", component:SupervisorModerationAppraisalCard, usr: "HOD-ICT" },
    { url: "edit-supervisor-moderated", component:SupervisorModerateEditAppraisal, usr: "HOD-ICT" },
    { url: "employee-moderation", component:EmployeeModeratedAppraisalList, usr: "HOD-ICT" },
    { url: "view-employee-moderation", component:EmployeeModerationAppraisalCard, usr: "HOD-ICT" },
    { url: "employee-complete", component:EmployeeCompleteAppraisalList, usr: "HOD-ICT" },
    { url: "view-completed", component:EmployeeCompleteAppraisalCard, usr: "HOD-ICT" },
    { url: "supervisor-complete", component:SupervisorCompleteAppraisalList, usr: "HOD-ICT" },

     //from 26/08/22
     { url: "new-need", component:NewTrainingNeedsHODCard, usr: "HOD-ICT" },
     { url: "need-list", component:NewTrainingNeedHODList, usr: "HOD-ICT" },
     { url: "update-need", component:NewTrainingNeedsUpdateHODCard, usr: "HOD-ICT" },
     { url:"profile",component:StaffProfile,usr:"HOD-ICT"},
     { url:"job-vacancy",component:InternalJobAdvertList,usr:"HOD-ICT"},
     { url:"vacancy-card",component:InternalJobAdvertCard,usr:"HOD-ICT"},

         //from 01/02/23
    { url: "contractprobation-list", component:ContProbDocumentList, usr: "HOD-ICT" },
    { url: "contract-probation-display", component:ContProbDocumentCard, usr: "HOD-ICT" },

    { url: "contract-approval-hod", component:ImmediateHODEOC, usr: "HOD-ICT" },
    { url: "contract-approval-card-hod", component:ImmediateHODEOCCard, usr: "HOD-ICT" },
    { url: "probation-approval-hod", component:ImmediateHODPROB, usr: "HOD-ICT" },
    { url: "probation-approval-card-hod", component:ImmediateHODPROBCard, usr: "HOD-ICT" },

    { url: "bucketed-contracts", component:BucketContractListHOD, usr: "HOD-ICT" },
    { url: "bucketed-probations", component:BucketProbationListHOD, usr: "HOD-ICT" },
    { url: "bucket-contract-card", component:BucketContractCard, usr: "HOD-ICT" },
    { url: "bucket-probation-card", component:BucketProbationHODCard, usr: "HOD-ICT" },

    //10/05/2023
    { url: "competency-list", component:CompetenceList, usr: "HOD-ICT" },
    { url: "competency-card", component:CompetenceCard, usr: "HOD-ICT" },
    { url: "edit-competence-line", component:CompetenceLineEdit, usr: "HOD-ICT" },

    { url: "approve-competency", component:CompetenceListApprove, usr: "HOD-ICT" },
    { url: "approve-competency-card", component:CompetenceCardApprove, usr: "HOD-ICT" },
    { url: "edit-competence-line-super", component:CompetenceLineEditSuper, usr: "HOD-ICT" },

  ];
  //HOD-HR
  const routes8 = [
    /// Dashboard
    { url: "HOD-dashboard", component:HODDashboard, usr: "HOD-HR" },
    { url: "employee-requisition", component: EmployeeRequision,usr:"HOD-HR" },
    { url: "employee-requisition-card", component: EmployeeRequisitionCard,usr:"HOD-HR" },
    { url: "employee-requisition-modify", component: EmployeeRequisitionCardModify,usr:"HOD-HR" },
    { url: "HOD-requisition-list", component: HODRequisitionApproval,usr:"HOD-HR" },
    { url: "Monitoring", component: Performancemonitoring,usr:"HOD-HR" },
    { url: "monitoring-list", component: PerformanceList,usr:"HOD-HR" },
    { url: "monitoring-card", component: MonitoringCard,usr:"HOD-HR" },
    { url: "HOD-HR-clearance-list", component:HODHRClearanceList ,usr:"HOD-HR" },
    { url: "HOD-HR-clearance-card", component:HODHRClearanceCard,usr:"HOD-HR" },
    { url: "HODHR-own-dept", component:HROwnClearanceCard,usr:"HOD-HR" },


    { url: "new-probation", component:NewProbation, usr: "HOD-HR" },
    { url: "probation-list", component:ProbationList, usr: "HOD-HR" },
    { url: "probation-card", component:ProbationCard, usr: "HOD-HR" },
    { url: "immediate-probation-list", component:ImmediateMgrProbationList, usr: "HOD-HR" },
    { url: "immediate-probation-card", component:ImmediateMgrProbationCard, usr: "HOD-HR" },

    { url: "exit-interview", component:ExitForm, usr: "HOD-HR" },
    { url: "Contract", component:NewContract, usr: "HOD-HR" },
    { url: "contract-list", component:ContractList, usr: "HOD-HR" },
    { url: "contract-card", component:ContractCard, usr: "HOD-HR" },

    { url: "grievance", component:NewGrievance, usr: "HOD-HR" },
    { url: "grievance-list", component:HRGrievanceList, usr: "HOD-HR" },
    { url: "grievance-card", component:HRGrievanceCard, usr: "HOD-HR" },
    { url: "grievance-approval-list", component:GrievanceApprovalList, usr: "HOD-HR" },
    { url: "grievance-approval-card", component:GrievanceApprovalCard, usr: "HOD-HR" },
    { url: "grievance-escalated-list", component:GrievanceEscalatedList, usr: "HOD-HR" },
    { url: "grievance-escalated-card", component:GrievanceEscalatedCard, usr: "HOD-HR" },
    { url: "grievance-appeal-list", component:GrievanceAppealList, usr: "HOD-HR" },
    { url: "grievance-appeal-card", component:GrievanceAppealCard, usr: "HOD-HR" },
    { url: "completed-grievance-list", component:GrievanceCompletedList, usr: "HOD-HR" },
    { url: "completed-grievance-card", component:GrievanceCompletedCard, usr: "HOD-HR" },

    { url: "document-list", component:DocumentList, usr: "HOD-HR" },
    { url: "document-display", component:DocumentCard, usr: "HOD-HR" },
    { url: "leave-lists", component:LeaveApplicationList, usr: "HOD-HR" },
    { url: "new-leave", component:NewLeaveCard, usr: "HOD-HR" },
    { url: "edit-leave", component:EditLeaveCard, usr: "HOD-HR" },
    { url: "leave-approval", component:LeaveApproveeList, usr: "HOD-HR" },
    { url: "supervisees-card", component:LeaveSuperviseeCard, usr: "HOD-HR" },
    { url: "approval-card", component:LeaveApproveeCard, usr: "HOD-HR" },
    { url: "supervisees", component:LeaveSupervisee, usr: "HOD-HR" },
    { url: "Payslip", component:PayslipCard, usr: "HOD-HR" },
    { url: "P-nine", component:PnineCard, usr: "HOD-HR" },

    
          //from 27/06/22- 30/06/22
    { url: "KPIs", component:JobKPIs, usr: "HOD-HR" },
    { url: "KPI-card", component:JobKPICard, usr: "HOD-HR" },
    { url: "new-activity", component:NewPerformanceActivity, usr: "HOD-HR" },
    { url: "new-standard", component:NewPerformanceStandard, usr: "HOD-HR" },
    { url: "Appraisals", component:JobAppraisalTargetList, usr: "HOD-HR" },
    { url: "appraisal-card", component:JobAppraisalTargetCard, usr: "HOD-HR" },
    { url: "employee-appraisal", component:EmployeeAppraisalList, usr: "HOD-HR" },
    { url: "view-employee-appraisal", component:EmployeeAppraisalCard, usr: "HOD-HR" },
    { url: "edit-appraisal", component:EditAppraisal, usr: "HOD-HR" },
    { url: "supervisor-appraisal", component:SupervisorAppraisalList, usr: "HOD-HR" },
    { url: "view-supervisor-appraisal", component:SupervisorAppraisalCard, usr: "HOD-HR" },
    { url: "edit-supervisor-appraisal", component:SupervisorEditAppraisal, usr: "HOD-HR" },
    { url: "supervisor-moderation", component:SupervisorModeratedAppraisalList, usr: "HOD-HR" },
    { url: "view-supervisor-moderation", component:SupervisorModerationAppraisalCard, usr: "HOD-HR" },
    { url: "edit-supervisor-moderated", component:SupervisorModerateEditAppraisal, usr: "HOD-HR" },
    { url: "employee-moderation", component:EmployeeModeratedAppraisalList, usr: "HOD-HR" },
    { url: "view-employee-moderation", component:EmployeeModerationAppraisalCard, usr: "HOD-HR" },
    { url: "employee-complete", component:EmployeeCompleteAppraisalList, usr: "HOD-HR" },
    { url: "view-completed", component:EmployeeCompleteAppraisalCard, usr: "HOD-HR" },
    { url: "supervisor-complete", component:SupervisorCompleteAppraisalList, usr: "HOD-HR" },

    //from 26/08/22
    { url: "new-need", component:NewTrainingNeedsHODCard, usr: "HOD-HR" },
    { url: "need-list", component:NewTrainingNeedHODList, usr: "HOD-HR" },
    { url: "update-need", component:NewTrainingNeedsUpdateHODCard, usr: "HOD-HR" },
    { url:"profile",component:StaffProfile,usr:"HOD-HR"},
    { url:"job-vacancy",component:InternalJobAdvertList,usr:"HOD-HR"},
    { url:"vacancy-card",component:InternalJobAdvertCard,usr:"HOD-HR"},

    //from 01/02/23
    { url: "contractprobation-list", component:ContProbDocumentList, usr: "HOD-HR" },
    { url: "contract-probation-display", component:ContProbDocumentCard, usr: "HOD-HR" },

    { url: "contract-approval-hod", component:ImmediateHODEOC, usr: "HOD-HR" },
    { url: "contract-approval-card-hod", component:ImmediateHODEOCCard, usr: "HOD-HR" },
    { url: "probation-approval-hod", component:ImmediateHODPROB, usr: "HOD-HR" },
    { url: "probation-approval-card-hod", component:ImmediateHODPROBCard, usr: "HOD-HR" },

    { url: "bucketed-contracts", component:BucketContractListHOD, usr: "HOD-HR" },
    { url: "bucketed-probations", component:BucketProbationListHOD, usr: "HOD-HR" },
    { url: "bucket-contract-card", component:BucketContractCard, usr: "HOD-HR" },
    { url: "bucket-probation-card", component:BucketProbationHODCard, usr: "HOD-HR" },

    //Settings routes
    { url: "HR-users", component:HRUserList ,usr:"HOD-HR" },
    { url: "HR-user-card", component:HRUserCard ,usr:"HOD-HR" },
    { url: "HR-document", component:HRDocumentSettings ,usr:"HOD-HR" },
    //10/05/2023
    { url: "competency-list", component:CompetenceList, usr: "HOD-HR" },
    { url: "competency-card", component:CompetenceCard, usr: "HOD-HR" },
    { url: "edit-competence-line", component:CompetenceLineEdit, usr: "HOD-HR" },

    { url: "approve-competency", component:CompetenceListApprove, usr: "HOD-HR" },
    { url: "approve-competency-card", component:CompetenceCardApprove, usr: "HOD-HR" },
    { url: "edit-competence-line-super", component:CompetenceLineEditSuper, usr: "HOD-HR" },

    { url: "HR-jobseekers", component:HRJobseekerList ,usr:"HOD-HR" },
    { url: "HR-jobseekers-card", component:HRUserCard ,usr:"HOD-HR" },
  ];
  //HOD-FIN
  const routes9 = [
    /// Dashboard
    { url: "HOD-dashboard", component:HODDashboard, usr: "HOD-FIN" },
    { url: "employee-requisition", component: EmployeeRequision,usr:"HOD-FIN" },
    { url: "employee-requisition-card", component: EmployeeRequisitionCard,usr:"HOD-FIN" },
    { url: "employee-requisition-modify", component: EmployeeRequisitionCardModify,usr:"HOD-FIN" },
    { url: "HOD-requisition-list", component: HODRequisitionApproval,usr:"HOD-FIN" },
    { url: "Monitoring", component: Performancemonitoring,usr:"HOD-FIN" },
    { url: "monitoring-list", component: PerformanceList,usr:"HOD-FIN" },
    { url: "monitoring-card", component: MonitoringCard,usr:"HOD-FIN" },
    { url: "HOD-financial-list", component: HODFINClearanceList,usr:"HOD-FIN" },
    { url: "HOD-finance-clearance-card", component:HODFINClearanceCard,usr:"HOD-FIN" },
    { url: "HODFIN-own-dept", component:HODFINOwnClearanceCard,usr:"HOD-FIN" },


    { url: "new-probation", component:NewProbation, usr: "HOD-FIN" },
    { url: "probation-list", component:ProbationList, usr: "HOD-FIN" },
    { url: "probation-card", component:ProbationCard, usr: "HOD-FIN" },
    { url: "immediate-probation-list", component:ImmediateMgrProbationList, usr: "HOD-FIN" },
    { url: "immediate-probation-card", component:ImmediateMgrProbationCard, usr: "HOD-FIN" },

    { url: "exit-interview", component:ExitForm, usr: "HOD-FIN" },
    { url: "Contract", component:NewContract, usr: "HOD-FIN" },
    { url: "contract-list", component:ContractList, usr: "HOD-FIN" },
    { url: "contract-card", component:ContractCard, usr: "HOD-FIN" },

    { url: "grievance", component:NewGrievance, usr: "HOD-FIN" },
    { url: "grievance-list", component:HRGrievanceList, usr: "HOD-FIN" },
    { url: "grievance-card", component:HRGrievanceCard, usr: "HOD-FIN" },
    { url: "grievance-approval-list", component:GrievanceApprovalList, usr: "HOD-FIN" },
    { url: "grievance-approval-card", component:GrievanceApprovalCard, usr: "HOD-FIN" },
    { url: "grievance-escalated-list", component:GrievanceEscalatedList, usr: "HOD-FIN" },
    { url: "grievance-escalated-card", component:GrievanceEscalatedCard, usr: "HOD-FIN" },
    { url: "grievance-appeal-list", component:GrievanceAppealList, usr: "HOD-FIN" },
    { url: "grievance-appeal-card", component:GrievanceAppealCard, usr: "HOD-FIN" },
    { url: "completed-grievance-list", component:GrievanceCompletedList, usr: "HOD-FIN" },
    { url: "completed-grievance-card", component:GrievanceCompletedCard, usr: "HOD-FIN" },

    { url: "document-list", component:DocumentList, usr: "HOD-FIN" },
    { url: "document-display", component:DocumentCard, usr: "HOD-FIN" },
    { url: "leave-lists", component:LeaveApplicationList, usr: "HOD-FIN" },
    { url: "new-leave", component:NewLeaveCard, usr: "HOD-FIN" },
    { url: "edit-leave", component:EditLeaveCard, usr: "HOD-FIN" },
    { url: "leave-approval", component:LeaveApproveeList, usr: "HOD-FIN" },
    { url: "supervisees-card", component:LeaveSuperviseeCard, usr: "HOD-FIN" },
    { url: "approval-card", component:LeaveApproveeCard, usr: "HOD-FIN" },
    { url: "supervisees", component:LeaveSupervisee, usr: "HOD-FIN" },
    { url: "Payslip", component:PayslipCard, usr: "HOD-FIN" },
    { url: "P-nine", component:PnineCard, usr: "HOD-FIN" },

    
          //from 27/06/22- 30/06/22
    { url: "KPIs", component:JobKPIs, usr: "HOD-FIN" },
    { url: "KPI-card", component:JobKPICard, usr: "HOD-FIN" },
    { url: "new-activity", component:NewPerformanceActivity, usr: "HOD-FIN" },
    { url: "new-standard", component:NewPerformanceStandard, usr: "HOD-FIN" },
    { url: "Appraisals", component:JobAppraisalTargetList, usr: "HOD-FIN" },
    { url: "appraisal-card", component:JobAppraisalTargetCard, usr: "HOD-FIN" },
    { url: "employee-appraisal", component:EmployeeAppraisalList, usr: "HOD-FIN" },
    { url: "view-employee-appraisal", component:EmployeeAppraisalCard, usr: "HOD-FIN" },
    { url: "edit-appraisal", component:EditAppraisal, usr: "HOD-FIN" },
    { url: "supervisor-appraisal", component:SupervisorAppraisalList, usr: "HOD-FIN" },
    { url: "view-supervisor-appraisal", component:SupervisorAppraisalCard, usr: "HOD-FIN" },
    { url: "edit-supervisor-appraisal", component:SupervisorEditAppraisal, usr: "HOD-FIN" },
    { url: "supervisor-moderation", component:SupervisorModeratedAppraisalList, usr: "HOD-FIN" },
    { url: "view-supervisor-moderation", component:SupervisorModerationAppraisalCard, usr: "HOD-FIN" },
    { url: "edit-supervisor-moderated", component:SupervisorModerateEditAppraisal, usr: "HOD-FIN" },
    { url: "employee-moderation", component:EmployeeModeratedAppraisalList, usr: "HOD-FIN" },
    { url: "view-employee-moderation", component:EmployeeModerationAppraisalCard, usr: "HOD-FIN" },
    { url: "employee-complete", component:EmployeeCompleteAppraisalList, usr: "HOD-FIN" },
    { url: "view-completed", component:EmployeeCompleteAppraisalCard, usr: "HOD-FIN" },
    { url: "supervisor-complete", component:SupervisorCompleteAppraisalList, usr: "HOD-FIN" },

    //from 26/08/22
    { url: "new-need", component:NewTrainingNeedsHODCard, usr: "HOD-FIN" },
    { url: "need-list", component:NewTrainingNeedHODList, usr: "HOD-FIN" },
    { url: "update-need", component:NewTrainingNeedsUpdateHODCard, usr: "HOD-FIN" },
    { url:"profile",component:StaffProfile,usr:"HOD-FIN"},
    { url:"job-vacancy",component:InternalJobAdvertList,usr:"HOD-FIN"},
    { url:"vacancy-card",component:InternalJobAdvertCard,usr:"HOD-FIN"},

    //from 01/02/23
    { url: "contractprobation-list", component:ContProbDocumentList, usr: "HOD-FIN" },
    { url: "contract-probation-display", component:ContProbDocumentCard, usr: "HOD-FIN" },

    { url: "contract-approval-hod", component:ImmediateHODEOC, usr: "HOD-FIN" },
    { url: "contract-approval-card-hod", component:ImmediateHODEOCCard, usr: "HOD-FIN" },
    { url: "probation-approval-hod", component:ImmediateHODPROB, usr: "HOD-FIN" },
    { url: "probation-approval-card-hod", component:ImmediateHODPROBCard, usr: "HOD-FIN" },

    { url: "bucketed-contracts", component:BucketContractListHOD, usr: "HOD-FIN" },
    { url: "bucketed-probations", component:BucketProbationListHOD, usr: "HOD-FIN" },
    { url: "bucket-contract-card", component:BucketContractCard, usr: "HOD-FIN" },
    { url: "bucket-probation-card", component:BucketProbationHODCard, usr: "HOD-FIN" },

    //from 11/05/23
    { url: "competency-list", component:CompetenceList, usr: "HOD-FIN" },
    { url: "competency-card", component:CompetenceCard, usr: "HOD-FIN" },
    { url: "edit-competence-line", component:CompetenceLineEdit, usr: "HOD-FIN" },

    { url: "approve-competency", component:CompetenceListApprove, usr: "HOD-FIN" },
    { url: "approve-competency-card", component:CompetenceCardApprove, usr: "HOD-FIN" },
    { url: "edit-competence-line-super", component:CompetenceLineEditSuper, usr: "HOD-FIN" },

  ];
  //FD
  const routes10 = [
    /// Dashboard
    { url: "FD-dashboard", component:FDDashboard, usr: "FD" },
    { url: "FD-probation", component: FDProbationList,usr:"FD" },
    { url: "FD-probation-card", component: FDProbationCard,usr:"FD" },
    { url: "FD-contract-card", component: MDContractCard,usr:"FD" },
    { url: "FD-approvals", component: FDContractList,usr:"FD" },



    { url: "new-probation", component:NewProbation, usr: "FD" },
    { url: "probation-list", component:ProbationList, usr: "FD" },
    { url: "probation-card", component:ProbationCard, usr: "FD" },
    { url: "immediate-probation-list", component:ImmediateMgrProbationList, usr: "FD" },
    { url: "immediate-probation-card", component:ImmediateMgrProbationCard, usr: "FD" },

    { url: "exit-interview", component:ExitForm, usr: "FD" },
    { url: "Contract", component:NewContract, usr: "FD" },
    { url: "contract-list", component:ContractList, usr: "FD" },
    { url: "contract-card", component:ContractCard, usr: "FD" },
    { url: "Grievance", component:NewGrievance, usr: "FD" },
    { url: "GrievanceList", component:GrievanceList, usr: "FD" },
    { url: "GrievanceCard", component:GrievanceCard, usr: "FD" },
    { url: "document-list", component:DocumentList, usr: "FD" },
    { url: "document-display", component:DocumentCard, usr: "FD" },
    { url: "leave-lists", component:LeaveApplicationList, usr: "FD" },
    { url: "new-leave", component:NewLeaveCard, usr: "FD" },
    { url: "edit-leave", component:EditLeaveCard, usr: "FD" },
    { url: "leave-approval", component:LeaveApproveeList, usr: "FD" },
    { url: "supervisees-card", component:LeaveSuperviseeCard, usr: "FD" },
    { url: "approval-card", component:LeaveApproveeCard, usr: "FD" },
    { url: "supervisees", component:LeaveSupervisee, usr: "FD" },
    { url: "Payslip", component:PayslipCard, usr: "FD" },
    { url: "P-nine", component:PnineCard, usr: "FD" },

    
          //from 27/06/22- 30/06/22
    { url: "KPIs", component:JobKPIs, usr: "FD" },
    { url: "KPI-card", component:JobKPICard, usr: "FD" },
    { url: "new-activity", component:NewPerformanceActivity, usr: "FD" },
    { url: "new-standard", component:NewPerformanceStandard, usr: "FD" },
    { url: "Appraisals", component:JobAppraisalTargetList, usr: "FD" },
    { url: "appraisal-card", component:JobAppraisalTargetCard, usr: "FD" },
    { url: "employee-appraisal", component:EmployeeAppraisalList, usr: "FD" },
    { url: "view-employee-appraisal", component:EmployeeAppraisalCard, usr: "FD" },
    { url: "edit-appraisal", component:EditAppraisal, usr: "FD" },
    { url: "supervisor-appraisal", component:SupervisorAppraisalList, usr: "FD" },
    { url: "view-supervisor-appraisal", component:SupervisorAppraisalCard, usr: "FD" },
    { url: "edit-supervisor-appraisal", component:SupervisorEditAppraisal, usr: "FD" },
    { url: "supervisor-moderation", component:SupervisorModeratedAppraisalList, usr: "FD" },
    { url: "view-supervisor-moderation", component:SupervisorModerationAppraisalCard, usr: "FD" },
    { url: "edit-supervisor-moderated", component:SupervisorModerateEditAppraisal, usr: "FD" },
    { url: "employee-moderation", component:EmployeeModeratedAppraisalList, usr: "FD" },
    { url: "view-employee-moderation", component:EmployeeModerationAppraisalCard, usr: "FD" },
    { url: "employee-complete", component:EmployeeCompleteAppraisalList, usr: "FD" },
    { url: "view-completed", component:EmployeeCompleteAppraisalCard, usr: "FD" },
    { url: "supervisor-complete", component:SupervisorCompleteAppraisalList, usr: "FD" },

    //from 26/08/22
    { url: "new-need", component:MDNewTrainingNeedsCard, usr: "FD" },
    { url: "need-list", component:MDNewTrainingNeedList, usr: "FD" },
    { url: "update-need", component:MDNewTrainingNeedsUpdateCard, usr: "FD" },
    { url:"profile",component:StaffProfile,usr:"FD"},
    { url:"job-vacancy",component:InternalJobAdvertList,usr:"FD"},
    { url:"vacancy-card",component:InternalJobAdvertCard,usr:"FD"},

    //from 01/02/23
    { url: "contractprobation-list", component:ContProbDocumentList, usr: "FD" },
    { url: "contract-probation-display", component:ContProbDocumentCard, usr: "FD" },

    //from 11/05/23
    { url: "competency-list", component:CompetenceList, usr: "FD" },
    { url: "competency-card", component:CompetenceCard, usr: "FD" },
    { url: "edit-competence-line", component:CompetenceLineEdit, usr: "FD" },

    { url: "approve-competency", component:CompetenceListApprove, usr: "FD" },
    { url: "approve-competency-card", component:CompetenceCardApprove, usr: "FD" },
    { url: "edit-competence-line-super", component:CompetenceLineEditSuper, usr: "FD" },

  ];
  //NOS
  const routes11 = [
    /// Dashboard
    { url: "NOS-dashboard", component:StaffDashboard, usr: "NOS" },
    // { url: "leave-lists", component:"", usr: "NOS" },
    // 
    { url: "new-probation", component:NewProbation, usr: "NOS" },
    { url: "probation-list", component:ProbationList, usr: "NOS" },
    { url: "probation-card", component:ProbationCard, usr: "NOS" },
    { url: "immediate-probation-list", component:ImmediateMgrProbationList, usr: "NOS" },
    { url: "immediate-probation-card", component:ImmediateMgrProbationCard, usr: "NOS" },

    { url: "exit-interview", component:ExitForm, usr: "NOS" },
    { url: "Contract", component:NewContract, usr: "NOS" },
    { url: "contract-list", component:ContractList, usr: "NOS" },
    { url: "contract-card", component:ContractCard, usr: "NOS" },

    { url: "grievance", component:NewGrievance, usr: "NOS" },
    { url: "grievance-list", component:HRGrievanceList, usr: "NOS" },
    { url: "grievance-card", component:HRGrievanceCard, usr: "NOS" },
    { url: "grievance-approval-list", component:GrievanceApprovalList, usr: "NOS" },
    { url: "grievance-approval-card", component:GrievanceApprovalCard, usr: "NOS" },
    { url: "grievance-escalated-list", component:GrievanceEscalatedList, usr: "NOS" },
    { url: "grievance-escalated-card", component:GrievanceEscalatedCard, usr: "NOS" },
    { url: "grievance-appeal-list", component:GrievanceAppealList, usr: "NOS" },
    { url: "grievance-appeal-card", component:GrievanceAppealCard, usr: "NOS" },
    { url: "completed-grievance-list", component:GrievanceCompletedList, usr: "NOS" },
    { url: "completed-grievance-card", component:GrievanceCompletedCard, usr: "NOS" },

    { url: "document-list", component:DocumentList, usr: "NOS" },
    { url: "document-display", component:DocumentCard, usr: "NOS" },
    { url: "leave-lists", component:LeaveApplicationList, usr: "NOS" },
    { url: "new-leave", component:NewLeaveCard, usr: "NOS" },
    { url: "edit-leave", component:EditLeaveCard, usr: "NOS" },
    { url: "leave-approval", component:LeaveApproveeList, usr: "NOS" },
    { url: "supervisees-card", component:LeaveSuperviseeCard, usr: "NOS" },
    { url: "approval-card", component:LeaveApproveeCard, usr: "NOS" },
    { url: "supervisees", component:LeaveSupervisee, usr: "NOS" },
    { url: "Payslip", component:PayslipCard, usr: "NOS" },
    { url: "P-nine", component:PnineCard, usr: "NOS" },
    //from 27/06/22- 30/06/22
    { url: "KPIs", component:JobKPIs, usr: "NOS" },
    { url: "KPI-card", component:JobKPICard, usr: "NOS" },
    { url: "new-activity", component:NewPerformanceActivity, usr: "NOS" },
    { url: "new-standard", component:NewPerformanceStandard, usr: "NOS" },
    { url: "Appraisals", component:JobAppraisalTargetList, usr: "NOS" },
    { url: "appraisal-card", component:JobAppraisalTargetCard, usr: "NOS" },
    { url: "employee-appraisal", component:EmployeeAppraisalList, usr: "NOS" },
    { url: "view-employee-appraisal", component:EmployeeAppraisalCard, usr: "NOS" },
    { url: "edit-appraisal", component:EditAppraisal, usr: "NOS" },
    { url: "supervisor-appraisal", component:SupervisorAppraisalList, usr: "NOS" },
    { url: "view-supervisor-appraisal", component:SupervisorAppraisalCard, usr: "NOS" },
    { url: "edit-supervisor-appraisal", component:SupervisorEditAppraisal, usr: "NOS" },
    { url: "supervisor-moderation", component:SupervisorModeratedAppraisalList, usr: "NOS" },
    { url: "view-supervisor-moderation", component:SupervisorModerationAppraisalCard, usr: "NOS" },
    { url: "edit-supervisor-moderated", component:SupervisorModerateEditAppraisal, usr: "NOS" },
    { url: "employee-moderation", component:EmployeeModeratedAppraisalList, usr: "NOS" },
    { url: "view-employee-moderation", component:EmployeeModerationAppraisalCard, usr: "NOS" },
    { url: "employee-complete", component:EmployeeCompleteAppraisalList, usr: "NOS" },
    { url: "view-completed", component:EmployeeCompleteAppraisalCard, usr: "NOS" },
    { url: "supervisor-complete", component:SupervisorCompleteAppraisalList, usr: "NOS" },

    //from 26/08/22
    { url: "new-need", component:NewTrainingNeedsCard, usr: "NOS" },
    { url: "need-list", component:NewTrainingNeedList, usr: "NOS" },
    { url: "update-need", component:NewTrainingNeedsUpdateCard, usr: "NOS" },
    { url:"profile",component:StaffProfile,usr:"NOS"},
    { url:"job-vacancy",component:InternalJobAdvertList,usr:"NOS"},
    { url:"vacancy-card",component:InternalJobAdvertCard,usr:"NOS"},

    //from 01/02/23
    { url: "contractprobation-list", component:ContProbDocumentList, usr: "HOS" },
    { url: "contract-probation-display", component:ContProbDocumentCard, usr: "HOS" },

    //from 11/05/23
    { url: "competency-list", component:CompetenceList, usr: "NOS" },
    { url: "competency-card", component:CompetenceCard, usr: "NOS" },
    { url: "edit-competence-line", component:CompetenceLineEdit, usr: "NOS" },

    { url: "approve-competency", component:CompetenceListApprove, usr: "NOS" },
    { url: "approve-competency-card", component:CompetenceCardApprove, usr: "NOS" },
    { url: "edit-competence-line-super", component:CompetenceLineEditSuper, usr: "NOS" },
  ];
  //MD
  const routes4 = [
    /// Dashboard
    { url: "MD-dashboard", component:MDDashboard, usr: "MD" },
    { url: "MD-employee-requisition", component: MDRequisitionApproval,usr:"MD" },
    { url: "MD-requisition-card", component: MDRequisionCard,usr:"MD" },
    { url: "MD-probation", component: MDProbationList,usr:"MD" },
    { url: "MD-probation-card", component: MDProbationCard,usr:"MD" },
    { url: "MD-contract-card", component: MDContractCard,usr:"MD" },
    { url: "MD-approvals", component: MDContractList,usr:"MD" },

    { url: "new-probation", component:NewProbation, usr: "MD" },
    { url: "probation-list", component:ProbationList, usr: "MD" },
    { url: "immediate-probation-list", component:ImmediateMgrProbationList, usr: "MD" },
    { url: "immediate-probation-card", component:ImmediateMgrProbationCard, usr: "MD" },
    { url: "probation-card", component:ProbationCard, usr: "MD" },

    { url: "exit-interview", component:ExitForm, usr: "MD" },
    { url: "Contract", component:NewContract, usr: "MD" },
    { url: "contract-list", component:ContractList, usr: "MD" },
    { url: "contract-card", component:ContractCard, usr: "MD" },

    { url: "grievance", component:NewGrievance, usr: "MD" },
    { url: "grievance-list", component:HRGrievanceList, usr: "MD" },
    { url: "grievance-card", component:HRGrievanceCard, usr: "MD" },
    { url: "grievance-approval-list", component:GrievanceApprovalList, usr: "MD" },
    { url: "grievance-approval-card", component:GrievanceApprovalCard, usr: "MD" },
    { url: "grievance-escalated-list", component:GrievanceEscalatedList, usr: "MD" },
    { url: "grievance-escalated-card", component:GrievanceEscalatedCard, usr: "MD" },
    { url: "grievance-appeal-list", component:GrievanceAppealList, usr: "MD" },
    { url: "grievance-appeal-card", component:GrievanceAppealCard, usr: "MD" },
    { url: "completed-grievance-list", component:GrievanceCompletedList, usr: "MD" },
    { url: "completed-grievance-card", component:GrievanceCompletedCard, usr: "MD" },

    { url: "document-list", component:DocumentList, usr: "MD" },
    { url: "document-display", component:DocumentCard, usr: "MD" },
    { url: "leave-lists", component:LeaveApplicationList, usr: "MD" },
    { url: "new-leave", component:NewLeaveCard, usr: "MD" },
    { url: "edit-leave", component:EditLeaveCard, usr: "MD" },
    { url: "leave-approval", component:LeaveApproveeList, usr: "MD" },
    { url: "supervisees-card", component:LeaveSuperviseeCard, usr: "MD" },
    { url: "approval-card", component:LeaveApproveeCard, usr: "MD" },
    { url: "supervisees", component:LeaveSupervisee, usr: "MD" },
    { url: "Payslip", component:PayslipCard, usr: "MD" },
    { url: "P-nine", component:PnineCard, usr: "MD" },

    
          //from 27/06/22- 30/06/22
    { url: "KPIs", component:JobKPIs, usr: "MD" },
    { url: "KPI-card", component:JobKPICard, usr: "MD" },
    { url: "new-activity", component:NewPerformanceActivity, usr: "MD" },
    { url: "new-standard", component:NewPerformanceStandard, usr: "MD" },
    { url: "Appraisals", component:JobAppraisalTargetList, usr: "MD" },
    { url: "appraisal-card", component:JobAppraisalTargetCard, usr: "MD" },
    { url: "employee-appraisal", component:EmployeeAppraisalList, usr: "MD" },
    { url: "view-employee-appraisal", component:EmployeeAppraisalCard, usr: "MD" },
    { url: "edit-appraisal", component:EditAppraisal, usr: "MD" },
    { url: "supervisor-appraisal", component:SupervisorAppraisalList, usr: "MD" },
    { url: "view-supervisor-appraisal", component:SupervisorAppraisalCard, usr: "MD" },
    { url: "edit-supervisor-appraisal", component:SupervisorEditAppraisal, usr: "MD" },
    { url: "supervisor-moderation", component:SupervisorModeratedAppraisalList, usr: "MD" },
    { url: "view-supervisor-moderation", component:SupervisorModerationAppraisalCard, usr: "MD" },
    { url: "edit-supervisor-moderated", component:SupervisorModerateEditAppraisal, usr: "MD" },
    { url: "employee-moderation", component:EmployeeModeratedAppraisalList, usr: "MD" },
    { url: "view-employee-moderation", component:EmployeeModerationAppraisalCard, usr: "MD" },
    { url: "employee-complete", component:EmployeeCompleteAppraisalList, usr: "MD" },
    { url: "view-completed", component:EmployeeCompleteAppraisalCard, usr: "MD" },
    { url: "supervisor-complete", component:SupervisorCompleteAppraisalList, usr: "MD" },


    //from 26/08/22
    { url: "new-need", component:MDNewTrainingNeedsCard, usr: "MD" },
    { url: "need-list", component:MDNewTrainingNeedList, usr: "MD" },
    { url: "update-need", component:MDNewTrainingNeedsUpdateCard, usr: "MD" },
    { url:"profile",component:StaffProfile,usr:"MD"},
    { url:"job-vacancy",component:InternalJobAdvertList,usr:"MD"},
    { url:"vacancy-card",component:InternalJobAdvertCard,usr:"MD"},

    //from 01/02/23
    { url: "contractprobation-list", component:ContProbDocumentList, usr: "MD" },
    { url: "contract-probation-display", component:ContProbDocumentCard, usr: "MD" },

    //from 11/05/23
    { url: "competency-list", component:CompetenceList, usr: "MD" },
    { url: "competency-card", component:CompetenceCard, usr: "MD" },
    { url: "edit-competence-line", component:CompetenceLineEdit, usr: "MD" },

    { url: "approve-competency", component:CompetenceListApprove, usr: "MD" },
    { url: "approve-competency-card", component:CompetenceCardApprove, usr: "MD" },
    { url: "edit-competence-line-super", component:CompetenceLineEditSuper, usr: "MD" },
  ];

  //Normal - Staff
  const routes5 = [
    /// Dashboard
    { url: "staff-dashboard", component:StaffDashboard, usr: "NORMAL" },
    // { url: "leave-lists", component:"", usr: "NORMAL" },
    // 
    { url: "new-probation", component:NewProbation, usr: "NORMAL" },
    { url: "probation-list", component:ProbationList, usr: "NORMAL" },
    { url: "immediate-probation-list", component:ImmediateMgrProbationList, usr: "NORMAL" },
    { url: "immediate-probation-card", component:ImmediateMgrProbationCard, usr: "NORMAL" },
    { url: "exit-interview", component:ExitForm, usr: "NORMAL" },
    { url: "Contract", component:NewContract, usr: "NORMAL" },
    { url: "contract-list", component:ContractList, usr: "NORMAL" },
    { url: "contract-card", component:ContractCard, usr: "NORMAL" },
    { url: "document-list", component:DocumentList, usr: "NORMAL" },
    { url: "document-display", component:DocumentCard, usr: "NORMAL" },
    { url: "leave-lists", component:LeaveApplicationList, usr: "NORMAL" },
    { url: "new-leave", component:NewLeaveCard, usr: "NORMAL" },
    { url: "edit-leave", component:EditLeaveCard, usr: "NORMAL" },
    { url: "leave-approval", component:LeaveApproveeList, usr: "NORMAL" },
    { url: "supervisees-card", component:LeaveSuperviseeCard, usr: "NORMAL" },
    { url: "approval-card", component:LeaveApproveeCard, usr: "NORMAL" },
    { url: "supervisees", component:LeaveSupervisee, usr: "NORMAL" },
    { url: "Payslip", component:PayslipCard, usr: "NORMAL" },
    { url: "P-nine", component:PnineCard, usr: "NORMAL" },

    { url: "Grievance", component:NewGrievance, usr: "NORMAL" },
    { url: "GrievanceList", component:GrievanceList, usr: "NORMAL" },
    { url: "GrievanceCard", component:GrievanceCard, usr: "NORMAL" },
    { url: "grievance-approval-list", component:GrievanceApprovalList, usr: "NORMAL" },
    { url: "grievance-approval-card", component:GrievanceApprovalCard, usr: "NORMAL" },
    { url: "grievance-escalated-list", component:GrievanceEscalatedList, usr: "NORMAL" },
    { url: "grievance-escalated-card", component:GrievanceEscalatedCard, usr: "NORMAL" },
    { url: "completed-grievance-list", component:GrievanceCompletedList, usr: "NORMAL" },
    { url: "completed-grievance-card", component:GrievanceCompletedCard, usr: "NORMAL" },
    // { url: "grievance-employee-escalated-card", component:GrievanceEscalatedCard, usr: "NORMAL" },
    
    //from 27/06/22- 30/06/22
    { url: "KPIs", component:JobKPIs, usr: "NORMAL" },
    { url: "KPI-card", component:JobKPICard, usr: "NORMAL" },
    { url: "new-activity", component:NewPerformanceActivity, usr: "NORMAL" },
    { url: "new-standard", component:NewPerformanceStandard, usr: "NORMAL" },
    { url: "Appraisals", component:JobAppraisalTargetList, usr: "NORMAL" },
    { url: "appraisal-card", component:JobAppraisalTargetCard, usr: "NORMAL" },
    { url: "employee-appraisal", component:EmployeeAppraisalList, usr: "NORMAL" },
    { url: "view-employee-appraisal", component:EmployeeAppraisalCard, usr: "NORMAL" },
    { url: "edit-appraisal", component:EditAppraisal, usr: "NORMAL" },
    { url: "supervisor-appraisal", component:SupervisorAppraisalList, usr: "NORMAL" },
    { url: "view-supervisor-appraisal", component:SupervisorAppraisalCard, usr: "NORMAL" },
    { url: "edit-supervisor-appraisal", component:SupervisorEditAppraisal, usr: "NORMAL" },
    { url: "supervisor-moderation", component:SupervisorModeratedAppraisalList, usr: "NORMAL" },
    { url: "view-supervisor-moderation", component:SupervisorModerationAppraisalCard, usr: "NORMAL" },
    { url: "edit-supervisor-moderated", component:SupervisorModerateEditAppraisal, usr: "NORMAL" },
    { url: "employee-moderation", component:EmployeeModeratedAppraisalList, usr: "NORMAL" },
    { url: "view-employee-moderation", component:EmployeeModerationAppraisalCard, usr: "NORMAL" },
    { url: "employee-complete", component:EmployeeCompleteAppraisalList, usr: "NORMAL" },
    { url: "view-completed", component:EmployeeCompleteAppraisalCard, usr: "NORMAL" },
    { url: "supervisor-complete", component:SupervisorCompleteAppraisalList, usr: "NORMAL" },

    //from 26/08/22
    { url: "new-need", component:NewTrainingNeedsCard, usr: "NORMAL" },
    { url: "need-list", component:NewTrainingNeedList, usr: "NORMAL" },
    { url: "update-need", component:NewTrainingNeedsUpdateCard, usr: "NORMAL" },
    { url:"profile",component:StaffProfile,usr:"NORMAL"},
    { url:"job-vacancy",component:InternalJobAdvertList,usr:"NORMAL"},
    { url:"vacancy-card",component:InternalJobAdvertCard,usr:"NORMAL"},

    //from 01/02/23
    { url: "contractprobation-list", component:ContProbDocumentList, usr: "NORMAL" },
    { url: "contract-probation-display", component:ContProbDocumentCard, usr: "NORMAL" },
    { url: "probation-card", component:ProbationCard, usr: "NORMAL" },

    //from 11/05/23
    { url: "competency-list", component:CompetenceList, usr: "NORMAL" },
    { url: "competency-card", component:CompetenceCard, usr: "NORMAL" },
    { url: "edit-competence-line", component:CompetenceLineEdit, usr: "NORMAL" },

    { url: "approve-competency", component:CompetenceListApprove, usr: "NORMAL" },
    { url: "approve-competency-card", component:CompetenceCardApprove, usr: "NORMAL" },
    { url: "edit-competence-line-super", component:CompetenceLineEditSuper, usr: "NORMAL" },
  ];



  let aux = "";
  if(JSON.parse(localStorage.getItem("userDetails"))===null ||JSON.parse(localStorage.getItem("userDetails")).user===null){
    window.location="/login"
  }

  if (JSON.parse(localStorage.getItem("userDetails")).user.length > 0) {
    aux = JSON.parse(localStorage.getItem("userDetails")).user[0];
  }

  if(aux==="HR"){
    return (
      <>
        <div
          id={`${!pagePath ? "main-wrapper" : ""}`}
          className={`${!pagePath ? "show" : "mh100vh"}`}
        >
          {!pagePath && (
            <Nav
              onClick={() => setActiveEvent(!activeEvent)}
              activeEvent={activeEvent}
              onClick2={() => setActiveEvent(false)}
              onClick3={() => setActiveEvent(true)}
            />
          )}
          <div
            className={` ${!path && activeEvent ? "rightside-event" : ""} ${
              !pagePath ? "content-body" : ""
            }`}
          >
            <div
              className={`${!pagePath ? "container-fluid" : ""}`}
              style={{ minHeight: window.screen.height - 60 }}
            >
              <Switch>
                {routes.map((data, i) =>
                 
                    <Route
                      key={i}
                      exact
                      path={`/${data.url}`}
                      component={data.component}
                    />
                   
                )}
              </Switch>
            </div>
          </div>
          {!pagePath && <Footer />}
        </div>
        {/* <ScrollToTop /> */}
      </>
    );
  }
  if(aux==="HEAD-HR"){
    return (
      <>
        <div
          id={`${!pagePath ? "main-wrapper" : ""}`}
          className={`${!pagePath ? "show" : "mh100vh"}`}
        >
          {!pagePath && (
            <Nav
              onClick={() => setActiveEvent(!activeEvent)}
              activeEvent={activeEvent}
              onClick2={() => setActiveEvent(false)}
              onClick3={() => setActiveEvent(true)}
            />
          )}
          <div
            className={` ${!path && activeEvent ? "rightside-event" : ""} ${
              !pagePath ? "content-body" : ""
            }`}
          >
            <div
              className={`${!pagePath ? "container-fluid" : ""}`}
              style={{ minHeight: window.screen.height - 60 }}
            >
              <Switch>
                {routes12.map((data, i) =>
                 
                    <Route
                      key={i}
                      exact
                      path={`/${data.url}`}
                      component={data.component}
                    />
                   
                )}
              </Switch>
            </div>
          </div>
          {!pagePath && <Footer />}
        </div>
        {/* <ScrollToTop /> */}
      </>
    );
  }
  
  else if(aux==="HOD"){
    return (
      <>
        <div
          id={`${!pagePath ? "main-wrapper" : ""}`}
          className={`${!pagePath ? "show" : "mh100vh"}`}
        >
          {!pagePath && (
            <Nav
              onClick={() => setActiveEvent(!activeEvent)}
              activeEvent={activeEvent}
              onClick2={() => setActiveEvent(false)}
              onClick3={() => setActiveEvent(true)}
            />
          )}
          <div
            className={` ${!path && activeEvent ? "rightside-event" : ""} ${
              !pagePath ? "content-body" : ""
            }`}
          >
            <div
              className={`${!pagePath ? "container-fluid" : ""}`}
              style={{ minHeight: window.screen.height - 60 }}
            >
              <Switch>
                {routes3.map((data, i) =>
                 
                    <Route
                      key={i}
                      exact
                      path={`/${data.url}`}
                      component={data.component}
                    />
                   
                )}
              </Switch>
            </div>
          </div>
          {!pagePath && <Footer />}
        </div>
        {/* <ScrollToTop /> */}
      </>
    );
  }else if(aux==="NORMAL"){
    return (
      <>
        <div
          id={`${!pagePath ? "main-wrapper" : ""}`}
          className={`${!pagePath ? "show" : "mh100vh"}`}
        >
          {!pagePath && (
            <Nav
              onClick={() => setActiveEvent(!activeEvent)}
              activeEvent={activeEvent}
              onClick2={() => setActiveEvent(false)}
              onClick3={() => setActiveEvent(true)}
            />
          )}
          <div
            className={` ${!path && activeEvent ? "rightside-event" : ""} ${
              !pagePath ? "content-body" : ""
            }`}
          >
            <div
              className={`${!pagePath ? "container-fluid" : ""}`}
              style={{ minHeight: window.screen.height - 60 }}
            >
              <Switch>
                {routes5.map((data, i) =>
                 
                    <Route
                      key={i}
                      exact
                      path={`/${data.url}`}
                      component={data.component}
                    />
                   
                )}
              </Switch>
            </div>
          </div>
          {!pagePath && <Footer />}
        </div>
        {/* <ScrollToTop /> */}
      </>
    );
  }
  else if(aux==="MD"){
    return (
      <>
        <div
          id={`${!pagePath ? "main-wrapper" : ""}`}
          className={`${!pagePath ? "show" : "mh100vh"}`}
        >
          {!pagePath && (
            <Nav
              onClick={() => setActiveEvent(!activeEvent)}
              activeEvent={activeEvent}
              onClick2={() => setActiveEvent(false)}
              onClick3={() => setActiveEvent(true)}
            />
          )}
          <div
            className={` ${!path && activeEvent ? "rightside-event" : ""} ${
              !pagePath ? "content-body" : ""
            }`}
          >
            <div
              className={`${!pagePath ? "container-fluid" : ""}`}
              style={{ minHeight: window.screen.height - 60 }}
            >
              <Switch>
                {routes4.map((data, i) =>
                 
                    <Route
                      key={i}
                      exact
                      path={`/${data.url}`}
                      component={data.component}
                    />
                   
                )}
              </Switch>
            </div>
          </div>
          {!pagePath && <Footer />}
        </div>
        {/* <ScrollToTop /> */}
      </>
    );
  }
  else if(aux==="FD"){
    return (
      <>
        <div
          id={`${!pagePath ? "main-wrapper" : ""}`}
          className={`${!pagePath ? "show" : "mh100vh"}`}
        >
          {!pagePath && (
            <Nav
              onClick={() => setActiveEvent(!activeEvent)}
              activeEvent={activeEvent}
              onClick2={() => setActiveEvent(false)}
              onClick3={() => setActiveEvent(true)}
            />
          )}
          <div
            className={` ${!path && activeEvent ? "rightside-event" : ""} ${
              !pagePath ? "content-body" : ""
            }`}
          >
            <div
              className={`${!pagePath ? "container-fluid" : ""}`}
              style={{ minHeight: window.screen.height - 60 }}
            >
              <Switch>
                {routes10.map((data, i) =>
                 
                    <Route
                      key={i}
                      exact
                      path={`/${data.url}`}
                      component={data.component}
                    />
                   
                )}
              </Switch>
            </div>
          </div>
          {!pagePath && <Footer />}
        </div>
        {/* <ScrollToTop /> */}
      </>
    );
  }
  else if(aux==="NOS"){
    return (
      <>
        <div
          id={`${!pagePath ? "main-wrapper" : ""}`}
          className={`${!pagePath ? "show" : "mh100vh"}`}
        >
          {!pagePath && (
            <Nav
              onClick={() => setActiveEvent(!activeEvent)}
              activeEvent={activeEvent}
              onClick2={() => setActiveEvent(false)}
              onClick3={() => setActiveEvent(true)}
            />
          )}
          <div
            className={` ${!path && activeEvent ? "rightside-event" : ""} ${
              !pagePath ? "content-body" : ""
            }`}
          >
            <div
              className={`${!pagePath ? "container-fluid" : ""}`}
              style={{ minHeight: window.screen.height - 60 }}
            >
              <Switch>
                {routes11.map((data, i) =>
                 
                    <Route
                      key={i}
                      exact
                      path={`/${data.url}`}
                      component={data.component}
                    />
                   
                )}
              </Switch>
            </div>
          </div>
          {!pagePath && <Footer />}
        </div>
        {/* <ScrollToTop /> */}
      </>
    );
  }


  else if(aux==="HOD-ADMIN"){
    return (
      <>
        <div
          id={`${!pagePath ? "main-wrapper" : ""}`}
          className={`${!pagePath ? "show" : "mh100vh"}`}
        >
          {!pagePath && (
            <Nav
              onClick={() => setActiveEvent(!activeEvent)}
              activeEvent={activeEvent}
              onClick2={() => setActiveEvent(false)}
              onClick3={() => setActiveEvent(true)}
            />
          )}
          <div
            className={` ${!path && activeEvent ? "rightside-event" : ""} ${
              !pagePath ? "content-body" : ""
            }`}
          >
            <div
              className={`${!pagePath ? "container-fluid" : ""}`}
              style={{ minHeight: window.screen.height - 60 }}
            >
              <Switch>
                {routes6.map((data, i) =>
                 
                    <Route
                      key={i}
                      exact
                      path={`/${data.url}`}
                      component={data.component}
                    />
                   
                )}
              </Switch>
            </div>
          </div>
          {!pagePath && <Footer />}
        </div>
        {/* <ScrollToTop /> */}
      </>
    );
  }

  else if(aux==="HOD-IT"){
    return (
      <>
        <div
          id={`${!pagePath ? "main-wrapper" : ""}`}
          className={`${!pagePath ? "show" : "mh100vh"}`}
        >
          {!pagePath && (
            <Nav
              onClick={() => setActiveEvent(!activeEvent)}
              activeEvent={activeEvent}
              onClick2={() => setActiveEvent(false)}
              onClick3={() => setActiveEvent(true)}
            />
          )}
          <div
            className={` ${!path && activeEvent ? "rightside-event" : ""} ${
              !pagePath ? "content-body" : ""
            }`}
          >
            <div
              className={`${!pagePath ? "container-fluid" : ""}`}
              style={{ minHeight: window.screen.height - 60 }}
            >
              <Switch>
                {routes7.map((data, i) =>
                 
                    <Route
                      key={i}
                      exact
                      path={`/${data.url}`}
                      component={data.component}
                    />
                   
                )}
              </Switch>
            </div>
          </div>
          {!pagePath && <Footer />}
        </div>
        {/* <ScrollToTop /> */}
      </>
    );
  }

  else if(aux==="HOD-HR"){
    return (
      <>
        <div
          id={`${!pagePath ? "main-wrapper" : ""}`}
          className={`${!pagePath ? "show" : "mh100vh"}`}
        >
          {!pagePath && (
            <Nav
              onClick={() => setActiveEvent(!activeEvent)}
              activeEvent={activeEvent}
              onClick2={() => setActiveEvent(false)}
              onClick3={() => setActiveEvent(true)}
            />
          )}
          <div
            className={` ${!path && activeEvent ? "rightside-event" : ""} ${
              !pagePath ? "content-body" : ""
            }`}
          >
            <div
              className={`${!pagePath ? "container-fluid" : ""}`}
              style={{ minHeight: window.screen.height - 60 }}
            >
              <Switch>
                {routes8.map((data, i) =>
                 
                    <Route
                      key={i}
                      exact
                      path={`/${data.url}`}
                      component={data.component}
                    />
                   
                )}
              </Switch>
            </div>
          </div>
          {!pagePath && <Footer />}
        </div>
        {/* <ScrollToTop /> */}
      </>
    );
  }

  else if(aux==="HOD-FIN"){
    return (
      <>
        <div
          id={`${!pagePath ? "main-wrapper" : ""}`}
          className={`${!pagePath ? "show" : "mh100vh"}`}
        >
          {!pagePath && (
            <Nav
              onClick={() => setActiveEvent(!activeEvent)}
              activeEvent={activeEvent}
              onClick2={() => setActiveEvent(false)}
              onClick3={() => setActiveEvent(true)}
            />
          )}
          <div
            className={` ${!path && activeEvent ? "rightside-event" : ""} ${
              !pagePath ? "content-body" : ""
            }`}
          >
            <div
              className={`${!pagePath ? "container-fluid" : ""}`}
              style={{ minHeight: window.screen.height - 60 }}
            >
              <Switch>
                {routes9.map((data, i) =>
                 
                    <Route
                      key={i}
                      exact
                      path={`/${data.url}`}
                      component={data.component}
                    />
                   
                )}
              </Switch>
            </div>
          </div>
          {!pagePath && <Footer />}
        </div>
        {/* <ScrollToTop /> */}
      </>
    );
  }


  else
  return (
    <>
      <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "mh100vh"}`}
      >
        {!pagePath && (
          <Nav
            onClick={() => setActiveEvent(!activeEvent)}
            activeEvent={activeEvent}
            onClick2={() => setActiveEvent(false)}
            onClick3={() => setActiveEvent(true)}
          />
        )}
        <div
          className={` ${!path && activeEvent ? "rightside-event" : ""} ${
            !pagePath ? "content-body" : ""
          }`}
        >
          <div
            className={`${!pagePath ? "container-fluid" : ""}`}
            style={{ minHeight: window.screen.height - 60 }}
          >
            <Switch>
              {routes2.map((data, i) =>
               
                  <Route
                    key={i}
                    exact
                    path={`/${data.url}`}
                    component={data.component}
                  />
                 
              )}
            </Switch>
          </div>
        </div>
        {!pagePath && <Footer />}
      </div>
      {/* <ScrollToTop /> */}
    </>
  );

};

export default Markup;
