import React, { useEffect } from "react";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAppSetupStatus } from "../store/actions/dashboard-actions";
import { iconsList } from "../utils/icons-list";
import { useHistory } from "react-router-dom";
import { appStatusRoute } from "../utils/app-status-route";
import { appStatusSetupName } from "../utils/app-status-setup-name";

const AppSetupProgress = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { appSetupStatus } = state.dashboard;
  useEffect(() => {
    getAppSetupStatus()(dispatch);
  }, ['123']);
  return (
    <>
      <div
        className="overflow-hidden card aos-init aos-animate"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <div className="flex-wrap card-header d-flex justify-content-between">
          <div className="header-title">
            <h4 className="mb-2 card-title">Application Setup Progress</h4>
          </div>
        </div>
        <div className="p-0 card-body">
          <div className="mt-4 table-responsive">
            <table
              id="basic-table"
              className="table mb-0 table-striped"
              role="grid"
            >
              <thead>
                <tr>
                  <th>SETUP</th>
                  <th>STATUS</th>
                  <th>COMPLETION</th>
                </tr>
              </thead>
              <tbody>
                {appSetupStatus?.map((status, idx) => (
                  <tr key={idx}>
                    <td
                      style={{ cursor: status.completeionStatus < 75 && "pointer", }}
                      onClick={() =>
                        status.completeionStatus < 75 &&
                        history.push(appStatusRoute[status.setup])
                      }
                    >
                      <div className="d-flex align-items-center">
                        <div className="rounded bg-soft-primary img-fluid avatar-30 mx-2">
                          <span className="">{iconsList[status.setup]}</span>
                        </div>
                        <div>
                          <h6 className="text-uppercase">{appStatusSetupName[status.setup]}</h6>
                          <p
                            style={{  wordBreak: "break-all", whiteSpace: "pre-wrap", }}
                            className={`${status.completeionStatus < 75 && "text-danger"}`}
                          >
                            {status.message}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      {status.cleared && (
                        <svg
                          className="me-2 text-primary icon-24"
                          width="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#25d100"
                            d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"
                          ></path>
                        </svg>
                      )}
                    </td>

                    <td>
                      <div className="mb-2 d-flex align-items-center">
                        <h6>{status.completeionStatus}%</h6>
                      </div>
                      <div
                        className="shadow-none progress bg-soft-primary w-100"
                        style={{ height: "4px" }}
                      >
                        <div
                          className={`progress-bar ${status.completeionStatus >= 75
                            ? "bg-success"
                            : status.completeionStatus >= 50
                              ? "bg-primary"
                              : status.completeionStatus >= 25
                                ? "bg-warning"
                                : "bg-danger"
                            }`}
                          data-toggle="progress-bar"
                          role="progressbar"
                          aria-valuenow="60"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{
                            width: `${status.completeionStatus}%`,
                            transition: "width 2s ease 0s",
                          }}
                        ></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppSetupProgress;
