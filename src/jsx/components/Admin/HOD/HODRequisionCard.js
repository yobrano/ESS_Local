import DatePicker from "react-datepicker";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";
import { Collapse } from "react-bootstrap";

const HODRequisionCard = (props) => {
  const [loading, setLoading] = useState(true);
  const [empreqCode, setEmpreqCode] = useState("");

  const [requisitionType, setRequisitionType] = useState("");

  const [desiredStartDate, setDesiredStartDate] = useState(new Date());
  const [closinDate, setClosingDate] = useState(new Date());

  const [departmentList, setDepartmentList] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");

  const [employeeList, setEmployeeList] = useState([]);
  const [replaceEmp, setReplaceEmp] = useState("");
  const [HODEmp, setHODEmp] = useState("");
  const [HREmp, setHREmp] = useState("");
  const [MDEmp, setMDEmp] = useState("");

  const [contractList, setContractList] = useState([]);
  const [selectedContract, setSelectedContract] = useState("");

  const [reqDescription, setReqDescription] = useState("");
  const [reqReason, setReqReason] = useState("");
  const [reqComment, setReqComment] = useState("");

  const [requestedEmployees, setRequestedEmployees] = useState(0);

  // const [requirementListPush, setRequirementListPush] = useState([]);
  const [requirementlist, setRequirementlist] = useState([
    {
      id: "",
      description: "",
      rqmentcode: "",
      mandatory: "No",
      lineno: "",
      jobno: "",
    },
  ]);
  //Qualification
  const [qualificationList, setQualificationList] = useState([
    {
      id: "",
      description: "",
      qficationcode: "",
      mandantory: "No",
      lineno: "",
      jobno: "",
    },
  ]);

  //Responsibility

  const [responsibiltyList, setResponsibilityList] = useState([
    {
      id: "",
      description: "",
      jobno: "",
      lineno: "",
      responsibilitycode: "",
    },
  ]);

  //Check list
  const [checkList, setCheckList] = useState([
    {
      id: "",
      Lineno: "",
      Reqno: "",
      Code: "",
      Description: "",
    },
  ]);

  const [initCheckCode, setInitCheckCode] = useState("");

  const [reqCard, setReqCard] = useState({});
  const [employeeReplaced, setEmployeeReplaced] = useState("");
  const [HR, setHR] = useState("");
  const [HOD, setHOD] = useState("");
  const [MD, setMD] = useState("");
  const [statusProgress, setStatusProgress] = useState(1);

  const [HODComment, setHODComment] = useState("");
  const [disablePustoMD, setDisablePustoMD] = useState(false);

  const [reversalF, setReversalF] = useState(false);
  const [reversalRemark, setReversalRemark] = useState("");
  const [reversalLevel, setReversalLevel] = useState("");

  //{ id: "", description: "",rqmentcode:"",mandatory:"",lineno:"",jobno:"" },
  // console.log(requirementlist);

  // handle input change
  const handleInputRequireChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...requirementlist];

    if (name === "mandatory") {
      if (list[index]["mandatory"] === "No") {
        list[index][name] = "Yes";
        list[index].id = index;

        setRequirementlist(list);
      } else {
        list[index][name] = "No";
        list[index].id = index;
        console.log(list);
        setRequirementlist(list);
      }
    } else {
      list[index][name] = value;
      list[index].id = index;
      setRequirementlist(list);
    }
  };
  // handle cick event of the remove button
  const handleRemoveRequireClick = (index) => {
    const list = [...requirementlist];
    let _no = list[index].lineno;

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
              `${process.env.REACT_APP_API_S_LINK}/staffrequision/removerequirement/${_no}`,
              config
            );
          }
        })
        .then((json) => {
          list.splice(index, 1);
          setRequirementlist(list);
          swal("Success!", "Your record has been Deleted!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't delete the record", "error");
        });
    } else {
      list.splice(index, 1);
      setRequirementlist(list);
    }
  };
  //handle cick event of the Add button
  const handleAddRequireClick = () => {
    const list = [...requirementlist];
    if (list[0] !== undefined) {
      let requirementcode = list[0]["rqmentcode"];
      setRequirementlist([
        ...requirementlist,
        {
          id: "",
          description: "",
          rqmentcode: requirementcode,
          mandatory: "No",
          lineno: "",
          jobno: "",
        },
      ]);
    } else {
      swal("Oh", "Define Requirement Code in D365", "error");
    }
  };
  const handlePushRequireClick = (index) => {
    //Get the record
    const list = [...requirementlist];
    let record = list[index];
    // console.log(record);
    let jobno = list[0]["jobno"];
    let data = {
      Description: record.description,
      Jobno: jobno,
      Mandatory: record.mandatory,
      Rqmentcode: record.rqmentcode,
      Lineno: record.lineno,
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
            `${process.env.REACT_APP_API_S_LINK}/staffrequision/addrequirement/${props.location.state[0].jobNo}`,
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
  };

  // handle input change
  const handleInputQualifChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...qualificationList];

    if (name === "mandantory") {
      if (list[index]["mandantory"] === "No") {
        list[index][name] = "Yes";
        list[index].id = index;

        setQualificationList(list);
      } else {
        list[index][name] = "No";
        list[index].id = index;
        console.log(list[index]);
        setQualificationList(list);
      }
    } else {
      list[index][name] = value;
      list[index].id = index;
      setQualificationList(list);
    }
  };
  // handle cick event of the remove button
  const handleRemoveQualifClick = (index) => {
    const list1 = [...qualificationList];
    let _no = list1[index].lineno;
    console.log(_no);
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
              `${process.env.REACT_APP_API_S_LINK}/staffrequision/removequalification/${_no}`,
              config
            );
          }
        })
        .then((json) => {
          // console.log(json.data);
          list1.splice(index, 1);
          setQualificationList(list1);
          swal("Success!", "Your record has been Deleted!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't delete the record", "error");
        });
    } else {
      list1.splice(index, 1);
      setQualificationList(list1);
    }
  };
  //handle cick event of the Add button
  const handleAddQualifClick = () => {
    const list = [...qualificationList];
    if (list[0] !== undefined) {
      let qualificationcode = list[0]["qficationcode"];
      setQualificationList([
        ...qualificationList,
        {
          id: "",
          description: "",
          qficationcode: qualificationcode,
          mandantory: "No",
          lineno: "",
          jobno: "",
        },
      ]);
    } else {
      swal("Oh", "Define Qualification Code in D365", "error");
    }
  };
  const handlePushQualifClick = (index) => {
    //Add record to d365
    const list = [...qualificationList];
    let record = list[index];
    // console.log(record);
    if (list[0] !== undefined) {
      let jobno = list[0]["jobno"];

      let data = {
        Description: record.description,
        Jobno: jobno,
        Mandantory: record.mandantory,
        Qficationcode: record.qficationcode,
        Lineno: record.lineno,
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
              `${process.env.REACT_APP_API_S_LINK}/staffrequision/addqualification/${props.location.state[0].jobNo}`,
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
      swal("Oh", "Define Qualification Code in D365", "error");
    }
  };

  // handle input change
  const handleInputResponChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...responsibiltyList];
    list[index][name] = value;
    list[index].id = index;
    setResponsibilityList(list);
  };
  // handle cick event of the remove button
  const handleRemoveResponClick = (index) => {
    const list1 = [...responsibiltyList];
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
              `${process.env.REACT_APP_API_S_LINK}/staffrequision/removeresponsibility/${_no}`,
              config
            );
          }
        })
        .then((json) => {
          // console.log(json.data);
          list1.splice(index, 1);
          setResponsibilityList(list1);
          swal("Success!", "Your record has been Deleted!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't delete the record", "error");
        });
    } else {
      list1.splice(index, 1);
      setResponsibilityList(list1);
    }
  };
  //handle cick event of the Add button
  const handleAddResponClick = () => {
    const list = [...responsibiltyList];
    if (list[0] !== undefined) {
      let responsibilitycode = list[0]["responsibilitycode"];
      setResponsibilityList([
        ...responsibiltyList,
        {
          id: "",
          description: "",
          Responsibilitycode: responsibilitycode,
          // mandatory: "No",
          lineno: "",
          jobno: "",
        },
      ]);
    } else {
      swal("Oh", "Define Qualification Code in D365", "error");
    }
  };
  const handlePushResponClick = (index) => {
    //Add record to d365
    const list = [...responsibiltyList];
    let record = list[index];
    // console.log(record);
    let jobno =
      list[0]["jobno"] === ""
        ? props.location.state[0].jobNo
        : list[0]["jobno"];
    let data = {
      Description: record.description,
      Jobno: jobno,
      // Mandatory:record.mandatory,
      Responsibilitycode: record.responsibilitycode,
      Lineno: record.lineno,
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
            `${process.env.REACT_APP_API_S_LINK}/staffrequision/addresponsibility`,
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
  };

  // handle input change
  const handleInputChecklistChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...checkList];
    list[index][name] = value;
    list[index].id = index;
    setCheckList(list);
  };
  // handle cick event of the remove button
  const handleRemoveCheckistClick = (index) => {
    const list1 = [...checkList];
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
              `${process.env.REACT_APP_API_S_LINK}/staffrequision/removereschecklist/${_no}`,
              config
            );
          }
        })
        .then((json) => {
          // console.log(json.data);
          list1.splice(index, 1);
          setCheckList(list1);
          swal("Success!", "Your record has been Deleted!", "success");
        })
        .catch((err) => {
          console.log(err);
          swal("Oops!", "Seems like we couldn't delete the record", "error");
        });
    } else {
      list1.splice(index, 1);
      setCheckList(list1);
    }
  };
  //handle cick event of the Add button
  const handleAddChecklistClick = () => {
    const list = [...checkList];
    if (list[0] !== undefined) {
      let auxcode = list[0]["code"];
      setCheckList([
        ...checkList,
        {
          id: "",
          description: "",
          code: auxcode,
          lineno: "",
          reqno: "",
        },
      ]);
    } else {
      swal("Oh", "Define Qualification Code in D365", "error");
    }
  };
  const handlePushChecklistClick = (index) => {
    //Add record to d365

    const list = [...checkList];
    let record = list[index];
    let _code = list[0]["code"];
    if (list[0]["code"] === undefined || list[0]["code"] === "N/A") {
      //means its the first row
      let data = {
        Lineno: "",
        Reqno: props.location.state[0].empReqNo,
        Code: initCheckCode,
        Description: record.description,
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
              `${process.env.REACT_APP_API_S_LINK}/staffrequision/addcheck`,
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
        Lineno: record.lineno,
        Reqno: record.reqno,
        Code: _code,
        Description: record.description,
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
              `${process.env.REACT_APP_API_S_LINK}/staffrequision/addcheck`,
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
    }
  };

  const viewSupport = () => {
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
        `${process.env.REACT_APP_API_S_LINK}/home/justificationfile/${props.location.state[0].datum[0].reqID}`,
        config
      )

      .then(function (response) {
        // const url = window.URL.createObjectURL(new Blob([response.data]));
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', 'file.pdf'); //or any other extension
        // document.body.appendChild(link);
        // link.click();

        if (response.status === 200) {
          const file = new Blob([response.data], { type: "application/pdf" });
          //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
          //Open the URL on new Window
          const pdfWindow = window.open();
          pdfWindow.location.href = fileURL;

          // console.log(response.data);
          // window.open(response.data, '_blank', 'fullscreen=yes');
          // FileDownload(response.data, 'current_cv.pdf');
        }
        // if(response.status === 404){
        //   alert(response.data.message);
        // }
      })
      .catch((err) => {
        swal("Oops", "File not Found", "error");
        console.log({ err: err });
      });
  };

  useEffect(() => {
    setEmpreqCode(props.location.state[0].empReqNo);
    //Get Emp requisition card Source data
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/staffrequision/hrgetreqsingle/${props.location.state[0].datum[0].reqID}/${props.location.state[0].datum[0].jobNo}/`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          //populate emp list
          setEmployeeList(response.data.employeeListModels);
          //   //pop dept
          setDepartmentList(response.data.departmentListModels);
          //   //pop contract
          setContractList(response.data.contractListModels);
          //Set reqCard
          setReqCard(response.data.requsitionCard);
          //set replace employee
          setEmployeeReplaced(response.data.employeeReplaced);
          //set HR
          setHR(response.data.hr);
          //HOD
          setHOD(response.data.hod);
          //MD
          setMD(response.data.md);

          setRequirementlist(response.data.requirementModels);
          //Qualifications
          setQualificationList(response.data.qualificationModels);
          //Responsibility
          setResponsibilityList(response.data.responsibilityModels);
          //Get Mandatory initial code
          setInitCheckCode(response.data.checklistInitCodeAux);
          // Check list
          setCheckList(response.data.checklistModels);

          setStatusProgress(response.data.statusProgress);

          console.log(response.data);
          //  if (employeeList.length > 0) {

          // }
          setLoading(false);
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
  }, [props.location.state]);

  const handleApproveChecklist = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Approve",
      icon: "warning",
      dangerMode: true,
    })
      .then((willUpload) => {
        if (willUpload) {
          return axios.get(
            `${process.env.REACT_APP_API_S_LINK}/staffrequision/enableattachment/${props.location.state[0].empReqNo}`,
            // data,
            config
          );
        }
      })
      .then((json) => {
        console.log(json.data);
        swal("Success!", "Your record has been Approved!", "success");
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", "Seems like we couldn't approve the record", "error");
      });
  };

  const uploadGenData = () => {
    let data = {
      Requisiontype: requisitionType,
      Startdate: desiredStartDate,
      Enddate: closinDate,
      Contracttype: selectedContract.value,
      Department: selectedDept.value,
      Employeereplaced: replaceEmp.value,
      HOD: HODEmp.value,
      HRManager: HREmp.value,
      MD: MDEmp.value,
      Description: reqDescription,
      Reason: reqReason,
      Comment: reqComment,
      RequestedNo: requestedEmployees,
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
            `${process.env.REACT_APP_API_S_LINK}/staffrequision/updaterequisition/${props.location.state[0].empReqNo}`,
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
        swal(
          "Oops!",
          "Seems like we couldn't upload the record; ensure all field are keyed",
          "error"
        );
      });
  };

  const pushToHEADHR = () => {
    // let data = {
    //   Reqno: props.location.state[0].empReqNo,
    //   Jobno: props.location.state[0].jobNo,
    //   Closingdate: closinDate,
    //   RequestedEmployees: requestedEmployees,
    // };
    setDisablePustoMD(true);

    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };
    const data = {
      HODcomment: HODComment,
    };

    axios
      .post(
        `${process.env.REACT_APP_API_S_LINK}/staffrequision/hodsendhhr/${props.location.state[0].datum[0].reqID}`,
        data,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          swal("Success", response.data.message, "success");
          console.log(response.data);
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          console.log(response.data.message);
        }
      })
      .catch((err) => {
        // setDisablePustoMD()
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        console.log({ err: err });
        // swal("Oh!", err.data.message, "error");
      });
  };

  const publish = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };
    const data = {
      HRcomment: HODComment,
    };
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Approve and Publish",
      icon: "warning",
      buttons: ["No, cancel it", "Yes, I am sure"],
      dangerMode: true,
    })
      .then((willUpload) => {
        if (willUpload) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/staffrequision/approveandpublish/${props.location.state[0].datum[0].reqID}`,
            data,
            config
          );
        }
      })
      .then((json) => {
        console.log(json.data);
        swal(
          "Success!",
          "Your record has been Approved and Publish",
          "success"
        );
      })
      .catch((err) => {
        console.log(err);
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        // swal("Oops!", "Seems like we couldn't approve the record", "error");
      });
  };

  const toggleCollapse = (from) => {
    switch (from) {
      case "reversal":
        setReversalF(!reversalF);
        break;
      default:
        setReversalF(!reversalF);
        break;
    }
  };

  const ReversalRequisition = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    let data = {
      Reqno: props.location.state[0].datum[0].reqID,
      HRcomment: reversalRemark,
      Stage: reversalLevel,
    };
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Reverse",
      icon: "warning",
      buttons: ["No, cancel it", "Yes, I am sure"],
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/staffrequision/reverserequisition`,
            data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          swal("Success!", "Requisition Reversed", "success");
        }
      })
      .catch((err) => {
        if (err.response !== undefined) {
          console.log(err.response.data.message);
          swal("Oh!", "Requisition Reversed Failed", "error");
        } else {
          console.log(err.message);
          swal("Oh!","Requisition Reversed Failed", "error");
        }
      });
  };

  let actionButtn = "";
  if (statusProgress === 1) {
    actionButtn = (
      <button
        type="button"
        className="btn btn-warning rounded-0"
        onClick={pushToHEADHR}
        disabled={disablePustoMD}
      >
        Push to Head HR <i className="fa fa-user-o"></i>
      </button>
    );
  } else if (statusProgress === 2) {
    actionButtn = (
      <button
        type="button"
        className="btn btn-primary rounded-0"
        // onClick={publish}
      >
        Pending Approval by MD <i className="fa fa-user-o"></i>
      </button>
    );
  } else if (statusProgress === 3) {
    actionButtn = (
      <button
        type="button"
        className="btn btn-warning rounded-0"
        onClick={publish}
      >
        Publish <i className="fa fa-globe"></i>
      </button>
    );
  } else if (statusProgress === 5) {
    actionButtn = (
      <button
        disabled
        type="button"
        className="btn btn-danger rounded-0"
        // onClick={publish}
      >
        MD Rejected <i className="fa fa-user-times"></i>
      </button>
    );
  } else {
    actionButtn = (
      <button
        disabled
        type="button"
        className="btn btn-warning rounded-0"
        // onClick={pushToHR}
      >
        Published <i className="fa fa-globe"></i>
      </button>
    );
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
  // categoryFive();
  return (
    <>
      <div className="container">
        <div className="reqCard">
          <div className="card rounded-0">
            <div className="card-header">
              <h4>General Data</h4>
              {/* <hr /> */}
            </div>
            <form>
              <div className="row p-1">
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Requisition No</label>
                    <input
                      type="text"
                      disabled
                      className="form-control"
                      value={reqCard.no}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label>Job No</label>
                    <input
                      type="text"
                      disabled
                      className="form-control"
                      value={reqCard.jobno}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label>Job Title</label>
                    <input
                      type="text"
                      disabled
                      className="form-control"
                      value={reqCard.jobtitle}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label>Job Grade</label>
                    <input
                      type="text"
                      disabled
                      className="form-control"
                      value={reqCard.jobgrade}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label>Job Maximum Position</label>
                    <input
                      type="text"
                      disabled
                      className="form-control"
                      value={reqCard.maxposition}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label>Job Occupied Position</label>
                    <input
                      type="text"
                      disabled
                      className="form-control"
                      value={reqCard.occupiedposition}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label>Job Vacant Position</label>
                    <input
                      type="text"
                      disabled
                      className="form-control"
                      value={reqCard.vacantposition}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label>Branch code</label>
                    <input
                      type="text"
                      disabled
                      className="form-control"
                      value={reqCard.branchcode}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label>Document Date</label>
                    <input
                      type="text"
                      disabled
                      className="form-control"
                      value={reqCard.documentdate}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label className="label">Requision Type</label>
                    <select
                      disabled
                      name=""
                      id=""
                      className="form-control"
                      value={reqCard.requisitiontype}
                      //   onChange={(e) => setRequisitionType(e.target.value)}
                    >
                      <option value={""}></option>
                      <option value="Internal">Internal</option>
                      <option value="Internal/External">
                        Internal/External
                      </option>
                    </select>
                  </div>
                </div>
                {/* <div className="col-md-4">
                  <div className="form-group">
                    <label>Desired Start Date</label>

                    <input
                      type="text"
                      disabled
                      className="form-control"
                      value={reqCard.desiredstartdate}
                    />
                  </div>
                </div> */}
                <div className="col-md-4">
                  <div className="form-group">
                    <label>End Date</label>

                    <input
                      type="text"
                      disabled
                      className="form-control"
                      value={reqCard.closingdate}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <label htmlFor="redType" className="label">
                    Contract Type
                  </label>

                  <input
                    type="text"
                    disabled
                    className="form-control"
                    value={reqCard.contractcode}
                  />
                </div>
                {/* 
                <div className="col-md-4">
                  <label htmlFor="redType" className="label">
                    Employee to Replace ID
                  </label>

                  <input
                    type="text"
                    disabled
                    className="form-control"
                    value={employeeReplaced.value}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="redType" className="label">
                    Employee to Replace
                  </label>

                  <input
                    type="text"
                    disabled
                    className="form-control"
                    value={employeeReplaced.label}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="redType" className="label">
                    HOD
                  </label>
                  <input
                    type="text"
                    disabled
                    className="form-control"
                    value={HOD.label}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="redType" className="label">
                    HR Manager
                  </label>
                  <input
                    type="text"
                    disabled
                    className="form-control"
                    value={HR.label}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="redType" className="label">
                    MD/FD/GM
                  </label>
                  <input
                    type="text"
                    disabled
                    className="form-control"
                    value={MD.label}
                  />
                </div> */}

                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="reqEmp" className="label">
                      Requested Employee
                    </label>
                    <input
                      type="text"
                      disabled
                      className="form-control"
                      value={reqCard.requestedemployees}
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="regDesc" className="label">
                      Requsition Description
                    </label>
                    <textarea
                      id="regDesc"
                      disabled
                      // cols="30"
                      value={reqCard.description}
                      //   onChange={(e) => setReqDescription(e.target.value)}
                      rows="1"
                      className="form-control"
                      placeholder="Content max size 250 character"
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="rReq" className="label">
                      Reason for Requisition
                    </label>
                    <textarea
                      id="rReq"
                      disabled
                      value={reqCard.reason}
                      //   onChange={(e) => setReqReason(e.target.value)}
                      rows="1"
                      className="form-control"
                      placeholder="Content max size 250 character"
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="Commen" className="label">
                      Comment
                    </label>
                    <textarea
                      disabled
                      id="Commen"
                      value={reqCard.comments}
                      //   onChange={(e) => setReqComment(e.target.value)}
                      rows="1"
                      className="form-control"
                      placeholder="Content max size 250 character"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="upload-gen-data-div"></div>
            </form>
            <div className="card-header">
              <h4>Category 5</h4>
            </div>
            <form>
              {/* Row 1 Requirements */}
              <div className="row">
                <div className="col-md-12">
                  <h5 className="my-3 ml-3">Job Requirements</h5>
                  <div className="reqcontentDataDiv">
                    <div className="jobRequirement-set">
                      {requirementlist.map((x, i) => (
                        <div className="row mx-1" key={i}>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                disabled
                                type="text"
                                className="form-control rounded-0"
                                placeholder="Enter..."
                                name="description"
                                value={x.description}
                                onChange={(e) => handleInputRequireChange(e, i)}
                              />
                            </div>
                          </div>
                          <div className="col-md-2">
                            <label htmlFor="" className="mr-2">
                              required
                            </label>
                            <input
                              name="mandatory"
                              type="checkbox"
                              // {...x.mandatory}
                              // checked
                              checked={x.mandatory === "No" ? false : true}
                              value={x.mandatory}
                              onChange={(e) => handleInputRequireChange(e, i)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <h5 className="my-3 ml-3">Job Qualifications</h5>
                  <div className="reqcontentDataDiv">
                    <div className="jobRequirement-set">
                      {qualificationList.map((x1, i1) => (
                        <div className="row mx-1" key={i1}>
                          <div className="col-md-6">
                            <div className="form-group">
                              <input
                                disabled
                                type="text"
                                className="form-control rounded-0"
                                placeholder="Enter..."
                                name="description"
                                value={x1.description}
                                onChange={(e) => handleInputQualifChange(e, i1)}
                              />
                            </div>
                          </div>
                          <div className="col-md-2">
                            <label htmlFor="" className="mr-2">
                              required
                            </label>
                            <input
                              name="mandantory"
                              type="checkbox"
                              checked={x1.mandantory === "No" ? false : true}
                              value={x1.mandantory}
                              onChange={(e) => handleInputQualifChange(e, i1)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <h5 className="my-3 ml-3">Job Responsibility</h5>
                  <div className="reqcontentDataDiv">
                    <div className="jobRequirement-set">
                      {responsibiltyList.map((x2, i2) => (
                        <div className="row mx-1" key={i2}>
                          <div className="col-md-8">
                            <div className="form-group">
                              <input
                                disabled
                                type="text"
                                className="form-control rounded-0"
                                placeholder="Enter..."
                                name="description"
                                value={x2.description}
                                onChange={(e) => handleInputResponChange(e, i2)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <h5 className="my-3 ml-3">HR Mandatory Documents</h5>
                  <div className="reqcontentDataDiv">
                    <div className="jobRequirement-set">
                      {checkList.map((x3, i3) => (
                        <div className="row mx-1" key={i3}>
                          <div className="col-md-8">
                            <div className="form-group">
                              <input
                                disabled
                                type="text"
                                className="form-control rounded-0"
                                placeholder="Enter..."
                                name="description"
                                value={x3.description}
                                onChange={(e) =>
                                  handleInputChecklistChange(e, i3)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="row">
                        

                        <div className="col-md-6">
                          <div className="form-group ml-1">
                            <label htmlFor="Commen" className="label">
                              Staff Comment
                            </label>
                            <textarea
                              id="Commen"
                              disabled
                              value={
                                props.location.state[0].datum[0].uidComment
                              }
                              rows="3"
                              className="form-control"
                              placeholder="HOD Comment"
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mr-1">
                            <label htmlFor="Commen" className="label">
                              MD Comment
                            </label>
                            <textarea
                              id="Commen"
                              disabled
                              value={
                                props.location.state[0].datum[0].uidThreeComment
                              }
                              rows="3"
                              className="form-control"
                              placeholder="MD Comment"
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group mx-1">
                            <label htmlFor="Commen" className="label">
                              HOD Comment
                            </label>
                            <textarea
                              id="Commen"
                              value={HODComment}
                              onChange={(e) => setHODComment(e.target.value)}
                              rows="3"
                              className="form-control"
                              placeholder="Content max size 250 character"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="row mx-1 my-1">
                        <div className="col-md-6">
                          <h4>Supporting Documents</h4>
                          <button
                            className="btn btn-info rounded-0 mb-2"
                            type="button"
                            onClick={viewSupport}
                          >
                            View Document
                          </button>
                        </div>
                        <div className="col-md-6 text-right">
                          <h4>&nbsp;</h4>
                          <button
                            className="btn btn-danger rounded-0"
                            type="button"
                            onClick={() => toggleCollapse("reversal")}
                          >
                            Reversal
                            <i className="fa fa-long-arrow-left ml-1"></i>
                          </button>
                          {actionButtn}
                        </div>
                        <div className="col-md-12">
                          <Collapse in={reversalF}>
                            <div id="example-collapse-text">
                              <div className="row">
                                <div className="col-md-12 my-2">
                                  <div className="form-group">
                                    <label htmlFor="">Select the Level</label>
                                    <select
                                      className="form-control"
                                      onChange={(e) =>
                                        setReversalLevel(e.target.value)
                                      }
                                    >
                                      <option>Choose</option>
                                      <option value="0">Staff</option>
                                    </select>
                                  </div>
                                </div>

                                <div className="col-md-12">
                                  <div className="form-group">
                                    <label htmlFor="">Reversal Remarks</label>
                                    <textarea
                                      className="form-control"
                                      cols="30"
                                      rows="3"
                                      name="reversalRemark"
                                      placeholder="max 240 characters"
                                      value={reversalRemark}
                                      onChange={(e) =>
                                        setReversalRemark(e.target.value)
                                      }
                                      // disabled={true}
                                    ></textarea>
                                  </div>
                                </div>

                                <div className="col-12">
                                  <button
                                    className="btn btn-danger rounded-0 w-100"
                                    onClick={ReversalRequisition}
                                  >
                                    Reverse <i className="fa fa-arrow-left"></i>
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(HODRequisionCard);
