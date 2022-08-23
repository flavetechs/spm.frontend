import {
    Button, Form,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { SmpModal } from "../../../partials/components/hoc-tools/modals";
import { respondModal, showHideModal } from "../../../../store/actions/toaster-actions";
import { updateTimetableActivity } from "../../../../store/actions/timetable-actions";

export function PeriodActivityModal({ selectedActivityId, selectedClassId, periodActivity }) {
    const dispatch = useDispatch();

    console.log('periodActivity', periodActivity);
    console.log('selectedActivityId', selectedActivityId);
    const [activity, setActivity] = useState('');
    // const handleChange = (event) => {
    //     setActivity( ...activity, event.target.value );
    // };

    // console.log('periodActivity now', periodActivity);
   
    React.useEffect(() => {
        setActivity(periodActivity);
    }, [periodActivity]);

    console.log('newActivity now', activity);


    // console.log('activity now', newActivity);

    return (

        <SmpModal title={'Update Activity.'}>
            <div>
                <div className="mb-3">
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Period Activity</Form.Label>
                        <Form.Control
                            type="text"
                            name="activity"
                            placeholder="Enter Activity"
                            value={activity}
                             onChange={(e) => setActivity(e.target.value)}
                            // onChange={handleChange}
                        />
                    </Form.Group>
                </div>

                <div className="d-flex justify-content-end">
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
                            updateTimetableActivity(activity,selectedActivityId, selectedClassId)(dispatch);
                            showHideModal(false)(dispatch);
                        }}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </SmpModal>
    )
}
