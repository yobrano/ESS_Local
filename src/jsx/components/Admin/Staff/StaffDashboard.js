import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
//** Import Image */

import { Sparklines, SparklinesLine } from "react-sparklines";

import axios from "axios";
import "./StaffDashboard.css";
import DashboardUI from "../GlobalComponents/DashboardUI";
import LeaveStatistic from "../GlobalComponents/LeaveStatistic";

// const sampleData1 = [8, 7, 6, 3, 2, 4, 6, 8, 12, 6, 12, 13, 10, 18, 14, 24, 16, 12, 19, 21, 16, 14, 24, 21, 13, 15, 27, 29, 21, 11, 14, 19, 21, 17,];
const sampleData2 = [
  19, 21, 16, 14, 24, 21, 13, 15, 27, 29, 21, 11, 14, 19, 21, 17, 12, 6, 12, 13,
  10, 18, 14, 24, 16, 12, 8, 7, 6, 3, 2, 7, 6, 8,
];
// const sampleData3 = [8, 7, 6, 3, 2, 4, 6, 8, 10, 6, 12, 15, 13, 15, 14, 13, 21, 11, 14, 10, 21, 10, 13, 10, 12, 14, 16, 14, 12, 10, 9, 8, 4, 1,];
// const sampleData4 = [20, 18, 16, 12, 8, 10, 13, 15, 12, 6, 12, 13, 10, 18, 14, 16, 17, 15, 19, 16, 16, 14, 18, 21, 13, 15, 18, 17, 21, 11, 14, 19, 21, 17,];

