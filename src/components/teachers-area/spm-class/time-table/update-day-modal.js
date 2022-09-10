import {
    Button, Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { SmpModal } from "../../../partials/components/hoc-tools/modals";
import { updateTimetableDays } from "../../../../store/actions/timetable-actions";
import { respondModal, showHideModal } from "../../../../store/actions/toaster-actions";

export function UpdateDayModal({ selectedTimetable, selectedClassId, currentDay, timetableDayId }) {

    //VARIABLE DECLARATION
    const dispatch = useDispatch();
    const [newDay, setNewDay] = useState('');
    const [timetableId, setTimetableId] = useState(selectedTimetable?.classTimeTableId);
    const [validation, setValidation] = useState("");
    //VARIABLE DECLARATION

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { submitSuccessful } = state.timetable;
    const { showModal } = state.alert;
    // ACCESSING STATE FROM REDUX STORE

    React.useEffect(() => {
        setNewDay(currentDay);
    }, [currentDay]);

    const handeSubmit = () => {
        if (!newDay.trim()) {
            setValidation("Day is required");
        } else {
            updateTimetableDays(newDay, timetableId, timetableDayId, selectedClassId)(dispatch);
            showHideModal(false)(dispatch);
        }
    }

    React.useEffect(() => {
        if (submitSuccessful) {
            setNewDay(newDay);
        }
    }, [submitSuccessful]);

    React.useEffect(() => {
        if (showModal === false) {
            setValidation("");
            setNewDay(currentDay);
        }
    }, [showModal]);

    return (

        <SmpModal title={'Update Day'}>
            <Form className="pt-3">
                <div>
                    <div className="mb-3">
                        <div className="text-danger">{validation}</div>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Week Day</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                defaultValue={currentDay}
                                placeholder="Update Week Day"
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
                            onClick={handeSubmit}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </Form>
        </SmpModal>
    )
}
