import React, { useEffect, useRef, useState } from "react";
import { Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { classLocations } from "../../../../router/spm-path-locations";
import {
  addStudentComments,
  addStudentReplies,
  getAllStudentComments,
  getSingleStudentNotes,
  reviewNotes,
} from "../../../../store/actions/class-actions";
import { closeFullscreen, openFullscreen } from "../../../../utils/export-csv";

const StudentNoteDetails = () => {
  const state = useSelector((state) => state);
  const { singleStudentNotes, createSuccessful, studentComments } = state.class;
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const elementRef = useRef(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [row, setRow] = useState({});
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState({});
  //VARIABLE DECLARATIONS
  React.useEffect(() => {
    createSuccessful && history.goBack();
  }, [createSuccessful]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const studentNoteId = queryParams.get("studentNoteId");
    getSingleStudentNotes(studentNoteId)(dispatch);
  }, []);

  useEffect(() => {
    if (singleStudentNotes?.studentNoteId) {
      getAllStudentComments(singleStudentNotes?.studentNoteId)(dispatch);
    }
  }, [singleStudentNotes]);
 
  return (
    <>
      <div className="col-md-12 mx-auto">
        <Row>
          <Col sm="12">
            <Col sm="12">
              <Card
                id="details"
                ref={elementRef}
                style={{ overflow: fullScreen && "scroll" }}
              >
                <Card.Body>
                  <div className="d-flex justify-content-between mt-3 flex-wrap">
                    <div className="mx-3">
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="button-tooltip-2"> back</Tooltip>}
                      >
                        <svg
                          onClick={() => {
                            history.goBack();
                          }}
                          style={{ cursor: "pointer" }}
                          className="text-primary"
                          width="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M13.165 11.9934L13.1634 11.6393C13.1513 10.2348 13.0666 8.98174 12.9206 8.18763C12.9206 8.17331 12.7613 7.38572 12.6599 7.12355C12.5006 6.74463 12.2126 6.42299 11.8515 6.2192C11.5624 6.0738 11.2592 6 10.9417 6C10.6922 6.01157 10.2806 6.13714 9.98692 6.24242L9.74283 6.33596C8.12612 6.97815 5.03561 9.07656 3.85199 10.3598L3.76473 10.4495L3.37527 10.8698C3.12982 11.1915 3 11.5847 3 12.0077C3 12.3866 3.11563 12.7656 3.3469 13.0718C3.41614 13.171 3.52766 13.2983 3.62693 13.4058L4.006 13.8026C5.31046 15.1243 8.13485 16.9782 9.59883 17.5924C9.59883 17.6057 10.5086 17.9857 10.9417 18H10.9995C11.6639 18 12.2846 17.6211 12.6021 17.0086C12.6888 16.8412 12.772 16.5132 12.8352 16.2252L12.949 15.6813C13.0788 14.8067 13.165 13.465 13.165 11.9934ZM19.4967 13.5183C20.3269 13.5183 21 12.8387 21 12.0004C21 11.1622 20.3269 10.4825 19.4967 10.4825L15.7975 10.8097C15.1463 10.8097 14.6183 11.3417 14.6183 12.0004C14.6183 12.6581 15.1463 13.1912 15.7975 13.1912L19.4967 13.5183Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </OverlayTrigger>
                    
                      {!fullScreen ? (
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="button-tooltip-2">
                              view full screen
                            </Tooltip>
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="mx-4"
                            onClick={() => {
                              openFullscreen("details");
                              setFullScreen(true);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <path d="M21.414 18.586l2.586-2.586v8h-8l2.586-2.586-5.172-5.172 2.828-2.828 5.172 5.172zm-13.656-8l2.828-2.828-5.172-5.172 2.586-2.586h-8v8l2.586-2.586 5.172 5.172zm10.828-8l-2.586-2.586h8v8l-2.586-2.586-5.172 5.172-2.828-2.828 5.172-5.172zm-8 13.656l-2.828-2.828-5.172 5.172-2.586-2.586v8h8l-2.586-2.586 5.172-5.172z" />
                          </svg>
                        </OverlayTrigger>
                      ) : (
                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="button-tooltip-2">
                              exit full screen
                            </Tooltip>
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            onClick={() => {
                              closeFullscreen("details");
                              setFullScreen(false);
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <path d="M16.586 19.414l-2.586 2.586v-8h8l-2.586 2.586 4.586 4.586-2.828 2.828-4.586-4.586zm-13.758-19.414l-2.828 2.828 4.586 4.586-2.586 2.586h8v-8l-2.586 2.586-4.586-4.586zm16.586 7.414l2.586 2.586h-8v-8l2.586 2.586 4.586-4.586 2.828 2.828-4.586 4.586zm-19.414 13.758l2.828 2.828 4.586-4.586 2.586 2.586v-8h-8l2.586 2.586-4.586 4.586z" />
                          </svg>
                        </OverlayTrigger>
                      )}
                    </div>
                    <div>
                      Approval Status:
                      <span className="text-end text-primary">
                        {" "}
                        {singleStudentNotes?.approvalStatusName}
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
                      <span>{singleStudentNotes?.noteTitle}</span>
                      <br />
                    </div>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: singleStudentNotes?.noteContent,
                    }}
                  ></div>
                  <hr />
                </Card.Body>
              </Card>
            </Col>
            <Col sm="12">
              <Card>
                <Card.Header>
                  <h4 className="card-title mb-n5">Comment(s)</h4>
                </Card.Header>
                <Card.Body>
                  {studentComments?.map((comment, idx) => (
                    <>
                      <Card className="shadow-none bg-transparent border my-3">
                        <Card.Body>
                          <div>
                            <div className="d-flex justify-content-between align-items-center my-2 my-lg-0 col-12">
                              <h6 className="mb-0">{comment.name}</h6>
                              <h6
                                className="mb-0"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setRow({
                                    indexRow: idx,
                                    showRow: !row.showRow,
                                  });
                                }}
                              >
                                Reply
                              </h6>
                            </div>
                            {/* <small className="text-primary">March 01st 2021</small> */}
                            <p className="mt-2 mb-0">{comment.comment}</p>
                          </div>
                        </Card.Body>
                      </Card>
                      <h6 className="mb-2"> Replies:</h6>
                      {comment?.repliedComments?.map((replied, idx) => (
                        <Card
                          key={idx}
                          className="bg-light shadow-none border py-1 mb-1 px-3"
                        >
                          <div className="d-flex flex-sm-nowrap flex-wrap">
                            <div>
                              <div
                                className="d-flex justify-content-between align-items-center my-2 my-lg-0 "
                                style={{ cursor: "pointer" }}
                              >
                                <h6 className="mb-0">{replied.name}</h6>
                              </div>
                              {/* <small className="text-primary">March 01st 2021</small> */}
                              <p className="mt-2 mb-0">{replied.comment}</p>
                            </div>
                          </div>
                        </Card>
                      ))}{" "}
                      {row.showRow && row.indexRow == idx && (
                        <>
                          <div className="d-flex justify-content-end mt-4">
                            <div
                              className=" badge bg-primary border-0 mb-2 mt-n3"
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                addStudentReplies(
                                  reply.commentId,
                                  reply.comment,
                                  singleStudentNotes?.studentNoteId
                                )(dispatch);
                                setRow({
                                  indexRow: "",
                                  showRow: false,
                                });
                              }}
                            >
                              <svg
                                className="icon-32 me-2"
                                width="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.8325 8.17463L10.109 13.9592L3.59944 9.88767C2.66675 9.30414 2.86077 7.88744 3.91572 7.57893L19.3712 3.05277C20.3373 2.76963 21.2326 3.67283 20.9456 4.642L16.3731 20.0868C16.0598 21.1432 14.6512 21.332 14.0732 20.3953L10.106 13.9602"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                              ok
                            </div>
                          </div>
                          <textarea
                            className="form-control w-100 border-secondary"
                            onChange={(e) => {
                              setReply({
                                comment: e.target.value,
                                commentId: comment.commentId,
                              });
                            }}
                          />
                        </>
                      )}
                      <hr />
                    </>
                  ))}
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
                          <label className="form-label text-dark">
                            Enter your Comment:
                          </label>
                          <textarea
                            id="message"
                            className="form-control w-100 border-secondary"
                            value={comment}
                            onChange={(e) => {
                              setComment(e.target.value);
                            }}
                          />
                        </div>

                        <div
                          className="badge bg-primary border-0 mb-3"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            addStudentComments(
                              singleStudentNotes?.studentNoteId,
                              comment
                            )(dispatch);
                            setComment("");
                          }}
                        >
                          <svg
                            className="icon-32 me-2"
                            width="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.8325 8.17463L10.109 13.9592L3.59944 9.88767C2.66675 9.30414 2.86077 7.88744 3.91572 7.57893L19.3712 3.05277C20.3373 2.76963 21.2326 3.67283 20.9456 4.642L16.3731 20.0868C16.0598 21.1432 14.6512 21.332 14.0732 20.3953L10.106 13.9602"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                          ok
                        </div>
                      </div>
                      <div className="col-lg-12 d-flex ">
                        <input
                          type="checkbox"
                          id="approve"
                          name="shouldApprove"
                          className="mx-1 form-check-input"
                          onChange={(e) => {
                            setIsChecked(e.target.checked);
                          }}
                        />
                        <label>approve</label>
                      </div>
                    </Row>
                  </form>
                  <div className="mt-5 mt-sm-0 d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-danger btn-md mx-2"
                      onClick={() => {
                        history.goBack();
                      }}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={() => {
                        isChecked &&
                          reviewNotes(
                            singleStudentNotes?.studentNoteId,
                            isChecked
                          )(dispatch);
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Col>
          {/* <Col sm="5">
            <Card>
              <Card.Body>
                <h4 className="mb-4">About Me</h4>
                <div className="d-flex align-items-center gap-3">
                  <img
                    className="img-fluid rounded-circle avatar-130"
                    src="https://templates.iqonic.design/hope-ui/pro/html/blog/assets/images/blog-avatar/01.png"
                    alt="user-img"
                  />
                  <div>
                    <h6 className="mb-3 text-primary">
                      {singleStudentNotes?.noteAuthordetail?.fullName}
                    </h6>
                    <p className="mt-3">
                      Elit vitae neque velit mattis elementum egestas non, Sem
                      eget.
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <h4 className="mb-3">Related Notes</h4>
                <ul className="list-inline list-main d-flex flex-column gap-4 mb-0">
                  {relatedNotes?.map((notes, idx) => (
                    <li key={idx} className="">
                      <div className="iq-blog-categories d-flex justify-content-between align-items-center">
                        <h6
                          className="iq-categories-name mb-0"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            history.push(
                              `${classLocations.lessonNotesDetails}?teacherClassNoteId=${notes.teacherClassNoteId}`
                            );
                            getSingleLessonNotes(notes.teacherClassNoteId)(dispatch);
                          }}
                        >
                          {notes.noteTitle}
                        </h6>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <h4 className="mb-3">Viewers</h4>
                <ul className="list-inline list-main d-flex flex-column gap-4 mb-0">
                  {viewers?.map((viewer, idx) => (
                    <li key={idx} className="">
                      <div className="iq-blog-categories d-flex justify-content-between align-items-center">
                        <h6 className="iq-categories-name mb-0">
                          {viewer.fullName}
                        </h6>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col> */}
        </Row>
      </div>
    </>
  );
};

export default StudentNoteDetails;
