import React, { useState } from "react";
import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import swal from "sweetalert";
import Select from "react-select";
import axios from "axios";

const HRDocumentSettings = (props) => {
  const [loading, setLoading] = useState(true);
  const [documentList, setDocumentlist] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState({});
  const [selectedDocDB, setSelectedDocDB] = useState({});

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
        `${process.env.REACT_APP_API_S_LINK}/documents/getdocumentlist/`,
        config
      )

      .then(function (response) {
        if (response.status === 200) {
          // console.log(response.data);
          setDocumentlist(response.data.docLists);
          setSelectedDocDB(response.data.selectedDocument);
          setLoading(false);
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log({ err: err });
        if (err.response !== undefined) {
          swal("Ooh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
      });
  }, []);

  function uploadD(e) {
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    let udata = {
        ReadMandatory: selectedDoc.label,
    };

    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Upload",
      icon: "warning",
      dangerMode: true,
    })
      .then((willCreate) => {
        // setPostBtnState(true)
        if (willCreate) {
          return axios.post(
            `${process.env.REACT_APP_API_S_LINK}/documents/setmandarydoc/`,
            udata,
            config
          );
        }
      })
      .then(function (response) {
        swal("Success", response.data.message, "success");
        // if (response.status === 200) {
        //   props.history.go(-1);
        // }
      })
      .catch((err) => {
        console.log("catch err:" + err);
        if (err.response !== undefined) {
          swal("Ooh!", err.response.data.message, "error");
        } else {
          swal("Oh!", err.message, "error");
        }
      });
  }

  if (loading) {
    return (
      <>
        <div className="container">
          <div className="headerDiv"></div>
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
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">Set the Mandatory Read</div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <label htmlFor="" className="d-flex">
                      Document List
                    </label>
                    <Select
                      defaultValue={selectedDoc}
                      onChange={setSelectedDoc}
                      options={documentList}
                    />
                   
                    <button className="btn btn-success mt-3" onClick={uploadD}>
                      Submit <i className="fa fa-hand-spock-o"></i>
                    </button>
                  </div>
                  <div className="col-md-6">
                    <p>
                      {" "}
                      Selected Mandatory Document:{" "}
                      <span className="text-success">
                        {" "}
                        {selectedDocDB !== null
                          ? selectedDocDB.readMandatory
                          : "All"}{" "}
                      </span>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(HRDocumentSettings);
