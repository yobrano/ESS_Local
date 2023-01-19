import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//** Import Profile Img */
import { Accordion, Form, Modal } from "react-bootstrap";
import "./profile.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import axios from "axios";
import swal from "sweetalert";

function Profile() {
  const [cvfile, setCvfile] = useState("");
  const [skilllist, setSkilllist] = useState([{ id: "", title: "" }]);
  const [startDate, setStartDate] = useState(new Date());
  const [cvModel, setCvModel] = useState(false);
  const [activeToggle, setActiveToggle] = useState("gen");
  const [firstName, setFirstName] = useState("");
  const [surName, setSurName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [marital, setMarital] = useState("");
  const [religion, setReligion] = useState("");
  // const [password, setPassword] = useState("");
  // const [repassword, setRepassword] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [email, setEmail] = useState("");
  const [postaladdress, setPostaladdress] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [residential, setResidential] = useState("");
  const [city, setCity] = useState(""); //tble req
  const [country, setCountry] = useState("KE"); //tble req
  const [county, setCounty] = useState(""); //tble req
  const [subcounty, setSubcounty] = useState(""); //tble req
  const [age, setAge] = useState("");
  const [birthcert, setBirthcert] = useState("");
  const [nationalid, setNationalid] = useState("");
  const [huduma, setHuduma] = useState("");
  const [passport, setPassport] = useState("");
  const [pinno, setPinno] = useState("");
  const [nssf, setNssf] = useState("");
  const [nhif, setNhif] = useState("");
  const [driverno, setDriverno] = useState("");
  // const [bankcode, setBankcode] = useState("");
  // const [bbranchcode,setBbranchcode] = useState("")
  const [disabled, setDisabled] = useState("No");

  const [profilesaving, setProfilesaving] = useState(false);
  // const [skillsaving, setSkillsaving] = useState(false);

  const [experienceYears, setExperienceYears] = useState("");
  const [CVPath, setCVPath] = useState("");

  const [bankList, setBankList] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [bankbranchList, setBankbranchList] = useState([]);
  const [selectedBankBranch, setSelectedBankBranch] = useState("");

  const [currentSalary, setCurrentSalary] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [highestAcademicLevel, setHighestAcademicLevel] = useState("");
  const [willingToRelocate, setWillingToRelocate] = useState("No");

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...skilllist];
    list[index][name] = value;
    list[index].id = index;
    setSkilllist(list);
  };
  // handle cick event of the remove button
  const handleRemoveClick = (index) => {
    const list = [...skilllist];
    list.splice(index, 1);
    setSkilllist(list);
  };

  //handle cick event of the Add button
  const handleAddClick = () => {
    setSkilllist([...skilllist, { title: "" }]);
  };

  const changeCV = (e) => {
    setCvfile(e.target.files[0]);
  };

  const uploadCV = (e) => {
    e.preventDefault();

    if (cvfile !== "") {
      if (cvfile.size / 1024 > 6024) {
        alert("Size above 6MB");
        return;
      }
      if (cvfile.type !== "application/pdf") {
        alert("File not pdf.");
        return;
      }

      const formData = new FormData();
      formData.append(`formFile`, cvfile);
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userDetails")).idToken
          }`,
        },
      };

      axios
        .post(
          `${process.env.REACT_APP_API_S_LINK}/home/uploadcv`,
          formData,
          config
        )
        .then(function (response) {
          if (response.status === 200) {
            alert(response.data.message);
            //console.log(response.data);
          }
          if (response.status === 404) {
            alert(response.data.message);
          }
        })
        .catch((err) => {
          console.log({ err: err });
        });
    }
  };
  // Fetch from the DB the profile data onload
  // Populate the State;
  // Populate the form

  // Onchange state and submit modify the record

  //Get all the record belong the user from hte DB
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    axios
      .get(`${process.env.REACT_APP_API_S_LINK}/profile/profile`, config)
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          // setSkilllist
          // let DOB = format(response.data.profileModel.dob,'dd/mm/yyyy')
          // setStartDate(DOB)
          // setCvModel
          // setActiveToggle
          
          setFirstName(response.data.profileModel.firstName);
          setSurName(response.data.profileModel.surName);
          setLastName(response.data.profileModel.lastName);
          setGender(response.data.profileModel.gender);
          setMarital(response.data.profileModel.maritalStatus);
          setReligion(response.data.profileModel.religion);
          // setPassword(response.data.profileModel.religion)
          // setRepassword(response.data.profileModel.religion)
          setPhoneno(response.data.profileModel.mobilePhoneNo);
          setExperienceYears(response.data.profileModel.experience); // experience
          setPostaladdress(response.data.profileModel.postalAddress);
          setPostalcode(response.data.profileModel.postCode);
          setResidential(response.data.profileModel.residentialAddress);
          setCity(response.data.profileModel.city);
          setCountry(response.data.profileModel.country);
          setCounty(response.data.profileModel.county);
          setSubcounty(response.data.profileModel.subCounty);
          setAge(response.data.profileModel.age);
          setBirthcert(response.data.profileModel.birthCertificateNo);
          setNationalid(response.data.profileModel.nationalIDNo);
          setHuduma(response.data.profileModel.hudumaNo);
          setPassport(response.data.profileModel.passPortNo);
          setPinno(response.data.profileModel.pinNo);
          setNssf(response.data.profileModel.nssfNo);
          setNhif(response.data.profileModel.nhifNo);
          setDriverno(response.data.profileModel.driverLincenceNo);
          //selected from code
          // let list = [...bankList]
          // let keyvbank= list.find(e=>e.value === response.data.profileModel.bankCode);
          // //console.log(keyvbank);
          // setSelectedBank(keyvbank);
          // setBankcode(response.data.profileModel.bankCode)
          // let list2 = [...bankbranchList]
          // let keyvbrnch=list2['value']=response.data.profileModel.bankBranchCode
          // console.log(keyvbrnch);
          // setSelectedBankBranch(keyvbrnch)
          //setBbranchcode(response.data.profileModel.bankBranchCode)
          setDisabled(response.data.profileModel.personWithDisability);
          
          setCurrentSalary(response.data.profileModel.currentSalary);
          setExpectedSalary(response.data.profileModel.expectedSalary);
          setHighestAcademicLevel(response.data.profileModel.highestEducation);
          setWillingToRelocate(response.data.profileModel.willingtoRelocate);
          
          setBankList(response.data.bankModels);
          setCVPath(response.data.userCV.filePath);
          setStartDate(new Date(response.data.profileModel.dob))
          // console.log(response.data);
        }
        if (response.status === 404) {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        console.log({ err: err });
      });

    axios
      .get(`${process.env.REACT_APP_API_S_LINK}/profile/getskills`, config)
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);

          if (response.data.length === 0) {
            setSkilllist([{ id: "", title: "" }]);
          } else {
            setSkilllist(response.data);
          }

          // console.log(response.data);
        }
        if (response.status === 404) {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        console.log({ err: err });
      });
  }, []);

  //Get bbranch
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/profile/getbranch/${selectedBank.value}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          setBankbranchList(response.data.bankBranches);
        }
      })
      .catch((err) => {
        console.log({ err: err });
      });
  }, [selectedBank]);

  const changeProfile = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
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
      Age: age,
      PostalAddress: postaladdress,
      PostCode: postalcode,
      City: city,
      Country: country,
      County: county,
      SubCounty: subcounty,
      ResidentialAddress: residential,
      MobilePhoneNo: phoneno,
      MobilePhoneNoAlt: "",
      BirthCertificateNo: birthcert,
      NationalIDNo: nationalid,
      HudumaNo: huduma,
      PassPortNo: passport,
      PinNo: pinno,
      NHIFNo: nhif,
      NSSFNo: nssf,
      DriverLincenceNo: driverno,
      MaritalStatus: marital,
      Citizenship: "",
      Ethnicgroup: "",
      Religion: religion,
      BankCode: selectedBank.value,
      BankName: "",
      BankBranchCode: selectedBankBranch.value,
      BankBranchName: "",

      Experience: experienceYears,
      CurrentSalary: currentSalary,
      ExpectedSalary: expectedSalary,
      HighestEducation: highestAcademicLevel,
      WillingtoRelocate: willingToRelocate,
    };
    setProfilesaving(true);
    axios
      .post(
        `${process.env.REACT_APP_API_S_LINK}/profile/setprofile`,
        bodyParameters,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          alert(response.data.message);
          setProfilesaving(false);
        }
      })
      .catch((err) => {
        console.log({ err: err });
      });
  };
  const changeSkill = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    const bodyParameters = {
      Skills: skilllist,
    };
    setProfilesaving(true);
    axios
      .post(
        `${process.env.REACT_APP_API_S_LINK}/profile/setskills`,
        // bodyParameters,
        skilllist,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          alert(response.data.message);
          setProfilesaving(false);
        }
      })
      .catch((err) => {
        console.log({ err: err });
      });
  };

  const viewCV = () => {
    const config = {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    axios
      .get(`${process.env.REACT_APP_API_S_LINK}/home/viewcv`, config)

      .then(function (response) {
        // const url = window.URL.createObjectURL(new Blob([response.data]));
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', 'file.pdf'); //or any other extension
        // document.body.appendChild(link);
        // link.click();

        if (response.status === 200) {
          const file = new Blob([response.data], { type: "application/pdf" });
          //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
          //Open the URL on new Window
          const pdfWindow = window.open();
          pdfWindow.location.href = fileURL;

          // console.log(response.data);
          // window.open(response.data, '_blank', 'fullscreen=yes');
          // FileDownload(response.data, 'current_cv.pdf');
        }
       
      })
      .catch((err) => {
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        console.log(err);
      
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-xl-12 col-xxl-9 col-lg-12">
          <div className="row">
            <div className="col-xl-12">
              <div className="custom-tab-1">
                <ul className="nav nav-tabs">
                  <li
                    className="nav-item"
                    onClick={() => setActiveToggle("gen")}
                    key={`s-${1}`}
                  >
                    <Link
                      to="#my-posts"
                      data-toggle="tab"
                      className={`nav-link ${
                        activeToggle === "gen" ? "active show" : ""
                      }`}
                    >
                      General Information
                    </Link>
                  </li>
                  <li
                    className="nav-item"
                    onClick={() => setActiveToggle("skill")}
                    key={`s-${2}`}
                  >
                    <Link
                      to="#about-me"
                      data-toggle="tab"
                      className={`nav-link ${
                        activeToggle === "skill" ? "active show" : ""
                      }`}
                    >
                      Skills
                    </Link>
                  </li>
                </ul>
                <div className="tab-content">
                  <div
                    id="my-posts"
                    className={`tab-pane fade ${
                      activeToggle === "gen" ? "active show" : ""
                    }`}
                  >
                    <div className="card profile-card">
                      <div className="card-header flex-wrap border-0 pb-0">
                        <h3 className="fs-24 text-black font-w600 mr-auto mb-2 pr-3">
                          Create and Edit Profile
                        </h3>
                        <div className="d-flex mr-5 align-items-center mb-2"></div>
                        <Link
                          className="btn btn-primary btn-rounded mb-2"
                          to="#"
                          onClick={changeProfile}
                        >
                          {profilesaving === false
                            ? "Save Profile Changes"
                            : "Saving..."}
                        </Link>
                      </div>
                      <div className="card-body">
                        <form>
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
                                        onChange={(e) =>
                                          setFirstName(e.target.value)
                                        }
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
                                        onChange={(e) =>
                                          setSurName(e.target.value)
                                        }
                                      />
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
                                        onChange={(e) =>
                                          setLastName(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Gender</label>

                                      <Form.Select
                                        aria-label="gender select "
                                        value={gender}
                                        onChange={(e) =>
                                          setGender(e.target.value)
                                        }
                                      >
                                        {/* <option>Open this select menu</option> */}
                                        <option value=""></option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                      </Form.Select>
                                    </div>
                                  </div>
                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Person with Disability</label>

                                      <Form.Select
                                        aria-label="disabled select "
                                        value={disabled}
                                        onChange={(e) =>
                                          setDisabled(e.target.value)
                                        }
                                      >
                                         <option value=""></option>
                                        <option
                                          value="No"
                                          {...(disabled === "No"
                                            ? "selected"
                                            : "")}
                                        >
                                          No
                                        </option>
                                        <option
                                          value="Yes"
                                          {...(disabled === "Yes"
                                            ? "selected"
                                            : "")}
                                        >
                                          Yes
                                        </option>
                                      </Form.Select>
                                    </div>
                                  </div>
                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Marital status</label>

                                      <Form.Select
                                        aria-label="marital select "
                                        value={marital}
                                        onChange={(e) =>
                                          setMarital(e.target.value)
                                        }
                                      >
                                        <option value=" "></option>
                                        <option value="Single">Single</option>
                                        <option value="Married">Married</option>
                                        <option value="Divorced">Divorced</option>
                                      </Form.Select>
                                    </div>
                                  </div>
                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Religion</label>
                                      {/* <select id="">
                                                    <option></option>
                                                </select> */}
                                      <Form.Select
                                        aria-label="religion select "
                                        value={religion}
                                        onChange={(e) =>
                                          setReligion(e.target.value)
                                        }
                                      >
                                        <option value=""></option>
                                        <option value="Christianity">
                                          Christianity
                                        </option>
                                        <option value="Islam">Islam</option>
                                        <option value="Hindu">Hindu</option>
                                        {/* <option value="4">Others</option> */}
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
                                        <option value="less 1">
                                          Less Than 1 Year
                                        </option>
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
                                      <label>Current Salary (Monthly)</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        name="currentSalary"
                                        value={currentSalary}
                                        onChange={(e) =>
                                          setCurrentSalary(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Expected Salary (Monthly)</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder=""
                                        name="expectedSalary"
                                        value={expectedSalary}
                                        onChange={(e) =>
                                          setExpectedSalary(e.target.value)
                                        }
                                      />
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
                                          setHighestAcademicLevel(
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Willing to Relocate</label>

                                      <Form.Select
                                        aria-label="willingtorelocote select "
                                        value={willingToRelocate}
                                        onChange={(e) =>
                                          setWillingToRelocate(e.target.value)
                                        }
                                      >
                                        <option value="">Choose</option>
                                        <option value="No">No</option>
                                        <option value="Yes">Yes</option>
                                      </Form.Select>
                                    </div>
                                  </div>
                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>DOB</label>
                                      <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                      />
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
                                        onChange={(e) => setAge(e.target.value)}
                                        // value={new Date().getFullYear()-new Date(startDate).getFullYear()}
                                      />
                                    </div>
                                  </div>
                                  
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                              <Accordion.Header>
                                <div className="title mb-4">
                                  <span className="fs-18 text-black font-w600">
                                    Contacts &amp; Dates
                                  </span>
                                </div>
                              </Accordion.Header>
                              <Accordion.Body>
                                <div className="row">
                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Phone</label>
                                      <div className="input-group input-icon mb-3">
                                        <div className="input-group-prepend">
                                          <span
                                            className="input-group-text"
                                            id="basic-addon1"
                                          >
                                            <i
                                              className="fa fa-phone"
                                              aria-hidden="true"
                                            ></i>
                                          </span>
                                        </div>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Phone no."
                                          value={phoneno}
                                          onChange={(e) =>
                                            setPhoneno(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-xl-4 col-sm-6 d-none">
                                    <div className="form-group">
                                      <label>Email</label>
                                      <div className="input-group input-icon mb-3">
                                        <div className="input-group-prepend">
                                          <span
                                            className="input-group-text"
                                            id="basic-addon3"
                                          >
                                            <i className="las la-envelope"></i>
                                          </span>
                                        </div>
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter email"
                                          value={email}
                                          onChange={(e) =>
                                            setEmail(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Postal Address</label>
                                      <div className="input-group">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter adress"
                                          value={postaladdress}
                                          onChange={(e) =>
                                            setPostaladdress(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Postal Code</label>
                                      <div className="input-group">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Enter code"
                                          value={postalcode}
                                          onChange={(e) =>
                                            setPostalcode(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Residential Address</label>
                                      <div className="input-group">
                                        <input
                                          type="text"
                                          className="form-control"
                                          placeholder="Residential"
                                          value={residential}
                                          onChange={(e) =>
                                            setResidential(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>City</label>
                                      <select
                                        className="form-control"
                                        value={city}
                                        onChange={(e) =>
                                          setCity(e.target.value)
                                        }
                                      >
                                        <option value="Nairobi">Nairobi</option>
                                        <option value="Thika">Thika</option>
                                        <option value="Kisume">Kisumu</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Country</label>
                                      <select
                                        className="form-control"
                                        value={country}
                                        onChange={(e) =>
                                          setCountry(e.target.value)
                                        }
                                      >
                                        <option value="">Select</option>
                                        <option value="KE">Kenya</option>
                                        <option value="UG">Uganda</option>
                                        <option value="TZ">Tanzania</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>County</label>
                                      <select
                                        className="form-control"
                                        value={county}
                                        onChange={(e) =>
                                          setCounty(e.target.value)
                                        }
                                      >
                                        <option value="">Select</option>
                                        <option value="Mombasa">Mombasa</option>
                                        <option value="Nairobi">Nairobi</option>
                                        <option value="Narok">Narok</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Sub-county</label>
                                      <select
                                        className="form-control"
                                        value={subcounty}
                                        onChange={(e) =>
                                          setSubcounty(e.target.value)
                                        }
                                      >
                                        <option value="">Select</option>
                                        <option value="Kasarani">
                                          Kasarani
                                        </option>
                                        <option value="Embakasi">
                                          Embakasi
                                        </option>
                                        <option value="Dagoretti">
                                          Dagoretti
                                        </option>
                                      </select>
                                    </div>
                                  </div>
                    
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                              <Accordion.Header>
                                <div className="title mb-4">
                                  <span className="fs-18 text-black font-w600">
                                    Important Numbers
                                  </span>
                                </div>
                              </Accordion.Header>
                              <Accordion.Body>
                                <div className="row">
                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Birth Certificate No</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter No"
                                        value={birthcert}
                                        onChange={(e) =>
                                          setBirthcert(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Nation ID No</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter No"
                                        value={nationalid}
                                        onChange={(e) =>
                                          setNationalid(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Huduma No</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter No"
                                        value={huduma}
                                        onChange={(e) =>
                                          setHuduma(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Passport No</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter No"
                                        value={passport}
                                        onChange={(e) =>
                                          setPassport(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Pin No</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter No"
                                        value={pinno}
                                        onChange={(e) =>
                                          setPinno(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>NSSF No</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter No"
                                        value={nssf}
                                        onChange={(e) =>
                                          setNssf(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>NHIF No</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter No"
                                        value={nhif}
                                        onChange={(e) =>
                                          setNhif(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Driver Lincence No</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter No"
                                        value={driverno}
                                        onChange={(e) =>
                                          setDriverno(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Bank Name</label>

                                      <Select
                                        defaultValue={selectedBank}
                                        onChange={setSelectedBank}
                                        options={bankList}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Branch Name</label>
                                      <Select
                                        defaultValue={selectedBankBranch}
                                        onChange={setSelectedBankBranch}
                                        options={bankbranchList}
                                      />
                                    </div>
                                  </div>
                            
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div
                    id="about-me"
                    className={`tab-pane fade ${
                      activeToggle === "skill" ? "active show" : ""
                    }`}
                  >
                    <div className="card skill">
                      <div className="card-header flex-wrap border-0 pb-0">
                        <h3 className="fs-24 text-black font-w600 mr-auto mb-2 pr-3">
                          Create and Edit Skills
                        </h3>
                        <div className="d-flex mr-5 align-items-center mb-2">
                          <Link
                            to="/profile"
                            className="btn btn-primary light px-3 mr-1"
                            data-toggle="modal"
                            data-target="#cvModel"
                            onClick={() => setCvModel(true)}
                          >
                            <i className="fa fa-file-text m-0" />
                            {" Upload CV "}
                          </Link>
                          {/* Modal */}
                          <Modal
                            show={cvModel}
                            onHide={() => setCvModel(false)}
                            className="modal fade"
                            id="cvModel"
                          >
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title">Upload CV</h5>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  onClick={() => setCvModel(false)}
                                >
                                  <span>×</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <div className="input-group mb-3">
                                  <div className="input-group-prepend">
                                    <span className="input-group-text">
                                      Upload
                                    </span>
                                  </div>
                                  <div className="custom-file">
                                    <input
                                      type="file"
                                      className="custom-file-input"
                                      // value={cvfile}
                                      onChange={changeCV}
                                    />
                                    <label className="custom-file-label">
                                      Choose file
                                    </label>
                                  </div>
                                </div>
                                <button
                                  className="btn btn-outline-primary"
                                  onClick={uploadCV}
                                >
                                  {" "}
                                  Upload
                                </button>
                              </div>
                            </div>
                          </Modal>

                          <Link
                            className="btn btn-primary btn-rounded mb-2"
                            to="#"
                            onClick={changeSkill}
                          >
                            {profilesaving === false
                              ? "Save Skill Changes"
                              : "Saving..."}
                          </Link>

                          <Link
                            className="btn btn-sucess btn-rounded mb-2"
                            to="#"
                            onClick={viewCV}
                          >
                            View CV
                          </Link>

                          {/* <a href="" without rel="noopener noreferrer" target="_blank">
      <button trailingIcon="picture_as_pdf" label="Resume">
        PDF{cvfile} 
      </button>
   </a> */}
                        </div>
                      </div>
                      <div className="card-body">
                        {/* <span>Skill Set</span> */}
                        <div className="skill-set">
                          {skilllist.map((x, i) => (
                            <div className="row" key={i}>
                              <div className="col-md-8">
                                <div className="form-group">
                                  {/* <label>Skill</label> */}
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Skill"
                                    name="title"
                                    // id={i}
                                    value={x.title}
                                    onChange={(e) => handleInputChange(e, i)}
                                    // key={i}
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="button-div">
                                  {/* <label>Action</label> */}
                                  {skilllist.length !== 1 && (
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      onClick={() => handleRemoveClick(i)}
                                    >
                                      Remove
                                    </button>
                                  )}
                                  {skilllist.length - 1 === i && (
                                    <button
                                      type="button"
                                      className="btn btn-info"
                                      onClick={handleAddClick}
                                    >
                                      Add
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
