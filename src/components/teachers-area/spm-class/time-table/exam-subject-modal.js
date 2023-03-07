import {
    Button, Col, Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { SmpModal } from "../../../partials/components/hoc-tools/modals";
import { respondModal, showHideModal } from "../../../../store/actions/toaster-actions";
import { updateTimetableActivity } from "../../../../store/actions/timetable-actions";
import {  getClassSubjects } from "../../../../store/actions/class-actions";
import { Field } from "formik";
import { getAllStaffClasses } from "../../../../store/actions/results-actions";

export function ExamSubjectModal({ selectedActivityId, selectedClassId, periodActivity }) {

    //VARIABLE DECLARATION
    const state = useSelector((state) => state);
    const {
     createSuccessful,
      classSubjects,
    } = state.class;
    const dispatch = useDispatch();
    const [activity, setActivity] = useState('');
    const [sessionClassSubjectId, setSessionClassSubjectId] = useState('');
    //VARIABLE DECLARATION


    React.useEffect(() => {
        getClassSubjects(selectedClassId)(dispatch)
    }, [selectedClassId]);

    React.useEffect(() => {
        getClassSubjects(selectedClassId)(dispatch)
    }, [selectedClassId]);

    React.useEffect(() => {
        getClassSubjects(selectedClassId)(dispatch)
    }, [selectedClassId]);

    React.useEffect(() => {
        setActivity(periodActivity);
    }, [selectedActivityId]);

    return (

        <SmpModal title={'Update Exam Subject'}>
            <Form className="pt-3">
                <div>
                    <div className="mb-3 ">
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Col md="12" className="form-group h6">
                          <label className="form-label fw-bold">Subjects:</label>
                          <select
                                  as="select"
                                  name="sessionClassSubjectId"
                                  className="form-select"
                                  id="sessionClassSubjectId"
                                  onChange={(e) => {
                                    setSessionClassSubjectId(
                                      e.target.value
                                    );}}
                                >
                                  <option value="">Select Subject</option>
                                  {classSubjects?.map((item, idx) => (
                                    <option
                                      key={idx}
                                      value={item.sessionClassSubjectId}
                                    >
                                      {item.subjectName}
                                    </option>
                                  ))}
                                </select>
                        </Col>
                        </Form.Group>
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
                                updateTimetableActivity(activity, selectedActivityId, selectedClassId)(dispatch);
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
