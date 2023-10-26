import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";
import DatePicker from "react-datepicker";
import  secureLocalStorage  from  "react-secure-storage"; import { decryptToken} from "./../../../../AppUtility"; import jwt_decode from "jwt-decode";

const HRExitInterview = (props) => {
  const [loading, setLoading] = useState(true);
  const [employeeList, setEmployeeList] = useState([]);
  const [groundsepList, setGroundsepList] = useState([]);

  const [selectedEmp, setSelectedEmp] = useState("");
  const [inteviewDate, setInterviewDate] = useState(new Date());
  const [selectedInterviewer, setSelectedInterviewer] = useState("");
  const [selectedGroundsSep, setSelectedGroundsSep] = useState("");
  const [reasonForLeaving, setReasonForLeaving] = useState("");
  const [separationDate, setSeparationDate] = useState(new Date());
  const [reEmploy, setReEmploy] = useState("");

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
        `${process.env.REACT_APP_API_S_LINK}/home/createexitinterview`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data);
          setLoading(false);
          setEmployeeList(response.data.employeeListModels);
          setGroundsepList(response.data.separationGrounds);
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          // =>console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log({ err: err });
        swal("Oh!", err.data.message, "error");
      });
  }, []);

  const uploadCard = () => {
   
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    let data = {
      EID: selectedEmp.value,
      InterviewDate: inteviewDate,
      Interviewer: selectedInterviewer.value,
      SeparationGround: selectedGroundsSep.value,
      OtherReason: reasonForLeaving,
      SeparationDate: separationDate,
      Reemploy: reEmploy,
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to create Exit interview",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/home/postexitinterview`,
            data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data);
          swal("Success!", "Exit Interview Application Created", "success");
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
        <div className="card rounded-0">
          <div className="card-header">Exit Interview Creation Card</div>
          <div className="card-body">
            <div className="row">
              <div className="col-xl-4 col-sm-6">
                <div className="form-control1">
                  <label htmlFor="">Employee</label>
                  <Select
                    defaultValue={selectedEmp}
                    onChange={setSelectedEmp}
                    options={employeeList}
                    // className="form-control"
                  />
                </div>
              </div>
              <div className="col-xl-4 col-sm-6">
                <div className="form-control1">
                  <label htmlFor="">Interview Date</label>

                  <DatePicker
                    selected={inteviewDate}
                    onChange={(date) => setInterviewDate(date)}
                  />
                </div>
              </div>
              <div className="col-xl-4 col-sm-6">
                <label htmlFor="">Interview Done By</label>
                <Select
                  defaultValue={selectedInterviewer}
                  onChange={setSelectedInterviewer}
                  options={employeeList}
                  // className="form-control"
                />
              </div>

              <div className="col-xl-4 col-sm-6">
                <label htmlFor="">Grounds for Separation</label>
                <Select
                  defaultValue={selectedGroundsSep}
                  onChange={setSelectedGroundsSep}
                  options={groundsepList}
                  // className="form-control"
                />
              </div>

              <div className="col-xl-4 col-sm-6">
                <div className="form-group">
                  <label htmlFor="">Reason for leaving (Other) </label>
                  <textarea
                    className="form-control w-100"
                    name="reasonForLeaving"
                    id=""
                    value={reasonForLeaving}
                    onChange={(e) => setReasonForLeaving(e.target.value)}
                    cols="30"
                    rows="1"
                    placeholder="Reason for Leaving Max Character 250"
                  ></textarea>
                </div>
              </div>

              <div className="col-xl-4 col-sm-6">
                <div className="form-control1">
                  <label htmlFor="">Separation Date</label>

                  <DatePicker
                    selected={separationDate}
                    onChange={(date) => setSeparationDate(date)}
                  />
                </div>
              </div>

              <div className="col-xl-4 col-sm-6">
                {/* <div className="col-md-4"> */}
                <label htmlFor=""> Re-Employ in the Future</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="typeOfWork"
                    id="typeOfWork1"
                    value="TRUE"
                    onChange={(e) => setReEmploy(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="typeOfWork1">
                    YES
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="typeOfWork"
                    id="typeOfWork2"
                    value="FALSE"
                    onChange={(e) => setReEmploy(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="typeOfWork2">
                    NO
                  </label>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
          <div className="card-footer">
              <div className="text-right">
                  <button className="btn btn-success" onClick={uploadCard}>
                      Post and Push to Employee <i className="fa fa-arrow-up"></i>
                  </button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(HRExitInterview);
