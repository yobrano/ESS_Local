import axios from "axios";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import BreadCrumb from "./BreadCrumb";

const CompetenceCard = (props) => {
  const [loading, setLoading] = useState(true);
  const [generalDisabled, setGeneralDisabled] = useState(true);
  const [genData,setGenData] = useState({})
  const [compLines,setCompLines] = useState([])

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
        `${process.env.REACT_APP_API_S_LINK}/competence/getstaffcompetencegeneral/${props.location.state[0].datum[0].cno}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
            setGenData(response.data.competenceGeneral[0])
            getCompentenceLines()
          
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
            JSON.parse(localStorage.getItem("userDetails")).idToken
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
  const EditCompetenceRec = (type,description,assesment,comment,line) =>{
    props.history.push("/edit-competence-line", [
        {
          type: type,
          description: description,
          assesment:assesment,
          comment:comment,
          line:line
        },
      ]);
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
        <BreadCrumb props={props} backlink={"competency-list"}/>
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
                    value={genData.behavescoreemp}
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
                    value={genData.behavescoresup}
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
                    value={genData.behavescoreavg}
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
                    value={genData.techscoreemp}
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
                    value={genData.techscoresup}
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
                    value={genData.techscoreavg}
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
                    value={genData.averagescore}
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
                    value={genData.percentagescore}
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
                                  d.lineno
                                )
                              }
                            //   disabled={isActive}
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
