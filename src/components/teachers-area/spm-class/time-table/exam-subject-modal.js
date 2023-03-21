import {
    Button, Col, Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { SmpModal } from "../../../partials/components/hoc-tools/modals";
import { respondModal, showHideModal } from "../../../../store/actions/toaster-actions";
import { updateExamTimetableActivity } from "../../../../store/actions/timetable-actions";
import {  getClassSubjects } from "../../../../store/actions/class-actions";

export function ExamSubjectModal({ selectedActivityId,selectedClassId, sessionClassId, periodActivity }) {

    //VARIABLE DECLARATION
    const state = useSelector((state) => state);
    const {
      classSubjects,
    } = state.class;
    const dispatch = useDispatch();
    const [activity, setActivity] = useState('');
    const [activityId, setActivityId] = useState('');
    //VARIABLE DECLARATION


    React.useEffect(() => {
        getClassSubjects(sessionClassId)(dispatch)
    }, [sessionClassId]);

    React.useEffect(() => {
        setActivity(periodActivity);
        setActivityId(selectedActivityId);
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
                                  name="activityId"
                                  className="form-select"
                                  id="activityId"
                                  onChange={(e) => {
                                    setActivityId(
                                      e.target.value
                                    );
                                   setActivity(e.target.selectedOptions[0].dataset.activity)
                                }}
                                >
                                  <option value="">Select Subject</option>
                                  {classSubjects?.map((item, idx) => (
                                    <option
                                      key={idx}
                                      data-activity={item.subjectName}
                                      value={item.sessionClassSubjectId}
                                      //selected={classSubjects.find(c=>c.subjectName == periodActivity)}
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
                                updateExamTimetableActivity(activity, selectedActivityId, selectedClassId)(dispatch);
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
