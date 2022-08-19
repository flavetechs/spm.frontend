import {
    Button, Form,
} from "react-bootstrap";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
// import { respondModal, showHideModal } from "../../../store/actions/toaster-actions";
import React, { useState } from "react";
import { SmpModal } from "../../../partials/components/hoc-tools/modals";
import { respondModal, showHideModal } from "../../../../store/actions/toaster-actions";
import { createTimetablePeriod, getAllTimetable, getTimetableActiveClass } from "../../../../store/actions/timetable-actions";
import { useHistory } from "react-router-dom";

export function NewTimeModal({ timetableList }) {

    //VARIABLE DECLARATIONS
    const dispatch = useDispatch();
    const history = useHistory();
    //VARIABLE DECLARATIONS

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { deleteDialogResponse } = state.alert;
    const {  activeClasses } = state.timetable;
    // ACCESSING STATE FROM REDUX STORE

    let result = timetableList.find(id => id.classTimeTableId);

    console.log('activeClasses: ', activeClasses);

    React.useEffect(() => {
        getTimetableActiveClass()(dispatch);
    }, [])

    const [newTime, setNewTime] = useState({
        start: ",",
        end: "",
        classTimeTableId: result?.classTimeTableId,
    });

    const handleChange = (event) => {
        setNewTime({ ...newTime, [event.target.name]: event.target.value });
    };


    return (

        <SmpModal title={'Add New Time'}>
            <Form>
                <div>
                    {timetableList?.map((data, index) => {
                        return (
                            <div className="mb-3" key={index}>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Start Time</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="start"
                                        placeholder="Start Time"
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>End Time</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="end"
                                        placeholder="End Time"
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </div>
                        )
                    })}


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
                                createTimetablePeriod(newTime)(dispatch);
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