import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";
import DatePicker from "react-datepicker";
import BreadCrumb from "./BreadCrumb";

const NewLeaveCard = (props) => {
  const [loading, setLoading] = useState(true);
  const [leaveNo, setLeaveNo] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState({});
  const [leaveList, setLeaveList] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState({});
  const [leaveStartDate, setLeaveStartDate] = useState(new Date());
  const [leaveEndDate, setLeaveEndDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [appliedDays, setAppliedDays] = useState("");
  const [employeeRemark, setEmployeeRemark] = useState("");

  const [displayAttachment, setDisplayAttachment] = useState(false);
  const [displayUpload, setDisplayUpload] = useState(false);
  const [leaveAttachment, setLeaveAttachment] = useState("");
  const [viewAttachmentState, setViewAttachmentState] = useState(true);

  let errorsObj = {
    selectedLeave: "",
    leaveStartDate: "",
    leaveEndDate: "",
    returnDate: "",
    selectedEmp: "",
    employeeRemark: "",
  };
  const [errors, setErrors] = useState(errorsObj);

  const [dlines, setDlines] = useState([
    {
      id: "",
      Startdate: new Date(),
      Returndate: '',
      Days: "",
      Leaveno:"",
      Employeeno:"",
      Enddate:"",
      Assignedleaveno:''
      //original: false, //Whether its a new addition
    },
  ]);


  const [hasExtraDays,setHasExtraDays] = useState(false);


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
      .get(`${process.env.REACT_APP_API_S_LINK}/leave/createnewleave/`, config)

      .then(function (response) {
        if (response.status === 200) {
          // console.log(response.data);
          setEmployeeList(response.data.employeeListModels);
          setLeaveNo(response.data.return_value);
          setLoading(false);
          setDisplayUpload(true);
          loadLeaves();
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

  //toggle the doc attachement ui per leave
  useEffect(() => {
    if (Object.keys(selectedLeave).length > 0) {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userDetails")).idToken
          }`,
        },
      };

      axios
        .get(
          `${process.env.REACT_APP_API_S_LINK}/leave/onselectleavetype/${leaveNo}/${selectedLeave.value}`,
          config
        )
        .then(function (response) {
          if (response.status === 200) {
            console.log(response.data.return_value);
            if (response.data.return_value === true) {
              setDisplayAttachment(true);
              setDisplayUpload(false);
              setViewAttachmentState(true);
              //format applied days end and return date
              setAppliedDays("");
              setLeaveEndDate("");
              setReturnDate("");

              // setHasExtraDays(response.data.hasExtraDays);
              // if(response.data.hasExtraDays){
              //   HasExtraDays()
              // }
            } else {
              setDisplayAttachment(false);
              setDisplayUpload(true);
              setViewAttachmentState(true);
              //format applied days end and return date
              setAppliedDays("");
              setLeaveEndDate("");
              setReturnDate("");

              // setHasExtraDays(response.data.hasExtraDays);
              // if(response.data.hasExtraDays){
              //   HasExtraDays()
              // }
            }
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
  }, [selectedLeave]);

    //Get extra leaves if leave has them
  const HasExtraDays=()=>{
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userDetails")).idToken
          }`,
        },
      };
      //Does the leave require attachement
      axios
        .get(
          `${process.env.REACT_APP_API_S_LINK}/leave/getextradays/${leaveNo}`,
          config
        )
        .then(function (response) {
          if (response.status === 200) {
            setDlines(response.data.extraDays)
          }
        })
        .catch((err) => {
          console.log({ err: err });
          // if (err.response !== undefined) {
          //   swal("Ooh!", err.response.data.message, "error");
          // } else {
          //   swal("Oh!", err.message, "error");
          // }
        });
    }

  //Get End and Return Dates
  const onTapReturnDate = () => {
    console.log(appliedDays.length > 0);
    if (appliedDays.length > 0) {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userDetails")).idToken
          }`,
        },
      };
      const Data = {
        EmployeeNo: "",
        LeaveType: selectedLeave.value,
        LeaveStartDate: leaveStartDate,
        DaysApplied: parseFloat(appliedDays),
      };

      axios
        .post(
          `${process.env.REACT_APP_API_S_LINK}/leave/getleaveendreturndate`,
          Data,
          config
        )
        .then(function (response) {
          if (response.status === 200) {
            console.log(response.data);
            setLeaveEndDate(response.data.endD);
            setReturnDate(response.data.returnD);
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
    } else {
    }
  };

  const loadLeaves = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/leave/getstaffleavebalance/`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          // console.log(response.data);
          setLeaveList(response.data.leaveTypeList);
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

  const uploadAttachment = (e) => {
    e.preventDefault();

    if (leaveAttachment !== "" || leaveAttachment !== undefined) {
      if (leaveAttachment.size / 1024 > 6024) {
        swal("Oh!", "Size above 6MB", "error");
        return;
      }
      if (leaveAttachment.type !== "application/pdf") {
        swal("Oh!", "File not pdf", "error");
        return;
      }

      const formData = new FormData();
      formData.append(`formFile`, leaveAttachment);
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
              `${process.env.REACT_APP_API_S_LINK}/leave/uploadleaveattachment/${leaveNo}/${selectedLeave.value}`,
              formData,
              config
            );
          }
        })

        .then(function (response) {
          if (response.status === 200) {
            //console.log(response.data);
            swal("Success", response.data.message, "success");
            setViewAttachmentState(false);
            setDisplayUpload(true);
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
  };

  const viewAttachmentDoc = () => {
    const config = {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to View",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        // setPostBtnState(true)
        if (willCreate) {
          return axios.get(
            `${process.env.REACT_APP_API_S_LINK}/leave/viewleaveattachment/${leaveNo}`,
            config
          );
        }
      })
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

  const attahchmentDiv = (
    <>
      <div className="col-md-12">
        <label htmlFor="">Leave Attachment (PDF)</label>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <input
            type="file"
            name="leaveAttach"
            id=""
            className="form-control"
            onChange={(e) => setLeaveAttachment(e.target.files[0])}
          />
        </div>
      </div>
      <div className="col-md-6">
        <button className="btn btn-success" onClick={uploadAttachment}>
          Upload <i className="fa fa-cloud-upload"></i>
        </button>
        <button
          className="btn btn-warning"
          disabled={viewAttachmentState}
          onClick={viewAttachmentDoc}
        >
          View <i className="fa fa-eye"></i>
        </button>
      </div>
    </>
  );

  const uploadLeaveApp = (e) => {
    e.preventDefault();

    let error = false;
    const errorObj = { ...errorsObj };
    if (employeeRemark === "") {
      errorObj.employeeRemark = "Employee Remark is Required";
      error = true;
    }
    if (leaveStartDate === "") {
      errorObj.leaveStartDate = "Leave Start Date is Required";
      error = true;
    }

    if (leaveEndDate === "") {
      errorObj.leaveEndDate = "Leave End Date is Required";
      error = true;
    }

    if (returnDate === "") {
      errorObj.returnDate = "Return Date is Required";
      error = true;
    }

    if (Object.keys(selectedEmp).length === 0) {
      errorObj.selectedEmp = "Reliever is Required";
      error = true;
    }

    if (Object.keys(selectedLeave).length === 0) {
      errorObj.selectedLeave = "Leave is Required";
      error = true;
    }

    setErrors(errorObj);
    if (error) {
      return;
    }

    let Data = {
      LeaveAppNo: leaveNo,
      LeaveType: selectedLeave.value,
      LeaveStartDate: leaveStartDate,
      DaysApplied: parseFloat(appliedDays),
      RelieverRemark: employeeRemark,
      RelieverNo: selectedEmp.value,
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
            `${process.env.REACT_APP_API_S_LINK}/leave/uploadleaveform/`,
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
          setDisplayUpload(false);

          setHasExtraDays(response.data.hasExtraDays);
          if(response.data.hasExtraDays){
            HasExtraDays()
          }
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
  const upploadBtnDiv = (
    <>
      <div className="d-flex justify-content-end">
        <button className="btn btn-warning" onClick={uploadLeaveApp}>
          Upload the Leave <i className="fa fa-sitemap"></i>
        </button>
      </div>
    </>
  );


  // handle input change
const handleInputChecklistChange = (e, index) => {
  const { name, value } = e.target;
  const list = [...dlines];
  list[index][name] = value;
  list[index].id = index;
  setDlines(list);
 
};
// handle date input change
const handleInputDateChange = (e, index) => {
  //const { name, value } = e.target;
  const list = [...dlines];
  list[index]['Startdate'] = e;
  list[index].id = index;
  setDlines(list);
 
};
// handle cick event of the remove button
const handleRemoveCheckistClick = (index) => {
  const list1 = [...dlines];
  let _no = list1[index].Returndate;
  if (_no !== "") {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };
    let data = {
      Leaveno: list1[index].Leaveno,
      Startdate: list1[index].Startdate
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
            `${process.env.REACT_APP_API_S_LINK}/leave/deleteday`,
            data,
            config
          );
        }
      })
      .then((json) => {
        // console.log(json.data);
        list1.splice(index, 1);
        setDlines(list1);
        swal("Success!", "Your record has been Deleted!", "success");
      })
      .catch((err) => {
        if(err.response!==undefined){
          swal("Oh!", err.response.data.message, "error");
        }else{
          swal("Oh!", err.message, "error");
        }
        console.log(err);
        
        // swal("Oops!", "Seems like we couldn't delete the record", "error");
      });
  } else {
    list1.splice(index, 1);
    setDlines(list1);
  }
};

//handle click event of the Add button
const handleAddChecklistClick = () => {
    setDlines([
      ...dlines,
      {
        id: "",
        Startdate: new Date(),
        Returndate: '',
        Days: "",
        Leaveno:leaveNo,
        Employeeno:"",
        Enddate:"",
        Assignedleaveno:''
      //  original: false,
      },
    ]);
};
const handlePushChecklistClick = (index) => {
  //Add record to d365

  const list = [...dlines];
  let record = list[index];
  let _code = list[0]["Leaveno"];
  if (list[0]["Leaveno"] === undefined || list[0]["Leaveno"] === "") {
    //means its the first record
    let data = {
      id: record.id,
      Leaveno:leaveNo,
      Startdate:record.Startdate,
      Days:parseFloat(record.Days)
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
            `${process.env.REACT_APP_API_S_LINK}/leave/addanextraday`,
            data,
            config
          );
        }
      })
      .then((json) => {
        console.log(json.data);
        if(json.data.return_value !== ""){
          list[index]['Returndate']=json.data.return_value;
          //record.Returndate
          setDlines(list);
        }
      
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
      <div className="#">
      <BreadCrumb props={props} backlink={"staff-dashboard"}/>
        <div className="row mt-2">
          <div className="col-md-8">
            <div className="card rounded-0">
              <div className="card-header">New Leave Creation</div>
              <div className="card-body">
                <div className="roleform">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor=""> Leave Number</label>
                        <input
                          type="text"
                          className="form-control rounded-1"
                          value={leaveNo}
                          disabled={true}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="">Leave Types</label>
                      <Select
                        defaultValue={selectedLeave}
                        onChange={setSelectedLeave}
                        options={leaveList}
                      />
                      {errors.selectedLeave && (
                        <div className="text-danger fs-12">
                          {errors.selectedLeave}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Leave Start Date</label>
                        <DatePicker
                          selected={leaveStartDate}
                          onChange={(date) => setLeaveStartDate(date)}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="">Applied Days</label>
                      <div className="input-group">
                        <input
                          // parseInt(x3.kalue.replace(/\,/g,''))
                          type="number"
                          // step="0.01"
                          className="form-control "
                          // placeholder="Balance Days"
                          name="balDays"
                          value={appliedDays}
                          onChange={(e) => setAppliedDays(e.target.value)}
                        />
                        <div className="input-group-append">
                          <span
                            className="input-group-text"
                            id="basic-addon2"
                            onClick={onTapReturnDate}
                          >
                            <i className="fa fa-level-down"></i>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Leave End Date</label>
                        {/* <DatePicker
                          selected={leaveEndDate}
                          onChange={(date) => setLeaveEndDate(date)}
                        /> */}
                        <input
                          type="text"
                          className="form-control "
                          name="leaveEndDate"
                          value={leaveEndDate}
                          disabled={true}
                        />
                        {errors.leaveEndDate && (
                          <div className="text-danger fs-12">
                            {errors.leaveEndDate}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Return Date</label>
                        <input
                          type="text"
                          className="form-control "
                          name="returnDate"
                          value={returnDate}
                          disabled={true}
                        />

                        {/* <DatePicker
                          selected={returnDate}
                          onChange={(date) => setReturnDate(date)}
                        /> */}
                        {errors.returnDate && (
                          <div className="text-danger fs-12">
                            {errors.returnDate}
                          </div>
                        )}
                      </div>
                    </div>
                   {/* Extra Date For Exam Leave */}

                   <div className={hasExtraDays?"col-md-12":"d-none"} >
                      <div className="extra-date-div border rounded-1 p-1">
                        <h6 className="text-center my-1">Additional Days</h6>


                        <div className="lines-set">
                          {dlines.map((x3, i3) => (
                            <div className="row mx-1" key={i3}>
                              <div className="col-md-8">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label>Start Date</label>
                                      <DatePicker
                                        name="Startdate"
                                        selected={x3.Startdate}
                                        onChange={(e) =>
                                          handleInputDateChange(e, i3)
                                        }

                                      />
                                    </div>

                                  </div>

                                  <div className="col-md-6">
                                    <div className="form-group">
                                    <label>Set Days</label>
                                      <input
                                        type="number"
                                        className="form-control "
                                        placeholder="Days"
                                        name="Days"
                                        min={0}
                                        step="0.1"
                                        value={x3.Days}
                                        onChange={(e) =>
                                          handleInputChecklistChange(e, i3)
                                        }
                                      />
                                    </div>
                                  </div>
                               
                               
                                </div>
                              </div>

                              <div className="col-md-4">
                              <label>Action</label>
                                <div className="button-div">
                               
                                  {dlines.length !== 1 && (
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
                                  {dlines.length - 1 === i3 && (
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


                    
                    <div className="col-md-12">
                      <label htmlFor="">Substitute/Reliever</label>
                      <Select
                        defaultValue={selectedEmp}
                        onChange={setSelectedEmp}
                        options={employeeList}
                      />
                      {errors.selectedEmp && (
                        <div className="text-danger fs-12">
                          {errors.selectedEmp}
                        </div>
                      )}
                    </div>

                    <div className="col-md-12 my-2">
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          id=""
                          rows="2"
                          placeholder="Employee Remark"
                          name="employeeRemark"
                          value={employeeRemark}
                          onChange={(e) => setEmployeeRemark(e.target.value)}
                        ></textarea>

                        {errors.employeeRemark && (
                          <div className="text-danger fs-12">
                            {errors.employeeRemark}
                          </div>
                        )}
                      </div>
                    </div>
                    {displayAttachment ? attahchmentDiv : ""}
                  </div>
                </div>
              </div>
              <div className="card-footer">
                {/* Upload Button */}
                {displayUpload ? upploadBtnDiv : ""}
              </div>
            </div>
            {/* If attachment is needed */}
          </div>
          <div className="col-md-4">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Leave</th>
                  <th scope="col">Balance</th>
                </tr>
              </thead>
              <tbody>
                {leaveList.map((d, i) => (
                  <tr key={i}>
                    <td>{d.value}</td>
                    <td>{d.leavebalance}</td>
                    {/* <td>{d.label}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default withRouter(NewLeaveCard);
