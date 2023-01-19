import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { Accordion } from "react-bootstrap";
import "./NewGrievance.css"

const NewGrievance = (props) => {
  const [loading, setLoading] = useState(true);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState({});
  const [selectedSupervisor, setSelectedSupervisor] = useState({});

  const [stationList, setStationList] = useState([]);
  const [selectedStation, setSelectedStation] = useState({});

  const [sectionList, setSectionList] = useState([]);
  const [selectedSection, setSelectedSection] = useState({});

  const [departmentList, setDepartmentList] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState({});

  const [nextStage, setNextStage] = useState("");
  const [currentStageArr, setCurrentStageArr] = useState([
    "Employee",
    "HOS",
    "HOD",
    "HR",
    "MD",
  ]);
  const [currentStage, setCurrentStage] = useState("");

  const [grievanceDate, setGrievanceDate] = useState(new Date());
  const [firstRaisedDate, setFirstRaisedDate] = useState(new Date());
  const [grievanceType, setGrievanceType] = useState("");
  const [workEnvironment, setWorkEnvironment] = useState(false);
  const [employeeRtn, setEmployeeRtn] = useState(false);

  const [subject, setSubject] = useState("");
  const [grievanceDescription, setGrievanceDescription] = useState("");
  const [stepTaken, setStepTaken] = useState("");
  const [outCome, setOutCome] = useState("");
  const [commEnt, setCommEnt] = useState("");
  const [recommendAtion, setRecommendAtion] = useState("");

  const [push,setPush] = useState(false)

  const [postBtnState ,setPostBtnState] = useState(false)
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
        `${process.env.REACT_APP_API_S_LINK}/grievance/getsystemdimensions`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          setLoading(false);
          setEmployeeList(response.data.employeeList);
          setStationList(response.data.stationList);
          setSectionList(response.data.sectionList);
          setDepartmentList(response.data.departmentList);
          var stageVar = JSON.parse(localStorage.getItem("userDetails"));
          if (JSON.parse(localStorage.getItem("userDetails")).user.length > 0) {
            if (stageVar.user[0] === "NORMAL") {
              setCurrentStage("Employee");
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
      GrievanceDate:grievanceDate,
      DateofIssue:firstRaisedDate,
      GrievanceType:grievanceType,
      WorkEnv:workEnvironment,
      EmployeeRln:employeeRtn,
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
        setPostBtnState(true)
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
          setPush(true)
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
        setPostBtnState(false)
      });
  }
  const forwardNext = (e)=>{
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
        setPostBtnState(true)
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
          setPush(true)
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
        setPostBtnState(false)
      });
  }

  let pushForward = (
    <div className="text-right my-4">
    <button
      className="btn btn-warning"
      onClick={forwardNext}
    >
      Forward to Next Stage <i className="fa fa-arrow-up"></i>
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
                      <div className="form-control1">
                        <label htmlFor="">Employee</label>
                        <Select
                          defaultValue={selectedEmp}
                          onChange={setSelectedEmp}
                          options={employeeList}
                        />
                      </div>
                    </div>

                    <div className="col-xl-3 col-sm-6">
                      <div className="form-control1">
                        <label htmlFor="">Station</label>
                        <Select
                          defaultValue={selectedStation}
                          onChange={setSelectedStation}
                          options={stationList}
                        />
                      </div>
                    </div>

                    <div className="col-xl-3 col-sm-6">
                      <div className="form-control1">
                        <label htmlFor="">Section</label>
                        <Select
                          defaultValue={selectedSection}
                          onChange={setSelectedSection}
                          options={sectionList}
                        />
                      </div>
                    </div>

                    <div className="col-xl-3 col-sm-6">
                      <div className="form-control1">
                        <label htmlFor="">Department</label>
                        <Select
                          defaultValue={selectedDepartment}
                          onChange={setSelectedDepartment}
                          options={departmentList}
                        />
                      </div>
                    </div>

                    <div className="col-xl-3 col-sm-6">
                      <div className="form-control1">
                        <label htmlFor="">Supervisor</label>
                        <Select
                          defaultValue={selectedSupervisor}
                          onChange={setSelectedSupervisor}
                          options={employeeList}
                        />
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
                {/* <div className="card-footer">
                  <div className="text-right">
                    <button
                      className="btn btn-success"
                      onClick={uploadGeneral}
                    >
                      Post General <i className="fa fa-arrow-up"></i>
                    </button>
                  </div>
                </div> */}
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
                <div className="col-xl-3 col-sm-6">
                  <div className="form-control1">
                    <label htmlFor="">Grievance Date</label>
                    <DatePicker
                      selected={grievanceDate}
                      onChange={(date) => setGrievanceDate(date)}
                    />
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6">
                  <div className="form-control1">
                    <label htmlFor="">Date of Issue First Raised</label>
                    <DatePicker
                      selected={firstRaisedDate}
                      onChange={(date) => setFirstRaisedDate(date)}
                    />
                  </div>
                </div>

                <div className="col-xl-3 col-sm-3">
                  <div className="form-group">
                    <label htmlFor="">Grievance Type</label>
                    <select
                      name="grievanceType"
                      id=""
                      className="form-control"
                      value={grievanceType}
                      onChange={(e) => setGrievanceType(e.target.value)}
                    >
                      <option>Choose</option>
                      <option value="Individual">Individual</option>
                      <option value="Collective">Collective</option>
                    </select>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-3">
                  <div className="form-group">
                    <label foo="" className="b-2">
                      Grievance About
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="WorkEnv"
                        id="WorkEnvT"
                        value={workEnvironment}
                        onChange={(e) => setWorkEnvironment(!workEnvironment)}
                        checked={workEnvironment}
                      />
                      <label className="form-check-label" htmlFor="WorkEnvT">
                        Work Environment
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="empRxn"
                        id="empRxnT"
                        value={employeeRtn}
                        onChange={(e) => setEmployeeRtn(!employeeRtn)}
                        checked={employeeRtn}
                      />
                      <label className="form-check-label" htmlFor="empRxnT">
                        Employee Relation
                      </label>
                    </div>
                  </div>
                </div>

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
                      disabled={postBtnState}
                    >
                      Grievance Card <i className="fa fa-arrow-up"></i>
                    </button>
                  </div>

                 {push?pushForward:""}

                </div>
              </div>
             
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};

export default withRouter(NewGrievance);
