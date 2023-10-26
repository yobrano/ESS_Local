import axios from "axios";
import React, { useState, useRef, useEffect, useMemo, forwardRef } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";
import  secureLocalStorage  from  "react-secure-storage"; import { decryptToken} from "./../../../../AppUtility"; import jwt_decode from "jwt-decode";

const Performancemonitoring = (props) => {
  const [loading, setLoading] = useState(true);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedManager, setSelectedManager] = useState({label:'',value:''});
  const [selectedStaff, setSelectedStaff] = useState({label:'',value:''});
  const [selectedAttendee, setSelectedAttendee] = useState({label:'',value:''});

  useEffect(() => {
    //get existing Jobs
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/staffrequision/getperformancesourcedata`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data);
          setEmployeeList(response.data.employeeListModels);
          // populateReqList();
          setLoading(false);
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          // =>console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log({ err: err });
        swal("Oh!", err.data.message, "error");
      });
  }, []);

  //Create Action
  const createMonitoring = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    const data = {
      Manager:selectedManager.value,
      Staff:selectedStaff.value,
      Attendee:selectedAttendee.value,
    }

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Create",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/staffrequision/createmonitoring`,
            data,
            config
          );
        }
      })
      .then((json) => {
        // =>console.log(json.data);
        // list1.splice(index, 1);
        // setQualificationList(list1);
        swal("Success!", "Your record has been Created!", "success");
      })
      .catch((err) => {
        console.log(err);
        swal("Oops!", "Seems like we couldn't create the record", "error");
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
      <div className="row">
        <div className="col-md-12">
          <div className="card rounded-0">
            <div className="card-header">
              <h5>Create a New Performance Monitoring</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">Manager</label>
                    <Select
                      defaultValue={selectedManager}
                      onChange={setSelectedManager}
                      options={employeeList}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <label htmlFor="">Staff</label>
                  <Select
                    defaultValue={selectedStaff}
                    onChange={setSelectedStaff}
                    options={employeeList}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="">Attendee/Witness</label>
                  <Select
                    defaultValue={selectedAttendee}
                    onChange={setSelectedAttendee}
                    options={employeeList}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4"></div>
                <div className="col-md-4 d-flex justify-content-end">
                  <button
                    className="btn btn-info rounded-1"
                    onClick={createMonitoring}
                  >
                    {" "}
                    Create{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default withRouter(Performancemonitoring);
