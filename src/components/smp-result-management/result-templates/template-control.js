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
        <div>
          <ResultTemplateOne />
        </div>
      );

    case "template-two":
      return (
        <div>
          <ResultTemplateTwo />
        </div>
      );

    default:
      return <h1 className="text-center mt-5">No template Selected</h1>;
  }
};

export default TemplateControl;
