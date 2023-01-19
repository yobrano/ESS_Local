/* eslint-disable eqeqeq */
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { format } from "date-fns";

const HRNewTrainingNeedsCard = () => {
  const [loading, setLoading] = useState(true);
  const [trainingNeedNo, setTrainingNeedNo] = useState("");
  const [calenderYears, setCalenderYears] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState({});
  const [selectedCalenderYear, setSelectedCalenderYear] = useState({});
  const [tlines, setTline] = useState([
    {
      id: "",
      no: "",
      lineno: "",
      developmentneed: "",
      interventionrequired: "",
      objective: "",
      trainingprovider: "",
      traininglocation: "",
      trainingschedulefrom: new Date(),
      trainingscheduleto: new Date(),
      estimatedcost: "",
      original: false, //Whether its a new addition
    },
  ]);

  let errorsObj = {
    trainingschedulefrom: "",
    trainingscheduleto: "",
    estimatedcost: "",
    interventionrequired: "",
    developmentneed: "",
    objective: "",
    trainingprovider: "",
    traininglocation: "",
    index: "",
  };
  const [errors, setErrors] = useState(errorsObj);
  const [hodComment, setHODComment] = useState("");
  const [hrComment, setHRComment] = useState("");
  const [mfdComment, setMFDComment] = useState("");

  useEffect(() => {
    //initialize a trainning record
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/training/initializetraining/`,
        config
      )

      .then(function (response) {
        if (response.status === 200) {
          // console.log(response.data);
          setTrainingNeedNo(response.data.recid);
          setEmployeeList(response.data.employeeList);
          //getdate
          getCalDate();
          //get training lines
          getTrainingLine(response.data.recid);

          setLoading(false);
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log({ err: err });
        if (err.response !== undefined) {
          swal("Ooh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
      });
  }, []);

  const getCalDate = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/training/getcalenderyears/`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          // console.log(response.data);
          setCalenderYears(response.data.years);
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log({ err: err });
        if (err.response !== undefined) {
          swal("Ooh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
      });
  };

  const getTrainingLine = (rid) => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/training/gettrainingneedlist/${rid}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          setTline(response.data.trainingNeedLines);
          if (Object.keys(response.data.employee).length > 0) {
            setSelectedEmployee(response.data.employee);
          }

          //setup the comments from DB
          setHRComment(response.data.hrComment)
          setMFDComment(response.data.fmdComment)
          setHODComment(response.data.hodComment)
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log({ err: err });
        if (err.response !== undefined) {
          swal("Ooh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
      });
  };
  const updateGeneralData = (e) => {
    e.preventDefault();

    let Data = {
      EID: selectedEmployee.value,
      Name: selectedEmployee.label,
      Calender: selectedCalenderYear.value,
      CalenderLabel: selectedCalenderYear.label,
      PK: trainingNeedNo,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
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
            `${process.env.REACT_APP_API_S_LINK}/training/modifytrainingrecordheader/`,
            Data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          //console.log(response.data);
          swal("Success", response.data.message, "success");
          // setViewAttachmentState(false);
        }
        if (response.status === 404) {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        console.log({ err: err });
        if (err.response !== undefined) {
          swal("Ooh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
      });
  };

  // handle input change
  const handleInputChecklistChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...tlines];
    list[index][name] = value;
    list[index].id = index;
    setTline(list);
  };
  //hande date From input change
  const handleFromDateInputChange = (date, index) => {
    const list = [...tlines];
    list[index]["trainingschedulefrom"] = date;
    list[index].id = index;
    setTline(list);
  };
  //hande date To input change
  const handleToDateInputChange = (date, index) => {
    const list = [...tlines];
    list[index]["trainingscheduleto"] = date;
    list[index].id = index;
    setTline(list);
  };

  // handle cick event of the remove button
  const handleRemoveCheckistClick = (index) => {
    const list1 = [...tlines];
    let _no = list1[index].lineno;
    if (_no !== "") {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userDetails")).idToken
          }`,
        },
      };
      let data = {
        No: list1[index].no,
        Lineno: list1[index].lineno,
        Original: list1[index].original,
      };

      swal({
        title: "Are you sure?",
        text: "Are you sure that you want to delete",
        icon: "warning",
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            return axios.post(
              `${process.env.REACT_APP_API_S_LINK}/training/deletetrainingneedline`,
              data,
              config
            );
          }
        })
        .then((json) => {
          // console.log(json.data);
          list1.splice(index, 1);
          setTline(list1);
          swal("Success!", "Your record has been Deleted!", "success");
        })
        .catch((err) => {
          if (err.response !== undefined) {
            swal("Oh!", err.response.data.message, "error");
          } else {
            swal("Oh!", err.message, "error");
          }
          console.log(err);
          // swal("Oops!", "Seems like we couldn't delete the record", "error");
        });
    } else {
      list1.splice(index, 1);
      setTline(list1);
    }
  };

  //handle click event of the Add button
  const handleAddChecklistClick = () => {
    const list = [...tlines];
    if (list[0] !== undefined) {
      let auxcode = list[0]["lineno"];
      setTline([
        ...tlines,
        {
          id: "",
          no: trainingNeedNo,
          lineno: "",
          developmentneed: "",
          interventionrequired: "",
          objective: "",
          trainingprovider: "",
          traininglocation: "",
          trainingschedulefrom: new Date(),
          trainingscheduleto: new Date(),
          estimatedcost: "",
          original: false,
        },
      ]);
    } else {
      swal("Oh", "Define Training Need No in D365", "error");
    }
  };
  const handlePushChecklistClick = (index) => {
    //Add record to d365
    const list = [...tlines];
    let record = list[index];

    let error = false;
    const errorObj = { ...errorsObj };
    if (record.trainingschedulefrom === "") {
      errorObj.trainingschedulefrom = "Trainingschedulefrom is Required";
      errorObj.index = index;
      error = true;
    }
    if (record.trainingscheduleto === "") {
      errorObj.trainingscheduleto = "Trainingscheduleto is Required";
      errorObj.index = index;
      error = true;
    }
    if (record.estimatedcost === "") {
      errorObj.estimatedcost = "Estimatedcost is Required";
      error = true;
      errorObj.index = index;
    }
    if (record.interventionrequired === "") {
      errorObj.interventionrequired = "Interventionrequired is Required";
      error = true;
      errorObj.index = index;
    }
    if (record.developmentneed === "") {
      errorObj.developmentneed = "Development Need is Required";
      error = true;
      errorObj.index = index;
    }
    if (record.objective === "") {
      errorObj.objective = "objective is Required";
      error = true;
      errorObj.index = index;
    }
    if (record.trainingprovider === "") {
      errorObj.trainingprovider = "Trainingprovider is Required";
      error = true;
      errorObj.index = index;
    }
    if (record.traininglocation === "") {
      errorObj.traininglocation = "Traininglocation is Required";
      error = true;
      errorObj.index = index;
    }

    setErrors(errorObj);
    if (error) {
      return;
    }

    if (record["lineno"] === undefined || record["lineno"] === "") {
      //creating a new record
      let data = {
        No: trainingNeedNo,
        Developmentneed: record.developmentneed,
        Interventionrequired: record.interventionrequired,
        Objective: record.objective,
        Trainingprovider: record.trainingprovider,
        Traininglocation: record.traininglocation,
        TrainingschedulefromDate: new Date(record.trainingschedulefrom),
        TrainingscheduletoDate: new Date(record.trainingscheduleto),
        Estimatedcost: record.estimatedcost.replace(",", ""),

        // Original: record.original,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userDetails")).idToken
          }`,
        },
      };

      swal({
        title: "Are you sure?",
        text: "Are you sure that you want to upload",
        icon: "warning",
        dangerMode: true,
      })
        .then((willUpload) => {
          if (willUpload) {
            return axios.post(
              `${process.env.REACT_APP_API_S_LINK}/training/createtrainingneedline`,
              data,
              config
            );
          }
        })
        .then((json) => {
          console.log(json.data);
          list[index]["lineno"] = json.data.return_value;
          setTline(list);
          swal("Success!", "Your record has been uploaded!", "success");
        })
        .catch((err) => {
          if (err.response !== undefined) {
            swal("Oh!", err.response.data.message, "error");
          } else {
            swal("Oh!", err.message, "error");
          }
          console.log(err);
          // swal("Oops!", "Seems like we couldn't upload the record", "error");
        });
    } else {
      //Update Record
      let data = {
        No: record.no,
        Lineno: record.lineno,
        Developmentneed: record.developmentneed,
        Interventionrequired: record.interventionrequired,
        Objective: record.objective,
        Trainingprovider: record.trainingprovider,
        Traininglocation: record.traininglocation,
        TrainingschedulefromDate: new Date(record.trainingschedulefrom),
        TrainingscheduletoDate: new Date(record.trainingscheduleto),
        Estimatedcost: record.estimatedcost.replace(",", ""),

        Original: record.original,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userDetails")).idToken
          }`,
        },
      };

      swal({
        title: "Are you sure?",
        text: "Are you sure that you want to upload",
        icon: "warning",
        dangerMode: true,
      })
        .then((willUpload) => {
          if (willUpload) {
            return axios.post(
              `${process.env.REACT_APP_API_S_LINK}/training/modifytrainingneedline`,
              data,
              config
            );
          }
        })
        .then((json) => {
          console.log(json.data);
          swal("Success!", "Your record has been uploaded!", "success");
        })
        .catch((err) => {
          console.log(err);
          if (err.response !== undefined) {
            swal("Oh!", err.response.data.message, "error");
          } else {
            swal("Oh!", err.message, "error");
          }
          // swal("Oops!", "Seems like we couldn't upload the record", "error");
        });
    }
  };

  const pushToHODa = (e)=>{
    e.preventDefault();

    let Data = {
      NeedNo: trainingNeedNo,
      HRComment: hrComment,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
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
            `${process.env.REACT_APP_API_S_LINK}/training/pushtrainingneedfromhrtohod/`,
            Data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          //console.log(response.data);
          swal("Success", response.data.message, "success");
          // setViewAttachmentState(false);
        }
        if (response.status === 404) {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        console.log({ err: err });
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
        <div className="card">
          <div className="card-header">
            <h4 className="card-head">General Data</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="">Training Need No.</label>
                  <input
                    type="text"
                    className="form-control"
                    value={trainingNeedNo}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <label htmlFor="">Select Employee</label>
                <Select
                  defaultValue={selectedEmployee}
                  onChange={setSelectedEmployee}
                  options={employeeList}
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="">Calender Year</label>
                <Select
                  defaultValue={selectedCalenderYear}
                  onChange={setSelectedCalenderYear}
                  options={calenderYears}
                />
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button className="btn btn-success" onClick={updateGeneralData}>
              {" "}
              Update <i className="fa fa-arrow-up"></i>
            </button>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h4 className="card-head">Training Needs Line</h4>
          </div>
          <div className="card-body">
            <div className="Lines-set">
              {tlines.map((x3, i3) => (
                <div className="row mx-1" key={i3}>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">Developement Need</label>
                          <textarea
                            className="form-control"
                            id=""
                            rows="1"
                            placeholder="max characters(240)"
                            name="developmentneed"
                            value={x3.developmentneed}
                            onChange={(e) => handleInputChecklistChange(e, i3)}
                          ></textarea>
                          {errors.index == i3 ? (
                            <div className="text-danger fs-12">
                              {errors.developmentneed}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">Objective</label>
                          <textarea
                            className="form-control"
                            id=""
                            rows="1"
                            placeholder="max characters(240)"
                            name="objective"
                            value={x3.objective}
                            onChange={(e) => handleInputChecklistChange(e, i3)}
                          ></textarea>
                          {errors.index == i3 ? (
                            <div className="text-danger fs-12">
                              {errors.objective}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">Proposed Training Provider</label>
                          <textarea
                            className="form-control"
                            id=""
                            rows="1"
                            placeholder="max characters(240)"
                            name="trainingprovider"
                            value={x3.trainingprovider}
                            onChange={(e) => handleInputChecklistChange(e, i3)}
                          ></textarea>
                          {errors.index == i3 ? (
                            <div className="text-danger fs-12">
                              {errors.trainingprovider}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">
                            Training Location &amp; Venue
                          </label>
                          <textarea
                            className="form-control"
                            id=""
                            rows="1"
                            placeholder="max characters(240)"
                            name="traininglocation"
                            value={x3.traininglocation}
                            onChange={(e) => handleInputChecklistChange(e, i3)}
                          ></textarea>
                          {errors.index == i3 ? (
                            <div className="text-danger fs-12">
                              {errors.traininglocation}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">Training Schedule from</label>
                          <DatePicker
                            name="trainingschedulefrom"
                            selected={
                              new Date(
                                x3.trainingschedulefrom.length !== 0
                                  ? x3.trainingschedulefrom
                                  : new Date()
                              )
                            }
                            onChange={(date) =>
                              handleFromDateInputChange(date, i3)
                            }
                          />

                          {errors.index == i3 ? (
                            <div className="text-danger fs-12">
                              {errors.trainingschedulefrom}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">Training Schedule to</label>
                          <DatePicker
                            name="trainingscheduleto"
                            selected={
                              new Date(
                                x3.trainingscheduleto.length !== 0
                                  ? x3.trainingscheduleto
                                  : new Date()
                              )
                            }
                            onChange={(date) =>
                              handleToDateInputChange(date, i3)
                            }
                          />

                          {errors.index == i3 ? (
                            <div className="text-danger fs-12">
                              {errors.trainingscheduleto}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">Estimated Cost</label>
                          <input
                            type="text"
                            className="form-control"
                            id=""
                            placeholder="0.00"
                            name="estimatedcost"
                            value={x3.estimatedcost}
                            onChange={(e) => handleInputChecklistChange(e, i3)}
                          />
                          {errors.index == i3 ? (
                            <div className="text-danger fs-12">
                              {errors.estimatedcost}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="">Intervention Required</label>
                          <select
                            name="interventionrequired"
                            className="form-control"
                            value={x3.interventionrequired}
                            onChange={(e) => handleInputChecklistChange(e, i3)}
                          >
                            <option value="">Choose</option>
                            <option value="Training">Training</option>
                            <option value="Coaching">Coaching</option>
                            <option value="Mentoring">Mentoring</option>
                            <option value="Other">Other</option>
                          </select>
                          {errors.index == i3 ? (
                            <div className="text-danger fs-12">
                              {errors.interventionrequired}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 mb-2">
                    <div className="button-div">
                      <div className="row">
                        {tlines.length !== 1 && (
                          <>
                            <div className="col-4">
                              <button
                                type="button"
                                className="btn btn-danger w-100"
                                onClick={() => handleRemoveCheckistClick(i3)}
                              >
                                Delete <i className="fa fa-trash"></i>
                              </button>
                            </div>
                            <div className="col-4">
                              <button
                                type="button"
                                className="btn btn-success w-100"
                                onClick={() => handlePushChecklistClick(i3)}
                              >
                                Push <i className="fa fa-arrow-up"></i>
                              </button>
                            </div>
                          </>
                        )}
                        {tlines.length - 1 === i3 && (
                          <>
                            <div className="col-4">
                              <button
                                type="button"
                                className="btn btn-info w-100"
                                onClick={handleAddChecklistClick}
                              >
                                Add <i className="fa fa-arrow-down"></i>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label htmlFor="">HR Comment</label>
                  <textarea
                    className="form-control"
                    id=""
                    rows="1"
                    placeholder="max characters(240)"
                    name="hrComment"
                    value={hrComment}
                    onChange={(e) => setHRComment(e.target.value)}
                  ></textarea>
                  {/* {errors.index == i3 ?  (
                            <div className="text-danger fs-12">
                              {errors.hodComment}
                            </div>
                          ):""} */}
                </div>
              </div>
              <div className="col-md-6">
              <label htmlFor="">HOD Comment</label>
                  <textarea
                    className="form-control"
                    id=""
                    rows="1"
                    placeholder="max characters(240)"
                    name="hodComment"
                    value={hodComment}
                    disabled={true}
                  ></textarea>

              </div>
              <div className="col-md-6">
              <label htmlFor="">MD/FD Comment</label>
                  <textarea
                    className="form-control"
                    id=""
                    rows="1"
                    placeholder="max characters(240)"
                    name="mfdComment"
                    value={mfdComment}
                    disabled={true}
                  ></textarea>
              </div>
            </div>
            <button className="btn btn-warning mt-3" onClick={pushToHODa} disabled={false}>
              
              {" "}
              Push to HOD <i className="fa fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(HRNewTrainingNeedsCard);
