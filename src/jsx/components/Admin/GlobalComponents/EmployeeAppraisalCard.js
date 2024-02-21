import secureLocalStorage from "react-secure-storage";
import jwt_decode from "jwt-decode";
import { decryptToken } from "./../../../../AppUtility";

import axios from "axios";
import { setDate } from "date-fns/esm";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import swal from "sweetalert";
import BreadCrumb from "./BreadCrumb";

const EmployeeAppraisalCard = (props) => {
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
  const [areaofDevelopmentList, setAreaofDevelopmentList] = useState([]);
  const [specificfocusList, setSpecificfocusList] = useState([]);

  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [customCourse, setCustomCourse] = useState({
    lineNo: "",
    ccustom: "",
  });

  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    //let docCode = props.location.state[0].datum[0].documentCode;
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          secureLocalStorage.getItem("userDetails")
        )}`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/performance/getsinglekpi/${props.location.state[0].datum[0].no}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          // => console.log(response.data);
          setJobkpiList(response.data.performanceIndicators);
          setData(props.location.state[0].datum[0]);
          InitialStdLoad();
          GetReflectionData();
          GetCoursesData();
          GetSelectedCourses();
          if (props.location.state[0].datum[0].appraisalLevel === "Employee") {
            setIsActive(false);
          }

          setLoading(false);
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          // => console.log(response.data.message);
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

  useEffect(() => {
    if (selectedKPI.value !== undefined) {
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            secureLocalStorage.getItem("userDetails")
          )}`,
        },
      };

      axios
        .get(
          `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/getappraisalperformancestdperkpi/${selectedKPI.value}/${props.location.state[0].datum[0].no}`,
          config
        )
        .then(function (response) {
          if (response.status === 200) {
            // => console.log(response.data);
            // setActivityList(response.data.performanceActivities);
            setStandardList(response.data.employeeAppraisalStandards);
            setDisableCreateNewActivity(false);
            setDisableCreateNewStandard(false);
          }
          if (response.status === 404) {
            swal("Oh!", response.data.message, "error");
            // => console.log(response.data.message);
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
  }, [selectedKPI]);

  //Reflection initial Data
  const GetReflectionData = () => {
    //Get Job Cat 5 data
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          secureLocalStorage.getItem("userDetails")
        )}`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/getreflectiondata/${props.location.state[0].datum[0].no}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          //Area of Achievement
          setAreaOfAchievement(response.data.areaofAchievementList);
          setAreaofDevelopmentList(response.data.areaofDevelopmentList);
          setSpecificfocusList(response.data.specificFocusList);

          // => console.log(response.data);
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          // => console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log({ err: err });
        swal("Oh!", err.data.message, "error");
      });
  };

  //Courses  Data
  const GetCoursesData = () => {
    //Get Job Cat 5 data
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          secureLocalStorage.getItem("userDetails")
        )}`,
      },
    };

    axios
      .get(`${process.env.REACT_APP_API_S_LINK}/lms/courses`, config)
      .then(function (response) {
        if (response.status === 200) {
          //Courses
          setCourses(response.data.courses);
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
        }
      })
      .catch((err) => {
        console.log({ err: err });
        swal("Oh!", err.data.message, "error");
      });
  };

  //Selected Courses  Data
  const GetSelectedCourses = () => {
    //Get Selected Courses
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          secureLocalStorage.getItem("userDetails")
        )}`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/lms/selectedcourse/${props.location.state[0].datum[0].employeeNo}/${props.location.state[0].datum[0].no}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          //Seleted Courses
          if (response.data.selectedCourse.length > 0) {
            setSelectedCourses(response.data.selectedCourse);
          } else {
            setSelectedCourses([{
              id: "",
              lineNo: "",
              course: { value: "", label: "" },
              employeeId: "",
              employeeName: "",
              employeeEmail: "",
              appraisalNo: "",
            }]);
          }
          if (response.data.customeCourse.length > 0) {
            setCustomCourse({
              lineNo: response.data.customeCourse[0].lineNo,
              ccustom: response.data.customeCourse[0].course.value,
            });
          } else {
            setCustomCourse({
              lineNo: "",
              ccustom: "",
            });
          }
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
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
        Authorization: `Bearer ${JSON.parse(
          secureLocalStorage.getItem("userDetails")
        )}`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/getappraisalperformancestd/${props.location.state[0].datum[0].no}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          // => console.log(response.data);
          // setActivityList(response.data.performanceActivities);
          setStandardList(response.data.employeeAppraisalStandards);
          setDisableCreateNewActivity(false);
          setDisableCreateNewStandard(false);
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          // => console.log(response.data.message);
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
        Authorization: `Bearer ${JSON.parse(
          secureLocalStorage.getItem("userDetails")
        )}`,
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
        console.log("catch err:" + err);
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
        Authorization: `Bearer ${JSON.parse(
          secureLocalStorage.getItem("userDetails")
        )}`,
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
    kpi,
    kpiactivity
  ) => {
    props.history.push("/edit-appraisal", [
      {
        targetcode: tcode,
        indicatorcode: indicode,
        kpicode: kpicode,
        headerno: headerno,
        targetscore: tscore,
        standarddesc: stdesc,
        kpiindicator: kpi,
        activity: kpiactivity,
      },
    ]);
  };

  //Calculate Weight
  const CalculateWeight = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          secureLocalStorage.getItem("userDetails")
        )}`,
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
            `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/calculateweight/${props.location.state[0].datum[0].no}`,
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
        Authorization: `Bearer ${JSON.parse(
          secureLocalStorage.getItem("userDetails")
        )}`,
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
            `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/submittosupervisor/${props.location.state[0].datum[0].no}`,
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

  //View Report
  const ViewReport = () => {
    const controller = new AbortController();

    const config = {
      responseType: "arraybuffer",
      headers: {
        Authorization: `Bearer ${JSON.parse(
          secureLocalStorage.getItem("userDetails")
        )}`,
        // responseType:'arraybuffer',
        // 'Content-Type': 'blob',
        // responseType: "blob",

        "Content-Type": "blob", //application/json
        Accept: "application/pdf",
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/viewemployeereport/${props.location.state[0].datum[0].no}`,
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
        console.log({ err: err });

        if (err.response !== undefined) {
          swal("Ooh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
      });
  };

  // handle input change
  const handleInputAreaofAchievementChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...areaOfAchievement];

    if (name === "mandatory") {
      if (list[index]["mandatory"] === "No") {
        list[index][name] = "Yes";
        list[index].id = index;

        setAreaOfAchievement(list);
      } else {
        list[index][name] = "No";
        list[index].id = index;
        // => console.log(list);
        setAreaOfAchievement(list);
      }
    } else {
      list[index][name] = value;
      list[index].id = index;
      setAreaOfAchievement(list);
    }
  };
  // handle cick event of the remove button
  const handleRemoveAreaofAchievementClick = (index) => {
    const list = [...areaOfAchievement];

    let record = list[index];

    if (record.lineNo !== "") {
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            secureLocalStorage.getItem("userDetails")
          )}`,
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
              `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/deleteareaofachievement/`,
              data,
              config
            );
          }
        })
        .then((json) => {
          if (list.length !== 1) {
            list.splice(index, 1);
            setAreaOfAchievement(list);
          } else {
            list[index].lineNo = "";
            list[index].areaOfAchievement = "";
            setAreaOfAchievement(list);
          }

          swal("Success!", "Your record has been Deleted!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't delete the record", "error");
        });
    } else {
      if (list.length !== 1) {
        list.splice(index, 1);
        setAreaOfAchievement(list);
      }
    }
  };
  //handle cick event of the Add button
  const handleAddAreaofAchievementClick = () => {
    // const list = [...areaOfAchievement];
    // if (list[0] !== undefined) {
    // let requirementcode = list[0]["rqmentcode"];
    setAreaOfAchievement([
      ...areaOfAchievement,
      {
        id: "",
        lineNo: "",
        HeaderNo: "",
        areaOfAchievement: "",
      },
    ]);
    // } else {
    //   swal("Oh", "Define Requirement Code in D365", "error");
    // }
  };
  const handlePushAreaofAchievementClick = (index) => {
    //Get the record
    const list = [...areaOfAchievement];
    let record = list[index];
    // // => console.log(record);
    // let jobno = list[0]["jobno"];
    if (record.lineNo === "") {
      //Oridinal Entry
      let data = {
        HeaderNo: props.location.state[0].datum[0].no,
        AreaOfAchievement: record.areaOfAchievement,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            secureLocalStorage.getItem("userDetails")
          )}`,
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
              `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/createareaofachievement`,
              data,
              config
              // method: 'post',
            );
          }
        })
        // .then(result => result.json())
        .then((json) => {
          // => console.log(json.data);
          list[index].lineNo = json.data.extMessage;
          setAreaOfAchievement(list);
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
        AreaOfAchievement: record.areaOfAchievement,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            secureLocalStorage.getItem("userDetails")
          )}`,
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
              `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/modifyareaofachievement`,
              data,
              config
              // method: 'post',
            );
          }
        })
        // .then(result => result.json())
        .then((json) => {
          // => console.log(json.data);
          swal("Success!", "Your record has been Updated!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't Update the record", "error");
        });
    }
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
        // => console.log(list);
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
          Authorization: `Bearer ${JSON.parse(
            secureLocalStorage.getItem("userDetails")
          )}`,
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
              `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/deleteareaofdevelopment/`,
              data,
              config
            );
          }
        })
        .then((json) => {
          if (list.length !== 1) {
            list.splice(index, 1);
            setAreaofDevelopmentList(list);
          } else {
            list[index].lineNo = "";
            list[index].areaOfDevelopment = "";
            setAreaofDevelopmentList(list);
          }

          swal("Success!", "Your record has been Deleted!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't delete the record", "error");
        });
    } else {
      if (list.length !== 1) {
        list.splice(index, 1);
        setAreaofDevelopmentList(list);
      }
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
    // // => console.log(record);

    if (record.lineNo === "") {
      //Oridinal Entry
      let data = {
        HeaderNo: props.location.state[0].datum[0].no,
        AreaOfDevelopment: record.areaOfDevelopment,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            secureLocalStorage.getItem("userDetails")
          )}`,
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
              `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/createareaofdevelopment`,
              data,
              config
              // method: 'post',
            );
          }
        })
        // .then(result => result.json())
        .then((json) => {
          // => console.log(json.data);
          list[index].lineNo = json.data.extMessage;
          setAreaofDevelopmentList(list);
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
          Authorization: `Bearer ${JSON.parse(
            secureLocalStorage.getItem("userDetails")
          )}`,
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
              `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/modifyareaofdevelopment`,
              data,
              config
              // method: 'post',
            );
          }
        })
        // .then(result => result.json())
        .then((json) => {
          // => console.log(json.data);
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
        // => console.log(list);
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
          Authorization: `Bearer ${JSON.parse(
            secureLocalStorage.getItem("userDetails")
          )}`,
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
              `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/deletespecificfocus/`,
              data,
              config
            );
          }
        })
        .then((json) => {
          if (list.length !== 1) {
            list.splice(index, 1);
            setSpecificfocusList(list);
          } else {
            list[index].lineNo = "";
            list[index].specificFocusArea = "";
            setSpecificfocusList(list);
          }

          swal("Success!", "Your record has been Deleted!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't delete the record", "error");
        });
    } else {
      if (list.length !== 1) {
        list.splice(index, 1);
        setSpecificfocusList(list);
      }
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
    // // => console.log(record);

    if (record.lineNo === "") {
      //Oridinal Entry
      let data = {
        HeaderNo: props.location.state[0].datum[0].no,
        SpecificFocusArea: record.specificFocusArea,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            secureLocalStorage.getItem("userDetails")
          )}`,
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
              `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/createspecificfocus`,
              data,
              config
              // method: 'post',
            );
          }
        })
        // .then(result => result.json())
        .then((json) => {
          // => console.log(json.data);
          list[index].lineNo = json.data.extMessage;
          setSpecificfocusList(list);
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
          Authorization: `Bearer ${JSON.parse(
            secureLocalStorage.getItem("userDetails")
          )}`,
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
              `${process.env.REACT_APP_API_S_LINK}/performanceevaluation/modifyspecificfocus`,
              data,
              config
              // method: 'post',
            );
          }
        })
        // .then(result => result.json())
        .then((json) => {
          // => console.log(json.data);
          swal("Success!", "Your record has been Updated!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't Update the record", "error");
        });
    }
  };

  //***********COURSES */

  // Input a Course
  const handleCoursesInput = (e, index) => {
    const list = [...selectedCourses];
    list[index].course = e;
    list[index].id = index;
    setSelectedCourses(list);
  };

  // Add a Course
  const handleAddCourseOnClick = () => {
    setSelectedCourses([
      ...selectedCourses,
      {
        id: "",
        lineNo: "",
        course: { value: "", label: "" },
        employeeId: "",
        employeeName: "",
        employeeEmail: "",
        appraisalNo: "",
      },
    ]);
  };

  // Delete  a Course
  const handleRemoveCourseonClick = (index) => {
    const list = [...selectedCourses];

    let record = list[index];

    if (record.lineNo !== "") {
      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            secureLocalStorage.getItem("userDetails")
          )}`,
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
            return axios.delete(
              `${process.env.REACT_APP_API_S_LINK}/lms/deleteselectedcourse/${record.lineNo}/${record.course.label}`,
              config
            );
          }
        })
        .then((json) => {
          if (list.length !== 1) {
            list.splice(index, 1);
            setSelectedCourses(list);
          } else {
            list[index].lineNo = "";
            list[index].course = { value: "", label: "" };
            setSelectedCourses(list);
          }

          swal("Success!", "Your record has been Deleted!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't delete the record", "error");
        });
    } else {
      if (list.length !== 1) {
        list.splice(index, 1);
        setSelectedCourses(list);
      }
    }
  };

  // Upload a Course
  const handlePushCourseOnClick = (index) => {
    //Get the record
    const list = [...selectedCourses];
    let record = list[index];

    if (record.lineNo === "") {
      //Oridinal Entry
      let data = {
        CourseId: record.course.value,
        CourseName: record.course.label,
        AppraisalNo: props.location.state[0].datum[0].no,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            secureLocalStorage.getItem("userDetails")
          )}`,
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
              `${process.env.REACT_APP_API_S_LINK}/lms/createselectedcourse`,
              data,
              config
              // method: 'post',
            );
          }
        })
        // .then(result => result.json())
        .then((json) => {
          // => console.log(json.data);
          list[index].lineNo = json.data.extMessage;
          setSelectedCourses(list);
          swal("Success!", "Your record has been uploaded!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal(
            "Oops!",
            `Seems like we couldn't upload the record:${err.response.data.message}`,
            "error"
          );
        });
    } else {
      //Modify Entry
      let data = {
        // AppraisalNo: props.location.state[0].datum[0].no,
        LineNo: parseInt(record.lineNo),
        CourseId: record.course.value,
        CourseName: record.course.label,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            secureLocalStorage.getItem("userDetails")
          )}`,
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
              `${process.env.REACT_APP_API_S_LINK}/lms/updateselectedcourse`,
              data,
              config
              // method: 'post',
            );
          }
        })
        // .then(result => result.json())
        .then((json) => {
          // => console.log(json.data);
          swal("Success!", "Your record has been Updated!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't Update the record", "error");
        });
    }
  };

  //Post Custome Course

  const PostCustomeCourse = (e) => {
    e.preventDefault();
    if (customCourse.length >= 99) {
      swal("Oops!", "Too long, shorten the course name", "error");
      return;
    }
    if (customCourse.ccustom !== "" && customCourse.lineNo ==="") {
      //Oridinal Entry
      let data = {
        CourseId: customCourse.ccustom,
        CourseName: customCourse.ccustom,
        AppraisalNo: props.location.state[0].datum[0].no,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            secureLocalStorage.getItem("userDetails")
          )}`,
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
              `${process.env.REACT_APP_API_S_LINK}/lms/createselectedcourse`,
              data,
              config
              // method: 'post',
            );
          }
        })
        // .then(result => result.json())
        .then((json) => {
          setCustomCourse({ ...customCourse, lineNo: json.data.extMessage });
          swal("Success!", "Your record has been uploaded!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal(
            "Oops!",
            `Seems like we couldn't upload the record:${err.response.data.message}`,
            "error"
          );
        });
    }else {
      //Modify Entry
      let data = {
        // AppraisalNo: props.location.state[0].datum[0].no,
        LineNo: parseInt(customCourse.lineNo),
        CourseId: customCourse.ccustom,
        CourseName: customCourse.ccustom,
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
        text: "Are you sure that you want to Update",
        icon: "warning",
        dangerMode: true,
      })
        .then((willUpload) => {
          if (willUpload) {
            return axios.post(
              `${process.env.REACT_APP_API_S_LINK}/lms/updateselectedcourse`,
              data,
              config
              // method: 'post',
            );
          }
        })
        // .then(result => result.json())
        .then((json) => {
          // => console.log(json.data);
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
      <div className="container0">
        <BreadCrumb props={props} backlink={"employee-appraisal"} />
        {/* <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8"> */}
        <div className="d-md-flex justify-content-end mb-2">
          <button
            className="btn btn-warning rounded-0"
            onClick={SubmitSuperviser}
            disabled={isActive}
          >
            Submit to Supervisor<i className="ml-2 fa fa-arrow-circle-up"></i>{" "}
          </button>
          <button
            className="btn btn-info rounded-0"
            onClick={CalculateWeight}
            disabled={isActive}
          >
            Calculate Weight <i className="ml-2  	fa fa-calculator"></i>
          </button>
          <button className="btn btn-secondary rounded-0" onClick={ViewReport}>
            Appraisal Report<i className="fa fa-file-pdf-o ml-2"></i>
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
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Job No</label>
                  <input
                    type="text"
                    className="form-control"
                    value={data.jobNo}
                    disabled={true}
                  />
                </div>
              </div>

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

              {/* <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Manager Designation</label>
                  <input
                    type="text"
                    className="form-control"
                    value={data.managerDesignation}
                    disabled={true}
                  />
                </div>
              </div> */}
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
                    <th>KPI No</th>
                    <th>Performance Indicators</th>

                    <th>Weighting</th>
                    <th>Targeted Score</th>
                    <th>Achieved Score Employee</th>
                    <th>Weighted Score Employee</th>
                  </tr>
                </thead>
                <tbody>
                  {jobkpiList.map((d, i) => (
                    <tr key={i}>
                      {/* <td>{++i}</td> */}
                      <td>{d.value}</td>
                      <td>{d.label}</td>

                      <td>{d.weighting}</td>
                      <td>{d.targetedScore}</td>
                      <td>{d.achievedScoreEmployee}</td>
                      <td>{d.weightedScoreEmployee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row">
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

        {/* </div> */}

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
                    {/* <th>Activity Description</th> */}
                    <th>Performance Standard</th>
                    {/* <th>Time-lines</th> */}
                    {/* <th>Std Weight</th> */}
                    <th>Target Score</th>
                    <th>Achieved Score</th>
                    <th>Comment</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {standardList.map((d, i) => (
                    <tr key={i}>
                      <td>{d.kpiDescription}</td>
                      {/* <td>{d.activityDescription}</td> */}
                      <td>{d.standardDescription}</td>
                      {/* <td>{d.timelines}</td> */}
                      {/* <td>{d.standardWeighting}</td> */}
                      <td>{d.targetedScore}</td>
                      <td>{d.achievedScoreEmployee}</td>
                      <td>{d.employeeComments}</td>
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
                              d.kpiDescription,
                              d.activityDescription
                            )
                          }
                          disabled={isActive}
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

        {/* Your Reflection Achievements */}
        <div className="card my-4">
          <div className="card-header">Your Reflection</div>
          <div className="card-body">
            <h5 className="my-3 ml-3">Area of Achievement</h5>
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
                          onChange={(e) =>
                            handleInputAreaofAchievementChange(e, i3)
                          }
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="button-div">
                        <>
                          <button
                            type="button"
                            className="btn btn-danger rounded-0"
                            onClick={() =>
                              handleRemoveAreaofAchievementClick(i3)
                            }
                            disabled={isActive}
                          >
                            Del <i className="fa fa-trash"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-success rounded-0"
                            onClick={() => handlePushAreaofAchievementClick(i3)}
                            disabled={isActive}
                          >
                            Post <i className="fa fa-arrow-up"></i>
                          </button>

                          {areaOfAchievement.length - 1 === i3 && (
                            <>
                              <button
                                type="button"
                                className="btn btn-info rounded-0"
                                onClick={handleAddAreaofAchievementClick}
                                disabled={isActive}
                              >
                                New Line <i className="fa fa-arrow-down"></i>
                              </button>
                            </>
                          )}
                        </>

                        {/* {areaOfAchievement.length !== 1 && (
                          <>
                            <button
                              type="button"
                              className="btn btn-danger rounded-0"
                              onClick={() =>
                                handleRemoveAreaofAchievementClick(i3)
                              }
                              disabled={isActive}
                            >
                              Del <i className="fa fa-trash"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-success rounded-0"
                              onClick={() =>
                                handlePushAreaofAchievementClick(i3)
                              }
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
                              onClick={handleAddAreaofAchievementClick}
                              disabled={isActive}
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

        {/* Your Refelction Area of Developement */}
        <div className="card my-4">
          <div className="card-header">Your Reflection</div>
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
                          onChange={(e) =>
                            handleInputAreaOfDevelopmentChange(e, i3)
                          }
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="button-div">
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
                            onClick={() => handlePushAreaOfDevelopmentClick(i3)}
                            disabled={isActive}
                          >
                            Post <i className="fa fa-arrow-up"></i>
                          </button>

                          {areaofDevelopmentList.length - 1 === i3 && (
                            <>
                              <button
                                type="button"
                                className="btn btn-info rounded-0"
                                onClick={handleAddAreaOfDevelopmentClick}
                                disabled={isActive}
                              >
                                New Line <i className="fa fa-arrow-down"></i>
                              </button>
                            </>
                          )}
                        </>

                        {/* {areaofDevelopmentList.length !== 1 && (
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
                        )}  */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Your Reflection Area Focus*/}
        <div className="card my-4">
          <div className="card-header">Your Reflection</div>
          <div className="card-body">
            <h5 className="my-3 ml-3">Focus Area</h5>
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
                          onChange={(e) =>
                            handleInputSpecificFocusChange(e, i3)
                          }
                        />
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="button-div">
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
                            Post <i className="fa fa-arrow-up"></i>
                          </button>
                          {specificfocusList.length - 1 === i3 && (
                            <>
                              <button
                                type="button"
                                className="btn btn-info rounded-0"
                                onClick={handleAddSpecificFocusClick}
                                disabled={isActive}
                              >
                                New Line <i className="fa fa-arrow-down"></i>
                              </button>
                            </>
                          )}
                        </>
                        {/* {specificfocusList.length !== 1 && (
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
                        )} */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Training and Developement Section*/}
        <div className="card my-4">
          <div className="card-header">Training and Developement Section</div>
          <div className="card-body">
            <h5 className="my-3 ml-3">Courses</h5>
            <div className="reqcontentDataDiv">
              <div className="jobRequirement-set">
                {selectedCourses.map((x3, i3) => (
                  <div className="row mx-1 my-2" key={i3}>
                    <div className="col-md-8">
                      <Select
                        className=""
                        defaultValue={x3.course}
                        onChange={(e) => handleCoursesInput(e, i3)}
                        options={courses}
                      />
                    </div>

                    <div className="col-md-4">
                      <div className="button-div">
                        <>
                          <button
                            type="button"
                            className="btn btn-danger rounded-0"
                            onClick={() => handleRemoveCourseonClick(i3)}
                            disabled={isActive}
                          >
                            Del <i className="fa fa-trash"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-success rounded-0"
                            onClick={() => handlePushCourseOnClick(i3)}
                            disabled={isActive}
                          >
                            Post <i className="fa fa-arrow-up"></i>
                          </button>
                          {selectedCourses.length - 1 === i3 && (
                            <>
                              <button
                                type="button"
                                className="btn btn-info rounded-0"
                                onClick={handleAddCourseOnClick}
                                disabled={isActive}
                              >
                                New Line <i className="fa fa-arrow-down"></i>
                              </button>
                            </>
                          )}
                        </>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Custome Course */}
                <div className="row mx-1 mt-5">
                  <div className="col-md-8">
                    <div className="form-group">
                      <label>Custom Course (max 100 characters)</label>
                      <textarea
                        name="customCourse"
                        value={customCourse.ccustom}
                        onChange={(e) =>
                          setCustomCourse({
                            ...customCourse,
                            ccustom: e.target.value,
                          })
                        }
                        className="form-control rounded-1"
                        rows={3}
                      ></textarea>
                      <button
                        type="button"
                        className="btn btn-success rounded-1 my-2"
                        onClick={(e) => PostCustomeCourse(e)}
                        disabled={isActive}
                      >
                        Post Custom Course <i className="fa fa-arrow-up"></i>
                      </button>
                    </div>
                  </div>
                  <div className="col-md-4">
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(EmployeeAppraisalCard);
