import axios from "axios";
import React, { useState, useRef, useEffect, useMemo, forwardRef } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";

const HODHRClearanceCard = (props) => {
  const [loading, setLoading] = useState(true);

  const [supportingfile, setSupportingfile] = useState("");
  const [progressStatus, setProgressStatus] = useState(0);

  const [groupedClearanceEmp, setGroupedClearanceEmp] = useState([
    {
      id: "",
      clearance: "",
      clearanceno: "",
      clearedby: "",
      dept: "",
      designation: "",
      items: "",
      lineno: "",
      remarks: "",
      value: "",
      kalue: "0",
      annualLeaveDays: "0",
      balDays: "0",
      annualDaysLess: "0",
      Year: "",
    },
  ]);

  const [redirectData, setRedirectData] = useState({});
  const [accessOwnDept, setAccessOwnDept] = useState(false);
  // handle input change
  const handleInputChecklistChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...groupedClearanceEmp];
    list[index][name] = value;
    list[index].id = index;
    setGroupedClearanceEmp(list);
  };

  // handle cick event of the remove button

  const handleRemoveCheckistClick = (index) => {
    const list1 = [...groupedClearanceEmp];
    // list1.splice(index, 1);
    // setGroupedClearanceEmp(list1);

    let _no = list1[index].lineno;
    if (_no !== "") {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userDetails")).idToken
          }`,
        },
      };

      swal({
        title: "Are you sure?",
        text: "Are you sure that you want to delete",
        icon: "warning",
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            return axios.get(
              `${process.env.REACT_APP_API_S_LINK}/home/hoddeleteline/${_no}`,
              //   data,
              config
            );
          }
        })
        .then((json) => {
          // console.log(json.data);
          list1.splice(index, 1);
          setGroupedClearanceEmp(list1);
          swal("Success!", "Your record has been Deleted!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't delete the record", "error");
        });
    } else {
      list1.splice(index, 1);
      setGroupedClearanceEmp(list1);
    }
  };

  //   handle click event of the Add button

  const handleAddChecklistClick = () => {
    const list = [...groupedClearanceEmp];
    if (list[0] !== undefined) {
      setGroupedClearanceEmp([
        ...groupedClearanceEmp,
        {
          id: "",
          clearance: "",
          clearanceno: "",
          clearedby: "",
          dept: "HR",
          designation: "",
          items: "",
          lineno: "",
          remarks: "",
          value: "",
          kalue: "0",
          annualLeaveDays: "0",
          balDays: "0",
          annualDaysLess: "0",
          Year: "",
        },
      ]);
    } else {
      swal("Oh", "Define Qualification Code in D365", "error");
    }
  };

  const handlePushChecklistClick = (index) => {
    //Add record to d365

    const list = [...groupedClearanceEmp];
    let record = list[index];
    let _code = list[0]["clearanceno"];
    if (
      list[0]["clearanceno"] === undefined ||
      list[0]["clearanceno"] === "" ||
      record.clearanceno === "" 
    ) {
      //means its the first row
      let data = {
        id: record.id,
        clearance: record.clearance,
        clearanceno: props.location.state[0].datum[0].clearanceNo,
        clearedby: "",
        dept: "HR",
        designation: record.designation,
        items: record.items,
        lineno: record.lineno,
        remarks: record.remarks,
        value: record.value,
        kalue: record.kalue,
        annualLeaveDays: record.annualLeaveDays,
        balDays: record.balDays,
        annualDaysLess: record.annualDaysLess,
        Year: record.Year,
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
              `${process.env.REACT_APP_API_S_LINK}/home/hodhrpushclearancelines`,
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
          if(err.response!==undefined){
            swal("Oh!", err.response.data.message, "error");
          }else{
            swal("Oh!", err.message, "error");
          }
          console.log(err);

          // swal("Oops!", "Seems like we couldn't upload the record", "error");
        });
    } else {
      let data = {
        id: record.id,
        clearance: record.clearance,
        clearanceno: record.clearanceno,
        clearedby: "",
        dept: record.dept,
        designation: record.designation,
        items: record.items,
        lineno: record.lineno,
        remarks: record.remarks,
        value: record.value,
        kalue: record.kalue,
        annualLeaveDays: record.annualLeaveDays,
        balDays: record.balDays,
        annualDaysLess: record.annualDaysLess,
        Year: record.Year,
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
        text: "Are you sure that you want to update",
        icon: "warning",
        dangerMode: true,
      })
        .then((willUpload) => {
          if (willUpload) {
            return axios.post(
              `${process.env.REACT_APP_API_S_LINK}/home/hodhrupdateclearanceline`,
              data,
              config
            );
          }
        })
        .then((json) => {
          swal("Success!", "Your record has been uploaded!", "success");
          console.log(json.data);
        })
        .catch((err) => {
          swal("Oops!", "Seems like we couldn't upload the record", "error");
          console.log(err);
        });
    }
  };

  const onChangeSupportingDoc = (e) => {
    setSupportingfile(e.target.files[0]);
  };
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
        `${process.env.REACT_APP_API_S_LINK}/home/hodhrgetcardclearancedata/${props.location.state[0].datum[0].clearanceNo}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data.clearanceFullFormAdmin);

          setGroupedClearanceEmp(response.data.clearanceFullFormAdmin);
          setRedirectData(props.location.state[0].datum[0]);

          setLoading(false);
          setProgressStatus(props.location.state[0].datum[0].progressFlag);
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log({ err: err });
        if(err.response!==undefined){
          swal("Oh!", err.response.data.message, "error");
        }else{
          swal("Oh!", err.message, "error");
        }
      });
  }, []);

  const pushToHODFIN = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Push",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.get(
            `${process.env.REACT_APP_API_S_LINK}/home/hodhrupdateclearancerecord/${props.location.state[0].datum[0].id}`,
            //   data,
            config
          );
        }
      })
      .then((json) => {
        console.log(json.data);
        swal("Success!", "Your record has been Pushed", "success");
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", "Seems like we couldn't Push the record", "error");
      });
  };

  let zeroPro = (
    <button className="btn btn-warning rounded-0 w-100" onClick={pushToHODFIN}>
      Approve HR Dept Clearance <i className="fa fa-user"></i>
    </button>
  );
  let onePro = (
    <button disabled className="btn btn-secondary rounded-0 ">
      Under HR Approval <i className="fa fa-user"></i>
    </button>
  );
  let pushinBtn = "";

  if (progressStatus === 1) {
    pushinBtn = zeroPro;
  }
  // else if (progressStatus === 1) {
  //   pushinBtn = onePro;
  // }
  let viewTag = "col-md-4";
  if (props.location.state[0].datum[0].hodhrApproved === "TRUE") {
    viewTag = "col-md-4 d-none";
  }

  let hrAccessOwnDepartment = () => {
    setAccessOwnDept(true);
  };
  let pushToHROwnUser = "";

  let ownDep = (
    <button
      className="btn btn-danger rounded-0 "
      onClick={hrAccessOwnDepartment}
    >
      Employee's Own Department <i className="fa fa-user"></i>
    </button>
  );

  if (props.location.state[0].datum[0].progressStartFlag === 4) {
    pushToHROwnUser = ownDep;
  }
  if (accessOwnDept) {
    props.history.push("/HODHR-own-dept", [{ datum: redirectData }]);
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
      <div className="row">
        <div className="col-md-12">
          <div className="card-footer0">
            <div className="row">
              <div className="col-md-4">
                <div className="d-flex flex-column justify-content-start">
                  <label htmlFor=""> Action</label>
                  <div className="button-div d-flex my-3">
                    {pushToHROwnUser}
                  </div>
                </div>
              </div>
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <div className="d-flex flex-column">
                  <label htmlFor=""> Action</label>
                  <div className="button-div d-flex my-3">{pushinBtn}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="card ">
            <div className="card-header">
              <h5>Human Resource Department Clearance</h5>
            </div>

            <div className="card-body">
              <div className="Lines-set">
                {groupedClearanceEmp.map((x3, i3) => (
                  <div className="row mx-1" key={i3}>
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="">Cleared</label>
                            <select
                              name="clearance"
                              id="clearance"
                              className="form-control"
                              value={x3.clearance}
                              onChange={(e) =>
                                handleInputChecklistChange(e, i3)
                              }
                            >
                              <option>Select...</option>
                              <option value="Not Cleared">Not Cleared</option>
                              <option value="Cleared">Cleared</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="">Year</label>
                            <select
                              name="Year"
                              id="Year"
                              className="form-control"
                              value={x3.Year}
                              onChange={(e) =>
                                handleInputChecklistChange(e, i3)
                              }
                            >
                              <option>Select...</option>
                              <option value="2020">2020</option>
                              <option value="2021">2021</option>
                              <option value="2022">2022</option>
                              <option value="2023">2023</option>
                              <option value="2024">2024</option>
                              <option value="2025">2025</option>
                              <option value="2026">2026</option>
                              <option value="2027">2027</option>
                              <option value="2028">2028</option>
                              <option value="2029">2029</option>
                              <option value="2030">2030</option>
                              <option value="2031">2031</option>
                              <option value="2032">2032</option>
                              <option value="2033">2033</option>
                              <option value="2034">2034</option>
                              <option value="2035">2035</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="">Annual Leave Days</label>
                            <input
                              // parseInt(x3.kalue.replace(/\,/g,''))
                              type="number"
                              step="0.01"
                              className="form-control "
                              placeholder="Annual Leave Days"
                              name="annualLeaveDays"
                              value={x3.annualLeaveDays}
                              onChange={(e) =>
                                handleInputChecklistChange(e, i3)
                              }
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="">Leave Taken</label>
                            <input
                              // parseInt(x3.kalue.replace(/\,/g,''))
                              type="number"
                              step="0.01"
                              className="form-control "
                              // placeholder="Annual Days Less"
                              name="annualDaysLess"
                              value={x3.annualDaysLess}
                              onChange={(e) =>
                                handleInputChecklistChange(e, i3)
                              }
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="">Leave Balance</label>
                            <input
                              // parseInt(x3.kalue.replace(/\,/g,''))
                              type="number"
                              step="0.01"
                              className="form-control "
                              // placeholder="Balance Days"
                              name="balDays"
                              value={x3.balDays}
                              onChange={(e) =>
                                handleInputChecklistChange(e, i3)
                              }
                            />
                          </div>
                        </div>

                   

                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="">Leave Balance Value(Ksh)</label>
                            <input
                              // parseInt(x3.kalue.replace(/\,/g,''))
                              type="number"
                              step="0.01"
                              className="form-control "
                              // placeholder="Annual Days Less"
                              name="kalue"
                              value={x3.kalue.replace(/\,/g, "")}
                              onChange={(e) =>
                                handleInputChecklistChange(e, i3)
                              }
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <textarea
                              className="form-control"
                              id=""
                              rows="2"
                              placeholder="Remarks"
                              name="remarks"
                              value={x3.remarks}
                              onChange={(e) =>
                                handleInputChecklistChange(e, i3)
                              }
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={viewTag}>
                      <div className="button-div">
                        {groupedClearanceEmp.length !== 1 && (
                          <>
                            <button
                              type="button"
                              className="btn btn-danger "
                              onClick={() => handleRemoveCheckistClick(i3)}
                            >
                              Del <i className="fa fa-trash"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-success "
                              onClick={() => handlePushChecklistClick(i3)}
                            >
                              Push <i className="fa fa-arrow-up"></i>
                            </button>
                          </>
                        )}
                        {groupedClearanceEmp.length - 1 === i3 && (
                          <>
                            <button
                              type="button"
                              className="btn btn-info "
                              onClick={handleAddChecklistClick}
                            >
                              Add <i className="fa fa-arrow-down"></i>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default withRouter(HODHRClearanceCard);
