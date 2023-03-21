import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { parentTimeTableLocations } from "../../../router/parents-path-locations";
import { getMyWardsList } from "../../../store/actions/parent-actions";
import avatars1 from "../../../assets/images/avatars/01.png";
import avatars2 from "../../../assets/images/avatars/avtar_1.png";
import avatars3 from "../../../assets/images/avatars/avtar_2.png";
import avatars4 from "../../../assets/images/avatars/avtar_3.png";
import avatars5 from "../../../assets/images/avatars/avtar_4.png";
import avatars6 from "../../../assets/images/avatars/avtar_5.png";

const ParentExamTimeTable = () => {
  //VARIABLE DECLARATIONS
  const dispatch = useDispatch();
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { myWardList } = state.parent;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    getMyWardsList(1)(dispatch);
  }, []);
  
  return (
    <Row>
      <Card>
        <Card>
          <Card.Body>
            <div className="">
              <h4>Exam Timetable</h4>
            </div>
          </Card.Body>
        </Card>
        <Card.Body>
          <Row>
            {myWardList?.map((item, index) => (
              <Col key={index} className="d-flex justify-content-center">
                <Card style={{ width: "16rem" }}>
                  {item.profileUrl ? (
                    <Card.Img
                      variant="top"
                      src={item.profileUrl}
                      style={{
                        width: "16rem",
                        height: "16rem",
                        objectFit: "contain",
                      }}
                      alt="Student Photo"
                    />
                  ) : (
                    <div>
                      <img
                        style={{ width: "16rem", height: "16rem" }}
                        src={avatars1}
                        alt="User-Profile"
                        className="theme-color-default-img img-fluid avatar avatar-100 avatar-rounded-100"
                      />
                      <img
                        style={{ width: "16rem", height: "16rem" }}
                        src={avatars2}
                        alt="User-Profile"
                        className="theme-color-purple-img img-fluid avatar avatar-100 avatar-rounded-100"
                      />
                      <img
                        style={{ width: "16rem", height: "16rem" }}
                        src={avatars3}
                        alt="User-Profile"
                        className="theme-color-blue-img img-fluid avatar avatar-100 avatar-rounded-100"
                      />
                      <img
                        style={{ width: "16rem", height: "16rem" }}
                        src={avatars5}
                        alt="User-Profile"
                        className="theme-color-green-img img-fluid avatar avatar-100 avatar-rounded-100"
                      />
                      <img
                        style={{ width: "16rem", height: "16rem" }}
                        src={avatars6}
                        alt="User-Profile"
                        className="theme-color-yellow-img img-fluid avatar avatar-100 avatar-rounded-100"
                      />
                      <img
                        style={{ width: "16rem", height: "16rem" }}
                        src={avatars4}
                        alt="User-Profile"
                        className="theme-color-pink-img img-fluid avatar avatar-100 avatar-rounded-100"
                      />{" "}
                    </div>
                  )}

                  <Card.Body>
                    <Card.Title className="bg-light">
                      {item.fullnaName}
                    </Card.Title>
                    <Card.Title>{item.registrationNumber}</Card.Title>
                    <Card.Title>{item.class}</Card.Title>
                    <Link
                      className="btn btn-primary"
                      to={`${parentTimeTableLocations.parentExamTimetableActivities}?classLkId=${item.classLkId}`}
                    >
                      View Exam Timetable
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </Row>
  );
};

export default ParentExamTimeTable;
