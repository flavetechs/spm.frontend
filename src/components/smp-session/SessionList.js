import React, { useState } from 'react'
import { Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Card from '../Card'
// import {
//   getAllSessionClasses,
//   pushId,
//   removeId,
//   returnList,
//   deleteSessionClass,
//   fetchSingleItem,
// } from "../../store/actions/class-actions";
import { deleteSession, getAllSession, pushId, removeId, returnList } from '../../store/actions/session-actions';
import { useDispatch, useSelector } from "react-redux";
import { sessionLocations } from "../../router/spm-path-locations";
import { respondToDeleteDialog, showErrorToast, showSingleDeleteDialog } from '../../store/actions/toaster-actions';



const SessionList = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const history = useHistory();
  const [showDeleteButton, setDeleteButton] = useState(true);
  const [showCheckBoxes, setShowCheckBoxes] = useState(false);
  //VARIABLE DECLARATIONS


  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { sessionList, selectedIds } = state.session;
  const { deleteDialogResponse } = state.alert;
  // ACCESSING STATE FROM REDUX STORE

  console.log('selectedIds', selectedIds);
  React.useEffect(() => {
    getAllSession()(dispatch)
  }, []);

  //DELETE HANDLER
  React.useEffect(() => {
    if (deleteDialogResponse === 'continue') {
      if (selectedIds.length === 0) {
        showErrorToast('No Item selected to be deleted')(dispatch);
      } else {
        deleteSession(selectedIds)(dispatch);
        setDeleteButton(!showDeleteButton)
        setShowCheckBoxes(false);
        respondToDeleteDialog('')(dispatch);
      }
    } else {
      setDeleteButton(true)
      setShowCheckBoxes(false)
      selectedIds.forEach(id => {
        dispatch(removeId(id))
      });
    }
    return () => {
      respondToDeleteDialog('')(dispatch);
    }
  }, [deleteDialogResponse]);
  //DELETE HANDLER

  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title">School Session</h4>
                </div>
              </Card.Header>
              <div className="d-flex justify-content-end">
                <Link
                  to={sessionLocations.sessionAdd}
                  className="d-flex justify-content-end"
                >
                  <button
                    type="button"
                    className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3 btn btn-primary"
                  >
                    <i className="btn-inner">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                      </svg>
                    </i>
                    <span>New Session</span>
                  </button>
                </Link>
              </div>
              <Card.Body className="px-0">
                <div className="table-responsive">
                  <table
                    id="role-list-table"
                    className="table table-striped"
                    role="grid"
                    data-toggle="data-table"
                  >
                    <thead>
                      <tr className="ligth">
                        <th>
                          {showCheckBoxes ? null : "S/No"}

                        </th>
                        <th>Principal</th>
                        <th>Session Year</th>
                        <th>Terms</th>
                        <th>Status</th>
                        <th min-width="100px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessionList.map((item, idx) => (
                        <tr key={idx}>
                          <td className="">
                            {showCheckBoxes ? (
                              null) : (
                              idx + 1
                            )}
                          </td>
                          <td>{item.headTeacherName}</td>
                          <td>{item.startDate}/{item.endDate}</td>
                          <td>
                            <div className="iq-media-group iq-media-group-1">
                              {item.terms.map((term, idx) => {
                                if (term.isActive) {
                                  return (

                                    <OverlayTrigger placement="top" key={idx} overlay={
                                      <Tooltip>
                                        {term.termName} term (active)
                                      </Tooltip>
                                    }>
                                      <Link to="#" className="iq-media-1">
                                        <div className={" icon iq-icon-box-3 rounded-pill text-white bg-success"}>{term.termName}</div>


                                      </Link>
                                    </OverlayTrigger>
                                  )
                                } else {
                                  return (
                                    <OverlayTrigger placement="top" key={idx} overlay={
                                      <Tooltip>
                                        {term.termName} term (inactive)
                                      </Tooltip>
                                    }>
                                      <Link to="#" className="iq-media-1" key={idx} >
                                        <div className={" icon iq-icon-box-3 rounded-pill text-white bg-primary"}>{term.termName}</div>


                                      </Link>
                                    </OverlayTrigger>
                                  )
                                }

                              })}
                            </div>
                          </td>
                          <td>{item.isActive ? <span className="badge bg-success">Isactive</span> : <span className="badge bg-primary">inactive</span>}</td>
                          <td>
                            <div className="flex align-items-center list-user-action">
                              <Link
                                className="btn btn-sm btn-icon btn-danger"
                                data-toggle="tooltip"
                                data-placement="top"
                                title=""
                                data-original-title="Delete"
                                to="#"
                                data-id={item.sessionId}
                                onClick={() => {
                                  dispatch(pushId(item.sessionId))
                                  showSingleDeleteDialog(true)(dispatch)
                                }
                                }
                              >
                                <span className="btn-inner">
                                  <svg
                                    width="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    stroke="currentColor"
                                  >
                                    <path
                                      d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                    <path
                                      d="M20.708 6.23975H3.75"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                    <path
                                      d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    ></path>
                                  </svg>
                                </span>
                              </Link>

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

export default SessionList;
