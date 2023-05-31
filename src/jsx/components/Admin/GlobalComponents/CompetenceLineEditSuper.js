import axios from "axios";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import BreadCrumb from "./BreadCrumb";
 
const CompetenceLineEditSuper = (props) => {
  const [loading, setLoading] = useState(true);
  const [supervisorassesment, setSupervisorAssesment] = useState("");
  const [supervisorcomment, setSupervisorcomment] = useState("");
  let errorsObj = { supervisorcomment: "", supervisorassesment: "" };
  const [errors, setErrors] = useState(errorsObj);

  useEffect(()=>{
    setSupervisorAssesment(props.location.state[0].superassesment);
    setSupervisorcomment(props.location.state[0].supercomment);
    setLoading(false)
  },[])

  function uploadD(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (setSupervisorcomment === "") {
      errorObj.setSupervisorcomment = "Comment is Required";
      error = true;
    }
    if (supervisorassesment === "") {
      errorObj.supervisorassesment = "Assesment is Required";
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
        Cno:props.location.state[0].cno,
        Lineno:props.location.state[0].line.toString(),
        Supervisorassesment: supervisorassesment,
        Supervisorcomment: supervisorcomment,
        
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Save",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        // setPostBtnState(true)
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/competence/modifysupervisorcompetenceline/`,
            udata,
            config
          );
        }
      })
      .then(function (response) {
        swal("Success", "The save was successful", "success")
        // swal("Success", response.data.message, "success")
        if (response.status === 200) {
          
          // props.history.go(-1);
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
      {/* <BreadCrumb props={props} backlink={""}/> */}
      <div className="container mb-4">
        <div className="row">

        <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="">Type</label>
              <input
                type="text"
                className="form-control"
                disabled={true}
                value={props.location.state[0].type}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="regDesc" className="label">
               Description
              </label>
              <textarea
                disabled ={true}
                value={props.location.state[0].description}
                //   onChange={(e) => setReqDescription(e.target.value)}
                rows="2"
                className="form-control"
                placeholder="Content max size 240 character"
              ></textarea>
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="">Employee Assesment</label>
              <select  className="form-control" id="assesment" value={props.location.state[0].assesment} disabled={true}>
                <option value="">Choose</option>
                <option value="Never">Never</option>
                <option value="Some of the time">Some of the time</option>
                <option value="Most of the time">Most of the time</option>
                <option value="Always">Always</option>
              </select>
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="regDesc" className="label">
                Employee Comment
              </label>
              <textarea
                value={props.location.state[0].comment}
                disabled={true}
                rows="3"
                className="form-control"
                placeholder="Content max size 240 character"
              ></textarea>
            </div>
          </div>

       
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="">Supervisor Assesment</label>
              <select  className="form-control" id="assesment"  onChange={(e) => setSupervisorAssesment(e.target.value)} value={supervisorassesment}>
                <option value="">Choose</option>
                <option value="Never">Never</option>
                <option value="Some of the time">Some of the time</option>
                <option value="Most of the time">Most of the time</option>
                <option value="Always">Always</option>
              </select>
              {errors.supervisorassesment && (
                <div className="text-danger fs-12">{errors.supervisorassesment}</div>
              )}
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="regDesc" className="label">
                Supervisor Comment
              </label>
              <textarea
                value={supervisorcomment}
                onChange={(e) => setSupervisorcomment(e.target.value)}
                rows="3"
                className="form-control"
                placeholder="Content max size 240 character"
              ></textarea>
              {errors.supervisorcomment && (
                <div className="text-danger fs-12">{errors.supervisorcomment}</div>
              )}
            </div>
          </div>
        </div>

        <div className="d-flex">
        <button className="btn btn-warning" onClick={uploadD}>
          Save Evaluation
        </button>
        <button
          className="btn btn-success ml-auto"
          onClick={() => props.history.go(-1)}
        >
          Go Back One Step
        </button>
        </div>
      
      </div>
    </>
  );
};

export default withRouter(CompetenceLineEditSuper);
