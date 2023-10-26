import axios from "axios";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";
import DatePicker from "react-datepicker";
import  secureLocalStorage  from  "react-secure-storage"; import { decryptToken} from "./../../../../AppUtility"; import jwt_decode from "jwt-decode";

const NewPerformanceStandard = (props) => {
  const [loading, setLoading] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState({});
  const [stddescription, setStddescription] = useState("");
  const [targetscore, setTargetscore] = useState(0);
  const [targetdate, setTargetdate] = useState(new Date());

  let errorsObj = { stddescription: "", targetscore: "",selectedActivity:"",targetdate:"" };
  const [errors, setErrors] = useState(errorsObj);

  const uploadData = (e) => {
    e.preventDefault();

    let error = false;
    const errorObj = { ...errorsObj };
    if (stddescription === "") {
      errorObj.stddescription = "Description is Required";
      error = true;
    }
    if (targetscore === 0 || targetscore === "") {
      errorObj.targetscore = "Cannot be less or equal zero and or Blank";
      error = true;
    }

    if (targetdate ==="") {
      errorObj.targetdate = "Date must not be less than today";
      error = true;
    }


    setErrors(errorObj);
    if (error) {
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    let udata = {
      ActivityCode:parseInt(selectedActivity.criteriaCode),
      HeaderNo: selectedActivity.headerNo,
      StandardDescription: stddescription,
      
      TargetCode:parseInt(selectedActivity.targetCode),
      TargetScore:parseFloat(targetscore),
      Timelines:targetdate,

     
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
            `${process.env.REACT_APP_API_S_LINK}/performance/createperformancestandard/`,
            udata,
            config
          );
        }
      })
      .then(function (response) {
        if (response.status === 200) {
          props.history.go(-1);
        }
      })
      .catch((err) => {
        // =>console.log("catch err:"+err);
        if (err !== undefined) {
          swal("Ooh!", "Error", "error");
        }
        if (err.response !== undefined) {
          swal("Ooh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
      });
  };
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
        <h4 className="text-center my3"> New Performance Standard</h4>
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-12">
                <label className="my-2">Select Activity</label>
                <Select
                  defaultValue={selectedActivity}
                  onChange={setSelectedActivity}
                  options={props.location.state[1].cardata}
                />
                 {errors.selectedActivity && (
                    <div className="text-danger fs-12">
                      {errors.selectedActivity}
                    </div>
                  )}
              </div>

              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="">Standard Description</label>

                  <textarea
                    className="form-control"
                    cols="30"
                    rows="4"
                    placeholder="Remarks (max 240 characters)"
                    value={stddescription}
                    onChange={(e) => setStddescription(e.target.value)}
                  ></textarea>
                  {errors.stddescription && (
                    <div className="text-danger fs-12">
                      {errors.stddescription}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Target Score</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-control"
                    value={targetscore}
                    onChange={(e) => setTargetscore(e.target.value)}
                  />
                  {errors.targetscore && (
                    <div className="text-danger fs-12">
                      {errors.targetscore}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-control1">
                  <label htmlFor="">Target Date</label>
                  <DatePicker
                    selected={targetdate}
                    onChange={(date) => setTargetdate(date)}
                  />
                    {errors.targetdate && (
                    <div className="text-danger fs-12">
                      {errors.targetdate}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-12">
                <button
                  className="btn btn-warning rounded-0"
                  onClick={uploadData}
                >
                  {" "}
                  Upload and Go Back <i className="fa fa-rotate-left"></i>{" "}
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <h4 className="text-left">Activity List</h4>
            <div className="table-responsive">
              <table
                id="example"
                className="display w-100 dataTable table"
                role="grid"
                aria-describedby="example_info"
              >
                <thead className="thead-light">
                  <tr>
                    <th>Activity Code</th>
                    <th>Performance Activity</th>
                    <th>Activity Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {props.location.state[1].cardata.map((d, i) => (
                    <tr key={i}>
                      <td>{d.activitycode}</td>
                      <td>{d.activityDescription}</td>
                      <td>{d.activityWeighting}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(NewPerformanceStandard);
