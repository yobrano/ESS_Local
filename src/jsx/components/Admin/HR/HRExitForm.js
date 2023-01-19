import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "./ExitForm.css";
import axios from "axios";
import swal from "sweetalert";

const HRExitForm = (props) => {
  const [loading, setLoading] = useState(true);
  const [typeOfWork, setTypeOfWork] = useState("");
  const [workingCondition, setWorkingCondition] = useState("");
  const [pay, setPay] = useState("");
  const [manager, setManager] = useState("");

  const [fairnerssOfWorkload, setFairnerssOfWorkload] = useState(1);
  const [salary, setSalary] = useState(1);
  const [workingCondition1, setWorkingCondition1] = useState(1);
  const [toolsProvided, setToolsProvided] = useState(1);
  const [trainingReceived, setTrainingReceived] = useState(1);
  const [rxtionCoworkers, setrXtionCoworkers] = useState(1);
  const [typeWorkPerformed, setTypeWorkPerformed] = useState(1);
  const [supervisionReceived, setSupervisionReceived] = useState(1);
  const [decisionAffected, setDecisionAffected] = useState(1);
  const [recruitmentProcess, setRecruitmentProcess] = useState(1);
  const [employeeOrientation, setEmployeeOrientation] = useState(1);
  const [trainingOpportunity, setTrainingOpportunity] = useState(1);
  const [careerDevOps, setCareerDevOps] = useState(1);
  const [employeeMorale, setEmployeeMorale] = useState(1);
  const [fairTreatment, setFairTreatment] = useState(1);
  const [recognitionOfWelldoneJob, setRecognitionOfWelldoneJob] = useState(1);
  const [supportOfworklifebal, setSupportOfworklifebal] = useState(1);
  const [cooperationWithinOffice, setCooperationWithinOffice] = useState(1);
  const [communicationMgtEmp, setCommunicationMgtEmp] = useState(1);
  const [perfomanceDevPlanning, setPerfomanceDevPlanning] = useState(1);
  const [interestInvEmp, setInterestInvEmp] = useState(1);
  const [commitmentCustServ, setCommitmentCustServ] = useState(1);
  const [concernedQualityExcellence, setConcernedQualityExcellence] = useState(1);
  const [adminPolicy, setAdminPolicy] = useState(1);
  const [recognitionAccomp, setRecognitionAccomp] = useState(1);
  const [clearlyCommExpectation, setclearlyCommExpectation] = useState(1);
  const [treatedFairly, setTreatedFairly] = useState(1);
  const [coarchedTrainedDev, setCoarchedTrainedDev] = useState(1);
  const [providedLeadership, setProvidedLeadership] = useState(1);
  const [encouragedTeamworkCoop, setEncouragedTeamworkCoop] = useState(1);
  const [resolvedConcerns, setResolvedConcerns] = useState(1);
  const [listeningToSuggetions, setlisteningToSuggetions] = useState(1);
  const [keptTeamInfo, setKeptTeamInfo] = useState(1);
  const [supportedWorkLifeBal, setSupportedWorkLifeBal] = useState(1);
  const [appropriateChallengingAssignments, setAppropriateChallengingAssignments] = useState(1);

  const [whatulldosummarydous, setWhatulldosummarydous] = useState("");
  const [theJobLeaving, setTheJobLeaving] = useState("");
  const [theOrgoverla, setTheOrgoverla] = useState("");
  const [yourSupervisorMgr, setYourSupervisorMgr] = useState("");
  const [anyOtherSuggetionQ, setAnyOtherSuggetionQ] = useState("");
  const [nowDate, setNowDate] = useState(new Date());

  const [exitModel,setExitModel] = useState({})



  useEffect(()=>{
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/employee/hrgetexitform/${props.location.state[0].datum[0].id}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
            console.log(response.data);
            setExitModel(response.data)
            

            setFairnerssOfWorkload(response.data.fairnessofworkload)
            setSalary(response.data.salary)
            setWorkingCondition1(response.data.workingconditionOne)
            setToolsProvided(response.data.toolsprovided)
            setTrainingReceived(response.data.trainingreceived)
            setrXtionCoworkers(response.data.rxtioncoworker)
            setTypeWorkPerformed(response.data.typeworkperformed)
            setSupervisionReceived(response.data.supervisonreceived)
            setDecisionAffected(response.data.decisionaffected)
            setRecruitmentProcess(response.data.recruitmentprocess)
            setEmployeeOrientation(response.data.employeeorientation)
            setTrainingOpportunity(response.data.trainingopportunity)
            setCareerDevOps(response.data.careerdevops)
            setEmployeeMorale(response.data.employeemorale)
            setFairTreatment(response.data.fairtreatment)
            setRecognitionOfWelldoneJob(response.data.recognitionofwelldone)
            setSupportOfworklifebal(response.data.suportofworklifebal)
            setCooperationWithinOffice(response.data.cooperationinoffice)
            setCommunicationMgtEmp(response.data.communicationmgtemp)
            setPerfomanceDevPlanning(response.data.performancedevplan)
            setInterestInvEmp(response.data.interestinvemp)
            setCommitmentCustServ(response.data.commitmentCustServ)
            setConcernedQualityExcellence(response.data.concernedQualityExcellence)
            setAdminPolicy(response.data.adminPolicy)
            setRecognitionAccomp(response.data.recognitionAccomp)
            setclearlyCommExpectation(response.data.clearlyCommExpectation)
            setTreatedFairly(response.data.treatedFairly)
            setCoarchedTrainedDev(response.data.coarchedTrainedDev)
            setProvidedLeadership(response.data.providedLeadership)
            setEncouragedTeamworkCoop(response.data.encouragedTeamworkCoop)
            setResolvedConcerns(response.data.resolvedConcerns)
            setlisteningToSuggetions(response.data.listeningToSuggetions)
            setKeptTeamInfo(response.data.keptTeamInfo)
            setSupportedWorkLifeBal(response.data.supportedWorkLifeBal)
            setAppropriateChallengingAssignments(response.data.appropriateChallengingAssignments)

            setNowDate(new Date(response.data.nowDate))
            setAnyOtherSuggetionQ(response.data.anyOtherSuggetionQ)
            setYourSupervisorMgr(response.data.yourSupervisorMgr)
            setTheOrgoverla(response.data.theOrgoverla)
            setTheJobLeaving(response.data.theJobLeaving)
            setWhatulldosummarydous(response.data.whatulldosummarydous)



            
            setLoading(false);
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log({ err: err });
        swal("Oh!", err.data.message, "error");
      });
  },[]);

  const updateCard = (e) => {
   e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Update Exit Form",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.get(
            `${process.env.REACT_APP_API_S_LINK}/home/hrapproveexitform/${props.location.state[0].datum[0].exitNo}`,
            // data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          swal("Success!", "Exit Interview Form Updated", "success");
        }
        if (response.status === 404) {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        if(err.response!==undefined){
          swal("Oh!", err.response.data.message, "error");
        }else{
          swal("Oh!", err.message, "error");
        }
        console.log({ err: err });
      });
  };

  let btnUP = "";
  if(props.location.state[0].datum[0].formUploaded === 1){
   btnUP = (
    <button className="btn btn-success" onClick={updateCard}>
    Update the Form
  </button>
   )
  }else if(props.location.state[0].datum[0].formUploaded === 2){
    btnUP = (
        <button className="btn btn-secondary">
        Form Updated Already
      </button>)
  }


  if (loading) {
    return (
      <>
        <div className="container">
          <div className="headerDiv2 text-center">
            <h4 className="">Exit Interview Not Available</h4>
          </div>
          <div className="jobRow">
            <div id="preloader-home">
              <div
                className="sk-three-bounce"
                style={{ backgroundColor: "#f9f9f9" }}
              >
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <h4 className="text-center">EXIT INTERVIEW FORM</h4>
      <div className="card">
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div className="title mb-4">
                <span className="fs-18 text-black font-w600">
                  Please describe the primary reason(s) you are leaving your
                  current position.
                </span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="row">
                <div className="col-md-8">
                  <p className="typeOfWork">Type of work</p>
                </div>
                <div className="col-md-4">
            { exitModel.typeofwork}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-8">
                  <p className="workingCondition">
                    Working conditions (setting, schedule, travel, flexibility)
                  </p>
                </div>
                <div className="col-md-4">
                { exitModel.workingcondition}
                 
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-8">
                  <p className="Pay">Pay</p>
                </div>
                <div className="col-md-4">
                { exitModel.payment}
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-8">
                  <p className="Manager">Manager</p>
                </div>
                <div className="col-md-4">
                { exitModel.manager}
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <div className="title mb-4">
                <span className="fs-18 text-black font-w600">
                  Please rate the following aspects of the job you are vacating.
                  Use the 1 – 5 scale below.
                </span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="row">
                <div className="col-md-4">
                  <p className="fair">Fairness of workload</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={fairnerssOfWorkload}
                      id="myRange"
                      onChange={(e) => setFairnerssOfWorkload(e.target.value)}
                    />
                    <p>Value: {fairnerssOfWorkload}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="typeOfWork">Salary</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={salary}
                      id="myRange"
                      onChange={(e) => setSalary(e.target.value)}
                    />
                    <p>Value: {salary}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="">Working conditions</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={workingCondition1}
                      id="myRange"
                      onChange={(e) => setWorkingCondition1(e.target.value)}
                    />
                    <p>Value: {workingCondition1}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="">Tools and equipment provided</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={toolsProvided}
                      id="myRange"
                      onChange={(e) => setToolsProvided(e.target.value)}
                    />
                    <p>Value: {toolsProvided}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="">Training received</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={trainingReceived}
                      id="myRange"
                      onChange={(e) => setTrainingReceived(e.target.value)}
                    />
                    <p>Value: {trainingReceived}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="">Relationship with co-workers</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={rxtionCoworkers}
                      id="myRange"
                      onChange={(e) => setrXtionCoworkers(e.target.value)}
                    />
                    <p>Value: {rxtionCoworkers}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="">Type of work performed</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={typeWorkPerformed}
                      id="myRange"
                      onChange={(e) => setTypeWorkPerformed(e.target.value)}
                    />
                    <p>Value: {typeWorkPerformed}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="">Supervision received</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={supervisionReceived}
                      id="myRange"
                      onChange={(e) => setSupervisionReceived(e.target.value)}
                    />
                    <p>Value: {supervisionReceived}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="">Level of input in decisions that affected you</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={decisionAffected}
                      id="myRange"
                      onChange={(e) => setDecisionAffected(e.target.value)}
                    />
                    <p>Value: {decisionAffected}</p>
                  </div>
                </div>
              </div>



            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <div className="title mb-4">
                <span className="fs-18 text-black font-w600">
                Please rate the following aspects of the organization overall. Use the 1 – 5 scale below.
                [1- Poor, 2, 3 - Average, 4, 5 - Excellent]
                </span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="row">
                <div className="col-md-4">
                  <p className="fair">Recruitment process</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={recruitmentProcess}
                      id="myRange"
                      onChange={(e) => setRecruitmentProcess(e.target.value)}
                    />
                    <p>Value: {recruitmentProcess}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">New employee orientation</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={employeeOrientation}
                      id="myRange"
                      onChange={(e) => setEmployeeOrientation(e.target.value)}
                    />
                    <p>Value: {employeeOrientation}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">Training opportunities</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={trainingOpportunity}
                      id="myRange"
                      onChange={(e) => setTrainingOpportunity(e.target.value)}
                    />
                    <p>Value: {trainingOpportunity}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">Career development opportunities</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={careerDevOps}
                      id="myRange"
                      onChange={(e) => setCareerDevOps(e.target.value)}
                    />
                    <p>Value: {careerDevOps}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">Employee morale</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={employeeMorale}
                      id="myRange"
                      onChange={(e) => setEmployeeMorale(e.target.value)}
                    />
                    <p>Value: {employeeMorale}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">Fair treatment of employees</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={fairTreatment}
                      id="myRange"
                      onChange={(e) => setFairTreatment(e.target.value)}
                    />
                    <p>Value: {fairTreatment}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">Recognition for a job well done</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={recognitionOfWelldoneJob}
                      id="myRange"
                      onChange={(e) => setRecognitionOfWelldoneJob(e.target.value)}
                    />
                    <p>Value: {recognitionOfWelldoneJob}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">Support of work-life balance</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={supportOfworklifebal}
                      id="myRange"
                      onChange={(e) => setSupportOfworklifebal(e.target.value)}
                    />
                    <p>Value: {supportOfworklifebal}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">Co-operation within the office</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={cooperationWithinOffice}
                      id="myRange"
                      onChange={(e) => setCooperationWithinOffice(e.target.value)}
                    />
                    <p>Value: {cooperationWithinOffice}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">Communication between management and employees</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={communicationMgtEmp}
                      id="myRange"
                      onChange={(e) => setCommunicationMgtEmp(e.target.value)}
                    />
                    <p>Value: {communicationMgtEmp}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">Performance and development planning and evaluation</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={perfomanceDevPlanning}
                      id="myRange"
                      onChange={(e) => setPerfomanceDevPlanning(e.target.value)}
                    />
                    <p>Value: {perfomanceDevPlanning}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">Interest and investment in employees</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={interestInvEmp}
                      id="myRange"
                      onChange={(e) => setInterestInvEmp(e.target.value)}
                    />
                    <p>Value: {interestInvEmp}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">Commitment to customer service</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={commitmentCustServ}
                      id="myRange"
                      onChange={(e) => setCommitmentCustServ(e.target.value)}
                    />
                    <p>Value: {commitmentCustServ}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">Concern with quality and excellence</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={concernedQualityExcellence}
                      id="myRange"
                      onChange={(e) => setConcernedQualityExcellence(e.target.value)}
                    />
                    <p>Value: {concernedQualityExcellence}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">Administrative policies/procedures</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={adminPolicy}
                      id="myRange"
                      onChange={(e) => setAdminPolicy(e.target.value)}
                    />
                    <p>Value: {adminPolicy}</p>
                  </div>
                </div>
              </div>

            




            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <div className="title mb-4">
                <span className="fs-18 text-black font-w600">
                Please rate your supervisor on the following factors. Use the 1 – 5 scale below
                [1 - Never, 2 - seldom, 3 - Often, 4 - Usually, 5 - Always]
                </span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="row">
                <div className="col-md-4">
                  <p className="fair">Recognized accomplishments</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={recognitionAccomp}
                      id="myRange"
                      onChange={(e) => setRecognitionAccomp(e.target.value)}
                    />
                    <p>Value: {recognitionAccomp}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">Clearly communicated expectations</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={clearlyCommExpectation}
                      id="myRange"
                      onChange={(e) => setclearlyCommExpectation(e.target.value)}
                    />
                    <p>Value: {clearlyCommExpectation}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">Treated you fairly and respectfully</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={treatedFairly}
                      id="myRange"
                      onChange={(e) => setTreatedFairly(e.target.value)}
                    />
                    <p>Value: {treatedFairly}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">Coached, trained, &amp; developed you</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={coarchedTrainedDev}
                      id="myRange"
                      onChange={(e) => setCoarchedTrainedDev(e.target.value)}
                    />
                    <p>Value: {coarchedTrainedDev}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">Provided leadership</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={providedLeadership}
                      id="myRange"
                      onChange={(e) => setProvidedLeadership(e.target.value)}
                    />
                    <p>Value: {providedLeadership}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">Encouraged teamwork &amp; cooperation</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={encouragedTeamworkCoop}
                      id="myRange"
                      onChange={(e) => setEncouragedTeamworkCoop(e.target.value)}
                    />
                    <p>Value: {encouragedTeamworkCoop}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">Resolved concerns promptly</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={resolvedConcerns}
                      id="myRange"
                      onChange={(e) => setResolvedConcerns(e.target.value)}
                    />
                    <p>Value: {resolvedConcerns}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">Listened to suggestions &amp; feedback</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={listeningToSuggetions}
                      id="myRange"
                      onChange={(e) => setlisteningToSuggetions(e.target.value)}
                    />
                    <p>Value: {listeningToSuggetions}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">Kept the team informed</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={keptTeamInfo}
                      id="myRange"
                      onChange={(e) => setKeptTeamInfo(e.target.value)}
                    />
                    <p>Value: {keptTeamInfo}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">Supported work-life balance</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={supportedWorkLifeBal}
                      id="myRange"
                      onChange={(e) => setSupportedWorkLifeBal(e.target.value)}
                    />
                    <p>Value: {supportedWorkLifeBal}</p>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">Provided appropriate &amp; challenging assignments</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <input
                      className="slider"
                      type="range"
                      min="1"
                      max="5"
                      value={appropriateChallengingAssignments}
                      id="myRange"
                      onChange={(e) => setAppropriateChallengingAssignments(e.target.value)}
                    />
                    <p>Value: {appropriateChallengingAssignments}</p>
                  </div>
                </div>
              </div>
            
              



            </Accordion.Body>
          </Accordion.Item>


          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <div className="title mb-4">
                <span className="fs-18 text-black font-w600">
                If you accepted another job, please complete the following
                </span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="row">
                <div className="col-md-4">
                  <p className="fair">What the new position is and what the new  organization offers in addition to what we do.</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <textarea className="w-100 form-control" name="whatulldosummarydous"  rows="10" placeholder="Summary Text"
                    value={whatulldosummarydous}
                    onChange={(e) => setWhatulldosummarydous(e.target.value)}

                    ></textarea>
                   
                  </div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header>
              <div className="title mb-4">
                <span className="fs-18 text-black font-w600">
                Please give your suggestions on improving the following:-
                </span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="row">
                <div className="col-md-4">
                  <p className="fair">1.	The job you are leaving</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <textarea className="w-100 form-control" name="theJobLeaving"  rows="1" placeholder="Summary Text"
                    value={theJobLeaving}
                    onChange={(e) => setTheJobLeaving(e.target.value)}

                    ></textarea>
                   
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">2.	The Organization overall</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <textarea className="w-100 form-control" name="theOrgoverla"  rows="1" placeholder="Summary Text"
                    value={theOrgoverla}
                    onChange={(e) => setTheOrgoverla(e.target.value)}

                    ></textarea>
                   
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">3.	Your Supervisor/Manager</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <textarea className="w-100 form-control" name="yourSupervisorMgr"  rows="1" placeholder="Summary Text"
                    value={yourSupervisorMgr}
                    onChange={(e) => setYourSupervisorMgr(e.target.value)}

                    ></textarea>
                   
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">4.	Any other comment/suggestion that has not been addressed in the previous questions</p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                    <textarea className="w-100 form-control" name="anyOtherSuggetionQ"  rows="1" placeholder="Summary Text"
                    value={anyOtherSuggetionQ}
                    onChange={(e) => setAnyOtherSuggetionQ(e.target.value)}

                    ></textarea>
                   
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-md-4">
                  <p className="fair">Date </p>
                </div>
                <div className="col-md-8">
                  <div className="form-group">
                  <DatePicker
                                        selected={nowDate}
                                        onChange={(date) => setNowDate(date)}
                                      />

                 
                   
                  </div>
                </div>
              </div>

            </Accordion.Body>
          </Accordion.Item>

        </Accordion>
        <div className="card-footer">
          <div className="text-right">
           {btnUP}
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(HRExitForm);
