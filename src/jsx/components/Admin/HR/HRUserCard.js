import axios from "axios";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";

const HRUserCard = (props) => {
  const [loading, setLoading] = useState(true);
  const [userRoles, setUserRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [basicData, setBasicData] = useState({});

  //props.location.state[0].datum[0].
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    axios
      .get(`${process.env.REACT_APP_API_S_LINK}/home/getuserroles`, config)
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          setLoading(false);
          setUserRoles(response.data.userRoles);
        //   let objElem = response.data.userRoles.find(
        //     (x) => x.value === props.location.state[0].datum[0].rank
        //   );
        //   setSelectedRole(objElem);
        // console.log(objElem);
          setBasicData(props.location.state[0].datum[0]);
        }
        if (response.status === 404) {
          // swal("Oh!", response.data.message, "error");
          console.log(response.data.message);
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
  }, []);

  const updateBio = () =>{
    const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userDetails")).idToken
          }`,
        },
      };
  
     
    swal({
        title: "Are you sure?",
        text: "Are you sure that you want to Update Profile",
        icon: "warning",
        dangerMode: true,
      })
        .then((willCreate) => {
          if (willCreate) {
            return axios.get(
              `${process.env.REACT_APP_API_S_LINK}/home/updaterole/${basicData.employeeId}/${selectedRole.value}`,
            //   data,
              config
            );
          }
        })
  
        .then(function (response) {
          if (response.status === 200) {
            console.log(response.data);
            swal("Success!", "Profile Udated", "success");
          }
          if (response.status === 404) {
            alert(response.data.message);
          }
        })
        .catch((err) => {
          if(err.response!==undefined){
            swal("Oh!", err.response.data.message, "error");
          }else{
            swal("Oh!", err.message, "error");
          }
          console.log({ err: err });
        });
  }

  const deleteBio = () =>{
    const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userDetails")).idToken
          }`,
        },
      };
  
     
    swal({
        title: "Are you sure?",
        text: "Are you sure that you want to Delete the Profile",
        icon: "warning",
        dangerMode: true,
      })
        .then((willCreate) => {
          if (willCreate) {
            return axios.get(
              `${process.env.REACT_APP_API_S_LINK}/authenticate/deleteuser/${props.location.state[0].datum[0].id}/`,
            //   data,
              config
            );
          }
        })
  
        .then(function (response) {
          if (response.status === 200) {
            swal("Success!", "Profile Deleted", "success");
          }
          if (response.status === 404) {
            alert(response.data.message);
          }
        })
        .catch((err) => {
          if(err.response!==undefined){
            swal("Oh!", err.response.data.message, "error");
          }else{
            swal("Oh!", err.message, "error");
          }
          console.log({ err: err });
        });
  }

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
          <div className="row">
            <div className="col-md-3">
              <div className="form-group mx-1">
                <label htmlFor="Name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={basicData.name}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group mx-1">
                <label htmlFor="Name">email</label>
                <input
                  type="text"
                  className="form-control"
                  value={basicData.email}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group mx-1">
                <label htmlFor="Name">Employee ID</label>
                <input
                  type="text"
                  className="form-control"
                  value={basicData.employeeId}
                  disabled
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group mx-1">
                <label htmlFor="Name">Employee Rank</label>
                <input
                  type="text"
                  className="form-control"
                  value={basicData.rank}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card rounded-0">
          <div className="row">
            <div className="col-md-4">
              <div className="form-group1 mx-1 my-2">
                <label htmlFor="Name">Rank</label>
                <Select
                  defaultValue={selectedRole}
                  onChange={setSelectedRole}
                  options={userRoles}
                />
              </div>
            </div>
          
          </div>
        </div>

        <div className="card rounded-0">
          <div className="row">
            <div className="col-md-12 mx-1 d-flex">
                <button className="btn btn-info " onClick={updateBio}>
                
                <i className="fa fa-cloud-upload mr-2"></i>
                    Update 
                </button>
                <button className="btn btn-danger ml-auto" onClick={deleteBio}>
                  <i className="fa fa-user-times mr-2"></i>
                    Delete this Record 
                </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default withRouter(HRUserCard);
