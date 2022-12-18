import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
  const auth = JSON.parse(localStorage.getItem("profile"))?.result?.isVarefide;
  return auth ? children : <Navigate to="/login"/>
}

export default PrivateRoute