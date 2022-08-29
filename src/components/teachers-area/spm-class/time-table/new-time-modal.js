import {
    Button, Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
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
    const [validation, setValidation] = useState("");
    //VARIABLE DECLARATIONS

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { submitSuccessful } = state.timetable;
    // ACCESSING STATE FROM REDUX STORE

    React.useEffect(() => {
        newTime.classTimeTableId = selectedTimetable?.classTimeTableId;
        newTime.classId = selectedClassId;
    }, [selectedTimetable]);

    const handleStartDateChange = (event) => {
        newTime.start = event.target.value
        setNewTime(newTime);
    };

    const handleEndDateChange = (event) => {
        newTime.end = event.target.value
        setNewTime(newTime);
    };

    const handeSubmit = () => {
        if (!newTime.start.trim() || !newTime.end.trim()) {
            setValidation("Time is required");
            setTimeout(() => {
                setValidation("");
            }, 1000);
        } else {
            createTimetableTime(newTime, selectedClassId)(dispatch);
            showHideModal(false)(dispatch);
        }
    }

    React.useEffect(() => {
        if (submitSuccessful) {
            newTime.start = "";
            newTime.end = "";
        }
    }, [submitSuccessful]);

    return (

        <SmpModal title={'Add New Time'}>
            <Form className="pt-3">
                <div>
                    <div className="mb-3">
                        <div className="text-danger mb-2">{validation}</div>
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