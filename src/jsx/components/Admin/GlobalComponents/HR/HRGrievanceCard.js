import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { Accordion } from "react-bootstrap";
import "./../NewGrievance.css";
import  secureLocalStorage  from  "react-secure-storage"; import { decryptToken} from "./../../../../../AppUtility"; import jwt_decode from "jwt-decode";

const HRGrievanceCard = (props) => {
  const [loading, setLoading] = useState(true);
  const [selectedEmp, setSelectedEmp] = useState({});
  const [selectedSupervisor, setSelectedSupervisor] = useState({});
  const [currentStage, setCurrentStage] = useState("");
  const [nextStage, setNextStage] = useState("");

  const [approveBtnActuator, setApproveBtnActuator] = useState(false);
  const [uploadBtnActuator, setUploadBtnActuator] = useState(true);

  const [selectedStation, setSelectedStation] = useState({});

  const [hrRemark, setHRRemark] = useState("");
  const [hrReference, setHRReference] = useState("");

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

  const [hosRemark,setHOSRemark] = useState("")
  const [hosReference,setHOSReference] = useState("")

  const [hodRemark,setHODRemark] = useState("")
  const [hodReference,setHODReference] = useState("")

  const [mdRemark,setMDRemark] = useState("")
  const [mdReference,setMDReference] = useState("")

  // const [push,setPush] = useState(false)

  // const [postBtnState ,setPostBtnState] = useState(false)
  const [grievanceNo, setGrievanceNo] = useState("");

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
          // =>console.log(response.data);
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

          setHOSRemark(response.data.grievanceRanksRemarks[0].hoSrem)
          setHOSReference(response.data.grievanceRanksRemarks[0].hoSref)

          setHODRemark(response.data.grievanceRanksRemarks[0].hoDrem)
          setHODReference(response.data.grievanceRanksRemarks[0].hoDref)

          setMDRemark(response.data.grievanceRanksRemarks[0].mDrem)
          setMDReference(response.data.grievanceRanksRemarks[0].mDref)

          setHRReference(response.data.grievanceRanksRemarks[0].hRref)
          setHRRemark(response.data.grievanceRanksRemarks[0].hRrem)

          var stageVar = jwt_decode(decryptToken(secureLocalStorage.getItem("userDetails")));
          if (jwt_decode(decryptToken(secureLocalStorage.getItem("userDetails"))).Role.length > 0) {
            if (
              stageVar.Role === "HR" &&
              response.data.grievancesingle.currentstage === "HR"
            ) {
              setApproveBtnActuator(true);
              setUploadBtnActuator(false);
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

  const uploadGrievance = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    let data = {
      HRrem: hrRemark,
      HRref:hrReference
    };
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
            `${process.env.REACT_APP_API_S_LINK}/grievance/modifyrankremarks/${props.location.state[0].datum[0].gid}`,
            data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data);
          // setPush(true)
          // setGrievanceNo(response.data.gid);
          swal("Success!", "Grievance Card Updated", "success");
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
      text: "Are you sure that you want to Resolve",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        // setPostBtnState(true)
        if (willCreate) {
          return axios.get(
            `${process.env.REACT_APP_API_S_LINK}/grievance/resolvegrievance/${grievanceNo}`,
            // data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data);
          // setPush(true)
          // setGrievanceNo(response.data.return_value);
          swal("Success!", "Grievance Card Resolved", "success");
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

  const Forwardng = (e) => {
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

  let Resolving = (
    <>
      <div className="text-right m-4">
        <button className="btn btn-warning" onClick={Forwardng}>
          Push Next Stage <i className="fa fa-arrow-right"></i>
        </button>
      </div>
      <div className="text-right m-4">
        <button className="btn btn-warning" onClick={Resolve}>
          Resolve Card <i className="fa fa-check"></i>
        </button>
      </div>
    </>
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
                    <div className="col-xl-3 col-sm-6">
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

                    <div className="col-xl-3 col-sm-6">
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
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
                        ></textarea>
                      </div>
                    </div>


                    <div className="col-xl-6 col-sm-6">
                      <div className="form-group">
                        <label htmlFor="">HOS Remark</label>
                        <textarea
                          className="form-control"
                          cols="30"
                          rows="3"
                          name="hosRemark"
                          placeholder="max 240 characters"
                          value={hosRemark}
                          onChange={(e) => setHOSRemark(e.target.value)}
                          disabled
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-xl-6 col-sm-6">
                      <div className="form-group">
                        <label htmlFor="">HOS Refererence</label>
                        <textarea
                          className="form-control"
                          cols="30"
                          rows="3"
                          name="hrReference"
                          placeholder="max 240 characters"
                          value={hosReference}
                          onChange={(e) => setHOSReference(e.target.value)}
                          disabled
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-xl-6 col-sm-6">
                      <div className="form-group">
                        <label htmlFor="">HOD Remark</label>
                        <textarea
                          className="form-control"
                          cols="30"
                          rows="3"
                          name="hodRemark"
                          placeholder="max 240 characters"
                          value={hodRemark}
                          onChange={(e) => setHODRemark(e.target.value)}
                          disabled
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-xl-6 col-sm-6">
                      <div className="form-group">
                        <label htmlFor="">HOD Refererence</label>
                        <textarea
                          className="form-control"
                          cols="30"
                          rows="3"
                          name="hodReference"
                          placeholder="max 240 characters"
                          value={hodReference}
                          onChange={(e) => setHODReference(e.target.value)}
                          disabled
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-xl-6 col-sm-6">
                      <div className="form-group">
                        <label htmlFor="">MD Remark</label>
                        <textarea
                          className="form-control"
                          cols="30"
                          rows="3"
                          name="mdRemark"
                          placeholder="max 240 characters"
                          value={mdRemark}
                          onChange={(e) => setMDRemark(e.target.value)}
                          disabled
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-xl-6 col-sm-6">
                      <div className="form-group">
                        <label htmlFor="">MD Refererence</label>
                        <textarea
                          className="form-control"
                          cols="30"
                          rows="3"
                          name="mdReference"
                          placeholder="max 240 characters"
                          value={mdReference}
                          onChange={(e) => setMDReference(e.target.value)}
                          disabled
                        ></textarea>
                      </div>
                    </div>






                    <div className="col-xl-6 col-sm-6">
                      <div className="form-group">
                        <label htmlFor="">HR Remark</label>
                        <textarea
                          className="form-control"
                          cols="30"
                          rows="3"
                          name="hrRemark"
                          placeholder="max 240 characters"
                          value={hrRemark}
                          onChange={(e) => setHRRemark(e.target.value)}
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-xl-6 col-sm-6">
                      <div className="form-group">
                        <label htmlFor="">HR Refererence</label>
                        <textarea
                          className="form-control"
                          cols="30"
                          rows="3"
                          name="hrReference"
                          placeholder="max 240 characters"
                          value={hrReference}
                          onChange={(e) => setHRReference(e.target.value)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-footer d-md-flex">
                  <div className="text-right m-4">
                    <button
                      className="btn btn-success"
                      onClick={uploadGrievance}
                      disabled={uploadBtnActuator}
                    >
                      Update Card <i className="fa fa-arrow-up"></i>
                    </button>
                  </div>

                  {approveBtnActuator ? Resolving : ""}
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  );
};

export default withRouter(HRGrievanceCard);
