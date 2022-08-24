import {
    Button, Form,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
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
    //VARIABLE DECLARATIONS

    const handleChange = (event) => {
        setNewTime({ ...newTime, [event.target.name]: event.target.value });
    };

    React.useEffect(() => {
        newTime.start = startTime
        newTime.end = endTime
        newTime.classTimeTableTimeId = timetableTimeId
    }, [timetableTimeId]);

    return (

        <SmpModal title={'Update Time'}>
            <Form className="pt-3">
                <div>
                    <div className="mb-3">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="start"
                                value={newTime.start}
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
                                value={newTime.end}
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
                                updateTimetableTime(newTime, selectedClassId)(dispatch);
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