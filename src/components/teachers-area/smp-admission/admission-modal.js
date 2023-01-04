import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { SmpModal } from "../../partials/components/hoc-tools/modals";
import { HandleMultipleCheckbox, HandleMultipleCheckbox as handleMultipleCheckbox } from "../../../utils/tools";
import { respondModal, showHideModal } from "../../../store/actions/toaster-actions";
import { getAllActiveClasses } from "../../../store/actions/class-actions";



export function AdmissionModal(props) {
    const dispatch = useDispatch();
    const [classArray, setClassArray] = useState([]);

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { itemList: classList, activeClasses } = state.class;
    const { showModal } = state.alert;
    // ACCESSING STATE FROM REDUX STORE

    //   React.useEffect(() => {
    //     getAllSharedOnStaffClasses(props.teacherClassNoteId)(dispatch);
    //   }, [props.teacherClassNoteId, dispatch]);

    React.useEffect(() => {
        getAllActiveClasses()(dispatch);
    }, [dispatch]);


    // React.useEffect(() => {
    //     showModal &&
    //         setClassArray(staffClasses.filter(c => c.isSent === true).map(c => c.classId));
    // }, [staffClasses, showModal]);

    React.useEffect(() => {
        if (showModal == false) {
            setClassArray([])
        }
    }, [showModal]);



    return (
        <>
            <SmpModal title={"Class List"}>
                <div>
                    <div className="mb-3">
                        {staffClasses?.map((item, idx) => (
                            <div key={idx}>
                                <input
                                    type="checkbox"
                                    name="classes"
                                    id={item.classId}
                                    checked={classArray.find(i => i === item.classId)}
                                    onChange={(e) => {
                                        const classArrayValues = HandleMultipleCheckbox(e, classArray);
                                        setClassArray(classArrayValues)
                                    }}
                                />
                                <span className="mx-2 text-uppercase">
                                    {item.sessionClass}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="d-flex justify-content-end">
                        <Button
                            variant="danger"
                            className="mx-2"
                            onClick={() => {
                                showHideModal(false)(dispatch);
                                respondModal("cancel")(dispatch);
                                // props.setTeacherClassNoteId('');
                                // props.setNoteSendModal(false)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button variant="primary" className="" onClick={() => {
                            //    sendLessonNotes(props.teacherClassNoteId, classArray)(dispatch); 
                        }}>
                            Send
                        </Button>
                    </div>
                </div>
            </SmpModal>
        </>
    );
}
