import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "./ExitForm.css";
import axios from "axios";
import swal from "sweetalert";
import  secureLocalStorage  from  "react-secure-storage"; import { decryptToken} from "./../../../../AppUtility"; import jwt_decode from "jwt-decode";

const FDContractCard = (props) => {
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
  const [alwaysAvoidResponsibility, setAlwaysAvoidResponsibility] = useState(false);
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
  const [empWeakestPt, setEmpWeakestPt] = useState("");
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

  const [selectedEmp, setSelectedEmp] = useState("");
  const [selectedMgr, setSelectedMgr] = useState("");
  const [skills, setSkills] = useState("");
  const [datax,setDatax]= useState({});
  const [disableBtn,setDisableBtn] = useState(false)

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
        `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/contractcarddata/${props.location.state[0].datum[0].contractNo}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data.probationFirstList[0]);
          setDatax(response.data.probationFirstList[0])
          setSelectedEmp(response.data.probationFirstList[0].employeename)
          setSkills(response.data.probationFirstList[0].skill)
          setSelectedMgr(response.data.probationFirstList[0].managername)
          setHRRemark(response.data.probationFirstList[0].hRcomment)
          setMDFDRemark(response.data.probationFirstList[0].mDcomment)
          
        setOutstanding(response.data.probationFirstList[0].outstanding)
        setAboveAverage(response.data.probationFirstList[0].aboveAverage)
        setSatisfactory(response.data.probationFirstList[0].satisfactory)
        setMarginal(response.data.probationFirstList[0].marginal)
        setUnsatisfactory(response.data.probationFirstList[0].unsatisfactory)
        setPerformanceComment(response.data.probationFirstList[0].performanceComment)
        
        setExcellentAttendance(response.data.probationFirstList[0].excellentAttendance)
        setOccasionalAbsence(response.data.probationFirstList[0].occasionalAbsence)
        setRepeatedAbsence(response.data.probationFirstList[0].repeatedAbsence)
        setUnjustifiedAbsence(response.data.probationFirstList[0].unjustifiedAbsence)
        setAttendanceComment(response.data.probationFirstList[0].attendanceComment)
        
        setAlwaysInterested(response.data.probationFirstList[0].alwaysInterested)
        setReasonablyDevoted(response.data.probationFirstList[0].reasonablyDevoted)
        setPassiveAttitude(response.data.probationFirstList[0].passiveAttitude)
        setActiveDislikeofWork(response.data.probationFirstList[0].activeDislikeofWork)
        setAttitudeComment(response.data.probationFirstList[0].attitudeComment)
        
        setAlwaysNeat(response.data.probationFirstList[0].alwaysNeat)
        setGenerallyNeat(response.data.probationFirstList[0].generallyNeat)
        setSometimesCareles(response.data.probationFirstList[0].sometimesCareles)
        setAttirenotSuitable(response.data.probationFirstList[0].attirenotSuitable)
        setAppearanceComment(response.data.probationFirstList[0].appearanceComment)
        
        setSelfStarter(response.data.probationFirstList[0].selfStarter)
        setNeedsStimilus(response.data.probationFirstList[0].needsStimilus)
        setNeedsCSupervision(response.data.probationFirstList[0].needsCSupervision)
        setShowNoInitiative(response.data.probationFirstList[0].showNoInitiative)
        setInitiativeComment(response.data.probationFirstList[0].initiativeComment)
        
        setAlwayOnTime(response.data.probationFirstList[0].alwayOnTime)
        setOccasionallyLate(response.data.probationFirstList[0].occasionallyLate)
        setRepeatedLate(response.data.probationFirstList[0].repeatedLate)
        setRarelyOnTime(response.data.probationFirstList[0].rarelyOnTime)
        setDependabilityComment(response.data.probationFirstList[0].dependabilityComment)
        
        setDecisionLogical(response.data.probationFirstList[0].decisionLogical)
        setGenSoundJudgment(response.data.probationFirstList[0].genSoundJudgment)
        setReqFreqCorrection(response.data.probationFirstList[0].reqFreqCorrection)
        setJudgmentOftenFaulty(response.data.probationFirstList[0].judgmentOftenFaulty)
        setJudmentComment(response.data.probationFirstList[0].judmentComment)
        
        setRarelyMakesErrs(response.data.probationFirstList[0].rarelyMakesErrs)
        setFewErrThanMost(response.data.probationFirstList[0].fewErrThanMost)
        setAvgAccuracy(response.data.probationFirstList[0].avgAccuracy)
        setUnacceptablyErratic(response.data.probationFirstList[0].unacceptablyErratic)
        setAttentionToDetailComment(response.data.probationFirstList[0].attentionToDetailComment)
        
        setFriendlyOutgoing(response.data.probationFirstList[0].friendlyOutgoing)
        setSomewhatBusinesslike(response.data.probationFirstList[0].somewhatBusinesslike)
        setGregariousToPoint(response.data.probationFirstList[0].gregariousToPoint)
        setSullenAndWithdrawn(response.data.probationFirstList[0].sullenAndWithdrawn)
        setInterpersonalComment(response.data.probationFirstList[0].interpersonalComment)
        
        setAlwayscourteousTactful(response.data.probationFirstList[0].alwayscourteousTactful)
        setGenCourteous(response.data.probationFirstList[0].genCourteous)
        setSometimesIncosiderate(response.data.probationFirstList[0].sometimesIncosiderate)
        setArouseAntagonism(response.data.probationFirstList[0].arouseAntagonism)
        setMannersComment(response.data.probationFirstList[0].mannersComment)
        
        setSeeksAddResponsibility(response.data.probationFirstList[0].seeksAddResponsibility)
        setWillinglyAcceptResp(response.data.probationFirstList[0].willinglyAcceptResp)
        setAssumesWhenUnavoidable(response.data.probationFirstList[0].assumesWhenUnavoidable)
        setAlwaysAvoidResponsibility(response.data.probationFirstList[0].alwaysAvoidResponsibility)
        setResponsiblityComment(response.data.probationFirstList[0].responsiblityComment)
        
        setGraspImmediately(response.data.probationFirstList[0].graspImmediately)
        setQuickerThanAvg(response.data.probationFirstList[0].quickerThanAvg)
        setAvgLearning(response.data.probationFirstList[0].avgLearning)
        setSlowLearner(response.data.probationFirstList[0].slowLearner)
        setUnableToGraspNew(response.data.probationFirstList[0].unableToGraspNew)
        setLearningCampacityComment(response.data.probationFirstList[0].learningCampacityComment)
        
        setExcepHighProductivity(response.data.probationFirstList[0].excepHighProductivity)
        setCompleteMoreThanAvg(response.data.probationFirstList[0].completeMoreThanAvg)
        setAdequatePerHr(response.data.probationFirstList[0].adequatePerHr)
        setInadequateOutput(response.data.probationFirstList[0].inadequateOutput)
        setOutputComment(response.data.probationFirstList[0].outputComment)
        
        setAssumesLeadershipInit(response.data.probationFirstList[0].assumesLeadershipInit)
        setWillLeadEncouraged(response.data.probationFirstList[0].willLeadEncouraged)
        setCanLeadifNecessary(response.data.probationFirstList[0].canLeadifNecessary)
        setRefusesLeadership(response.data.probationFirstList[0].refusesLeadership)
        setAttemptbutInefficient(response.data.probationFirstList[0].attemptbutInefficient)
        setLeadershipComment(response.data.probationFirstList[0].leadershipComment)
        
        setNeverFalter(response.data.probationFirstList[0].neverFalter)
        setMaintainPoise(response.data.probationFirstList[0].maintainPoise)
        setDependableExcUnderPress(response.data.probationFirstList[0].dependableExcUnderPress)
        setCantTakePressure(response.data.probationFirstList[0].cantTakePressure)
        setPressureComment(response.data.probationFirstList[0].pressureComment)
        
           setEmpStrongestpt(response.data.probationFirstList[0].empStrongestpt)
           setEmpWeakestPt(response.data.probationFirstList[0].empWeakestPt)
           setQualifiedPromo(response.data.probationFirstList[0].qualifiedPromo)
           setPromoPstn(response.data.probationFirstList[0].promoPstn)
           setPromotable(response.data.probationFirstList[0].promotable)
           setEffectiveWithDifferent(response.data.probationFirstList[0].effectiveWithDifferent)
           setDifferentAssingment(response.data.probationFirstList[0].differentAssingment)
           setRecommendationSectionComment(response.data.probationFirstList[0].recommendationSectionComment)
           setEmpRecConfirm(response.data.probationFirstList[0].empRecConfirm)
           setEmpRecExtProb(response.data.probationFirstList[0].empRecExtProb)
           setEmpRecTerminate(response.data.probationFirstList[0].empRecTerminate)

           

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

  const pushToMDFD = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    let data={
      MDcomment:MDFDRemark
    }

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Update Contract Form and Push",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          setDisableBtn(true)
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/fdapprovecontract/${props.location.state[0].datum[0].contractNo}`,
            data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data);
          setDisableBtn(false)
          swal("Success!", "Contract Form Updated/Pushed", "success");
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

  const RejectProbation = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    let data={
      MDcomment:MDFDRemark
    }

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Reject Contract Form and Push",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          setDisableBtn(true)
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/fdrejectcontract/${props.location.state[0].datum[0].contractNo}`,
            data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data);
          setDisableBtn(false)
          swal("Success!", "Contract Form Rejected/Pushed", "success");
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


  //Push first segment
  const uploadRecomSection = (e)=>{
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(secureLocalStorage.getItem("userDetails"))
        }`,
      },
    };

    let data ={
      EmployeeStrongestPoint:empStrongestpt,
      EmployeeWeakestPoint:empWeakestPt,
      EmployeeQualifiedForPromo:qualifiedPromo,
      PromoPosition:promoPstn,
      PromotableInTheFuture:promotable,
      EffectiveDifferentAssignment:effectiveWithDifferent,
      WhichAssignment:differentAssingment,
      AdditionalComment:recommendationSectionComment,
      confirm:empRecConfirm,
      Extend:empRecExtProb,
      Terminate:empRecTerminate
    }
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Upload",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/fdapproveprobation/${props.location.state[0].datum[0].probationNo}`,
            data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          // =>console.log(response.data);
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
  }

    //View Attached Document
    const viewSupportingDoc = () => {
      const config = {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${
            JSON.parse(secureLocalStorage.getItem("userDetails"))
          }`,
        },
      };
      axios
        .get(
          `${process.env.REACT_APP_API_S_LINK}/home/getmonitoring/${props.location.state[0].datum[0].contractNo}`,
          config
        )
  
        .then(function (response) {
          if (response.status === 200) {
            const file = new Blob([response.data], { type: "application/pdf" });
            //Build a URL from the file
            const fileURL = URL.createObjectURL(file);
            //Open the URL on new Window
            const pdfWindow = window.open();
            pdfWindow.location.href = fileURL;
          }
        })
        .catch((err) => {
          if (err !== undefined) {
            swal("Oops!", "Document Missing/Fetch Failed", "error");
          }
  
          if (err.response !== undefined) {
            swal("Oh!", err.response.data.message, "error");
          } else {
            swal("Oh!", err.message, "error");
          }
  
          console.log({ err: err });
        });
    }
    

  let btnUP = "";
  let sectionOne = "";
  if (props.location.state[0].datum[0].status === 'Open') {
    btnUP = (
      <button className="btn btn-success" onClick={pushToMDFD} disabled={disableBtn}>
       Approve
      </button>
    );
    sectionOne=(
      <button className="btn btn-warning" onClick={RejectProbation} disabled={disableBtn}>
      Reject <i className="fa fa-times"></i>
     </button>
    );
  } else if (props.location.state[0].datum[0].status === 'Approved') {
    btnUP = <button className="btn btn-secondary">Form Pushed Already</button>;
  }



  if (loading) {
    return (
      <>
        <div className="container">
          <div className="headerDiv2 text-center">
            <h4 className="">END OF CONTRACT REPORT Loading</h4>
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
        <Accordion defaultActiveKey={["0"]} alwaysOpen>
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
            <div className="card-body">
            <div className="row">
              <div className="col-xl-6 col-sm-6">
                <div className="form-group">
                  <label htmlFor="">Employee</label>
                  <input type="text" className="form-control" value={selectedEmp} disabled />
                  
                </div>
              </div>

              <div className="col-xl-6 col-sm-6">
                <div className="form-group">
                  <label htmlFor="">Manager</label>
                  
                  <input type="text" className="form-control" value={selectedMgr} disabled />
                </div>
              </div>
             

              
            </div>
          </div>

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
                        value={outstanding}
                        onChange={(e) => setOutstanding(outstanding)}
                        checked={outstanding}
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
                        checked={aboveAverage}
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
                        checked={satisfactory}
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
                        checked={marginal}
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
                  <div className="form-group">
                    <textarea
                    disabled
                      className="w-100 form-control"
                      name="performanceComment"
                      rows="2"
                      placeholder="Comment"
                      value={performanceComment}
                      onChange={(e) => setPerformanceComment(e.target.value)}
                    ></textarea>
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
                        checked={excellentAttendance}
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
                        checked={occasionalAbsence}
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
                        checked={repeatedAbsence}
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
                        checked={unjustifiedAbsence}
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
                      disabled
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
                        checked={alwaysInterested}
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
                        checked={reasonablyDevoted}
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
                        checked={passiveAttitude}
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
                        checked={activeDislikeofWork}
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
                      disabled
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
                        checked={alwaysNeat}
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
                        checked={generallyNeat}
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
                        checked={sometimesCareles}
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
                        checked={attirenotSuitable}
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
                      disabled
                    ></textarea>
                  </div>
                </div>

              </div>
              <div className="row">
                <div className="col-md-12">
                <div className="form-group">
                   {/* {sectionOne} */}
                  </div>
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
                      What do you consider to be the employee’s weakest points?
                    </label>
                    <textarea
                      className="w-100 form-control"
                      name="empWeakestPt"
                      rows="2"
                      placeholder="Summary 240 characters"
                      value={empWeakestPt}
                      onChange={(e) => setEmpWeakestPt(e.target.value)}
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
                      value={qualifiedPromo}
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
                      value={promotable}
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
                      value={effectiveWithDifferent}
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
                  <label foo="">Additional Comment </label>
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
                <div className="col-md-12">
                  {/* <button className="btn btn-warning" onClick={uploadRecomSection}>
                    upload this Section
                  </button> */}
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
                    <label foo="">
                      HR Remarks
                    </label>
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
                    <label foo="">
                      MD/FD Remarks
                    </label>
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
                <div className="col-md-12">
              
              <div className="form-group">
               <label htmlFor=""> Action</label>
               <button
                 className="form-control btn btn-info rounded-0"
                 onClick={viewSupportingDoc}
               >
                 View Supporting Doc <i className="fa fa-file-pdf-o"></i>
               </button>
             </div>
           </div>
              
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="card-footer">
          <div className="text-right">{btnUP} {sectionOne}</div>
        </div>
      </div>
    </>
  );
};

export default withRouter(FDContractCard);
