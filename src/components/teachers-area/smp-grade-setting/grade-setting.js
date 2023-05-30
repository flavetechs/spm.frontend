import React, { useState } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  createGradeSetting,
  deleteGradeSetting,
  getPreviousGrades,
  updateGradeSetting,
} from "../../../store/actions/grade-setting-actions";
import { respondDialog, showErrorToast, showHideDialog } from "../../../store/actions/toaster-actions";

const GradeSetting = () => {
  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { prevGradesList, message, isSuccessful } = state.grade;
  // ACCESSING STATE FROM REDUX STORE

  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  const [gGroupId, setgGroupId] = useState("");
  const [gradeSetups, setGradeSetup] = useState([]);
  const [gGroupName, setgGroupName] = useState("");
  const [gradeToEdit, setGradeToEdit] = useState(null);
  const { dialogResponse } = state.alert;
  //VARIABLE DECLARATIONS

  //VALIDATIONS SCHEMA
  const validation = Yup.object().shape({
    // gradeGroupName: Yup.string().required("Grade group is required"),
    gradeName: Yup.string().required("required"),
    remark: Yup.string().required("required"),
    upperLimit: Yup.number()
      .min(0, "invalid")
      .max(100, "invalid")
      .required("required"),
    lowerLimit: Yup.number()
      .min(0, "invalid")
      .max(100, "invalid")
      .required("required"),
  });

  React.useEffect(() => {
    if (dialogResponse === "continue") {
      deleteGradeSetting(gGroupId)(dispatch);
      showHideDialog(false, null)(dispatch);
      respondDialog("")(dispatch);
    }
    return () => {
      respondDialog("")(dispatch);
      showHideDialog(false, null)(dispatch);
    };
  }, [dialogResponse,dispatch]);


  React.useEffect(() => {
    getPreviousGrades()(dispatch);
  }, [isSuccessful,dispatch]);

  React.useEffect(() => {
    setgGroupId("");
    setgGroupName("");
    selectedGrade(null);
    setGradeSetup([]);
    setGradeToEdit({});
  }, [isSuccessful,dispatch]);

  const selectedGrade = (selected = null) => {
    if (selected) {
      setGradeToEdit(selected);
    } else {
      setGradeToEdit({
        gradeGroupName: "",
        gradeName: "",
        remark: "",
        upperLimit: 0,
        lowerLimit: 0,
      });
    }
  };

  const submitGradeSetting = () => {
    if (gradeSetups.length === 0) {
      showErrorToast("No Grade added")(dispatch);
      return;
    }

    if (!gGroupId) {
      const payload = {
        gradeGroupName: gGroupName,
        grades: gradeSetups,
      };
      createGradeSetting(payload)(dispatch);
    } else {
      const updatePayload = {
        gradeGroupId: gGroupId,
        gradeGroupName: gGroupName,
        grades: gradeSetups,
      };
      updateGradeSetting(updatePayload)(dispatch);
    }
  };

  const handleEditClick = (item) => {
    setgGroupId(item.gradeGroupId);
    setgGroupName(item.gradeGroupName);
    setGradeSetup(item.grades);
    setGradeToEdit(null);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div>
        <Row className="d-flex justify-content-center">
          <Col sm="12" lg="10">
            <Card className="p-2">
              <Card.Body id="form">
                <Formik
                  initialValues={{
                    gradeGroupName: gradeToEdit?.gradeGroupName || gGroupName,
                    gradeName: gradeToEdit?.gradeName,
                    remark: gradeToEdit?.remark,
                    upperLimit: gradeToEdit?.upperLimit,
                    lowerLimit: gradeToEdit?.lowerLimit,
                  }}
                  enableReinitialize={true}
                  validationSchema={validation}
                  onSubmit={(values) => {
                    setgGroupName(values.gradeGroupName);
                    selectedGrade(null);
                    setGradeToEdit(null);
                    var edited = gradeSetups.find(
                      (d) =>
                        d.gradeName.trim().toLowerCase() ===
                        values.gradeName.trim().toLowerCase()
                    );
                    if (edited) {
                      edited.gradeName = values.gradeName;
                      edited.remark = values.remark;
                      edited.upperLimit = values.upperLimit;
                      edited.lowerLimit = values.lowerLimit;
                      setGradeSetup([
                        ...gradeSetups.filter(
                          (d) =>
                            d.gradeName.trim().toLowerCase() !==
                            values.gradeName.trim().toLowerCase()
                        ),
                        edited,
                      ]);
                      return;
                    } else {
                      setGradeSetup([...gradeSetups, values]);
                      return;
                    }
                  }}
                >
                  {({
                    handleSubmit,
                    touched,
                    errors,
                    values,
                    setFieldValue,
                  }) => (
                    <Form>
                      {message && <div className="text-danger">{message}</div>}
                      <Row className="border p-3 px-4 d-sm-block">
                        <Col sm="12" lg="11">
                          {/* {(touched.gradeGroupName && errors.gradeGroupName) && <div className='text-danger'>{errors.gradeGroupName}</div>} */}
                          <h6 className="pb-2">Grade Group</h6>
                          <Field
                            type="text"
                            className="form-control fw-bolder border-secondary"
                            name="gradeGroupName"
                            id="gradeGroupName"
                            aria-describedby="gradeGroupName"
                            required
                            placeholder="Enter grade group name"
                          />
                        </Col>

                        <Col className="pt-4">
                          <div className="d-md-flex justify-content-around">
                            <div className="form-group col-lg-2">
                              <label
                                className="form-label d-block h6"
                                htmlFor="gradeName"
                              >
                                <Row>
                                  {touched.gradeName && errors.gradeName && (
                                    <div className="text-danger">
                                      {errors.gradeName}
                                    </div>
                                  )}
                                </Row>
                                Grade
                              </label>
                              <div className="d-sm-flex d-md-block">
                                <Field
                                  type="text"
                                  className="form-control w-75 col-lg-1 fw-bolder text-secondary border-secondary text-uppercase"
                                  name="gradeName"
                                  id="gradeName"
                                  aria-describedby="gradeName"
                                  required
                                />
                                <span className="px-sm-2 px-md-0">e.g A</span>
                              </div>
                            </div>
                            <div className="form-group  col-lg-2">
                              <label
                                className="form-label d-block h6"
                                htmlFor="upperLimit"
                              >
                                <Row>
                                  {touched.upperLimit && errors.upperLimit && (
                                    <div className="text-danger">
                                      {errors.upperLimit}
                                    </div>
                                  )}
                                </Row>
                                Upper Limit
                              </label>
                              <Field
                                type="number"
                                className="form-control w-75 fw-bolder text-secondary col-lg-1 border-secondary"
                                name="upperLimit"
                                id="upperLimit"
                                aria-describedby="upperLimit"
                                required
                              />
                              <span>e.g 90</span>
                            </div>

                            <div className="form-group col-lg-2">
                              <label
                                className="form-label d-block h6"
                                htmlFor="lowerLimit"
                              >
                                <Row>
                                  {touched.lowerLimit && errors.lowerLimit && (
                                    <div className="text-danger">
                                      {errors.lowerLimit}
                                    </div>
                                  )}
                                </Row>
                                Lower Limit
                              </label>
                              <div className="d-sm-flex d-md-block">
                                <Field
                                  type="number"
                                  className="form-control w-75 fw-bolder text-secondary border-secondary"
                                  name="lowerLimit"
                                  id="lowerLimit"
                                  aria-describedby="lowerLimit"
                                  required
                                />
                                <span className="px-sm-2 px-md-0">e.g 70</span>
                              </div>
                            </div>

                            <div className="form-group col-lg-2">
                              <label
                                className="form-label d-block h6"
                                htmlFor="remark"
                              >
                                <Row>
                                  {touched.remark && errors.remark && (
                                    <div className="text-danger">
                                      {errors.remark}
                                    </div>
                                  )}
                                </Row>
                                Remark
                              </label>
                              <div className="d-sm-flex d-md-block">
                                <Field
                                  type="text"
                                  className="form-control text-secondary fw-bolder w-75 border-secondary text-uppercase"
                                  name="remark"
                                  id="remark"
                                  aria-describedby="remark"
                                  required
                                />
                                <span className="px-sm-2 px-md-0">
                                  e.g Excellent
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-5 d-lg-flex justify-content-end">
                            <Button
                              type="submit"
                              className=" btn-sm"
                              onSubmit={handleSubmit}
                            >
                              Save
                            </Button>
                          </div>
                          <hr />

                          <Table size="sm" bordered responsive>
                            <thead>
                              <tr className="text-center">
                                <td className="text-uppercase h6">Grade</td>

                                <td className="text-uppercase h6">
                                  Upper Limit
                                </td>

                                <td className="text-uppercase h6">
                                  Lower Limit
                                </td>

                                <td className="text-uppercase h6">Remark</td>

                                <td className="text-uppercase h6">Action</td>
                              </tr>
                            </thead>
                            <tbody>
                              {gradeSetups?.map((item, idx) => (
                                <tr key={idx} className="text-center">
                                  <td className="text-uppercase">
                                    {item.gradeName}
                                  </td>
                                  <td className="text-uppercase">
                                    {item.upperLimit}
                                  </td>
                                  <td className="text-uppercase">
                                    {item.lowerLimit}
                                  </td>
                                  <td className="text-uppercase">
                                    {item.remark}
                                  </td>
                                  <td>
                                    <Button
                                      onClick={() => {
                                        selectedGrade(item);
                                      }}
                                      className="btn btn-sm bt-primary mx-1"
                                    >
                                      edit
                                    </Button>

                                    <Button
                                      bg={"red"}
                                      onClick={() => {
                                        setGradeSetup([
                                          ...gradeSetups.filter(
                                            (e) => e.gradeName !== item.gradeName
                                          ),
                                        ]);
                                      }}
                                      className="btn btn-sm"
                                    >
                                      delete
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>

                          <div className="d-flex justify-content-end">
                            <div
                              className="h-25 btn-sm mt-5 btn btn-primary"
                              onClick={() => {
                                submitGradeSetting();
                              }}
                            >
                              {!gGroupId ? "submit" : "update"}
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Form>
                  )}
                </Formik>

                <div className="mt-4 d-md-block  d-lg-flex justify-content-lg-around">
                  <Row>
                    {prevGradesList.map((item,idx) => (
                      <Col key={idx} className="">
                        <div className="d-flex justify-content-around">
                          <h5 className="text-uppercase text-center w-100">
                            {item.gradeGroupName}{" "}
                          </h5>
                          <div
                            style={{ cursor: "pointer" }}
                            className="text-capitalize badge btn-primary border-0 btn btn-sm"
                            onClick={() => {
                              handleEditClick(item);
                            }}
                          >
                            Edit
                          </div>{" "}
                          <div
                            style={{ cursor: "pointer" }}
                            className="text-capitalize badge btn-danger mx-2 border-0 btn btn-sm"
                            onClick={() => {
                              showHideDialog(
                                true,
                                `Are you sure you want to delete ${item.gradeGroupName}`
                              )(dispatch);
                              setgGroupId(item.gradeGroupId)
                            }}
                          >
                            Delete
                          </div>
                        </div>

                        <Table
                          size="md"
                          bordered
                          responsive
                          className="col-md-6"
                        >
                          <thead>
                            <tr className="text-center">
                              <td className="text-uppercase h6">Grade</td>

                              <td className="text-uppercase h6">Upper Limit</td>

                              <td className="text-uppercase h6">Lower Limit</td>

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
                        </Table>
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
