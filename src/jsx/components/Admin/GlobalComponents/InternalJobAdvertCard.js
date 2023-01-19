import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  CardBody,
  CardSubtitle,
  Button,
  CardText,
  CardTitle,
  Card,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
// import "./InternalJobAdvertCard.css";

import { withRouter } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const InternalJobAdvertCard = (props) => {
  // const location = useLocation();
  const datum = [];

  const [loading, setLoading] = useState(true);

  const [selectedFile, setSelectedFile] = useState([]);
  const [uploadButtonActive,setUploadButtonActive] = useState(false)
  //state for checking file size
  const [fileSize, setFileSize] = useState(true);
  // for file upload progress message
  const [fileUploadProgress, setFileUploadProgress] = useState(false);
  //for displaying response message
  const [fileUploadResponse, setFileUploadResponse] = useState(null);

  const [jobData,setJobData]=useState({})
  useEffect(() => {
    // if(props.location.state[0].datum[0].jobtitle ===""){
    //   setUploadButtonActive(true)
    // }

    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };
      axios(`${process.env.REACT_APP_API_S_LINK}/home/jobdata/${props.location.state[0].datum[0].no}`,config)
      .then((result) => {
        if (result.status === 200) {
          
        setJobData(result.data);
        setUploadButtonActive(true)
        setLoading(false)
       }
      })
      .catch((error) => {
        console.log({ err: error });
      });


    window.scrollTo(0, 0);
  }, [props.location.state]);

  const applyJob = () => {
    // headers: { Authorization: `Bearer ${token}` }

    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Apply",
      icon: "warning",
      dangerMode: true,
    })
      .then((willProcede) => {
        if (willProcede) {
          return  axios
          .post(
            `${process.env.REACT_APP_API_S_LINK}/home/applyinternaljob`,
    
            {
              JobReqNo: props.location.state[0].datum[0].no,
              JobTitle: props.location.state[0].datum[0].jobtitle,
              Deadline: props.location.state[0].datum[0].closingdate,
            },
            config
          );
        }
      })
      .then(function (response) {
        if (response.status === 200) {
          swal("Success!", response.data.message, "success");
        }
      })
      .catch((err) => {
        if (err.response !== undefined) {
          // swal("Oh!", err.response.data.message, "error");
          if (err.response.data.message) {
            swal("Oh!", err.response.data.message, "error");
          } else {
            swal("Oop!", err.message, "error");
          }
        } else if (err.message) {
          swal("Oh!", err.message, "error");
        } else {
          swal("Oh!", "Apply Job Failed", "error");
        }
      });
  };

  const gotoJobApplication = () => {
    applyJob();
  };
  // const loadFromLocalStorage = () => {
  //   try {
  //     const stateStr = localStorage.getItem("state");
  //     return stateStr ? JSON.parse(stateStr) : undefined;
  //   } catch (e) {
  //     console.error(e);
  //     return undefined;
  //   }
  // };

  // console.log(props.location.state[0].jobData.jobCheck.length);
  // if(props.location.state[0].jobData.jobCheck !== undefined){
    // if(props.location.state[0].jobData.jobCheck.length>0){
    //   setUploadButtonActive(true)
    // }
  // }
  // if(props.location.state[0].jobData.jobCheck.length===1){
    // if(props.location.state[0].jobData.jobCheck[0].description ===""){
    //   setUploadButtonActive(true)
    // }
  // }

  const checkFile = (event,i) => {
   console.log(event.target.files);
   let list = [...selectedFile]
    list[i] = event.target.files;
   setSelectedFile(list)
  };
  const handleFileSubmission = (event) => {
    event.preventDefault();
   
    if(selectedFile[0] === undefined){
      alert('Missing documents')
      return;
    }

    setFileSize(true);
    setFileUploadProgress(true);
    setFileUploadResponse(null);

    let orignalSize = jobData.jobCheck.length;
    let stateLength = selectedFile.length;
    if(orignalSize !== stateLength){
      alert('Missing entry');
      return;
    }
    const formData = new FormData();

    for (let i = 0; i < selectedFile.length; i++) {
      if(selectedFile[i] === undefined){
        alert('missing entry')
        return;
      }
      if(selectedFile[i][0] === undefined){
        alert('missing entry')
        return;
      }
     
      if (selectedFile[i][0].size/1024 > 6024) {
        setFileSize(false);
        setFileUploadProgress(false);
        setFileUploadResponse(null);
        alert("Size above 1MB");
        return;
      }
      if (selectedFile[i][0].type !== "application/pdf") {
        setFileSize(false);
        setFileUploadProgress(false);
        setFileUploadResponse(null);
        alert("File not pdf.");
        return;
      }

     
       formData.append(`forms`, selectedFile[i][0]);
     
    }
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    // const bodyParameters = {
    //   formData,
    //   jobId:jobData.jobMeta.no
    //   // form:
    // };
    // console.log(bodyParameters);

    let jobNo = jobData.jobMeta.no;
 
    axios
      .post(
        `${process.env.REACT_APP_API_S_LINK}/home/uploadcheck/${jobNo}`,
        formData,
        config
      )
      .then((result) => {
        if(result.status ===200){
        console.log("Success:", result);
        swal(result.data.message)
        setSelectedFile([])
        setUploadButtonActive(true)
        }
       
      })
      .catch((error) => {
        swal("Oh",error.response.data.message,"error")
        console.error("Error:",error.response);
      });
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

      <Container>
        <h4 className="jobtitle-h">
          {jobData.jobMeta.jobtitle}
        </h4>
      </Container>
  
      {/* End Header section */}
      {/* Job Data */}
      <article className="jobData-article">
        <section className="jobData-section">
          <Container>
            <Row>
              <Col md={{ size: 5 }} className="">
                <div className="minorData mt-2 mb-4">
                  <h4>
                    Posting Date:{" "}
                    <span className="pdate">
                      {jobData.jobMeta.startdate}
                    </span>{" "}
                  </h4>

                  {/* <h4>Salary: <span className="pdate">Posting Date</span> </h4> */}

                  <p>
                    {jobData.jobMeta.description}
                  </p>
                  <p>{jobData.jobMeta.comment}</p>
                </div>

                <div className="majorDataDiv my-5">
                  <h4>Job Requirement</h4>
                  <ul>
                    {jobData.jobRequirement.map(
                      (d, k) => (
                        <li key={k} className="list-style-square">
                          {d.description}{" "}
                          {d.mandatory === "Yes" ? (
                            <span className="required-job-ast ml-2">
                              *Required
                            </span>
                          ) : (
                            ""
                          )}
                        </li>
                      )
                    )}
                  </ul>

                  <h4>Job Qualification </h4>
                  <ul>
                    {jobData.jobQualification.map(
                      (d1, k) => (
                        <li key={k} className="list-style-square">
                          {d1.description}{" "}
                          {d1.mandantory === "Yes" ? (
                            <span className="required-job-ast ml-2">
                              *Required
                            </span>
                          ) : (
                            ""
                          )}
                        </li>
                      )
                    )}
                  </ul>
                  <h4>Job Responsibility</h4>
                  <ul>
                    {jobData.jobTask.map(
                      (d2, k) => (
                        <li key={k} className="list-style-square">
                          {" "}
                          {d2.description}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </Col>
              <Col md={{ size: 7 }}>
                <div className="deadlineSubmitData mt-2">
                  <div className="dediline d-flex justify-content-end mb-5">
                    <h4> Deadline:</h4>
                    <p className="ml-3 text-danger dendidate">
                      {jobData.jobMeta.closingdate}
                    </p>
                  </div>
                  <div className="checklistsection ">
                    <Card className="rounded-0">
                      <CardBody>
                        <CardTitle tag="h5">CheckList</CardTitle>

                        <Form>
                          {jobData.jobCheck.map(
                            (d3, k) => (
                              
                              
                                <FormGroup
                                  // className={
                                  //   true ? `b-block ${k}` : `d-none ${k}`
                                  // }
                                  key={`cklis-${k}`}
                                >
                                  <Label check key={k}>{d3.description}</Label>
                                  <Input
                                    id="exampleFile"
                                    name={`file${k}`}
                                    type="file"
                                    onChange={(e)=>checkFile(e,k)}
                                    required
                                    key={`input-${k}`}
                                  />
                                </FormGroup>
                              
                            )
                          )}
                        </Form>

                        <button
                          className="rounded-0 checklist-btn"
                          onClick={handleFileSubmission}
                        >
                          Upload Documents
                        </button>
                      </CardBody>
                    </Card>
                  </div>

                  <div className="d-flex justify-content-end">
                  <button
                    className={uploadButtonActive===false?"btn btn-primary d-none apply-job-btn2 rounded-0":"btn btn-primary rounded-0 d-block apply-job-btn2"}
                    onClick={gotoJobApplication}
                  >
                    Apply Job
                  </button>
                  </div>
                  
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </article>
    </>
    
  );
    
 
};

export default withRouter(InternalJobAdvertCard);
