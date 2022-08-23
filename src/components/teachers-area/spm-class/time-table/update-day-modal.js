import {
    Button, Form,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { SmpModal } from "../../../partials/components/hoc-tools/modals";
import { updateTimetableDays } from "../../../../store/actions/timetable-actions";
import { respondModal, showHideModal } from "../../../../store/actions/toaster-actions";

export function UpdateDayModal({ timetableList, selectedClassId, currentDay }) {


    const dispatch = useDispatch();
    const [newDay, setNewDay] = useState('');

    let result = timetableList.find(id => id.classTimeTableId);
    const [timetableId, setTimetableId] = useState(result?.classTimeTableId);


    React.useEffect(() => {
        setNewDay(currentDay);
    }, [currentDay])

    console.log('newDay now', newDay);

    return (

        <SmpModal title={'Update day.'}>
            <Form>
                <div>
                    {/* {timetableList?.map((data, index) => {
                        return (
                            <div className="mb-3" key={index}>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Week Day</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Add new Week Day"
                                        onChange={(e) => setNewDay({ day: e.target.value, classTimeTableId: data.classTimeTableId })}
                                    />
                                </Form.Group>
                            </div>
                        )
                    })} */}
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
                                updateTimetableDays(newDay, timetableId, selectedClassId)(dispatch);
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
