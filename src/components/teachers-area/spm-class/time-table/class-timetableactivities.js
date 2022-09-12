import React, { useState } from 'react'
import { Row, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { respondToDeleteDialog, showErrorToast, showHideModal, showSingleDeleteDialog } from '../../../../store/actions/toaster-actions'
import Card from '../../../Card'
import './timetable.scss';
import { NewTimeModal } from './new-time-modal'
import { NewDayModal } from './new-day-modal'
import { UpdateDayModal } from './update-day-modal'
import { UpdateTimeModal } from './update-time-modal'
import { PeriodActivityModal } from './period-activity-modal'
import { deleteClassTimetabledays, deleteClassTimetableTime, pushId, removeId } from '../../../../store/actions/timetable-actions'


const ClassTimeTableActivities = ({ selectedTimetable, selectedClassId }) => {

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { selectedIds } = state.timetable;
    const { deleteDialogResponse } = state.alert;
    // ACCESSING STATE FROM REDUX STORE

    //VARIABLE DECLARATION
    const dispatch = useDispatch();
    const [selectedActivityId, setSelectedActivityId] = useState("");
    const [deleteIds, setDeleteIds] = useState('');
    const [modal, setModal] = useState('');
    const [periodActivity, setPeriodActivity] = useState("");
    const [currentDay, setCurrentDay] = useState("");
    const [timetableDayId, setTimetableDayId] = useState("");
    const [currentPeriod, setCurrentPeriod] = useState("");
    const [timetableTimeId, setTimetableTimeId] = useState("");
    //VARIABLE DECLARATION

    //DELETE HANDLER
    React.useEffect(() => {
        if (deleteDialogResponse === "continue") {
            if (selectedIds.length === 0) {
                showErrorToast("No Item selected to be deleted")(dispatch);
            } else {
                if (deleteIds === 'day') {
                    deleteClassTimetabledays(selectedIds, selectedClassId)(dispatch);
                    respondToDeleteDialog("")(dispatch);
                } else if (deleteIds === 'time') {
                    deleteClassTimetableTime(selectedIds, selectedClassId)(dispatch);
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
            <Row>
                <Col sm="12">
                    <Card className='mt-0'>
                        <Card.Header className="d-flex justify-content-between flex-wrap">
                            <div className="header-title">
                                <h4>{`${selectedTimetable?.className} Class Timetable`}</h4>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <Button className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3"
                                    onClick={() => {
                                        showHideModal(true)(dispatch);
                                        setModal('newTimeModal');
                                    }
                                    }
                                >
                                    <i className="btn-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </i>
                                    <span>Add Time</span>
                                </Button>
                                <Button className="text-center btn-primary btn-icon mt-lg-0 mt-md-0 mt-3"
                                    onClick={() => {
                                        showHideModal(true)(dispatch);
                                        setModal('newDayModal');
                                    }
                                    }
                                >
                                    <i className="btn-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </i>
                                    <span>Add Day</span>
                                </Button>
                            </div>
                        </Card.Header>
                        {modal === 'newDayModal' ?
                            <NewDayModal
                            selectedTimetable={selectedTimetable}
                                selectedClassId={selectedClassId}
                            /> : modal === 'newTimeModal' ?
                                <NewTimeModal
                                selectedTimetable={selectedTimetable}
                                    selectedClassId={selectedClassId}
                                /> :
                                modal === 'updateDayModal' ? <UpdateDayModal selectedClassId={selectedClassId} selectedTimetable={selectedTimetable} currentDay={currentDay} timetableDayId={timetableDayId} /> :
                                    modal === 'updateTimeModal' ? <UpdateTimeModal selectedTimetable={selectedTimetable} selectedClassId={selectedClassId} currentPeriod={currentPeriod} timetableTimeId={timetableTimeId}
                                    /> :
                                        modal === 'periodActivityModal' ? <PeriodActivityModal
                                            selectedActivityId={selectedActivityId}
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
                                            {selectedTimetable?.timetable?.days?.map((items, index) => (
                                                <th className="text-center" key={index} >{items.day}
                                                    <div style={{ float: "right" }}>
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
                                                                    setCurrentDay(items.day)
                                                                    setTimetableDayId(items?.classTimeTableDayId)
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
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={
                                                                <Tooltip id="button-tooltip-2"> Delete</Tooltip>
                                                            }
                                                        >
                                                            <Link className="btn btn-sm btn-icon text-danger" data-bs-toggle="tooltip" title="Delete" to="#"
                                                                data-original-title="Delete"
                                                                data-id={items.classTimeTableDayId}
                                                                onClick={() => {
                                                                    dispatch(pushId(items.classTimeTableDayId));
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
                                                    </div>
                                                </th>

                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedTimetable?.timetable?.times?.map((item, index) => (
                                            <tr key={index}>
                                                <td >
                                                    {item.period}
                                                    <span style={{ float: 'right' }}>
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
                                                                    setTimetableTimeId(item?.classTimeTableTimeId);
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
                                                        <OverlayTrigger
                                                            placement="top"
                                                            overlay={
                                                                <Tooltip id="button-tooltip-2"> Delete</Tooltip>
                                                            }
                                                        >
                                                            <Link className="btn btn-sm btn-icon text-danger" data-bs-toggle="tooltip" title="Delete User" to="#"
                                                                onClick={() => {
                                                                    dispatch(pushId(item.classTimeTableTimeId));
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

                                                    </span>
                                                </td>
                                                {
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
                                                                    setModal('periodActivityModal');
                                                                    setSelectedActivityId(activityItem?.activityId);
                                                                    setPeriodActivity(activityItem?.activity);
                                                                }
                                                                }
                                                            >
                                                                {activityItem.activity}
                                                            </td>
                                                        </OverlayTrigger>

                                                    })
                                                }
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </>
    )
}
export default ClassTimeTableActivities;