import React, { useState } from 'react'
import { Row, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { respondToDeleteDialog, showErrorToast, showHideModal, showSingleDeleteDialog } from '../../../../store/actions/toaster-actions'
import Card from '../../../Card'
import './printTimetable.scss';
import { NewTimeModal } from './new-time-modal'
import { NewDayModal } from './new-day-modal'
import { UpdateDayModal } from './update-day-modal'
import { UpdateTimeModal } from './update-time-modal'
import { PeriodActivityModal } from './period-activity-modal'
import { deleteClassTimetabledays, deleteClassTimetableTime, pushId, removeId } from '../../../../store/actions/timetable-actions'
import { PrintCSV } from '../../../../utils/export-csv'


const PrintTimeTable = () => {

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { selectedTimetable } = state.timetable;
    // ACCESSING STATE FROM REDUX STORE

    //VARIABLE DECLARATION
    const dispatch = useDispatch();
    //VARIABLE DECLARATION

    React.useEffect(() => {
        PrintCSV("printTable");
    }, [])

    // (function () {
    //     var state = document.readyState;
    //     if (state === 'complete') {
    //         PrintCSV("printTable");
    //     }
    //     // else setTimeout(arguments.callee, 100);
    // })();

    const tableStyle = {
        overflowX: 'scroll',
        border: '1px solid red',
        width: '500px',
        float: 'left',
        height: '500px',
        position: 'relative'
    };

    return (
        <>
            <Row id="printTable">
                <Col sm="12">
                    <Card className='mt-0'>
                        <Card.Header className="d-flex justify-content-between flex-wrap">
                            <div className="header-title">
                                <h4>{`${selectedTimetable?.className} Class Timetable`}</h4>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div>
                                <table className='table-1'>
                                    <thead>
                                        <tr>
                                            <th className='table-th'></th>
                                            {selectedTimetable?.timetable?.days?.map((items, index) => (
                                                <th className="table-th" key={index} >{items.day}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedTimetable?.timetable?.times?.map((item, index) => (
                                            <tr key={index}>
                                                <td className='table-td'>
                                                    {item.period}
                                                </td>
                                                {
                                                    item?.periodActivities?.map((activityItem, idx) => {
                                                        return <td
                                                            className='table-td'
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
                    </Card>

                </Col>
            </Row>
        </>
    )
}
export default PrintTimeTable;