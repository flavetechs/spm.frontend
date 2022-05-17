import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { classLocations } from "../../router/spm-path-locations";
import { useLocation, useHistory } from "react-router-dom";
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import {
  updateSessionClass,
} from "../../store/actions/class-actions";

const SessionClassEdit = () => {
    //VARIABLE DECLARATIONS 
    const history = useHistory();
    const locations = useLocation();
    const dispatch = useDispatch();
    //VARIABLE DECLARATIONS
  
    //VALIDATIONS SCHEMA
    const validation = Yup.object().shape({
      name: Yup.string()
        .required('Session Class is required')
    });
    //VALIDATIONS SCHEMA
  
    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { isSuccessful, message, selectedItem, itemList, teacherList, activeSubjects } =
    state.class;
    // ACCESSING STATE FROM REDUX STORE
  
    React.useEffect(() => {
      const queryParams = new URLSearchParams(locations.search);
      const sessionClassId = queryParams.get("sessionClassId");
      if (!sessionClassId) return;
    }, []);
  
    if (isSuccessful || !selectedItem) {
      history.push(classLocations.sessionClassList)
    }
  
    return (
      <>
        <div className="col-8 mx-auto">
          <Row>
            <Col sm="12" >
              <Card>
                <Card.Body>
                  <Formik
                    initialValues={{
                      sessionClassId: selectedItem?.sessionClassId,
                      sessionId: selectedItem?.sessionId,
                      classId: selectedItem?.classId,
                      formTeacherId: selectedItem?.formTeacherId, 
                      classSubjects: [
                        {
                          subjectId: selectedItem?.subjectId,
                      subjectTeacherId:selectedItem?.subjectTeacherId
                        }
                      ]

                    }}
                    validationSchema={validation}
                    onSubmit={values => {
                      console.log(values);
                      updateSessionClass(values)(dispatch)
                    }}
                  >
                    {({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      values,
                      touched,
                      errors,
                      isValid }) => (
  
                        <Form>
                        {message && <div className="text-danger">{message}</div>}
                        <Col lg="12">
                           <div className="form-group">
                             <label htmlFor="sessionId" className="form-label"> Session </label>
                             <Field type="text" className="form-control" name="sessionId" id="sessionId" aria-describedby="sessionId" value="2021/2022"  readOnly />
                           </div>
                         </Col>
   
   
                         <div className="d-flex row justify-content-between">
                         <Col lg="6">
                           <div className="form-group">
                             <label htmlFor="class" className="form-label">
                               {" "}
                               Class
                             </label>
                             <Field as="select" name="classId" className="form-select" id="classId">
                               <option defaultValue="Select Class">
                                 Select Class
                               </option>
                               {itemList.map((item, idx) => (
                                 <option key={idx} value={item.name}>
                                   {item.name}
                                 </option>
                               ))}
                             </Field>
                           </div>
                         </Col>
   
                         <Col lg="6">
                           <div className="form-group">
                             <label htmlFor="teacher" className="form-label">
                               {" "}
                               Form Teacher
                             </label>
                             <Field as="select" name="formTeacherId"className="form-select" id="formTeacherId">
                               <option  defaultValue="Select Teacher">
                                 Select Teacher
                               </option>
                               {teacherList.map((item, idx) => (
                                 <option
                                 id={item.userAccountId}
                                   key={idx}
                                   value={item.userName}
                                 >
                                   {item.userName}
                                 </option>
                               ))}
                             </Field>
                           </div>
                         </Col>
                         </div>
   
                         <table className="table table-bordered">
                           <thead>
                             <tr>
                               <th>Subject</th>
                               <th>Subject Teacher</th>
                             </tr>
                           </thead>
                           <tbody>
                             {activeSubjects.map((item, idx) => (
                               <tr key={idx}>
                                 <td>
                                   {" "}
                                   <Field
                                     type="checkbox"
                                     id={item.lookupId}
                                     name="subjectId"
                                     className="form-check-input"
                                     //checked={disableSubjectSelect[idx]}
                                     onChange={() => {
                                       //checkSingleSubject(idx);
                                     }}
                                   />{" "}
                                   {item.name}
                                 </td>
                                 <td>
                                   <Field as="select" name="subjectTeacherId"
                                     className="form-select"
                                     id="subjectTeacherId"
                                    // disabled={
                                    // disableSubjectSelect[idx] ? false : true
                                    // }
                                   >
                                     <option defaultValue="Select Teacher">
                                       Select Teacher
                                     </option>
                                     {teacherList.map((item, id) => (
                                       <option
                                         key={id}
                                         id={item.userAccountId}
                                         value={item.email}
                                         onChange={(e) => {
                                           //matchCheckBox(e.target.id,e.target.value);
                                         }}
                                       >
                                         {item.email}
                                       </option>
                                     ))}
                                   </Field>
                                 </td>
                               </tr>
                             ))}
                           </tbody>
                         </table>
   
                         <div className="d-flex justify-content-end">
                           <Button
                             type="button"
                             variant="btn btn-danger mx-2"
                             onClick={() => {
                               history.push(classLocations.sessionClassList);
                             }}
                           >
                             Cancel
                           </Button>{" "}
                           <Button
                             type="button"
                             variant="btn btn-primary"
                             onClick={handleSubmit}
                           >
                             Submit
                           </Button>
                         </div>
                       </Form>
                    )}
                  </Formik>
  
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  };
  
  export default SessionClassEdit;