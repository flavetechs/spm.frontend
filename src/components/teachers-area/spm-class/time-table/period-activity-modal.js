import {
    Button, Form,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { SmpModal } from "../../../partials/components/hoc-tools/modals";
import { respondModal, showHideModal } from "../../../../store/actions/toaster-actions";
import { updateTimetableActivity } from "../../../../store/actions/timetable-actions";

export function PeriodActivityModal({ selectedActivityId, selectedClassId, periodActivity }) {

    //VARIABLE DECLARATION
    const dispatch = useDispatch();
    const [activity, setActivity] = useState('');
    //VARIABLE DECLARATION

    React.useEffect(() => {
        setActivity(periodActivity);
    }, [periodActivity]);

    return (

        <SmpModal title={'Update Activity'}>
            <Form className="pt-3">
                <div>
                    <div className="mb-3 ">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Period Activity</Form.Label>
                            <Form.Control
                                type="text"
                                name="activity"
                                placeholder="Enter Activity"
                                value={activity}
                                onChange={(e) => setActivity(e.target.value)}
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
                                updateTimetableActivity(activity, selectedActivityId, selectedClassId)(dispatch);
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
