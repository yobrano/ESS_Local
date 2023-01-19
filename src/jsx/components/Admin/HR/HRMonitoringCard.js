import axios from "axios";
import React, { useState, useRef, useEffect, useMemo, forwardRef } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";

const HRMonitoringCard = (props) => {
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
  const [headerData, setHeaderData] = useState([]);

  const [areaSupport1, setAreaSupport1] = useState("");
  const [areaSupport2, setAreaSupport2] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [monitorId, setMonitorId] = useState("");
  const [plines, setPlines] = useState([
    {
      id: "",
      currentperformance: "",
      monitorno: "",
      month1: "",
      month2: "",
      month3: "",
      performanceparameter: "",
      original: false, //Whether its a new addition
    },
  ]);

  const [supportingfile, setSupportingfile] = useState("");
  const [progressStatus, setProgressStatus] = useState(0);
  const [HRRemark, setHRRemark] = useState("");

  const [tlines, setTlines] = useState([
    {
      monitorno: "",
      lineno: "",
      month: "",
      salesTarget: "",
      salesRep: "",
      id: "",
      // original: false
    },
  ]);
  const [performanceMonth, setPerformanceMonth] = useState("");
  const [reviewDate, setReviewDate] = useState("");

  const uploadPIPHeader = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    const data = {
      MonitorNo: monitorId,
      PerformanceMonths: performanceMonth,
      ReviewDate: reviewDate,
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Upload",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/staffrequision/createupdatepipheader`,
            data,
            config
          );
        }
      })
      .then((json) => {
        swal("Success!", "Your record has been Pushed", "success");
        console.log(json.data);
      })
      .catch((err) => {
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        console.log(err);
      });
  };

  // handle input change
  const handleInputChecklistChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...tlines];
    list[index][name] = value;
    list[index].id = index;
    list[index].monitorno = monitorId;
    setTlines(list);
  };
  // handle cick event of the remove button
  const handleRemoveCheckistClickPIP = (index) => {
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
        Lineno: parseInt(_no),
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
              `${process.env.REACT_APP_API_S_LINK}/staffrequision/deletepipline`,
              data,
              config
            );
          }
        })
        .then((json) => {
          // console.log(json.data);
          if(list1.length !== 1){
            list1.splice(index, 1);
            setTlines(list1);
          }else{
            list1[index].lineno = '';
            list1[index].month = '';
            list1[index].salesRep = '';
            list1[index].salesTarget = '';
            setTlines(list1);
          }
        
          swal("Success!", "Your record has been Deleted!", "success");
        })
        .catch((err) => {
          if (err.response !== undefined) {
            // swal("Oh!", err.response.data.message, "error");
            if (err.response.data.message) {
              swal("Oh!", err.response.data.message, "error");
            } else {
              swal("Oh!", err.message, "error");
            }
          } else if (err.message) {
            swal("Oh!", err.message, "error");
          } else {
            swal("Oh!", "Upload Failed", "error");
          }
          // swal("Oops!", "Seems like we couldn't delete the record", "error");
        });
    } else {
      if(list1.length !== 1){
        list1.splice(index, 1);
        setTlines(list1);
      }
     
    }
  };

  //handle click event of the Add button
  const handleAddChecklistClickPIP = () => {
    setTlines([
      ...tlines,
      {
        monitorno: monitorId,
        lineno: "",
        month: "",
        salesTarget: "",
        salesRep: "",
        id: "",
      },
    ]);
  };
  const handlePushChecklistClickPIP = (index) => {
    //Add record to d365
    const list = [...tlines];
    let record = list[index];
    let auxLno = record.lineno == "" ? -1 : record.lineno;
    let data = {
      MonitorNo: monitorId,
      Lineno: parseInt(auxLno),
      Month: record.month,
      SalesTarget: record.salesTarget,
      SalesRep: record.salesRep,
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
            `${process.env.REACT_APP_API_S_LINK}/staffrequision/createupdatepipline`,
            data,
            config
          );
        }
      })
      .then((json) => {
        swal("Success!", "Your record has been uploaded!", "success");
        list[index].lineno = json.data.extMessage;
        setTlines(list);

        console.log(json.data);
      })
      .catch((err) => {
        if (err.response !== undefined) {
          // swal("Oh!", err.response.data.message, "error");
          if (err.response.data.message) {
            swal("Oh!", err.response.data.message, "error");
          } else {
            swal("Oh!", err.message, "error");
          }
        } else if (err.message) {
          swal("Oh!", err.message, "error");
        } else {
          swal("Oh!", "Upload Failed", "error");
        }

        /* if (err.response) {
          if (err.response.data) {
            swal("Oh!", err.response.data, "error");
          } else if (err.response.status) {
            swal("Oh!", err.response.status, "error");
          } else if (err.response.headers) {
            swal("Oh!", err.response.headers, "error");
          }
        } else if (err.request) {
          swal("Oh!", err.request, "error");
        } else if (err.message) {
          swal("Oh!", err.message, "error");
        }*/

        console.log(err);
      });
  };

  const onChangeSupportingDoc = (e) => {
    setSupportingfile(e.target.files[0]);
  };
  useEffect(() => {
    //
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/staffrequision/getdataline/${props.location.state[0].datum[0].performanceId}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          setMonitorId(props.location.state[0].datum[0].performanceId);
          setPlines(response.data.performanceLineModels);
          setTlines(response.data.pipLines)
          setPerformanceMonth(response.data.pipHeader[0].performanceMonths)
          setReviewDate(response.data.pipHeader[0].reviewDate)
          // populateReqList();
          // setLoading(false);
          setProgressStatus(response.data.dbPerMonitor.progresscode);
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          console.log(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        console.log({ err: err });
        // swal("Oh!", err.data.message, "error");
      });

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/staffrequision/monitoringspecificheader/${props.location.state[0].datum[0].performanceId}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);

          setHeaderData(response.data.monitoringHeadModels);
          setHRRemark(response.data.monitoringHeadModels[0].hrRemarks);
          setLoading(false);
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
      });
  }, []);

  //Update Header Value
  const updateMonitoring = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    const data = {
      AreasofSupport: areaSupport1,
      AreasofSupport2: areaSupport2,
      Recommendations: recommendation,
      MonitorNo: monitorId,
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to update",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/staffrequision/modifymonitoringheader`,
            data,
            config
          );
        }
      })
      .then((json) => {
        console.log(json.data);
        // list1.splice(index, 1);
        // setQualificationList(list1);
        swal("Success!", "Your record has been Created!", "success");
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", "Seems like we couldn't update the record", "error");
      });
  };

  //Approve the Monitoring
  const approveMonitoring = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    const data = {
      AreasofSupport: areaSupport1,
      AreasofSupport2: areaSupport2,
      Recommendations: recommendation,
      MonitorNo: monitorId,
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
            `${process.env.REACT_APP_API_S_LINK}/staffrequision/approvemonitoring/${monitorId}`,
            // data,
            config
          );
        }
      })
      .then((json) => {
        console.log(json.data);
        // list1.splice(index, 1);
        // setQualificationList(list1);
        swal("Success!", "Your record has been Approved!", "success");
      })
      .catch((err) => {
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        console.log(err);
        // swal("Oops!", "Seems like we couldn't approve the record", "error");
      });
  };

  // Reject the Monitoring
  const rejectMonitoring = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Reject",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.get(
            `${process.env.REACT_APP_API_S_LINK}/staffrequision/rejectmonitoring/${monitorId}`,
            // data,
            config
          );
        }
      })
      .then((json) => {
        console.log(json.data);
        // list1.splice(index, 1);
        // setQualificationList(list1);
        swal("Success!", "Your record has been Rejected!", "success");
      })
      .catch((err) => {
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        console.log(err);
        // swal("Oops!", "Seems like we couldn't reject the record", "error");
      });
  };

  // For the case of PIP
  //Ensure you approve the record while doing so
  const pushToPIP = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Mail the Staff",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.get(
            `${process.env.REACT_APP_API_S_LINK}/staffrequision/alertstaffforpip/${monitorId}`,
            // data,
            config
          );
        }
      })
      .then((json) => {
        console.log(json.data);
      
        swal("Success!", "Email Sent!", "success");
      })
      .catch((err) => {
        if (err.response !== undefined) {
          if (err.response.data.message) {
            swal("Oh!", err.response.data.message, "error");
          } else {
            swal("Oh!", err.message, "error");
          }
        } else if (err.message) {
          swal("Oh!", err.message, "error");
        } else {
          swal("Oh!", "Upload Failed", "error");
        }
     
      });
  };

  //Push to HR
  const pushToHR = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    const data = {
      PerformanceId: monitorId,
      StaffName: props.location.state[0].datum[0].staffName,
      ManagerName: props.location.state[0].datum[0].managerName,
      Date: props.location.state[0].datum[0].date,
      ApprovalStatus: props.location.state[0].datum[0].approvalstatus,
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Push to HR",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/staffrequision/monitoringpushtohr`,
            data,
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
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        console.log(err);
        // swal("Oops!", "Seems like we couldn't Push the record", "error");
      });
  };

  const uploadSupportindDoc = (e) => {
    e.preventDefault();

    if (supportingfile !== "") {
      if (supportingfile.size / 1024 > 6024) {
        alert("Size above 6MB");
        return;
      }
      if (supportingfile.type !== "application/pdf") {
        alert("File not pdf.");
        return;
      }

      const formData = new FormData();
      formData.append(`formFile`, supportingfile);
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userDetails")).idToken
          }`,
        },
      };

      axios
        .post(
          `${process.env.REACT_APP_API_S_LINK}/home/hoduploadmonitoringdocs/${monitorId}`,
          formData,
          config
        )
        .then(function (response) {
          if (response.status === 200) {
            swal("Success!", "Your file has been Upploaded", "success");
          }
          if (response.status === 404) {
            alert(response.data.message);
          }
        })
        .catch((err) => {
          console.log({ err: err });
          swal("Oops!", "Seems like we couldn't Upload the file", "error");
        });
    }
  };

  const updateHRRemarks = () => {
    let data = {
      HRRemarks: HRRemark,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    axios
      .post(
        `${process.env.REACT_APP_API_S_LINK}/staffrequision/hrmonitoringremark/${monitorId}`,
        data,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          swal("Success!", "Your remark has been Uploaded", "success");
        }
        if (response.status === 404) {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        console.log({ err: err });
        // swal("Oops!", "Seems like we couldn't Upload the remark", "error");
      });
  };

  const viewSupportingDoc = () => {
    const config = {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/home/getmonitoring/${monitorId}`,
        config
      )

      .then(function (response) {
        if (response.status === 200) {
          const file = new Blob([response.data], { type: "application/pdf" });
          //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
          //Open the URL on new Window
          const pdfWindow = window.open();
          pdfWindow.location.href = fileURL;
        }
      })
      .catch((err) => {
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        console.log({ err: err });
      });
  };

  let zeroPro = (
    <button
      disabled
      className="btn btn-warning rounded-0 w-100"
      onClick={pushToHR}
    >
      Push to HR <i className="fa fa-user"></i>
    </button>
  );
  let onePro = (
    <button
      className="btn btn-success rounded-0 w-100"
      onClick={approveMonitoring}
    >
      HR Approval <i className="fa fa-user"></i>
    </button>
  );

  let twoPro = (
    <button
      disabled
      className="btn btn-secondary rounded-0 w-100 "
      onClick={approveMonitoring}
    >
      HR Approved <i className="fa fa-user"></i>
    </button>
  );
  let pushinBtn = "";

  if (progressStatus === 0) {
    pushinBtn = zeroPro;
  } else if (progressStatus === 1) {
    pushinBtn = onePro;
  } else if (progressStatus === 2) {
    pushinBtn = twoPro;
  }

  let oneRej = (
    <button
      className="btn btn-danger rounded-0 w-100"
      onClick={rejectMonitoring}
    >
      HR Disapprove <i className="fa fa-times-circle"></i>
    </button>
  );
  let triRej = (
    <button disabled className="btn btn-danger rounded-0 w-100">
      Disapproved <i className="fa fa-times-circle"></i>
    </button>
  );

  let rejecBTN = "";
  if (progressStatus === 1) {
    rejecBTN = oneRej;
  } else if (progressStatus === 3) {
    rejecBTN = triRej;
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
          <div className="card ">
            <div className="card-header">
              <h5>Performance Monitoring Header</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">Area Support 1</label>
                    <input
                      disabled
                      type="text"
                      className="form-control"
                      value={headerData[0].areasofSupport}
                      // onChange={(e) => setAreaSupport1(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <label htmlFor="">Area Support 2</label>
                  <input
                    disabled
                    type="text"
                    className="form-control"
                    value={headerData[0].areasofSupport2}
                    // onChange={(e) => setAreaSupport2(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="">Recommendation</label>
                  <input
                    disabled
                    type="text"
                    className="form-control"
                    value={headerData[0].recommendations}
                    // onChange={(e) => setRecommendation(e.target.value)}
                  />
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      id=""
                      cols="30"
                      rows="1"
                      placeholder="HR Remarks"
                      value={HRRemark}
                      onChange={(e) => setHRRemark(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4"></div>
                <div className="col-md-4 d-flex justify-content-end">
                  <button
                    className="btn btn-info rounded-1"
                    onClick={updateHRRemarks}
                    disabled={progressStatus === 1 ? false : true}
                  >
                    {" "}
                    Post Remark{" "}
                  </button>
                </div>
              </div>
            </div>
            <div className="card-header">
              <h5>Performance Lines</h5>
            </div>
            <div className="card-body">
              <div className="Lines-set">
                {plines.map((x3, i3) => (
                  <div className="row mx-1" key={i3}>
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              placeholder="Performance Parameter"
                              name="performanceparameter"
                              value={x3.performanceparameter}
                              onChange={(e) =>
                                handleInputChecklistChange(e, i3)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <input
                              disabled
                              type="text"
                              className="form-control "
                              placeholder="Current Performance"
                              name="currentperformance"
                              value={x3.currentperformance}
                              onChange={(e) =>
                                handleInputChecklistChange(e, i3)
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <textarea
                              disabled
                              className="form-control"
                              id=""
                              rows="2"
                              placeholder="Month 1"
                              name="month1"
                              value={x3.month1}
                              onChange={(e) =>
                                handleInputChecklistChange(e, i3)
                              }
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <textarea
                              disabled
                              className="form-control"
                              id=""
                              rows="2"
                              placeholder="Month 2"
                              name="month2"
                              value={x3.month2}
                              onChange={(e) =>
                                handleInputChecklistChange(e, i3)
                              }
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <textarea
                              disabled
                              className="form-control"
                              id=""
                              rows="2"
                              placeholder="Month 3"
                              name="month3"
                              value={x3.month3}
                              onChange={(e) =>
                                handleInputChecklistChange(e, i3)
                              }
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="col-md-0">
                      <div className="button-div d-none">
                        {plines.length !== 1 && (
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
                        {plines.length - 1 === i3 && (
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
            <div className="card-header">
              <h5>PIP Data Section</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-5">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Performance Contract Months i.e October 22 "
                      value={performanceMonth}
                      onChange={(e) => setPerformanceMonth(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Performance Review Date i.e 1st week of Nov"
                      value={reviewDate}
                      onChange={(e) => setReviewDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group text-right">
                    <button className="btn btn-info" onClick={uploadPIPHeader}
                     disabled={progressStatus === 1 ? false : true}
                    >
                      Upload <i className="fa fa-arrow-up"></i>
                    </button>
                  </div>
                </div>
                <div className="">
                  <h6>Template Entry Lines</h6>
                  <div className="Lines-set">
                    {tlines.map((x3, i3) => (
                      <div className="row mx-1" key={i3}>
                        <div className="col-md-8">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control "
                                  placeholder="Month"
                                  name="month"
                                  value={x3.month}
                                  onChange={(e) =>
                                    handleInputChecklistChange(e, i3)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control "
                                  placeholder="Must Achieve Sales Target"
                                  name="salesTarget"
                                  value={x3.salesTarget}
                                  onChange={(e) =>
                                    handleInputChecklistChange(e, i3)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control "
                                  placeholder="Must Achieve Active Sales Reps"
                                  name="salesRep"
                                  value={x3.salesRep}
                                  onChange={(e) =>
                                    handleInputChecklistChange(e, i3)
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="button-div">
                          <>
                                <button
                                  type="button"
                                  className="btn btn-danger rounded-0"
                                  onClick={() =>
                                    handleRemoveCheckistClickPIP(i3)
                                  }
                                >
                                  Del <i className="fa fa-trash"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-success rounded-0"
                                  onClick={() =>
                                    handlePushChecklistClickPIP(i3)
                                  }
                                  disabled={progressStatus === 1 ? false : true}
                                >
                                  Post <i className="fa fa-arrow-up"></i>
                                </button>
                              </>
                              {tlines.length - 1 === i3 && (
                              <>
                                <button
                                  type="button"
                                  className="btn btn-info rounded-0"
                                  onClick={handleAddChecklistClickPIP}
                                  disabled={progressStatus === 1 ? false : true}
                                >
                                  New Line <i className="fa fa-arrow-down"></i>
                                </button>
                              </>
                            )}


                            {/* {tlines.length !== 1 && (
                              <>
                                <button
                                  type="button"
                                  className="btn btn-danger "
                                  onClick={() =>
                                    handleRemoveCheckistClickPIP(i3)
                                  }
                                >
                                  Del <i className="fa fa-trash"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-success "
                                  onClick={() =>
                                    handlePushChecklistClickPIP(i3)
                                  }
                                  disabled={progressStatus === 1 ? false : true}
                                >
                                  Push <i className="fa fa-arrow-up"></i>
                                </button>
                              </>
                            )}
                            {tlines.length - 1 === i3 && (
                              <>
                                <button
                                  type="button"
                                  className="btn btn-info "
                                  onClick={handleAddChecklistClickPIP}
                                  disabled={progressStatus === 1 ? false : true}
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
                <div className="col-12">
                  <button
                    className="btn btn-warning rounded-0 w-100 "
                    onClick={pushToPIP}
                    disabled={progressStatus === 1 ? false : true}
                  >
                    Push User To PIP <i className="fa fa-user"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor=""> Action</label>
                    <button
                      className="form-control btn btn-info rounded-0"
                      onClick={viewSupportingDoc}
                    >
                      View Supporting Doc <i className="fa fa-file-pdf-o"></i>
                    </button>
                  </div>
                </div>
                <div className="col-md-8">
                  <label htmlFor=""> Action</label>
                  <div className="d-flex">
                    {pushinBtn}
                    {rejecBTN}
                  </div>

                  {/* <div className="">
                    <label htmlFor=""> Action</label>
                    <div className="button-div">
                     
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default withRouter(HRMonitoringCard);
