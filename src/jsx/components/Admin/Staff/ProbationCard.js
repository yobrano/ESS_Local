import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "./ExitForm.css";
import axios from "axios";
import swal from "sweetalert";

const ProbationCard = (props) => {
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
  const [managerRemark, setManagerRemark] = useState("");
  const [MDFDRemark, setMDFDRemark] = useState("");
  const [supportingfile, setSupportingfile] = useState("");

  const [probationTime, setProbationTime] = useState("");
  const [skills, setSkills] = useState("");

  const [immediateStatus,setImmediateStatus] = useState(false)

  //Additional Fields
  const [jobTitle, setJobTitle] = useState("");
  const [branch, setBranch] = useState("");
  const [product, setProduct] = useState("");
  const [employmentYear, setEmploymentYear] = useState("");
  const [yearsOfService, setYearsOfService] = useState("");

  //Error alerts
  const [alrtone, setAlrtone] = useState('alrt-border-1 border-0 border-danger p-3 rounded');
  const [alrttwo, setAlrttwo] = useState('alrt-border-2 border-0 border-danger p-3 rounded');
  const [alrtthree, setAlrtthree] = useState('alrt-border-3 border-0 border-danger p-3 rounded');
  const [alrtfour, setAlrtfour] = useState('alrt-border-4 border-0 border-danger p-3 rounded');

  const [alrtfive, setAlrtfive] = useState('alrt-border-1 border-0 border-danger p-3 rounded');
  const [alrtsix, setAlrtsix] = useState('alrt-border-2 border-0 border-danger p-3 rounded');
  const [alrtseven, setAlrtseven] = useState('alrt-border-3 border-0 border-danger p-3 rounded');
  const [alrteight, setAlrteight] = useState('alrt-border-4 border-0 border-danger p-3 rounded');
  const [alrtnine, setAlrtnine] = useState('alrt-border-4 border-0 border-danger p-3 rounded');
  const [alrtten, setAlrtten] = useState('alrt-border-4 border-0 border-danger p-3 rounded');
  const [alrteleven, setAlrteleven] = useState('alrt-border-4 border-0 border-danger p-3 rounded');
  const [alrttwelve, setAlrttwelve] = useState('alrt-border-4 border-0 border-danger p-3 rounded');
  const [alrtthirteen, setAlrtthirteen] = useState('alrt-border-4 border-0 border-danger p-3 rounded');
  const [alrtfourteen, setAlrtfourteen] = useState('alrt-border-4 border-0 border-danger p-3 rounded');
  const [alrtfifteen, setAlrtfifteen] = useState('alrt-border-4 border-0 border-danger p-3 rounded');
  const [alrtsixteen, setAlrtsixteen] = useState('alrt-border-4 border-0 border-danger p-3 rounded');
  const [alrtseventeen, setAlrtseventeen] = useState('alrt-border-4 border-0 border-danger p-3 rounded');
  const [alrteightteen, setAlrteightteen] = useState('alrt-border-4 border-0 border-danger p-3 rounded');


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
        `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/getprobationcard/${props.location.state[0].datum[0].probationNo}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          setProbationTime(props.location.state[0].datum[0].supervisionTime)
          setSkills(props.location.state[0].datum[0].importantSkills)

          setJobTitle(response.data.employeeEndofForms[0].jobtitle)
          setBranch(response.data.employeeEndofForms[0].branch)
          setProduct(response.data.employeeEndofForms[0].product)
          setEmploymentYear(response.data.employeeEndofForms[0].employmentyear)
          setYearsOfService(response.data.employeeEndofForms[0].tenureofservice)

          setLoading(false);

        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
        }
      })
      .catch((err) => {
        swal("Oh!", err.data.message, "error");
      });
  }, []);

  const updateCard = (e) => {
    
    e.preventDefault();

    let error;
    if (recommendationSectionComment === "") {
      setAlrteightteen('alrt-border-4 border border-danger p-3 m-2 rounded')
      error = true;
    }else{
      setAlrteightteen('alrt-border-4 border-0 border-danger p-3 m-2 rounded')
      error = false;
    }


    if (error) {
      swal("Oops!", "Immediate Supervisor Comment is missing", "error");
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Update Probation Form",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        if (willCreate) {
          return axios.get(
            `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/moveprobationfromsupervisortohod/${props.location.state[0].datum[0].probationNo}`,
            // data,
            config
          );
        }
      })

      .then(function (response) {
        if (response.status === 200) {
          swal("Success!", "Probation Form Moved", "success");
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
  const uploadFirstSegmentCard = (e) => {
    e.preventDefault();

    let error=false;
    if ((outstanding === false && aboveAverage === false && satisfactory === false && marginal === false && unsatisfactory === false ) ) {
      setAlrtone('alrt-border-1 border border-danger p-3 m-2 rounded')
      error = true;
    }else{
      setAlrtone('alrt-border-1 border-0 border-danger p-3 m-2 rounded')
      error = false;
    }

    if ((excellentAttendance === false || occasionalAbsence === false || repeatedAbsence === false || unjustifiedAbsence === false) && (attendanceComment === "") ) {
      setAlrttwo('alrt-border-2 border border-danger p-3 m-2 rounded')
      error = true;
    }else{
      setAlrttwo('alrt-border-2 border-0 border-danger p-3 m-2 rounded')
  
      error = false;
    }

    if ((alwaysInterested === false || reasonablyDevoted === false || passiveAttitude === false || activeDislikeofWork === false) && (attitudeComment === "") ) {
      setAlrtthree('alrt-border-3 border border-danger p-3 m-2 rounded')
      error = true;
    }else{
      setAlrtthree('alrt-border-3 border-0 border-danger p-3 m-2 rounded')
      error = false;
    }

    if ((alwaysNeat === false ||  generallyNeat === false ||  sometimesCareles === false ||  attirenotSuitable === false) &&  (appearanceComment === "" )) {
      setAlrtfour('alrt-border-4 border border-danger p-3 m-2 rounded')
      error = true;
    }else{
      setAlrtfour('alrt-border-4 border-0 border-danger p-3 m-2 rounded')
      error = false;
    }
    if ((selfStarter === false ||  needsStimilus === false ||  needsCSupervision === false ||  showNoInitiative === false) &&  (initiativeComment === "" )) {
      setAlrtfive('alrt-border-4 border border-danger p-3 m-2 rounded')
      error = true;
    }else{
      setAlrtfive('alrt-border-4 border-0 border-danger p-3 m-2 rounded')
      error = false;
    }

    if ((alwayOnTime === false ||  occasionallyLate === false ||  repeatedLate === false ||  rarelyOnTime === false) &&  (dependabilityComment === "" )) {
      setAlrtsix('alrt-border-4 border border-danger p-3 m-2 rounded')
      error = true;
    }else{
      setAlrtsix('alrt-border-4 border-0 border-danger p-3 m-2 rounded')
      error = false;
    }

    if ((decisionLogical === false ||  genSoundJudgment === false ||  reqFreqCorrection === false ||  judgmentOftenFaulty === false) &&  (judmentComment === "" )) {
      setAlrtseven('alrt-border-4 border border-danger p-3 m-2 rounded')
      error = true;
    }else{
      setAlrtseven('alrt-border-4 border-0 border-danger p-3 m-2 rounded')
      error = false;
    }

    if ((rarelyMakesErrs === false ||  fewErrThanMost === false ||  avgAccuracy === false ||  unacceptablyErratic === false) &&  (attentionToDetailComment === "" )) {
      setAlrteight('alrt-border-4 border border-danger p-3 m-2 rounded')
      error = true;
    }else{
      setAlrteight('alrt-border-4 border-0 border-danger p-3 m-2 rounded')
      error = false;
    }

    if ((friendlyOutgoing === false ||  somewhatBusinesslike === false ||  gregariousToPoint === false ||  sullenAndWithdrawn === false) &&  (interpersonalComment === "" )) {
      setAlrtnine('alrt-border-4 border border-danger p-3 m-2 rounded')
      error = true;
    }else{
      setAlrtnine('alrt-border-4 border-0 border-danger p-3 m-2 rounded')
      error = false;
    }

    if ((alwayscourteousTactful === false ||  genCourteous === false ||  sometimesIncosiderate === false ||  arouseAntagonism === false) &&  (mannersComment === "" )) {
      setAlrtten('alrt-border-4 border border-danger p-3 m-2 rounded')
      error = true;
    }else{
      setAlrtten('alrt-border-4 border-0 border-danger p-3 m-2 rounded')
      error = false;
    }

    if ((seeksAddResponsibility === false ||  willinglyAcceptResp === false ||  assumesWhenUnavoidable === false ||  alwaysAvoidResponsibility === false) &&  (responsiblityComment === "" )) {
      setAlrteleven('alrt-border-4 border border-danger p-3 m-2 rounded')
      error = true;
    }else{
      setAlrteleven('alrt-border-4 border-0 border-danger p-3 m-2 rounded')
      error = false;
    }

    if ((graspImmediately === false ||  quickerThanAvg === false ||  avgLearning === false ||  slowLearner === false ||  unableToGraspNew === false) &&  (learningCampacityComment === "" )) {
      setAlrttwelve('alrt-border-4 border border-danger p-3 m-2 rounded')
      error = true;
    }else{
      setAlrttwelve('alrt-border-4 border-0 border-danger p-3 m-2 rounded')
      error = false;
    }

    if ((excepHighProductivity === false ||  completeMoreThanAvg === false ||  adequatePerHr === false ||  inadequateOutput === false) &&  (outputComment === "" )) {
      setAlrtthirteen('alrt-border-4 border border-danger p-3 m-2 rounded')
      error = true;
    }else{
      setAlrtthirteen('alrt-border-4 border-0 border-danger p-3 m-2 rounded')
      error = false;
    }

    if ((assumesLeadershipInit === false ||  willLeadEncouraged === false ||  canLeadifNecessary === false ||  refusesLeadership === false ||  attemptbutInefficient === false) &&  (leadershipComment === "" )) {
      setAlrtfourteen('alrt-border-4 border border-danger p-3 m-2 rounded')
      error = true;
    }else{
      setAlrtfourteen('alrt-border-4 border-0 border-danger p-3 m-2 rounded')
      error = false;
    }

    if ((neverFalter === false ||  maintainPoise === false ||  dependableExcUnderPress === false ||  cantTakePressure === false) &&  (pressureComment === "" )) {
      setAlrtfifteen('alrt-border-4 border border-danger p-3 m-2 rounded')
      error = true;
    }else{
      setAlrtfifteen('alrt-border-4 border-0 border-danger p-3 m-2 rounded')
      error = false;
    }


    if (error) {
      swal("Oops!", "Comment(s) field empty", "error");
      return;
    }


    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    let data ={
      PerformanceComment:performanceComment,
      AttendanceComment:attendanceComment,
      AttitudeComment:attitudeComment,
      AppearanceComment:appearanceComment,
      InitiativeComment:initiativeComment,
      DependabilityComment:dependabilityComment,
      JudmentComment:judmentComment,
      AttentionToDetailComment:attentionToDetailComment,
      InterpersonalComment:interpersonalComment,
      MannersComment:mannersComment,
      ResponsiblityComment:responsiblityComment,
      LearningCampacityComment:learningCampacityComment,
      OutputComment:outputComment,
      LeadershipComment:leadershipComment,
      PressureComment:pressureComment,

      Outstanding:outstanding,
      AboveAverage:aboveAverage,
      Satisfactory:satisfactory,
      Marginal:marginal,
      Unsatisfactory:unsatisfactory,

      ExcellentAttendance:excellentAttendance,
      OccasionalAbsence:occasionalAbsence,
      RepeatedAbsence:repeatedAbsence,
      UnjustifiedAbsence:unjustifiedAbsence,

      AlwaysInterested:alwaysInterested,
      ReasonablyDevoted:reasonablyDevoted,
      PassiveAttitude:passiveAttitude,
      ActiveDislikeofWork:activeDislikeofWork,

      AlwaysNeat:alwaysNeat,
      GenerallyNeat:generallyNeat,
      SometimesCareles:sometimesCareles,
      AttirenotSuitable:attirenotSuitable,

      SelfStarter:selfStarter,
      NeedsStimilus:needsStimilus,
      NeedsCSupervision:needsCSupervision,
      ShowNoInitiative:showNoInitiative,

      AlwayOnTime:alwayOnTime,
      OccasionallyLate:occasionallyLate,
      RepeatedLate:repeatedLate,
      RarelyOnTime:rarelyOnTime,

      DecisionLogical:decisionLogical,
      GenSoundJudgment:genSoundJudgment,
      ReqFreqCorrection:reqFreqCorrection,
      JudgmentOftenFaulty:judgmentOftenFaulty,

      RarelyMakesErrs:rarelyMakesErrs,
      FewErrThanMost:fewErrThanMost,
      AvgAccuracy:avgAccuracy,
      UnacceptablyErratic:unacceptablyErratic,

      FriendlyOutgoing:friendlyOutgoing,
      SomewhatBusinesslike:somewhatBusinesslike,
      GregariousToPoint:gregariousToPoint,
      SullenAndWithdrawn:sullenAndWithdrawn,

      AlwayscourteousTactful:alwayscourteousTactful,
      GenCourteous:genCourteous,
      SometimesIncosiderate:sometimesIncosiderate,
      ArouseAntagonism:arouseAntagonism,

      SeeksAddResponsibility:seeksAddResponsibility,
      WillinglyAcceptResp:willinglyAcceptResp,
      AssumesWhenUnavoidable:assumesWhenUnavoidable,
      AlwaysAvoidResponsibility:alwaysAvoidResponsibility,

      GraspImmediately:graspImmediately,
      QuickerThanAvg:quickerThanAvg,
      AvgLearning:avgLearning,
      SlowLearner:slowLearner,
      UnableToGraspNew:unableToGraspNew,

      ExcepHighProductivity:excepHighProductivity,
      CompleteMoreThanAvg:completeMoreThanAvg,
      AdequatePerHr:adequatePerHr,
      InadequateOutput:inadequateOutput,

      AssumesLeadershipInit:assumesLeadershipInit,
      WillLeadEncouraged:willLeadEncouraged,
      CanLeadifNecessary:canLeadifNecessary,
      RefusesLeadership:refusesLeadership,
      AttemptbutInefficient:attemptbutInefficient,

      NeverFalter:neverFalter,
      MaintainPoise:maintainPoise,
      DependableExcUnderPress:dependableExcUnderPress,
      CantTakePressure:cantTakePressure,

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
            `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/uploadprobationsectionone/${props.location.state[0].datum[0].probationNo}`,
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

  const uploadRecomSection = (e)=>{
    e.preventDefault();
    let error;
    if (empStrongestpt === "" ) {
      setAlrtsixteen('alrt-border-4 border border-danger p-3 m-2 rounded')
      error = true;
    }else{
      setAlrtsixteen('alrt-border-4 border-0 border-danger p-3 m-2 rounded')
      error = false;
    }

    if (empWeakestPt === "" ) {
      setAlrtseventeen('alrt-border-4 border border-danger p-3 m-2 rounded')
      error = true;
    }else{
      setAlrtseventeen('alrt-border-4 border-0 border-danger p-3 m-2 rounded')
      error = false;
    }

    if (recommendationSectionComment === "") {
      setAlrteightteen('alrt-border-4 border border-danger p-3 m-2 rounded')
      error = true;
    }else{
      setAlrteightteen('alrt-border-4 border-0 border-danger p-3 m-2 rounded')
      error = false;
    }


    if (error) {
      swal("Oops!", "Comment(s) field empty", "error");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
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
            `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/uploadprobationrecommendation/${props.location.state[0].datum[0].probationNo}`,
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
  }

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
          `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/hoduploadprobationdocs/${props.location.state[0].datum[0].probationNo}`,
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
          if(err.response!==undefined){
            swal("Oh!", err.response.data.message, "error");
          }else{
            swal("Oh!", err.message, "error");
          }
          console.log({ err: err });
          // swal("Oops!", "Seems like we couldn't Upload the file", "error");
        });
    }
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
      ProbationNo: props.location.state[0].datum[0].probationNo,
      SupervisionTime: probationTime,
      ImportantSkills: skills,
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
            `${process.env.REACT_APP_API_S_LINK}/endofmonitoringandcontract/v1/storeprobationcreatefirstsection`,
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

  let btnUP = "";
  let sectionOne = "";
  if (props.location.state[0].datum[0].status === 'Open') {
    btnUP = (
      <button className="btn btn-success" onClick={updateCard}>
       Push The Form
      </button>
    );
    sectionOne=(
      <button className="btn btn-warning" onClick={uploadFirstSegmentCard}>
      Upload this section
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
            <h4 className="">Probation Card Loading</h4>
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
      <h4 className="text-center">EMPLOYEE’S PROGRESS REPORT (PROBATIONARY)</h4>
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
                <div className="col-md-4">
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
                <div className="col-md-4">
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
              
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">Job Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={jobTitle}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">Branch</label>
                    <input
                      type="text"
                      className="form-control"
                      value={branch}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">Product</label>
                    <input
                      type="text"
                      className="form-control"
                      value={product}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">Year of Employment</label>
                    <input
                      type="text"
                      className="form-control"
                      value={employmentYear}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="">Tenure of Service</label>
                    <input
                      type="text"
                      className="form-control"
                      value={yearsOfService}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-xl-12 col-sm-6">
                  <div className="form-group">
                    <label htmlFor=""> How long have you supervised the Employee</label>
                    <textarea
                      className="form-control"
                      cols="30"
                      rows="3"
                      name="Howlongs"
                      placeholder="How long have you been supervising this employee? (max 240 characters)"
                      value={probationTime}
                      onChange={(e) => setProbationTime(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                <div className="col-xl-6 col-sm-6">
                  <div className="form-group">
                    <label htmlFor="">Skills</label>
                    <textarea
                      className="form-control"
                      cols="30"
                      rows="3"
                      name="Howlongs"
                      placeholder="What skills are most important for performing this Job (max 240 characters)"
                      value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    ></textarea>
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
                  <div className={alrtone}>
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
             
                  {/* <div className="form-group">
                    <textarea
                      className="w-100 form-control"
                      name="performanceComment"
                      rows="2"
                      placeholder="Comment"
                      value={performanceComment}
                      onChange={(e) => setPerformanceComment(e.target.value)}
                    ></textarea>
                  </div> */}
                </div>

                <div className="col-md-6">
                  <div className={alrttwo}>
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
                 
                </div>
                <div className="col-md-6">
                  <div className={alrtthree}>
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
                </div>

                <div className="col-md-6">
                  <div className={alrtfour}>
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

                <div className="col-md-6">
                  <div className={alrtfive}>
                    <div className="form-group">
                      <label foo="" className="b-2">
                        Initiative
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="selfStarter"
                          id="appropdressd"
                          value={selfStarter}
                          onChange={(e) => setSelfStarter(!selfStarter)}
                        />
                        <label className="form-check-label" foo="appropdressd">
                          Self-starter-always finds work
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="needsStimilus"
                          id="genapproderss"
                          value={needsStimilus}
                          onChange={(e) => setNeedsStimilus(!needsStimilus)}
                        />
                        <label className="form-check-label" foo="genapproderss">
                          Needs an occasional stimulus
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="needsCSupervision"
                          id="somejtapp"
                          value={needsCSupervision}
                          onChange={(e) =>
                            setNeedsCSupervision(!needsCSupervision)
                          }
                        />
                        <label className="form-check-label" foo="somejtapp">
                          Needs constant supervision
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="showNoInitiative"
                          id="ErPosition"
                          value={showNoInitiative}
                          onChange={(e) => setShowNoInitiative(!showNoInitiative)}
                        />
                        <label className="form-check-label" foo="ErPosition">
                          Shows no initiative
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea
                        className="w-100 form-control"
                        name="appearanceComment"
                        rows="2"
                        placeholder="Comment"
                        value={initiativeComment}
                        onChange={(e) => setInitiativeComment(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                 
                </div>

                <div className="col-md-6">
                  <div className={alrtsix}>
                    <div className="form-group">
                      <label foo="" className="b-2">
                        Dependability
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="alwayOnTime"
                          id="appropdressd"
                          value={alwayOnTime}
                          onChange={(e) => setAlwayOnTime(!alwayOnTime)}
                        />
                        <label className="form-check-label" foo="appropdressd">
                          Always on time
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="occasionallyLate"
                          id="genapproderss"
                          value={occasionallyLate}
                          onChange={(e) => setOccasionallyLate(!occasionallyLate)}
                        />
                        <label className="form-check-label" foo="genapproderss">
                          Occasionally late
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="repeatedLate"
                          id="somejtapp"
                          value={repeatedLate}
                          onChange={(e) => setRepeatedLate(!repeatedLate)}
                        />
                        <label className="form-check-label" foo="somejtapp">
                          Repeatedly late
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="rarelyOnTime"
                          id="ErPosition"
                          value={rarelyOnTime}
                          onChange={(e) => setRarelyOnTime(!rarelyOnTime)}
                        />
                        <label className="form-check-label" foo="ErPosition">
                          Rarely on time
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea
                        className="w-100 form-control"
                        name="appearanceComment"
                        rows="2"
                        placeholder="Comment"
                        value={dependabilityComment}
                        onChange={(e) => setDependabilityComment(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
             
                </div>

                <div className="col-md-6">
                  <div className={alrtseven}>
                    <div className="form-group">
                      <label foo="" className="b-2">
                        Judgement
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="decisionLogical"
                          id="appropdressd"
                          value={decisionLogical}
                          onChange={(e) => setDecisionLogical(!decisionLogical)}
                        />
                        <label className="form-check-label" foo="appropdressd">
                          Decisions always sound and logical
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="genSoundJudgment"
                          id="genapproderss"
                          value={genSoundJudgment}
                          onChange={(e) => setGenSoundJudgment(!genSoundJudgment)}
                        />
                        <label className="form-check-label" foo="genapproderss">
                          Generally sound judgment
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="reqFreqCorrection"
                          id="somejtapp"
                          value={reqFreqCorrection}
                          onChange={(e) =>
                            setReqFreqCorrection(!reqFreqCorrection)
                          }
                        />
                        <label className="form-check-label" foo="somejtapp">
                          Requires frequent correction
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="judgmentOftenFaulty"
                          id="ErPosition"
                          value={judgmentOftenFaulty}
                          onChange={(e) =>
                            setJudgmentOftenFaulty(!judgmentOftenFaulty)
                          }
                        />
                        <label className="form-check-label" foo="ErPosition">
                          Judgment too often faulty
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea
                        className="w-100 form-control"
                        name="appearanceComment"
                        rows="2"
                        placeholder="Comment"
                        value={judmentComment}
                        onChange={(e) => setJudmentComment(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className={alrteight}>
                    <div className="form-group">
                      <label foo="" className="b-2">
                        Attention to detail
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="rarelyMakesErrs"
                          id="appropdressd"
                          value={rarelyMakesErrs}
                          onChange={(e) => setRarelyMakesErrs(!rarelyMakesErrs)}
                        />
                        <label className="form-check-label" foo="appropdressd">
                          Rarely or never makes errors
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="fewErrThanMost"
                          id="genapproderss"
                          value={fewErrThanMost}
                          onChange={(e) => setFewErrThanMost(!fewErrThanMost)}
                        />
                        <label className="form-check-label" foo="genapproderss">
                          Fewer errors than most
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="avgAccuracy"
                          id="somejtapp"
                          value={avgAccuracy}
                          onChange={(e) => setAvgAccuracy(!avgAccuracy)}
                        />
                        <label className="form-check-label" foo="somejtapp">
                          Average accuracy
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="unacceptablyErratic"
                          id="ErPosition"
                          value={unacceptablyErratic}
                          onChange={(e) =>
                            setUnacceptablyErratic(!unacceptablyErratic)
                          }
                        />
                        <label className="form-check-label" foo="ErPosition">
                          Unacceptably erratic
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea
                        className="w-100 form-control"
                        name="appearanceComment"
                        rows="2"
                        placeholder="Comment"
                        value={attentionToDetailComment}
                        onChange={(e) =>
                          setAttentionToDetailComment(e.target.value)
                        }
                      ></textarea>
                    </div>
                  </div>
               
                </div>

              

                <div className="col-md-6">
                  <div className={alrtnine}>
                    <div className="form-group">
                      <label foo="" className="b-2">
                        Interpersonal Relations
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="friendlyOutgoing"
                          id="appropdressd"
                          value={friendlyOutgoing}
                          onChange={(e) => setFriendlyOutgoing(!friendlyOutgoing)}
                        />
                        <label className="form-check-label" foo="appropdressd">
                          Friendly and outgoing but businesslike
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="somewhatBusinesslike"
                          id="genapproderss"
                          value={somewhatBusinesslike}
                          onChange={(e) =>
                            setSomewhatBusinesslike(!somewhatBusinesslike)
                          }
                        />
                        <label className="form-check-label" foo="genapproderss">
                          Somewhat aloof but businesslike
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="gregariousToPoint"
                          id="somejtapp"
                          value={gregariousToPoint}
                          onChange={(e) =>
                            setGregariousToPoint(!gregariousToPoint)
                          }
                        />
                        <label className="form-check-label" foo="somejtapp">
                          Gregarious to the point of distracting others
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="sullenAndWithdrawn"
                          id="ErPosition"
                          value={sullenAndWithdrawn}
                          onChange={(e) =>
                            setSullenAndWithdrawn(!sullenAndWithdrawn)
                          }
                        />
                        <label className="form-check-label" foo="ErPosition">
                          Sullen and withdrawn
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea
                        className="w-100 form-control"
                        name="appearanceComment"
                        rows="2"
                        placeholder="Comment"
                        value={interpersonalComment}
                        onChange={(e) => setInterpersonalComment(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                
                </div>

                <div className="col-md-6">
                  <div className={alrtten}>
                    <div className="form-group">
                      <label foo="" className="b-2">
                        Manners
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="alwayscourteousTactful"
                          id="appropdressd"
                          value={alwayscourteousTactful}
                          onChange={(e) =>
                            setAlwayscourteousTactful(!alwayscourteousTactful)
                          }
                        />
                        <label className="form-check-label" foo="appropdressd">
                          Always courteous and tactful
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="genCourteous"
                          id="genapproderss"
                          value={genCourteous}
                          onChange={(e) => setGenCourteous(!genCourteous)}
                        />
                        <label className="form-check-label" foo="genapproderss">
                          Generally courteous and tactful
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="sometimesIncosiderate"
                          id="somejtapp"
                          value={sometimesIncosiderate}
                          onChange={(e) =>
                            setSometimesIncosiderate(!sometimesIncosiderate)
                          }
                        />
                        <label className="form-check-label" foo="somejtapp">
                          Sometimes inconsiderable
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="arouseAntagonism"
                          id="ErPosition"
                          value={arouseAntagonism}
                          onChange={(e) => setArouseAntagonism(!arouseAntagonism)}
                        />
                        <label className="form-check-label" foo="ErPosition">
                          Arouses definite antagonism
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea
                        className="w-100 form-control"
                        name="mannersComment"
                        rows="2"
                        placeholder="Comment"
                        value={mannersComment}
                        onChange={(e) => setMannersComment(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                 
                </div>

                <div className="col-md-6">
                  <div className={alrteleven}>
                    <div className="form-group">
                      <label foo="" className="b-2">
                        Responsibility
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="seeksAddResponsibility"
                          id="appropdressd"
                          value={seeksAddResponsibility}
                          onChange={(e) =>
                            setSeeksAddResponsibility(!seeksAddResponsibility)
                          }
                        />
                        <label className="form-check-label" foo="appropdressd">
                          Seeks additional responsibility
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="willinglyAcceptResp"
                          id="genapproderss"
                          value={willinglyAcceptResp}
                          onChange={(e) =>
                            setWillinglyAcceptResp(!willinglyAcceptResp)
                          }
                        />
                        <label className="form-check-label" foo="genapproderss">
                          Willingly accepts responsibility when offered
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="assumesWhenUnavoidable"
                          id="somejtapp"
                          value={assumesWhenUnavoidable}
                          onChange={(e) =>
                            setAssumesWhenUnavoidable(!assumesWhenUnavoidable)
                          }
                        />
                        <label className="form-check-label" foo="somejtapp">
                          Assumes responsibility only when unavoidable
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="alwaysAvoidResponsibility"
                          id="ErPosition"
                          value={alwaysAvoidResponsibility}
                          onChange={(e) =>
                            setAlwaysAvoidResponsibility(
                              !alwaysAvoidResponsibility
                            )
                          }
                        />
                        <label className="form-check-label" foo="ErPosition">
                          Always avoids responsibility
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea
                        className="w-100 form-control"
                        name="responsiblityComment"
                        rows="2"
                        placeholder="Comment"
                        value={responsiblityComment}
                        onChange={(e) => setResponsiblityComment(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
              
                </div>

                <div className="col-md-6">
                  <div className={alrttwelve}>
                    <div className="form-group">
                      <label foo="" className="b-2">
                        Learning Capacity
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="graspImmediately"
                          id="appropdressd"
                          value={graspImmediately}
                          onChange={(e) => setGraspImmediately(!graspImmediately)}
                        />
                        <label className="form-check-label" foo="appropdressd">
                          Grasps new methods or material immediately
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="quickerThanAvg"
                          id="genapproderss"
                          value={quickerThanAvg}
                          onChange={(e) => setQuickerThanAvg(!quickerThanAvg)}
                        />
                        <label className="form-check-label" foo="genapproderss">
                          Learns quicker than average
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="avgLearning"
                          id="somejtapp"
                          value={avgLearning}
                          onChange={(e) => setAvgLearning(!avgLearning)}
                        />
                        <label className="form-check-label" foo="somejtapp">
                          Average learning ability
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="slowLearner"
                          id="ErPosition"
                          value={slowLearner}
                          onChange={(e) => setSlowLearner(!slowLearner)}
                        />
                        <label className="form-check-label" foo="ErPosition">
                          Slow learner – needs repeated instruction
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="unableToGraspNew"
                          id="ErPosition"
                          value={unableToGraspNew}
                          onChange={(e) => setUnableToGraspNew(!unableToGraspNew)}
                        />
                        <label className="form-check-label" foo="ErPosition">
                          Unable to grasp anything new
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea
                        className="w-100 form-control"
                        name="learningCampacityComment"
                        rows="2"
                        placeholder="Comment"
                        value={learningCampacityComment}
                        onChange={(e) =>
                          setLearningCampacityComment(e.target.value)
                        }
                      ></textarea>
                    </div>
                  </div>
               
                </div>

                <div className="col-md-6">
                  <div className={alrtthirteen}>
                    <div className="form-group">
                      <label foo="" className="b-2">
                        Output
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="excepHighProductivity"
                          id="appropdressd"
                          value={excepHighProductivity}
                          onChange={(e) =>
                            setExcepHighProductivity(!excepHighProductivity)
                          }
                        />
                        <label className="form-check-label" foo="appropdressd">
                          Exceptionally high productivity
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="completeMoreThanAvg"
                          id="genapproderss"
                          value={completeMoreThanAvg}
                          onChange={(e) =>
                            setCompleteMoreThanAvg(!completeMoreThanAvg)
                          }
                        />
                        <label className="form-check-label" foo="genapproderss">
                          Completes more than average
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="adequatePerHr"
                          id="somejtapp"
                          value={adequatePerHr}
                          onChange={(e) => setAdequatePerHr(!adequatePerHr)}
                        />
                        <label className="form-check-label" foo="somejtapp">
                          Adequate work per hour rate
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="inadequateOutput"
                          id="ErPosition"
                          value={inadequateOutput}
                          onChange={(e) => setInadequateOutput(!inadequateOutput)}
                        />
                        <label className="form-check-label" foo="ErPosition">
                          Inadequate output
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea
                        className="w-100 form-control"
                        name="outputComment"
                        rows="2"
                        placeholder="Comment"
                        value={outputComment}
                        onChange={(e) => setOutputComment(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                 
                </div>

                <div className="col-md-6">
                  <div className={alrtfourteen}>
                    <div className="form-group">
                      <label foo="" className="b-2">
                        Leadership
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="assumesLeadershipInit"
                          id="appropdressd"
                          value={assumesLeadershipInit}
                          onChange={(e) =>
                            setAssumesLeadershipInit(!assumesLeadershipInit)
                          }
                        />
                        <label className="form-check-label" foo="appropdressd">
                          Assumes leadership on own initiative
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="willLeadEncouraged"
                          id="genapproderss"
                          value={willLeadEncouraged}
                          onChange={(e) =>
                            setWillLeadEncouraged(!willLeadEncouraged)
                          }
                        />
                        <label className="form-check-label" foo="genapproderss">
                          Will lead if encouraged to do so
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="canLeadifNecessary"
                          id="somejtapp"
                          value={canLeadifNecessary}
                          onChange={(e) =>
                            setCanLeadifNecessary(!canLeadifNecessary)
                          }
                        />
                        <label className="form-check-label" foo="somejtapp">
                          Can lead if necessary, but prefers subordinate role
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="refusesLeadership"
                          id="ErPosition"
                          value={refusesLeadership}
                          onChange={(e) =>
                            setRefusesLeadership(!refusesLeadership)
                          }
                        />
                        <label className="form-check-label" foo="ErPosition">
                          Refuses to assume any leadership
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="attemptbutInefficient"
                          id="ErPosition"
                          value={attemptbutInefficient}
                          onChange={(e) =>
                            setAttemptbutInefficient(!attemptbutInefficient)
                          }
                        />
                        <label className="form-check-label" foo="ErPosition">
                          Attempts to lead, but ineffectively
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea
                        className="w-100 form-control"
                        name="leadershipComment"
                        rows="2"
                        placeholder="Comment"
                        value={leadershipComment}
                        onChange={(e) => setLeadershipComment(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
            
                </div>

                <div className="col-md-6">
                  <div className={alrtfifteen}>
                    <div className="form-group">
                      <label foo="" className="b-2">
                        Work under Pressure
                      </label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="neverFalter"
                          id="appropdressd"
                          value={neverFalter}
                          onChange={(e) => setNeverFalter(!neverFalter)}
                        />
                        <label className="form-check-label" foo="appropdressd">
                          Never falters even under extreme pressure
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="maintainPoise"
                          id="genapproderss"
                          value={maintainPoise}
                          onChange={(e) => setMaintainPoise(!maintainPoise)}
                        />
                        <label className="form-check-label" foo="genapproderss">
                          Maintains poise except under trying conditions
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="dependableExcUnderPress"
                          id="somejtapp"
                          value={dependableExcUnderPress}
                          onChange={(e) =>
                            setDependableExcUnderPress(!dependableExcUnderPress)
                          }
                        />
                        <label className="form-check-label" foo="somejtapp">
                          Dependable except under pressure
                        </label>
                      </div>

                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="cantTakePressure"
                          id="ErPosition"
                          value={cantTakePressure}
                          onChange={(e) => setCantTakePressure(!cantTakePressure)}
                        />
                        <label className="form-check-label" foo="ErPosition">
                          Can’t take normal pressure of job
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea
                        className="w-100 form-control"
                        name="pressureComment"
                        rows="3"
                        placeholder="Comment"
                        value={pressureComment}
                        onChange={(e) => setPressureComment(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
              

                
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                <div className="form-group">
                   {sectionOne}
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
                  <div className={alrtsixteen}>
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
                  
                </div>
                <div className="col-md-6">
                  <div className={alrtseventeen}>
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

                <div className="col-md-6">
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="empRecConfirm"
                        id="empRecConfirm"
                        value="true"
                        onChange={(e) => setEmpRecConfirm(!empRecConfirm)}
                      />
                      <label className="form-check-label" foo="empRecConfirm">
                        Confirm
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="empRecExtProb"
                        id="empRecExtProb"
                        value="true"
                        onChange={(e) => setEmpRecExtProb(!empRecExtProb)}
                      />
                      <label className="form-check-label" foo="empRecExtProb">
                        Extend Probation
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="empRecTerminate"
                        id="empRecTerminate"
                        value="true"
                        onChange={(e) => setEmpRecTerminate(!empRecTerminate)}
                      />
                      <label className="form-check-label" foo="empRecTerminate">
                        Terminate
                      </label>
                    </div>
                  </div>
                </div>
              

                <div className="col-md-12">
                  <div className={alrteightteen}>
                    <div className="form-group">
                    <label foo="">
                      <b> Immediate Supervisor Ramark</b>
                      </label>
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

                  <button className="btn btn-warning" onClick={uploadRecomSection}>
                    upload this Section
                  </button>
                </div>

              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2" className="d-block">
            <Accordion.Header>
              <div className="title mb-4">
                <span className="fs-18 text-black font-w600">
                HR, MD/FD Section
                </span>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="row">
              {/* <div className="col-md-12">
                  <div className="form-group">
                    <label foo="">
                      Immediate Manager
                    </label>
                    <textarea
                      className="w-100 form-control"
                      name="managerRemark"
                      rows="2"
                      placeholder="Summary 240 characters"
                      value={managerRemark}
                      onChange={(e) => setManagerRemark(e.target.value)}
                    ></textarea>
                      {immediateStatus && (
                            <div className="text-danger fs-12">
                              This field is Mandatory
                            </div>
                          )}
                  </div>
                </div> */}
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

export default withRouter(ProbationCard);
