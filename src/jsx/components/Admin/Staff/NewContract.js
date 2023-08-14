import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";

const NewContract = () => {
  const [loaded, setLoaded] = useState(true);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState({});
  const [selectedMgr, setSelectedMgr] = useState({});
  const [probationTime, setProbationTime] = useState("");
  const [howLong, setHowlong] = useState("");
  const [doRenew, setDoRenew] = useState("");
  const [renewReason, setRenewReason] = useState("");
  const [superVisionTime, setSuperVisionTime] = useState("");

  let errorsObj = {
    staff: "",
    supervisiontime: "",
    dorenew: "",
    howlong: "",
    renewreason: "",
  };
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
      errorObj.staff = "Staff is Required";
      error = true;
    }
    if (superVisionTime === "") {
      errorObj.supervisiontime = "Supervision time is Required";
      error = true;
    }
    if (doRenew === "") {
      errorObj.dorenew = "Do Renew is Required";
      error = true;
    }
    if (howLong === "") {
      errorObj.howlong = "Renew Duration is Required";
      error = true;
    }
    if (renewReason === "") {
      errorObj.renewreason = "Renew Reason is Required";
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
      SupervisionTime: superVisionTime,
      DoRenew: doRenew,
      Howlong: howLong,
      RenewReason: renewReason,
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to create Contract",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/storeendofcontractcreate`,
            data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          swal("Success!", "Contract Created", "success");
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
          <div className="card-header">New Contract Creation Card</div>
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
                  {errors.staff && (
                    <div className="text-danger fs-12">{errors.staff}</div>
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
              <div className="col-xl-12 col-sm-6">
                <div className="form-group">
                  <label htmlFor=""> How long have you supervised</label>
                  <textarea
                    className="form-control"
                    cols="30"
                    rows="3"
                    name="Howlongs"
                    placeholder="How long have you been supervising this employee? (max 240 characters)"
                    value={superVisionTime}
                    onChange={(e) => setSuperVisionTime(e.target.value)}
                  ></textarea>
                  {errors.supervisiontime && (
                    <div className="text-danger fs-12">{errors.supervisiontime}</div>
                  )}
                </div>
              </div>
              <div className="col-xl-3 col-sm-3">
                <div className="form-group">
                  <label htmlFor="">Do we renew the contract?</label>
                  <select
                    name="qualifiedForPromo"
                    id=""
                    className="form-control"
                    onChange={(e) => setDoRenew(e.target.value)}
                  >
                    <option>Choose</option>
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                  </select>
                  {errors.dorenew && (
                    <div className="text-danger fs-12">{errors.dorenew}</div>
                  )}
                </div>
              </div>

              <div className="col-xl-3 col-sm-3">
                <div className="form-group">
                  <label htmlFor="">If yes, for how long?</label>
                  <select
                    name="qualifiedForPromo"
                    id=""
                    className="form-control"
                    onChange={(e) => setHowlong(e.target.value)}
                  >
                    <option>Choose</option>
                    <option value="1 Month">1 Months</option>
                    <option value="3 Months">3 Months</option>
                    <option value="6 Months">6 Months</option>
                    <option value="12 Months">12 Months</option>
                    <option value="24 Months">24 Months</option>
                    <option value="36 Months">36 Months</option>
                  </select>
                  {errors.howlong && (
                    <div className="text-danger fs-12">{errors.howlong}</div>
                  )}
                </div>
              </div>

              <div className="col-xl-6 col-sm-6">
                <div className="form-group">
                  <label htmlFor="">Reason for renewal</label>
                  <input
                    type="text"
                    className="form-control"
                    name="probationTime"
                    placeholder="Reason(s) for renewal/non-renewal"
                    value={renewReason}
                    onChange={(e) => setRenewReason(e.target.value)}
                  />
                  {errors.renewreason && (
                    <div className="text-danger fs-12">
                      {errors.renewreason}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="text-right">
              <button className="btn btn-success" onClick={uploadCard}>
                Post Contract <i className="fa fa-arrow-up"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(NewContract);
