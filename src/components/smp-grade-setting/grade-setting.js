import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  createGradeSetting,
  getAllGradeClasses,
  getPreviousGrades,
  updateClassListState,
} from "../../store/actions/grade-setting-actions";
import { showErrorToast } from "../../store/actions/toaster-actions";

const GradeSetting = () => {
  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const {
    classList,
    prevGradesList,
    message,
    isSuccessful
  } = state.grade;
  // ACCESSING STATE FROM REDUX STORE

  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [selectedClassIds, setSelectedClassids] = useState([]);
  const [gradeSetups, setGradeSetup] = useState([]);
  const [gGroupName, setgGroupName] = useState('');
  const [gradeToEdit, setGradeToEdit] = useState(null);
  //VARIABLE DECLARATIONS

  //VALIDATIONS SCHEMA
  const validation = Yup.object().shape({
    // gradeGroupName: Yup.string().required("Grade group is required"),
    gradeName: Yup.string().required("required"),
    remark: Yup.string().required("required"),
    upperLimit: Yup.number().min(0, 'invalid')
      .max(100, 'invalid').required("required"),
    lowerLimit: Yup.number()
      .min(0, 'invalid')
      .max(100, 'invalid')
      .required("required"),
  });

  //VALIDATIONS SCHEMA

  React.useEffect(() => {
    if (isSuccessful) {
      setGradeInput(!gradeInput);
    setOkButton(false);
      setSaveButton(true);
  }
    getAllGradeClasses()(dispatch);
    getPreviousGrades()(dispatch); 
  }, [isSuccessful]);


  React.useEffect(() => {
    setgGroupName('');
    selectedGrade(null);
    setGradeSetup([]);
    setGradeToEdit({});
    setSelectedClassids([]);
  }, [isSuccessful]);

  const pushSelectedClassId = (event, sessionClassId) => {
    if (event.target.checked) {
      setSelectedClassids([...selectedClassIds, sessionClassId]);
    } else {
      setSelectedClassids([...selectedClassIds.filter(id => id !== sessionClassId),]);
    }
  }

  const selectedGrade = (selected = null) => {
    if (selected) {
      setGradeToEdit(selected);
    } else {
      setGradeToEdit({
        gradeGroupName: '',
        gradeName: '',
        remark: '',
        upperLimit: 0,
        lowerLimit: 0
      });
    }
  }

  const submitGradeSetting = () => {

    if (selectedClassIds.length === 0) {
      showErrorToast('No Classes Selected')(dispatch);
      return;
    }

    if (gradeSetups.length === 0) {
      showErrorToast('No Grade added')(dispatch);
      return;
    }

    const payload = {
      gradeGroupName: gGroupName,
      grades: gradeSetups,
      classes: selectedClassIds
    }

    createGradeSetting(payload)(dispatch);
  }


console.log('classList', classList);

  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card className="p-2">
              <Card.Body id='form'>
                <Formik
                  initialValues={{
                    gradeGroupName: gradeToEdit?.gradeGroupName || gGroupName,
                    gradeName: gradeToEdit?.gradeName,
                    remark: gradeToEdit?.remark,
                    upperLimit: gradeToEdit?.upperLimit,
                    lowerLimit: gradeToEdit?.lowerLimit

                  }}
                  enableReinitialize={true}
                  validationSchema={validation}
                  onSubmit={(values) => {

                    setgGroupName(values.gradeGroupName);
                    selectedGrade(null);

                    var edited = gradeSetups.find(d => d.gradeName.trim().toLowerCase() == values.gradeName.trim().toLowerCase())
                    if (edited) {
                      edited.gradeName = values.gradeName;
                      edited.remark = values.remark;
                      edited.upperLimit = values.upperLimit;
                      edited.lowerLimit = values.lowerLimit;
                      setGradeSetup([...gradeSetups.filter(d => d.gradeName.trim().toLowerCase() != values.gradeName.trim().toLowerCase()), edited])
                      return
                    } else {
                      setGradeSetup([...gradeSetups, values]);
                      return
                    }

                  }}
                >
                  {({
                    handleSubmit,
                    touched,
                    errors,
                  }) => (
                    <Form>
                      {message && <div className="text-danger">{message}</div>}
                      <Row className="border p-3 px-4 d-lg-flex ">

                        <Col className="w-md-100 w-sm-100">
                          {/* {(touched.gradeGroupName && errors.gradeGroupName) && <div className='text-danger'>{errors.gradeGroupName}</div>} */}
                          <h6 className="pb-2">Grade Group</h6>
                          <Field type="text" className="form-control  w-75 text-dark fw-bolder" name="gradeGroupName" id="gradeGroupName" aria-describedby="gradeGroupName" required placeholder="Enter grade group name" />

                          {classList.map((classItem, idx) => (
                            <div
                              className="mt-3 col-md-9 d-flex justify-content-between form-group "
                              key={idx}
                            >
                              <div
                                className="form-control text-dark fw-bolder border-secondary text-dark w-75 pt-1 text-center"
                              >
                                {classItem.className}
                              </div>

                              <input
                                type="checkbox"
                                id="customCheck1"
                                className="form-check-input px-3 border-secondary"
                                style={{ height: "30px" }}
                                onChange={(e) => {
                                  pushSelectedClassId(e, classItem.sessionClassId);
                                }}
                              />
                            </div>
                          ))}
                        </Col>

                        <Col className="w-md-100 w-sm-100 pt-md-3 pt-sm-3 pt-lg-0">

                          <div className="d-flex justify-content-around">

                            <div className="form-group">
                              <label
                                className="form-label d-block h6"
                                htmlFor="gradeName">
                                <Row>
                                  {(touched.gradeName && errors.gradeName) && <div className='text-danger'>{errors.gradeName}</div>}
                                </Row>
                                Grade
                              </label>
                              <Field type="text" className="form-control w-75 text-dark fw-bolder" name="gradeName" id="gradeName" aria-describedby="gradeName" required />
                              <span>e.g A</span>
                            </div>

                            <div className="form-group">
                              <label
                                className="form-label d-block h6"
                                htmlFor="upperLimit"
                              >
                                <Row>
                                  {(touched.upperLimit && errors.upperLimit) && <div className='text-danger'>{errors.upperLimit}</div>}
                                </Row>
                                Upper Limit
                              </label>

                              <Field type="number" className="form-control w-75 text-dark fw-bolder" name="upperLimit" id="upperLimit" aria-describedby="upperLimit" required />
                              <span>e.g 90</span>
                            </div>

                            <div className="form-group">
                              <label
                                className="form-label d-block h6"
                                htmlFor="lowerLimit"
                              >
                                <Row>
                                  {(touched.lowerLimit && errors.lowerLimit) && <div className='text-danger'>{errors.lowerLimit}</div>}
                                </Row>
                                Lower Limit
                              </label>
                              <Field type="number" className="form-control w-75 text-dark fw-bolder" name="lowerLimit" id="lowerLimit" aria-describedby="lowerLimit" required />
                              <span>e.g 70</span>
                            </div>

                            <div className="form-group">
                              <label
                                className="form-label d-block h6"
                                htmlFor="remark"
                              >
                                <Row>
                                  {(touched.remark && errors.remark) && <div className='text-danger'>{errors.remark}</div>}
                                </Row>
                                Remark
                              </label>
                              <Field type="text" className="form-control text-dark fw-bolder" name="remark" id="remark" aria-describedby="remark" required />
                              <span>e.g Excellent</span>
                            </div>

                          </div>

                          <hr />

                          <table className="table table-bordered table-responsive table-sm">
                            <thead>
                              <tr className="text-center">

                                <td className="text-uppercase h6">Grade</td>

                                <td className="text-uppercase h6">Upper Limit</td>

                                <td className="text-uppercase h6">Lower Limit</td>

                                <td className="text-uppercase h6">Remark</td>

                                <td className="text-uppercase h6">Action</td>
                              </tr>

                            </thead>
                            <tbody>
                              {
                                gradeSetups.map((item, idx) => (
                                  <tr key={idx} className="text-center">
                                    <td className="text-uppercase">{item.gradeName}</td>
                                    <td className="text-uppercase">{item.upperLimit}</td>
                                    <td className="text-uppercase">{item.lowerLimit}</td>
                                    <td className="text-uppercase">{item.remark}</td>
                                    <td>
                                      <Button
                                        onClick={() => {
                                          selectedGrade(item);
                                        }} className="btn btn-sm bt-primary">edit</Button></td>
                                  </tr>
                                ))
                              }
                            </tbody>
                          </table>

                          <div className="d-flex justify-content-end">
                            <a
                              className="h-25 btn-sm mt-5 btn btn-primary"
                              onClick={() => {
                                submitGradeSetting()
                              }}
                            >
                              submit
                            </a>
                          </div>
                        </Col>

                        <Col className="col-md-1 mt-5">
                          <Button
                            type="submit"
                            className="mt-4 btn-sm"
                            onSubmit={handleSubmit}
                          >
                            Save
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>


                <div className="mt-4 d-md-block  d-lg-flex justify-content-lg-around">
                  <Row>
                    {prevGradesList.map((item, index) => (
                      <Col key={index} className="">


                        <div className="d-flex justify-content-around">
                          <h5 className="text-uppercase text-center w-100">
                            {item.gradeGroupName}{" "}
                          </h5>
                          <a
                            style={{ cursor: "pointer" }}
                            className="text-capitalize badge btn-primary border-0 btn btn-sm"
                            onClick={() => {
                              console.log('item.classes', item.classes);
                              setgGroupName(item.gradeGroupName);
                              setGradeSetup(item.grades);
                              updateClassListState(item.classes)(dispatch);
                              setGradeToEdit(null);
                              window.scrollTo(0, 0);
                            }}>
                            Edit
                          </a>
                        </div>


                        <table className="table table-bordered table-responsive  col-md-6 ">
                          <thead>
                            <tr className="text-center">
                              <td className="text-uppercase h6">
                                Upper Limit
                              </td>

                              <td className="text-uppercase h6">
                                Lower Limit
                              </td>

                              <td className="text-uppercase h6">Grade</td>

                              <td className="text-uppercase h6">Remark</td>
                            </tr>

                          </thead>
                          <tbody>
                            {item.grades.map((grade, index) => (
                              <tr key={index} className="text-center">
                                <td className="fw-bold">{grade.gradeName}</td>
                                <td className="fw-bold">{grade.upperLimit}</td>
                                <td className="fw-bold">{grade.lowerLimit}</td>
                                <td className="fw-bold">{grade.remark}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>


                      </Col>
                    ))}
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default GradeSetting;
