import React, { useState } from 'react'
import { Row, Col, OverlayTrigger, Tooltip, Badge, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Card from '../Card'
import {
    deleteStaffAccount,
    fetchSingleItem,
    getAllStaffAccount,
    pushId,
    removeId,
    returnList
} from '../../store/actions/staff-actions';
import { useDispatch, useSelector } from "react-redux";
import { sessionLocations, staffLocations } from "../../router/spm-path-locations";
import { respondToDeleteDialog, showErrorToast, showSingleDeleteDialog } from '../../store/actions/toaster-actions';



const PromotionSetup = () => {
    //VARIABLE DECLARATIONS
    const dispatch = useDispatch();
    const history = useHistory();
    const [showDeleteButton, setDeleteButton] = useState(true);
    const [showCheckBoxes, setShowCheckBoxes] = useState(false);
    const [promoteList, SetPromoteList] = useState([
        { prevclass: 'JSS1', NoPrevClass: '80', passedStudent: '74', failedStudent: '6', promoteNumber: '80' },
        { prevclass: 'JSS2', NoPrevClass: '60', passedStudent: '54', failedStudent: '6', promoteNumber: '60' },
        { prevclass: 'JSS3', NoPrevClass: '40', passedStudent: '34', failedStudent: '6', promoteNumber: '40' },
        { prevclass: 'SSS1', NoPrevClass: '20', passedStudent: '14', failedStudent: '6', promoteNumber: '20' },
        { prevclass: 'SSS2', NoPrevClass: '80', passedStudent: '74', failedStudent: '6', promoteNumber: '80' },
        { prevclass: 'SSS3', NoPrevClass: '60', passedStudent: '54', failedStudent: '6', promoteNumber: '60' }
    ]);
    //VARIABLE DECLARATIONS


    // ACCESSING STATE FROM REDUX STORE
    const state = useSelector((state) => state);
    const { staffList, selectedIds, selectedItem } = state.staff;
    const { deleteDialogResponse } = state.alert;
    // ACCESSING STATE FROM REDUX STORE

    React.useEffect(() => {
        getAllStaffAccount()(dispatch);
    }, []);

    //DELETE HANDLER
    React.useEffect(() => {
        if (deleteDialogResponse === 'continue') {
            if (selectedIds.length === 0) {
                showErrorToast('No Item selected to be deleted')(dispatch);
            } else {
                deleteStaffAccount(selectedIds)(dispatch);
                setDeleteButton(!showDeleteButton)
                setShowCheckBoxes(false);
                respondToDeleteDialog('')(dispatch);
            }
        } else {
            setDeleteButton(true)
            setShowCheckBoxes(false)
            selectedIds.forEach(id => {
                dispatch(removeId(id))
            });
        }
        return () => {
            respondToDeleteDialog('')(dispatch);
        }
    }, [deleteDialogResponse]);
    //DELETE HANDLER

    const checkSingleItem = (isChecked, teacherUserAccountId, stafflists) => {
        stafflists.forEach(item => {
            if (item.teacherUserAccountId === teacherUserAccountId) {
                item.isChecked = isChecked
            }
        });
        if (isChecked) {
            dispatch(pushId(teacherUserAccountId));
        } else {
            dispatch(removeId(teacherUserAccountId));
        }
    }
    const checkAllItems = (isChecked, stafflists) => {
        stafflists.forEach(item => {
            item.isChecked = isChecked
            if (item.isChecked) {
                dispatch(pushId(item.teacherUserAccountId))
            } else {
                dispatch(removeId(item.teacherUserAccountId))
            }
        });
        returnList(stafflists)(dispatch)
    }


    return (
        <>
            <div>
                <Row>
                    <Col sm="12">
                        <Card>
                            <Card.Header className="d-flex justify-content-between">
                                <div className="header-title">
                                    <h4 className="card-title">Promotion Management</h4>
                                </div>
                            </Card.Header>
                            <Card.Body className="px-0">
                                <div className="table-responsive">
                                    <table
                                        id="role-list-table"
                                        className="table table-striped table-bordered"
                                        role="grid"
                                        data-toggle="data-table"

                                    >
                                        <thead className='text-dark'>
                                            <tr className="ligth">
                                                <th>
                                                    {showCheckBoxes ? <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        onChange={(e) => {
                                                            checkAllItems(e.target.checked, staffList);
                                                        }}
                                                    /> : "S/No"}

                                                </th>
                                                <th className='text-center'>Previous Class</th>
                                                <th className='text-center'>Total Student <br /> in prev class</th>
                                                <th className='text-center'>total student with <br />passmark of prev class</th>
                                                <th className='text-center'>total student <br /> that failed</th>
                                                <th className='text-center'>total number <br />to be promoted</th>
                                                <th className='text-center'>next class <br /> to be promote</th>
                                                <th min-width="100px">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {promoteList.map((item, idx) => (
                                                <tr key={idx}>
                                                    <td className="h4">
                                                        {
                                                            idx + 1
                                                        }
                                                    </td>
                                                    <td className='h5 text-center'>{item.prevclass}</td>
                                                    <td className='h4 text-center'>{item.NoPrevClass}</td>
                                                    <td className='h2 text-center'>
                                                        <OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip-2">View Student List</Tooltip>}
                                                        >
                                                            <Link
                                                                className="btn btn-sm btn-icon btn-success h2"
                                                                data-toggle="tooltip"
                                                                data-placement="top"
                                                                title=""
                                                                data-original-title="Details"
                                                                to='#'
                                                                onClick={() => {
                                                                    history.push(sessionLocations.promotionPassedList);
                                                                }}
                                                            >
                                                                <Badge bg="success">{item.passedStudent}</Badge>
                                                            </Link>

                                                        </OverlayTrigger>
                                                    </td>
                                                    <td className='h4 text-center'>
                                                        <OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip-2">View Student List</Tooltip>}
                                                        >
                                                            <Link
                                                                className="btn btn-sm btn-icon btn-danger"
                                                                data-toggle="tooltip"
                                                                data-placement="top"
                                                                title=""
                                                                data-original-title="Details"
                                                                to='#'
                                                                onClick={() => {
                                                                    history.push(sessionLocations.promotionFailedList);
                                                                }}
                                                            >
                                                                <Badge bg="danger">{item.failedStudent}</Badge>
                                                            </Link>
                                                        </OverlayTrigger>
                                                    </td>
                                                    <td className='h4 text-center'>{item.promoteNumber}</td>
                                                    <td className='h5 text-center'>
                                                        <form>
                                                            <Form.Select aria-label="Default select example">
                                                                {promoteList.map((item, idx) => {
                                                                    console.log('item.prevclass', item.prevclass);
                                                                   if(item.prevclass == 'JSS1'){
                                                                       console.log('without jss1');
                                                                       const JSS1 = item.prevclass[0];
                                                                   }else{
                                                                       console.log('without jss1');
                                                                   }
                                                                })}
                                                            </Form.Select>
                                                        </form>
                                                    </td>
                                                    <td>
                                                        <div className="flex align-items-center list-user-action">
                                                            <OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip-2">Promote Student</Tooltip>}
                                                            >
                                                                <Link
                                                                    className="btn btn-sm btn-icon btn-success"
                                                                    data-toggle="tooltip"
                                                                    data-placement="top"
                                                                    title=""
                                                                    data-original-title="Details"
                                                                    to='#'
                                                                >
                                                                    <span className="btn-inner">
                                                                        <svg
                                                                            width="32"
                                                                            viewBox="0 0 24 24"
                                                                            fill="none"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                clipRule="evenodd"
                                                                                d='M9.5 12.5537C12.2546 12.5537 14.4626 10.3171 14.4626 7.52684C14.4626 4.73663 12.2546 2.5 9.5 2.5C6.74543 2.5 4.53737 4.73663 4.53737 7.52684C4.53737 10.3171 6.74543 12.5537 9.5 12.5537ZM9.5 15.0152C5.45422 15.0152 2 15.6621 2 18.2464C2 20.8298 5.4332 21.5 9.5 21.5C13.5448 21.5 17 20.8531 17 18.2687C17 15.6844 13.5668 15.0152 9.5 15.0152ZM19.8979 9.58786H21.101C21.5962 9.58786 22 9.99731 22 10.4995C22 11.0016 21.5962 11.4111 21.101 11.4111H19.8979V12.5884C19.8979 13.0906 19.4952 13.5 18.999 13.5C18.5038 13.5 18.1 13.0906 18.1 12.5884V11.4111H16.899C16.4027 11.4111 16 11.0016 16 10.4995C16 9.99731 16.4027 9.58786 16.899 9.58786H18.1V8.41162C18.1 7.90945 18.5038 7.5 18.999 7.5C19.4952 7.5 19.8979 7.90945 19.8979 8.41162V9.58786Z'
                                                                                stroke="currentColor"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                            ></path>
                                                                            <path
                                                                                d="M11.9946 16V12"
                                                                                stroke="currentColor"
                                                                                strokeWidth="1.5"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                            ></path>
                                                                            <path
                                                                                d="M11.9896 8.2041H11.9996"
                                                                                stroke="currentColor"
                                                                                strokeWidth="2"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                            ></path>
                                                                        </svg>
                                                                    </span>
                                                                </Link>
                                                            </OverlayTrigger>{" "}
                                                        </div>
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

export default PromotionSetup;
