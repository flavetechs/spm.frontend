import React from "react";
import { useSelector } from "react-redux";
import ResultTemplateOne from "./template-one";
import ResultTemplateTwo from "./template-two";

const TemplateControl = () => {
  const state = useSelector((state) => state);
  const { templateSetting } = state.results;
  switch (templateSetting) {
    case "template-one":
        return (
            <div><ResultTemplateOne/></div>
            )
      break;
    case "template-two":
        return (
            <div><ResultTemplateTwo/></div>
            )
      break;
    default:
      return;
  }
};

export default TemplateControl;
