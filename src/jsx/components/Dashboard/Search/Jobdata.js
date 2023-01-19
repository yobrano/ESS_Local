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
import "./filtering.css";

import { withRouter } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const Jobdata = (props) => {
  // const location = useLocation();
  const datum = [];
  const [visibility, setVisibility] = useState(0);

  const [selectedFile, setSelectedFile] = useState([]);
  const [uploadButtonActive,setUploadButtonActive] = useState(false)
  //state for checking file size
  const [fileSize, setFileSize] = useState(true);
  // for file upload progress message
  const [fileUploadProgress, setFileUploadProgress] = useState(false);
  //for displaying response message
  const [fileUploadResponse, setFileUploadResponse] = useState(null);

  useEffect(() => {
    if(props.location.state[0].jobData.jobCheck[0].description ===""){
      setUploadButtonActive(true)
    }
  
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


    axios
      .post(
        `${process.env.REACT_APP_API_S_LINK}/home/applyjob`,

        {
          JobReqNo: props.location.state[0].jobData.jobMeta.no,
          JobTitle: props.location.state[0].jobData.jobMeta.jobtitle,
          Deadline: props.location.state[0].jobData.jobMeta.closingdate,
          // ApplicationDate:today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate(),
        },
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          alert(response.data.message);
          
          // console.log(response.data);
        }
      })
      .catch((err) => {
        console.log({ err: err });
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

    let orignalSize = props.location.state[0].jobData.jobCheck.length;
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
    //   jobId:props.location.state[0].jobData.jobMeta.no
    //   // form:
    // };
    // console.log(bodyParameters);

    let jobNo = props.location.state[0].jobData.jobMeta.no;
 
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

  try {
    if(props.location.state[0] === undefined)
    {
      window.location="/login";
      return;

    }
    if (props.location.state[0].jobData) {
      return (
        <>
          {/* <Header  navClass="navbar-white" navIcon={landing} /> */}
          {/* Header section */}
          {/* <article className="job-header">
            <section className="header-section"> */}
          <Container>
            <h4 className="jobtitle-h">
              {props.location.state[0].jobData.jobMeta.jobtitle}
            </h4>
          </Container>
          {/* </section>
          </article> */}
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
                          {props.location.state[0].jobData.jobMeta.startdate}
                        </span>{" "}
                      </h4>

                      {/* <h4>Salary: <span className="pdate">Posting Date</span> </h4> */}

                      <p>
                        {props.location.state[0].jobData.jobMeta.description}
                      </p>
                      <p>{props.location.state[0].jobData.jobMeta.comment}</p>
                    </div>

                    <div className="majorDataDiv my-5">
                      <h4>Job Requirement</h4>
                      <ul>
                        {props.location.state[0].jobData.jobRequirement.map(
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
                        {props.location.state[0].jobData.jobQualification.map(
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
                        {props.location.state[0].jobData.jobTask.map(
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
                          {props.location.state[0].jobData.jobMeta.closingdate}
                        </p>
                      </div>
                      <div className="checklistsection">
                        <Card className="rounded-0">
                          <CardBody>
                            <CardTitle tag="h5">CheckList</CardTitle>

                            <Form>
                              {props.location.state[0].jobData.jobCheck.map(
                                (d3, k) => (
                                  <>
                                    {/* <FormGroup
                                  check
                                  inline
                                  className="d-md-flex align-items-center"
                                  key={k}
                                  required
                                >
                                  <Input type="checkbox" onClick={()=>setVisibility(!visibility)} />
                                </FormGroup> */}
                                    <FormGroup
                                      className={
                                        true ? `b-block ${k}` : `d-none ${k}`
                                      }
                                      key={`cklis-${k}`}
                                    >
                                      <Label check>{d3.description}</Label>
                                      <Input
                                        id="exampleFile"
                                        name={`file${k}`}
                                        type="file"
                                        onChange={(e)=>checkFile(e,k)}
                                        required
                                        key={`input-${k}`}
                                      />
                                    </FormGroup>
                                  </>
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

                      <div className="text-left">
                      <button
                        className={uploadButtonActive===false?"btn btn-primary d-none apply-job-btn rounded-0":"btn btn-primary rounded-0 d-block apply-job-btn"}
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
    }
  } catch (error) {
    console.log(error);
    return <></>;
  }
};

export default withRouter(Jobdata);
