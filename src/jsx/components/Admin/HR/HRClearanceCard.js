import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";
import DatePicker from "react-datepicker";
import  secureLocalStorage  from  "react-secure-storage"; import { decryptToken} from "./../../../../AppUtility"; import jwt_decode from "jwt-decode";

const HRClearanceCard = (props) => {
  const [loading, setLoading] = useState(true);
  const [employeeList, setEmployeeList] = useState([]);
  const [roleList, setRoleList] = useState([]);

  const [selectedEmp, setSelectedEmp] = useState("");
  const [lastEmpDate, setLastEmpDate] = useState(new Date());
  const [selectRole, setSelectedRole] = useState("");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/home/hrcreateclearance`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data);
          setLoading(false);
          setEmployeeList(response.data.employeeListModels);
          setRoleList(response.data.userRoles)
         
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

  const uploadCard = () => {
   
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    let data = {
        EmpID: selectedEmp.value,
        LastEmployeeDate: lastEmpDate,
        SelectedRole: selectRole.value,
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to create Clearance",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/home/hrstoreclearance`,
            data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data);
          swal("Success!", "Clearance Created", "success");
        }
        if (response.status === 404) {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        
        console.log({ err: err });
        if(err.response!==undefined){
          swal("Oh!", err.response.data.message, "error");
        }else{
          swal("Oh!", err.message, "error");
        }
        
      });
  };

  if (loading) {
    return (
      <>
        <div className="container">
          <div className="headerDiv2 text-center"></div>
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
        <div className="card rounded-0">
          <div className="card-header">Employee Clearance Creation Card</div>
          <div className="card-body">
            <div className="row">
              <div className="col-xl-4 col-sm-6">
                <div className="form-control1">
                  <label htmlFor="">Employee</label>
                  <Select
                    defaultValue={selectedEmp}
                    onChange={setSelectedEmp}
                    options={employeeList}
                    // className="form-control"
                  />
                </div>
              </div>
              <div className="col-xl-4 col-sm-6">
                <div className="form-control1">
                  <label htmlFor="">Last Employment Date</label>

                  <DatePicker
                    selected={lastEmpDate}
                    onChange={(date) => setLastEmpDate(date)}
                  />
                </div>
              </div>
              <div className="col-xl-4 col-sm-6">
                <label htmlFor="">Dept Head</label>
                <Select
                  defaultValue={selectRole}
                  onChange={setSelectedRole}
                  options={roleList}
                 
                />
              </div>

           

            </div>
          </div>
          <div className="card-footer">
              <div className="text-right">
                  <button className="btn btn-success" onClick={uploadCard}>
                      Post Clearance <i className="fa fa-arrow-up"></i>
                  </button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(HRClearanceCard);
