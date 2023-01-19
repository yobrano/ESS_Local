import axios from "axios";
import React, { useState, useRef, useEffect, useMemo, forwardRef } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";

const HODADMINClearanceCard = (props) => {
  const [loading, setLoading] = useState(true);
  // const [employeeList, setEmployeeList] = useState([]);
  // const [selectedManager, setSelectedManager] = useState({
  //   label: "",
  //   value: "",
  // });
  // const [selectedStaff, setSelectedStaff] = useState({ label: "", value: "" });
  // const [selectedAttendee, setSelectedAttendee] = useState({
  //   label: "",
  //   value: "",
  // });
  // const [headerData, setHeaderData] = useState({});

  // const [areaSupport1, setAreaSupport1] = useState("");
  // const [areaSupport2, setAreaSupport2] = useState("");
  // const [recommendation, setRecommendation] = useState("");
  // const [monitorId, setMonitorId] = useState("");

  const [supportingfile, setSupportingfile] = useState("");
  const [progressStatus, setProgressStatus] = useState(0);

  const [groupedClearanceADMIN, setGroupedClearanceADMIN] = useState([
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
    },
  ]);

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
    },
  ]);

  // const [groupedClearanceICT, setGroupedClearanceICT] = useState([]);
  // const [groupedClearanceFIN, setGroupedClearanceFIN] = useState([]);
  // const [groupedClearanceHR, setGroupedClearanceHR] = useState([]);

  // handle input change
  const handleInputChecklistChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...groupedClearanceADMIN];
    list[index][name] = value;
    list[index].id = index;
    setGroupedClearanceADMIN(list);
  };

  // handle cick event of the remove button

  const handleRemoveCheckistClick = (index) => {
    const list1 = [...groupedClearanceADMIN];
    // list1.splice(index, 1);
    // setGroupedClearanceADMIN(list1);

    let _no = list1[index].lineno;
    if (_no !== "") {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userDetails")).idToken
          }`,
        },
      };
    //   let data = {
    //     id: list1[index].id,
    //     Monitorno: headerData.monitorNo,
    //     Currentperformance: list1[index].currentperformance,
    //     Performanceparameter: list1[index].performanceparameter,
    //     Original: list1[index].original,
    //   };

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
          setGroupedClearanceADMIN(list1);
          swal("Success!", "Your record has been Deleted!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't delete the record", "error");
        });
    } else {
      list1.splice(index, 1);
      setGroupedClearanceADMIN(list1);
    }
  };

  //   handle click event of the Add button

  const handleAddChecklistClick = () => {
    const list = [...groupedClearanceADMIN];
    if (list[0] !== undefined) {
      setGroupedClearanceADMIN([
        ...groupedClearanceADMIN,
        {
          id: "",
          clearance: "",
          clearanceno: "",
          clearedby: "",
          dept: "Administration",
          designation: "",
          items: "",
          lineno: "",
          remarks: "",
          value: "",
          kalue: "0",
        },
      ]);
    } else {
      swal("Oh", "Define Qualification Code in D365", "error");
    }
  };

  const handlePushChecklistClick = (index) => {
    //Add record to d365

    const list = [...groupedClearanceADMIN];
    let record = list[index];
    let _code = list[0]["clearanceno"];
    if (list[0]["clearanceno"] === undefined || list[0]["clearanceno"] === "" ||record.clearanceno ==="") {
      //means its the first row
      let data = {
        id: record.id,
        clearance: record.clearance,
        clearanceno: props.location.state[0].datum[0].clearanceNo,
        clearedby: "",
        dept: "Administration",
        designation: record.designation,
        items: record.items,
        lineno: record.lineno,
        remarks: record.remarks,
        value: record.value,
        kalue: record.kalue,
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
              `${process.env.REACT_APP_API_S_LINK}/home/hodpushclearancelines`,
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
          swal("Oops!", "Seems like we couldn't upload the record", "error");
        });
    } else {
      let data = {
        id: record.id,
        clearance: record.clearance,
        clearanceno:record.clearanceno,
        clearedby: "",
        dept: record.dept,
        designation: record.designation,
        items: record.items,
        lineno: record.lineno,
        remarks: record.remarks,
        value: record.value,
        kalue: record.kalue,
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
              `${process.env.REACT_APP_API_S_LINK}/home/hodmodifyclearanceline`,
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
        `${process.env.REACT_APP_API_S_LINK}/home/hodadmingetcardclearancedata/${props.location.state[0].datum[0].clearanceNo}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);

          if(response.data.clearanceFullFormEmployee.length>0){
            setGroupedClearanceEmp(response.data.clearanceFullFormEmployee);
          }
    //   setGroupedClearanceICT(response.data.clearanceFullFormICT);
    //   setGroupedClearanceFIN(response.data.clearanceFullFormFIN);
    //   setGroupedClearanceHR(response.data.clearanceFullFormHR);
       setGroupedClearanceADMIN(response.data.clearanceFullFormAdmin);

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

 
  //Update Header Value
  //   const updateMonitoring = () => {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${
  //           JSON.parse(localStorage.getItem("userDetails")).idToken
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
  //         console.log(json.data);
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

    // const approveMonitoring = () => {
    //   const config = {
    //     headers: {
    //       Authorization: `Bearer ${
    //         JSON.parse(localStorage.getItem("userDetails")).idToken
    //       }`,
    //     },
    //   };

    //   const data = {
    //     AreasofSupport: areaSupport1,
    //     AreasofSupport2: areaSupport2,
    //     Recommendations: recommendation,
    //     MonitorNo: monitorId,
    //   };

    //   swal({
    //     title: "Are you sure?",
    //     text: "Are you sure that you want to Approve",
    //     icon: "warning",
    //     dangerMode: true,
    //   })
    //     .then((willCreate) => {
    //       if (willCreate) {
    //         return axios.get(
    //           `${process.env.REACT_APP_API_S_LINK}/staffrequision/approvemonitoring/${monitorId}`,
    //           // data,
    //           config
    //         );
    //       }
    //     })
    //     .then((json) => {
    //       console.log(json.data);
    //       // list1.splice(index, 1);
    //       // setQualificationList(list1);
    //       swal("Success!", "Your record has been Approved!", "success");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       swal("Oops!", "Seems like we couldn't approve the record", "error");
    //     });
    // };

  //Push to HR

    const pushToHODIT= () => {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userDetails")).idToken
          }`,
        },
      };

    //   const data = {
    //     PerformanceId: monitorId,
    //     StaffName: props.location.state[0].datum[0].staffName,
    //     ManagerName: props.location.state[0].datum[0].managerName,
    //     Date: props.location.state[0].datum[0].date,
    //     ApprovalStatus: props.location.state[0].datum[0].approvalstatus,
    //   };

      swal({
        title: "Are you sure?",
        text: "Are you sure that you want to Push ",
        icon: "warning",
        dangerMode: true,
      })
        .then((willCreate) => {
          if (willCreate) {
            return axios.get(
              `${process.env.REACT_APP_API_S_LINK}/home/hodadminupdateclearancerecord/${props.location.state[0].datum[0].id}`,
            //   data,
              config
            );
          }
        })
        .then((json) => {
          console.log(json.data);
          // list1.splice(index, 1);
          // setQualificationList(list1);
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
  //             JSON.parse(localStorage.getItem("userDetails")).idToken
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

  let zeroPro = (
    <button className="btn btn-warning rounded-0 w-100" onClick={pushToHODIT}>
       Approve Administration Dept Clearance <i className="fa fa-user"></i>
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

  let viewTag="col-md-4";
  if(props.location.state[0].datum[0].hodAdminApproved==="TRUE"){
   viewTag="col-md-4 d-none";
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
                {/* <div className="form-group">
                    <label htmlFor=""> Supporting Documents</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={onChangeSupportingDoc}
                    />
                  </div> */}
              </div>
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <div className="d-flex flex-column">
                  <label htmlFor=""> Action</label>
                  <div className="button-div d-flex my-3">
                    {pushinBtn}
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
              <h5>Administration Department Clearance</h5>
            </div>

            <div className="card-body">
              <div className="Lines-set">
                {groupedClearanceADMIN.map((x3, i3) => (
                  <div className="row mx-1" key={i3}>
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="">Items</label>
                            <input
                              type="text"
                              className="form-control "
                              placeholder="Items"
                              name="items"
                              value={x3.items}
                              onChange={(e) =>
                                handleInputChecklistChange(e, i3)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="">Value</label>
                            <input
                              // parseInt(x3.kalue.replace(/\,/g,''))
                              type="number"
                              className="form-control "
                              placeholder="Value"
                              name="kalue"
                              value={parseInt(x3.kalue.replace(/\,/g,''))}
                              onChange={(e) =>
                                handleInputChecklistChange(e, i3)
                              }
                            />
                          </div>
                        </div>

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
                        {groupedClearanceADMIN.length !== 1 && (
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
                        {groupedClearanceADMIN.length - 1 === i3 && (
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
export default withRouter(HODADMINClearanceCard);