const StaffDashboard = () => {
  const [pending, setPending] = useState(0);
  const [viewed, setViewed] = useState(0);
  const [exit, setExit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingLeaves, setLoadingLeaves] = useState(true);
  const [leaveData, setleaveData] = useState([]);
  const config = {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("userDetails")).idToken
      }`,
    },
  };
  
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/employee/employeedashboard`,
        config
      )
      .then((result) => {
        console.log(result.data);
        setExit(result.data.exitCount);
        LeaveTypes();
        // setPending(result.data.pendingCount);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  //Get Leave Types
  const LeaveTypes = () => {
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
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  return (
    <Fragment>
      <div className="row my-3 d-none0">
        <div className="col-md-12">
          {/* <h4 className="my-4">Staff Dashboard</h4> */}
          {/* {leaveplaceholder} */}

          <div className="d-none">
            <div className="col-xl-3 col-lg-6 col-sm-6 d-none">
              <Link
                className=""
                to="/Payslip"
                style={{ textDecoration: "none" }}
              >
                <div className="card overflow-hidden">
                  <div className="card-header media border-0 pb-0">
                    <div className="media-body">
                      <h2 className="text-black">
                        + <span className="text-success fs-14">+</span>
                      </h2>
                      <p className="mb-0 text-black">Payroll Operations</p>
                    </div>
                    {/* <svg
                    width="55"
                    height="53"
                    viewBox="0 0 55 53"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M36.6838 33.2492C37.966 32.5764 39.4336 32.1934 40.9966 32.1934H41.0019C41.1609 32.1934 41.235 32.007 41.1185 31.9035C39.493 30.4785 37.6362 29.3276 35.6241 28.4979C35.603 28.4875 35.5818 28.4823 35.5606 28.472C38.8508 26.1377 40.9913 22.3438 40.9913 18.0635C40.9913 10.9727 35.1208 5.22754 27.8781 5.22754C20.6353 5.22754 14.7701 10.9727 14.7701 18.0635C14.7701 22.3438 16.9106 26.1377 20.2061 28.472C20.1849 28.4823 20.1638 28.4875 20.1426 28.4979C17.7742 29.4761 15.6496 30.8787 13.8217 32.6695C12.0044 34.4416 10.5575 36.5424 9.56189 38.8546C8.5823 41.1188 8.05363 43.5447 8.00419 46.0023C8.00278 46.0576 8.0127 46.1125 8.03336 46.164C8.05403 46.2154 8.08503 46.2623 8.12453 46.3018C8.16403 46.3414 8.21123 46.3728 8.26336 46.3943C8.31549 46.4157 8.37149 46.4268 8.42805 46.4268H11.6017C11.8296 46.4268 12.0203 46.2456 12.0256 46.023C12.1316 42.0273 13.7687 38.2853 16.6669 35.4489C19.6604 32.5143 23.6447 30.8994 27.8834 30.8994C30.8875 30.8994 33.7698 31.712 36.2546 33.2337C36.3185 33.2729 36.3918 33.2949 36.4671 33.2977C36.5424 33.3004 36.6172 33.2837 36.6838 33.2492V33.2492ZM27.8834 26.9658C25.4567 26.9658 23.1732 26.0394 21.4512 24.3572C20.604 23.5317 19.9324 22.5506 19.475 21.4705C19.0176 20.3903 18.7835 19.2324 18.7862 18.0635C18.7862 15.6878 19.7346 13.4519 21.4512 11.7697C23.1679 10.0876 25.4514 9.16113 27.8834 9.16113C30.3153 9.16113 32.5935 10.0876 34.3155 11.7697C35.1627 12.5952 35.8343 13.5763 36.2917 14.6565C36.7491 15.7366 36.9832 16.8945 36.9805 18.0635C36.9805 20.4392 36.0321 22.6751 34.3155 24.3572C32.5935 26.0394 30.31 26.9658 27.8834 26.9658ZM47.3704 39.2842H42.9199V34.9365C42.9199 34.7088 42.7292 34.5225 42.496 34.5225H39.529C39.2959 34.5225 39.1051 34.7088 39.1051 34.9365V39.2842H34.6546C34.4214 39.2842 34.2307 39.4705 34.2307 39.6982V42.5967C34.2307 42.8244 34.4214 43.0107 34.6546 43.0107H39.1051V47.3584C39.1051 47.5861 39.2959 47.7725 39.529 47.7725H42.496C42.7292 47.7725 42.9199 47.5861 42.9199 47.3584V43.0107H47.3704C47.6036 43.0107 47.7943 42.8244 47.7943 42.5967V39.6982C47.7943 39.4705 47.6036 39.2842 47.3704 39.2842Z"
                      fill="#3F9AE0"
                    />
                  </svg> */}
                  </div>
                  <div className="card-body pt-4 p-0">
                    <ul style={{listStyleType: "square"}}>
                      <li >
                        <Link
                          className=""
                          to="/Payslip"
                          style={{ textDecoration: "none", }}
                        >
                         1.{" "} Payslip
                        </Link>
                      </li>
                      <li>
                        <Link
                          className=""
                          to="/Pnine"
                          style={{ textDecoration: "none" }}
                        >
                          2.{" "}P9
                        </Link>
                      </li>
                    </ul>
                    {/* <Sparklines data={sampleData2}>
                    <SparklinesLine
                      style={{ strokeWidth: 2 }}
                      color="#3f9ae0"
                    />
                  </Sparklines> */}
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-xl-3 col-lg-6 col-sm-6 d-none">
              <div className="card overflow-hidden">
                <div className="card-header media border-0 pb-0">
                  <div className="media-body">
                    <h2 className="text-black">
                      {exit}
                      <span className="text-success fs-14">+</span>
                    </h2>
                    <p className="mb-0 text-black">Exit Active</p>
                  </div>
                  <svg
                    width="72"
                    height="72"
                    viewBox="0 0 72 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M40.854 21.275H51.704V32.125H40.854V21.275Z"
                      fill="#F14019"
                    />
                    <path
                      d="M35 37.979V18.104H15.125V57.854H54.875V38.012L50.313 38.005L50.031 38.004L35 37.979Z"
                      fill="#F14019"
                    />
                    <path
                      d="M35 37.979V18.104H15.125V57.854H54.875V38.012L50.313 38.005L50.031 38.004L35 37.979Z"
                      stroke="black"
                    />
                    <path
                      d="M40.854 21.275H51.704V32.125H40.854V21.275Z"
                      stroke="black"
                    />
                    <path
                      d="M52 13H60M46.279 26.7L59.432 13.547L59.99 12.99V21L46.279 26.7Z"
                      stroke="black"
                    />
                  </svg>
                </div>
                <div className="card-body pt-4 p-0">
                  <Sparklines data={sampleData2}>
                    <SparklinesLine
                      style={{ strokeWidth: 2 }}
                      color="#3f9ae0"
                    />
                  </Sparklines>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-9">
          <div className="d-md-flex align-items-start gap-1 flex-wrap"><DashboardUI/></div>
        </div>
        <div className="col-md-3"><LeaveStatistic/></div>
        
      </div>
    
    </Fragment>
  );
};

export default StaffDashboard;
