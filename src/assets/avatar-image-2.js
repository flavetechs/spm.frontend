import React from "react";
import avatars1 from "./images/avatars/01.png";
import avatars2 from "./images/avatars/avtar_2.png";
import avatars3 from "./images/avatars/avtar_2.png";
import avatars4 from "./images/avatars/avtar_3.png";
import avatars5 from "./images/avatars/avtar_4.png";
import avatars6 from "./images/avatars/avtar_5.png";
const AvatarImage2 = () => {
  return (
    <div>
      <img
        style={{ width: "16rem", height: "16rem" }}
        src={avatars1}
        alt="User-Profile"
        className="theme-color-default-img img-fluid avatar avatar-100 avatar-rounded-100"
      />
      <img
        style={{ width: "16rem", height: "16rem" }}
        src={avatars2}
        alt="User-Profile"
        className="theme-color-purple-img img-fluid avatar avatar-100 avatar-rounded-100"
      />
      <img
        style={{ width: "16rem", height: "16rem" }}
        src={avatars3}
        alt="User-Profile"
        className="theme-color-blue-img img-fluid avatar avatar-100 avatar-rounded-100"
      />
      <img
        style={{ width: "16rem", height: "16rem" }}
        src={avatars5}
        alt="User-Profile"
        className="theme-color-green-img img-fluid avatar avatar-100 avatar-rounded-100"
      />
      <img
        style={{ width: "16rem", height: "16rem" }}
        src={avatars6}
        alt="User-Profile"
        className="theme-color-yellow-img img-fluid avatar avatar-100 avatar-rounded-100"
      />
      <img
        style={{ width: "16rem", height: "16rem" }}
        src={avatars4}
        alt="User-Profile"
        className="theme-color-pink-img img-fluid avatar avatar-100 avatar-rounded-100"
      />{" "}
    </div>
  );
};

export default AvatarImage2;
