import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import  secureLocalStorage  from  "react-secure-storage"; import { decryptToken} from "./../../../../AppUtility"; import jwt_decode from "jwt-decode";
import "./Requisition.css";
const EmployeeRequision = (props) => {
  const [loading, setLoading] = useState(true);
  //   const [jobs,setJobs] = useState({jobs:[],jreq:[]})
  const [jobList, setJobList] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");

  useEffect(() => {
    //get existing Jobs
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    axios
      .get(`${process.env.REACT_APP_API_S_LINK}/staffrequision/jobslist`, config)
      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data);
          setJobList(response.data)
          populateReqList();
          setLoading(false)
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

  const populateReqList = () => {};
  const viewmoreOfReqDataRequirement = ()=>{
    //Init the the req
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    axios
      .get(`${process.env.REACT_APP_API_S_LINK}/staffrequision/getempreqcode/${selectedJob}`, config)
      .then(function (response) {
        if (response.status === 200) {
          return props.history.push("/employee-requisition-card", [{ empReqNo: response.data,jobNo:selectedJob}]);
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
  }

  const driftButton = (
    selectedJob !== ""?(
        <button id="job-data-hift" className="slide_from_left" onClick={viewmoreOfReqDataRequirement}> 
        <i className="flaticon-381-enter"></i>
        </button>
    ):(
        <button id="job-data-hift" className="slide_from_left d-none"> 
        <i className="flaticon-381-enter"></i>
        </button>
    )
  )


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
        <div className="card rounded-0">
          <div className="row">
            <div className="col-md-6">
            <div className="form-group w-75 ml-5 my-5">
            <label>Jobs</label>
              <select
              className="form-control"
                aria-label="job select "
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
              >
                <option value={""}>select..</option>
                {jobList.map((d, k) => (
                  <option value={d.No} key={k}>
                    {d.Title}
                  </option>
                ))}
              </select>
            </div>
          
            </div>
            <div className="col-md-6">
              <div className="job-data-direction-btn-div w-75 ml-5">
                {/* <button id="job-data-hift" className="slide_from_left"> 
                <i className="flaticon-381-enter"></i>
                </button> */}
                {driftButton}
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
export default withRouter(EmployeeRequision);
