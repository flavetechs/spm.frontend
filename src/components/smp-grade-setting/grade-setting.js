import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Card from "../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  buildClassArray,
  createGradeSetting,
  editGradeValues,
  getAllGradeClasses,
  getPreviousGrades,
  gradeValueArray,
  updateFetchClass,
  chooseEdit,
} from "../../store/actions/grade-setting-actions";

const GradeSetting = () => {
  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const {
    message,
    classList,
    prevGradesList,
    isSuccessful,
    grades,
    classes,
    gradesEdit,
  } = state.grade;
  // ACCESSING STATE FROM REDUX STORE

  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const getGradesArray = gradesEdit.map((edit) => edit.grades);
  const [innerEdit, setInnerEdit] = useState({ status: false, rowKey: null });
  const [outerEditButton, setOuterEditButton] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [saveButton, setSaveButton] = useState(false);
  const [okButton, setOkButton] = useState(false);
  const [gradeInput, setGradeInput] = useState({
    upperLimit: "",
    lowerLimit: "",
    gradeName: "",
    remark: "",
  });
  //VARIABLE DECLARATIONS

  //VALIDATIONS SCHEMA
  const validation = Yup.object().shape({
    gradeGroupName: Yup.string().required("Grade group is required"),
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

  const getGradeValues = (e) => {
    setGradeInput((prevValues) => {
      return {
        ...prevValues,
        [e.target.name]: e.target.value,
      };
    });
  };

  const getClassId = (e, sessionClassId) => {
    buildClassArray(e.target.checked, sessionClassId, classes)(dispatch);
  };
  const validate = (values) => {
    let errors = {};
    if (!values.gradeName) {
      errors.gradeName = "grade name is required";
    }
    if (!values.upperLimit) {
      errors.upperLimit = "upper limit is required";
    }
    if (!values.lowerLimit) {
      errors.lowerLimit = "lower limit is required";
    }
    return errors;
  };

  const handleOkButtonSubmit = () => {
    setFormErrors(validate(gradeInput));
    //  if(!formErrors.upperLimit && !formErrors.lowerLimit && !formErrors.gradeName){
    setOkButton(true);
    gradeValueArray(gradeInput, getGradesArray)(dispatch);

    // }
  };
  const handleGeneralEdit = (index, gradeGroupId) => {
    setOuterEditButton(true);
    updateFetchClass(index, gradeGroupId, prevGradesList)(dispatch);
    chooseEdit(index, gradeGroupId, prevGradesList)(dispatch);
    editGradeValues(index, gradeGroupId, prevGradesList)(dispatch);
  };
  const handleInnerEdit = (id) => {
    setInnerEdit({ status: !innerEdit.status, rowKey: id });
    setGradeInput({
      upperLimit: Number(
        getGradesArray.map((res) => res[0].upperLimit)?.toString()
      ),
      lowerLimit: Number(
        getGradesArray.map((res) => res[0].lowerLimit)?.toString()
      ),
      gradeName: getGradesArray.map((res) => res[0].gradeName)?.toString(),
      remark: getGradesArray.map((res) => res[0].remark)?.toString(),
    });
  };
  console.log("list", gradeInput);
  return (
    <>
      <div>
        <Row>
          <Col sm="12">
            <Card className="p-2">
              <Card.Body>
                <Formik
                  initialValues={{
                    gradeGroupName: gradesEdit
                      .map((edit) => edit.gradeGroupName)
                      ?.toString(),
                  }}
                  enableReinitialize
                  validationSchema={validation}
                  onSubmit={(values) => {
                    console.log("values", values);
                    values.grades = grades;
                    values.classes = classes;
                    // if (outerEditButton) {
                    //updateGradeSetting(values)(dispatch)
                    // } else {
                    createGradeSetting(values)(dispatch);
                    // }
                  }}
                >
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    touched,
                    errors,
                    isValid,
                  }) => (
                    <Form>
                      {message && <div className="text-danger">{message}</div>}
                      <Row className="border border-secondary border-1 p-3 px-4 d-lg-flex  text-dark">
                        <Col className="w-md-100 w-sm-100">
                          {touched.gradeGroupName && errors.gradeGroupName && (
                            <div className="text-danger">
                              {errors.gradeGroupName}
                            </div>
                          )}
                          <h6 className="pb-2">Grade Group</h6>
                          <Field
                            type="text"
                            id="gradeGroupName"
                            name="gradeGroupName"
                            className="form-control w-75 border-secondary text-secondary"
                          />
                          {classList.map((list, idx) => (
                            <div
                              className="mt-3 col-md-9 d-flex justify-content-between form-group"
                              key={idx}
                            >
                              <div
                                className="form-control  border-secondary text-dark w-75 pt-1 text-center"
                                style={{ height: "35px" }}
                              >
                                {list.className}
                              </div>
                              <input
                                type="checkbox"
                                id="customCheck1"
                                className="form-check-input px-3 border-secondary"
                                style={{ height: "30px" }}
                                onChange={(e) => {
                                  getClassId(e, list.sessionClassId);
                                }}
                              />
                            </div>
                          ))}
                        </Col>

                        <Col className="w-md-100 w-sm-100 pt-md-3 pt-sm-3 pt-lg-0">
                          {formErrors.upperLimit && (
                            <div className="text-danger">
                              {formErrors.upperLimit}
                            </div>
                          )}
                          {formErrors.lowerLimit && (
                            <div className="text-danger">
                              {formErrors.lowerLimit}
                            </div>
                          )}
                          {formErrors.gradeName && (
                            <div className="text-danger">
                              {formErrors.gradeName}
                            </div>
                          )}
                          <div className="d-flex justify-content-around">
                            <div className="form-group">
                              <label
                                className="form-label d-block h6"
                                htmlFor="upperLimit"
                              >
                                Upper Limit
                              </label>
                              <Field
                                type="number"
                                name="upperLimit"
                                className="form-control w-75 px-1 border-secondary text-secondary"
                                value={gradeInput.upperLimit}
                                onChange={(e) => {
                                  getGradeValues(e);
                                }}
                              />
                            </div>
                            <div className="form-group">
                              <label
                                className="form-label d-block h6"
                                htmlFor="lowerLimit"
                              >
                                Lower Limit
                              </label>
                              <Field
                                type="number"
                                name="lowerLimit"
                                value={gradeInput.lowerLimit}
                                onChange={(e) => {
                                  getGradeValues(e);
                                }}
                                className="form-control w-75 px-1 border-secondary text-secondary"
                              />
                            </div>
                            <div className="form-group">
                              <label
                                className="form-label d-block h6"
                                htmlFor="gradeName"
                              >
                                Grade
                              </label>
                              <Field
                                type="text"
                                name="gradeName"
                                value={gradeInput.gradeName}
                                onChange={(e) => {
                                  getGradeValues(e);
                                }}
                                className="form-control w-75 border-secondary text-secondary"
                              />
                            </div>
                            <div className="form-group">
                              <label
                                className="form-label d-block h6"
                                htmlFor="remark"
                              >
                                Remark
                              </label>
                              <Field
                                type="text"
                                name="remark"
                                value={gradeInput.remark}
                                onChange={(e) => {
                                  getGradeValues(e);
                                }}
                                id="remark"
                                className="form-control w-75 border-secondary text-secondary"
                              />
                            </div>
                          </div>

                          <div className="border border-secondary my-3"></div>

                          <table className="table table-bordered table-responsive border-secondary table-sm">
                            {outerEditButton ? (
                              <tbody>
                                <tr className="text-center">
                                  <td className="text-uppercase h6">
                                    Upper Limit
                                  </td>

                                  <td className="text-uppercase h6">
                                    Lower Limit
                                  </td>

                                  <td className="text-uppercase h6">Grade</td>

                                  <td className="text-uppercase h6">Remark</td>

                                  <td className="text-uppercase h6">Action</td>
                                </tr>

                                {gradesEdit.map((edit, index) => (
                                  <tr key={index} className="text-center mt-1">
                                    <td className="">
                                      {innerEdit.status &&
                                      innerEdit.rowKey === edit.gradeGroupId ? (
                                        <input
                                          type="number"
                                          name="upperLimit"
                                          className="border-0 text-center w-50"
                                          defaultValue={Number(
                                            getGradesArray
                                              .map((res) => res[0].upperLimit)
                                              ?.toString()
                                          )}
                                          onChange={(e) => {
                                            getGradeValues(e);
                                          }}
                                        />
                                      ) : (
                                        <span className="fw-bold">
                                          {edit.grades.map(
                                            (res) => res.upperLimit
                                          )}
                                        </span>
                                      )}
                                    </td>

                                    <td className="">
                                      {innerEdit.status &&
                                      innerEdit.rowKey === edit.gradeGroupId ? (
                                        <input
                                          type="number"
                                          name="lowerLimit"
                                          className="border-0 text-center w-50"
                                          defaultValue={Number(
                                            getGradesArray
                                              .map((res) => res[0].lowerLimit)
                                              ?.toString()
                                          )}
                                          onChange={(e) => {
                                            getGradeValues(e);
                                          }}
                                        />
                                      ) : (
                                        <span className="fw-bold">
                                          {edit.grades.map(
                                            (res) => res.lowerLimit
                                          )}
                                        </span>
                                      )}
                                    </td>

                                    <td className="">
                                      {innerEdit.status &&
                                      innerEdit.rowKey === edit.gradeGroupId ? (
                                        <input
                                          type="text"
                                          name="gradeName"
                                          className="border-0 text-center w-50"
                                          defaultValue={getGradesArray
                                            .map((res) => res[0].gradeName)
                                            ?.toString()}
                                          onChange={(e) => {
                                            getGradeValues(e);
                                          }}
                                        />
                                      ) : (
                                        <span className="fw-bold ml-5">
                                          {edit.grades.map(
                                            (res) => res.gradeName
                                          )}
                                        </span>
                                      )}
                                    </td>

                                    <td>
                                      {innerEdit.status &&
                                      innerEdit.rowKey === edit.gradeGroupId ? (
                                        <input
                                          type="text"
                                          name="remark"
                                          className="border-0 w-75"
                                          defaultValue={getGradesArray
                                            .map((res) => res[0].remark)
                                            ?.toString()}
                                          onChange={(e) => {
                                            getGradeValues(e);
                                          }}
                                        />
                                      ) : (
                                        <span className="fw-bold">
                                          {edit.grades.map((res) => res.remark)}
                                        </span>
                                      )}
                                    </td>
                                    <td>
                                      <div
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          handleInnerEdit(edit.gradeGroupId);
                                        }}
                                        className="badge bg-primary"
                                      >
                                        Edit
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                                {grades.map((input, idx) => (
                                  <tr key={idx} className="text-center mt-1">
                                    <td className="">
                                      {innerEdit.status &&
                                      innerEdit.rowKey === idx ? (
                                        <Field
                                          type="number"
                                          name="upperLimit"
                                          className="border-0 text-center px-1 w-75"
                                          defaultValue={input.upperLimit}
                                          onChange={(e) => {
                                            getGradeValues(e);
                                          }}
                                        />
                                      ) : (
                                        <span className="fw-bold">
                                          {input.upperLimit}
                                        </span>
                                      )}
                                    </td>

                                    <td className="">
                                      {innerEdit.status &&
                                      innerEdit.rowKey === idx ? (
                                        <Field
                                          type="number"
                                          name="lowerLimit"
                                          className="border-0 text-center px-1 w-75"
                                          defaultValue={input.lowerLimit}
                                          onChange={(e) => {
                                            getGradeValues(e);
                                          }}
                                        />
                                      ) : (
                                        <span className="fw-bold">
                                          {input.lowerLimit}
                                        </span>
                                      )}
                                    </td>

                                    <td className="">
                                      {innerEdit.status &&
                                      innerEdit.rowKey === idx ? (
                                        <Field
                                          type="text"
                                          name="gradeName"
                                          className="border-0 text-center w-75"
                                          defaultValue={input.gradeName}
                                          onChange={(e) => {
                                            getGradeValues(e);
                                          }}
                                        />
                                      ) : (
                                        <span className="fw-bold">
                                          {input.gradeName}
                                        </span>
                                      )}
                                    </td>

                                    <td className="">
                                      {innerEdit.status &&
                                      innerEdit.rowKey === idx ? (
                                        <Field
                                          type="text"
                                          name="remark"
                                          className="border-0 w-75"
                                          defaultValue={input.remark}
                                          onChange={(e) => {
                                            getGradeValues(e);
                                          }}
                                        />
                                      ) : (
                                        <span className="fw-bold">
                                          {input.remark}
                                        </span>
                                      )}
                                    </td>
                                    <td>
                                      <div
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          handleInnerEdit(idx);
                                        }}
                                        className="badge bg-primary"
                                      >
                                        Edit
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            ) : (
                              okButton && (
                                <tbody>
                                  <tr className="text-center">
                                    <td className="text-uppercase h6">
                                      Upper Limit
                                    </td>

                                    <td className="text-uppercase h6">
                                      Lower Limit
                                    </td>

                                    <td className="text-uppercase h6">Grade</td>

                                    <td className="text-uppercase h6">
                                      Remark
                                    </td>

                                    <td className="text-uppercase h6">
                                      Action
                                    </td>
                                  </tr>

                                  {grades.map((input, idx) => (
                                    <tr key={idx} className="text-center mt-1">
                                      <td className="">
                                        {innerEdit.status &&
                                        innerEdit.rowKey === idx ? (
                                          <Field
                                            type="number"
                                            name="upperLimit"
                                            className="border-0 text-center px-1 w-75"
                                            defaultValue={input.upperLimit}
                                            onChange={(e) => {
                                              getGradeValues(e);
                                            }}
                                          />
                                        ) : (
                                          <span className="fw-bold">
                                            {input.upperLimit}
                                          </span>
                                        )}
                                      </td>

                                      <td className="">
                                        {innerEdit.status &&
                                        innerEdit.rowKey === idx ? (
                                          <Field
                                            type="number"
                                            name="lowerLimit"
                                            className="border-0 text-center px-1 w-75"
                                            defaultValue={input.lowerLimit}
                                            onChange={(e) => {
                                              getGradeValues(e);
                                            }}
                                          />
                                        ) : (
                                          <span className="fw-bold">
                                            {input.lowerLimit}
                                          </span>
                                        )}
                                      </td>

                                      <td className="">
                                        {innerEdit.status &&
                                        innerEdit.rowKey === idx ? (
                                          <Field
                                            type="text"
                                            name="gradeName"
                                            className="border-0 text-center w-75"
                                            defaultValue={input.gradeName}
                                            onChange={(e) => {
                                              getGradeValues(e);
                                            }}
                                          />
                                        ) : (
                                          <span className="fw-bold">
                                            {input.gradeName}
                                          </span>
                                        )}
                                      </td>

                                      <td className="">
                                        {innerEdit.status &&
                                        innerEdit.rowKey === idx ? (
                                          <Field
                                            type="text"
                                            name="remark"
                                            className="border-0 w-75"
                                            defaultValue={input.remark}
                                            onChange={(e) => {
                                              getGradeValues(e);
                                            }}
                                          />
                                        ) : (
                                          <span className="fw-bold">
                                            {input.remark}
                                          </span>
                                        )}
                                      </td>

                                      <td>
                                        <div
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            handleInnerEdit(idx);
                                          }}
                                          className="badge bg-primary"
                                        >
                                          Edit
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              )
                            )}
                          </table>
                          <div className="d-flex justify-content-end">
                            <Button
                              className="h-25 btn-sm mt-5"
                              onClick={() => {
                                handleSubmit();
                              }}
                            >
                              submit
                            </Button>
                          </div>
                        </Col>

                        <Col className="col-md-1 mt-5">
                          <Button
                            className="mt-4 btn-sm"
                            onClick={() => {
                              handleOkButtonSubmit();
                            }}
                          >
                            Save
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>
                {saveButton && (
                  <div className="mt-4 d-md-block  d-lg-flex justify-content-lg-around">
                    <Row>
                      {prevGradesList.map((list, index) => (
                        <Col key={index} className="">
                          <div className="d-flex justify-content-around">
                            <h5 className="text-uppercase text-center w-100">
                              {list.gradeGroupName}{" "}
                            </h5>
                            <button
                              style={{ cursor: "pointer" }}
                              className="text-capitalize badge bg-primary"
                              onClick={() => {
                                handleGeneralEdit(index, list.gradeGroupId);
                              }}
                            >
                              Edit
                            </button>
                          </div>
                          <table className="table table-bordered table-responsive border-secondary col-md-6 table-sm ">
                            <tbody>
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

                              <tr className="text-center mt-1">
                                <td className="">
                                  <span className="fw-bold">
                                    {list.grades.map((res) => res.upperLimit)}
                                  </span>
                                </td>

                                <td className="">
                                  <span className="fw-bold">
                                    {list.grades.map((res) => res.lowerLimit)}
                                  </span>
                                </td>

                                {saveButton && (
                                  <td className="">
                                    <span className="fw-bold ml-5">
                                      {list.grades.map((res) => res.gradeName)}
                                    </span>
                                  </td>
                                )}

                                <td>
                                  <span className="fw-bold">
                                    {list.grades.map((res) => res.remark)}
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </Col>
                      ))}
                    </Row>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default GradeSetting;
