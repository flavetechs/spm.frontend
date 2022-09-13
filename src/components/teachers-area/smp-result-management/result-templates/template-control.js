import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResultSettingList } from "../../../../store/actions/portal-setting-action";
import ResultTemplateOne from "./template-one";
import ResultTemplateTwo from "./template-two";

const TemplateControl = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { resultSettingList } = state.portal;
  useEffect(() => {
    getResultSettingList()(dispatch);
  }, [dispatch])
  switch (resultSettingList?.selectedTemplate) {
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
