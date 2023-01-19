import axios from "axios";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";

const NewPerformanceActivity = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [remarks, setRemarks] = useState("");
  const [activity, setActivity] = useState("");

  let errorsObj = { remarks: "", activity: "" };
  const [errors, setErrors] = useState(errorsObj);

  const uploadData = (e) => {
    e.preventDefault();

    let error = false;
    const errorObj = { ...errorsObj };
    if (remarks === "") {
      errorObj.remarks = "Remark is Required";
      error = true;
    }
    if (activity === "") {
      errorObj.activity = "Activity is Required";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    let udata = {
      HeaderNo: props.location.state[1].cardata[0].headerNo,
      KPICode: parseInt(props.location.state[1].cardata[0].criteriaCode),
      ActivityDescription: activity,
      Remarks: remarks,
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
            `${process.env.REACT_APP_API_S_LINK}/performance/createperformanceactivity/`,
            udata,
            config
          );
        }
      })
      .then(function (response) {
        if (response.status === 200) {
            props.history.go(-2)
        }
      })
      .catch((err) => {
        // console.log("catch err:"+err);
        if (err !== undefined) {
          swal("Ooh!", "Error File not Found", "error");
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
        <h4 className="text-left"> New Performance Activity</h4>
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="">Activity</label>

                  <textarea
                    className="form-control"
                    cols="30"
                    rows="4"
                    placeholder="Activity (max 240 characters)"
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                  ></textarea>
                  {errors.activity && (
                    <div className="text-danger fs-12">{errors.activity}</div>
                  )}
                </div>
              </div>
              <div className="col-12">
                <div className="form-group">
                  <label htmlFor="">Remarks</label>

                  <textarea
                    className="form-control"
                    cols="30"
                    rows="4"
                    placeholder="Remarks (max 240 characters)"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                  ></textarea>
                  {errors.remarks && (
                    <div className="text-danger fs-12">{errors.remarks}</div>
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

export default withRouter(NewPerformanceActivity);
