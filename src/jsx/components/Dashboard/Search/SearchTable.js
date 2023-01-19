import React, { useState, useEffect, Fragment } from "react";
import { Container, Row, Table } from "react-bootstrap";

import axios from "axios";
import { withRouter } from "react-router-dom";

const SearchTable = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };
    fetch(`${process.env.REACT_APP_API_S_LINK}/home/posted-jobs/`, config)
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setData(result);
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

  const getTheJob = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };
    return axios(`${process.env.REACT_APP_API_S_LINK}/home/jobdata/${id}`,config);
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
    <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Job table</h4>
          </div>
          <div className="card-body">
            {/* <Table responsive className="w-100"> */}
            <div id="example_wrapper" className="dataTables_wrapper table">
              <table
                id="example"
                className="display w-100 dataTable"
                //role="grid"
                aria-describedby="example_info"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Deadline</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, i) => (
                    <tr key={i}>
                      {/* {d.map((da, i) => ( */}
                      <td>{++i}</td>
                      {/* ))} */}
                      <td>{d.jobtitle}</td>
                      <td>{d.closingdate}</td>
                      <td>
                        <button
                          onClick={() => {
                            viewJob(d.no);
                          }}
                          className="btn btn-secondary"
                        >
                          view
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr role="row">
                    <th>ID</th>
                    <th>Title</th>
                    <th>Deadline</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </table>
            </div>
            {/* </Table> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SearchTable);
