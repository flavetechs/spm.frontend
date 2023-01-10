import {
    Button, Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { SmpModal } from "../../partials/components/hoc-tools/modals";
import { respondModal, showHideModal } from "../../../store/actions/toaster-actions";
import { admissionExportToCBT } from "../../../store/actions/admin-admission-actions";

export function AdminAdmissionModal({ selectedClassId }) {

    //VARIABLE DECLARATION
    const dispatch = useDispatch();
    const [categoryName, setCategoryName] = useState('');
    //VARIABLE DECLARATION

    const state = useSelector((state) => state);
    const { showModal } = state.alert;

    React.useEffect(() => {
        if (!showModal) {
            setCategoryName("");
        }
    }, [showModal])

    return (

        <SmpModal title={'Export Registered Candidates to CBT'}>
            <Form className="pt-3">
                <div>
                    <div className="mb-3 ">
                        <Form.Group className="mb-3" controlId="categoryName">
                            <Form.Label>Exams Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="categoryName"
                                placeholder="e.g 2023/2024 Candidate Categories"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <div>
                        <p className="fw-bold">All the Candidates will be registered on CBT with the Category name you inputted for Exams</p>
                        <p className="fw-light fst-italic">You can proceed to CBT and create Exams for Candidates</p>
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
                                admissionExportToCBT(selectedClassId, categoryName)(dispatch);
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
