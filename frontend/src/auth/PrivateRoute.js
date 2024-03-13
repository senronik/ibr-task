import React, { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useState } from 'react';
import Cookies from 'js-cookie';
const PrivateRoutes =() => {
  const[isLoggedin,setLoggedin]=useState(Cookies.get('token')?true:false);

  useEffect(() => {
    const user = Cookies.get('token');
    if (user) {
      setLoggedin(true);
    }
  }, []);

  return (
    isLoggedin ? <Outlet/> : <Navigate to='/signin'/>
  )
}

export default PrivateRoutes
