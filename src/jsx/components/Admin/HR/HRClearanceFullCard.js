import axios from "axios";
import React, { useState, useRef, useEffect, useMemo, forwardRef } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";
import  secureLocalStorage  from  "react-secure-storage"; import { decryptToken} from "./../../../../AppUtility"; import jwt_decode from "jwt-decode";

const HRClearanceFullCard = (props) => {
  const [loading, setLoading] = useState(true);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedManager, setSelectedManager] = useState({
    label: "",
    value: "",
  });
  const [selectedStaff, setSelectedStaff] = useState({ label: "", value: "" });
  const [selectedAttendee, setSelectedAttendee] = useState({
    label: "",
    value: "",
  });
  const [headerData, setHeaderData] = useState({});

  const [areaSupport1, setAreaSupport1] = useState("");
  const [areaSupport2, setAreaSupport2] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [monitorId, setMonitorId] = useState("");

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
    },
  ]);
  const [groupedClearanceICT, setGroupedClearanceICT] = useState([]);
  const [groupedClearanceFIN, setGroupedClearanceFIN] = useState([]);
  const [groupedClearanceHR, setGroupedClearanceHR] = useState([]);
  const [groupedClearanceADMIN, setGroupedClearanceADMIN] = useState([]);

  // handle input change
  const handleInputChecklistChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...groupedClearanceEmp];
    list[index][name] = value;
    list[index].id = index;
    setGroupedClearanceEmp(list);
  };

  // handle cick event of the remove button

  // const handleRemoveCheckistClick = (index) => {
  //   const list1 = [...plines];
  //   let _no = list1[index].monitorno;
  //   if (_no !== "") {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${
  //           JSON.parse(secureLocalStorage.getItem("userDetails"))
  //         }`,
  //       },
  //     };
  //     let data = {
  //       id: list1[index].id,
  //       Monitorno: headerData.monitorNo,
  //       Currentperformance: list1[index].currentperformance,
  //       Performanceparameter: list1[index].performanceparameter,
  //       Original: list1[index].original,
  //     };

  //     swal({
  //       title: "Are you sure?",
  //       text: "Are you sure that you want to delete",
  //       icon: "warning",
  //       dangerMode: true,
  //     })
  //       .then((willDelete) => {
  //         if (willDelete) {
  //           return axios.post(
  //             `${process.env.REACT_APP_API_S_LINK}/staffrequision/deletemonitoringline`,
  //             data,
  //             config
  //           );
  //         }
  //       })
  //       .then((json) => {
  //         // // =>console.log(json.data);
  //         list1.splice(index, 1);
  //         setPlines(list1);
  //         swal("Success!", "Your record has been Deleted!", "success");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         swal("Oops!", "Seems like we couldn't delete the record", "error");
  //       });
  //   } else {
  //     list1.splice(index, 1);
  //     setPlines(list1);
  //   }
  // };

  //handle click event of the Add button

  //   const handleAddChecklistClick = () => {
  //     const list = [...groupedClearanceEmp];
  //     if (list[0] !== undefined) {
  //       setGroupedClearanceEmp([
  //         ...groupedClearanceEmp,
  //         {
  //           id: "",
  //           clearance: "",
  //           clearanceno: "",
  //           clearedby: "",
  //           dept: "Employee",
  //           designation: "",
  //           items: "",
  //           lineno: "",
  //           remarks: "",
  //           value: "",
  //         },
  //       ]);
  //     } else {
  //       swal("Oh", "Define Qualification Code in D365", "error");
  //     }
  //   };

  // const handlePushChecklistClick = (index) => {
  //   //Add record to d365

  //   const list = [...plines];
  //   let record = list[index];
  //   let _code = list[0]["monitorno"];
  //   if (list[0]["monitorno"] === undefined || list[0]["monitorno"] === "") {
  //     //means its the first row
  //     let data = {
  //       id: record.id,
  //       Currentperformance: record.currentperformance,
  //       Monitorno: headerData.monitorNo,
  //       Month1: record.month1,
  //       Month2: record.month2,
  //       Month3: record.month3,
  //       Performanceparameter: record.performanceparameter,
  //       Original: record.original,
  //     };

  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${
  //           JSON.parse(secureLocalStorage.getItem("userDetails"))
  //         }`,
  //       },
  //     };

  //     swal({
  //       title: "Are you sure?",
  //       text: "Are you sure that you want to upload",
  //       icon: "warning",
  //       dangerMode: true,
  //     })
  //       .then((willUpload) => {
  //         if (willUpload) {
  //           return axios.post(
  //             `${process.env.REACT_APP_API_S_LINK}/staffrequision/addmonitoringline`,
  //             data,
  //             config
  //           );
  //         }
  //       })
  //       .then((json) => {
  //         // =>console.log(json.data);
  //         swal("Success!", "Your record has been uploaded!", "success");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         swal("Oops!", "Seems like we couldn't upload the record", "error");
  //       });
  //   } else {
  //     let data = {
  //       id: record.id,
  //       Currentperformance: record.currentperformance,
  //       Monitorno: record.monitorno,
  //       Month1: record.month1,
  //       Month2: record.month2,
  //       Month3: record.month3,
  //       Performanceparameter: record.performanceparameter,
  //       Original: record.original,
  //     };

  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${
  //           JSON.parse(secureLocalStorage.getItem("userDetails"))
  //         }`,
  //       },
  //     };

  //     swal({
  //       title: "Are you sure?",
  //       text: "Are you sure that you want to upload",
  //       icon: "warning",
  //       dangerMode: true,
  //     })
  //       .then((willUpload) => {
  //         if (willUpload) {
  //           return axios.post(
  //             `${process.env.REACT_APP_API_S_LINK}/staffrequision/addmonitoringline`,
  //             data,
  //             config
  //           );
  //         }
  //       })
  //       .then((json) => {
  //         // =>console.log(json.data);
  //         swal("Success!", "Your record has been uploaded!", "success");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         swal("Oops!", "Seems like we couldn't upload the record", "error");
  //       });
  //   }
  // };

  const onChangeSupportingDoc = (e) => {
    setSupportingfile(e.target.files[0]);
  };
  useEffect(() => {
    //
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/home/getclearancelist/${props.location.state[0].datum[0].clearanceNo}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data);

          setGroupedClearanceEmp(response.data.clearanceFullFormEmployee);
          setGroupedClearanceICT(response.data.clearanceFullFormICT);
          setGroupedClearanceFIN(response.data.clearanceFullFormFIN);
          setGroupedClearanceHR(response.data.clearanceFullFormHR);
          setGroupedClearanceADMIN(response.data.clearanceFullFormADMIN);

          setLoading(false);
          setProgressStatus(response.data.hrApproveIndicator);
          // setProgressStatus(props.location.state[0].datum[0].progressFlag);
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          // =>console.log(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
      });
  }, []);

  //Update Header Value
  //   const updateMonitoring = () => {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${
  //           JSON.parse(secureLocalStorage.getItem("userDetails"))
  //         }`,
  //       },
  //     };

  //     const data = {
  //       AreasofSupport: areaSupport1,
  //       AreasofSupport2: areaSupport2,
  //       Recommendations: recommendation,
  //       MonitorNo: monitorId,
  //     };

  //     swal({
  //       title: "Are you sure?",
  //       text: "Are you sure that you want to update",
  //       icon: "warning",
  //       dangerMode: true,
  //     })
  //       .then((willCreate) => {
  //         if (willCreate) {
  //           return axios.post(
  //             `${process.env.REACT_APP_API_S_LINK}/staffrequision/modifymonitoringheader`,
  //             data,
  //             config
  //           );
  //         }
  //       })
  //       .then((json) => {
  //         // =>console.log(json.data);
  //         // list1.splice(index, 1);
  //         // setQualificationList(list1);
  //         swal("Success!", "Your record has been Created!", "success");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         swal("Oops!", "Seems like we couldn't update the record", "error");
  //       });
  //   };

  //Approve the Monitoring

  //   const approveMonitoring = () => {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${
  //           JSON.parse(secureLocalStorage.getItem("userDetails"))
  //         }`,
  //       },
  //     };

  //     const data = {
  //       AreasofSupport: areaSupport1,
  //       AreasofSupport2: areaSupport2,
  //       Recommendations: recommendation,
  //       MonitorNo: monitorId,
  //     };

  //     swal({
  //       title: "Are you sure?",
  //       text: "Are you sure that you want to Approve",
  //       icon: "warning",
  //       dangerMode: true,
  //     })
  //       .then((willCreate) => {
  //         if (willCreate) {
  //           return axios.get(
  //             `${process.env.REACT_APP_API_S_LINK}/staffrequision/approvemonitoring/${monitorId}`,
  //             // data,
  //             config
  //           );
  //         }
  //       })
  //       .then((json) => {
  //         // =>console.log(json.data);
  //         // list1.splice(index, 1);
  //         // setQualificationList(list1);
  //         swal("Success!", "Your record has been Approved!", "success");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         swal("Oops!", "Seems like we couldn't approve the record", "error");
  //       });
  //   };

  //Push to HR

  //   const pushToHR = () => {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${
  //           JSON.parse(secureLocalStorage.getItem("userDetails"))
  //         }`,
  //       },
  //     };

  //     const data = {
  //       PerformanceId: monitorId,
  //       StaffName: props.location.state[0].datum[0].staffName,
  //       ManagerName: props.location.state[0].datum[0].managerName,
  //       Date: props.location.state[0].datum[0].date,
  //       ApprovalStatus: props.location.state[0].datum[0].approvalstatus,
  //     };

  //     swal({
  //       title: "Are you sure?",
  //       text: "Are you sure that you want to Push to HR",
  //       icon: "warning",
  //       dangerMode: true,
  //     })
  //       .then((willCreate) => {
  //         if (willCreate) {
  //           return axios.post(
  //             `${process.env.REACT_APP_API_S_LINK}/staffrequision/monitoringpushtohr`,
  //             data,
  //             config
  //           );
  //         }
  //       })
  //       .then((json) => {
  //         // =>console.log(json.data);
  //         // list1.splice(index, 1);
  //         // setQualificationList(list1);
  //         swal("Success!", "Your record has been Pushed", "success");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         swal("Oops!", "Seems like we couldn't Push the record", "error");
  //       });
  //   };

  // const uploadSupportindDoc = (e) => {
  //     e.preventDefault();

  //     if (supportingfile !== "") {
  //       if (supportingfile.size / 1024 > 6024) {
  //         alert("Size above 6MB");
  //         return;
  //       }
  //       if (supportingfile.type !== "application/pdf") {
  //         alert("File not pdf.");
  //         return;
  //       }

  //       const formData = new FormData();
  //       formData.append(`formFile`, supportingfile);
  //       const config = {
  //         headers: {
  //           Authorization: `Bearer ${
  //             JSON.parse(secureLocalStorage.getItem("userDetails"))
  //           }`,
  //         },
  //       };

  //       axios
  //         .post(
  //           `${process.env.REACT_APP_API_S_LINK}/home/hoduploadmonitoringdocs/${monitorId}`,
  //           formData,
  //           config
  //         )
  //         .then(function (response) {
  //           if (response.status === 200) {
  //             swal("Success!", "Your file has been Uploaded", "success");
  //           }
  //           if (response.status === 404) {
  //             alert(response.data.message);
  //           }
  //         })
  //         .catch((err) => {
  //           console.log({ err: err });
  //           swal("Oops!", "Seems like we couldn't Upload the file", "error");
  //         });
  //     }
  //   };

  const pendingApprovaFinal = () => {
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
            `${process.env.REACT_APP_API_S_LINK}/home/hrpendingclearancerecord/${props.location.state[0].datum[0].id}`,
            //   data,
            config
          );
        }
      })
      .then((json) => {
        // =>console.log(json.data);
        swal("Success!", "Your record has been Approved", "success");
      })
      .catch((err) => {
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        console.log(err);
        // swal("Oops!", "Seems like we couldn't Approve the record", "error");
      });
  };
  const approveFinal = () => {
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
            `${process.env.REACT_APP_API_S_LINK}/home/hrapprovingclearancerecord/${props.location.state[0].datum[0].id}`,
            //   data,
            config
          );
        }
      })
      .then((json) => {
        // =>console.log(json.data);
        swal("Success!", "Mailing was Successful", "success");
      })
      .catch((err) => {
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        console.log(err);
        // swal("Oops!", "Seems like we couldn't Approve the record", "error");
      });
  };

  let zeroPro = (
    <button className="btn btn-warning rounded-0 w-100">
      Push to HOD <i className="fa fa-user"></i>
    </button>
  );
  let onePro = (
    <button disabled className="btn btn-secondary rounded-0 ">
      Under Approval or Approved <i className="fa fa-user"></i>
    </button>
  );

  let oneSix = (
    <button
      className="btn btn-warning rounded-0 w-100 "
      onClick={pendingApprovaFinal}
    >
      Alert Employee to the Completion of Clearance{" "}
      <i className="fa fa-user"></i>
    </button>
  );

  // let oneSeven = (
  //   <button  className="btn btn-warning rounded-0 w-100 " onClick={approveFinal}>
  //     Email Final Dues <i className="fa fa-user"></i>
  //   </button>
  // );

  let pushinBtn = "";
  let finalDuesBtn = "";

  if (progressStatus === 6) {
    pushinBtn = zeroPro;
  } else if (progressStatus === 0) {
    pushinBtn = onePro;
  } else if (progressStatus === 1) {
    pushinBtn = oneSix;
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
              <div className="col-md-6">
                {/* <div className="form-group">
                    <label htmlFor=""> Supporting Documents</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={onChangeSupportingDoc}
                    />
                  </div> */}
                <div className="d-flex flex-column">
                  <label htmlFor=""> Action</label>
                  <div className="button-div d-flex my-3">{pushinBtn}</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="d-flex flex-column">
                  <label htmlFor=""> Action</label>
                  <div className="button-div d-flex my-3">
                    {
                      <button
                        className="btn btn-warning rounded-0 w-100 "
                        onClick={approveFinal}
                      >
                        Email Final Dues <i className="fa fa-user"></i>
                      </button>
                    }
                    {/* <button
                        className="btn btn-primary rounded-0"
                        onClick={uploadSupportindDoc}
                      >
                        Upload Supporting File{" "}
                        <i className="fa fa-cloud-upload"></i>
                      </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card ">
            <div className="card-header">
              <h5>Employee Department Clearance</h5>
            </div>

            <div className="card-body">
              <div className="Lines-set">
                {groupedClearanceEmp.map((x3, i3) => (
                  <div className="row mx-1" key={i3}>
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="">Items</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              placeholder="Items"
                              name="performanceparameter"
                              value={x3.items}
                              onChange={(e) =>
                                handleInputChecklistChange(e, i3)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="">Value</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              placeholder="Value"
                              name="performanceparameter"
                              value={x3.value}
                              // onChange={(e) =>
                              //   handleInputChecklistChange(e, i3)
                              // }
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="">Remarks</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              value={x3.remarks}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="">Cleared</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              value={x3.clearance}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="col-md-4">
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
                    </div> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="card ">
            <div className="card-header">
              <h5>Admin Department Clearance</h5>
            </div>

            <div className="card-body">
              <div className="Lines-set">
                {groupedClearanceADMIN.map((x3, i3) => (
                  <div className="row mx-1" key={i3}>
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="">Items</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              placeholder="Items"
                              name="performanceparameter"
                              value={x3.items}
                              onChange={(e) =>
                                handleInputChecklistChange(e, i3)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="">Value</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              placeholder="Value"
                              name="performanceparameter"
                              value={x3.value}
                              onChange={(e) =>
                                handleInputChecklistChange(e, i3)
                              }
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="">Remarks</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              value={x3.remarks}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="">Cleared</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              value={x3.clearance}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="col-md-4">
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
                    </div> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="card ">
            <div className="card-header">
              <h5>IT Department Clearance</h5>
            </div>

            <div className="card-body">
              <div className="Lines-set">
                {groupedClearanceICT.map((x3, i3) => (
                  <div className="row mx-1" key={i3}>
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="">Items</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              placeholder="Items"
                              name="performanceparameter"
                              value={x3.items}
                              onChange={(e) =>
                                handleInputChecklistChange(e, i3)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="">Value</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              placeholder="Value"
                              name="performanceparameter"
                              value={x3.value}
                              onChange={(e) =>
                                handleInputChecklistChange(e, i3)
                              }
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="">Remarks</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              value={x3.remarks}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="">Cleared</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              value={x3.clearance}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="col-md-4">
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
                    </div> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="card ">
            <div className="card-header">
              <h5>HR Department Clearance</h5>
            </div>

            <div className="card-body">
              <div className="Lines-set">
                {groupedClearanceHR.map((x3, i3) => (
                  <div className="row mx-1 my-4" key={i3}>
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="">Year</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              value={x3.year}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="">Annual Leave Days</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              value={x3.annualLeaveDays}
                            />
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="">Leave Taken</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              value={x3.annualDaysLess}
                            />
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="">Leave Balance</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              value={x3.balDays}
                            />
                          </div>
                        </div>

                        {/* <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="">Leave Balance Value</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              value={x3.value}
                            />
                          </div>
                        </div> */}

                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="">Cleared</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              value={x3.clearance}
                            />
                          </div>
                        </div>
                        <div className="col-md-9">
                          <div className="form-group">
                            <label htmlFor="">Remarks</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              value={x3.remarks}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12">
          <div className="card ">
            <div className="card-header">
              <h5>Finance Department Clearance</h5>
            </div>

            <div className="card-body">
              <div className="Lines-set">
                {groupedClearanceFIN.map((x3, i3) => (
                  <div className="row mx-1 my-4" key={i3}>
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="">Staff Loan</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              placeholder="Staff loan"
                              name="performanceparameter"
                              value={x3.staffLoan}
                              onChange={(e) =>
                                handleInputChecklistChange(e, i3)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="">Salary Advances</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              placeholder="Salary Advances"
                              name="performanceparameter"
                              value={x3.otherLoan}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="">JIT Savings</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              placeholder="JIT"
                              name="performanceparameter"
                              value={x3.jitSavings}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="">Clearance</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              placeholder="Clearance"
                              name="performanceparameter"
                              value={x3.clearance}
                            />
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="">Accountant 1 Name</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              placeholder="Name1"
                              name="performanceparameter"
                              value={x3.nameOne}
                            />
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="">Accoutant 2 Name</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              placeholder="Name2"
                              name="performanceparameter"
                              value={x3.nameTwo}
                            />
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="">Finance Manager</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              name="performanceparameter"
                              value={x3.financeManagerName}
                            />
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="form-group">
                            <label htmlFor="">Finance Director</label>
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              name="performanceparameter"
                              value={x3.financeDirectorName}
                            />
                          </div>
                        </div>
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
export default withRouter(HRClearanceFullCard);
