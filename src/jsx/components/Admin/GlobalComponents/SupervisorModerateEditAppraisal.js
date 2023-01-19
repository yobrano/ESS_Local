import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";

const SupervisorModerateEditAppraisal = (props) => {
  const [loading, setLoading] = useState(false);
  const [achievedScore, setAchievedScore] = useState("");
  const [empcomm, setEmpcomm] = useState("");
  let errorsObj = { empcomm: "", achievedScore: "" };
  const [errors, setErrors] = useState(errorsObj);

  const [supScore,setSupScore]=useState("")
  const [supComment,setSupComment]=useState("")

  useEffect(()=>{
    setSupComment(props.location.state[0].supcomment)
    setSupScore(props.location.state[0].supscore)
  },[])

  function uploadD(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (supComment === "") {
      errorObj.supComment = "Comment is Required";
      error = true;
    }
    if (supScore === "") {
      errorObj.supScore = "Achieved score is Required";
      error = true;
    }
    if (supScore<0) {
      errorObj.supScore = "Achieved score is not Less 0";
      error = true;
    }
    if (supScore > parseFloat(props.location.state[0].targetscore)) {
      errorObj.supScore =
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
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    let udata = {
      TargetCode: parseInt(props.location.state[0].targetcode),
      IndicatorCode: parseInt(props.location.state[0].indicatorcode),
      KPICode: parseInt(props.location.state[0].kpicode),
      HeaderNo: props.location.state[0].headerno,
      AchievedScore: parseFloat(supScore),
      EmployeeComments: supComment,
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
            `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/updatesupervisormoderatedappraisal/`,
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
        console.log("catch err:" + err);
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
              <label htmlFor="">Supervisor Score</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                value={supScore}
                onChange={(e) => setSupScore(e.target.value)}
              />
              {errors.supScore && (
                <div className="text-danger fs-12">{errors.supScore}</div>
              )}
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

          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="regDesc" className="label">
                Supervisor Comment
              </label>
              <textarea
                value={supComment}
                onChange={(e) => setSupComment(e.target.value)}
                rows="3"
                className="form-control"
                placeholder="Content max size 240 character"
              ></textarea>
              {errors.supComment && (
                <div className="text-danger fs-12">{errors.supComment}</div>
              )}
            </div>
          </div>
        </div>
        <button className="btn btn-warning" onClick={uploadD}>
          Upload
        </button>
      </div>
    </>
  );
};

export default withRouter(SupervisorModerateEditAppraisal);
