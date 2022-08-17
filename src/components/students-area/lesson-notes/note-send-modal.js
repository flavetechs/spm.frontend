import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import {
  respondModal,
  showHideModal,
} from "../../../store/actions/toaster-actions";
import { sendLessonNotes } from "../../../store/actions/class-actions";
import { getAllStaffClasses } from "../../../store/actions/results-actions";
import { SmpModal } from "../../partials/components/hoc-tools/modals";

export function NoteSendModal(props) {
  const dispatch = useDispatch();
  const [classArray, setClassArray] = useState([]);

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { staffClasses } = state.results;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    getAllStaffClasses()(dispatch);
  }, []);

  const handleClassArray = (event) => {
    const checkBoxValue = event.target.checked;
    const classId = event.target.id;
    let selectedClassArray;
    const otherSelectedClasses = classArray.filter((item) => item != classId);
    if (checkBoxValue === false) {
      selectedClassArray = [...otherSelectedClasses];
    } else {
      selectedClassArray = [...otherSelectedClasses, classId];
    }
    setClassArray(selectedClassArray);
  };

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
                id={item.sessionClassId}
                //defaultChecked={item.isShared==true||false}
                onChange={(e) => {
                  handleClassArray(e);
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
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" className="" onClick={() => {sendLessonNotes(props.teacherClassNoteId, classArray)(dispatch);}}>
            Send
          </Button>
        </div>
      </div>
    </SmpModal>
    </>
  );
}