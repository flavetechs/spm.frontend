import React, { useEffect, useState } from 'react'
import { Row, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { respondToDeleteDialog, showErrorToast, showHideModal, showSingleDeleteDialog } from '../../../../store/actions/toaster-actions'
import Card from '../../../Card'
import './timetable.scss';
import { deleteExamClassTimetabledays, deleteExamClassTimetableTime, pushId, removeId } from '../../../../store/actions/timetable-actions'
import { hasAccess, NavPermissions } from '../../../../utils/permissions'
import { classLocations, timetableLocations } from '../../../../router/spm-path-locations'
import { ExamSubjectModal } from './exam-subject-modal'
import { NewExamDayModal } from './new-exam-day-modal'
import { NewExamTimeModal } from './new-exam-time-modal'
import { UpdateExamDayModal } from './update-exam-day-modal'
import { UpdateExamTimeModal } from './update-exam-time-modal'


const ExamTimeTableActivities = ({ selectedExamTimetable, selectedClassId,sessionClassId }) => {

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { selectedIds } = state.timetable;
    const { deleteDialogResponse } = state.alert;
    // ACCESSING STATE FROM REDUX STORE

    //VARIABLE DECLARATION
    const dispatch = useDispatch();
    let history = useHistory();
    const [selectedActivityId, setSelectedActivityId] = useState("");
    const [deleteIds, setDeleteIds] = useState('');
    const [modal, setModal] = useState('');
    const [periodActivity, setPeriodActivity] = useState("");
    const [currentDay, setCurrentDay] = useState("");
    const [timetableDayId, setTimetableDayId] = useState("");
    const [currentPeriod, setCurrentPeriod] = useState("");
    const [timetableTimeId, setTimetableTimeId] = useState("");;
    const [selectedTimetableAsProp, setSelectedTimetableAsProp] = useState(selectedExamTimetable);

    //VARIABLE DECLARATION

    useEffect(() => {
        setSelectedTimetableAsProp(selectedExamTimetable)
    }, []);

    //DELETE HANDLER
    useEffect(() => {
        if (deleteDialogResponse === "continue") {
            if (selectedIds.length === 0) {
                showErrorToast("No Item selected to be deleted")(dispatch);
            } else {
                if (deleteIds === 'day') {
                    deleteExamClassTimetabledays(selectedIds, selectedClassId)(dispatch);
                    respondToDeleteDialog("")(dispatch);
                } else if (deleteIds === 'time') {
                    deleteExamClassTimetableTime(selectedIds, selectedClassId)(dispatch);
                    respondToDeleteDialog("")(dispatch);
                }
            }
        } else {
            selectedIds.forEach((id) => {
                dispatch(removeId(id));
            });
        }
        return () => {
            respondToDeleteDialog("")(dispatch);
        };
    }, [deleteDialogResponse, dispatch]);
    //DELETE HANDLER


    return (
        <>
            <Row id="exam-timetable">
                <Col sm="12">
                    <Card className='mt-0'>
                        <Card.Header className="d-flex justify-content-between flex-wrap">
                            <div className="header-title">
                                <h4>{`${selectedExamTimetable?.className} Exam Timetable`}</h4>
                            </div>
                            {hasAccess(NavPermissions.createTimeTable) && (
                                <div className='d-flex justify-content-end'>
                                    <Button className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3"
                                        onClick={() => {
                                            showHideModal(true)(dispatch);
                                            setModal('newDayModal');
                                        }
                                        }
                                    >
                                        <svg className='' width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.09277 9.40421H20.9167" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                strokeLinejoin="round" />
                                            <path d="M16.442 13.3097H16.4512" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                strokeLinejoin="round" />
                                            <path d="M12.0045 13.3097H12.0137" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                strokeLinejoin="round" />
                                            <path d="M7.55818 13.3097H7.56744" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                strokeLinejoin="round" />
                                            <path d="M16.442 17.1962H16.4512" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                strokeLinejoin="round" />
                                            <path d="M12.0045 17.1962H12.0137" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                strokeLinejoin="round" />
                                            <path d="M7.55818 17.1962H7.56744" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                strokeLinejoin="round" />
                                            <path d="M16.0433 2V5.29078" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M7.96515 2V5.29078" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M16.2383 3.5791H7.77096C4.83427 3.5791 3 5.21504 3 8.22213V17.2718C3 20.3261 4.83427 21.9999 7.77096 21.9999H16.229C19.175 21.9999 21 20.3545 21 17.3474V8.22213C21.0092 5.21504 19.1842 3.5791 16.2383 3.5791Z"
                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg> {" "}
                                        <span>Add Day</span>
                                    </Button>

                                    <Button className="text-center btn-primary btn-icon mt-lg-0 mt-md-0 mt-3"
                                        onClick={() => {
                                            showHideModal(true)(dispatch);
                                            setModal('newTimeModal');
                                        }
                                        }
                                    >
                                        <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                d="M21.25 12.0005C21.25 17.1095 17.109 21.2505 12 21.2505C6.891 21.2505 2.75 17.1095 2.75 12.0005C2.75 6.89149 6.891 2.75049 12 2.75049C17.109 2.75049 21.25 6.89149 21.25 12.0005Z"
                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M15.4316 14.9429L11.6616 12.6939V7.84692" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                strokeLinejoin="round" />
                                        </svg> {" "}
                                        <span>Add Time</span>
                                    </Button> {" "}

                                    <Button className="text-center btn-primary btn-icon mt-lg-0 mt-md-0 mt-3 ms-2"
                                        onClick={() => {
                                            history.push(`${timetableLocations.printTimeTable}?selectedClassId=${selectedClassId}&type=examTimeTable`);
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-printer" viewBox="0 0 16 16">
                                            <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                                            <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
                                        </svg> {""}
                                        <span>Print</span>
                                    </Button>
                                </div>
                            )}

                        </Card.Header>
                        {modal === 'newDayModal' ?
                            <NewExamDayModal
                                selectedTimetable={selectedExamTimetable}
                                selectedClassId={selectedClassId}
                            /> : modal === 'newTimeModal' ?
                                <NewExamTimeModal
                                    selectedTimetable={selectedExamTimetable}
                                    selectedClassId={selectedClassId}
                                /> :
                                modal === 'updateDayModal' ? <UpdateExamDayModal selectedClassId={selectedClassId} selectedTimetable={selectedExamTimetable} currentDay={currentDay} timetableDayId={timetableDayId} /> :
                                    modal === 'updateTimeModal' ? <UpdateExamTimeModal selectedTimetable={selectedExamTimetable} selectedClassId={selectedClassId} currentPeriod={currentPeriod} timetableTimeId={timetableTimeId}
                                    /> :
                                        modal === 'examSubjectModal' ? <ExamSubjectModal
                                            selectedActivityId={selectedActivityId}
                                            sessionClassId={sessionClassId}
                                            selectedClassId={selectedClassId}
                                            periodActivity={periodActivity}
                                        />
                                            :
                                            ' '
                        }
                        <Card.Body>
                            <div className="table-responsive">
                                <table className="table striped='column' table-bordered border-3">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            {selectedExamTimetable?.timetable?.days?.map((items, index) => (
                                                <th className="text-center" key={index} >{items.day}
                                                    <div style={{ float: "right" }}>
                                                        {hasAccess(NavPermissions.createTimeTable) && (
                                                            <OverlayTrigger
                                                                placement="top"
                                                                overlay={
                                                                    <Tooltip id="button-tooltip-2"> Edit day</Tooltip>
                                                                }
                                                            >
                                                                <Link className="btn btn-sm btn-icon text-primary flex-end" data-bs-toggle="tooltip" title="Edit User" to="#"
                                                                    onClick={() => {
                                                                        showHideModal(true)(dispatch);
                                                                        setModal('updateDayModal');
                                                                        setCurrentDay(items.day);
                                                                        setTimetableDayId(items?.examTimeTableDayId);
                                                                    }
                                                                    }
                                                                >
                                                                    <span className="btn-inner">
                                                                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                                            <path d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                            <path d="M15.1655 4.60254L19.7315 9.16854" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                        </svg>
                                                                    </span>
                                                                </Link>
                                                            </OverlayTrigger>
                                                        )}
                                                        {hasAccess(NavPermissions.createTimeTable) && (
                                                            <OverlayTrigger
                                                                placement="top"
                                                                overlay={
                                                                    <Tooltip id="button-tooltip-2"> Delete</Tooltip>
                                                                }
                                                            >
                                                                <Link className="btn btn-sm btn-icon text-danger" data-bs-toggle="tooltip" title="Delete" to="#"
                                                                    data-original-title="Delete"
                                                                    data-id={items.examTimeTableDayId}
                                                                    onClick={() => {
                                                                        dispatch(pushId(items.examTimeTableDayId));
                                                                        showSingleDeleteDialog(true)(dispatch);
                                                                        setDeleteIds('day');
                                                                    }
                                                                    }
                                                                >
                                                                    <span className="btn-inner">
                                                                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                                            <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                            <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                            <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                        </svg>
                                                                    </span>
                                                                </Link>
                                                            </OverlayTrigger>
                                                        )}
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedExamTimetable?.timetable?.times?.map((item, index) => (
                                            <tr key={index}>
                                                <td >
                                                    {item.period}
                                                    <span style={{ float: 'right' }}>
                                                        {hasAccess(NavPermissions.createTimeTable) && (
                                                            <OverlayTrigger
                                                                placement="top"
                                                                overlay={
                                                                    <Tooltip id="button-tooltip-2"> Edit Time</Tooltip>
                                                                }
                                                            >
                                                                <Link className="btn btn-sm btn-icon text-primary flex-end" data-bs-toggle="tooltip" title="Edit User" to="#"
                                                                    onClick={() => {
                                                                        showHideModal(true)(dispatch);
                                                                        setModal('updateTimeModal');
                                                                        setCurrentPeriod(item?.period);
                                                                        setTimetableTimeId(item?.examTimeTableTimeId);
                                                                    }
                                                                    }
                                                                >
                                                                    <span className="btn-inner">
                                                                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                                            <path d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                            <path fillRule="evenodd" clipRule="evenodd" d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                            <path d="M15.1655 4.60254L19.7315 9.16854" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                        </svg>
                                                                    </span>
                                                                </Link>
                                                            </OverlayTrigger>
                                                        )}
                                                        {hasAccess(NavPermissions.createTimeTable) && (
                                                            <OverlayTrigger
                                                                placement="top"
                                                                overlay={
                                                                    <Tooltip id="button-tooltip-2"> Delete</Tooltip>
                                                                }
                                                            >
                                                                <Link className="btn btn-sm btn-icon text-danger" data-bs-toggle="tooltip" title="Delete User" to="#"
                                                                    onClick={() => {
                                                                        dispatch(pushId(item.examTimeTableTimeId));
                                                                        showSingleDeleteDialog(true)(dispatch);
                                                                        setDeleteIds('time');
                                                                    }
                                                                    }
                                                                >
                                                                    <span className="btn-inner">
                                                                        <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                                            <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                            <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                            <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                        </svg>
                                                                    </span>
                                                                </Link>
                                                            </OverlayTrigger>
                                                        )}


                                                    </span>
                                                </td>
                                                {hasAccess(NavPermissions.createTimeTable) ?
                                                    item?.periodActivities?.map((activityItem, idx) => {
                                                        return <OverlayTrigger
                                                            placement="top"
                                                            key={idx}
                                                            overlay={<Tooltip id="button-tooltip-2">Double Click to update</Tooltip>}
                                                        >
                                                            <td
                                                                style={{ cursor: 'pointer' }}
                                                                onDoubleClick={() => {
                                                                    showHideModal(true)(dispatch);
                                                                    setModal('examSubjectModal');
                                                                    setSelectedActivityId(activityItem?.activityId);
                                                                    setPeriodActivity(activityItem?.activity);
                                                                }
                                                                }
                                                            >
                                                                {activityItem.activity}
                                                            </td>
                                                        </OverlayTrigger>
                                                    })
                                                    :
                                                    item?.periodActivities?.map((activityItem, idx) => {
                                                        return <td
                                                            key={idx}
                                                        >
                                                            {activityItem.activity}
                                                        </td>
                                                    })
                                                }
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card.Body>
                        {/* <Card.Footer>
                            <PrintTimeTable
                                selectedTimetableAsProp={selectedTimetableAsProp}
                            />
                        </Card.Footer> */}
                    </Card>

                </Col>
            </Row>
        </>
    )
}
export default ExamTimeTableActivities;