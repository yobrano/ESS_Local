import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";
import DatePicker from "react-datepicker";

const LeaveSuperviseeCard = (props) => {
  const [loading, setLoading] = useState(true);
  const [personalData,setPersonalData] = useState({})
  const [leaveBalace,setLeaveBalance] = useState([])
  const [leaveHistory,setLeaveHistory]= useState([])

  const [data, setData] = useState(
    document.querySelectorAll("#job_data tbody tr")
  );
  const sort = 5;
  const activePag = useRef(0);
  const [test, settest] = useState(0);

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
        `${process.env.REACT_APP_API_S_LINK}/leave/getemployeepermananger/${props.location.state[0].datum[0].employeeNo}/`,
        config
      )

      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          setPersonalData(response.data.employee[0])
          setLeaveBalance(response.data.leaveBalance)
          setLeaveHistory(response.data.usedLeaves)

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


  // Active data
  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove("d-none");
      } else {
        data[i].classList.add("d-none");
      }
    }
  };
  // use effect
  useEffect(() => {
    setData(document.querySelectorAll("#job_data tbody tr"));
    //chackboxFun();
  }, [test]);

  // Active pagginarion
  activePag.current === 0 && chageData(0, sort);
  // paggination
  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1);

  // Active paggination & chage data
  const onClick = (i) => {
    activePag.current = i;
    chageData(activePag.current * sort, (activePag.current + 1) * sort);
    settest(i);
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card rounded-0">
              <div className="card-header">Personnel Info</div>
              <div className="card-body">
                <div className="roleform">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="">No</label>
                        <input type="text" className="form-control" disabled={true} value={personalData.employeeNo} />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="">Name</label>
                        <input type="text" className="form-control" disabled={true} value={personalData.employeeName} />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="">Contract</label>
                        <input type="text" className="form-control" disabled={true} value={personalData.employmentContractCode} />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="">Gender</label>
                        <input type="text" className="form-control" disabled={true} value={personalData.gender} />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="">Branch</label>
                        <input type="text" className="form-control" disabled={true} value={personalData.globalDimension1Code} />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="">Product</label>
                        <input type="text" className="form-control" disabled={true} value={personalData.globalDimension2Code} />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="">Department</label>
                        <input type="text" className="form-control" disabled={true} value={personalData.shortcutDimension3Code} />
                      </div>
                    </div>


                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="">Job</label>
                        <input type="text" className="form-control" disabled={true} value={personalData.jobTitle} />
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="form-group">
                        <label htmlFor="">Supervisor</label>
                        <input type="text" className="form-control" disabled={true} value={personalData.supervisorNo} />
                      </div>
                    </div>

                    {/* {displayAttachment ? attahchmentDiv : ""} */}
                  </div>
                </div>
              </div>
            </div>
            {/* If attachment is needed */}
          
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
          <div className="card rounded-0">
              <div className="card-header">Leave History</div>
              <div className="card-body">
              <div className="table-responsive">
              <div id="job_data" className="dataTables_wrapper ">
                <table
                  className="display w-100 dataTable "
                  id="example5"
                  role="grid"
                  aria-describedby="example5_info"
                >
                  <thead>
                    <tr role="row">
                      <th className="sorting_asc" style={{ width: "177px" }}>
                        No
                      </th>
                      <th className="sorting" style={{ width: "278px" }}>
                        Type
                      </th>
                      <th className="sorting" style={{ width: "128px" }}>
                        Start Date
                      </th>
                      {/* <th className="sorting" style={{ width: "46px" }}>
                        Applied Days
                      </th> */}
                      <th className="sorting" style={{ width: "114px" }}>
                        Approved Days
                      </th>
                      <th className="sorting" style={{ width: "110px" }}>
                        End Date
                      </th>
                      <th className="sorting" style={{ width: "110px" }}>
                        Return Date
                      </th>

                    
                      <th className="sorting" style={{ width: "110px" }}>
                        Status
                      </th>

                      {/* <th className="sorting" style={{ width: "110px" }}>
                        Comment
                      </th> */}

                    </tr>
                  </thead>
  
                  <tbody>
                    {leaveHistory.map((d,i)=>(
                       <tr className={i%2===0?'even':'odd'} role="row" key={i}>
                       <td className="sorting_1">{d.no}</td>
                       <td>{d.leaveType}</td>
                       <td>{d.leaveStartDate}</td>
                       {/* <td>{d.daysApplied}</td> */}
                       <td>{d.daysApproved}</td>
                       <td>{d.leaveEndDate}</td>
                       <td>{d.leaveReturnDate}</td>
                       <td>{d.status}</td>
                       {/* <td>{d.reasonForLeave}</td> */}
                     
                     </tr>
                    ))}
                  


                 
              
                  </tbody>
             
                </table>
                <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                  <div className="dataTables_info">
                    Showing {activePag.current * sort + 1} to{" "}
                    {data.length > (activePag.current + 1) * sort
                      ? (activePag.current + 1) * sort
                      : data.length}{" "}
                    of {data.length} entries
                  </div>
                  <div className="dataTables_paginate paging_simple_numbers" id="example5_paginate">
                      <Link className="paginate_button previous disabled" to="#" onClick={() => activePag.current > 0 && onClick(activePag.current - 1)}>
                          Previous
                      </Link>
                      <span>
                          {paggination.map((number, i) => (
                              <Link key={i} to="#" className={`paginate_button  ${ activePag.current === i ? "current" : ""} `}onClick={() => onClick(i)}>
                                  {number}
                              </Link>
                          ))}
                      </span>
                      <Link className="paginate_button next" to="#" onClick={() => activePag.current + 1 < paggination.length && onClick(activePag.current + 1)}>
                          Next
                      </Link>
                  </div>
                </div>
              </div>
            </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
          <div className="card rounded-0">
              <div className="card-header">Leave Stats</div>
              <div className="card-body">
              <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Leave</th>
                  <th scope="col">Balance</th>
                </tr>
              </thead>
              <tbody>
                {leaveBalace.map((d, i) => (
                  <tr key={i}>
                    <td>{d.label}</td>
                    <td>{d.leavebalance}</td>
                    {/* <td>{d.label}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default withRouter(LeaveSuperviseeCard);
