import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getSingleLessonNotes } from "../../../store/actions/class-actions";

const LessonNoteDetails = () => {
  const state = useSelector((state) => state);
  const { singleLessonNotes } = state.class;
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  //VARIABLE DECLARATIONS
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const teacherClassNoteId = queryParams.get("teacherClassNoteId");
    getSingleLessonNotes(teacherClassNoteId)(dispatch);
  }, []);

  return (
    <>
      <div className="col-md-8 mx-auto">
        <Row>
          <Col sm="12">
            <Card className="">
              <Card.Body>
                <div className="d-flex justify-content-between mt-3 flex-wrap">
                  <div>
                    <h6>{singleLessonNotes?.authorName}</h6>
                  </div>
                  <div>
                    Approval Status:
                    <span className="text-end text-primary">
                      {" "}
                      {singleLessonNotes?.approvalStatusName}
                    </span>
                  </div>
                </div>
                <div className="d-flex justify-content-start mt-4">
                  <div>
                    <button
                      type="button"
                      className="btn btn-soft-secondary btn-icon rounded-circle avatar-50 d-flex align-items-center justify-content-center"
                    >
                      <span>
                        <svg
                          className="icon-32"
                          width="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M14.7379 2.76175H8.08493C6.00493 2.75375 4.29993 4.41175 4.25093 6.49075V17.2037C4.20493 19.3167 5.87993 21.0677 7.99293 21.1147C8.02393 21.1147 8.05393 21.1157 8.08493 21.1147H16.0739C18.1679 21.0297 19.8179 19.2997 19.8029 17.2037V8.03775L14.7379 2.76175Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M14.4751 2.75V5.659C14.4751 7.079 15.6231 8.23 17.0431 8.234H19.7981"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M14.2882 15.3584H8.88818"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                          <path
                            d="M12.2432 11.606H8.88721"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                  <div className="ms-2 mt-2 fw-bold">
                    <span>{singleLessonNotes?.noteTitle}</span>
                    <br />
                  </div>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: singleLessonNotes?.noteContent,
                  }}
                ></div>
                <hr />
              </Card.Body>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <Card.Header>
                <h4 className="card-title">Comment(s)</h4>
              </Card.Header>
              <Card.Body>
                <div className="card shadow-none bg-transparent border mb-3">
                  <Card.Body>
                    <div className="d-flex flex-sm-nowrap flex-wrap justify-content-center gap-3">
                      <div>
                        <div className="d-flex justify-content-between align-items-center my-2 my-lg-0">
                          <h6 className="mb-0">{"Jackson Jones"}</h6>
                        </div>
                        <p className="mt-2 mb-0">
                          {
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ut eu morbi tincidunt erat egestas quisque ultrices ut. Vel elementum blandit et tellus sit tincidunt."
                          }
                        </p>
                      </div>
                    </div>
                  </Card.Body>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <Card.Header>
                <h4 className="card-title">Post a Comment.</h4>
              </Card.Header>
              <Card.Body>
                <form>
                  <Row>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label for="message" className="form-label text-dark">
                          Enter your Comment:
                        </label>
                        <input
                          type="text"
                          id="message"
                          className="form-control w-100 border-secondary"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 d-flex ">
                      <input
                        type="radio"
                        id="approve"
                        name="shouldApprove"
                        value="approve"
                        className="mx-1 form-check-input"
                      />
                      <label for="html">approve</label>
                      <input
                        type="radio"
                        id="disapprove"
                        name="shouldApprove"
                        value="disapprove"
                        className="mx-1 form-check-input"
                      />
                      <label for="css">disapprove</label>
                    </div>
                  </Row>
                </form>
                <div className="mt-5 mt-sm-0 d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-md mx-2"
                    onClick={() => {
                      history.goBack();
                    }}
                  >
                    Back
                  </button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LessonNoteDetails;
