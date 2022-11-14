import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authLocations } from "../../router/spm-path-locations";
import { loginOutUser } from "../../store/actions/auth-actions";
import {
  respondModal,
  showHideTimeOutModal,
} from "../../store/actions/toaster-actions";
import { SmpTimeOutModal } from "../partials/components/hoc-tools/time-out-modal";

const IdleSessionTimeOutModal = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state);
  const { showTimeOutModal } = state.alert;
  const [counter, setCounter] = useState(30);
let count;
  useEffect(() => {
    if(showTimeOutModal){
    count = 30;
    const countdown = setInterval(() => {
      setCounter((counter) => count - 1);
      count--
      if (count === 0) {
        dispatch(loginOutUser());
        props.setIsLoggedIn(false);
        history.push(authLocations.login);       
      }
    }, 1000);
    
   return () => clearInterval(countdown);
}
 }, [count,showTimeOutModal]);

  return (
    <>
      <SmpTimeOutModal title={"You Have Been Idle!"} counter={counter}>
        <h5 className="my-4 text-center">
          Your session is <span className="text-danger">Timed Out.</span> Do you
          want to stay?
        </h5>
        <div className="d-flex justify-content-end mt-5">
          <Button
            variant="danger"
            className="mx-2"
            onClick={() => {
              props.removeEvents();
              clearTimeout(props.timer);
              props.setLogout(true);
              showHideTimeOutModal(false)(dispatch);
              dispatch(loginOutUser());
              props.setIsLoggedIn(false);
              history.push(authLocations.login);
            }}
          >
            Logout
          </Button>
          <Button
            variant="primary"
            className=""
            onClick={() => {
              showHideTimeOutModal(false)(dispatch);
              respondModal("cancel")(dispatch);
              props.startTimer();
            }}
          >
            Continue Session
          </Button>
        </div>
      </SmpTimeOutModal>
    </>
  );
};

export default IdleSessionTimeOutModal;
