import {
    Button, Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { SmpModal } from "../../partials/components/hoc-tools/modals";
import { respondModal, showHideModal } from "../../../store/actions/toaster-actions";
import { enrollMultipleCandidates, enrollSingleCandidate, getSessionClasses2 } from "../../../store/actions/admin-admission-actions";

export function AdmissionEnrolModal({ selectedIds, session2Classes, selectedClassId,selectedExamStatus }) {

    //VARIABLE DECLARATION
    const dispatch = useDispatch();
    const [selectedSessionClassId, seSelectedSessionClassId] = useState('');
    //VARIABLE DECLARATION

    //ACCESSING REDUX STATE
    const state = useSelector((state) => state);
    // const { sessionClasses2 } = state.adminAdmission;
    const { showModal } = state.alert;
    //ACCESSING REDUX STATE

    React.useEffect(() => {
        if (!showModal) {
            seSelectedSessionClassId("");
        }
    }, [showModal]);

    return (

        <SmpModal title={'Enroll students to selected Class'}>
            <Form className="pt-3">
                <div>
                    <div className="mb-3 ">
                        {session2Classes?.map((item, id) => (
                            <div key={id}>
                                <input
                                    className="form-check-input me-2 mb-2"
                                    type="radio"
                                    name="ggf"
                                    id="dd"
                                    value={item.sessionClassId}
                                    onChange={(e) => seSelectedSessionClassId(e.target.value)}
                                />
                                <label className="form-check-label me-3" htmlFor="ggf">
                                    {" "}  {item.class}
                                </label>
                            </div>
                        ))}
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
                                if (selectedIds.length === 1) {
                                    enrollSingleCandidate(selectedIds, selectedSessionClassId,selectedClassId,selectedExamStatus)(dispatch);
                                } else if(selectedIds.length > 1) {
                                    enrollMultipleCandidates(selectedIds, selectedSessionClassId,selectedClassId,selectedExamStatus)(dispatch);
                                }
                                showHideModal(false)(dispatch);
                            }}
                        >
                            Enroll
                        </Button>
                    </div>
                </div>
            </Form>
        </SmpModal>
    )
}
