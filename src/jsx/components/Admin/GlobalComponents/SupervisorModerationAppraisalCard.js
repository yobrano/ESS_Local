import axios from "axios";
import { setDate } from "date-fns/esm";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import swal from "sweetalert";
import BreadCrumb from "./BreadCrumb";

const SupervisorModerationAppraisalCard = (props) => {
  const [loading, setLoading] = useState(true);
  const [jobkpiList, setJobkpiList] = useState([]);
  const [selectedKPI, setSelectedKPI] = useState({});
  const [data, setData] = useState({});
  const [activityList, setActivityList] = useState([]);
  const [standardList, setStandardList] = useState([]);

  const [disableCreateNewActivity, setDisableCreateNewActivity] =
    useState(true);
  const [disableCreateNewStandard, setDisableCreateNewStandard] =
    useState(true);

  const [areaOfAchievement, setAreaOfAchievement] = useState([]);
  const [areaofDevelopmentList1, setAreaofDevelopmentList1] = useState([]);
  const [specificfocusList1, setSpecificfocusList1] = useState([]);

  const [areaofDevelopmentList, setAreaofDevelopmentList] = useState([]);
  const [specificfocusList, setSpecificfocusList] = useState([]);


  const [isActive,setIsActive] = useState(true)

  useEffect(() => {
    //let docCode = props.location.state[0].datum[0].documentCode;
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/performance/getsupervisormoderatedsinglekpi/${props.location.state[0].datum[0].no}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          setJobkpiList(response.data.performanceIndicators);
          setData(props.location.state[0].datum[0]);
          InitialStdLoad();
          GetReflectionData();
          if(props.location.state[0].datum[0].appraisalLevel ==="Employee"){

            setIsActive(false)
          }
          

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

  // useEffect(() => {
  //   if (selectedKPI.value !== undefined) {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${
  //           JSON.parse(localStorage.getItem("userDetails")).idToken
  //         }`,
  //       },
  //     };

  //     axios
  //       .get(
  //         `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/getsupervisormoderatedappraisalperformancestdperkpi/${selectedKPI.value}/${props.location.state[0].datum[0].no}`,
  //         config
  //       )
  //       .then(function (response) {
  //         if (response.status === 200) {
  //           console.log(response.data);
  //           // setActivityList(response.data.performanceActivities);
  //           setStandardList(response.data.supervisorAppraisalStandards);
  //           setDisableCreateNewActivity(false);
  //           setDisableCreateNewStandard(false);
  //         }
  //         if (response.status === 404) {
  //           swal("Oh!", response.data.message, "error");
  //           console.log(response.data.message);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log({ err: err });
  //         if (err.response !== undefined) {
  //           swal("Ooh!", err.response.data.message, "error");
  //         } else {
  //           swal("Oh!", err.message, "error");
  //         }
  //       });
  //   }
  // }, [selectedKPI]);

  //Reflection initial Data
  const GetReflectionData = () => {
    //Get Job Cat 5 data
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/getreflectionsupervisordata/${props.location.state[0].datum[0].no}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          //Area of Achievement
          setAreaOfAchievement(response.data.areaofAchievementList);
          setAreaofDevelopmentList(response.data.areaofDevelopmentList);
          setSpecificfocusList1(response.data.specificFocusList1)
          
          setAreaofDevelopmentList1(response.data.areaofDevelopmentList1) //supervisor
          setSpecificfocusList(response.data.specificFocusList);//supervisor

          console.log(response.data);
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log({ err: err });
        swal("Oh!", err.data.message, "error");
      });
  };

  const InitialStdLoad = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/getmoderatedsupervisorappraisalperformancestd/${props.location.state[0].datum[0].no}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          // setActivityList(response.data.performanceActivities);
          setStandardList(response.data.employeeAppraisalStandards);
          setDisableCreateNewActivity(false);
          setDisableCreateNewStandard(false);
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

  const DeleteActivity = (targetCode, headerNo, kpiCode) => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    let udata = {
      HeaderNo: headerNo,
      KPICode: parseInt(kpiCode),
      TargetCode: parseInt(targetCode),
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Delete",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        // setPostBtnState(true)
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/performance/deleteperformanceactivity/`,
            udata,
            config
          );
        }
      })
      .then(function (response) {
        if (response.status === 200) {
          props.history.go(-2);
        }
      })
      .catch((err) => {
        // console.log("catch err:"+err);
        if (err !== undefined) {
          swal("Ooh!", "Error File not Found", "error");
        }
        if (err.response !== undefined) {
          swal("Ooh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
      });
  };

  const ApproveAppraisal = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Send Request?",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        // setPostBtnState(true)
        if (willCreate) {
          return axios.get(
            `${process.env.REACT_APP_API_S_LINK}/performance/approveappraisaltarget/${data.no}`,
            config
          );
        }
      })
      .then(function (response) {
        if (response.status === 200) {
          // props.history.go(-2)
          swal("Yes!", response.data.message, "success");
        }
      })
      .catch((err) => {
        console.log("catch err:" + err);
        // if (err !== undefined) {
        //   swal("Ooh!", err, "error");
        // }
        if (err.response !== undefined) {
          swal("Ooh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
      });
  };

  const EditAppraisalRec = (
    tcode,
    indicode,
    kpicode,
    headerno,
    tscore,
    stdesc,
    supscore,
    supcomment,
  ) => {
    props.history.push("/edit-supervisor-moderated", [
      {
        targetcode: tcode,
        indicatorcode: indicode,
        kpicode: kpicode,
        headerno: headerno,
        targetscore: tscore,
        standarddesc: stdesc,
        supscore: supscore,
        supcomment: supcomment,
      },
    ]);
  };

  //Calculate Weight
  const CalculateWeight = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Calculate",
      icon: "warning",
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          return axios.get(
            `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/moderatedsupervisorcalculateweight/${props.location.state[0].datum[0].no}`,
            config
          );
        }
      })
      .then((json) => {
        swal("Success!", "Your record has been Calculated", "success");
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", "Seems like we couldn't Calculate the record", "error");
      });
  };


    //Submit to Superviser
    const SubmitSuperviser = () => {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userDetails")).idToken
          }`,
        },
      };
      swal({
        title: "Are you sure?",
        text: "Are you sure that you want to Submit",
        icon: "warning",
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            return axios.get(
              `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/moderatedsuperviserapprove/${props.location.state[0].datum[0].no}`,
              config
            );
          }
        })
        .then((json) => {
          swal("Success!", "Your record has been Submited", "success");
        })
        .catch((err) => {
          console.log(err);
          if (err.response !== undefined) {
            swal("Ooh!", err.response.data.message, "error");
          } else {
            swal("Oh!", err.message, "error");
          }
        });
    };

    //Push Back To Employe
    const PushToEmployee = () => {
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
        .then((willDelete) => {
          if (willDelete) {
            return axios.get(
              `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/moderatedsuperviserreturn/${props.location.state[0].datum[0].no}`,
              config
            );
          }
        })
        .then((json) => {
          swal("Success!", "Your record has been Pushed", "success");
        })
        .catch((err) => {
          console.log(err);
          if (err.response !== undefined) {
            swal("Ooh!", err.response.data.message, "error");
          } else {
            swal("Oh!", err.message, "error");
          }
        });
    };
    



  // handle input change
  const handleInputAreaOfDevelopmentChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...areaofDevelopmentList];

    if (name === "mandatory") {
      if (list[index]["mandatory"] === "No") {
        list[index][name] = "Yes";
        list[index].id = index;

        setAreaofDevelopmentList(list);
      } else {
        list[index][name] = "No";
        list[index].id = index;
        console.log(list);
        setAreaofDevelopmentList(list);
      }
    } else {
      list[index][name] = value;
      list[index].id = index;
      setAreaofDevelopmentList(list);
    }
  };
  // handle cick event of the remove button
  const handleRemoveAreaOfDevelopmentClick = (index) => {
    const list = [...areaofDevelopmentList];

    let record = list[index];

    if (record.lineNo !== "") {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userDetails")).idToken
          }`,
        },
      };
      let data = {
        HeaderNo: props.location.state[0].datum[0].no,
        LineNo: record.lineNo,
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
              `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/deleteareaofimprovement/`,
              data,
              config
            );
          }
        })
        .then((json) => {
          list.splice(index, 1);
          setAreaofDevelopmentList(list);
          swal("Success!", "Your record has been Deleted!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't delete the record", "error");
        });
    } else {
      list.splice(index, 1);
      setAreaofDevelopmentList(list);
    }
  };
  //handle cick event of the Add button
  const handleAddAreaOfDevelopmentClick = () => {
    // const list = [...areaOfAchievement];
    // if (list[0] !== undefined) {
    // let requirementcode = list[0]["rqmentcode"];
    setAreaofDevelopmentList([
      ...areaofDevelopmentList,
      {
        id: "",
        lineNo: "",
        HeaderNo: "",
        areaOfDevelopment: "",
      },
    ]);
    // } else {
    //   swal("Oh", "Define Requirement Code in D365", "error");
    // }
  };
  const handlePushAreaOfDevelopmentClick = (index) => {
    //Get the record
    const list = [...areaofDevelopmentList];
    let record = list[index];
    // console.log(record);

    if (record.lineNo === "") {
      //Oridinal Entry
      let data = {
        HeaderNo: props.location.state[0].datum[0].no,
        AreaOfDevelopment: record.areaOfDevelopment,
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
              `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/createareaofimprovement`,
              data,
              config
              // method: 'post',
            );
          }
        })
        // .then(result => result.json())
        .then((json) => {
          console.log(json.data);
          swal("Success!", "Your record has been uploaded!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't upload the record", "error");
        });
    } else {
      //Modify Entry
      let data = {
        HeaderNo: props.location.state[0].datum[0].no,
        LineNo: record.lineNo,
        AreaOfDevelopment: record.areaOfDevelopment,
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
        text: "Are you sure that you want to Update",
        icon: "warning",
        dangerMode: true,
      })
        .then((willUpload) => {
          if (willUpload) {
            return axios.post(
              `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/modifyareaofimprovement`,
              data,
              config
              // method: 'post',
            );
          }
        })
        // .then(result => result.json())
        .then((json) => {
          console.log(json.data);
          swal("Success!", "Your record has been Updated!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't Update the record", "error");
        });
    }
  };



  // handle input change
  const handleInputSpecificFocusChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...specificfocusList];

    if (name === "mandatory") {
      if (list[index]["mandatory"] === "No") {
        list[index][name] = "Yes";
        list[index].id = index;

        setSpecificfocusList(list);
      } else {
        list[index][name] = "No";
        list[index].id = index;
        console.log(list);
        setSpecificfocusList(list);
      }
    } else {
      list[index][name] = value;
      list[index].id = index;
      setSpecificfocusList(list);
    }
  };
  // handle cick event of the remove button
  const handleRemoveSpecificFocusClick = (index) => {
    const list = [...specificfocusList];

    let record = list[index];

    if (record.lineNo !== "") {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userDetails")).idToken
          }`,
        },
      };
      let data = {
        HeaderNo: props.location.state[0].datum[0].no,
        LineNo: record.lineNo,
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
              `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/deletetrainingneed/`,
              data,
              config
            );
          }
        })
        .then((json) => {
          list.splice(index, 1);
          setSpecificfocusList(list);
          swal("Success!", "Your record has been Deleted!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't delete the record", "error");
        });
    } else {
      list.splice(index, 1);
      setSpecificfocusList(list);
    }
  };
  //handle cick event of the Add button
  const handleAddSpecificFocusClick = () => {
    // const list = [...areaOfAchievement];
    // if (list[0] !== undefined) {
    // let requirementcode = list[0]["rqmentcode"];
    setSpecificfocusList([
      ...specificfocusList,
      {
        id: "",
        lineNo: "",
        HeaderNo: "",
        specificFocusArea: "",
      },
    ]);
    // } else {
    //   swal("Oh", "Define Requirement Code in D365", "error");
    // }
  };
  const handlePushSpecificFocusClick = (index) => {
    //Get the record
    const list = [...specificfocusList];
    let record = list[index];
    // console.log(record);

    if (record.lineNo === "") {
      //Oridinal Entry
      let data = {
        HeaderNo: props.location.state[0].datum[0].no,
        SpecificFocusArea: record.specificFocusArea,
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
              `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/createtrainingneed`,
              data,
              config
              // method: 'post',
            );
          }
        })
        // .then(result => result.json())
        .then((json) => {
          console.log(json.data);
          swal("Success!", "Your record has been uploaded!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't upload the record", "error");
        });
    } else {
      //Modify Entry
      let data = {
        HeaderNo: props.location.state[0].datum[0].no,
        LineNo: record.lineNo,
        SpecificFocusArea: record.specificFocusArea,
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
        text: "Are you sure that you want to Update",
        icon: "warning",
        dangerMode: true,
      })
        .then((willUpload) => {
          if (willUpload) {
            return axios.post(
              `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/modifytrainingneed`,
              data,
              config
              // method: 'post',
            );
          }
        })
        // .then(result => result.json())
        .then((json) => {
          console.log(json.data);
          swal("Success!", "Your record has been Updated!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't Update the record", "error");
        });
    }
  };



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
      <div className="container">
      <BreadCrumb props={props} backlink={"supervisor-moderation"}/>
        {/* <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8"> */}
        <div className="d-md-flex justify-content-end mb-2">
          <button className="btn btn-danger rounded-0" onClick={PushToEmployee} disabled={!isActive}>
             Return to Employee<i className="ml-2 fa fa-arrow-circle-left"></i>{" "}
          </button>
          <button className="btn btn-warning rounded-0" onClick={SubmitSuperviser} disabled={!isActive}>
             Supervisor Approve<i className="ml-2 fa fa-arrow-circle-up"></i>{" "}
          </button>
          <button className="btn btn-info rounded-0" onClick={CalculateWeight} disabled={!isActive}>
            Calculate Weight <i className="ml-2  	fa fa-calculator"></i>
          </button>
        </div>
        {/* </div>
          <div className="col-md-2"></div>
        </div> */}
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">KPI No</label>
                  <input
                    type="text"
                    className="form-control"
                    value={data.no}
                    disabled={true}
                  />
                </div>
              </div>
              {/* <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Period</label>
                  <input
                    type="text"
                    className="form-control"
                    value={data.period}
                    disabled={true}
                  />
                </div>
              </div> */}
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Appraisal Period</label>
                  <input
                    type="text"
                    className="form-control"
                    value={data.appraisalPeriod}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Appraisal Start Period</label>
                  <input
                    type="text"
                    className="form-control"
                    value={data.appraisalStartPeriod}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Appraisal End Period</label>
                  <input
                    type="text"
                    className="form-control"
                    value={data.appraisalEndPeriod}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Employee Designation</label>
                  <input
                    type="text"
                    className="form-control"
                    value={data.employeeDesgnation}
                    disabled={true}
                  />
                </div>
              </div>
              {/* <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Job No</label>
                  <input
                    type="text"
                    className="form-control"
                    value={data.jobNo}
                    disabled={true}
                  />
                </div>
              </div> */}

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Job Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={data.jobTitle}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Manager No</label>
                  <input
                    type="text"
                    className="form-control"
                    value={data.managerNo}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Manager No</label>
                  <input
                    type="text"
                    className="form-control"
                    value={data.managerNo}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Manager Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={data.managerName}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Manager Designation</label>
                  <input
                    type="text"
                    className="form-control"
                    value={data.managerDesignation}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
            {/* <button onClick={() => props.history.go(-2)}>Back</button> */}
          </div>
          <div className="col-md-12">
            <div className="d-flex mb-2  mt-1">
              {/* <button className="btn btn-warning rounded-0 d-none" onClick={ApproveAppraisal}> Submit For Approval <i className="flaticon-381-success-1"></i></button> */}
              <h4 className="my-0 ml-auto">KPIs</h4>
            </div>
            <div className="table-responsive">
              <table
                id="example"
                className="display w-100 dataTable table"
                role="grid"
                aria-describedby="example_info"
              >
                <thead className="thead-light">
                  <tr>
                    {/* <th>KPI No</th> */}
                    <th>Performance Indicators</th>
                    <th>Objective Weightage</th>
                    <th>Targeted Score</th>
                    <th>Achieved Score Employee</th>
                    <th>Weighted Score Employee</th>
                    <th>Achieved Score Supervisor</th>
                    <th>Weighted Score Supervisor</th>
                    <th>Overall Achieved Score</th>
                    <th>Overall Weight Result</th>

                  </tr>
                </thead>
                <tbody>
                  {jobkpiList.map((d, i) => (
                    <tr key={i}>
                      {/* <td>{++i}</td> */}
                      {/* <td>{d.value}</td> */}
                      <td>{d.label}</td>
                      <td>{d.objectiveWeightage}</td>
                      <td>{d.targetedScore}</td>
                      <td>{d.achievedScoreEmployee}</td>
                      <td>{d.weightedResultsEmployee}</td>
                      <td>{d.achievedScoreSupervisor}</td>
                      <td>{d.weightedResultsSupervisor}</td>
                      <td>{d.overallAchievedScore}</td>
                      <td>{d.overallWeightedResults}</td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row d-none">
          <h4 className="my-3 text-center">
            Job Key Performance Indicator Selector
          </h4>
          <div className="col-xl-12 col-sm-12">
            <div className="form-control1">
              {/* <label htmlFor="">Employee</label> */}
              <Select
                defaultValue={selectedKPI}
                onChange={setSelectedKPI}
                options={jobkpiList}
              />
            </div>
          </div>
        </div>
      

        {/* <div className="row"> */}
        <div className="card my-4">
          <div className="card-header">
            Performance Standards
            <i className="fa fa-circle-o ml-2"></i>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                id="example"
                className="display w-100 dataTable table"
                role="grid"
                aria-describedby="example_info"
              >
                <thead className="thead-light">
                  <tr>
                    <th>KPI Description</th>
                    <th>Activity Description</th>
                    <th>Performance Standard</th>
                    {/* <th>Time-lines</th> */}
                    <th>Std Weight</th>
                    <th>Target Score</th>
                    <th>Employee Score</th>
                    <th>Supervisor Score</th>
                    <th>Overall Achieved Score</th>
                    <th>Employee Comment</th>
                    <th>Supervisor Comment</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {standardList.map((d, i) => (
                    <tr key={i}>
                      <td>{d.kpiDescription}</td>
                      <td>{d.activityDescription}</td>
                      <td>{d.standardDescription}</td>
                      {/* <td>{d.timelines}</td> */}
                      <td>{d.standardWeighting}</td>
                      <td>{d.targetedScore}</td>
                      <td>{d.achievedScoreEmployee}</td>
                      <td>{d.achievedScoreSupervisor}</td>
                      <td>{d.overallAchievedScore}</td>
                      <td>{d.employeeComments}</td>
                      <td>{d.supervisorComments}</td>
                      <td className="">
                        <button
                          className="btn btn-info rounded-0 w-100"
                          onClick={() =>
                            EditAppraisalRec(
                              d.targetCode,
                              d.indicatorCode,
                              d.criteriaCode,
                              d.headerNo,
                              d.targetedScore,
                              d.standardDescription,

                              d.achievedScoreSupervisor,
                              d.supervisorComments
                            )
                          }
                          // disabled={isActive}
                        >
                          Edit <i className="fa fa-edit"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* </div> */}

     

        {/* Your Refelction Area of Developement Sup */}
        <div className="card my-4">
          <div className="card-header">Area of Development Recommended by Supervisor</div>
          <div className="card-body">
            <h5 className="my-3 ml-3">Area of Development</h5>
            <div className="reqcontentDataDiv">
              <div className="jobRequirement-set">
                {areaofDevelopmentList.map((x3, i3) => (
                  <div className="row mx-1" key={i3}>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control rounded-0"
                          placeholder="Enter..."
                          name="areaOfDevelopment"
                          value={x3.areaOfDevelopment}
                          disabled
                          onChange={(e) =>
                            handleInputAreaOfDevelopmentChange(e, i3)
                          }
                        />
                      </div>
                    </div>

                    {/* <div className="col-md-4">
                      <div className="button-div">
                        {areaofDevelopmentList.length !== 1 && (
                          <>
                            <button
                              type="button"
                              className="btn btn-danger rounded-0"
                              onClick={() =>
                                handleRemoveAreaOfDevelopmentClick(i3)
                              }
                              disabled={isActive}
                            >
                              Del <i className="fa fa-trash"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-success rounded-0"
                              onClick={() =>
                                handlePushAreaOfDevelopmentClick(i3)
                              }
                              disabled={isActive}
                            >
                              Push <i className="fa fa-arrow-up"></i>
                            </button>
                          </>
                        )}
                        {areaofDevelopmentList.length - 1 === i3 && (
                          <>
                            <button
                              type="button"
                              className="btn btn-info rounded-0"
                              onClick={handleAddAreaOfDevelopmentClick}
                              disabled={isActive}
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

        {/* Your Area of training Sup*/}
        <div className="card my-4">
          <div className="card-header">Area of Training Recommended by Supervisor</div>
          <div className="card-body">
            <h5 className="my-3 ml-3">Training Area</h5>
            <div className="reqcontentDataDiv">
              <div className="jobRequirement-set">
                {specificfocusList.map((x3, i3) => (
                  <div className="row mx-1" key={i3}>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control rounded-0"
                          placeholder="Enter..."
                          name="specificFocusArea"
                          value={x3.specificFocusArea}
                          disabled
                          onChange={(e) =>
                            handleInputSpecificFocusChange(e, i3)
                          }
                        />
                      </div>
                    </div>

                    {/* <div className="col-md-4">
                      <div className="button-div">
                        {specificfocusList.length !== 1 && (
                          <>
                            <button
                              type="button"
                              className="btn btn-danger rounded-0"
                              onClick={() => handleRemoveSpecificFocusClick(i3)}
                              disabled={isActive}
                            >
                              Del <i className="fa fa-trash"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-success rounded-0"
                              onClick={() => handlePushSpecificFocusClick(i3)}
                              disabled={isActive}
                            >
                              Push <i className="fa fa-arrow-up"></i>
                            </button>
                          </>
                        )}
                        {specificfocusList.length - 1 === i3 && (
                          <>
                            <button
                              type="button"
                              className="btn btn-info rounded-0"
                              onClick={handleAddSpecificFocusClick}
                              disabled={isActive}
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


        {/* Your   Achievement*/}
        <div className="card my-4">
        <div className="card-header">Employee Reflection</div>
        <div className="card-body">
        <h5 className="my-3 ml-3">Staff Achievements</h5>
        <div className="reqcontentDataDiv">
        <div className="jobRequirement-set">
          {areaOfAchievement.map((x3, i3) => (
            <div className="row mx-1" key={i3}>
              <div className="col-md-8">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    placeholder="Enter..."
                    name="areaOfAchievement"
                    value={x3.areaOfAchievement}
                    disabled
                  />
                </div>
              </div>

              {/* <div className="col-md-4">
                <div className="button-div">
                  {areaOfAchievement.length !== 1 && (
                    <>
                      <button
                        type="button"
                        className="btn btn-danger rounded-0"
                        
                        disabled={isActive}
                      >
                        Del <i className="fa fa-trash"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-success rounded-0"
                        
                        disabled={isActive}
                      >
                        Push <i className="fa fa-arrow-up"></i>
                      </button>
                    </>
                  )}
                  {areaOfAchievement.length - 1 === i3 && (
                    <>
                      <button
                        type="button"
                        className="btn btn-info rounded-0"
                        
                        disabled={isActive}
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

        {/* Your Refelction Developement */}
        <div className="card my-4">
          <div className="card-header">Employee Reflection</div>
          <div className="card-body">
            <h5 className="my-3 ml-3">Areas of development identified by employee</h5>
            <div className="reqcontentDataDiv">
              <div className="jobRequirement-set">
                {areaofDevelopmentList1.map((x3, i3) => (
                  <div className="row mx-1" key={i3}>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control rounded-0"
                          placeholder="Enter..."
                          name="areaOfDevelopment"
                          value={x3.areaOfDevelopment}
                         disabled
                        />
                      </div>
                    </div>

                  
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Your Refelction Focus*/}
        <div className="card my-4">
          <div className="card-header">Employee Reflection</div>
          <div className="card-body">
            <h5 className="my-3 ml-3">Specific Focus Areas for Next Quater</h5>
            <div className="reqcontentDataDiv">
              <div className="jobRequirement-set">
                {specificfocusList1.map((x3, i3) => (
                  <div className="row mx-1" key={i3}>
                    <div className="col-md-8">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control rounded-0"
                          placeholder="Enter..."
                          name="specificFocusArea"
                          value={x3.specificFocusArea}
                          disabled
                        />
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

export default withRouter(SupervisorModerationAppraisalCard);
