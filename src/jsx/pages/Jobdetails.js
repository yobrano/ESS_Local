import React, { useEffect } from 'react'
import {
  Container,
  Row,
  Col,
} from "reactstrap";
import Footer from './partials/Footer';
import Header from './partials/NavbarPg'
import landing from "./../../images/icon.png"
import { withRouter } from 'react-router-dom';
import { format } from 'date-fns';
// import { useLocation } from 'react-router-dom';
import  secureLocalStorage  from  "react-secure-storage"; import { decryptToken} from "./../../AppUtility"; import jwt_decode from "jwt-decode";

function Jobdetails(props) {

  // const location = useLocation();
  const datum = [];

  useEffect(()=>{
    // datum = props.location.state
    // // =>console.log(props.location.state[0].jobData)

    window.scrollTo(0, 0)
  },[props.location.state]);

  const gotoJobApplication = ()=>{

  }
  const loadFromLocalStorage = () => {
    try {
      const stateStr = secureLocalStorage.getItem('state');
      return stateStr ? JSON.parse(stateStr) : undefined;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };

  try {
    if(props.location.state[0].jobData){
      return (
        <>
        <Header  navClass="navbar-white" navIcon={landing} />
        {/* Header section */}
          <article className="job-header">
            <section className="header-section">
              <Container>
                  <h4 className="jobtitle-h">
                  {props.location.state[0].jobData.jobMeta.jobtitle}
                  </h4>
              </Container>
            </section>
          </article>
          {/* End Header section */}
          {/* Job Data */}
          <article className="jobData-article">
            <section className="jobData-section">
              <Container>
                <Row>
                <Col md={{size:8}} className=''>
                  <div className="minorData mt-2 mb-4">
                  <h4>Posting Date: <span className="pdate">{props.location.state[0].jobData.jobMeta.startdate}</span> </h4>
                 
                  {/* <h4>Salary: <span className="pdate">Posting Date</span> </h4> */}
    
               
                  <p>
                  {props.location.state[0].jobData.jobMeta.description}
                  </p>
                  <p>
                  {props.location.state[0].jobData.jobMeta.comment}
                  </p>
                  </div>
                
                  <div className="majorDataDiv my-5">
                  <h4>Job Requirement</h4>
                  <ul>
                    {
                      props.location.state[0].jobData.jobRequirement.map(
                        (d,k)=>(
                          <li key={k}  className="list-style-square" >{d.description} {(d.mandatory === 'Yes')?<span className="required-job-ast ml-2">*Required</span>:'' }</li>
                        )
                      )
                    }
                  </ul>
               
                  <h4>Job Qualification </h4>
                  <ul>
                    {
                      props.location.state[0].jobData.jobQualification.map(
                        (d1,k)=>(
                          <li key={k}  className="list-style-square" >{d1.description} {(d1.mandantory === 'Yes')?(<span className="required-job-ast ml-2">*Required</span>):'' }</li>
                        )
                      )
                    }
                  </ul>
                  <h4>Job Responsibility</h4>
                  <ul>
                    {
                      props.location.state[0].jobData.jobTask.map(
                        (d2,k)=>(
                          <li key={k}  className="list-style-square" >  {d2.description}</li>
                        )
                      )
                    }
                  </ul>
                  </div>
              
    
    
                </Col>
                <Col md={{size:4}}>
                  <div className="deadlineSubmitData mt-2 text-right">
                  <div className="dediline d-flex justify-content-end">
                  <h4>   Deadline: 
                 </h4>
                 <p className='ml-3 text-danger dendidate' > 
                 {/* {// =>console.log(props.location.state[0].jobData[0].dealine)} */}
                 {/* {new Date().getDate()}/02/2002 */}
                 {
                 props.location.state[0].jobData.jobMeta.closingdate
                 }
                 </p>
                  </div>
                  <p>Login to Apply.</p>
                
                  {/* <button className='btn btn-primary' onClick={gotoJobApplication}>
                    Continue
                  </button> */}
                  </div>
                 
                </Col>
                </Row>
    
              </Container>
            </section>
          </article>
          {/* Footer */}
    
          <Footer/>
        </>
      )
    }
  } catch (error) {
    // =>console.log(error);
    return(
      <>
      
      </>
    )
  }
 
}

export default  withRouter(Jobdetails)