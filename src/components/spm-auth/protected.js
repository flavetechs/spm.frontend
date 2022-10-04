import { useState } from "react";
import IdleSessionTimeOutHandler from "./idle-session-timeout-handle";

const Protected = (props) => {
  const [isActive, setIsActive] = useState(true);
  console.log("logged something");
  return (
    <>
      <IdleSessionTimeOutHandler
        onActive={() => {
          setIsActive(true);
        }}
        onIdle={() => {
          setIsActive(false);
        }}
      />
      {props.children}
    </>
  );
};
export default Protected;
