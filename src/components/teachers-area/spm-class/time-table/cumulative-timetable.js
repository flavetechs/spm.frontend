import React, { useState } from 'react'
import { Row, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { respondToDeleteDialog, showErrorToast, showHideModal, showSingleDeleteDialog } from '../../../../store/actions/toaster-actions'
import Card from '../../../Card'
import './timetable.scss';
import { NewTimeModal } from './new-time-modal'
import { NewDayModal } from './new-day-modal'
import { UpdateDayModal } from './update-day-modal'
import { UpdateTimeModal } from './update-time-modal'
import { PeriodActivityModal } from './period-activity-modal'
import { deleteClassTimetabledays, deleteClassTimetableTime, getAllTimetable, getTimetableActiveClass, pushId, removeId } from '../../../../store/actions/timetable-actions'
import PrintTimeTable from './printTimetable'
import { ExamSubjectModal } from './exam-subject-modal'
import { Field } from 'formik'


const CumulativeTimeTable = ( ) => {

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { selectedIds,selectedTimetable, activeClasses  } = state.timetable;
    const { deleteDialogResponse } = state.alert;
    const { classSubjects} = state.class;
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
    const [timetableTimeId, setTimetableTimeId] = useState("");

    //VARIABLE DECLARATION

    React.useEffect(() => {
        getAllTimetable("4541217c-a2dc-4f11-2284-08db130af196")(dispatch)
    }, []);
    // console.log('selectedTimetable now', newSelectedTimetable);
    const [selectedClassId, setSelectedClassId] = useState("");
    //VARIABLE DECLARATIONS

    


    React.useEffect(() => {
        getTimetableActiveClass()(dispatch);
    }, ['123', dispatch]);

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
            <Row id="class-timetable">
                <Col sm="12">
                    <Card className='mt-0'>
                        <Card.Header className="d-flex justify-content-between flex-wrap">
                            <div className="header-title">
                                <h4>{`${selectedTimetable?.className} Exam Timetable`}</h4>
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
                                        modal === 'examSubjectModal' ? <ExamSubjectModal
                                            selectedActivityId={selectedActivityId}
                                            selectedClassId={selectedClassId}
                                            periodActivity={periodActivity}
                                        />
                                            :
                                            ' '
                        }
                        <Card.Body>
                        <Col md="4" className="form-group h6 mb-4">
                          <select
                                  as="select"
                                  name="sessionClassSubjectId"
                                  className="form-select"
                                  id="sessionClassSubjectId"
                                //   onChange={(e) => {
                                //     setSessionClassSubjectId(
                                //       e.target.value
                                //     );}}
                                >
                                  <option value="">Select Subject</option>
                                  {classSubjects?.map((item, idx) => (
                                    <option
                                      key={idx}
                                      value={item.sessionClassSubjectId}
                                    >
                                      {item.subjectName}
                                    </option>
                                  ))}
                                </select>
                        </Col>
                            <div className="table-responsive">
                                <table    id="role-list-table" className="table striped='column' table-bordered border-3">
                                    <thead>
                                        <tr>
                                            <th>Day</th>
                                            <th>Class</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                       
                                    {selectedTimetable?.timetable?.days?.map((items, index) => (
                                            <tr> <td className="text-center" key={index} >{items.day}</td> 
                                             {activeClasses?.map((item, index) => (
                                                <tr>
                                             <td  className='py-3'  
                                              onClick={() => {
                                                setSelectedClassId(item?.lookupId);
                                                getAllTimetable(item?.lookupId)(dispatch);
                                            }}key={index}>{item.name}  
                                      </td></tr>
                                          ))}   
                                            </tr>
                                            ))}
                                            
                                      
                                        {/* {selectedTimetable?.timetable?.times?.map((item, index) => (
                                           <>
                                                <td key={index}>
                                                    {item.period}
                                                   
                                                </td>
                                                
                                                    {item?.periodActivities?.map((activityItem, idx) => {
                                                        return <td
                                                            key={idx}
                                                        >
                                                            {activityItem.activity}
                                                        </td>
                                                    })}
                                            </>
                                      
                                       ))}  */}
                                      
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
export default CumulativeTimeTable;