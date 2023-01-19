// import axios from 'axios';
// import React,{ useEffect, useState } from 'react'

// const data=(url) => {
//     const [prodata,setProdata] = useState([]);
//     const [isloading,setIsloading] = useState(false);
//     const [iserror,setIserror] = useState(false);
//     const fetchData = async ()=>{
//         try {
//             const response  = await axios.get(url);
//             setIsloading(false);
//             setProdata(response.data);

//         } catch (error) {
//             setIsloading(false);
//             setIserror(true);
//             console.log(error);
//         }
//     };
//     useEffect(()=>{
//         fetchData();
//     },[]);
//     return {isloading,iserror,prodata}
// };

// export default data

import { useState, useEffect } from 'react';
import axios from 'axios';
export const GetProfile = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [isError, setIsError] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setIsLoading(false);
      setData(response.data);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { isLoading, isError, data };
};
// export default useAxios;

/**
 * POPULATE THE PROFILE DATA
 */
export const PostProfile = () => {
//   return (
//     <div>PostProfile</div>
//   )
}


