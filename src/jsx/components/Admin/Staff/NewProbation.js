import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";

const NewProbation = () => {
  const [loaded, setLoaded] = useState(true);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState({});
  const [selectedMgr, setSelectedMgr] = useState({});
  const [probationTime, setProbationTime] = useState("");
  const [skills, setSkills] = useState("");

  let errorsObj = { employee: "", probationTime: "", skills: "" };
  const [errors, setErrors] = useState(errorsObj);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/createprobationview`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          setLoaded(false);
          setEmployeeList(response.data.employeeListModels);
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          console.log(response.data.message);
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

  const uploadCard = (e) => {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (Object.keys(selectedEmp).length === 0) {
      errorObj.employee = "Employee is Required";
      error = true;
    }
    if (probationTime === "") {
      errorObj.probationTime = "Probation Time is Required";
      error = true;
    }
    if (skills === "") {
      errorObj.skills = "Skills is Required";
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

    let data = {
      EmpID: selectedEmp.value,
      // MgrID: selectedMgr.value,
      SupervisionTime: probationTime,
      ImportantSkills: skills,
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to create Probation",
      icon: "warning",
      buttons: ["No, cancel it", "Yes, I am sure"],
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/storeprobationcreate`,
            data,
            config
          );
        }
      })
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          swal("Success!", "Probation Created", "success");
        }
        if (response.status === 404) {
          alert(response.data.message);
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
  };

  if (loaded) {
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
          <div className="card-header">New Probation Creation Card</div>
          <div className="card-body">
            <div className="row">
              <div className="col-xl-3 col-sm-6">
                <div className="form-control1">
                  <label htmlFor="">Employee</label>
                  <Select
                    defaultValue={selectedEmp}
                    onChange={setSelectedEmp}
                    options={employeeList}
                  />
                  {errors.employee && (
                    <div className="text-danger fs-12">{errors.employee}</div>
                  )}
                </div>
              </div>

              {/* <div className="col-xl-3 col-sm-6">
                <div className="form-control1">
                  <label htmlFor="">Immediate Supervisor</label>
                  <Select
                    defaultValue={selectedMgr}
                    onChange={setSelectedMgr}
                    options={employeeList}
                  />
                </div>
              </div> */}
              <div className="col-xl-6 col-sm-6">
                <div className="form-group">
                  <label htmlFor=""> Probation Duration</label>
                  <input
                    type="text"
                    className="form-control"
                    name="probationTime"
                    placeholder="Enter ther probation duration"
                    value={probationTime}
                    onChange={(e) => setProbationTime(e.target.value)}
                  />
                  {errors.probationTime && (
                    <div className="text-danger fs-12">
                      {errors.probationTime}
                    </div>
                  )}
                </div>
              </div>

              <div className="col-xl-12 col-sm-6">
                <div className="form-group">
                  <label htmlFor=""> Skill</label>
                  <textarea
                    className="form-control"
                    cols="30"
                    rows="1"
                    name="skills"
                    placeholder="What skills are most important for performing this Job (max 240 characters)"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  ></textarea>
                  {errors.skills && (
                    <div className="text-danger fs-12">{errors.skills}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="text-right">
              <button className="btn btn-success" onClick={uploadCard}>
                Post Probation <i className="fa fa-arrow-up"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(NewProbation);
