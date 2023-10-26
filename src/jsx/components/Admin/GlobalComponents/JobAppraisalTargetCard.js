import axios from "axios";
import { setDate } from "date-fns/esm";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import Select from "react-select";
import swal from "sweetalert";
import  secureLocalStorage  from  "react-secure-storage"; import { decryptToken} from "./../../../../AppUtility"; import jwt_decode from "jwt-decode";

const JobAppraisalTargetCard = (props) => {
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
  useEffect(() => {
    //let docCode = props.location.state[0].datum[0].documentCode;
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/performance/getsinglekpi/${props.location.state[0].datum[0].no}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data);
          setLoading(false);
          setJobkpiList(response.data.performanceIndicators);
          setData(props.location.state[0].datum[0]);
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          // =>console.log(response.data.message);
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
          Authorization: `Bearer ${
            JSON.parse(secureLocalStorage.getItem("userDetails"))
          }`,
        },
      };

      axios
        .get(
          `${process.env.REACT_APP_API_S_LINK}/performance/getperformanceactivitiesstandards/${selectedKPI.value}/${props.location.state[0].datum[0].no}`,
          config
        )
        .then(function (response) {
          if (response.status === 200) {
            // =>console.log(response.data);
            setActivityList(response.data.performanceActivities);
            setStandardList(response.data.performanceStandards);
            setDisableCreateNewActivity(false);
            setDisableCreateNewStandard(false);
          }
          if (response.status === 404) {
            swal("Oh!", response.data.message, "error");
            // =>console.log(response.data.message);
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




  const DeleteActivity =(targetCode,headerNo,kpiCode)=>{

    const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureLocalStorage.getItem("userDetails"))
          }`,
        },
      };
  
      let udata = {
        HeaderNo: headerNo,
        KPICode: parseInt(kpiCode),
        TargetCode: parseInt(targetCode)
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
              props.history.go(-2)
          }
        })
        .catch((err) => {
          // // =>console.log("catch err:"+err);
          if (err !== undefined) {
            swal("Ooh!", "Error File not Found", "error");
          }
          if (err.response !== undefined) {
            swal("Ooh!", err.response.data.message, "error");
          } else {
            swal("Oh!", err.message, "error");
          }
        });
  }

  const ApproveAppraisal = ()=>{
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
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
        // =>console.log("catch err:"+err);
        // if (err !== undefined) {
        //   swal("Ooh!", err, "error");
        // }
        if (err.response !== undefined) {
          swal("Ooh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
      });
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
      <div className="container">
        <div className="row">
          <div className="col-md-8">
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
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="">Period</label>
                  <input
                    type="text"
                    className="form-control"
                    value={data.period}
                    disabled={true}
                  />
                </div>
              </div>
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
          <div className="col-md-4">
            <div className="d-flex mb-5  mt-4">

            <button className="btn btn-warning rounded-0" onClick={ApproveAppraisal}> Submit <i className="flaticon-381-success-1"></i></button>
            <h4 className="my-3 ml-auto">KPIs</h4>
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
                    <th>No</th>
                    <th>Performance Indicators</th>
                  </tr>
                </thead>
                <tbody>
                  {jobkpiList.map((d, i) => (
                    <tr key={i}>
                      {/* <td>{++i}</td> */}
                      <td>{d.value}</td>
                      <td>{d.label}</td>
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
        <div className="card mb-1 mt-md-5">
          <div className="card-header">
            Performance Activities
            <i className="fa fa-circle ml-2"></i>
          </div>
          <div className="card-body">
            <button
              className="btn btn-success my-1 rounded-0"
              disabled={disableCreateNewActivity}
                onClick={()=>{
                    props.history.push("/new-activity",[{ datum: props.location.state[0].datum[0] },{cardata:activityList}])
                }}
            >
              New Activity <i className="fa fa-pencil-square"></i>
            </button>

            <div className="table-responsive">
              <table
                id="example"
                className="display w-100 dataTable table"
                role="grid"
                aria-describedby="example_info"
              >
                <thead className="thead-light">
                  <tr>
                    <th>Activity Code</th>
                    <th>Performance Activity</th>
                    <th>Activity Weight</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {activityList.map((d, i) => (
                    <tr key={i}>
                      <td>{d.activitycode}</td>
                      <td>{d.activityDescription}</td>
                      <td>{d.activityWeighting}</td>
                      {/* <td className="d-md-flex0">
                        <button className="btn btn-info rounded-0  w-100">
                          Edit <i className="fa fa-edit"></i>
                        </button>
                        <button className="btn btn-danger rounded-0 w-100"
                      
                        onClick={()=>DeleteActivity(d.targetCode,d.headerNo,d.criteriaCode)}
                        >
                          Delete <i className="fa fa-trash"></i>
                        </button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* </div> */}

        {/* <div className="row"> */}
        <div className="card my-1">
          <div className="card-header">
            Performance Standards
            <i className="fa fa-circle-o ml-2"></i>
          </div>
          <div className="card-body">
            <button
              className="btn btn-primary my-1 rounded-0"
              disabled={disableCreateNewStandard}
              onClick={()=>{
                props.history.push("/new-standard",[{ datum: props.location.state[0].datum[0] },{cardata:activityList}])
            }}
            >
              New Standard <i className="fa fa-pencil-square"></i>
            </button>

            <div className="table-responsive">
              <table
                id="example"
                className="display w-100 dataTable table"
                role="grid"
                aria-describedby="example_info"
              >
                <thead className="thead-light">
                  <tr>
                    <th>From Which Activity</th>
                    <th>Performance Standard</th>
                    <th>Target Score</th>
                    <th>Target Date</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {standardList.map((d, i) => (
                    <tr key={i}>
                      <td>{d.activityDescription}</td>
                      <td>{d.standardDescription}</td>
                      <td>{d.targetedScore}</td>
                      <td>{d.timelines}</td>
                      {/* <td className="">
                        <button className="btn btn-info rounded-0 w-100">
                          Edit <i className="fa fa-edit"></i>
                        </button>
                        <button className="btn btn-danger rounded-0 w-100">
                          Delete <i className="fa fa-trash"></i>
                        </button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default withRouter(JobAppraisalTargetCard);
