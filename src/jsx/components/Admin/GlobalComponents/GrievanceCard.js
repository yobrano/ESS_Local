import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { Accordion } from "react-bootstrap";
import "./NewGrievance.css"

const GrievanceCard = (props) => {
  const [loading, setLoading] = useState(true);
  const [selectedEmp, setSelectedEmp] = useState({});
  const [selectedSupervisor, setSelectedSupervisor] = useState({});
  const [currentStage, setCurrentStage] = useState("");
  const [nextStage, setNextStage] = useState("");

  const [approveBtnActuator,setApproveBtnActuator] = useState(false)
  const [uploadBtnActuator,setUploadBtnActuator] = useState(true)

  const [selectedStation, setSelectedStation] = useState({});

  const [sectionList, setSectionList] = useState([]);
  const [selectedSection, setSelectedSection] = useState({});

  const [departmentList, setDepartmentList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState({});

  const [currentStageArr, setCurrentStageArr] = useState([
    "Employee",
    "HOS",
    "HOD",
    "HR",
    "MD",
  ]);

  // const [grievanceDate, setGrievanceDate] = useState(new Date());
  // const [firstRaisedDate, setFirstRaisedDate] = useState(new Date());
  // const [grievanceType, setGrievanceType] = useState("");
  // const [workEnvironment, setWorkEnvironment] = useState(false);
  // const [employeeRtn, setEmployeeRtn] = useState(false);

  const [subject, setSubject] = useState("");
  const [grievanceDescription, setGrievanceDescription] = useState("");
  const [stepTaken, setStepTaken] = useState("");
  const [outCome, setOutCome] = useState("");
  const [commEnt, setCommEnt] = useState("");
  const [recommendAtion, setRecommendAtion] = useState("");

  // const [push,setPush] = useState(false)

  // const [postBtnState ,setPostBtnState] = useState(false)
  const [grievanceNo,setGrievanceNo] = useState("")

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/grievance/singlegrievance/${props.location.state[0].datum[0].gid}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          setLoading(false);

          setSelectedEmp(response.data.grievancesingle.employeename)
          setSelectedSupervisor(response.data.grievancesingle.supervisorname)
          setCurrentStage(response.data.grievancesingle.currentstage)
          setNextStage(response.data.grievancesingle.nextstage)
          setSubject(response.data.grievancesingle.subject)
          setGrievanceDescription(response.data.grievancesingle.description)
          setStepTaken(response.data.grievancesingle.stepTaken)
          setOutCome(response.data.grievancesingle.outcome)
          setCommEnt(response.data.grievancesingle.comment)
          setRecommendAtion(response.data.grievancesingle.recommendation)

          var stageVar = JSON.parse(localStorage.getItem("userDetails"));
          if (JSON.parse(localStorage.getItem("userDetails")).user.length > 0) {
            if (stageVar.user[0] === "NORMAL" && currentStage === "Employee") {
              setApproveBtnActuator(true);
              setUploadBtnActuator(false);
            }
            
          }

        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log({ err: err });
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
      });
  }, []);

  const uploadGrievance = (e)=>{
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    let data ={
      EmpID:selectedEmp.value,
      Station:selectedStation.value,
      Section:selectedSection.value,
      Dept:selectedDepartment.value,
      Supervisor:selectedSupervisor.value,
      CurrentStage:currentStage,
      NextStage:nextStage,
      // GrievanceDate:grievanceDate,
      // DateofIssue:firstRaisedDate,
      // GrievanceType:grievanceType,
      // WorkEnv:workEnvironment,
      // EmployeeRln:employeeRtn,
      Subject:subject,
      Description:grievanceDescription,
      StepTaken:stepTaken,
      Outcome:outCome,
      Comment:commEnt,
      Recommendation:recommendAtion
    }
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Upload",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        // setPostBtnState(true)
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/grievance/creategrievance`,
            data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          // setPush(true)
          setGrievanceNo(response.data.gid)
          swal("Success!", "Grievance Card Created", "success");
        }
        if (response.status === 404) {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        console.log({ err: err });
        // setPostBtnState(false)
      });
  }
  const Resolve = (e)=>{
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    // let data ={
    //   EmpID:selectedEmp.value,
    
    // }
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Move",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        // setPostBtnState(true)
        if (willCreate) {
          return axios.get(
            `${process.env.REACT_APP_API_S_LINK}/grievance/forwardgrievance/${grievanceNo}`,
            // data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          // setPush(true)
          setGrievanceNo(response.data.return_value)
          swal("Success!", "Grievance Card Moved", "success");
        }
        if (response.status === 404) {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        console.log({ err: err });
        // setPostBtnState(false)
      });
  }

  let Resolving = (
    <div className="text-right my-4">
    <button
      className="btn btn-warning"
      onClick={Resolve}
    >
      Resolve <i className="fa fa-arrow-up"></i>
    </button>
  </div>
  )

  

  if (loading) {
    return (
      <>
        <div className="container">
          <div className="headerDiv2 text-center"></div>
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
      <div className="container">
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div className="title mb-4">
                <span className="fs-18 text-black font-w600">
                  New Grievance Creation Card
                </span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="card rounded-0">
                <div className="card-body">
                  <div className="row">
                    <div className="col-xl-3 col-sm-6">
                      <div className="form-group">
                        <label htmlFor="">Employee</label>
                        <input type="text" className="form-control" value={selectedEmp} disabled/>
                      </div>
                    </div>

                  

                    <div className="col-xl-3 col-sm-6">
                      <div className="form-group">
                        <label htmlFor="">Supervisor</label>
                        <input type="text" className="form-control" value={selectedSupervisor} disabled/>
                      </div>
                    </div>
                    <div className="col-xl-3 col-sm-3">
                      <div className="form-group">
                        <label htmlFor="">Current Stage</label>
                        <input
                          type="text"
                          className="form-control"
                          name="currentStage"
                          placeholder=""
                          value={currentStage}
                          onChange={(e) => setCurrentStage(e.target.value)}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-xl-3 col-sm-3">
                      <div className="form-group">
                        <label htmlFor="">Next Stage</label>
                        <select
                          name="qualifiedForPromo"
                          id=""
                          className="form-control"
                          onChange={(e) => setNextStage(e.target.value)}
                          value={nextStage}
                        >
                          <option>Choose</option>
                          <option value="Employee">Employee</option>
                          <option value="HOS">HOS</option>
                          <option value="HOD">HOD</option>
                          <option value="HR">HR</option>
                          <option value="MD">MD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <div className="title mb-4">
                <span className="fs-18 text-black font-w600">
                  Grievance Details
                </span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="card rounded-0">
                <div className="card-body">
                <div className="row">
             


                <div className="col-xl-12 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      placeholder=""
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-xl-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="">Grievance Description</label>
                    <textarea
                      className="form-control"
                      cols="30"
                      rows="3"
                      name="grievanceDescription"
                      placeholder="max 240 characters"
                      value={grievanceDescription}
                      onChange={(e) => setGrievanceDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="col-xl-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="">Step Taken</label>
                    <textarea
                      className="form-control"
                      cols="30"
                      rows="3"
                      name="stepTaken"
                      placeholder="max 240 characters"
                      value={stepTaken}
                      onChange={(e) => setStepTaken(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="col-xl-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="">Outcome</label>
                    <textarea
                      className="form-control"
                      cols="30"
                      rows="3"
                      name="outCome"
                      placeholder="max 240 characters"
                      value={outCome}
                      onChange={(e) => setOutCome(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="col-xl-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="">Comment</label>
                    <textarea
                      className="form-control"
                      cols="30"
                      rows="3"
                      name="commEnt"
                      placeholder="max 240 characters"
                      value={commEnt}
                      onChange={(e) => setCommEnt(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="col-xl-12 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="">Recommendation</label>
                    <textarea
                      className="form-control"
                      cols="30"
                      rows="3"
                      name="recommendAtion"
                      placeholder="max 240 characters"
                      value={recommendAtion}
                      onChange={(e) => setRecommendAtion(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
               
                </div>

                <div className="card-footer">
                  <div className="text-right">
                    <button
                      className="btn btn-success"
                      onClick={uploadGrievance}
                      disabled={uploadBtnActuator}
                    >
                      Grievance Card <i className="fa fa-arrow-up"></i>
                    </button>
                  </div>

                 {approveBtnActuator?Resolving:""}

                </div>
              </div>
             
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};

export default withRouter(GrievanceCard);
