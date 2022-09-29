import { Card, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { classLocations } from "../../../../router/spm-path-locations";
import { closeHomeAssessment } from "../../../../store/actions/class-actions";
export function HomeAssessmentList(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <>
      <Col md="6" lg="4" xxl="3" className="" key={props.idx}>
        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <div className="mb-0">Title</div>
              <div className="dropdown show bg-light">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    props.setShowMenuDropdown(!props.showMenuDropdown);
                    props.setIndexRow(props.idx);
                  }}
                >
                  <g>
                    <g>
                      <circle cx="7" cy="12" r="1" fill="black"></circle>
                      <circle cx="12" cy="12" r="1" fill="black"></circle>
                      <circle cx="17" cy="12" r="1" fill="black"></circle>
                    </g>
                  </g>
                </svg>
                {props.showMenuDropdown && props.indexRow === props.idx && (
                  <div
                    x-placement="bottom-start"
                    aria-labelledby=""
                    className="dropdown-menu show"
                    style={{
                      position: "absolute",
                      inset: "-25px auto auto -100px",
                      transform: "translate(0px, 42px)",
                    }}
                    data-popper-placement="bottom-end"
                    data-popper-escaped="false"
                    data-popper-reference-hidden="false"
                  >
                    <div
                      onClick={() => {
                        history.push(
                          `${classLocations.homeAssessmentDetails}?homeAssessmentId=${props.item.homeAssessmentId}&sessionClassId=${props.item.sessionClassId}&sessionClassSubjectId=${props.sessionClassSubjectIdQueryParam}&groupId=${props.groupIdQueryParam}&type=${props.typeQueryParam}`
                        );
                        props.setShowMenuDropdown(false);
                      }}
                      className="dropdown-item"
                      role="button"
                      draggable="true"
                    >
                      <svg
                        width="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="me-2"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.7366 2.76175H8.08455C6.00455 2.75375 4.29955 4.41075 4.25055 6.49075V17.3397C4.21555 19.3897 5.84855 21.0807 7.89955 21.1167C7.96055 21.1167 8.02255 21.1167 8.08455 21.1147H16.0726C18.1416 21.0937 19.8056 19.4087 19.8026 17.3397V8.03975L14.7366 2.76175Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                        <path
                          d="M14.4741 2.75V5.659C14.4741 7.079 15.6231 8.23 17.0431 8.234H19.7971"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                        <path
                          d="M14.2936 12.9141H9.39355"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>{" "}
                        <path
                          d="M11.8442 15.3639V10.4639"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      view/details
                    </div>
                    <div
                      onClick={() => {
                        history.push(
                          `${classLocations.editHomeAssessment}?homeAssessmentId=${props.item.homeAssessmentId}&sessionClassSubjectId=${props.item.sessionClassSubjectId}&sessionClassId=${props.item.sessionClassId}&type=${props.typeQueryParam}`
                        );
                        props.setShowMenuDropdown(false);
                      }}
                      className="dropdown-item"
                      role="button"
                      draggable="false"
                    >
                      <svg
                        width="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="me-2"
                      >
                        <path
                          d="M13.7476 20.4428H21.0002"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.78 3.79479C13.5557 2.86779 14.95 2.73186 15.8962 3.49173C15.9485 3.53296 17.6295 4.83879 17.6295 4.83879C18.669 5.46719 18.992 6.80311 18.3494 7.82259C18.3153 7.87718 8.81195 19.7645 8.81195 19.7645C8.49578 20.1589 8.01583 20.3918 7.50291 20.3973L3.86353 20.443L3.04353 16.9723C2.92866 16.4843 3.04353 15.9718 3.3597 15.5773L12.78 3.79479Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M11.021 6.00098L16.4732 10.1881"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      edit
                    </div>

                    {props.item.status !== "closed" ? (
                      <div
                        onClick={() => {
                          closeHomeAssessment(
                            props.item.homeAssessmentId,
                            props.sessionClassIdQueryParam,
                            props.selectedSessionClassSubjectId,
                            props.groupIdQueryParam
                          )(dispatch);
                          props.setShowMenuDropdown(false);

                        }}
                        className="dropdown-item"
                        role="button"
                        draggable="false"
                      >
                        <svg
                          width="20"
                          clipRule="evenodd"
                          fillRule="evenodd"
                          strokelinejoin="round"
                          strokeMiterlimit="2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m20 20h-15.25c-.414 0-.75.336-.75.75s.336.75.75.75h15.75c.53 0 1-.47 1-1v-15.75c0-.414-.336-.75-.75-.75s-.75.336-.75.75zm-1-17c0-.478-.379-1-1-1h-15c-.62 0-1 .519-1 1v15c0 .621.52 1 1 1h15c.478 0 1-.379 1-1zm-15.5.5h14v14h-14zm7 5.937 2.219-2.22c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.22 2.22 2.222 2.222c.147.147.22.339.22.53 0 .427-.349.751-.75.751-.192 0-.384-.073-.53-.219l-2.223-2.223-2.223 2.223c-.146.146-.338.219-.53.219-.401 0-.75-.324-.75-.751 0-.191.073-.383.22-.53l2.222-2.222-2.22-2.22c-.146-.147-.219-.338-.219-.531 0-.425.346-.75.75-.75.192 0 .385.073.531.219z"
                            fillRule="nonzero"
                          />
                        </svg>{" "}
                        close
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          closeHomeAssessment(
                            props.item.homeAssessmentId,
                            props.sessionClassIdQueryParam,
                            props.selectedSessionClassSubjectId,
                            props.groupIdQueryParam
                          )(dispatch);
                          props.setShowMenuDropdown(false);

                        }}
                        className="dropdown-item"
                        role="button"
                        draggable="false"
                      >
                        <svg width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M17.7366 6.04606C19.4439 7.36388 20.8976 9.29455 21.9415 11.7091C22.0195 11.8924 22.0195 12.1067 21.9415 12.2812C19.8537 17.1103 16.1366 20 12 20H11.9902C7.86341 20 4.14634 17.1103 2.05854 12.2812C1.98049 12.1067 1.98049 11.8924 2.05854 11.7091C4.14634 6.87903 7.86341 4 11.9902 4H12C14.0683 4 16.0293 4.71758 17.7366 6.04606ZM8.09756 12C8.09756 14.1333 9.8439 15.8691 12 15.8691C14.1463 15.8691 15.8927 14.1333 15.8927 12C15.8927 9.85697 14.1463 8.12121 12 8.12121C9.8439 8.12121 8.09756 9.85697 8.09756 12Z" fill="currentColor"></path><path d="M14.4308 11.997C14.4308 13.3255 13.3381 14.4115 12.0015 14.4115C10.6552 14.4115 9.5625 13.3255 9.5625 11.997C9.5625 11.8321 9.58201 11.678 9.61128 11.5228H9.66006C10.743 11.5228 11.621 10.6695 11.6601 9.60184C11.7674 9.58342 11.8845 9.57275 12.0015 9.57275C13.3381 9.57275 14.4308 10.6588 14.4308 11.997Z" fill="currentColor"></path></svg>
                        {" "}
                        open
                      </div>
                    )}

                    <div
                      onClick={() => {
                        props.setHomeAssessmentId(props.item.homeAssessmentId);
                        props.setShowMenuDropdown(false);
                        props.showHideDialog(
                          true,
                          "Are you sure you want to delete this assessment"
                        )(dispatch);
                      }}
                      className="dropdown-item"
                      role="button"
                      draggable="false"
                    >
                      <svg
                        width="20"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="me-2"
                        fill="none"
                      >
                        <path
                          d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M20.708 6.23975H3.75"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                        <path
                          d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      delete
                    </div>

                    <div
                      onClick={() => {
                        history.push(
                          `${classLocations.scoreRecord}?homeAssessmentId=${props.item.homeAssessmentId}&sessionClassId=${props.item.sessionClassId}&sessionClassSubjectId=${props.sessionClassSubjectIdQueryParam}&groupId=${props.groupIdQueryParam}&type=${props.typeQueryParam}`
                        );
                        props.setShowMenuDropdown(false);
                      }}
                      className="dropdown-item"
                      role="button"
                      draggable="false"
                    >
                      <svg
                        width="20"
                        clipRule="evenodd"
                        fillRule="evenodd"
                        fill="currentColor"
                        strokeLinejoin="round"
                        strokeMiterlimit="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="m10.5 17.25c0-.414.336-.75.75-.75h10c.414 0 .75.336.75.75s-.336.75-.75.75h-10c-.414 0-.75-.336-.75-.75zm-1.5-3.55c0-.53-.47-1-1-1h-5c-.53 0-1 .47-1 1v4.3c0 .53.47 1 1 1h5c.53 0 1-.47 1-1zm-5.5.5h4v3.3h-4zm7-2.2c0-.414.336-.75.75-.75h10c.414 0 .75.336.75.75s-.336.75-.75.75h-10c-.414 0-.75-.336-.75-.75zm-1.5-6c0-.53-.47-1-1-1h-5c-.53 0-1 .47-1 1v4.3c0 .53.47 1 1 1h5c.53 0 1-.47 1-1zm-5.5.5h4v3.3h-4zm7 .25c0-.414.336-.75.75-.75h10c.414 0 .75.336.75.75s-.336.75-.75.75h-10c-.414 0-.75-.336-.75-.75z"
                          fillRule="nonzero"
                        />
                      </svg>
                     {" "}score record
                    </div>
                  </div>
                )}
              </div>
            </div>

            <h6 className="mb-3 text-uppercase">{props.item.title}</h6>
            <div className="d-flex justify-content-between">

              <small className="" draggable="false">
                <div className="w-100 d-inline-block">Deadline:</div>
                <div className="text-warning">
                  {props.item.dateDeadLine}{' '}{props.item.timeDeadLine}
                </div>
              </small>

              <small className="" draggable="false">
                <div className="w-100 d-inline-block">Status:</div>
                <div className="badge bg-primary p-1">
                  {props.item.status}
                </div>
              </small>
            </div>
          </Card.Body>
          <small className="d-flex justify-content-around mx-2 p-0 mb-2 mt-n3">
            <div>{props.item.sessionClassGroupName}</div>
            <div className="text-lowercase">
              {props.item.sessionClassSubjectName}
            </div>
          </small>
        </Card>
      </Col>
    </>
  );
}
