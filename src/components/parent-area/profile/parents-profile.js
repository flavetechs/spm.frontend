import { useEffect } from "react";
import {
  Badge,
  Card,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  getParentsWard,
  getSingleParents,
} from "../../../store/actions/parent-actions";

const ParentsProfile = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const dispatch = useDispatch();
  const parentId = localStorage.getItem("parentId");
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { singleParent, myWardList } = state.parent;
  // ACCESSING STATE FROM REDUX STORE

  useEffect(() => {
    if (!parentId) return;
    getSingleParents(parentId)(dispatch);
    getParentsWard(20, 1, parentId)(dispatch);
  }, [parentId]);

  console.log("my ward list",myWardList);
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            {" "}
            <div className="mt-3 mx-4">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="button-tooltip-2"> back</Tooltip>}
              >
                <svg
                  onClick={() => {
                    history.goBack();
                  }}
                  style={{ cursor: "pointer" }}
                  className=" text-primary"
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
            </div>
            <div className="card-header d-flex justify-content-between d-flex justify-content-between"></div>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title mb-3">
                  <b>Profile Details</b>
                </h4>
              </div>
            </Card.Header>
            <Card.Body>
              {" "}
              <div className="new-user-info">
                <div className="row">
                  <div className="col-md-6 form-group">
                    <p className="">
                      <span>
                        <svg
                          width="25"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.997 15.1746C7.684 15.1746 4 15.8546 4 18.5746C4 21.2956 7.661 21.9996 11.997 21.9996C16.31 21.9996 19.994 21.3206 19.994 18.5996C19.994 15.8786 16.334 15.1746 11.997 15.1746Z"
                            fill="currentColor"
                          />
                          <path
                            opacity="0.4"
                            d="M11.9971 12.5838C14.9351 12.5838 17.2891 10.2288 17.2891 7.29176C17.2891 4.35476 14.9351 1.99976 11.9971 1.99976C9.06008 1.99976 6.70508 4.35476 6.70508 7.29176C6.70508 10.2288 9.06008 12.5838 11.9971 12.5838Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>{" "}
                      <span>Name:</span>{" "}
                      <span className="h6 text-capitalize">
                        {singleParent?.name}
                      </span>
                    </p>
                  </div>

                  <div className="col-md-6 form-group">
                    <p className="">
                      <span>
                        <svg
                          width="25"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.4"
                            d="M22 15.94C22 18.73 19.76 20.99 16.97 21H16.96H7.05C4.27 21 2 18.75 2 15.96V15.95C2 15.95 2.006 11.524 2.014 9.298C2.015 8.88 2.495 8.646 2.822 8.906C5.198 10.791 9.447 14.228 9.5 14.273C10.21 14.842 11.11 15.163 12.03 15.163C12.95 15.163 13.85 14.842 14.56 14.262C14.613 14.227 18.767 10.893 21.179 8.977C21.507 8.716 21.989 8.95 21.99 9.367C22 11.576 22 15.94 22 15.94Z"
                            fill="currentColor"
                          />
                          <path
                            d="M21.4759 5.67351C20.6099 4.04151 18.9059 2.99951 17.0299 2.99951H7.04988C5.17388 2.99951 3.46988 4.04151 2.60388 5.67351C2.40988 6.03851 2.50188 6.49351 2.82488 6.75151L10.2499 12.6905C10.7699 13.1105 11.3999 13.3195 12.0299 13.3195C12.0339 13.3195 12.0369 13.3195 12.0399 13.3195C12.0429 13.3195 12.0469 13.3195 12.0499 13.3195C12.6799 13.3195 13.3099 13.1105 13.8299 12.6905L21.2549 6.75151C21.5779 6.49351 21.6699 6.03851 21.4759 5.67351Z"
                            fill="currentColor"
                          />
                        </svg>{" "}
                      </span>
                      <span>Email Address:</span>{" "}
                      <span className="h6">{singleParent?.email}</span>
                    </p>
                  </div>
                  <div className="col-md-6  form-group">
                    <p className="">
                      <span>
                        <svg
                          width="25"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.4"
                            d="M11.7761 21.8374C9.49311 20.4273 7.37081 18.7645 5.44807 16.8796C4.09069 15.5338 3.05404 13.8905 2.41735 12.0753C1.27971 8.53523 2.60399 4.48948 6.30129 3.2884C8.2528 2.67553 10.3752 3.05175 12.0072 4.29983C13.6398 3.05315 15.7616 2.67705 17.7132 3.2884C21.4105 4.48948 22.7436 8.53523 21.606 12.0753C20.9745 13.8888 19.944 15.5319 18.5931 16.8796C16.6686 18.7625 14.5465 20.4251 12.265 21.8374L12.0161 22L11.7761 21.8374Z"
                            fill="currentColor"
                          />
                          <path
                            d="M12.0109 22.0001L11.776 21.8375C9.49013 20.4275 7.36487 18.7648 5.43902 16.8797C4.0752 15.5357 3.03238 13.8923 2.39052 12.0754C1.26177 8.53532 2.58605 4.48957 6.28335 3.28849C8.23486 2.67562 10.3853 3.05213 12.0109 4.31067V22.0001Z"
                            fill="currentColor"
                          />
                          <path
                            d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>{" "}
                      <span>Relationship:</span>{" "}
                      <span className="h6 text-capitalize">
                        {" "}
                        {singleParent?.relationship}
                      </span>
                    </p>
                  </div>

                  <div className="col-sm-6 form-group">
                    <p className="">
                      <span>
                        <svg
                          width="25"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.4"
                            d="M14.4183 5.49C13.9422 5.40206 13.505 5.70586 13.4144 6.17054C13.3238 6.63522 13.6285 7.08891 14.0916 7.17984C15.4859 7.45166 16.5624 8.53092 16.8353 9.92995V9.93095C16.913 10.3337 17.2675 10.6265 17.6759 10.6265C17.7306 10.6265 17.7854 10.6215 17.8412 10.6115C18.3043 10.5186 18.609 10.0659 18.5184 9.60018C18.1111 7.51062 16.5027 5.89672 14.4183 5.49Z"
                            fill="currentColor"
                          />
                          <path
                            opacity="0.4"
                            d="M14.3558 2.00793C14.1328 1.97595 13.9087 2.04191 13.7304 2.18381C13.5472 2.32771 13.4326 2.53557 13.4078 2.76841C13.355 3.23908 13.6946 3.66479 14.1646 3.71776C17.4063 4.07951 19.9259 6.60477 20.2904 9.85654C20.3392 10.2922 20.7047 10.621 21.1409 10.621C21.1738 10.621 21.2057 10.619 21.2385 10.615C21.4666 10.59 21.6698 10.4771 21.8132 10.2972C21.9556 10.1174 22.0203 9.89351 21.9944 9.66467C21.5403 5.60746 18.4002 2.45862 14.3558 2.00793Z"
                            fill="currentColor"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M11.0317 12.9724C15.0208 16.9604 15.9258 12.3467 18.4656 14.8848C20.9143 17.3328 22.3216 17.8232 19.2192 20.9247C18.8306 21.237 16.3616 24.9943 7.6846 16.3197C-0.993478 7.644 2.76158 5.17244 3.07397 4.78395C6.18387 1.67385 6.66586 3.08938 9.11449 5.53733C11.6544 8.0765 7.04266 8.98441 11.0317 12.9724Z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>{" "}
                      <span>Phone:</span>{" "}
                      <span className="h6"> {singleParent?.number}</span>
                    </p>
                  </div>
                </div>
              </div>{" "}
            </Card.Body>{" "}
          </Card>
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title mb-3">
                  <b>Ward(s)</b>
                </h4>
              </div>
            </Card.Header>

            <Card.Body>
              <div>
                <Table size="sm" responsive bordered className="">
                  <thead>
                    <tr >
                    <th className="h6">Name</th>
                    <th className="h6">Registration Number</th>
                    <th className="h6">Class</th>
                    <th className="h6">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myWardList?.map((ward, idx) => (
                      <tr className="" key={idx}>
                        <td className="px-3 fw-bold h6 text-capitalize">{ward.fullName}</td>
                        <td className="px-3 fw-bold h6">{ward.registrationNumber}</td>
                        <td className="px-3 fw-bold h6">{ward.class}</td>
                        <td className="px-3 fw-bold h6"><Badge bg={"success"}>{ward.enrollmentStatus}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
               
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card>
        <Row className="">
          <Col md="12"></Col>
        </Row>
      </Card>
    </Container>
  );
};

export default ParentsProfile;
