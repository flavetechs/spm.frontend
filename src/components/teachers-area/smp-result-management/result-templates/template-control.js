import { useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { getResultSetting } from "../../../../store/actions/portal-setting-action";

import { PrintCSV } from "../../../../utils/export-csv";
import ResultTemplateOne from "./template-one";
import ResultTemplateTwo from "./template-two";

const TemplateControl = () => {
  const dispatch = useDispatch();
  const locations = useLocation();
  const history = useHistory();
 // const [elementId, setElementId] = useState("")
  const state = useSelector((state) => state);

  const { resultSetting } = state.portal;
  const { dialogResponse } = state.alert;

  const { batchResult } = state.results;
  const queryParams = new URLSearchParams(locations.search);
  const batchPrinting = queryParams.get("batchPrinting");
  // const sessionClassId = queryParams.get("sessionClassId");
  // const sessionTermId = queryParams.get("sessionTermId");

  useEffect(() => {
    getResultSetting()(dispatch);
    window.onbeforeunload = () => "Results will be lost on reload";
  }, [dispatch]);


  // useEffect(() => {
  //   batchPrinting &&
  //     getAllBatchPrintingResults(
  //       sessionClassId,
  //       sessionTermId,
  //       batchPrinting
  //     )(dispatch);
  // }, [dispatch, sessionClassId, sessionTermId, batchPrinting]);

  // useEffect(() => {
  //   if (dialogResponse === "continue") {
  //     PrintCSV(elementId);
  //     showHideDialog(false, null)(dispatch);
  //     respondDialog("")(dispatch);
  //   }
  //   return () => {
  //     respondDialog("")(dispatch);
  //   };
  // }, [dialogResponse, dispatch]);

  switch (resultSetting?.selectedTemplate) {
    case "template-one":
      return (
        <div>
          {batchPrinting ? (
            <div>
              <div className="isPreview my-5">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="button-tooltip-2"> back</Tooltip>}
                >
                  <svg
                    onClick={() => {
                      history.goBack();
                    }}
                    style={{ cursor: "pointer" }}
                    className=" text-primary"
                    width="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.165 11.9934L13.1634 11.6393C13.1513 10.2348 13.0666 8.98174 12.9206 8.18763C12.9206 8.17331 12.7613 7.38572 12.6599 7.12355C12.5006 6.74463 12.2126 6.42299 11.8515 6.2192C11.5624 6.0738 11.2592 6 10.9417 6C10.6922 6.01157 10.2806 6.13714 9.98692 6.24242L9.74283 6.33596C8.12612 6.97815 5.03561 9.07656 3.85199 10.3598L3.76473 10.4495L3.37527 10.8698C3.12982 11.1915 3 11.5847 3 12.0077C3 12.3866 3.11563 12.7656 3.3469 13.0718C3.41614 13.171 3.52766 13.2983 3.62693 13.4058L4.006 13.8026C5.31046 15.1243 8.13485 16.9782 9.59883 17.5924C9.59883 17.6057 10.5086 17.9857 10.9417 18H10.9995C11.6639 18 12.2846 17.6211 12.6021 17.0086C12.6888 16.8412 12.772 16.5132 12.8352 16.2252L12.949 15.6813C13.0788 14.8067 13.165 13.465 13.165 11.9934ZM19.4967 13.5183C20.3269 13.5183 21 12.8387 21 12.0004C21 11.1622 20.3269 10.4825 19.4967 10.4825L15.7975 10.8097C15.1463 10.8097 14.6183 11.3417 14.6183 12.0004C14.6183 12.6581 15.1463 13.1912 15.7975 13.1912L19.4967 13.5183Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </OverlayTrigger>
              </div>
              <div id="result-table-one">
                {batchResult?.map((student) => (
                  <ResultTemplateOne batchResult={student} />
                ))}
              </div>
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-primary mx-3 mb-3"
                  onClick={() => {
                    PrintCSV("result-table-one");
                    // setElementId("result-table-one")
                    // showHideDialog(
                    //   true,
                    //   "Are you sure you want to print result"
                    // )(dispatch);
                  }}
                >
                  Batch Print
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="isPreview my-5">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="button-tooltip-2"> back</Tooltip>}
                >
                  <svg
                    onClick={() => {
                      history.goBack();
                    }}
                    style={{ cursor: "pointer" }}
                    className=" text-primary"
                    width="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.165 11.9934L13.1634 11.6393C13.1513 10.2348 13.0666 8.98174 12.9206 8.18763C12.9206 8.17331 12.7613 7.38572 12.6599 7.12355C12.5006 6.74463 12.2126 6.42299 11.8515 6.2192C11.5624 6.0738 11.2592 6 10.9417 6C10.6922 6.01157 10.2806 6.13714 9.98692 6.24242L9.74283 6.33596C8.12612 6.97815 5.03561 9.07656 3.85199 10.3598L3.76473 10.4495L3.37527 10.8698C3.12982 11.1915 3 11.5847 3 12.0077C3 12.3866 3.11563 12.7656 3.3469 13.0718C3.41614 13.171 3.52766 13.2983 3.62693 13.4058L4.006 13.8026C5.31046 15.1243 8.13485 16.9782 9.59883 17.5924C9.59883 17.6057 10.5086 17.9857 10.9417 18H10.9995C11.6639 18 12.2846 17.6211 12.6021 17.0086C12.6888 16.8412 12.772 16.5132 12.8352 16.2252L12.949 15.6813C13.0788 14.8067 13.165 13.465 13.165 11.9934ZM19.4967 13.5183C20.3269 13.5183 21 12.8387 21 12.0004C21 11.1622 20.3269 10.4825 19.4967 10.4825L15.7975 10.8097C15.1463 10.8097 14.6183 11.3417 14.6183 12.0004C14.6183 12.6581 15.1463 13.1912 15.7975 13.1912L19.4967 13.5183Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </OverlayTrigger>
              </div>
              <ResultTemplateOne />
            </div>
          )}{" "}
        </div>
      );

    case "template-two":
      return (
        <div>
          {batchPrinting ? (
            <div>
              <div className="isPreview my-5">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="button-tooltip-2"> back</Tooltip>}
                >
                  <svg
                    onClick={() => {
                      history.goBack();
                    }}
                    style={{ cursor: "pointer" }}
                    className=" text-primary"
                    width="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.165 11.9934L13.1634 11.6393C13.1513 10.2348 13.0666 8.98174 12.9206 8.18763C12.9206 8.17331 12.7613 7.38572 12.6599 7.12355C12.5006 6.74463 12.2126 6.42299 11.8515 6.2192C11.5624 6.0738 11.2592 6 10.9417 6C10.6922 6.01157 10.2806 6.13714 9.98692 6.24242L9.74283 6.33596C8.12612 6.97815 5.03561 9.07656 3.85199 10.3598L3.76473 10.4495L3.37527 10.8698C3.12982 11.1915 3 11.5847 3 12.0077C3 12.3866 3.11563 12.7656 3.3469 13.0718C3.41614 13.171 3.52766 13.2983 3.62693 13.4058L4.006 13.8026C5.31046 15.1243 8.13485 16.9782 9.59883 17.5924C9.59883 17.6057 10.5086 17.9857 10.9417 18H10.9995C11.6639 18 12.2846 17.6211 12.6021 17.0086C12.6888 16.8412 12.772 16.5132 12.8352 16.2252L12.949 15.6813C13.0788 14.8067 13.165 13.465 13.165 11.9934ZM19.4967 13.5183C20.3269 13.5183 21 12.8387 21 12.0004C21 11.1622 20.3269 10.4825 19.4967 10.4825L15.7975 10.8097C15.1463 10.8097 14.6183 11.3417 14.6183 12.0004C14.6183 12.6581 15.1463 13.1912 15.7975 13.1912L19.4967 13.5183Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </OverlayTrigger>
              </div>
              <div id="result-table-two">
                {batchResult?.map((student) => (
                  <ResultTemplateTwo batchResult={student} />
                ))}
              </div>
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-primary mx-3 mb-3"
                  onClick={() => {
                    PrintCSV("result-table-two")
                  }}
                >
                  Batch Print
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="isPreview my-5">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="button-tooltip-2"> back</Tooltip>}
                >
                  <svg
                    onClick={() => {
                      history.goBack();
                    }}
                    style={{ cursor: "pointer" }}
                    className=" text-primary"
                    width="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.165 11.9934L13.1634 11.6393C13.1513 10.2348 13.0666 8.98174 12.9206 8.18763C12.9206 8.17331 12.7613 7.38572 12.6599 7.12355C12.5006 6.74463 12.2126 6.42299 11.8515 6.2192C11.5624 6.0738 11.2592 6 10.9417 6C10.6922 6.01157 10.2806 6.13714 9.98692 6.24242L9.74283 6.33596C8.12612 6.97815 5.03561 9.07656 3.85199 10.3598L3.76473 10.4495L3.37527 10.8698C3.12982 11.1915 3 11.5847 3 12.0077C3 12.3866 3.11563 12.7656 3.3469 13.0718C3.41614 13.171 3.52766 13.2983 3.62693 13.4058L4.006 13.8026C5.31046 15.1243 8.13485 16.9782 9.59883 17.5924C9.59883 17.6057 10.5086 17.9857 10.9417 18H10.9995C11.6639 18 12.2846 17.6211 12.6021 17.0086C12.6888 16.8412 12.772 16.5132 12.8352 16.2252L12.949 15.6813C13.0788 14.8067 13.165 13.465 13.165 11.9934ZM19.4967 13.5183C20.3269 13.5183 21 12.8387 21 12.0004C21 11.1622 20.3269 10.4825 19.4967 10.4825L15.7975 10.8097C15.1463 10.8097 14.6183 11.3417 14.6183 12.0004C14.6183 12.6581 15.1463 13.1912 15.7975 13.1912L19.4967 13.5183Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </OverlayTrigger>
              </div>
              <ResultTemplateTwo />
            </div>
          )}
        </div>
      );

    default:
      return <h1 className="text-center mt-5">No template Selected</h1>;
  }
};

export default TemplateControl;
