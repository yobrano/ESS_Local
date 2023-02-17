import axios from "axios";
import { useEffect } from "react";
import { Fragment } from "react";
import { useState } from "react";
import { withRouter } from "react-router-dom";

const LeaveStatistic = () => {
  const [leaveData, setleaveData] = useState([]);
  const [loadingLeaves, setLoadingLeaves] = useState(true);

  useEffect(() => {
    LeaveTypes();
  }, []);

  const LeaveTypes = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/leave/getstaffleavebalance`,
        config
      )
      .then((result) => {
        console.log(result.data.leaveTypeList);
        setleaveData(result.data.leaveTypeList);
        setLoadingLeaves(false);
        // setPending(result.data.pendingCount);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let leaveplaceholder = "";
  if (loadingLeaves) {
    leaveplaceholder = (
      <>
        <div id="preloader-home mb-4">
          <div
            className="sk-three-bounce"
            style={{ backgroundColor: "#f9f9f9" }}
          >
            <div className="sk-child sk-bounce1"></div>
            <div className="sk-child sk-bounce2"></div>
            <div className="sk-child sk-bounce3"></div>
          </div>
        </div>
      </>
    );
  } else {
    leaveplaceholder = (
      <div className="table-responsive">
        <table
          id="example"
          className="display w-100 dataTable table"
          role="grid"
          aria-describedby="example_info"
        >
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>Leave Type</th>
              <th>Leave Balance (Days)</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {leaveData.map((d, i) => (
              <tr key={i}>
                <td>{++i}</td>
                <td>{d.value}</td>
                <td>{d.leavebalance}</td>
                <td>{d.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="row my-3">
        <div className="col-md-12">{leaveplaceholder}</div>
      </div>
    </Fragment>
  );
};
export default withRouter(LeaveStatistic);
