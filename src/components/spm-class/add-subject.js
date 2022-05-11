import React from "react";
import { Row, Col, Form, NavItem } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { classLocations } from "../../router/spm-path-locations";
import { Link } from "react-router-dom";
import {
  createSubject,
  createSubjectName,
  createStatus,
  getAllSubjects,
} from "../../store/actions/class-actions";

const AddSubjectSetup = () => {
  const dispatch = useDispatch();

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { selectedSubject } = state.class;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    getAllSubjects()(dispatch);
  }, []);

  const handleStatusOnChange = (event) => {
    const statusValue = event.target.checked;
    createStatus(statusValue, selectedSubject)(dispatch);
  };

  const handleSubjectNameOnChange = (event) => {
    const subjectName = event.target.value;
    if (subjectName.length === 0) return;
    createSubjectName(subjectName, selectedSubject)(dispatch);
  };

  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card className="">
                <Card.Body>
              <form className="">
                <div className="form-group">
                  <label className="form-label" for="name">
                    Subject Name:
                  </label>
                  <input type="name" id="name" className="form-control" onChange={handleSubjectNameOnChange}/>
                </div>
                <div className="checkbox mb-3">
                  <div className="form-check ">
                    <input
                      type="checkbox"
                      id="flexCheckDefault3"
                      className="form-check-input"
                      value=""
                      defaultChecked={selectedSubject.isActive}
                      onChange={handleStatusOnChange}
                    />
                    <label for="flexCheckDefault3" className="form-check-label">
                      is Active
                    </label>
                  </div>
                </div>
              <div className="d-flex justify-content-end">
                <Link to={classLocations.subjectSetupList} className="mx-2">
                  <button type="button" className="btn btn-danger">
                    Cancel
                  </button>
                </Link>
                <button
                  onClick={() => {
                    createSubject(selectedSubject)(dispatch);
                  }}
                  type="button"
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
              </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AddSubjectSetup;
