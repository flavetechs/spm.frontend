import {
    Button, Form,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { SmpModal } from "../../../partials/components/hoc-tools/modals";
import { respondModal, showHideModal } from "../../../../store/actions/toaster-actions";
import { createTimetableTime } from "../../../../store/actions/timetable-actions";

export function NewTimeModal({ selectedClassId, timetableList }) {

    //VARIABLE DECLARATIONS
    const dispatch = useDispatch();
    let result = timetableList.find(id => id.classTimeTableId);
    const [newTime, setNewTime] = useState({
        start: "",
        end: "",
        classTimeTableId: result?.classTimeTableId,
        classId: selectedClassId
    });
    //VARIABLE DECLARATIONS

    const handleChange = (event) => {
        setNewTime({ ...newTime, [event.target.name]: event.target.value });
    };



    return (

        <SmpModal title={'Add New Time'}>
            <Form className="pt-3">
                <div>
                    <div className="mb-3" key={index}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="start"
                                placeholder="Start Time"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>End Time</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="end"
                                placeholder="End Time"
                                onChange={handleChange}
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