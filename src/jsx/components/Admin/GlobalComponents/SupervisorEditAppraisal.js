import axios from "axios";
import { useState } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import  secureLocalStorage  from  "react-secure-storage"; import { decryptToken} from "./../../../../AppUtility"; import jwt_decode from "jwt-decode";

const EditAppraisal = (props) => {
  const [loading, setLoading] = useState(false);
  const [achievedScore, setAchievedScore] = useState("");
  const [empcomm, setEmpcomm] = useState("");
  let errorsObj = { empcomm: "", achievedScore: "" };
  const [errors, setErrors] = useState(errorsObj);

  function uploadD(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (empcomm === "") {
      errorObj.empcomm = "Comment is Required";
      error = true;
    }
    if (achievedScore === "") {
      errorObj.achievedScore = "Achieved score is Required";
      error = true;
    }
    if (achievedScore<0) {
      errorObj.achievedScore = "Achieved score is not Less 0";
      error = true;
    }
    if (achievedScore > parseFloat(props.location.state[0].targetscore)) {
      errorObj.achievedScore =
        "Achieved score is Not greater than the target score";
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
      TargetCode: parseInt(props.location.state[0].targetcode),
      IndicatorCode: parseInt(props.location.state[0].indicatorcode),
      KPICode: parseInt(props.location.state[0].kpicode),
      HeaderNo: props.location.state[0].headerno,
      AchievedScore: parseFloat(achievedScore),
      EmployeeComments: empcomm,
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
            `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/updatesupervisoremployeeappraisal/`,
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
        // =>console.log("catch err:" + err);
        if (err.response !== undefined) {
          swal("Ooh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
      });
  }

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
        <div className="row">
        <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="regDesc" className="label">
                Performance Activity
              </label>
              <textarea
                disabled
                value={props.location.state[0].stdactivity}
                //   onChange={(e) => setReqDescription(e.target.value)}
                rows="2"
                className="form-control"
                placeholder="Content max size 240 character"
              ></textarea>
            </div>
          </div>
        <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="regDesc" className="label">
                Standard Description
              </label>
              <textarea
                disabled
                value={props.location.state[0].standarddesc}
                //   onChange={(e) => setReqDescription(e.target.value)}
                rows="2"
                className="form-control"
                placeholder="Content max size 240 character"
              ></textarea>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="">Target Score</label>
              <input
                type="text"
                className="form-control"
                disabled={true}
                value={props.location.state[0].targetscore}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="">Achieved Score</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                value={achievedScore}
                onChange={(e) => setAchievedScore(e.target.value)}
              />
              {errors.achievedScore && (
                <div className="text-danger fs-12">{errors.achievedScore}</div>
              )}
            </div>
          </div>

      

          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="regDesc" className="label">
                Supervisor Comment
              </label>
              <textarea
                value={empcomm}
                onChange={(e) => setEmpcomm(e.target.value)}
                rows="3"
                className="form-control"
                placeholder="Content max size 240 character"
              ></textarea>
              {errors.empcomm && (
                <div className="text-danger fs-12">{errors.empcomm}</div>
              )}
            </div>
          </div>
        </div>
        <button className="btn btn-warning" onClick={uploadD}>
          Save
        </button>
      </div>
    </>
  );
};

export default withRouter(EditAppraisal);
