import axios from "axios";
import React, { useState, useRef, useEffect, useMemo, forwardRef } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";
import  secureLocalStorage  from  "react-secure-storage"; import { decryptToken} from "./../../../../../AppUtility"; import jwt_decode from "jwt-decode";

const HODFINClearanceCard = (props) => {
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

      staffLoan:"0",
      otherLoan:"0",
      jitSavings:"0",
      accountantOne:"",
      accountantTwo:"",
      financeDirector:"",
      financeManager:"",

    },
  ]);

  const [employeeList, setEmployeeList] = useState([]);

  const [selectedAcc1, setSelectedAcc1] = useState({});
  const [selectedAcc2, setSelectedAcc2] = useState({});
  const [selectedFinmgr, setSelectedFinmgr] = useState({});
  const [selectedFinDir, setSelectedFinDir] = useState({});

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

  //Select List

  const handleSelectListChange = (nameq,e, index) => {
    // =>console.log(e);
    // =>console.log(nameq);
    const { label, value } = e;
    const { name } = nameq;
    const list = [...groupedClearanceEmp];
    list[index][name] = value;
    list[index].id = index;
    setGroupedClearanceEmp(list);
    setSelectedAcc1(e)
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
            JSON.parse(secureLocalStorage.getItem("userDetails"))
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
          // // =>console.log(json.data);
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
          dept: "Finance",
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

          staffLoan:"0",
          otherLoan:"0",
          jitSavings:"0",
          accountantOne:"",
          accountantTwo:"",
          financeDirector:"",
          financeManager:"",

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
      record.lineno === ""
    ) {
      //means its the first row
      let data = {
        id: record.id,
        clearance: record.clearance,
        clearanceno: props.location.state[0].datum[0].clearanceNo,
        clearedby: "",
        dept: "Finance",
        designation: record.designation,
        items: record.items,
        lineno: record.lineno.toString(),
        remarks: record.remarks,
        value: record.value,
        kalue: record.kalue,

        // annualLeaveDays: record.annualLeaveDays,
        // balDays: record.balDays,
        // annualDaysLess: record.annualDaysLess,
        // Year: record.Year,

        staffLoan:record.staffLoan,
        otherLoan:record.otherLoan,
        jitSavings:record.jitSavings,
        accountantOne:record.accountantOne,
        accountantTwo:record.accountantTwo,
        financeDirector:record.financeDirector,
        financeManager:record.financeManager,


      };

      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureLocalStorage.getItem("userDetails"))
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
              `${process.env.REACT_APP_API_S_LINK}/home/hodfinpushclearancelines`,
              data,
              config
            );
          }
        })
        .then((json) => {
          // =>console.log(json.data);
          list[index].lineno = json.data
          setGroupedClearanceEmp(list);
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
    } 
    else {
      let data = {
        id: record.id,
        clearance: record.clearance,
        clearanceno: record.clearanceno,
        clearedby: "",
        dept: record.dept,
        designation: record.designation,
        items: record.items,
        lineno: record.lineno.toString(),
        remarks: record.remarks,
        value: record.value,
        kalue: record.kalue,

        // annualLeaveDays: record.annualLeaveDays,
        // balDays: record.balDays,
        // annualDaysLess: record.annualDaysLess,
        // Year: record.Year,

        staffLoan:record.staffLoan,
        otherLoan:record.otherLoan,
        jitSavings:record.jitSavings,
        accountantOne:record.accountantOne,
        accountantTwo:record.accountantTwo,
        financeDirector:record.financeDirector,
        financeManager:record.financeManager,

      };

      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureLocalStorage.getItem("userDetails"))
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
              `${process.env.REACT_APP_API_S_LINK}/home/hodfinmodifyclearanceline`,
              data,
              config
            );
          }
        })
        .then((json) => {
          // =>console.log(json.data);
          list[index].lineno = json.data
          setGroupedClearanceEmp(list);
          swal("Success!", "Your record has been updated!", "success");
        })
        .catch((err) => {
          if(err.response!==undefined){
            swal("Oh!", err.response.data.message, "error");
          }else{
            swal("Oh!", err.message, "error");
          }
          // console.log(err);
          swal("Oops!", "Seems like we couldn't update the record", "error");
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
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/home/hodfingetcardclearancedata/${props.location.state[0].datum[0].clearanceNo}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data);

          setGroupedClearanceEmp(response.data.clearanceFullFormAdmin);
          setEmployeeList(response.data.employeeListModels);
          setRedirectData(props.location.state[0].datum[0]);

          setLoading(false);
          setProgressStatus(props.location.state[0].datum[0].progressFlag);
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          // =>console.log(response.data.message);
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

  const pushToTOHR = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Approve",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.get(
            `${process.env.REACT_APP_API_S_LINK}/home/hodfinupdateclearancerecord/${props.location.state[0].datum[0].id}`,
            //   data,
            config
          );
        }
      })
      .then((json) => {
        // =>console.log(json.data);
        swal("Success!", "Your record has been Pushed", "success");
      })
      .catch((err) => {
        if(err.response!==undefined){
          swal("Oh!", err.response.data.message, "error");
        }else{
          swal("Oh!", err.message, "error");
        }
        console.log(err);

        // swal("Oops!", "Seems like we couldn't Push the record", "error");
      });
  };

  let zeroPro = (
    <button className="btn btn-warning rounded-0 w-100" onClick={pushToTOHR}>
      Approve Finance Dept<i className="fa fa-user"></i>
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
  let viewTag="col-md-4 my-3";
  if(props.location.state[0].datum[0].hodfinApproved==="TRUE"){
   viewTag="d-none my-3";
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

  if (props.location.state[0].datum[0].progressStartFlag === 5) {
    pushToHROwnUser = ownDep;
  }
  if (accessOwnDept) {
    props.history.push("/HODFIN-own-dept", [{ datum: redirectData }]);
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
        <div className="col-md-12" style={{height:"100%"}}>
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
              <h5>Finance Department Clearance</h5>
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
                            <label htmlFor="">Staff Loan</label>
                            <input
                              // parseInt(x3.kalue.replace(/\,/g,''))
                              type="number"
                              step="0.01"
                              className="form-control "
                              placeholder="Staff Loan"
                              name="staffLoan"
                              value={x3.staffLoan.replace(/\,/g,'')}
                              onChange={(e) =>
                                handleInputChecklistChange(e, i3)
                              }
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="">Salary advance</label>
                            <input
                              // parseInt(x3.kalue.replace(/\,/g,''))
                              type="number"
                              step="0.01"
                              className="form-control "
                              placeholder="Salary advance"
                              name="otherLoan"
                              value={x3.otherLoan.replace(/\,/g,'')}
                              onChange={(e) =>
                                handleInputChecklistChange(e, i3)
                              }
                            />
                          </div>
                        </div>


                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="">JIT Saving</label>
                            <input
                              // parseInt(x3.kalue.replace(/\,/g,''))
                              type="number"
                              step="0.01"
                              className="form-control "
                              placeholder="JIT Saving"
                              name="jitSavings"
                              value={x3.jitSavings.replace(/\,/g,'')}
                              onChange={(e) =>
                                handleInputChecklistChange(e, i3)
                              }
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group1">
                            <label htmlFor="">Accountant 1</label>
                            <Select
                              defaultValue={selectedAcc1}
                              // onChange={setSelectedAcc1}
                              name="accountantOne"
                              onChange={(e,name)=>handleSelectListChange(name,e,i3)}
                              options={employeeList}
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group1">
                            <label htmlFor="">Accountant 2</label>
                            <Select
                              defaultValue={selectedAcc2}
                              name="accountantTwo"
                              // onChange={setSelectedAcc2}
                              onChange={(e,name)=>handleSelectListChange(name,e,i3)}
                              options={employeeList}
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group1">
                            <label htmlFor="">Finance Manager</label>
                            <Select
                              defaultValue={selectedFinmgr}
                              // onChange={setSelectedFinmgr}
                              name="financeManager"
                              onChange={(e,name)=>handleSelectListChange(name,e,i3)}

                              options={employeeList}
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group1">
                            <label htmlFor="">Finance Director</label>
                            <Select
                              defaultValue={selectedFinDir}
                              // onChange={setSelectedFinDir}
                              name="financeDirector"
                              onChange={(e,name)=>handleSelectListChange(name,e,i3)}

                              options={employeeList}
                            />
                          </div>
                        </div>

                        {/* <div className="col-md-12">
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
                        </div> */}
                      </div>
                    </div>

                    <div className={viewTag}>
                      <div className="button-div">
                      <>
                           
                            <button
                              type="button"
                              className="btn btn-success "
                              onClick={() => handlePushChecklistClick(i3)}
                            >
                              Post <i className="fa fa-arrow-up"></i>
                            </button>

                            

                          </>
                        {/* {groupedClearanceEmp.length !== 1 && (
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
                        )} */}
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
export default withRouter(HODFINClearanceCard);
