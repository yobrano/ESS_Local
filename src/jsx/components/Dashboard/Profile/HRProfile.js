import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
//** Import Profile Img */
// import profileImg from "../../../../images/avatar/1.jpg";
import { Accordion, Form, Modal } from "react-bootstrap";
import "./profile.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { format } from "date-fns/esm";
// import { GetProfile } from "./data";
import axios from "axios";
import { Row } from "reactstrap";
import swal from "sweetalert";
import { format } from "date-fns";
import DateTimePicker from "react-datetime-picker";
import TimePicker from "react-time-picker";

function HRProfile(props) {
  const [skilllist, setSkilllist] = useState([{ id: "", title: "" }]);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
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
  const [country, setCountry] = useState(""); //tble req
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
  const [bankcode, setBankcode] = useState("");
  const [bbranchcode, setBbranchcode] = useState("");
  const [disabled, setDisabled] = useState("");

  const [profilesaving, setProfilesaving] = useState(false);
  const [skillsaving, setSkillsaving] = useState(false);
  const [checkList, setCheckList] = useState([]);
  const [JobAppCode, setJobAppCode] = useState("");
  const [jInit, setJInit] = useState(false);
  const [afterPost, setAfterPost] = useState(false);
  const [userId, setUserId] = useState("");

  const [loading, setLoading] = useState(true);

  const [inteviewDate, setInterviewDate] = useState(new Date()); //new Date().toLocaleString('en-GB', { timeZone: 'UTC' })
  const [venue, setVenue] = useState("");
  const [interviewTime, setInterviewTime] = useState("10:00");
  const [virtualLink, setVirtualLink] = useState("");


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

  useEffect(() => {
    let userID = "";
    let reqID = "";
    if (props.location.state === undefined) {
      alert("missing user");
      return;
    }
    //create aux
    window.localStorage.setItem(
      "datum",
      JSON.stringify(props.location.state[0].datum[0])
    );

    userID = props.location.state[0].datum[0].userId;
    reqID = props.location.state[0].datum[0].reqNo;
    setUserId(userID);

    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/profile/profile/${userID}/${reqID}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          setLoading(false);
          // alert(response.data.message);
          setSkilllist(response.data.skillList);
          setCheckList(response.data.checkList);
          // let DOB = format(response.data.profileModel.dob,'dd/mm/yyyy')
          setSelectedDate(response.data.profileModel.dob);
          // setCvModel
          // setActiveToggle
          setFirstName(response.data.profileModel.firstName);
          setSurName(response.data.profileModel.surName);
          setLastName(response.data.profileModel.lastName);
          setGender(
            response.data.profileModel.gender === "M" ? "Male" : "Female"
          );
          setMarital(response.data.profileModel.maritalStatus);
          setReligion(response.data.profileModel.religion);
          // setPassword(response.data.profileModel.religion)
          // setRepassword(response.data.profileModel.religion)
          setPhoneno(response.data.profileModel.mobilePhoneNo);
          setEmail(response.data.userModel.email);
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
          setBankcode(response.data.profileModel.bankCode);
          setBbranchcode(response.data.profileModel.bankBranchCode);
          setDisabled(
            response.data.profileModel.personWithDisability === "Yes"
              ? "Yes"
              : "No"
          );

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
      BankCode: bankcode,
      BankName: "",
      BankBranchCode: bbranchcode,
      BankBranchName: "",
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

  const initJob = () => {
    let lcal = JSON.parse(window.localStorage.getItem("datum"));
    let ReqID = lcal.reqNo;
    let UID = lcal.userId;
    const yearsBetween =
      new Date().getFullYear() - new Date(selectedDate).getFullYear();
    if (yearsBetween < 18 || yearsBetween > 50) {
      swal("Oh", "DOB is either <18 or >50", "error");
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userDetails")).idToken
          }`,
        },
      };

      // axios
      // .get(
      //   `${process.env.REACT_APP_API_S_LINK}/profile/createapp/${ReqID}`,
      //   config
      // )
      swal({
        title: "Are you sure?",
        text: "Are you sure that you want to setup job app",
        icon: "warning",
        dangerMode: true,
      })
        .then((willInit) => {
          if (willInit) {
            return axios.get(
              `${process.env.REACT_APP_API_S_LINK}/profile/createapp/${ReqID}/${UID}`,
              config
            );
          }
        })
        .then(function (response) {
          if (response.status === 200) {
            console.log(response.data);

            setJobAppCode(response.data);
            setJInit(true);
            swal("Success!", "Job Application Shortlisted", "success");
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

  const postJobApp = () => {
    let lcal = JSON.parse(window.localStorage.getItem("datum"));
    let userId = lcal.userId;
    let jobTitle = lcal.title;
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    // axios
    // .get(
    //   `${process.env.REACT_APP_API_S_LINK}/profile/modifyapp/${JobAppCode}/${userId}`,
    //   config
    // )
    let data = {
      JobAppNo: JobAppCode,
      UID: userId,
      Date: inteviewDate,
      Jobname: jobTitle,
      Venue: venue,
      VirtualLink: virtualLink,
      Time: interviewTime,
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to create job app",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/profile/modifyapp`,
            data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);

          // setJobAppCode(response.data);
          setJInit(true);
          swal("Success!", "Job Application Created", "success");
          setAfterPost(true);
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
  };

  let jobAppButton =
    jInit === true ? (
      <>
        <div className="col-xl-2 col-sm-6">
          <div className="form-group">
            <label>Interview Date </label>
            <DatePicker
              selected={inteviewDate}
              onChange={(date) => setInterviewDate(date)}
            />
            {/* <input
              type="text"
              className="form-control"
              placeholder="Enter Date Time"
              value={inteviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
            /> */}

            {/* <DateTimePicker onChange={setInterviewDate} value={inteviewDate} className="form-control"/> */}
          </div>
        </div>
        <div className="col-xl-4 col-sm-6">
          <div className="form-group">
            <label>Interview Time</label>
            <TimePicker
              onChange={setInterviewTime}
              value={interviewTime}
              className="form-control"
              amPmAriaLabel
              // disableClock
              format={"HH:mm"}
            />
          </div>
        </div>
        <div className="col-xl-2 col-sm-6">
          <div className="form-group">
            <label>Venue</label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
            />
          </div>
        </div>
        <div className="col-xl-2 col-sm-6">
          <div className="form-group">
            <label>Virtual Link</label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Link"
              value={virtualLink}
              onChange={(e) => setVirtualLink(e.target.value)}
            />
          </div>
        </div>
        <div className="col-xl-4">
          {/* <label>Action</label> */}
          <button className="btn btn-primary" onClick={postJobApp}>
            {afterPost === true ? (
              <span>Posting Job and Shortlisting Done</span>
            ) : (
              <>
                <span>Post Job Application and Email the Applicant</span>
              </>
            )}
            {/* Post Job Application */}
          </button>
        </div>
      </>
    ) : (
      <>
        <div className="col-xl-6">
          <button className="btn btn-warning" onClick={initJob}>
            Shortlist Application
          </button>
        </div>
      </>
    );

  const viewCV = (user) => {
    const config = {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    axios
      .get(`${process.env.REACT_APP_API_S_LINK}/home/viewcv/${user}`, config)

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
        if (response.status === 503) {
          // alert(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response.status === 503) {
          swal("Oh!", "Missing CV", "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        // console.log(err.response.status);
      });
  };

  const viewAttach = (fid) => {
    let userID = JSON.parse(localStorage.getItem("datum")).userId;
    const config = {
      responseType: "arraybuffer",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
        // responseType:'arraybuffer',
        // 'Content-Type': 'blob',
        // responseType: "blob",

        "Content-Type": "blob", //application/json
        Accept: "application/pdf",
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/home/viewattachment/${fid}/${userID}`,
        config
      )

      .then(function (response) {
        if (response.status === 200) {
          /*
          //Create a Blob from the PDF Stream
          const file = new Blob([response.data], { type: "application/pdf" }); //Build a URL from the file
          const fileURL = URL.createObjectURL(file); //Open the URL on new Window
          window.open(fileURL);
          */

          const file = new Blob([response.data], { type: "application/pdf" });
          //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
          //Open the URL on new Window
          const pdfWindow = window.open();
          pdfWindow.location.href = fileURL;

          /* Download Code
          const outputFilename = `${Date.now()}.pdf`;
          // If you want to download file automatically using link attribute.
          const url = URL.createObjectURL(new Blob([response.data],{type:"application/pdf"}));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', outputFilename);
          document.body.appendChild(link);
          link.click();
          */
        }
      })
      .catch((err) => {
        console.log({ err: err });

        swal("Oh!", err.data.message, "error");
      });
  };

  if (loading) {
    return (
      <>
        <Row className="jobRow">
          <div id="preloader-home">
            <div className="sk-three-bounce">
              <div className="sk-child sk-bounce1"></div>
              <div className="sk-child sk-bounce2"></div>
              <div className="sk-child sk-bounce3"></div>
            </div>
          </div>
        </Row>
      </>
    );
  }

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
                    key={1}
                  >
                    <Link
                      to="#my-posts"
                      data-toggle="tab"
                      className={`nav-link ${
                        activeToggle === "gen" ? "active show" : ""
                      }`}
                    >
                      Applicant Information
                    </Link>
                  </li>
                  {/* <li
                    className="nav-item"
                    onClick={() => setActiveToggle("skill")}
                    key={2}
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
                  </li> */}
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
                          View Profile
                        </h3>
                        <div className="d-flex mr-5 align-items-center mb-2"></div>
                        {/* <Link
                          className="btn btn-primary btn-rounded mb-2"
                          to="#"
                          onClick={changeProfile}
                        >
                          {profilesaving === false
                            ? "Save Profile Changes"
                            : "Saving..."}
                        </Link> */}
                          <Link
                            className="btn btn-sucess btn-rounded mb-2"
                            to="#"
                            onClick={() => viewCV(userId)}
                          >
                            View CV
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
                                        disabled
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
                                        disabled
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
                                        disabled
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
                                  {/* <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Email</label>
                                      <input disabled
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) =>
                                          setEmail(e.target.value)
                                        }
                                      />
                                    </div>
                                  </div> */}
                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>DOB</label>
                                      <input
                                        disabled
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={
                                          new Date(selectedDate).getDate() +
                                          "/" +
                                          new Date(selectedDate).getMonth() +
                                          "/" +
                                          new Date(selectedDate).getFullYear()
                                        }
                                        // onChange={(e) =>
                                        //   setEmail(e.target.value)
                                        // }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Gender</label>

                                      <Form.Select
                                        disabled
                                        aria-label="gender select "
                                        value={gender}
                                        onChange={(e) =>
                                          setGender(e.target.value)
                                        }
                                      >
                                        <option></option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                      </Form.Select>
                                    </div>
                                  </div>
                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Person with Disability</label>

                                      <select
                                        aria-label="disabled select "
                                        value={disabled}
                                        onChange={(e) =>
                                          setDisabled(e.target.value)
                                        }
                                        className="form-select"
                                        disabled
                                      >
                                        <option value="No">No </option>
                                        <option value="Yes">Yes </option>

                                        {/* <option
                                          key={2}
                                          value="No"
                                          {...(disabled === "No"
                                            ? "selected"
                                            : "")}
                                        >
                                          No
                                        </option>
                                        <option
                                          key={1}
                                          value="Yes"
                                          {...(disabled === "Yes"
                                            ? "selected"
                                            : "")}
                                        >
                                          Yes
                                        </option> */}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Marital status</label>
                                      {/* <select disabled id="">
                                                    <option></option>
                                                </select> */}
                                      <Form.Select
                                        disabled
                                        aria-label="marital select "
                                        value={marital}
                                        onChange={(e) =>
                                          setMarital(e.target.value)
                                        }
                                      >
                                        <option
                                          value=" "
                                          // {...(marital === " "
                                          //   ? "selected"
                                          //   : "")}
                                        ></option>
                                        <option
                                          value="Single"
                                          // {...(marital === "Single"
                                          //   ? "selected"
                                          //   : "")}
                                        >
                                          Single
                                        </option>
                                        <option
                                          value="Married"
                                          // {...(marital === "Married"
                                          //   ? "selected"
                                          //   : "")}
                                        >
                                          Married
                                        </option>
                                      </Form.Select>
                                    </div>
                                  </div>
                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Religion</label>
                                      {/* <select disabled id="">
                                                    <option></option>
                                                </select> */}
                                      <Form.Select
                                        aria-label="religion select "
                                        value={religion}
                                        onChange={(e) =>
                                          setReligion(e.target.value)
                                        }
                                        disabled
                                      >
                                        <option value="Christianity">
                                          Christianity
                                        </option>
                                        <option
                                          value="Islam"
                                          // {...(religion === "Islam"
                                          //   ? "selected"
                                          //   : "")}
                                        >
                                          Islam
                                        </option>
                                        <option
                                          value="Hindu"
                                          // {...(religion === "Hindu"
                                          //   ? "selected"
                                          //   : "")}
                                        >
                                          Hindu
                                        </option>
                                      </Form.Select>
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
                                          disabled
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

                                  <div className="col-xl-4 col-sm-6">
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
                                          disabled
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
                                          disabled
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
                                          disabled
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
                                          disabled
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
                                      {/* <select
                                        disabled
                                        className="form-control"
                                        value={city}
                                        onChange={(e) =>
                                          setCity(e.target.value)
                                        }
                                      >
                                        <option value="Nairobi">Nairobi</option>
                                        <option value="Thika">Thika</option>
                                        <option value="Kisume">Kisumu</option>
                                      </select> */}
                                      <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        placeholder="City"
                                        value={city}
                                        // onChange={(e) =>
                                        //   setResidential(e.target.value)
                                        // }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Country</label>
                                      {/* <select
                                        disabled
                                        className="form-control"
                                        value={country}
                                        onChange={(e) =>
                                          setCountry(e.target.value)
                                        }
                                      >
                                        <option value="KE">Kenya</option>
                                        <option value="UG">Uganda</option>
                                        <option value="TZ">Tanzania</option>
                                      </select> */}
                                      <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        placeholder="Country"
                                        value={country}
                                        // onChange={(e) =>
                                        //   setResidential(e.target.value)
                                        // }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>County</label>
                                      {/* <select
                                        disabled
                                        className="form-control"
                                        value={county}
                                        onChange={(e) =>
                                          setCounty(e.target.value)
                                        }
                                      >
                                        <option value="Mombasa">Mombasa</option>
                                        <option value="Nairobi">Nairobi</option>
                                        <option value="Narok">Narok</option>
                                      </select> */}
                                      <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        placeholder="county"
                                        value={county}
                                        // onChange={(e) =>
                                        //   setResidential(e.target.value)
                                        // }
                                      />
                                    </div>
                                  </div>
                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Sub-county</label>
                                      {/* <select
                                        disabled
                                        className="form-control"
                                        value={subcounty}
                                        onChange={(e) =>
                                          setSubcounty(e.target.value)
                                        }
                                      >
                                        <option value="Kasarani">
                                          Kasarani
                                        </option>
                                        <option value="Embakasi">
                                          Embakasi
                                        </option>
                                        <option value="Dagoretti">
                                          Dagoretti
                                        </option>
                                      </select> */}
                                      <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        placeholder="Sub County"
                                        value={subcounty}
                                        // onChange={(e) =>
                                        //   setResidential(e.target.value)
                                        // }
                                      />
                                    </div>
                                  </div>
                                  {/* <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>DOB</label>
                                      <DatePicker
                                        disabled
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                      />
                                    </div>
                                  </div> */}
                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Age</label>
                                      <input
                                        disabled
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
                                        disabled
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
                                        disabled
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
                                        disabled
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
                                        disabled
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
                                        disabled
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
                                        disabled
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
                                        disabled
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
                                        disabled
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
                                  {/* <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Bank Code</label>
                                      <Form.Select
                                        disabled
                                        aria-label="bankcode select "
                                        value={bankcode}
                                        onChange={(e) =>
                                          setBankcode(e.target.value)
                                        }
                                      >
                                      
                                        <option value="KCB">KCB</option>
                                        <option value="EQUITY">EQUITY</option>
                                        <option value="FAMILY">FAMILY</option>
                                      </Form.Select>
                                    </div>
                                  </div>

                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Bank Name</label>
                                      <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter No"
                                        value={bankcode}
                                        // onChange={e=>setNationalid(e.target.value)}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Branch Code</label>
                                      <Form.Select
                                      disabled
                                        aria-label="branch code select "
                                        value={bbranchcode}
                                        onChange={(e) =>
                                          setBbranchcode(e.target.value)
                                        }
                                      >
                                    
                                        <option value="Kasarani">
                                          Kasarani
                                        </option>
                                        <option value="Githurai">
                                          Githurai
                                        </option>
                                        <option value="Old Town">
                                          Old town
                                        </option>
                                      </Form.Select>
                                    </div>
                                  </div>

                                  <div className="col-xl-4 col-sm-6">
                                    <div className="form-group">
                                      <label>Branch Name</label>
                                      <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter No"
                                      />
                                    </div>
                                  </div> */}
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>

                            <Accordion.Item eventKey="3">
                              <Accordion.Header>
                                <div className="title mb-4">
                                  <span className="fs-18 text-black font-w600">
                                    Skills
                                  </span>
                                </div>
                              </Accordion.Header>
                              <Accordion.Body>
                                <div className="card-body">
                                {/* <span>Skill Set</span> */}
                                <div className="skill-set">
                                {skilllist.map((x, i) => (
                                <div className="row">
                                <div className="col-md-8">
                                  <div className="form-group">
                                    {/* <label>Skill</label> */}
                                    <input
                                      disabled
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter Skill"
                                      name="title"
                                      id={i}
                                      value={x.title}
                                      onChange={(e) => handleInputChange(e, i)}
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
                                        disabled
                                      >
                                        Remove
                                      </button>
                                    )}
                                    {skilllist.length - 1 === i && (
                                      <button
                                        type="button"
                                        className="btn btn-info"
                                        onClick={() => handleAddClick}
                                        disabled
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
                              </Accordion.Body>
                            </Accordion.Item>

                          </Accordion>
                        </form>
                      </div>

                      <>
                      <div className="card border-0">
                        <div className="card-body">
                        <div className="row">{jobAppButton}</div>
                        </div>
                      </div>
                       
                      </>

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
                          View Skills
                        </h3>
                        <div className="d-flex mr-5 align-items-center mb-2">
                          {/* <Link
                            className="btn btn-sucess btn-rounded mb-2"
                            to="#"
                            onClick={() => viewCV(userId)}
                          >
                            View CV
                          </Link> */}

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
                                      disabled
                                      type="file"
                                      className="custom-file-input"
                                    />
                                    <label className="custom-file-label">
                                      Choose file
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Modal>

                          {/* <Link
                            className="btn btn-primary btn-rounded mb-2"
                            to="#"
                            onClick={changeSkill}
                          >
                            {profilesaving === false
                              ? "Save Skill Changes"
                              : "Saving..."}
                          </Link> */}
                        </div>
                      </div>
                      <div className="card-body">
                        {/* <span>Skill Set</span> */}
                        <div className="skill-set">
                          {skilllist.map((x, i) => (
                            <div className="row">
                              <div className="col-md-8">
                                <div className="form-group">
                                  {/* <label>Skill</label> */}
                                  <input
                                    disabled
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Skill"
                                    name="title"
                                    id={i}
                                    value={x.title}
                                    onChange={(e) => handleInputChange(e, i)}
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
                                      disabled
                                    >
                                      Remove
                                    </button>
                                  )}
                                  {skilllist.length - 1 === i && (
                                    <button
                                      type="button"
                                      className="btn btn-info"
                                      onClick={() => handleAddClick}
                                      disabled
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

                    <div className="approveSection">
                      <div className="card">
                        <div className="text-center">
                          <h4 className="mt-5">Check List Item</h4>
                        </div>
                        <div className="card-body">
                          <ul>
                            {checkList.map((d, i) => (
                              <li key={i}>
                                <Link
                                  className="btn btn-sucess btn-rounded mb-2"
                                  to="#"
                                  onClick={() => viewAttach(d.tagName)}
                                >
                                  <b>{++i}. &nbsp;</b>
                                  {d.tagName}
                                </Link>

                                {/* <a
                                  href={d.filePath}
                                  without 
                                  rel="noopener noreferrer"
                                  target="_blank"
                                >
                                  <b>{++i}. &nbsp;</b>
                                  {d.tagName}
                                </a> */}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <>
                        <div className="row">{jobAppButton}</div>
                      </>
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

export default withRouter(HRProfile);
