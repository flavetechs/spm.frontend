import React, { useState } from 'react'
import { Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Card from '../../Card'

import { activateSession, deleteSession, getActiveSession, getAllSession, pushId, removeId, switchTerm } from '../../../store/actions/session-actions';
import { useDispatch, useSelector } from "react-redux";
import { sessionLocations } from "../../../router/spm-path-locations";
import { respondDialog, respondToDeleteDialog, showErrorToast, showHideDialog, showSingleDeleteDialog } from '../../../store/actions/toaster-actions';
import { ordinalSuffixOf } from '../../../utils/tools';
import { hasAccess, NavPermissions } from '../../../utils/permissions';
import "./class-setup.scss"




const SessionList = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [showDeleteButton, setDeleteButton] = useState(true);
  const [showCheckBoxes, setShowCheckBoxes] = useState(false);
  const [nextTermText, setNextTermText] = useState('');
  const [disableNextBtn, setDisableNextBtn] = useState('');
  const [previousTermText, setPreviousTermText] = useState('');
  const [disablePreviousBtn, setDisablePreviousBtn] = useState('');
  const [nextTerm, setNextTerm] = useState(null);
  const [previousTerm, setPreviousTerm] = useState(null);
  const [action, setAction] = useState();
  const [isSessionSwitch, setIsSessonSwitch] = useState(false);
  const [sessionToSwitch, setSessionToSwitch] = useState(null);
  //VARIABLE DECLARATIONS


  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { sessionList, selectedIds, activeSession } = state.session;
  const { deleteDialogResponse, dialogResponse } = state.alert;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    getAllSession()(dispatch);
    getActiveSession()(dispatch);

  }, []);

  React.useEffect(() => {

    const indexOfCurrentTerm = activeSession?.terms.findIndex(d => {
      return activeSession?.sessionTermId === d.sessionTermId
    }) + 1;
    const numberOfTerms = activeSession?.terms.length;

    if (numberOfTerms == 1 && indexOfCurrentTerm == numberOfTerms) {
      setDisablePreviousBtn('btn disabled');
      setDisableNextBtn('btn disabled');

    } else {
      const lastTerm = activeSession?.terms[activeSession?.terms.length - 1];
      const firstTerm = activeSession?.terms[0];
      if (firstTerm?.termName.charAt(0) == indexOfCurrentTerm) {
        setNextTermText(`SWITCH TO ${ordinalSuffixOf(indexOfCurrentTerm + 1)} TERM`)
        setDisableNextBtn('');

        setNextTerm(activeSession?.terms[indexOfCurrentTerm]);
        setPreviousTermText(``);

        setDisablePreviousBtn('btn disabled');
      }
      if (lastTerm?.termName.charAt(0) == indexOfCurrentTerm) {
        setNextTermText(``)
        setDisableNextBtn('btn disabled');

        setPreviousTermText(`SWITCH BACK TO ${ordinalSuffixOf(indexOfCurrentTerm - 1)} TERM`);
        setDisablePreviousBtn('');

        setNextTerm(activeSession?.terms[indexOfCurrentTerm]);
        setPreviousTerm(activeSession?.terms[indexOfCurrentTerm - 2]);
      }

      if (activeSession?.sessionTerm.charAt(0) !== firstTerm?.termName.charAt(0)
        && activeSession?.sessionTerm.charAt(0) !== lastTerm?.termName.charAt(0)) {
        const trm = Number(activeSession?.sessionTerm.charAt(0));
        setNextTermText(`SWITCH TO ${ordinalSuffixOf(trm + 1)} TERM`)
        setDisableNextBtn('');

        setPreviousTermText(`SWITCH BACK TO ${ordinalSuffixOf(trm - 1)} TERM`);
        setDisablePreviousBtn('');

        setNextTerm(activeSession?.terms[indexOfCurrentTerm]);
        setPreviousTerm(activeSession?.terms[indexOfCurrentTerm - 2]);
      }
    }

  }, [activeSession]);

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


  //SWITCH HANDLER

  React.useEffect(() => {
    if (isSessionSwitch) {
      if (dialogResponse === "continue") {
        activateSession(sessionToSwitch)(dispatch)
        showHideDialog(false, null)(dispatch)
        respondDialog("")(dispatch);
      }
     setIsSessonSwitch(false);
     setSessionToSwitch(null)
    } 
    else 
    {
      if (dialogResponse === 'continue') {
        if (action === 'next')
          switchTerm(nextTerm)(dispatch)
        if (action === 'prev')
          switchTerm(previousTerm)(dispatch)
      }
      setAction('');
      respondDialog('')(dispatch)
    }
    return () => {
      respondDialog("")(dispatch);
    };

  }, [dialogResponse]);


  //SWITCH HANDLER

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

              <div className="d-flex row justify-content-end px-4 pt-2 pb-0 mb-0">
                <Col sm="12" md="6" className='d-flex justify-content-start round-2'>
                  <span className='display-6 text-white  bg-primary'>{activeSession ? ordinalSuffixOf(activeSession?.sessionTerm.charAt(0)) : ''} Term {activeSession?.session}</span>
                </Col>

                <Col as={'nav'} sm="12" md="6" className='d-flex justify-content-end'>
                  <ul className="pagination pagination-lg pagination-on-mobile">
                    <li className="page-item pagination-on-mobile-icon">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="button-tooltip-2">NEW SESSION</Tooltip>}
                      >
                        <Link className="page-link" to={sessionLocations.sessionAdd}>
                          <svg width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7.33 2H16.66C20.06 2 22 3.92 22 7.33V16.67C22 20.06 20.07 22 16.67 22H7.33C3.92 22 2 20.06 2 16.67V7.33C2 3.92 3.92 2 7.33 2ZM12.82 12.83H15.66C16.12 12.82 16.49 12.45 16.49 11.99C16.49 11.53 16.12 11.16 15.66 11.16H12.82V8.34C12.82 7.88 12.45 7.51 11.99 7.51C11.53 7.51 11.16 7.88 11.16 8.34V11.16H8.33C8.11 11.16 7.9 11.25 7.74 11.4C7.59 11.56 7.5 11.769 7.5 11.99C7.5 12.45 7.87 12.82 8.33 12.83H11.16V15.66C11.16 16.12 11.53 16.49 11.99 16.49C12.45 16.49 12.82 16.12 12.82 15.66V12.83Z" fill="currentColor"></path></svg>
                        </Link>
                      </OverlayTrigger>
                    </li>
                    <li className="page-item">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="button-tooltip-2">VIEW CURRENT SESSION</Tooltip>}
                      >
                        <Link className="page-link" to={`${sessionLocations.sessionDetails}?sessionId=${activeSession?.sessionId}`}>
                          <svg width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M7.67 1.99927H16.34C19.73 1.99927 22 4.37927 22 7.91927V16.0903C22 19.6203 19.73 21.9993 16.34 21.9993H7.67C4.28 21.9993 2 19.6203 2 16.0903V7.91927C2 4.37927 4.28 1.99927 7.67 1.99927ZM11.99 9.06027C11.52 9.06027 11.13 8.66927 11.13 8.19027C11.13 7.70027 11.52 7.31027 12.01 7.31027C12.49 7.31027 12.88 7.70027 12.88 8.19027C12.88 8.66927 12.49 9.06027 11.99 9.06027ZM12.87 15.7803C12.87 16.2603 12.48 16.6503 11.99 16.6503C11.51 16.6503 11.12 16.2603 11.12 15.7803V11.3603C11.12 10.8793 11.51 10.4803 11.99 10.4803C12.48 10.4803 12.87 10.8793 12.87 11.3603V15.7803Z" fill="currentColor"></path></svg>
                        </Link>
                      </OverlayTrigger>
                    </li>
                    <li className="page-item">

                      {hasAccess(NavPermissions.switchTerms) && (
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip id="button-tooltip-2">{previousTermText}</Tooltip>}
                        >

                          <a onClick={() => {
                            showHideDialog(true, `Are you sure you want switch to ${previousTerm?.termName} term`)(dispatch)
                            setAction('prev');
                          }
                          } className={`page-link ${disablePreviousBtn}`} to={''}>
                            <svg width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M13.165 11.9934L13.1634 11.6393C13.1513 10.2348 13.0666 8.98174 12.9206 8.18763C12.9206 8.17331 12.7613 7.38572 12.6599 7.12355C12.5006 6.74463 12.2126 6.42299 11.8515 6.2192C11.5624 6.0738 11.2592 6 10.9417 6C10.6922 6.01157 10.2806 6.13714 9.98692 6.24242L9.74283 6.33596C8.12612 6.97815 5.03561 9.07656 3.85199 10.3598L3.76473 10.4495L3.37527 10.8698C3.12982 11.1915 3 11.5847 3 12.0077C3 12.3866 3.11563 12.7656 3.3469 13.0718C3.41614 13.171 3.52766 13.2983 3.62693 13.4058L4.006 13.8026C5.31046 15.1243 8.13485 16.9782 9.59883 17.5924C9.59883 17.6057 10.5086 17.9857 10.9417 18H10.9995C11.6639 18 12.2846 17.6211 12.6021 17.0086C12.6888 16.8412 12.772 16.5132 12.8352 16.2252L12.949 15.6813C13.0788 14.8067 13.165 13.465 13.165 11.9934ZM19.4967 13.5183C20.3269 13.5183 21 12.8387 21 12.0004C21 11.1622 20.3269 10.4825 19.4967 10.4825L15.7975 10.8097C15.1463 10.8097 14.6183 11.3417 14.6183 12.0004C14.6183 12.6581 15.1463 13.1912 15.7975 13.1912L19.4967 13.5183Z" fill="currentColor"></path></svg>
                          </a>


                        </OverlayTrigger>
                      )}
                    </li>

                    <li className="page-item ">

                      {hasAccess(NavPermissions.switchTerms) && (
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip id="button-tooltip-2">{nextTermText} </Tooltip>}
                        >

                          <a onClick={() => {
                            showHideDialog(true, `Are you sure you want switch to ${nextTerm?.termName} term`)(dispatch)
                            setAction('next');
                          }
                          } className={`page-link ${disableNextBtn}`} to={''}>
                            <svg width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M10.835 12.0066L10.8366 12.3607C10.8487 13.7652 10.9334 15.0183 11.0794 15.8124C11.0794 15.8267 11.2387 16.6143 11.3401 16.8764C11.4994 17.2554 11.7874 17.577 12.1485 17.7808C12.4376 17.9262 12.7408 18 13.0583 18C13.3078 17.9884 13.7194 17.8629 14.0131 17.7576L14.2572 17.664C15.8739 17.0218 18.9644 14.9234 20.148 13.6402L20.2353 13.5505L20.6247 13.1302C20.8702 12.8085 21 12.4153 21 11.9923C21 11.6134 20.8844 11.2344 20.6531 10.9282C20.5839 10.829 20.4723 10.7017 20.3731 10.5942L19.994 10.1974C18.6895 8.87572 15.8652 7.02183 14.4012 6.40756C14.4012 6.39435 13.4914 6.01432 13.0583 6H13.0005C12.3361 6 11.7154 6.37892 11.3979 6.99137C11.3112 7.1588 11.228 7.48678 11.1648 7.77483L11.051 8.31871C10.9212 9.19332 10.835 10.535 10.835 12.0066ZM4.50325 10.4817C3.67308 10.4817 3 11.1613 3 11.9996C3 12.8378 3.67308 13.5175 4.50325 13.5175L8.20248 13.1903C8.85375 13.1903 9.38174 12.6583 9.38174 11.9996C9.38174 11.3419 8.85375 10.8088 8.20248 10.8088L4.50325 10.4817Z" fill="currentColor"></path></svg>
                          </a>
                        </OverlayTrigger>

                      )}
                    </li>
                  </ul>
                </Col>

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
                        <th>Session Year</th>
                        <th>Principal</th>
                        <th>Terms</th>
                        <th>Status</th>
                        <th min-width="100px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessionList?.map((item, idx) => (
                        <tr key={idx}>
                          <td className="">
                            {showCheckBoxes ? (
                              null) : (
                              idx + 1
                            )}
                          </td>
                          <td><b>{item.startDate}/{item.endDate}</b></td>
                          <td className='text-uppercase'><b>{item.headTeacherName}</b></td>
                          <td>
                            <div className="iq-media-group iq-media-group-1">
                              {item?.terms?.map((term, idx) => {
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
                              <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip id="button-tooltip-2">Session Details</Tooltip>}
                              >
                                <Link
                                  className="btn btn-sm btn-icon btn-success"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title=""
                                  data-original-title="Details"
                                  to={`${sessionLocations.sessionDetails}?sessionId=${item.sessionId}`}
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
                                        d="M16.334 2.75H7.665C4.644 2.75 2.75 4.889 2.75 7.916V16.084C2.75 19.111 4.635 21.25 7.665 21.25H16.333C19.364 21.25 21.25 19.111 21.25 16.084V7.916C21.25 4.889 19.364 2.75 16.334 2.75Z"
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
                              </OverlayTrigger>{" "}

                              {hasAccess(NavPermissions.deleteSession) && (
                                <OverlayTrigger
                                  placement="top"
                                  overlay={<Tooltip id="button-tooltip-2">Delete</Tooltip>}
                                >
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

                                </OverlayTrigger>
                              )}
                              {" "}
                              {hasAccess(NavPermissions.switchTerms) && !item.isActive && (

                                <OverlayTrigger
                                  placement="top"
                                  overlay={<Tooltip id="button-tooltip-2">Activate Session</Tooltip>}
                                >
                                  <Link
                                    className="btn btn-sm btn-icon btn-warning"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title=""
                                    data-original-title="Delete"
                                    to="#"
                                    data-id={item.sessionId}
                                    onClick={() => {
                                      setSessionToSwitch(item.sessionId);
                                      setIsSessonSwitch(true);
                                      const message = `Are you sure you want to activate ${item.startDate} / ${item.endDate} session ?`;
                                      showHideDialog(true, message)(dispatch);
                                    }
                                    }
                                  >
                                    <span className="btn-inner">
                                      <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" d="M16.3405 1.99976H7.67049C4.28049 1.99976 2.00049 4.37976 2.00049 7.91976V16.0898C2.00049 19.6198 4.28049 21.9998 7.67049 21.9998H16.3405C19.7305 21.9998 22.0005 19.6198 22.0005 16.0898V7.91976C22.0005 4.37976 19.7305 1.99976 16.3405 1.99976Z" fill="currentColor"></path><path d="M10.8134 15.248C10.5894 15.248 10.3654 15.163 10.1944 14.992L7.82144 12.619C7.47944 12.277 7.47944 11.723 7.82144 11.382C8.16344 11.04 8.71644 11.039 9.05844 11.381L10.8134 13.136L14.9414 9.00796C15.2834 8.66596 15.8364 8.66596 16.1784 9.00796C16.5204 9.34996 16.5204 9.90396 16.1784 10.246L11.4324 14.992C11.2614 15.163 11.0374 15.248 10.8134 15.248Z" fill="currentColor"></path></svg>

                                    </span>
                                  </Link>

                                </OverlayTrigger>
                              )}
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
