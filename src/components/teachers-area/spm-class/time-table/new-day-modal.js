import {
    Button, Form,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { SmpModal } from "../../../partials/components/hoc-tools/modals";
import { respondModal, showHideModal } from "../../../../store/actions/toaster-actions";
import { createTimetableDays } from "../../../../store/actions/timetable-actions";

export function NewDayModal({ selectedTimetable, selectedClassId }) {
    const dispatch = useDispatch();
    const [newDay, setNewDay] = useState({});

    return (
        <SmpModal title={'Add New day'}>
            <Form className="pt-3">
                <div className="">
                    <div className="mb-3">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Week Day</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter Week Day"
                                onChange={(e) => setNewDay({ day: e.target.value, classTimeTableId: selectedTimetable?.classTimeTableId })}
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
                                createTimetableDays(newDay, selectedClassId)(dispatch);
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
