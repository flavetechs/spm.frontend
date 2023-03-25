import {
    Button, Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { SmpModal } from "../../partials/components/hoc-tools/modals";
import { respondModal, showHideModal } from "../../../store/actions/toaster-actions";
import { admissionExportToCBT, fetchAllAdminAdmissionList } from "../../../store/actions/admin-admission-actions";

export function AdminAdmissionModal({ selectedClassId,adminAdmissionClasses,adminAdmissionList,selectedExamStatus}) {

    //VARIABLE DECLARATION
    const dispatch = useDispatch();
    const [categoryName, setCategoryName] = useState("");
    const [candidateCategory, setCandidateCategory] = useState("");
    //VARIABLE DECLARATION
     const admissionClass = adminAdmissionClasses.find(c=>c.classId === selectedClassId).className;
    const state = useSelector((state) => state);
    const { showModal } = state.alert;

    React.useEffect(() => {
        if (adminAdmissionList) {
            setCategoryName(adminAdmissionList[0]?.candidateCategoryName||"");
            setCandidateCategory(adminAdmissionList[0]?.candidateCategory||"")
        }
    }, [adminAdmissionList])

    React.useEffect(() => {
        if (!showModal) {
            setCategoryName(adminAdmissionList[0]?.candidateCategoryName||"");
        }
    }, [showModal])





    return (

        <SmpModal title={`Export <span style="color:red;">${admissionClass}</span> to CBT`}>
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
                        <p className="fw-bold">All Candidates will be registered on CBT with Exams as Category</p>
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
                                admissionExportToCBT(selectedClassId, categoryName,candidateCategory,selectedExamStatus)(dispatch);
                                showHideModal(false)(dispatch);
                            }}
                        >
                            Export
                        </Button>
                    </div>
                </div>
            </Form>
        </SmpModal>
    )
}
