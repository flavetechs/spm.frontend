
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
export function UserType({ setUserType, selectedUserType }) {

    return (
        <Row>
            <Col md={3} lg={3} sm={3} style={{ marginRight: 3 }}>
                <div className="form-check mb-3 form-Check">
                    <input
                        type="radio"
                        id="teacherId"
                        name="UserType"
                        checked={selectedUserType === 1}
                        onChange={() => setUserType(1)}
                        className="form-check-input"
                    />
                    <label htmlFor="teacherId" className="check-label">
                        Teacher{" "}
                    </label>
                </div>
            </Col>
            <Col md={3} lg={3} sm={3} style={{ marginRight: 3 }}>
                <div className="form-check mb-3 form-Check">
                    <input
                        type="radio"
                        id="studentId"
                        name="UserType"
                        checked={selectedUserType === 0}
                        onChange={() => setUserType(0)}
                        className="form-check-input"
                    />
                    <label htmlFor="studentId" className="check-label">
                        Student{" "}
                    </label>
                </div>
            </Col>
            <Col md={3} lg={3} sm={3} style={{ marginRight: 3 }}>
                <div className="form-check mb-3 form-Check">
                    <input
                        type="radio"
                        id="parentId"
                        name="UserType"
                        checked={selectedUserType === 2}
                        onChange={() => setUserType(2)}
                        className="form-check-input"
                    />
                    <label htmlFor="parentId" className="check-label">
                        Parent{" "}
                    </label>
                </div>
            </Col>

        </Row>
    )

}
