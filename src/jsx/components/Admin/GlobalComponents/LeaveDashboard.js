import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";
import DatePicker from "react-datepicker";
import  secureLocalStorage  from  "react-secure-storage"; import { decryptToken} from "./../../../../AppUtility"; import jwt_decode from "jwt-decode";

import "./PayslipCard.css";
import { format } from "date-fns";
const LeaveDashboard = (props) => {
  const [loading, setLoading] = useState(true);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    //get
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    axios
      .get(`${process.env.REACT_APP_API_S_LINK}/leave/getemployeelist`, config)
      .then(function (response) {
        if (response.status === 200) {
          setEmployeeList(response.data.employeeListModels);
          setLoading(false);
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          // =>console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log({ err: err });
        if (err.response !== undefined) {
          // swal("Oh!", err.response.data.message, "error");
          if (err.response.data) {
            swal("Oh!", err.response.data, "error");
          } else if (err.response.data.message) {
            swal("Oh!", err.response.data.message, "error");
          } else {
            swal("Oop!", err.message, "error");
          }
        } else if (err.message) {
          swal("Oh!", err.message, "error");
        } else {
          swal("Oh!", "View Failed", "error");
        }
      });
  }, []);

  const viewLeaveStatus = () => {
    //Init the the req
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };
    let data = {
      EmployeeId: selectedEmployee.value,
      StartDate:  format(startDate, "yyyy'-'MM'-'dd'T'HH':'mm':'ss"),
      EndDate: format(endDate, "yyyy'-'MM'-'dd'T'HH':'mm':'ss"), 
    };
    // axios.get(`${process.env.REACT_APP_API_S_LINK}/staffrequision/getempreqcode/${selectedJob}`, config)
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Proceed",
      icon: "warning",
      dangerMode: true,
    })
      .then((willProcede) => {
        if (willProcede) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/leave/leavestatusdashboard`,
            data,
            config
          );
        }
      })
      .then(function (response) {
        if (response.status === 200) {
          // // =>console.log(response.data);
          props.history.push("/dashboard-list", [{ datum: response.data }]);
        }
      })
      .catch((err) => {
        // swal("Oh!", err.data.message, "error");
        if (err.response !== undefined) {
          // swal("Oh!", err.response.data.message, "error");
          if (err.response.data) {
            swal("Oh!", err.response.data, "error");
          } else if (err.response.data.message) {
            swal("Oh!", err.response.data.message, "error");
          } else {
            swal("Oop!", err.message, "error");
          }
        } else if (err.message) {
          swal("Oh!", err.message, "error");
        } else {
          swal("Oh!", "View Failed", "error");
        }
      });
  };

  const driftButton =
    selectedEmployee !== "" ? (
      <button
        id="job-data-hift"
        className="slide_from_left form-control"
        onClick={viewLeaveStatus}
        style={{ margin: '0rem',}}
      >
        <i className="flaticon-381-enter"></i>
      </button>
    ) : (
      <button id="job-data-hift" className="slide_from_left d-none">
        <i className="flaticon-381-enter"></i>
      </button>
    );

  if (loading) {
    return (
      <>
        <div className="container">
          <div className="headerDiv"></div>
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
        {/* Create new Card */}
        <div className="card rounded-0 border-0 p-3">
          <div className="row ">
            {/* <div className="col-md-3">
              <div className="form-group">
                <label>Manager</label>
                <Select
                  defaultValue={selectedEmployee}
                  onChange={setSelectedEmployee}
                  options={employeeList}
                />
              
              </div>
            </div> */}
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="">Start Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                  }}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label htmlFor="">End Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                  }}
                />
              </div>
            </div>

            <div className="col-md-3">
              <div className="job-data-direction-btn-div">
                {/* <button id="job-data-hift" className="slide_from_left"> 
                  <i className="flaticon-381-enter"></i>
                  </button> */}
                <div className="form-group">
                  <label htmlFor="">Action</label>
                  {driftButton}
                </div>
              </div>
            </div>
            <div className="col-md-6"></div>
            <div className="col-md-6"></div>
          </div>
        </div>
        {/* Requisition List */}
      </div>
    </>
  );
};
export default withRouter(LeaveDashboard);
