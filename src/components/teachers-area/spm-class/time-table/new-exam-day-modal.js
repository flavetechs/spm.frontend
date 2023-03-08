import {
    Button, Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { SmpModal } from "../../../partials/components/hoc-tools/modals";
import { respondModal, showHideModal } from "../../../../store/actions/toaster-actions";
import { createExamTimetableDays } from "../../../../store/actions/timetable-actions";

export function NewExamDayModal({ selectedTimetable, selectedClassId }) {

    //VARIABLE DECLARATION
    const dispatch = useDispatch();
    const [newExamDay, setExamNewDay] = useState({
        day: '',
        examTimeTableId: '',
    });
    const [validation, setValidation] = useState("");
    //VARIABLE DECLARATION  isSuccessful

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { submitSuccessful } = state.timetable;
    const { showModal } = state.alert;
    // ACCESSING STATE FROM REDUX STORE

    const handeSubmit = () => {
        if (!newExamDay.day.trim()) {
            setValidation("Day is required");
        } else {
            createExamTimetableDays(newExamDay, selectedClassId)(dispatch);
            showHideModal(false)(dispatch);
        }
    }

    React.useEffect(() => {
        if (submitSuccessful) {
            setExamNewDay({day: "", examTimeTableId: ""});
        }
    }, [submitSuccessful]);

    React.useEffect(() => {
        if (showModal === false) {
            setValidation("");
            setExamNewDay({day: "", examTimeTableId: "" });
        }
    }, [showModal]);


    return (
        <SmpModal title={'Add New day'}>
            <Form className="pt-3">
                <div className="">
                    <p className="text-danger">{validation}</p>
                    <div className="mb-3">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Week Day</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter Week Day"
                                onChange={(e) => setExamNewDay({ day: e.target.value, examTimeTableId: selectedTimetable?.examTimeTableId })}
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
