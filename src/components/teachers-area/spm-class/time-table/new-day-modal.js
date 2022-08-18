import {
    Button, Form,
} from "react-bootstrap";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
// import { respondModal, showHideModal } from "../../../store/actions/toaster-actions";
import React from "react";
import { SmpModal } from "../../../partials/components/hoc-tools/modals";
import { respondModal, showHideModal } from "../../../../store/actions/toaster-actions";

export function NewDayModal() {
    const dispatch = useDispatch();

    return (

        <SmpModal title={'Add New day'}>
            <div>
                <div className="mb-3">
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Week Day</Form.Label>
                        <Form.Control type="text" placeholder="Add new Week Day" />
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
                    >
                        Save
                    </Button>
                </div>
            </div>
        </SmpModal>
    )
}
