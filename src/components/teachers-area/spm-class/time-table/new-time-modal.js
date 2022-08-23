import {
    Button, Form,
} from "react-bootstrap";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
// import { respondModal, showHideModal } from "../../../store/actions/toaster-actions";
import React, { useState } from "react";
import { SmpModal } from "../../../partials/components/hoc-tools/modals";
import { respondModal, showErrorToast, showHideModal } from "../../../../store/actions/toaster-actions";
import { createTimetableTime, getAllTimetable, getTimetableActiveClass } from "../../../../store/actions/timetable-actions";
import { useHistory, useLocation } from "react-router-dom";

export function NewTimeModal({selectedClassId, timetableList}) {

    //VARIABLE DECLARATIONS
    const dispatch = useDispatch();
    const history = useHistory();
    //VARIABLE DECLARATIONS

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { deleteDialogResponse } = state.alert;
    const { activeClasses } = state.timetable;
    // ACCESSING STATE FROM REDUX STORE
    // const { timetableList } = state.timetable;

    // ACCESSING STATE FROM REDUX STORE

    //VARIABLE DECLARATION
    const locations = useLocation();
    const handleFocus = (event) => event.target.select();
    const [indexRow, setIndexRow] = useState("");
    const [isEditMode, setEditMode] = useState(false);
    const [modal, setModal] = useState('');
    const [validated, setValidated] = useState(false);
    //VARIABLE DECLARATION

    let result = timetableList.find(id => id.classTimeTableId);

    const [newTime, setNewTime] = useState({
        start: ",",
        end: "",
        classTimeTableId: result?.classTimeTableId,
        classId: selectedClassId
    });

    const handleChange = (event) => {
        setNewTime({ ...newTime, [event.target.name]: event.target.value });
    };

    console.log('newtime', newTime);


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
                                        required
                                        type="text"
                                        name="start"
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
                                createTimetableTime(newTime, selectedClassId)(dispatch);
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