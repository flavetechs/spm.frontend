import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axiosInstance from "../../axios/axiosInstance";
import { authLocations } from "../../router/spm-path-locations";
import IdleSessionTimeOutHandler from "./idle-session-timeout-handle";

const Protected = (props) => {
  const [isActive, setIsActive] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const history = useHistory();
  useEffect(() => {
    axiosInstance.get("/api/v1/base/is-authenticated").then(
      res => setIsLoggedIn(res.data.result)
    )
    if(!isLoggedIn){
      history.push(authLocations.login);
    }
  }, [isLoggedIn])

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
