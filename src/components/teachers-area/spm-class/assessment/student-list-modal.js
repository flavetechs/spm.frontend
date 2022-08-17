import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import {
  respondModal,
  showHideModal,
} from "../../../../store/actions/toaster-actions";
import { SmpModal } from "../../../partials/components/hoc-tools/modals";
import { getSingleHomeAssessment } from "../../../../store/actions/class-actions";

export function StudentListModal(props) {
  const dispatch = useDispatch();

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { singleHomeAssessmentList } = state.class;
  // ACCESSING STATE FROM REDUX STORE

console.log(singleHomeAssessmentList);
  return (
    <>
    <SmpModal title={"Student List"}>
      <div>
      <div className="table-responsive">
                  <table
                    id="role-list-table"
                    className="table table-striped table-bordered"
                    role="grid"
                    data-toggle="data-table"
                  >
                    <thead>
                      <tr className="ligth">
                        <th className="" width="300px">
                          Student Name
                        </th>
                        <th className="text-center">
                        Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {singleHomeAssessmentList?.studentList.map(
                        (item, idx) =>
                            <tr key={idx}>
                              <td className="text-uppercase">{item.studentName}</td>

                              <td className="text-center">
                              <div className={item.status == "submitted" ? "badge bg-success":"badge bg-danger"}>{item.status}</div>
                              </td>
                            </tr>
                      )}
                    </tbody>
                  </table>
              
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
            Back
          </Button>
        </div>
      </div>
    </SmpModal>
    </>
  );
}
