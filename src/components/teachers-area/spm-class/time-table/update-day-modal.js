import {
    Button, Form,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { SmpModal } from "../../../partials/components/hoc-tools/modals";
import { updateTimetableDays } from "../../../../store/actions/timetable-actions";
import { respondModal, showHideModal } from "../../../../store/actions/toaster-actions";

export function UpdateDayModal({ timetableList, selectedClassId, currentDay, timetableDayId }) {

    //VARIABLE DECLARATION
    const dispatch = useDispatch();
    const [newDay, setNewDay] = useState('');
    let result = timetableList.find(id => id.classTimeTableId);
    const [timetableId, setTimetableId] = useState(result?.classTimeTableId);
    //VARIABLE DECLARATION

    React.useEffect(() => {
        setNewDay(currentDay);
    }, [currentDay])


    return (

        <SmpModal title={'Update day.'}>
            <Form className="pt-3">
                <div>
                    <div className="mb-3">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Week Day</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={newDay}
                                placeholder="Add new Week Day"
                                onChange={(e) => setNewDay(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div className="d-flex justify-content-end mt-5">
                        <Button
                            variant="danger"
                            className="mx-2"
                            onClick={() => {
                                showHideModal(false)(dispatch);
                                respondModal('cancel')(dispatch);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            className=""
                            onClick={() => {
                                updateTimetableDays(newDay, timetableId,timetableDayId, selectedClassId)(dispatch);
                                showHideModal(false)(dispatch);
                            }}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </Form>
        </SmpModal>
    )
}
