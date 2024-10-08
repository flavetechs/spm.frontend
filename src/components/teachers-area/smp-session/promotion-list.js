import React, { useState } from "react";
import {
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Badge,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import {
  respondDialog,
  showErrorToast,
  showHideDialog,
} from "../../../store/actions/toaster-actions";
import { getAllSessionClasses } from "../../../store/actions/class-actions";
import { promotionLocations, sessionLocations } from "../../../router/spm-path-locations";
import { getAllPromotionList, promoteStudent } from "../../../store/actions/promotion-actions";
import { getActiveSession } from "../../../store/actions/session-actions";
import { hasAccess, NavPermissions } from "../../../utils/permissions";

const PromotionSetup = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const history = useHistory();
  const promIntialState = { fromSessionClassId: "", fromClassName: "", passedStudents: "", failedStudents: "", toSessionClassId: "", toClassName: "" };
  const [promotion, setPromotion] = useState(promIntialState);
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { promotionList, resultSettingsItem } = state.promotion;
  const { itemList: classesToPromoteTo } = state.class;
  const { activeSession } = state.session;
  const { dialogResponse } = state.alert;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    getActiveSession()(dispatch);
    getAllPromotionList()(dispatch);
  }, [dispatch]);

  React.useEffect(() => {
    getAllSessionClasses(activeSession?.sessionId)(dispatch);
  }, [activeSession, dispatch]);

  React.useEffect(() => {
    if (dialogResponse === "continue") {
      if (!promotion.toSessionClassId) {
        showErrorToast("No class selected")(dispatch);
      } else {
        promoteStudent(promotion)(dispatch);
        showHideDialog(false, null)(dispatch);
        respondDialog("")(dispatch);
        setPromotion(promIntialState)
      }
      return () => {
        respondDialog("")(dispatch)
        showHideDialog(false, null)(dispatch);
      }
    }
  }, [dialogResponse, promotion.toSessionClassId, dispatch]);

  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-md-flex justify-content-between">
                <Row className="d-md-flex justify-content-between w-100">
                  <div className="col col-md-6">
                    <h4 className="card-title">Promotion Management</h4>
                  </div>
                  <div className="col col-md-6 d-md-flex justify-content-end">
                    {resultSettingsItem?.promoteAll ?
                      <h4 >
                        <Badge bg="light text-dark">All students will be promoted</Badge>
                      </h4>
                      :
                      <h4>
                        <Badge bg="light text-dark">Students will be promoted based on passmark</Badge>
                      </h4>
                    }
                  </div>
                </Row>
              </Card.Header>
              <Card.Body className="px-0">
                <div className="table-responsive">
                  <table
                    id="role-list-table"
                    className="table table-striped table-bordered"
                    role="grid"
                    data-toggle="data-table"
                  >
                    <thead className="text-dark">
                      <tr className="ligth">
                        <th>{"S/No"}</th>
                        <th className="text-center">Previous Class</th>
                        <th className="text-center">
                          Total Student <br /> in prev class
                        </th>
                        <th className="text-center">
                          total number of <br />
                          passed students
                        </th>
                        <th className="text-center">
                          total number of <br />
                          failed students
                        </th>
                        <th className="text-center">
                          total number <br />
                          to be promoted
                        </th>
                        <th className="text-center">
                          class to <br /> be promoted to
                        </th>
                        <th min-width="100px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {promotionList?.map((item, idx) => (
                        <tr key={idx}>
                          <td className="h4">{idx + 1}</td>
                          <td className="h5 text-center">
                            {item.sessionClassName}
                          </td>
                          <td className="h4 text-center">
                            {item.totalStudentsInClass}
                          </td>
                          <td onClick={() => history.push(`${promotionLocations.promotionPassedList}?passedStudentIds=${item.passedStudentIds}`)}
                            className="h2 text-center" style={{ backgroundColor: '#98FB98', cursor: 'pointer' }}>
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id="button-tooltip-2">
                                  View passed Student list
                                </Tooltip>
                              }
                            >
                              <div>
                                <a
                                  className="px-3 h2"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="Details"
                                >
                                  {item.totalStudentsPassed}
                                </a>
                              </div>
                            </OverlayTrigger>
                          </td>
                          <td onClick={() => history.push(`${promotionLocations.promotionFailedList}?failedStudentIds=${item.failedStudentIds}`)}
                            className="h2 text-center" style={{ backgroundColor: '#FF7C7C', cursor: 'pointer' }}>
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip id="button-tooltip-2">
                                  View Failed Student list
                                </Tooltip>
                              }
                            >
                              <div>
                                <a
                                  className="px-3 h2"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="Details"
                                >
                                  {item.totalStudentsFailed}
                                </a>
                              </div>
                            </OverlayTrigger>
                          </td>
                          <td className="h4 text-center">
                            {item.studentsToBePromoted}
                          </td>
                          <td className="h5 text-center">
                            <div className="form-group">
                              <select
                                as="select"
                                className="form-select"
                                name="classId"
                                id="form"
                                disabled={item.isPromoted}
                                onChange={(e) => {
                                  promotion.fromSessionClassId = item.sessionClassId;
                                  promotion.fromClassName = item.sessionClassName;
                                  promotion.passedStudents = item.passedStudentIds;
                                  promotion.failedStudents = item.failedStudentIds;
                                  promotion.toSessionClassId = e.target.value;
                                  promotion.toClassName = e.target.selectedOptions[0].dataset.tag
                                }
                                  // setPromotion(promotion)
                                }
                              >
                                <option defaultValue={""}>
                                  Select promotion class
                                </option>
                                {classesToPromoteTo?.filter(d => d.class !== item.sessionClassName)
                                  .map((promoteTo, idx) => (
                                    <option
                                      key={idx}
                                      data-tag={promoteTo.class}
                                      value={promoteTo.sessionClassId}
                                    >
                                      {promoteTo.class}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </td>
                          <td>
                            <div className="flex align-items-center list-user-action">
                              {hasAccess(NavPermissions.promoteStudents) && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip id="button-tooltip-2">
                                      Promote Student
                                    </Tooltip>
                                  }
                                >
                                  <Link
                                    style={{ visibility: item.isPromoted ? 'hidden' : 'visible' }}
                                    className="btn btn-sm btn-icon btn-success"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Details"
                                    to="#"
                                    onClick={() => {
                                      const message =
                                        promotion.className !== ""
                                        && `Are you sure you want to promote ${item.sessionClassName} students to ${promotion.toClassName}?`
                                      showHideDialog(true, message)(dispatch);
                                    }}
                                  >
                                    <span className="btn-inner">
                                      <svg
                                        width="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M21.4354 2.58198C20.9352 2.0686 20.1949 1.87734 19.5046 2.07866L3.408 6.75952C2.6797 6.96186 2.16349 7.54269 2.02443 8.28055C1.88237 9.0315 2.37858 9.98479 3.02684 10.3834L8.0599 13.4768C8.57611 13.7939 9.24238 13.7144 9.66956 13.2835L15.4329 7.4843C15.723 7.18231 16.2032 7.18231 16.4934 7.4843C16.7835 7.77623 16.7835 8.24935 16.4934 8.55134L10.72 14.3516C10.2918 14.7814 10.2118 15.4508 10.5269 15.9702L13.6022 21.0538C13.9623 21.6577 14.5826 22 15.2628 22C15.3429 22 15.4329 22 15.513 21.9899C16.2933 21.8893 16.9135 21.3558 17.1436 20.6008L21.9156 4.52479C22.1257 3.84028 21.9356 3.09537 21.4354 2.58198Z"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                        <path
                                          d="M11.9946 16V12"
                                          stroke="currentColor"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                        <path
                                          d="M11.9896 8.2041H11.9996"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        ></path>
                                      </svg>
                                    </span>
                                  </Link>

                                </OverlayTrigger>)}{" "}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PromotionSetup;
