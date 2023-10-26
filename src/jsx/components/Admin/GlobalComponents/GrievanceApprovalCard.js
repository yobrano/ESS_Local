import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { Accordion } from "react-bootstrap";
import "./NewGrievance.css";
import  secureLocalStorage  from  "react-secure-storage"; import { decryptToken} from "./../../../../AppUtility"; import jwt_decode from "jwt-decode";

const GrievanceApprovalCard = (props) => {
  const [loading, setLoading] = useState(true);
  const [selectedEmp, setSelectedEmp] = useState({});
  const [selectedSupervisor, setSelectedSupervisor] = useState({});
  const [currentStage, setCurrentStage] = useState("");
  const [nextStage, setNextStage] = useState("");

  const [approveBtnActuator, setApproveBtnActuator] = useState(false);
  const [uploadBtnActuator, setUploadBtnActuator] = useState(false);

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
  const [generalRemark, setGeneralRemark] = useState("");

  // const [push,setPush] = useState(false)

  // const [postBtnState ,setPostBtnState] = useState(false)
  const [grievanceNo, setGrievanceNo] = useState("");
  const [genRemarkList, setGenRemarkList] = useState({});

  const [employeeList, setEmployeeList] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState({});
  const [selectedRecipientRank, setSelectedRecipientRank] = useState("");
  const [cycleTwoComment, setCycleTwoComment] = useState("");



  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
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
          // =>console.log(response.data.grievanceRanksRemarks);
          setLoading(false);

          setSelectedEmp(response.data.grievancesingle.employeename);
          setSelectedSupervisor(response.data.grievancesingle.supervisorname);
          setCurrentStage(response.data.grievancesingle.currentstage);
          setNextStage(response.data.grievancesingle.nextstage);
          setSubject(response.data.grievancesingle.subject);
          setGrievanceDescription(response.data.grievancesingle.description);
          setStepTaken(response.data.grievancesingle.stepTaken);
          setOutCome(response.data.grievancesingle.outcome);
          setCommEnt(response.data.grievancesingle.comment);
          setRecommendAtion(response.data.grievancesingle.recommendation);
          setGenRemarkList(response.data.grievanceRanksRemarks[0]);
          setEmployeeList(response.data.employeeList);

          var stageVar = JSON.parse(secureLocalStorage.getItem("userDetails"));
          if (JSON.parse(secureLocalStorage.getItem("userDetails")).user.length > 0) {
            if (stageVar.user[0] === "NORMAL" && currentStage === "Employee") {
              // setApproveBtnActuator(true);
              // setUploadBtnActuator(false);
            }
          }
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          // =>console.log(response.data.message);
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

  const PushRecommendations = (e) => {
    e.preventDefault();
    setUploadBtnActuator(true);
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    let data = {
      GID: props.location.state[0].datum[0].gid,
      NextStageStaff: props.location.state[0].datum[0].employeeno,
      StepTaken: stepTaken,
      Outcome: outCome,
      Comment: commEnt,
      Recommendation: recommendAtion,
      GeneralRemark: generalRemark,
    };
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Complete the Grievance",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        // setPostBtnState(true)
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/grievance/uploadprogressonecycleone`,
            data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          setUploadBtnActuator(false);
          swal("Success!", "Grievance Completed", "success");
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
  };
  const Resolve = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
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
          // =>console.log(response.data);
          // setPush(true)
          setGrievanceNo(response.data.return_value);
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
  };

  const ApproveFn = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    // let data ={
    //   EmpID:selectedEmp.value,

    // }
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Approve",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        // setPostBtnState(true)
        if (willCreate) {
          return axios.get(
            `${process.env.REACT_APP_API_S_LINK}/grievance/resolvegrievance/${props.location.state[0].datum[0].gid}`,
            // data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data);
          // setPush(true)
          setGrievanceNo(response.data.return_value);
          swal("Success!", "Grievance Card Approved", "success");
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
  };

  const UnresolvedFn = (e) => {
    e.preventDefault();
    if(cycleTwoComment === "" || nextStage === "" || selectedRecipient.value === undefined){
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    let data ={
      GID:props.location.state[0].datum[0].gid,
      CycletwoInitreason: cycleTwoComment,
      NextStage:selectedRecipientRank,
      NextStageStaff: selectedRecipient.value
    }
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Submit",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        // setPostBtnState(true)
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/grievance/uploadprogressthreecycletwo/`,
            data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data);
          // setPush(true)
          setGrievanceNo(response.data.return_value);
          swal("Success!", "Grievance Card Submited", "success");
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
  };

  let Approve = "";
  let Reject = "";
  let CycleTwoEntries = false;
  let CompleteProcessBtn = "";
  let GeneralRemarkTextAreaField = "col-xl-12 col-sm-12";
  let GeneralRemarListDisp = "col-xl-12 col-sm-12 d-none";
  let IncaseOfUnresolved = "card-body incase-of-unresolve"
  if (props.location.state[0].datum[0].progressNo === 2) {
    CycleTwoEntries = true;
    GeneralRemarkTextAreaField = "col-xl-12 col-sm-12 d-none";
    GeneralRemarListDisp = "col-xl-12 col-sm-12";
    Approve = (
      <>
        <button className="btn btn-warning" onClick={ApproveFn}>
          Mark as Resolved <i className="fa fa-arrow-up"></i>
        </button>
        <button className="btn btn-danger ml-1" onClick={UnresolvedFn}>
          Mark as Un-Resolved <i className="fa fa-arrow-right"></i>
        </button>
      </>
    );
  } else if (props.location.state[0].datum[0].progressNo === 1) {
    IncaseOfUnresolved = "d-none"
    CompleteProcessBtn = (
      <>
        <button
          className="btn btn-success"
          onClick={PushRecommendations}
          disabled={uploadBtnActuator}
        >
          Complete the Process <i className="fa fa-arrow-up"></i>
        </button>
      </>
    );
  }

  let Resolving = (
    <div className="text-right my-4">
      <button className="btn btn-warning" onClick={Resolve}>
        Resolve <i className="fa fa-arrow-up"></i>
      </button>
    </div>
  );

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
                    <div className="col-xl-4 col-sm-6">
                      <div className="form-group">
                        <label htmlFor="">Employee</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedEmp}
                          disabled
                        />
                      </div>
                    </div>

                    <div className="col-xl-4 col-sm-6">
                      <div className="form-group">
                        <label htmlFor="">Supervisor</label>
                        <input
                          type="text"
                          className="form-control"
                          value={selectedSupervisor}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-xl-4 col-sm-3">
                      <div className="form-group">
                        <label htmlFor="">Current Stage</label>
                        <input
                          type="text"
                          className="form-control"
                          name="currentStage"
                          placeholder=""
                          value={nextStage}
                          // onChange={(e) => setCurrentStage(e.target.value)}
                          disabled
                        />
                      </div>
                    </div>
                    {/* <div className="col-xl-3 col-sm-3">
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
                    </div> */}
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
                          disabled={true}
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
                          onChange={(e) =>
                            setGrievanceDescription(e.target.value)
                          }
                          disabled={true}
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
                    <div className={GeneralRemarkTextAreaField}>
                      <div className="form-group">
                        <label htmlFor="">General Remark</label>
                        <textarea
                          className="form-control"
                          cols="30"
                          rows="3"
                          name="generalRemark"
                          placeholder="max 240 characters"
                          value={generalRemark}
                          onChange={(e) => setGeneralRemark(e.target.value)}
                          
                        ></textarea>
                      </div>
                    </div>

                    <div className={GeneralRemarListDisp}>
                      <div className="table-responsive">
                        <table
                          id="example"
                          className="display w-100 dataTable table"
                          role="grid"
                          aria-describedby="example_info"
                        >
                          <thead className="thead-light">
                            <tr>
                              {/* <th>Rank</th> */}
                              <th>Employee</th>
                              <th>Comment</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr key={1}>
                              {/* <td>HR</td> */}
                              <td>{genRemarkList.hRref}</td>
                              <td>{genRemarkList.hRrem}</td>
                            </tr>
                            <tr key={2}>
                              {/* <td>HOD</td> */}
                              <td>{genRemarkList.hoDref}</td>
                              <td>{genRemarkList.hoDrem}</td>
                            </tr>
                            <tr key={3}>
                              {/* <td>MD</td> */}
                              <td>{genRemarkList.mDref}</td>
                              <td>{genRemarkList.mDrem}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                </div>
                <div className={IncaseOfUnresolved}>
                  <h6>Incase of Unresolved Case</h6>
                  <div className="row">
                  <div className="col-xl-6 col-sm-6">
                      <div className="form-group">
                        <label htmlFor="">Next Stage Rank</label>
                        <select
                          name="qualifiedForPromo"
                          id=""
                          className="form-control"
                          onChange={(e) => setSelectedRecipientRank(e.target.value)}
                        >
                          <option value="">Choose</option>
                          {/* <option value="Employee">Employee</option> */}
                          <option value="Supervisor">Supervisor</option>
                          <option value="HOD">HOD</option>
                          <option value="HR">HR</option>
                          <option value="HEAD-HR">HEAD HR</option>
                          <option value="MD">MD</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-xl-6 col-sm-6">
                      <div className="form-group">
                        <label htmlFor="">Next Stage Staff</label>
                        <Select
                          defaultValue={selectedRecipient}
                          onChange={setSelectedRecipient}
                          options={employeeList}
                        />
                      </div>
                    </div>
                    <div className="col-xl-12 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="">Reason For Rejection Informal Process Resolution</label>
                        <textarea
                          className="form-control"
                          cols="30"
                          rows="3"
                          name="cycleTwoComment"
                          placeholder="max 240 characters"
                          value={cycleTwoComment}
                          onChange={(e) => setCycleTwoComment(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <div className="text-right">
                    {CompleteProcessBtn} {Approve}
                  </div>

                  {/* {approveBtnActuator ? Resolving : ""} */}
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};

export default withRouter(GrievanceApprovalCard);
