import {
    Button, Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { SmpModal } from "../../../partials/components/hoc-tools/modals";
import { respondModal, showHideModal } from "../../../../store/actions/toaster-actions";
import {  createExamTimetableTime } from "../../../../store/actions/timetable-actions";

export function NewExamTimeModal({ selectedClassId, selectedTimetable }) {

    //VARIABLE DECLARATIONS
    const dispatch = useDispatch();
    const [newTime, setNewTime] = useState({
        start: "",
        end: "",
        examTimeTableId: "",
        classId: "",
    });
    const [validation, setValidation] = useState("");
    //VARIABLE DECLARATIONS

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { submitSuccessful } = state.timetable;
    const { showModal } = state.alert;
    // ACCESSING STATE FROM REDUX STORE

    React.useEffect(() => {
        newTime.examTimeTableId = selectedTimetable?.examTimeTableId;
        newTime.classId = selectedClassId;
    }, [selectedTimetable]);

    const handeSubmit = () => {
        if (!newTime.start.trim() || !newTime.end.trim()) {
            setValidation("Time is required");
        } else {
            createExamTimetableTime(newTime, selectedClassId)(dispatch);
            showHideModal(false)(dispatch);
        }
    }

    React.useEffect(() => {
        if (submitSuccessful) {
            setNewTime({ start: "", end: "", examTimeTableId: selectedTimetable?.examTimeTableId, classId: selectedClassId });
        }
    }, [submitSuccessful]);

    React.useEffect(() => {
        if (showModal == false) {
            setValidation("");
            setNewTime({ start: "", end: "", examTimeTableId: selectedTimetable?.examTimeTableId, classId: selectedClassId });
        }
    }, [showModal]);


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