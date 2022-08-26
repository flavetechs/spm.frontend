import {
    Button, Form,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { SmpModal } from "../../../partials/components/hoc-tools/modals";
import { respondModal, showHideModal } from "../../../../store/actions/toaster-actions";
import { createTimetableTime } from "../../../../store/actions/timetable-actions";

export function NewTimeModal({ selectedClassId, selectedTimetable }) {



    //VARIABLE DECLARATIONS
    const dispatch = useDispatch();
    const [newTime, setNewTime] = useState({
        start: "",
        end: "",
        classTimeTableId: "",
        classId: "",
    });

    React.useEffect(() => {
        newTime.classTimeTableId = selectedTimetable?.classTimeTableId;
        newTime.classId = selectedClassId;
    }, [selectedTimetable])

    //VARIABLE DECLARATIONS

    const handleStartDateChange = (event) => {
        newTime.start = event.target.value
        setNewTime(newTime);
    };

    const handleEndDateChange = (event) => {
        newTime.end = event.target.value
        setNewTime(newTime);
    };
 
    return (

        <SmpModal title={'Add New Time'}>
            <Form className="pt-3">
                <div>
                    <div className="mb-3">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="start"
                                placeholder="Start Time"
                                onChange={(e) => {
                                    newTime.start = e.target.value;
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>End Time</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="end"
                                placeholder="End Time"
                                onChange={(e) => {
                                    newTime.end = e.target.value;
                                }}
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
                                console.log('newTime', newTime);
                                createTimetableTime(newTime, selectedClassId)(dispatch);
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