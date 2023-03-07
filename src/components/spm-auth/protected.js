import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";
import { authLocations } from "../../router/spm-path-locations";
import IdleSessionTimeOutHandler from "./idle-session-timeout-handle";
import jwt from 'jwt-decode'

const Protected = (props) => {
  const [isActive, setIsActive] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const token = localStorage.getItem('token');
  const history = useHistory();
  useEffect(() => {
    const decodedToken = token && jwt(token);
   token && axiosInstance.get(`/api/v1/base/is-authenticated/${decodedToken.smsClientId}`).then(res => setIsLoggedIn(res.data.result))
    if(!isLoggedIn){
      localStorage.removeItem('token');
      localStorage.removeItem('permissions');
      localStorage.removeItem('userDetail');
      history.push(authLocations.login);
    }
  }, [isLoggedIn, token])

  return (
    isLoggedIn === true ?
      <>
        <IdleSessionTimeOutHandler
          onActive={() => {
            setIsActive(true);
          }}
          onIdle={() => {
            setIsActive(false);
          }}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        {props.children}
      </>
      : null
  );
};
export default Protected;
