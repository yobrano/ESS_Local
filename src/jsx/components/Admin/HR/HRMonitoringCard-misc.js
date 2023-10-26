import axios from "axios";
import React, { useState, useRef, useEffect, useMemo, forwardRef } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";
import { Button, Collapse } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import  secureLocalStorage  from  "react-secure-storage"; import { decryptToken} from "./../../../../AppUtility"; import jwt_decode from "jwt-decode";

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
  //F=Flag
  const [extensionF, setExtensionF] = useState(false);
  const [confirmationF, setConfirmationF] = useState(false);
  const [nonConfirmF, setnonConfirmF] = useState(false);

  //Extesion Fields
  const [extendDuration, setExtendDuration] = useState("");
  const [extendDate, setExtendDate] = useState(new Date());
  const [nextReviewDate, setNextReviewDate] = useState(new Date());
  //Confirmation Fields
  const [contractDate, setContractDate] = useState(new Date());
  const [contractExpire, setContractExpire] = useState(new Date());
  //Non-Confirmation Fields
  const [constractEndDate, setContractEndDate] = useState(new Date());

  const toggleCollapse = (from) => {
    switch (from) {
      case "extend":
        setExtensionF(true);
        setConfirmationF(false);
        setnonConfirmF(false);
        break;
      case "confirm":
        setExtensionF(false);
        setConfirmationF(true);
        setnonConfirmF(false);
        break;
      case "nonconfirm":
        setExtensionF(false);
        setConfirmationF(false);
        setnonConfirmF(true);
        break;
      default:
        setExtensionF(true);
        setConfirmationF(false);
        setnonConfirmF(false);
        break;
    }
  };
  // handle input change
  const handleInputChecklistChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...plines];
    list[index][name] = value;
    list[index].id = index;
    setPlines(list);
  };
  // handle cick event of the remove button
  const handleRemoveCheckistClick = (index) => {
    const list1 = [...plines];
    let _no = list1[index].monitorno;
    if (_no !== "") {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureLocalStorage.getItem("userDetails"))
          }`,
        },
      };
      let data = {
        id: list1[index].id,
        Monitorno: headerData.monitorNo,
        Currentperformance: list1[index].currentperformance,
        Performanceparameter: list1[index].performanceparameter,
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
              `${process.env.REACT_APP_API_S_LINK}/staffrequision/deletemonitoringline`,
              data,
              config
            );
          }
        })
        .then((json) => {
          // // =>console.log(json.data);
          list1.splice(index, 1);
          setPlines(list1);
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
      setPlines(list1);
    }
  };

  //handle click event of the Add button
  const handleAddChecklistClick = () => {
    const list = [...plines];
    if (list[0] !== undefined) {
      let auxcode = list[0]["monitorno"];
      setPlines([
        ...plines,
        {
          id: "",
          currentperformance: "",
          monitorno: auxcode,
          month1: "",
          month2: "",
          month3: "",
          performanceparameter: "",
          original: false,
        },
      ]);
    } else {
      swal("Oh", "Define Qualification Code in D365", "error");
    }
  };
  const handlePushChecklistClick = (index) => {
    //Add record to d365

    const list = [...plines];
    let record = list[index];
    let _code = list[0]["monitorno"];
    if (list[0]["monitorno"] === undefined || list[0]["monitorno"] === "") {
      //means its the first row
      let data = {
        id: record.id,
        Currentperformance: record.currentperformance,
        Monitorno: headerData.monitorNo,
        Month1: record.month1,
        Month2: record.month2,
        Month3: record.month3,
        Performanceparameter: record.performanceparameter,
        Original: record.original,
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
              `${process.env.REACT_APP_API_S_LINK}/staffrequision/addmonitoringline`,
              data,
              config
            );
          }
        })
        .then((json) => {
          // =>console.log(json.data);
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
      let data = {
        id: record.id,
        Currentperformance: record.currentperformance,
        Monitorno: record.monitorno,
        Month1: record.month1,
        Month2: record.month2,
        Month3: record.month3,
        Performanceparameter: record.performanceparameter,
        Original: record.original,
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
              `${process.env.REACT_APP_API_S_LINK}/staffrequision/addmonitoringline`,
              data,
              config
            );
          }
        })
        .then((json) => {
          // =>console.log(json.data);
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
    }
  };

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
        `${process.env.REACT_APP_API_S_LINK}/staffrequision/getdataline/${props.location.state[0].datum[0].performanceId}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data);
          setMonitorId(props.location.state[0].datum[0].performanceId);
          setPlines(response.data.performanceLineModels);

          // populateReqList();
          // setLoading(false);
          setProgressStatus(response.data.dbPerMonitor.progresscode);
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
          // =>console.log(response.data);

          setHeaderData(response.data.monitoringHeadModels);
          setHRRemark(response.data.monitoringHeadModels[0].hrRemarks);
          setLoading(false);
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          // =>console.log(response.data.message);
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
          JSON.parse(secureLocalStorage.getItem("userDetails"))
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
        // =>console.log(json.data);
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
          JSON.parse(secureLocalStorage.getItem("userDetails"))
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
        // =>console.log(json.data);
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
          JSON.parse(secureLocalStorage.getItem("userDetails"))
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
        // =>console.log(json.data);
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

  //Push to HR
  const pushToHR = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
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
        // =>console.log(json.data);
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

  //Non-Confirmation
  const NonConfirmation = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    let Data = {
      StaffID: headerData[0].staff,
      ContractEndDate: constractEndDate,
      MonitorID: headerData[0].monitorNo,
    };
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Non-Confirm",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/staffrequision/nonconfirmation`,
            Data,
            config
          );
        }
      })
      .then((json) => {
        // =>console.log(json.data);
        swal("Oh!", json.data.message, "error");
        swal("Success!", "Your record has been non confirmed!", "success");
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

  //Confirm
  const Confirm = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    let Data = {
      StaffID: headerData[0].staff,
      ContractExpire: contractExpire,
      ContractDate: contractDate,
      MonitorID: headerData[0].monitorNo,
    };
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Confirm",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/staffrequision/confirmation`,
            Data,
            config
          );
        }
      })
      .then((json) => {
        // =>console.log(json.data);
        swal("Oh!", json.data.message, "error");
        swal("Success!", "Your record has been confirmed!", "success");
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

  //Extend
  const Extend = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    let Data = {
      StaffID: headerData[0].staff,
      ExtendDuration: extendDuration,
      ExtendDate: extendDate,
      NextReviewDate: nextReviewDate,
      MonitorID: headerData[0].monitorNo,
    };
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Extend",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/staffrequision/extension`,
            Data,
            config
          );
        }
      })
      .then((json) => {
        // =>console.log(json.data);
        swal("Oh!", json.data.message, "error");
        swal("Success!", "Your record has been Extended!", "success");
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
            JSON.parse(secureLocalStorage.getItem("userDetails"))
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
          JSON.parse(secureLocalStorage.getItem("userDetails"))
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
          JSON.parse(secureLocalStorage.getItem("userDetails"))
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
        if (err !== undefined) {
          swal("Oops!", "Document Missing/Fetch Failed", "error");
        }

        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }

        console.log({ err: err });
      });
  };

  let zeroPro = (
    <button disabled className="btn btn-warning rounded-0" onClick={pushToHR}>
      Push to HR <i className="fa fa-user"></i>
    </button>
  );
  let onePro = (
    <>
      {/* <Button
        className="btn btn-secondary rounded-0 w-100"
        onClick={() => toggleCollapse("extend")}
        aria-controls="example-collapse-text"
        aria-expanded={extensionF}
      >
        Extension <i className="fa fa-repeat"></i>
      </Button>

      <Button
        className="btn btn-success rounded-0 w-100"
        onClick={() => toggleCollapse("confirm")}
        aria-controls="example-collapse-text"
        aria-expanded={confirmationF}
      >
        Confirmation <i className="fa fa-check"></i>
      </Button>
      <Button
        className="btn btn-danger rounded-0 w-100"
        onClick={() => toggleCollapse("nonconfirm")}
        aria-controls="example-collapse-text"
        aria-expanded={nonConfirmF}
      >
        Non-Confirmation <i className="fa fa-times"></i>
      </Button> */}
    <button disabled className="btn btn-warning rounded-0" onClick={pushToHR}>
      Push to HR <i className="fa fa-user"></i>
    </button>
    </>
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
  
  let triPro = (
    <button
      disabled
      className="btn btn-secondary rounded-0 w-100 "
      onClick={approveMonitoring}
    >
      HR Rejected <i className="fa fa-user"></i>
    </button>
  );

  let pushinBtn = "";

  if (progressStatus === 0) {
    pushinBtn = zeroPro;
  } else if (progressStatus === 1) {
    pushinBtn = onePro;
  } else if (progressStatus === 2) {
    pushinBtn = twoPro;
  } else if (progressStatus === 3) {
    pushinBtn = triPro;
  }

  let oneRej = (
    <button className="btn btn-danger rounded-0" onClick={rejectMonitoring}>
      Disapprove
      <i className="fa fa-times-circle"></i>
    </button>
  );
  let triRej = (
    <button disabled className="btn btn-danger rounded-0">
      Disapproved
      <i className="fa fa-times-circle"></i>
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

                    <div className="col-md-0">
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col-md-3">
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
                <div className="col-md-9">
                  <div className="d-flex flex-column">
                    <label htmlFor=""> Action</label>
                    <div className="button-div d-flex">
                      {pushinBtn}
                      {/* {rejecBTN} */}
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <Collapse in={extensionF}>
                    <div id="example-collapse-text">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="">Extend Duration For</label>
                            <input
                              type="text"
                              className="form-control"
                              value={extendDuration}
                              onChange={(e) =>
                                setExtendDuration(e.target.value)
                              }
                              placeholder="1 Weeks"
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="">Extend Date To</label>
                            <DatePicker
                              name="extendDate"
                              selected={extendDate}
                              onChange={(date) => setExtendDate(date)}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group">
                            <label htmlFor="">Next Review Date</label>
                            <DatePicker
                              name="nextReviewDate"
                              selected={nextReviewDate}
                              onChange={(date) => setNextReviewDate(date)}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <button
                            className="btn btn-secondary rounded-0 w-100"
                            onClick={Extend}
                          >
                            Extension <i className="fa fa-repeat"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Collapse> 

                  <Collapse in={confirmationF}>
                    <div id="example-collapse-text">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="">Contract Date</label>
                            <DatePicker
                              name="contractDate"
                              selected={contractDate}
                              onChange={(date) => setContractDate(date)}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="">Contract Expire Date</label>
                            <DatePicker
                              name="contractExpire"
                              selected={contractExpire}
                              onChange={(date) => setContractExpire(date)}
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <button
                            className="btn btn-success rounded-0 w-100"
                            onClick={Confirm}
                          >
                            Confirmation <i className="fa fa-check"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Collapse>

                  <Collapse in={nonConfirmF}>
                    <div id="example-collapse-text">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="">Contract End Date</label>
                              <DatePicker
                                name="constractEndDate"
                                selected={constractEndDate}
                                onChange={(date) => setContractEndDate(date)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <button
                            className="btn btn-danger rounded-0 w-100"
                            onClick={NonConfirmation}
                          >
                            Non-Confirmation <i className="fa fa-times"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Collapse>
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
