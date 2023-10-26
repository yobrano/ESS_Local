import axios from "axios";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import BreadCrumb from "./BreadCrumb";
import  secureLocalStorage  from  "react-secure-storage"; import { decryptToken} from "./../../../../AppUtility"; import jwt_decode from "jwt-decode";

const CompetenceCard = (props) => {
  const [loading, setLoading] = useState(true);
  const [generalDisabled, setGeneralDisabled] = useState(true);
  const [getReportDisabled, setGetReportDisabled] = useState(true);
  const [genData,setGenData] = useState({})
  const [compLines,setCompLines] = useState([])


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
        `${process.env.REACT_APP_API_S_LINK}/competence/getstaffcompetencegeneral/${props.location.state[0].datum[0].cno}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
            setGenData(response.data.competenceGeneral[0])
            getCompentenceLines()
            if(response.data.competenceGeneral[0].status == "Completed"){
              setGetReportDisabled(false)
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
  }, []);

  //Get Competence Lines
  const getCompentenceLines = ()=>{
    const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureLocalStorage.getItem("userDetails"))
          }`,
        },
      };
  
      axios
        .get(
          `${process.env.REACT_APP_API_S_LINK}/competence/getstaffcompetencelines/${props.location.state[0].datum[0].cno}`,
          config
        )
        .then(function (response) {
          if (response.status === 200) {
            setCompLines(response.data.competenceLines);
            setLoading(false);
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

  //Redirect to a line
  const EditCompetenceRec = (type,description,assesment,comment,line,cno) =>{
    props.history.push("/edit-competence-line", [
        {
          type: type,
          description: description,
          assesment:assesment,
          comment:comment,
          line:line,
          cno:cno
        },
      ]);
  }

  //Push to supervisor
  const PushToSupervisor = () =>{
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Push",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        // setPostBtnState(true)
        if (willCreate) {
          return axios.get(
            `${process.env.REACT_APP_API_S_LINK}/competence/staffpushtosupervisor/${props.location.state[0].datum[0].cno}`,
            // udata,
            config
          );
        }
      })
      .then(function (response) {
        if (response.status === 200) {
          swal("Success", "Record Pushed.", "success");
        }
      })
      .catch((err) => {
        if (err !== undefined) {
          swal("Ops!", "Record not Pushed", "error");
        }
        if (err.response !== undefined) {
          swal("Ooh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
      });
  }

  //Calc
  const CalcComp = ()=>{
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Calculate",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        // setPostBtnState(true)
        if (willCreate) {
          return axios.get(
            `${process.env.REACT_APP_API_S_LINK}/competence/staffcalculatescore/${props.location.state[0].datum[0].cno}`,
            // udata,
            config
          );
        }
      })
      .then(function (response) {
        if (response.status === 200) {
          swal("Success", "Record Calculated.", "success");
        }
      })
      .catch((err) => {
        if (err !== undefined) {
          swal("Ops!", "Record not Calculated", "error");
        }
        if (err.response !== undefined) {
          swal("Ooh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
      });
  }

  const GetReport = () =>{
    const config = {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
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
            `${process.env.REACT_APP_API_S_LINK}/competence/getcompentencyreport/${props.location.state[0].datum[0].cno}`,
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
       
        <div className="d-md-flex">
        <BreadCrumb props={props} backlink={"competency-list"}/>
          <button className="btn btn-success ml-auto" onClick={CalcComp} disabled={!getReportDisabled}>Calculate Score</button>
          <button className="btn btn-info ml-md-1" onClick={GetReport} disabled={getReportDisabled}>Get Report</button>
          <button className="btn btn-warning ml-md-1" onClick={PushToSupervisor} disabled={!getReportDisabled}>Push to Supervisor</button>
        </div>
        {/* Disabled fields */}
        <div className="card mt-3">
            <div className="card-body">
            <div className="row">
                <div className="col-md-3">
                <div className="form-group">
                    <label htmlFor="">Competency No</label>
                    <input
                    type="text"
                    className="form-control"
                    value={genData.cno}
                    disabled={generalDisabled}
                    />
                </div>
                </div>
                <div className="col-md-3">
                <div className="form-group">
                    <label htmlFor="">Staff</label>
                    <input
                    type="text"
                    className="form-control"
                    value={genData.staffname}
                    disabled={generalDisabled}
                    />
                </div>
                </div>
                <div className="col-md-3">
                <div className="form-group">
                    <label htmlFor="">Supervisor</label>
                    <input
                    type="text"
                    className="form-control"
                    value={genData.supervisorname}
                    disabled={generalDisabled}
                    />
                </div>
                </div>

                <div className="col-md-3">
                <div className="form-group">
                    <label htmlFor="">Status</label>
                    <input
                    type="text"
                    className="form-control"
                    value={genData.status}
                    disabled={generalDisabled}
                    />
                </div>
                </div>

                <div className="col-md-4">
                <div className="form-group">
                    <label htmlFor="">Behaviour Score Employee</label>
                    <input
                    type="text"
                    className="form-control"
                    value={parseFloat(genData.behavescoreemp).toFixed(2) }
                    disabled={generalDisabled}
                    />
                </div>
                </div>
                <div className="col-md-4">
                <div className="form-group">
                    <label htmlFor="">Behaviour Score Supervisor</label>
                    <input
                    type="text"
                    className="form-control"
                    value={parseFloat(genData.behavescoresup).toFixed(2) }
                    disabled={generalDisabled}
                    />
                </div>
                </div>
                <div className="col-md-4">
                <div className="form-group">
                    <label htmlFor="">Behaviour Score Average</label>
                    <input
                    type="text"
                    className="form-control"
                    value={parseFloat(genData.behavescoreavg).toFixed(2) }
                    disabled={generalDisabled}
                    />
                </div>
                </div>
                <div className="col-md-4">
                <div className="form-group">
                    <label htmlFor="">Technical Score Employee</label>
                    <input
                    type="text"
                    className="form-control"
                    value={parseFloat(genData.techscoreemp).toFixed(2) }
                    disabled={generalDisabled}
                    />
                </div>
                </div>
                <div className="col-md-4">
                <div className="form-group">
                    <label htmlFor="">Technical Score Supervisor</label>
                    <input
                    type="text"
                    className="form-control"
                    value={parseFloat(genData.techscoresup).toFixed(2) }
                    disabled={generalDisabled}
                    />
                </div>
                </div>
                <div className="col-md-4">
                <div className="form-group">
                    <label htmlFor="">Technical Score Average</label>
                    <input
                    type="text"
                    className="form-control"
                    value={ parseFloat(genData.techscoreavg).toFixed(2)}
                    disabled={generalDisabled}
                    />
                </div>
                </div>

                <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor=""> Average Score</label>
                    <input
                    type="text"
                    className="form-control"
                    value={parseFloat(genData.averagescore).toFixed(2) }
                    disabled={generalDisabled}
                    />
                </div>
                </div>
                <div className="col-md-6">
                <div className="form-group">
                    <label htmlFor="">Average Score (%)</label>
                    <input
                    type="text"
                    className="form-control"
                    value={parseFloat(genData.percentagescore).toFixed(2)}
                    disabled={generalDisabled}
                    />
                </div>
                </div>
            
                



            </div>
            </div>
        </div>
        <div className="card">
            <div className="card-header">
                Competence Lines
                {/* <i className="fa fa-circle-o ml-2"></i> */}
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
                        <th>Type</th>
                        <th>Description</th>
                        <th>Employee Assesment</th>
                        <th>Employee Comment</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {compLines.map((d, i) => (
                        <tr key={i}>
                        <td>{d.type}</td>
                        <td>{d.description}</td>
                        <td>{d.employeeassesment}</td>
                        <td>{d.employeecomment}</td>
                        <td className="">
                            <button
                            className="btn btn-info rounded-0 w-100"
                              onClick={() =>
                                EditCompetenceRec(
                                  d.type,
                                  d.description,
                                  d.employeeassesment,
                                  d.employeecomment,
                                  d.lineno,
                                  d.cno
                                )
                              }
                              disabled={!getReportDisabled}
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
    </>
  );
};

export default withRouter(CompetenceCard);
