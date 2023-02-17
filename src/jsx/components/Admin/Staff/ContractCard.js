import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "./ExitForm.css";
import axios from "axios";
import swal from "sweetalert";

const ContractCard = (props) => {
  const [loading, setLoading] = useState(true);

  const [outstanding, setOutstanding] = useState(false);
  const [aboveAverage, setAboveAverage] = useState(false);
  const [satisfactory, setSatisfactory] = useState(false);
  const [marginal, setMarginal] = useState(false);
  const [unsatisfactory, setUnsatisfactory] = useState(false);
  const [performanceComment, setPerformanceComment] = useState("");

  const [excellentAttendance, setExcellentAttendance] = useState(false);
  const [occasionalAbsence, setOccasionalAbsence] = useState(false);
  const [repeatedAbsence, setRepeatedAbsence] = useState(false);
  const [unjustifiedAbsence, setUnjustifiedAbsence] = useState(false);
  const [attendanceComment, setAttendanceComment] = useState("");

  const [alwaysInterested, setAlwaysInterested] = useState(false);
  const [reasonablyDevoted, setReasonablyDevoted] = useState(false);
  const [passiveAttitude, setPassiveAttitude] = useState(false);
  const [activeDislikeofWork, setActiveDislikeofWork] = useState(false);
  const [attitudeComment, setAttitudeComment] = useState("");

  const [alwaysNeat, setAlwaysNeat] = useState(false);
  const [generallyNeat, setGenerallyNeat] = useState(false);
  const [sometimesCareles, setSometimesCareles] = useState(false);
  const [attirenotSuitable, setAttirenotSuitable] = useState(false);
  const [appearanceComment, setAppearanceComment] = useState("");

  const [selfStarter, setSelfStarter] = useState(false);
  const [needsStimilus, setNeedsStimilus] = useState(false);
  const [needsCSupervision, setNeedsCSupervision] = useState(false);
  const [showNoInitiative, setShowNoInitiative] = useState(false);
  const [initiativeComment, setInitiativeComment] = useState("");

  const [alwayOnTime, setAlwayOnTime] = useState(false);
  const [occasionallyLate, setOccasionallyLate] = useState(false);
  const [repeatedLate, setRepeatedLate] = useState(false);
  const [rarelyOnTime, setRarelyOnTime] = useState(false);
  const [dependabilityComment, setDependabilityComment] = useState("");

  const [decisionLogical, setDecisionLogical] = useState(false);
  const [genSoundJudgment, setGenSoundJudgment] = useState(false);
  const [reqFreqCorrection, setReqFreqCorrection] = useState(false);
  const [judgmentOftenFaulty, setJudgmentOftenFaulty] = useState(false);
  const [judmentComment, setJudmentComment] = useState("");

  const [rarelyMakesErrs, setRarelyMakesErrs] = useState(false);
  const [fewErrThanMost, setFewErrThanMost] = useState(false);
  const [avgAccuracy, setAvgAccuracy] = useState(false);
  const [unacceptablyErratic, setUnacceptablyErratic] = useState(false);
  const [attentionToDetailComment, setAttentionToDetailComment] = useState("");

  const [friendlyOutgoing, setFriendlyOutgoing] = useState(false);
  const [somewhatBusinesslike, setSomewhatBusinesslike] = useState(false);
  const [gregariousToPoint, setGregariousToPoint] = useState(false);
  const [sullenAndWithdrawn, setSullenAndWithdrawn] = useState(false);
  const [interpersonalComment, setInterpersonalComment] = useState("");

  const [alwayscourteousTactful, setAlwayscourteousTactful] = useState(false);
  const [genCourteous, setGenCourteous] = useState(false);
  const [sometimesIncosiderate, setSometimesIncosiderate] = useState(false);
  const [arouseAntagonism, setArouseAntagonism] = useState(false);
  const [mannersComment, setMannersComment] = useState("");

  const [seeksAddResponsibility, setSeeksAddResponsibility] = useState(false);
  const [willinglyAcceptResp, setWillinglyAcceptResp] = useState(false);
  const [assumesWhenUnavoidable, setAssumesWhenUnavoidable] = useState(false);
  const [alwaysAvoidResponsibility, setAlwaysAvoidResponsibility] =
    useState(false);
  const [responsiblityComment, setResponsiblityComment] = useState("");

  const [graspImmediately, setGraspImmediately] = useState(false);
  const [quickerThanAvg, setQuickerThanAvg] = useState(false);
  const [avgLearning, setAvgLearning] = useState(false);
  const [slowLearner, setSlowLearner] = useState(false);
  const [unableToGraspNew, setUnableToGraspNew] = useState(false);
  const [learningCampacityComment, setLearningCampacityComment] = useState("");

  const [excepHighProductivity, setExcepHighProductivity] = useState(false);
  const [completeMoreThanAvg, setCompleteMoreThanAvg] = useState(false);
  const [adequatePerHr, setAdequatePerHr] = useState(false);
  const [inadequateOutput, setInadequateOutput] = useState(false);
  const [outputComment, setOutputComment] = useState("");

  const [assumesLeadershipInit, setAssumesLeadershipInit] = useState(false);
  const [willLeadEncouraged, setWillLeadEncouraged] = useState(false);
  const [canLeadifNecessary, setCanLeadifNecessary] = useState(false);
  const [refusesLeadership, setRefusesLeadership] = useState(false);
  const [attemptbutInefficient, setAttemptbutInefficient] = useState(false);
  const [leadershipComment, setLeadershipComment] = useState("");

  const [neverFalter, setNeverFalter] = useState(false);
  const [maintainPoise, setMaintainPoise] = useState(false);
  const [dependableExcUnderPress, setDependableExcUnderPress] = useState(false);
  const [cantTakePressure, setCantTakePressure] = useState(false);
  const [pressureComment, setPressureComment] = useState("");

  const [empStrongestpt, setEmpStrongestpt] = useState("");
  const [areaofImprovement, setAreaofImprovement] = useState("");
  const [qualifiedPromo, setQualifiedPromo] = useState("");
  const [promoPstn, setPromoPstn] = useState("");
  const [promotable, setPromotable] = useState("");
  const [effectiveWithDifferent, setEffectiveWithDifferent] = useState("");
  const [differentAssingment, setDifferentAssingment] = useState("");
  const [recommendationSectionComment, setRecommendationSectionComment] =
    useState("");
  const [empRecConfirm, setEmpRecConfirm] = useState(false);
  const [empRecExtProb, setEmpRecExtProb] = useState(false);
  const [empRecTerminate, setEmpRecTerminate] = useState(false);

  const [hrRemark, setHRRemark] = useState("");
  const [MDFDRemark, setMDFDRemark] = useState("");
  const [supportingfile, setSupportingfile] = useState("");

  const [howLong, setHowlong] = useState("");
  const [doRenew, setDoRenew] = useState("");
  const [renewReason, setRenewReason] = useState("");
  const [superVisionTime, setSuperVisionTime] = useState("");

  useEffect(() => {
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${
    //       JSON.parse(localStorage.getItem("userDetails")).idToken
    //     }`,
    //   },
    // };

    // axios
    //   .get(
    //     `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/getprobationcard/${props.location.state[0].datum[0].probationno}`,
    //     config
    //   )
    //   .then(function (response) {
    //     if (response.status === 200) {
    //       console.log(response.data);

    //       setLoading(false);
    //     }
    //     if (response.status === 404) {
    //       swal("Oh!", response.data.message, "error");
    //       console.log(response.data.message);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log({ err: err });
    //     swal("Oh!", err.data.message, "error");
    //   });
        setSuperVisionTime(props.location.state[0].datum[0].supervisionTime)
        setDoRenew(props.location.state[0].datum[0].doRenew)
        setHowlong(props.location.state[0].datum[0].howlong)
        setRenewReason(props.location.state[0].datum[0].renewReason)
        setTimeout(() => {
          setLoading(false);
        }, 500);
  }, []);

  const updateCard = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Update Contract Form",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.get(
            `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/movecontractfrommanagertohr/${props.location.state[0].datum[0].contractNo}`,
            // data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          swal("Success!", "Contact Form Updated", "success");
        }
        if (response.status === 404) {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        console.log({ err: err });
      });
  };

  const onChangeSupportingDoc = (e) => {
    setSupportingfile(e.target.files[0]);
  };
  //Upload Upload Supporting Doc
  const uploadSupportindDoc = (e) => {
    e.preventDefault();

    if (supportingfile !== "") {
      if (supportingfile.size / 1024 > 6024) {
        alert("Size above 6MB");
        return;
      }
      if (supportingfile.type !== "application/pdf") {
        alert("File not pdf.");
        return;
      }

      const formData = new FormData();
      formData.append(`formFile`, supportingfile);
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userDetails")).idToken
          }`,
        },
      };

      axios
        .post(
          `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/hoduploadendofcontractdocs/${props.location.state[0].datum[0].contractNo}`,
          formData,
          config
        )
        .then(function (response) {
          if (response.status === 200) {
            swal("Success!", "Your file has been Uploaded", "success");
          }
          if (response.status === 404) {
            alert(response.data.message);
          }
        })
        .catch((err) => {
          if (err.response !== undefined) {
            swal("Oh!", err.response.data.message, "error");
          } else {
            swal("Oh!", err.message, "error");
          }
          console.log({ err: err });
          // swal("Oops!", "Seems like we couldn't Upload the file", "error");
        });
    }
  };

  //Push first segment
  const uploadFirstSegmentCard = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    let data = {
      PerformanceComment: performanceComment,
      AttendanceComment: attendanceComment,
      AttitudeComment: attitudeComment,
      AppearanceComment: appearanceComment,
      InitiativeComment: initiativeComment,
      DependabilityComment: dependabilityComment,
      JudmentComment: judmentComment,
      AttentionToDetailComment: attentionToDetailComment,
      InterpersonalComment: interpersonalComment,
      MannersComment: mannersComment,
      ResponsiblityComment: responsiblityComment,
      LearningCampacityComment: learningCampacityComment,
      OutputComment: outputComment,
      LeadershipComment: leadershipComment,
      PressureComment: pressureComment,

      Outstanding: outstanding,
      AboveAverage: aboveAverage,
      Satisfactory: satisfactory,
      Marginal: marginal,
      Unsatisfactory: unsatisfactory,

      ExcellentAttendance: excellentAttendance,
      OccasionalAbsence: occasionalAbsence,
      RepeatedAbsence: repeatedAbsence,
      UnjustifiedAbsence: unjustifiedAbsence,

      AlwaysInterested: alwaysInterested,
      ReasonablyDevoted: reasonablyDevoted,
      PassiveAttitude: passiveAttitude,
      ActiveDislikeofWork: activeDislikeofWork,

      AlwaysNeat: alwaysNeat,
      GenerallyNeat: generallyNeat,
      SometimesCareles: sometimesCareles,
      AttirenotSuitable: attirenotSuitable,

      SelfStarter: selfStarter,
      NeedsStimilus: needsStimilus,
      NeedsCSupervision: needsCSupervision,
      ShowNoInitiative: showNoInitiative,

      AlwayOnTime: alwayOnTime,
      OccasionallyLate: occasionallyLate,
      RepeatedLate: repeatedLate,
      RarelyOnTime: rarelyOnTime,

      DecisionLogical: decisionLogical,
      GenSoundJudgment: genSoundJudgment,
      ReqFreqCorrection: reqFreqCorrection,
      JudgmentOftenFaulty: judgmentOftenFaulty,

      RarelyMakesErrs: rarelyMakesErrs,
      FewErrThanMost: fewErrThanMost,
      AvgAccuracy: avgAccuracy,
      UnacceptablyErratic: unacceptablyErratic,

      FriendlyOutgoing: friendlyOutgoing,
      SomewhatBusinesslike: somewhatBusinesslike,
      GregariousToPoint: gregariousToPoint,
      SullenAndWithdrawn: sullenAndWithdrawn,

      AlwayscourteousTactful: alwayscourteousTactful,
      GenCourteous: genCourteous,
      SometimesIncosiderate: sometimesIncosiderate,
      ArouseAntagonism: arouseAntagonism,

      SeeksAddResponsibility: seeksAddResponsibility,
      WillinglyAcceptResp: willinglyAcceptResp,
      AssumesWhenUnavoidable: assumesWhenUnavoidable,
      AlwaysAvoidResponsibility: alwaysAvoidResponsibility,

      GraspImmediately: graspImmediately,
      QuickerThanAvg: quickerThanAvg,
      AvgLearning: avgLearning,
      SlowLearner: slowLearner,
      UnableToGraspNew: unableToGraspNew,

      ExcepHighProductivity: excepHighProductivity,
      CompleteMoreThanAvg: completeMoreThanAvg,
      AdequatePerHr: adequatePerHr,
      InadequateOutput: inadequateOutput,

      AssumesLeadershipInit: assumesLeadershipInit,
      WillLeadEncouraged: willLeadEncouraged,
      CanLeadifNecessary: canLeadifNecessary,
      RefusesLeadership: refusesLeadership,
      AttemptbutInefficient: attemptbutInefficient,

      NeverFalter: neverFalter,
      MaintainPoise: maintainPoise,
      DependableExcUnderPress: dependableExcUnderPress,
      CantTakePressure: cantTakePressure,
    };
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Upload",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/uploadcontractsectionone/${props.location.state[0].datum[0].contractNo}`,
            data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          swal("Success!", "Contract Card Updated", "success");
        }
        if (response.status === 404) {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        console.log({ err: err });
      });
  };

  const uploadFirstSegmentSection = (e)=>{
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    let data = {
      // EmpID: selectedEmp.value,
      ContractNo: props.location.state[0].datum[0].contractNo,
      SupervisionTime: superVisionTime,
      DoRenew:doRenew,
      Howlong:howLong,
      RenewReason:renewReason,
    };
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Upload",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/v1/storeendofcontractfirstdata`,
            data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          swal("Success!", "Probation Card Updated", "success");
        }
       
      })
      .catch((err) => {
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        console.log({ err: err });
      });

  }

  const uploadRecomSection = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    let data = {
      EmployeeStrongestPoint: empStrongestpt,
      EmployeeWeakestPoint: areaofImprovement, //area of improvement
      EmployeeQualifiedForPromo: qualifiedPromo,
      PromoPosition: promoPstn,
      PromotableInTheFuture: promotable,
      EffectiveDifferentAssignment: effectiveWithDifferent,
      WhichAssignment: differentAssingment,
      AdditionalComment: recommendationSectionComment,
      confirm: empRecConfirm,
      Extend: empRecExtProb,
      Terminate: empRecTerminate,
    };
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Upload",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/uploadcontractrecommendation/${props.location.state[0].datum[0].contractNo}`,
            data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          swal("Success!", "Probation Card Updated", "success");
        }
        if (response.status === 404) {
          alert(response.data.message);
        }
      })
      .catch((err) => {
        if (err.response !== undefined) {
          swal("Oh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
        console.log({ err: err });
      });
  };

  let btnUP = "";
  let sectionOne = "";
  if (props.location.state[0].datum[0].status === "Open") {
    btnUP = (
      <button className="btn btn-success" onClick={updateCard}>
        Push to HR
      </button>
    );
    sectionOne = (
      <button className="btn btn-warning" onClick={uploadFirstSegmentCard}>
        Upload this section
      </button>
    );
  } else if (props.location.state[0].datum[0].status === "Approved") {
    btnUP = <button className="btn btn-secondary">Form Pushed Already</button>;
  }

  if (loading) {
    return (
      <>
        <div className="container">
          <div className="headerDiv2 text-center">
            <h4 className="">Employee End Of Contract Card Loading</h4>
          </div>
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
      <h4 className="text-center">END OF CONTRACT REPORT</h4>
      <div className="card">
        <Accordion defaultActiveKey={["-1"]} alwaysOpen>
          <Accordion.Item eventKey="-1">
            <Accordion.Header>
              <div className="title mb-4">
                <span className="fs-18 text-black font-w600">
                  New Contract Creation Card
                </span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">Employee Number</label>
                    <input
                      type="text"
                      className="form-control"
                      value={props.location.state[0].datum[0].empID}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">Employee Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={props.location.state[0].datum[0].empName}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-xl-12 col-sm-6">
                  <div className="form-group">
                    <label htmlFor=""> How long have you supervised</label>
                    <textarea
                      className="form-control"
                      cols="30"
                      rows="3"
                      name="Howlongs"
                      placeholder="How long have you been supervising this employee? (max 240 characters)"
                      value={superVisionTime}
                      onChange={(e) => setSuperVisionTime(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-3">
                  <div className="form-group">
                    <label htmlFor="">Do we renew the contract?</label>
                    <select
                      name="qualifiedForPromo"
                      id=""
                      className="form-control"
                      onChange={(e) => setDoRenew(e.target.value)}
                      value={doRenew}
                    >
                      <option>Choose</option>
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                    </select>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-3">
                  <div className="form-group">
                    <label htmlFor="">If yes, for how long?</label>
                    <select
                      name="qualifiedForPromo"
                      id=""
                      className="form-control"
                      onChange={(e) => setHowlong(e.target.value)}
                      value={howLong}
                    >
                      <option>Choose</option>
                      <option value="1 Month">1 Months</option>
                      <option value="3 Months">3 Months</option>
                      <option value="6 Months">6 Months</option>
                      <option value="12 Months">12 Months</option>
                    </select>
                  </div>
                </div>

                <div className="col-xl-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="">Reason for renewal</label>
                    <input
                      type="text"
                      className="form-control"
                      name="probationTime"
                      placeholder="Reason(s) for renewal/non-renewal"
                      value={renewReason}
                      onChange={(e) => setRenewReason(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <button
                      className="btn btn-warning"
                      onClick={uploadFirstSegmentSection}
                    >
                      Upload this section
                    </button>
                  </div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div className="title mb-4">
                <span className="fs-18 text-black font-w600">
                  Please tick next to the description which best applies to this
                  employee.
                </span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label foo="" className="b-2">
                      Overall Performance
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="Outstanding"
                        id="outstanding1"
                        value="true"
                        onChange={(e) => setOutstanding(!outstanding)}
                      />
                      <label className="form-check-label" foo="outstanding1">
                        Outstanding
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="Above Averange"
                        id="aboveAvg1"
                        value="true"
                        onChange={(e) => setAboveAverage(!aboveAverage)}
                      />
                      <label className="form-check-label" foo="aboveAvg1">
                        Above Averange
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="Satisfactory"
                        id="satisfactory1"
                        value="true"
                        onChange={(e) => setSatisfactory(!satisfactory)}
                      />
                      <label className="form-check-label" foo="satisfactory1">
                        Satisfactory
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="Marginal"
                        id="marginal1"
                        value="true"
                        onChange={() => setMarginal(!marginal)}
                      />
                      <label className="form-check-label" foo="marginal1">
                        Marginal
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="Unsatisfactory"
                        id="unsatisfactory"
                        checked={unsatisfactory}
                        onChange={() => setUnsatisfactory(!unsatisfactory)}
                      />
                      <label className="form-check-label" foo="unsatisfactory">
                        Unsatisfactory
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label foo="" className="b-2">
                      Attendance
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="excellentAttendance"
                        id="excattance"
                        value={excellentAttendance}
                        onChange={(e) =>
                          setExcellentAttendance(!excellentAttendance)
                        }
                      />
                      <label className="form-check-label" foo="excattance">
                        Excellent attendance record
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="attendane"
                        id="abjecjustice"
                        value={occasionalAbsence}
                        onChange={(e) =>
                          setOccasionalAbsence(!occasionalAbsence)
                        }
                      />
                      <label className="form-check-label" foo="abjecjustice">
                        Occasional absence but justified
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="attendane"
                        id="absjusticc"
                        value={repeatedAbsence}
                        onChange={(e) => setRepeatedAbsence(!repeatedAbsence)}
                      />
                      <label className="form-check-label" foo="absjusticc">
                        Repeated absence but justified
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="attendane"
                        id="unjustabsent"
                        value={unjustifiedAbsence}
                        onChange={(e) =>
                          setUnjustifiedAbsence(!unjustifiedAbsence)
                        }
                      />
                      <label className="form-check-label" foo="unjustabsent">
                        Unjustified absences
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea
                      className="w-100 form-control"
                      name="appearanceComment"
                      rows="2"
                      placeholder="Comment"
                      value={attendanceComment}
                      onChange={(e) => setAttendanceComment(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label foo="" className="b-2">
                      Attitude
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="alwaysInterested"
                        id="intenthusiastic"
                        value={alwaysInterested}
                        onChange={(e) => setAlwaysInterested(!alwaysInterested)}
                      />
                      <label className="form-check-label" foo="intenthusiastic">
                        Always interested and enthusiastic
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="reasonablyDevoted"
                        id="deveotedwrk"
                        value={reasonablyDevoted}
                        onChange={(e) =>
                          setReasonablyDevoted(!reasonablyDevoted)
                        }
                      />
                      <label className="form-check-label" foo="deveotedwrk">
                        Reasonably devoted to work
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="attitude"
                        id="passiveatt"
                        value={passiveAttitude}
                        onChange={(e) => setPassiveAttitude(!passiveAttitude)}
                      />
                      <label className="form-check-label" foo="passiveatt">
                        Passive attitude toward work
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="attitude"
                        id="dislwork"
                        value={activeDislikeofWork}
                        onChange={(e) =>
                          setActiveDislikeofWork(!activeDislikeofWork)
                        }
                      />
                      <label className="form-check-label" foo="dislwork">
                        Shows active dislike of work
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <textarea
                      className="w-100 form-control"
                      name="attitudeComment"
                      rows="2"
                      placeholder="Comment"
                      value={attitudeComment}
                      onChange={(e) => setAttitudeComment(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label foo="" className="b-2">
                      Appearance
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="appearance"
                        id="appropdressd"
                        value={alwaysNeat}
                        onChange={(e) => setAlwaysNeat(!alwaysNeat)}
                      />
                      <label className="form-check-label" foo="appropdressd">
                        Always neat and appropriately dressed
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="generallyNeat"
                        id="genapproderss"
                        value={generallyNeat}
                        onChange={(e) => setGenerallyNeat(!generallyNeat)}
                      />
                      <label className="form-check-label" foo="genapproderss">
                        Generally neat appropriately dressed
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="sometimesCareles"
                        id="somejtapp"
                        value={sometimesCareles}
                        onChange={(e) => setSometimesCareles(!sometimesCareles)}
                      />
                      <label className="form-check-label" foo="somejtapp">
                        Sometimes careless about appearance
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="attirenotSuitable"
                        id="ErPosition"
                        value={attirenotSuitable}
                        onChange={(e) =>
                          setAttirenotSuitable(!attirenotSuitable)
                        }
                      />
                      <label className="form-check-label" foo="ErPosition">
                        Attire not suitable for position
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea
                      className="w-100 form-control"
                      name="appearanceComment"
                      rows="2"
                      placeholder="Comment"
                      value={appearanceComment}
                      onChange={(e) => setAppearanceComment(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">{sectionOne}</div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <div className="title mb-4">
                <span className="fs-18 text-black font-w600">
                  Recommendations
                </span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label foo="">
                      What do you consider to be the employee’s strongest
                      points?
                    </label>
                    <textarea
                      className="w-100 form-control"
                      name="empStrongestpt"
                      rows="2"
                      placeholder="Summary 240 characters"
                      value={empStrongestpt}
                      onChange={(e) => setEmpStrongestpt(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label foo="">
                      What areas do you feel the employee needs to improve on?
                    </label>
                    <textarea
                      className="w-100 form-control"
                      name="empWeakestPt"
                      rows="2"
                      placeholder="Summary 240 characters"
                      value={areaofImprovement}
                      onChange={(e) => setAreaofImprovement(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label foo="">
                      Do you consider the employee to be qualified for promotion
                      at the present time?{" "}
                    </label>
                    <select
                      name="qualifiedForPromo"
                      id=""
                      className="form-control"
                      onChange={(e) => setQualifiedPromo(e.target.value)}
                    >
                      <option>Choose</option>
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label foo="">If yes, to what position? </label>
                    <input
                      type="text"
                      className="form-control"
                      name="promoPstn"
                      value={promoPstn}
                      onChange={(e) => setPromoPstn(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="form-group">
                    <label foo="">
                      If no, do you think the employee may be promotable at a
                      future date?
                    </label>
                    <select
                      name="promotable"
                      id=""
                      className="form-control"
                      onChange={(e) => setPromotable(e.target.value)}
                    >
                      <option>Choose</option>
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="form-group">
                    <label foo="">
                      Do you think the employee would be more effective with a
                      different assignment than the present one?
                    </label>
                    <select
                      name="promotable"
                      id=""
                      className="form-control"
                      onChange={(e) =>
                        setEffectiveWithDifferent(e.target.value)
                      }
                    >
                      <option>Choose</option>
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="form-group">
                    <label foo="">If yes, which one? </label>
                    <input
                      type="text"
                      className="form-control"
                      name="differentAssingment"
                      value={differentAssingment}
                      onChange={(e) => setDifferentAssingment(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="form-group">
                    <textarea
                      className="w-100 form-control"
                      name="recommendationSectionComment"
                      rows="2"
                      placeholder="Comment (max 240 characters)"
                      value={recommendationSectionComment}
                      onChange={(e) =>
                        setRecommendationSectionComment(e.target.value)
                      }
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor=""> Supporting Documents</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={onChangeSupportingDoc}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="">Action</label> <br />
                  <button
                    className="btn btn-primary rounded-0"
                    onClick={uploadSupportindDoc}
                  >
                    Upload Supporting File{" "}
                    <i className="fa fa-cloud-upload"></i>
                  </button>
                  <button
                    className="btn btn-warning rounded-0"
                    onClick={uploadRecomSection}
                  >
                    Upload this Section
                  </button>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <div className="title mb-4">
                <span className="fs-18 text-black font-w600">
                  Human Resource and MD/FD Section
                </span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label foo="">HR Remarks</label>
                    <textarea
                      className="w-100 form-control"
                      name="hrRemark"
                      rows="2"
                      placeholder="Summary 240 characters"
                      value={hrRemark}
                      onChange={(e) => setHRRemark(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label foo="">MD/FD Remarks</label>
                    <textarea
                      className="w-100 form-control"
                      name="MDFDRemark"
                      rows="2"
                      placeholder="Summary 240 characters"
                      value={MDFDRemark}
                      onChange={(e) => setMDFDRemark(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="card-footer">
          <div className="text-right">{btnUP}</div>
        </div>
      </div>
    </>
  );
};

export default withRouter(ContractCard);
