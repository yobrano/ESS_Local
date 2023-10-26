import { withRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//** Import Profile Img */
import { Accordion, Form, Modal } from "react-bootstrap";
// import "./profile.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import axios from "axios";
import swal from "sweetalert";
import  secureLocalStorage  from  "react-secure-storage"; import { decryptToken} from "./../../../../AppUtility"; import jwt_decode from "jwt-decode";

const StaffProfile = () => {
  const [cvfile, setCvfile] = useState("");
  const [skilllist, setSkilllist] = useState([{ id: "", title: "" }]);
  const [startDate, setStartDate] = useState("");
  const [cvModel, setCvModel] = useState(false);
  const [activeToggle, setActiveToggle] = useState("gen");
  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("");
  const [marital, setMarital] = useState("");
  const [religion, setReligion] = useState("");

  const [age, setAge] = useState("");

  const [disabled, setDisabled] = useState("No");

  const [profilesaving, setProfilesaving] = useState(false);

  const [experienceYears, setExperienceYears] = useState("");
  const [currentSalary, setCurrentSalary] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [highestAcademicLevel, setHighestAcademicLevel] = useState("");
  const [willingToRelocate, setWillingToRelocate] = useState("No");

  let errorsObj = {
    surName: "",
    firstName: "",
    gender: "",
    disabled: "",
    highestAcademicLevel: "",
    willingToRelocate: "",
    startDate: "",
    age: "",
  };
  const [errors, setErrors] = useState(errorsObj);

  useEffect(() => {
    //get profile
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/profile/getstaffprofile`,
        config
      )
      .then((result) => {
        // // =>console.log(result.data);
        if(result.data.userName!== null){
          setUserName(result.data.userName)
        }
        if(result.data.profiletableModel !== null){
          // setFirstName()
          setFirstName(result.data.profiletableModel.firstName)
          setLastName(result.data.profiletableModel.lastName)
          setSurName(result.data.profiletableModel.surName)
          setGender(result.data.profiletableModel.gender)
          setDisabled(result.data.profiletableModel.personWithDisability)
          setMarital(result.data.profiletableModel.maritalStatus)
          setReligion(result.data.profiletableModel.religion)
          setExperienceYears(result.data.profiletableModel.experience)
          setHighestAcademicLevel(result.data.profiletableModel.highestEducation)
          setStartDate(new Date(result.data.profiletableModel.dob))
          setAge(result.data.profiletableModel.age)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Update Profile
  const UpdateProfile = ()=>{
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    const bodyParameters = {
      FirstName: firstName,
      SurName: surName,
      LastName: lastName,
      Gender: gender,
      PersonWithDisability: disabled,
      DOB: startDate,
      Age: age.toString(),
      MaritalStatus: marital,
      Religion: religion,
      Experience: experienceYears,
      CurrentSalary: currentSalary,
      ExpectedSalary: expectedSalary,
      HighestEducation: highestAcademicLevel,
      WillingtoRelocate: willingToRelocate,
      Username:"",
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Update Profile",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          setProfilesaving(true);
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/profile/setstaffprofile`,
            bodyParameters,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          setProfilesaving(false);
          swal("Success!", "Profile Updated.", "success");
        }
        if (response.status === 404) {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response !== undefined) {
          // swal("Oh!", err.response.data.message, "error");
          if (err.response.data.message) {
            swal("Oh!", err.response.data.message, "error");
          } else {
            swal("Oh!", err.message, "error");
          }
        } else if (err.message) {
          swal("Oh!", err.message, "error");
        } else {
          swal("Oh!", "Update Profile Failed", "error");
        }
      });


  }

  //
  const computeAge =()=>{
    let age = new Date().getFullYear()-new Date(startDate).getFullYear();
    setAge(age);
  }
  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-xxl-9 col-lg-12">
          <div className="row">
            <div className="col-xl-12">
              <div className="card profile-card">
                <div className="card-body">
                  {/* <form> */}
                    {/* General */}
                    <Accordion defaultActiveKey={["0"]} alwaysOpen>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <div className="title mb-4">
                            <span className="fs-18 text-black font-w600">
                              Generals
                            </span>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className="row">
                            <div className="col-xl-4 col-sm-6">
                              <div className="form-group">
                                <label>First Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="First name"
                                  name="firstname"
                                  value={firstName}
                                  onChange={(e) => setFirstName(e.target.value)}
                                  
                                />
                              </div>
                            </div>
                            <div className="col-xl-4 col-sm-6">
                              <div className="form-group">
                                <label>Surname</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Surname"
                                  value={surName}
                                  onChange={(e) => setSurName(e.target.value)}
                                />
                                {errors.surName && (
                                  <div className="text-danger fs-12">
                                    {errors.surName}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-xl-4 col-sm-6">
                              <div className="form-group">
                                <label>Last Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Last name"
                                  value={lastName}
                                  onChange={(e) => setLastName(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-xl-4 col-sm-6">
                              <div className="form-group">
                                <label>User Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="User name"
                                  value={userName}
                                  onChange={(e) => setUserName(e.target.value)}
                                  disabled={true}
                                />
                              </div>
                            </div>
                            <div className="col-xl-4 col-sm-6">
                              <div className="form-group">
                                <label>Gender</label>

                                <Form.Select
                                  aria-label="gender select "
                                  value={gender}
                                  onChange={(e) => setGender(e.target.value)}
                                >
                                  <option value=""></option>
                                  <option value="M">Male</option>
                                  <option value="F">Female</option>
                                </Form.Select>
                                {errors.gender && (
                                  <div className="text-danger fs-12">
                                    {errors.gender}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-xl-4 col-sm-6">
                              <div className="form-group">
                                <label>Person with Disability</label>

                                <Form.Select
                                  aria-label="disabled select"
                                  value={disabled}
                                  onChange={(e) => setDisabled(e.target.value)}
                                >
                                  <option value=""></option>
                                  <option
                                    value="No"
                                    // {...(disabled === "No" ? "selected" : "")}
                                  >
                                    No
                                  </option>
                                  <option
                                    value="Yes"
                                    // {...(disabled === "Yes" ? "selected" : "")}
                                  >
                                    Yes
                                  </option>
                                </Form.Select>

                                {errors.disabled && (
                                  <div className="text-danger fs-12">
                                    {errors.disabled}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-xl-4 col-sm-6">
                              <div className="form-group">
                                <label>Marital status</label>

                                <Form.Select
                                  aria-label="marital select "
                                  value={marital}
                                  onChange={(e) => setMarital(e.target.value)}
                                >
                                  <option value=" "></option>
                                  <option value="Single">Single</option>
                                  <option value="Married">Married</option>
                                </Form.Select>
                              </div>
                            </div>
                            <div className="col-xl-4 col-sm-6">
                              <div className="form-group">
                                <label>Religion</label>
                            
                                <Form.Select
                                  aria-label="religion select "
                                  value={religion}
                                  onChange={(e) => setReligion(e.target.value)}
                                >
                                  <option value=""></option>
                                  <option value="Christianity">
                                    Christianity
                                  </option>
                                  <option value="Islam">Islam</option>
                                  <option value="Hindu">Hindu</option>
                                  {/* <option value="Other">Other</option> */}
                                </Form.Select>
                              </div>
                            </div>
                            <div className="col-xl-4 col-sm-6">
                              <div className="form-group">
                                <label>Professional Experience</label>

                                <select
                                  aria-label="experience select "
                                  value={experienceYears}
                                  onChange={(e) =>
                                    setExperienceYears(e.target.value)
                                  }
                                  required
                                  className="form-select"
                                >
                                  <option value="1">Choose</option>
                                  <option value="less 1">Less Than 1 Year</option>
                                  <option value="1">1 Year</option>
                                  <option value="2">2 Years</option>
                                  <option value="3">3 Years</option>
                                  <option value="4">4 Years</option>
                                  <option value="5">5 Years</option>
                                  <option value="6">6 Years</option>
                                  <option value="7">7 Years</option>
                                  <option value="8">8 Years</option>
                                  <option value="9">9 Years</option>
                                  <option value="10">10 Years</option>
                                  <option value="11">11 Years</option>
                                  <option value="above 11">
                                    Above 11Years
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="col-xl-4 col-sm-6">
                              <div className="form-group">
                                <label>Highest Academic level</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder=""
                                  name="highestAcademicLevel"
                                  value={highestAcademicLevel}
                                  onChange={(e) =>
                                    setHighestAcademicLevel(e.target.value)
                                  }
                                />
                                {errors.highestAcademicLevel && (
                                  <div className="text-danger fs-12">
                                    {errors.highestAcademicLevel}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-xl-4 col-sm-6">
                              <div className="form-group">
                                <label>DOB</label>
                                <DatePicker
                                  selected={startDate}
                                  onChange={(date) => {setStartDate(date); setAge(new Date().getFullYear()-new Date(date).getFullYear())}}
                                  
                                />
                                {errors.startDate && (
                                  <div className="text-danger fs-12">
                                    {errors.startDate}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-xl-4 col-sm-6">
                              <div className="form-group">
                                <label>Age</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Type here"
                                  value={age}
                                  onChange={(e) => {setAge(e.target.value)}}
                                  // onFocus={computeAge}
                                  readOnly={true}
                                  // value={new Date().getFullYear()-new Date(startDate).getFullYear()}
                                />
                                {errors.age && (
                                  <div className="text-danger fs-12">
                                    {errors.age}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-xl-6 col-md-12">
                              <div className="form-group">
                                <button className="btn btn-warning" onClick={()=>UpdateProfile()}>
                                  Update <i className="	fa fa-superpowers"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  {/* </form> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(StaffProfile);
