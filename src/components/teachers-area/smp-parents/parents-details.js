import { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { studentsLocations } from "../../../router/spm-path-locations";
import {
  getParentsWard,
  getSingleParents,
} from "../../../store/actions/parent-actions";
import "./family-tree.css";

const ParentsDetails = () => {
  //VARIABLE DECLARATIONS
  const history = useHistory();
  const locations = useLocation();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(locations.search);
  const parentId = queryParams.get("parentId");
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { singleParents, myWardList } = state.parent;
  // ACCESSING STATE FROM REDUX STORE

  useEffect(() => {
    if (!parentId) return;
    getSingleParents(parentId)(dispatch);
    getParentsWard(20, 1, parentId)(dispatch);
  }, [parentId]);

  console.log("single", singleParents);
  return (
    <>
      <Card>
        <Row className="">
          <Col md="12">
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title mb-3">
                  <b>Parents List</b>
                </h4>
              </div>
            </Card.Header>

            <Card.Body>
              <div className="tree d-flex justify-content-center ">
                <ul>
                  <li>
                    <div>{singleParents?.name}</div>
                    <ul>
                      {myWardList?.map((ward, idx) => (
                        <li>
                          <a
                            href={`${studentsLocations.studentDetails}?studentAccountId=${ward.studentId}`}
                          >
                            {ward.fullName}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default ParentsDetails;
