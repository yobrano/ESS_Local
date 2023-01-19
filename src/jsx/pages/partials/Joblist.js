import React, { Suspense, useEffect, useMemo, useState } from "react";
import { withRouter } from "react-router-dom";
// import background from "./../../../images/landing.jpg";
// import { format } from "date-fns";
// import JOB_DATA from "./JOB_DATA.json";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
// import { GetPostedJobs } from "../../../store/actions";
// import { Jobs } from "../../../services/IndexService";
import axios from "axios";

function Joblist(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_API_S_LINK}/home/posted-jobs/`)
        .then((result) => {
            //console.log(result);
            setData(result.data);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

  console.log(data);

  if (loading) {
    return (
       
          <>
          <Container>
            <div className="headerDiv">
              <input
                type="text"
                placeholder="Search Job Title"
                className="form-control w-25 my-3"
              />
              <h4 className=" my-3">Job List</h4>
            </div>
            {/* List */}
            <Row className="jobRow">
            <div id="preloader-home">
                    <div className="sk-three-bounce">
                        <div className="sk-child sk-bounce1"></div>
                        <div className="sk-child sk-bounce2"></div>
                        <div className="sk-child sk-bounce3"></div>
                    </div>
                </div>  
            </Row>
          </Container>
        </>
    );
  }
      


  const  getTheJob = (id) => {
    return axios(`${process.env.REACT_APP_API_S_LINK}/home/jobdata/${id}`)
  };
  const viewJob = (id) => {
    getTheJob(id)
    .then((result) => {
        return props.history.push("/jobdata", [{ jobData: result.data }]);
    })
    .catch((error) => {
        // const errorMessage = formatError(error.response.data);
        // dispatch(signupFailedAction(errorMessage));
    });
  };
    return (
      <>
        <Container>
          <div className="headerDiv">
          
            <h4 className=" my-3">Vacancy</h4>
          </div>
          {/* List */}
          <Row className="jobRow">
            <Col md={{ size: 12 }} className="my-1 p-1">
              <Card className="chromeCard">
                <Row className="p-2">
                    <Col md={{size:1}}>
                    <CardTitle
                      tag="h4"
                      className="headerTitle text-secondary m-1"
                    >
                      No
                    </CardTitle>
                       
                    </Col>
                  <Col
                    md={{ size: 5 }}
                    className="justify-content-start d-md-flex align-items-center"
                  >
                    <CardTitle
                      tag="h4"
                      className="headerTitle text-secondary m-1"
                    >
                      Position
                    </CardTitle>
                  </Col>
                
                  <Col
                    md={{ size: 2 }}
                    className="justify-content-start d-md-flex align-items-center"
                  >
                    <CardTitle
                      tag="h4"
                      className="headerTitle text-secondary m-1"
                    >
                      Deadline
                    </CardTitle>
                  </Col>
                  <Col
                    md={{ size: 4 }}
                    className="justify-content-center d-md-flex align-items-center"
                  >
                    <CardTitle
                      tag="h4"
                      className="headerTitle text-secondary m-1"
                    >
                      View Advertisement
                    </CardTitle>
                  
                  </Col>
                </Row>
              </Card>
            </Col>
            {data && data.length > 0 ? (
              data.map((d, k) => (
                // data.map((d,k)=>(

                <Col md={{ size: 12, offset: 0 }} key={k} className="my-1 p-1">
                  <Card className="chromeCard">
                    <Row className="p-2">
                    <Col md={{size:1}}>
                        {++k}
                    </Col>
                      <Col
                        md={{ size: 5 }}
                        className="justify-content-start d-md-flex"
                      >
                        <CardText className="jobTitle">{d.jobtitle}</CardText>
                      </Col>
                      
                      <Col md={{ size: 2 }}
                      className="justify-content-start d-md-flex"
                      >
                        <CardText className="jobDate">
                          {
                        //   format(new Date(d.closingdate), "dd/mm/yyyy")
                        d.closingdate
                          }
                        </CardText>
                      </Col>
                      <Col
                        md={{ size: 4 }}
                        className="justify-content-center d-md-flex align-items-center"
                      >
                        <Button
                          color="primary"
                          outline
                          onClick={() => viewJob(d.no)}
                        >
                          <i className=""></i>
                          View
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                // ))
              ))
            ) : (
              <h1 className="text-center mb-5">No result</h1>
            )}
          </Row>
        </Container>
      </>
    );
  }

export default withRouter(Joblist);
