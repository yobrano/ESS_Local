import axios from "axios";
import React,{ useEffect } from "react"
import { propTypes } from "react-bootstrap/esm/Image";
import { withRouter } from "react-router-dom"
import swal from "sweetalert";

const RedirectToDocIfNotRead = (props)=>{
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
            `${process.env.REACT_APP_API_S_LINK}/documents/checkifdocumentisread/`,
            config
          )
    
          .then(function (response) {
            if (response.data === true) {
                console.log(props.rpath);
                props.history.push(props.rpath);
             
            }else{
                props.history.push("/document-list");
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
     
}

export default withRouter(RedirectToDocIfNotRead)