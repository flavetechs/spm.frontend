import React, { useState } from "react";
import { Row, Col, Button, Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Card from "../../Card";
import { useDispatch, useSelector } from "react-redux";
import { getPublishedList } from "../../../store/actions/publish-actions";

const PublishedClassList = () => {
    //VARIABLE DECLARATIONS
    const history = useHistory();
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    //VARIABLE DECLARATIONS

    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { publishedList } = state.publish;
    // ACCESSING STATE FROM REDUX STORE

    const filteredPublishedList = publishedList.filter((item) => {
        if (searchQuery === "") {
            //if query is empty
            return item;
        } else if (item.status.toLowerCase().includes(searchQuery.toLowerCase())) {
            //returns filtered array
            return item;
        }
    });
    
    React.useEffect(() => {
        getPublishedList()(dispatch);
    }, [dispatch]);

    return (
        <>
            <div>
                <Row>
                    <Col sm="12">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title mb-3">
                                        <b>Published Classes</b>
                                    </h4>
                                </div>
                            </Card.Header>
                            <div className="d-md-flex justify-content-between">
                                <div className="input-group">
                                    <span
                                        className="input-group-text border-0"
                                        id="search-input"
                                    >
                                        <svg
                                            width="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle
                                                cx="11.7669"
                                                cy="11.7666"
                                                r="8.98856"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></circle>
                                            <path
                                                d="M18.0186 18.4851L21.5426 22"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>
                                        </svg>
                                    </span>
                                    <div>
                                        <input
                                            type="search"
                                            className="form-control text-lowercase"
                                            placeholder="Search..."
                                            onChange={(event) => setSearchQuery(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="me-3">
                                    <Button
                                        type="button"
                                        className="btn-sm"
                                        variant="btn btn-danger"
                                        onClick={() => {
                                            history.goBack();
                                        }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </div>
                            <Card.Body className="px-0">
                                <div className="table-responsive">
                                    <table
                                        id="role-list-table"
                                        className="table table-striped"
                                        role="grid"
                                        data-toggle="data-table"
                                    >
                                        <thead>
                                            <tr className="ligth">
                                                <th>
                                                    S/NO.
                                                </th>
                                                <th>
                                                    <b>Class</b>
                                                </th>
                                                <th>
                                                    <b>Status</b>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredPublishedList.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td className="text-dark">
                                                        {idx + 1}
                                                    </td>
                                                    <td className="text-uppercase">
                                                        <b>{item.sessionClass}</b>
                                                    </td>
                                                    <td className="">
                                                        {item.status === "published" ? <Badge bg="success">Published</Badge> :
                                                            <Badge bg="danger">Unpublished</Badge>
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default PublishedClassList;
