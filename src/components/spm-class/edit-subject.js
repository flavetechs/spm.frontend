import React from "react";
import { Row, Col, Form, NavItem } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { classLocations } from "../../router/spm-path-locations";
import { Link, useLocation, useHistory } from "react-router-dom";
import {
fetchSingleSubject,
  updateSubject,
  updateSubjectName,
  updateStatus,
} from "../../store/actions/class-actions";

const EditSubjectSetup = () => {
 //VARIABLE DECLARATIONS 
   const history = useHistory();
    const locations = useLocation();
  const dispatch = useDispatch();
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { selectedSubject,isSuccessful } = state.class;
  // ACCESSING STATE FROM REDUX STORE

 


  React.useEffect(() => {
    const queryParams = new URLSearchParams(locations.search);
    const subjectId = queryParams.get("subjectId");
    if (!subjectId) return;
    fetchSingleSubject(subjectId)(dispatch);

  }, []);
  
  const handleStatusOnChange = (event) => {
    const statusValue = event.target.checked;
    updateStatus(statusValue, selectedSubject)(dispatch);
  };
  

  const handleSubjectNameOnChange = (event) => {
    const subjectName = event.target.value;
    if (subjectName.length === 0) return;
    updateSubjectName(subjectName, selectedSubject)(dispatch);
  };

  const handleSubmit = () => {
    if(isSuccessful){
      history.push(classLocations.subjectSetupList)
    }
  }

  return (
    <>
      <div className="col-8 mx-auto">
        <Row>
          <Col sm="12" >
            <Card>
                <Card.Body>
              <form className="">
                <div className="form-group">
                  <label className="form-label">
                    Subject Name:
                  </label>
                  <input type="name" id="name" className="form-control" onChange={handleSubjectNameOnChange} defaultValue={selectedSubject?.name}/>
                </div>
                <div className="checkbox mb-3">
                  <div className="form-check ">
                    <input
                      type="checkbox"
                      id="flexCheckDefault3"
                      className="form-check-input"
                      value=""
                      defaultChecked={selectedSubject?.isActive}
                      onChange={handleStatusOnChange}
                    />
                    <label className="form-check-label">
                      is Active
                    </label>
                  </div>
                </div>
              <div className="d-flex justify-content-end">
          
                  <button type="button" className="btn btn-danger mx-2" onClick={() => history.push(classLocations.subjectSetupList)}>
                    Cancel
                  </button>
                
                <button
                  onClick={() => {
                    updateSubject(selectedSubject)(dispatch);
                    handleSubmit();
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

export default EditSubjectSetup;
