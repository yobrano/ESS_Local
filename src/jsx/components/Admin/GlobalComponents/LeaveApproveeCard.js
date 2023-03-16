import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";
import DatePicker from "react-datepicker";
import BreadCrumb from "./BreadCrumb";
import ApproveeLeaveStatistic from "./ApproveeLeaveStatistic";
 
const LeaveApproveeCard = (props) => {
  const [loading, setLoading] = useState(true);
  const [leaveNo, setLeaveNo] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [relieverNo, setRelieverNo] = useState("");
  const [relieverName, setRelieverName] = useState("");

  const [leaveList, setLeaveList] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState({});
  const [leaveStartDate, setLeaveStartDate] = useState("");
  const [leaveEndDate, setLeaveEndDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [appliedDays, setAppliedDays] = useState("");
  const [employeeRemark, setEmployeeRemark] = useState("");

  const [displayAttachment, setDisplayAttachment] = useState(false);
  const [displayUpload, setDisplayUpload] = useState(false);
  const [leaveAttachment, setLeaveAttachment] = useState("");
  const [viewAttachmentState, setViewAttachmentState] = useState(true);

  let errorsObj = {
    rejectionComment: "",
  };
  const [errors, setErrors] = useState(errorsObj);
  const [leaveType, setLeaveType] = useState("");
  const [leaveStatus, setLeaveStatus] = useState("");

  const [rejectionComment,setRejectionComment] = useState("")
  const [rejectBtnActive,setRejectBtnActive] = useState(false)
  const [approveBtnActive,setApproveBtnActive] = useState(false)


  useEffect(() => {
    //let docCode = props.location.state[0].datum[0].documentCode;

    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };
    // props.location.state[0].datum.
    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/leave/getapproveeleave/${props.location.state[0].datum[0].documentNo}/`,
        config
      )

      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          setLeaveNo(response.data.leaveApplications[0].no);
          setLeaveType(response.data.leaveApplications[0].leaveType);

          setLeaveStartDate(response.data.leaveApplications[0].leaveStartDate);

          setAppliedDays(response.data.leaveApplications[0].daysApplied);
          setLeaveEndDate(response.data.leaveApplications[0].leaveEndDate);
          setReturnDate(response.data.leaveApplications[0].leaveReturnDate);
          setEmployeeRemark(response.data.leaveApplications[0].reasonForLeave);
          setRelieverNo(
            response.data.leaveApplications[0].substituteEmployeeNo
          );
          setRelieverName(
            response.data.leaveApplications[0].substituteEmployeeName
          );

          //Auto populate exising data

          setLoading(false);
          setDisplayUpload(true);
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

  // const attahchmentDiv = (
  //   <>
  //     <div className="col-md-12">
  //       <label htmlFor="">Leave Attachment (PDF)</label>
  //     </div>
  //     <div className="col-md-6">
  //       <div className="form-group">
  //         <input
  //           type="file"
  //           name="leaveAttach"
  //           id=""
  //           className="form-control"
  //           onChange={(e) => setLeaveAttachment(e.target.files[0])}
  //           disabled={false}
  //         />
  //       </div>
  //     </div>
  //     <div className="col-md-6">
  //       <button
  //         className="btn btn-warning"
  //         disabled={viewAttachmentState}
  //         onClick={viewAttachmentDoc}
  //       >
  //         View <i className="fa fa-eye"></i>
  //       </button>
  //     </div>
  //   </>
  // );

  const approveLeaveApp = (e) => {
    e.preventDefault();



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
      .then((willCreate) => {
        setApproveBtnActive(true)
        if (willCreate) {
          return axios.get(
            `${process.env.REACT_APP_API_S_LINK}/leave/approveapproveeleave/${leaveNo}/`,
           
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          //console.log(response.data);
          swal("Success", response.data.message, "success");
          setDisplayUpload(false);
        }
        if (response.status === 404) {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        setApproveBtnActive(false)
        console.log({ err: err });
        if (err.response !== undefined) {
          swal("Ooh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
      });
  };

  
  const rejectLeaveApplication = (e) => {
    e.preventDefault();

    let error = false;
    const errorObj = { ...errorsObj };
    if (rejectionComment === "") {
      errorObj.rejectionComment = "Rejection Remark is Required";
      error = true;
    }
   

    setErrors(errorObj);
    if (error) {
      return;
    }

    let Data = {
      RejectionRemark: rejectionComment,
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
      text: "Are you sure that you want to Reject",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        setRejectBtnActive(true)
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/leave/rejectapproveeleave/${leaveNo}/`,
            Data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          //console.log(response.data);
          swal("Success", response.data.message, "success");
          // setDisplayUpload(false);
        }
        if (response.status === 404) {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        setRejectBtnActive(false)
        console.log({ err: err });
        if (err.response !== undefined) {
          swal("Ooh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
      });
  };

  const dropApprovalRequest = () => {
    alert("approval dropping: missing");
  };
  let upploadBtnDiv = "";
  if (leaveStatus === "Pending Approval") {
    upploadBtnDiv = (
      <>
        <div className="d-flex justify-content-end">
          <button className="btn btn-danger" onClick={dropApprovalRequest}>
            Drop Approval <i className="fa fa-sitemap"></i>
          </button>
        </div>
      </>
    );
  } else {
    upploadBtnDiv = (
      <>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-warning rounded-0"
            // disabled={viewAttachmentState}
            onClick={viewAttachmentDoc}
          >
            View Attachment <i className="fa fa-eye"></i>
          </button>
          <button
            className="btn btn-success rounded-0"
            onClick={approveLeaveApp}
            disabled={approveBtnActive}
          >
            Approve Request <i className="fa fa-sitemap"></i>
          </button>
          <button
            className="btn btn-danger rounded-0"
            onClick={rejectLeaveApplication}
            disabled={rejectBtnActive}
          >
            Reject Request <i className="	fa fa-close"></i>
          </button>
        </div>
      </>
    );
  }

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
      <div className="container-fluid0">
      <BreadCrumb props={props} backlink={"leave-approval"}/>
        <div className="row mt-2">
          <div className="col-md-8">
            <div className="card rounded-0">
              <div className="card-header">
                Approve/Reject Leave Application
              </div>
              <div className="card-body">
                <div className="roleform">
                  <div className="row">
                  <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor=""> 
                        Sender Employee Number</label>
                        <input
                          type="text"
                          className="form-control rounded-1"
                          value= {props.location.state[0].datum[0].senderEmployeeNo}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="">Sender Employee Name</label>
                        <input
                          type="text"
                          className="form-control rounded-1"
                          value= {props.location.state[0].datum[0].senderEmployeeName}
                          disabled={true}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor=""> 
                        Leave Number</label>
                        <input
                          type="text"
                          className="form-control rounded-1"
                          value={leaveNo}
                          disabled={true}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="" className="d-flex">
                        Leave Types:
                        <span className="ml-auto text-primary">
                          [{leaveType}]
                        </span>
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-1"
                        value={leaveType}
                        disabled={true}
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
                        {/* <DatePicker
                          selected={leaveStartDate}
                          onChange={(date) => setLeaveStartDate(date)}
                          disabled={true}
                        /> */}
                         <input
                          // parseInt(x3.kalue.replace(/\,/g,''))
                          type="text"
                          // step="0.01"
                          className="form-control "
                          // placeholder="Balance Days"
                          name="balDays"
                          value={leaveStartDate}
                          onChange={(e) => setLeaveStartDate(e.target.value)}
                          disabled={true}
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
                          disabled={true}
                        />
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

                    <div className="col-md-6">
                      <label htmlFor="">Substitute/Reliever Name</label>
                      <input
                        type="text"
                        className="form-control rounded-1"
                        value={relieverName}
                        disabled={true}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="">Substitute/Reliever No</label>
                      <input
                        type="text"
                        className="form-control rounded-1"
                        value={relieverNo}
                        disabled={true}
                      />
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
                          disabled={true}
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-md-12 my-2">
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          id=""
                          rows="2"
                          placeholder="Rejection Remark"
                          name="rejectionComment"
                          value={rejectionComment}
                          onChange={(e) => setRejectionComment(e.target.value)}
                        ></textarea>

                        {errors.rejectionComment && (
                          <div className="text-danger fs-12">
                            {errors.rejectionComment}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* {displayAttachment ? attahchmentDiv : ""} */}
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
              <ApproveeLeaveStatistic eid ={props.location.state[0].datum[0].senderEmployeeNo}/>
          </div>
        </div>
      </div>
    </>
  );
};
export default withRouter(LeaveApproveeCard);
