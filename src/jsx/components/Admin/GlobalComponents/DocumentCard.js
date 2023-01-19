import React, { useEffect, useState } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import swal from "sweetalert";
import "./DocumentCard.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ViewPDF = ({ pdf }) => {
  const [scale, setScale] = useState(1);
  const [numPages, setNumPages] = useState(null);
  let [plusScaling, setPlusScaling] = useState(0.1);
  let [minusScaling, setMinusScaling] = useState(-0.1);
  const [pageNumber, setPageNumber] = useState(1);

  // useEffect(() => {
  //   console.log(props.location.state[0].datum[0]);
  //   setLoading(false)
  // }, [props.location.state]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
    window.scrollTo(0, 0);
  };

  const nextPage = () => {
    changePage(1);
    window.scrollTo(0, 0);
  };

  const zoomDocument = (arg)=>{
    let zoomVal;
    if(arg ===+1){
      zoomVal=scale+0.1;
      if(zoomVal<1.8){
        setScale(scale+0.1)
      }
    }else{
      zoomVal=scale-0.1;
      if(zoomVal>0.1){
        setScale(scale-0.1)
      }
    }
  }

  return (
    <>
      <div className="container mt-0">
        <div className="text-center">
          <div className="filter-pagination  mt-3">
          <button
              type="button"
              onClick={()=>zoomDocument(-1)}
              className="next-button"
            >
              <i className="fa fa-search-minus"></i> Zoom Out
            </button>

            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
              className=" previous-button"
            >
              Previous
            </button>
            <span></span>
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
              className="next-button"
            >
              Next
            </button>
            <button
              type="button"
              onClick={()=>zoomDocument(+1)}
              className="next-button"
            >
              <i className="fa fa-search-plus"></i> Zoom In
            </button>
          </div>
          <p>
            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
          </p>
        </div>
        <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} scale={scale} />
        </Document>

        <div className="text-center">
          {/* <p>
                Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
              </p> */}
          <div className="filter-pagination  mt-3">
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
              className=" previous-button"
            >
              Previous
            </button>
            <span>
              {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
            </span>
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
              className="next-button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
const DocumentCard = (props) => {
  const [loading, setLoading] = useState(true);
  const [pdfBuffer, setPDFBuffer] = useState("");
  useEffect(() => {
    //console.log(props.location.state[0].datum[0].url);
    // setLoading(false)
    let filename = props.location.state[0].datum[0].url.split("\\")[2];
    let docCode = props.location.state[0].datum[0].documentCode;

    const config = {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
      timeout: 600000,//10 min
    };
    const data = {
      Path:props.location.state[0].datum[0].url
    };

    axios
      .post(
        `${process.env.REACT_APP_API_S_LINK}/documents/reademployeedocument`,data,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          // console.log(response.data);
          const file = new Blob([response.data], { type: "application/pdf" });
          //Build a URL from the file
          const fileURL = URL.createObjectURL(file);

          setPDFBuffer(fileURL);
          setLoading(false);
          checkTheDocument();
        }
        if (response.status === 404) {
          swal("Oh!", response.data.message, "error");
          console.log(response.data.message);
        }
        //   if (response.status === 500) {
        //     swal("Oh!", response.data.message, "error");
        //     console.log(response.data.message);
        //   }
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

  const checkTheDocument = () => {
    let eid = props.location.state[0].datum[0].employeeNo;
    let did = props.location.state[0].datum[0].documentCode;

    const config = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userDetails")).idToken
        }`,
      },
    };

    axios
      .get(
        `${process.env.REACT_APP_API_S_LINK}/documents/viewedemployeedocument/${eid}/${did}`,
        config
      )
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
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
  };

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
      <ViewPDF pdf={pdfBuffer} />
    </>
  );
};

export default DocumentCard;
