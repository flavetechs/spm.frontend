import {
    Button,
} from "react-bootstrap";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { enrollStudent } from "../../../store/actions/enrollment-actions";
import { SmpModal } from "../../partials/components/hoc-tools/modals";
import { respondModal, showHideModal } from "../../../store/actions/toaster-actions";
import React from "react";
import { getGeneralActiveSession } from "../../../store/actions/general-actions";
import { getAllSessionClasses } from "../../../store/actions/class-actions";

export function ClassesModal() {
    const dispatch = useDispatch();

    //VALIDATIONS SCHEMA
    const validation = Yup.object().shape({
        sessionClassId: Yup.string().required("Class is required"),
    });
    //VALIDATIONS SCHEMA

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { selectedIds, message } = state.enrollment;
    const { itemList } = state.class;
    const { activeSession } = state.appState;
    // ACCESSING STATE FROM REDUX STORE
  
    React.useEffect(() => {
      getGeneralActiveSession()(dispatch);
    }, []);
  
    React.useEffect(() => {
      getAllSessionClasses(activeSession?.sessionId)(dispatch);
    }, [activeSession]);

    return (

        <SmpModal title={'Enroll student(s) into class'}>
            <Formik
                initialValues={{
                    sessionClassId: "",
                    studentContactIds: [],
                }}
                validationSchema={validation}
                onSubmit={(values, { resetForm }) => {
                    values.studentContactIds = selectedIds;
                    resetForm();
                    enrollStudent(values)(dispatch);
                }}
            >
                {({
                    handleSubmit,
                    touched,
                    errors,
                }) => (
                    <div>
                        {message && <div className="text-danger py-2 px-4">{message}</div>}

                        <div className="mb-3">
                            {touched.sessionClassId &&
                                errors.sessionClassId && (
                                    <div className="text-danger">
                                        {errors.sessionClassId}
                                    </div>
                                )}
                            <label
                                className="form-label text-dark h6"
                                htmlFor="sessionClassId"
                            >
                                Class:
                            </label>
                            <Field
                                as="select"
                                name="sessionClassId"
                                className="form-select"
                                id="sessionClassId"
                            >
                                <option value="">Select Class</option>
                                {itemList.map((item, idx) => (
                                    <option
                                        key={idx}
                                        value={item.sessionClassId}
                                    >
                                        {item.class}
                                    </option>
                                ))}
                            </Field>
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
                                onClick={() => handleSubmit()}
                            >
                                Confirm Enroll
                            </Button>
                        </div>
                    </div>
                )}
            </Formik>
        </SmpModal>





    )
}