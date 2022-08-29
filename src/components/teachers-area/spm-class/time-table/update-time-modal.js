import {
    Button, Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { SmpModal } from "../../../partials/components/hoc-tools/modals";
import { respondModal, showHideModal } from "../../../../store/actions/toaster-actions";
import { updateTimetableTime } from "../../../../store/actions/timetable-actions";

export function UpdateTimeModal({ selectedClassId, currentPeriod, timetableTimeId }) {

    //VARIABLE DECLARATIONS
    const dispatch = useDispatch();
    const [newTime, setNewTime] = useState({
        start: "",
        end: "",
        classTimeTableTimeId: "",
    });
    const currentPeriodValue = currentPeriod.split(" ");
    const startTime = currentPeriodValue[0];
    let endTime = currentPeriodValue[2];
    const [validation, setValidation] = useState("");
    //VARIABLE DECLARATIONS

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { submitSuccessful } = state.timetable;
    const { showModal } = state.alert;
    // ACCESSING STATE FROM REDUX STORE

    const handleChange = (event) => {
        setNewTime({ ...newTime, [event.target.name]: event.target.value });
    };

    React.useEffect(() => {
        newTime.start = startTime
        newTime.end = endTime
        newTime.classTimeTableTimeId = timetableTimeId
    }, [currentPeriod]);

    const handeSubmit = () => {
        if (!newTime.start.trim() || !newTime.end.trim()) {
            setValidation("Time is required");
        } else {
            updateTimetableTime(newTime, selectedClassId)(dispatch);
            showHideModal(false)(dispatch);
        }
    }

    React.useEffect(() => {
        if (submitSuccessful) {
            setNewTime({ start: startTime, end: endTime, classTimeTableTimeId: timetableTimeId });
        }
    }, [submitSuccessful]);

    React.useEffect(() => {
        if (showModal == false) {
            setValidation("");
            setNewTime({ start: startTime, end: endTime, classTimeTableTimeId: timetableTimeId });
        }
    }, [showModal]);

    return (

        <SmpModal title={'Update Time'}>
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
                                defaultValue={startTime}
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
                                defaultValue={endTime}
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