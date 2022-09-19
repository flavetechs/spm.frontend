import { Card, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory, useLocation  } from "react-router-dom";
import { classLocations } from "../../../../router/spm-path-locations";
import { showErrorToast } from "../../../../store/actions/toaster-actions";
export function ClassAssessmentList(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const locations = useLocation();
    const queryParams = new URLSearchParams(locations.search);
    // const sessionClassIdQueryParam = queryParams.get("sessionClassId") || '';
    // const sessionClassSubjectIdQueryParam = queryParams.get("sessionClassSubjectId") || '';
    const typeQueryParam = queryParams.get("type") || '';

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
                                            <circle
                                                cx="7"
                                                cy="12"
                                                r="1"
                                                fill="black"
                                            ></circle>
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="1"
                                                fill="black"
                                            ></circle>
                                            <circle
                                                cx="17"
                                                cy="12"
                                                r="1"
                                                fill="black"
                                            ></circle>
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
                                                if (!props.typeQueryParam) {
                                                    showErrorToast("Assessment Type is required")(dispatch);
                                                    return;
                                                  }
                                                  if (!props.sessionClassIdQueryParam) {
                                                    showErrorToast("Class is required")(dispatch);
                                                    return;
                                                  }
                                                 else{
                                                history.push(
                                                    `${classLocations.editClassAssessment}?classAssessmentId=${props.item.classAssessmentId}&sessionClassSubjectId=${props.item.sessionClassSubjectId}&sessionClassId=${props.item.sessionClassId}&type=${typeQueryParam}`
                                                );
                                                  }
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
                                            view/edit
                                        </div>

                                        <div
                                            onClick={() => {
                                                props.setClassAssessmentId(
                                                    props.item.classAssessmentId
                                                );

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
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="me-2"
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
                                    </div>
                                )}
                            </div>
                        </div>

                        <h6 className="mb-3 text-uppercase">
                            {props.item.title}
                        </h6>
                      
                    </Card.Body>
                    <small className="d-flex justify-content-around mx-2 p-0 mb-2 mt-n3">
                        <div>{props.item.status}</div>
                        <div>{props.item.sessionClassGroupName}</div>
                        <div className="text-lowercase">
                            {props.item.sessionClassSubjectName}
                        </div>
                    </small>
                </Card>
            </Col>
        </>
    )
}