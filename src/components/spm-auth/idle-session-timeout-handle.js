import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  respondModal,
  showHideModal,
} from "../../store/actions/toaster-actions";
import { useDispatch, useSelector } from "react-redux";
import IdleSessionTimeOutModal from "./idle-session-timeout-modal";

const IdleSessionTimeOutHandler = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { modalResponse } = state.alert;
  const [isLogout, setLogout] = useState(false);
  useEffect(() => {
    if (modalResponse === "cancel") {
      setLogout(false);
    }
    return () => {
      respondModal("")(dispatch);
    };
  }, [modalResponse]);
  let timer = undefined;
  const events = ["click", "scroll", "load", "keydown"];

  const startTimer = () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(
      () => {
        let lastInteractionTime = localStorage.getItem("lastInteractionTime");
        const diff = moment.duration(
          moment().diff(moment(lastInteractionTime))
        );
        let timeOutInterval = props.timeOutInterval
          ? props.timeOutInterval
          : 60000;
        if (isLogout) {
          clearTimeout(timer);
        } else {
          if (diff._milliseconds < timeOutInterval) {
            startTimer();
            props.onActive();
          } else {
            props.onIdle();
            showHideModal(true)(dispatch);
          }
        }
      },
      props.timeOutInterval ? props.timeOutInterval : 60000
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
      />
    </div>
  );
};

export default IdleSessionTimeOutHandler;
