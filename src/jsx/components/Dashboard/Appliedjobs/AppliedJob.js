import axios from "axios";
import { format } from "date-fns";
import React, { useState, useRef, useEffect, Fragment } from "react";
import { Container, Row, Table } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import  secureLocalStorage  from  "react-secure-storage"; import { decryptToken} from "./../../../../AppUtility"; import jwt_decode from "jwt-decode";

function AppliedJob(props){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const config = {
        headers: {
          Authorization: `Bearer ${JSON.parse(secureLocalStorage.getItem('userDetails'))}`,
        },
      };

    useEffect(() => {
      setLoading(true);
      axios.get(`${process.env.REACT_APP_API_S_LINK}/home/appliedjobs`,config)
        .then((result) => {
        //   // =>console.log(result.data);
          setData(result.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);
  
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

    return(
        <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Applied Job</h4>
          </div>
          <div className="card-body">
            {/* <Table responsive className="w-100"> */}
              <div id="example_wrapper" className="dataTables_wrapper">
                <table
                  id="example"
                  className="display w-100 dataTable table"
                  role="grid"
                  aria-describedby="example_info"
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Application Date</th>
                      <th>Deadline</th>
                      <th>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((d, i) => (
                      <tr key={i}>
                        <td>{++i}</td>
                        <td>{d.jobTitle}</td>
                        <td>{
                    format(new Date(d.applicationDate), "MM/dd/yyyy")
                       }</td>
                        <td>{d.deadline}</td>
                        <td>
                         <button disabled className={d.viewed!==true?"btn btn-secondary":"btn btn-success"}>
                             <span className="action-btn">
                             {d.viewed!==true?"Pending":"Viewed"}
                             </span>
                         </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr role="row">
                      <th>ID</th>
                      <th>Title</th>
                      <th>Application Date</th>
                      <th>Deadline</th>
                      <th>Progress</th>
                    </tr>
                  </tfoot>
                </table>
              </div>
            {/* </Table> */}
          </div>
        </div>
      </div>
    )
}
export default withRouter(AppliedJob);