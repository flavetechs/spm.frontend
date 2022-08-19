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
import { createTimetableDays } from "../../../../store/actions/timetable-actions";

export function NewDayModal({ timetableList }) {
    const dispatch = useDispatch();
    const [newDay, setNewDay] = useState({});
    // console.log('newDay: ', newDay);
    console.log('newDay timetableList: ', timetableList);

    


    return (

        <SmpModal title={'Add New day'}>
            <Form>
                <div>
                    {timetableList?.map((data, index) => {
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
                                createTimetableDays(newDay)(dispatch);
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
