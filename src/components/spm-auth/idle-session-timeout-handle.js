import React, { useEffect, useState } from "react";
import moment from "moment";
import {
 showHideTimeOutModal, timeOutRespondModal,
} from "../../store/actions/toaster-actions";
import { useDispatch, useSelector } from "react-redux";
import IdleSessionTimeOutModal from "./idle-session-timeout-modal";

const IdleSessionTimeOutHandler = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {  timeOutModalResponse } = state.alert;
  const [isLogout, setLogout] = useState(false);
  useEffect(() => {
    if (timeOutModalResponse === "cancel") {
      setLogout(false);
    }
    return () => {
      timeOutRespondModal("")(dispatch);
    };
  }, [timeOutModalResponse]);
  let timer = undefined;
  const events = ["click", "scroll", "load", "keydown"];

  const startTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
        let lastInteractionTime = localStorage.getItem("lastInteractionTime");
        const diff = moment.duration(
          moment().diff(moment(lastInteractionTime))
        );
        let timeOutInterval = props.timeOutInterval
          ? props.timeOutInterval
          : 900000;
        if (isLogout) {
          clearTimeout(timer);
        } else {
          if (diff._milliseconds < timeOutInterval) {
            startTimer();
            props.onActive();
          } else {
            props.onIdle();
            showHideTimeOutModal(true)(dispatch);
          }
        }
      },
      props.timeOutInterval ? props.timeOutInterval : 900000
    );
  };

  const eventHandler = (eventType) => {
    if (!isLogout) {
      localStorage.setItem("lastInteractionTime", moment());
      if (timer) {
        props.onActive();
        startTimer();
      }
    }
  };

  const addEvents = () => {
    events.forEach((eventName) => {
      window.addEventListener(eventName, eventHandler);
    });
    startTimer();
  };
  const removeEvents = () => {
    events.forEach((eventName) => {
      window.removeEventListener(eventName, eventHandler);
    });
  };

  useEffect(() => {
    addEvents();

    return () => {
      removeEvents();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <IdleSessionTimeOutModal
        removeEvents={removeEvents}
        timer={timer}
        setLogout={setLogout}
        startTimer={startTimer}
        isLoggedIn={props.isLoggedIn}
        setIsLoggedIn={props.setIsLoggedIn}
      />
    </div>
  );
};

export default IdleSessionTimeOutHandler;
