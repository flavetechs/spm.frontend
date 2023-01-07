import {
    Button, Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { SmpModal } from "../../partials/components/hoc-tools/modals";
import { respondModal, showHideModal } from "../../../store/actions/toaster-actions";
import { getSessionClasses2 } from "../../../store/actions/admin-admission-actions";

export function AdmissionEnrolModal() {

    //VARIABLE DECLARATION
    const dispatch = useDispatch();
    const [activity, setActivity] = useState('');
    //VARIABLE DECLARATION

    //ACCESSING REDUX STATE
    const state = useSelector((state) => state);
    const { sessionClasses2 } = state.adminAdmission;
    //ACCESSING REDUX STATE

    React.useEffect(() => {
        getSessionClasses2()(dispatch);
    }, []);

    return (

        <SmpModal title={'Enroll students to selected Class'}>
            <Form className="pt-3">
                <div>
                    <div className="mb-3 ">
                        {sessionClasses2?.map((item, id) => (
                            <div key={id}>
                                <input
                                    className="form-check-input me-2 mb-2"
                                    type="radio"
                                    name="ggf"
                                    id="dd"
                                    value={item.sessionClassId}
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
                                // updateTimetableActivity(activity, selectedActivityId, selectedClassId)(dispatch);
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
