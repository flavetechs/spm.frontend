// import React, { useState } from "react";
// import { Row,Button,Table, OverlayTrigger, Tooltip, Col } from "react-bootstrap";
// import { Formik, Field } from "formik";
// import { useHistory, useLocation } from "react-router-dom";
// import {
//   fetchSingleStudentResultEntries,
//   setAssessmentScore,
//   setExamScore,
//   getAllResultList,
//   setSessionClassIdAndTermId,
// } from "../../../store/actions/publish-actions";
// import { useDispatch, useSelector } from "react-redux";
// import Card from "../../Card";

// const ClassTimeTableJSS1 = () => {
//   //VARIABLE DECLARATIONS
//   const dispatch = useDispatch();
//   const [indexRow, setIndexRow] = useState("");
//   const [isEditMode, setEditMode] = useState(false);
//   const history = useHistory();
//   const locations = useLocation();
//   //VARIABLE DECLARATIONS

//   // ACCESSING STATE FROM REDUX STORE
//   const state = useSelector((state) => state);
//   const {publishSingleStudent, } = state.publish;
//   // ACCESSING STATE FROM REDUX STORE

//   React.useEffect(() => {
//     const queryParams = new URLSearchParams(locations.search);
//     const studentContactId = queryParams.get("studentContactId");
//     const sessionClassId = queryParams.get("sessionClassId");
//     const termId = queryParams.get("termId");

//     if (!studentContactId) return;
//     fetchSingleStudentResultEntries(
//       sessionClassId,
//       termId,
//       studentContactId
//     )(dispatch);
//   }, []);

//   const handleFocus = (event) => event.target.select();

//   const studentSubjectEntriesOption = publishSingleStudent?.studentSubjectEntries == null ? [] : publishSingleStudent.studentSubjectEntries;
//   return (
//     <>
//       <Row className="pt-3">
//         <Col sm="12">
//           <Card>
//             <Card.Header>
//               <h3>Double Click to edit</h3>
//             </Card.Header>
//             <Card.Body>
//               {/* <div>
//                 <PublishResultEditTable
//                   publishSingleStudent={publishSingleStudent}
//                 />
//               </div> */}
//               <div className="d-flex justify-content-end">
//               <Button
//                   type="button"
//                   className="btn-sm mx-2"
//                   variant="btn btn-success"
//                 //   onClick={() => {
//                 //     const queryParams = new URLSearchParams(locations.search);
//                 //     const studentContactId = queryParams.get("studentContactId");
//                 //     const sessionClassId = queryParams.get("sessionClassId");
//                 //     const termId = queryParams.get("termId");
//                 //     fetchSingleStudentResultEntries(
//                 //       sessionClassId,
//                 //       termId,
//                 //       studentContactId
//                 //     )(dispatch);
//                 //   }}
//                 >
//                   Refresh
//                 </Button>
//                 <Button
//                   type="button"
//                   className="btn-sm mx-2"
//                   variant="btn btn-danger"
//                 //   onClick={() => {
//                 //     history.goBack();
//                 //     const queryParams = new URLSearchParams(locations.search);
//                 //     const sessionClassId = queryParams.get("sessionClassId");
//                 //     const termId = queryParams.get("termId");
//                 //     getAllResultList(sessionClassId, termId)(dispatch);
//                 //     setSessionClassIdAndTermId(
//                 //       sessionClassId,
//                 //       termId
//                 //     )(dispatch);
//                 //   }}
//                 >
//                   Back
//                 </Button>
//               </div>

//               <Formik
//                 initialValues={{ examScore: 0, assessmentScore: 0 }}
//                 enableReinitialize={true}
//                 onSubmit={() => {}}
//               >
//                 {({
//                   setFieldValue,
//                 }) => (
//                   <Table size="md" hover bordered responsive className="mt-2">
//                     <thead>
//                       <tr
//                         className="text-center"
//                         style={{ background: "#d8efd1" }}
//                       >
//                         <td className="text-uppercase h6">S/No</td>
//                         <td className="text-uppercase h6 text-start">
//                           Monday
//                         </td>
//                         <td className="text-uppercase h6 text-center">
//                           Tuesday
//                         </td>
//                         <td className="text-uppercase h6">Wednesday</td>
//                         <td className="text-uppercase h6 px-2">Thursday</td>
//                         <td className="text-uppercase h6 px-2">Friday</td>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {studentSubjectEntriesOption.map(
//                         (item, index) => (
//                           <OverlayTrigger
//                             key={index}
//                             placement="top"
//                             overlay={
//                               !isEditMode ? (
//                                 <Tooltip id="button-tooltip-2">
//                                   double click to edit
//                                 </Tooltip>
//                               ) : (
//                                 <Tooltip id="button-tooltip-2">
//                                   double click to close edit
//                                 </Tooltip>
//                               )
//                             }
//                           >
//                             <tr
//                               style={{ maxHeight: "30px" }}
//                               key={index}
//                               className="text-center"
//                             //   onDoubleClick={() => {
//                             //     setEditMode(!isEditMode);
//                             //     setIndexRow(index);
//                             //   }}
//                             >
//                               <td className="fw-bold">{index + 1} 8:00am - 10am </td>
//                               <td className="fw-bold text-start text-uppercase">
//                                 {item.sibjectName} 10:00am - 11am
//                               </td>
//                               <td
//                                 className="fw-bold text-center"
//                                 style={{ maxWidth: "150px" }}
//                               >
//                                 {!isEditMode ? (
//                                   <span className="fw-bold">
//                                     {item.assessmentScore}
//                                   </span>
//                                 ) : indexRow == index ? (
//                                   <Field
//                                     style={{
//                                       maxHeight: "25px",
//                                       maxWidth: "120px",
//                                       height: "25px",
//                                       zIndex: 1000,
//                                     }}
//                                     className="fw-bold"
//                                     type="text"
//                                     name={`${item.subjectId}_assessmentScore`}
//                                     defaultValue={item.assessmentScore}
//                                     onFocus={handleFocus}
//                                     onChange={(e) => {
//                                       setFieldValue(
//                                         `${item.subjectId}_assessmentScore`,
//                                         e.target.value
//                                       );
//                                     }}
//                                     // onBlur={(e) => {
//                                     //   setAssessmentScore(
//                                     //     item.subjectId,
//                                     //     e.target.value,
//                                     //     publishSingleStudent
//                                     //   )(dispatch);
//                                     // }}
//                                   />
//                                 ) : (
//                                   <span className="fw-bold">
//                                     {item.examScore}12:00am - 1pm
//                                   </span>
//                                 )}
//                               </td>
//                               <td
//                                 className="fw-bold text-center"
//                                 style={{ maxWidth: "150px" }}
//                               >
//                                 {!isEditMode ? (
//                                   <span className="fw-bold">
//                                     {item.examScore}1:00pm - 2pm
//                                   </span>
//                                 ) : indexRow == index ? (
//                                   <Field
//                                     style={{
//                                       maxHeight: "25px",
//                                       maxWidth: "120px",
//                                       height: "25px",
//                                       zIndex: 1000,
//                                     }}
//                                     className=" fw-bold "
//                                     type="text"
//                                     name={`${item.subjectId}_examScore`}
//                                     defaultValue={item.examScore}
//                                     onFocus={handleFocus}
//                                     onChange={(e) => {
//                                       setFieldValue(
//                                         `${item.subjectId}_examScore`,
//                                         e.target.value
//                                       );
//                                     }}
//                                     onBlur={(e) => {
//                                       setExamScore(
//                                         item.subjectId,
//                                         e.target.value,
//                                         publishSingleStudent
//                                       )(dispatch);
//                                     }}
//                                   />
//                                 ) : (
//                                   <span className="fw-bold">
//                                     {item.examScore}
//                                   </span>
//                                 )}
//                               </td>
//                               {item.isSaving ? (
//                                 <td style={{ maxWidth: "150px" }}>
//                                   <span style={{ color: "green" }}>
//                                     <svg
//                                       width="20"
//                                       viewBox="0 0 24 24"
//                                       fill="none"
//                                       xmlns="http://www.w3.org/2000/svg"
//                                     >
//                                       <path
//                                         fillRule="evenodd"
//                                         clipRule="evenodd"
//                                         d="M16.3345 2.75024H7.66549C4.64449 2.75024 2.75049 4.88924 2.75049 7.91624V16.0842C2.75049 19.1112 4.63549 21.2502 7.66549 21.2502H16.3335C19.3645 21.2502 21.2505 19.1112 21.2505 16.0842V7.91624C21.2505 4.88924 19.3645 2.75024 16.3345 2.75024Z"
//                                         stroke="currentColor"
//                                         strokeWidth="1.5"
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                       ></path>
//                                       <path
//                                         d="M8.43994 12.0002L10.8139 14.3732L15.5599 9.6272"
//                                         stroke="currentColor"
//                                         strokeWidth="1.5"
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                       ></path>
//                                     </svg>
//                                   </span>
//                                 </td>
//                               ) : (<td style={{ maxWidth: "150px" }} className="text-uppercase">{item.grade}</td>)}
//                               {item.isSaving ? (
//                                 <td style={{ maxWidth: "150px" }}>
//                                   <span style={{ color: "green" }}>
//                                     <svg
//                                       width="20"
//                                       viewBox="0 0 24 24"
//                                       fill="none"
//                                       xmlns="http://www.w3.org/2000/svg"
//                                     >
//                                       <path
//                                         fillRule="evenodd"
//                                         clipRule="evenodd"
//                                         d="M16.3345 2.75024H7.66549C4.64449 2.75024 2.75049 4.88924 2.75049 7.91624V16.0842C2.75049 19.1112 4.63549 21.2502 7.66549 21.2502H16.3335C19.3645 21.2502 21.2505 19.1112 21.2505 16.0842V7.91624C21.2505 4.88924 19.3645 2.75024 16.3345 2.75024Z"
//                                         stroke="currentColor"
//                                         strokeWidth="1.5"
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                       ></path>
//                                       <path
//                                         d="M8.43994 12.0002L10.8139 14.3732L15.5599 9.6272"
//                                         stroke="currentColor"
//                                         strokeWidth="1.5"
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                       ></path>
//                                     </svg>
//                                   </span>
//                                 </td>
//                               ) : (<td style={{ maxWidth: "150px" }} className="text-uppercase">{item.remark}</td>)}
//                             </tr>
//                           </OverlayTrigger>
//                         )
//                       )}
//                     </tbody>
//                   </Table>
//                 )}
//               </Formik>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default ClassTimeTableJSS1;



import React, { useState, useEffect } from 'react'
import { Row, Col, Modal, Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Card from '../../Card'


const ClassTimeTable3 = () => {

    const handleFocus = (event) => event.target.select();
    const [indexRow, setIndexRow] = useState("");
    const [isEditMode, setEditMode] = useState(false);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show1, setShow1] = useState(false);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const [show2, setShow2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);

    let history = useHistory()


    //check
    //     const [status , setStatus] =useState([{
    //         check: <input className="form-check-input" type="checkbox"/>,
    //     },
    //     {
    //         check: <input className="form-check-input" type="checkbox"/>,
    //     },
    //     {
    //         check: <input className="form-check-input" type="checkbox"/>,
    //     }

    // ])

    //permission


    const result = [
        {
            className: "JSS 1",
            classTimeTableId: '4654346-646377-65575-653',
            timeTable: {
                days: [
                    { day: "Monday", classTimeTableDayId: "4654346-646377-65575-653" },
                    { day: "Tuesday", classTimeTableDayId: "3232321-646377-65575-653" }
                ],
                times: [
                    {
                        classTimeTableTimeId: "5265-5546545-3456565",
                        period: "12:30pm - 4:30pm",
                        periodActivties: [
                            { activity: "English", classTimeTableDayId: "4654346-646377-65575-653" },
                            { activity: "Maths", classTimeTableDayId: "4654346-646377-65575-653" },
                            { activity: "Break", classTimeTableDayId: "4654346-646377-65575-653" }
                        ],
                    },
                    {
                        classTimeTableTimeId: "5635-5546545-3456565",
                        period: "2:30pm - 1:30pm",
                        periodActivties: [
                            { activity: "English", classTimeTableDayId: "4654346-646377-65575-653" },
                            { activity: "Maths", classTimeTableDayId: "4654346-646377-65575-653" },
                            { activity: "Break", classTimeTableDayId: "4654346-646377-65575-653" }
                        ]
                    },
                    {
                        classTimeTableTimeId: "2565-5546545-3456565",
                        period: "4:30pm - 1:30pm",
                        periodActivties: [
                            { activity: "English", classTimeTableDayId: "4654346-646377-65575-653" },
                            { activity: "Maths", classTimeTableDayId: "4654346-646377-65575-653" },
                            { activity: "Break", classTimeTableDayId: "4654346-646377-65575-653" }
                        ]
                    },
                    {
                        classTimeTableTimeId: "4565-5546545-3456565",
                        period: "7:30pm - 3:30pm",
                        periodActivties: [
                            { activity: "English", classTimeTableDayId: "4654346-646377-65575-653" },
                            { activity: "Maths", classTimeTableDayId: "4654346-646377-65575-653" },
                            { activity: "Break", classTimeTableDayId: "4654346-646377-65575-653" }
                        ]
                    },
                ],

            },



        },
    ]


    const [permission, setPermission] = useState([{
        name: '8:00am - 9:00am',
        status: false,
        course: 'chemistry',
        course1: 'Physics',
        course2: 'Science'

    },
    {
        name: '10:00am - 11:00am',
        status: true,
        course: 'igbo',
        course1: 'English',
        course2: 'Maths'
    },
    {
        name: '11:30am - 12:00pm',
        course: 'maths',
        course1: 'Agric Sci',
        course2: 'English'

    },
    {
        name: '12:30pm - 1:00pm',
        course: 'agric sci',
        course1: 'Yoruba',
        course2: 'Physics'

    },
    {
        name: '1:30pm - 2:00pm',
        course: 'yoruba',
        course1: 'Agric Sci',
        course2: 'Biology'

    },
    {
        name: '2:30pm - 3:00pm',
        course: 'lit edu',
        course1: 'Science',
        course2: 'Maths',

    }
    ])
    const [name, setName] = useState('')
    const [editname, setEditname] = useState('')
    const [permissionupdateid, setUpdate] = useState('')
    function permissionpush() {

        setPermission([...permission, { name: name }])
        permission.push({
            name: name
        })
    }

    function permissiondeleted(index) {
        permission.splice(index, 1)
    }
    function permissionedit(permissionname, openmodal, permissionid) {

        setShow2(openmodal);
        setEditname(permissionname);
        setUpdate(permissionid);
    }
    function permissionupdate() {
        permission[permissionupdateid].name = name;
    }
    useEffect(
        () => {
            return permission;
        }, [permission, name]
    )


    //role
    const [role, setRole] = useState([
        {
            name: 'Monday',
            status: true
        },
        {
            name: 'Tuesday',
            status: true
        },
        {
            name: 'Wednesday',
            status: false
        }
    ])
    const [roles1, setRoles1] = useState([
        {
            name: 'English',
            status: true
        },
        {
            name: 'Maths',
            status: true
        },
        {
            name: 'Igbo',
            status: false
        }
    ])
    const [name1, setName1] = useState('')
    const [roleeditname, setRolename] = useState('')
    const [roleupdateid, setUpdate1] = useState('')

    function rolepush() {
        setRole([...role, { name: name1 }])
        role.push({
            name: name1
        })
    }

    function roledeleted(index) {
        role.splice(index, 1)
    }
    function roleedit(rolename, openmodal, roleid) {
        setShow3(openmodal);
        setRolename(rolename);
        setUpdate1(roleid);
    }
    function roleupdate() {
        role[roleupdateid].name = name1;
    }
    useEffect(
        () => {
            return role;
        }, [role, name1]
    )
    return (
        <>
            <Row>
                <Col sm="12">
                    <Card>
                        <Card.Header className="d-flex justify-content-between flex-wrap">
                            <div className="header-title">
                                <h4 className="card-title mb-0">JSS 3 Class Timetable</h4>

                            </div>
                            <div>
                                <Button className="text-center btn-primary btn-icon me-2 mt-lg-0 mt-md-0 mt-3" onClick={handleShow}>
                                    <i className="btn-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </i>
                                    <span>Add New Time</span>
                                </Button>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add new Time</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Time</Form.Label>
                                            <Form.Control type="text" onChange={e => setName(e.target.value)} placeholder="Enter Time" />
                                        </Form.Group>
                                        <Button variant="primary" onClick={
                                            () => {
                                                permissionpush()
                                                handleClose()
                                            }
                                        }
                                        >
                                            Save
                                        </Button>{' '}
                                        <Button variant="danger" onClick={handleClose}>
                                            Cancel
                                        </Button>
                                    </Modal.Body>
                                </Modal>
                                <Button className="text-center btn-primary btn-icon mt-lg-0 mt-md-0 mt-3" onClick={handleShow1}>
                                    <i className="btn-inner">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </i>
                                    <span>Add New Day</span>
                                </Button>
                                <Modal show={show1} onHide={handleClose1}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Add new day activity</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Week Day</Form.Label>
                                            <Form.Control type="text" placeholder="Add day" defaultValue={roleedit} onChange={e => setName1(e.target.value)} />
                                        </Form.Group>

                                        <Button variant="primary" onClick={
                                            () => {
                                                rolepush()
                                                handleClose1()
                                            }
                                        }>
                                            Save
                                        </Button>{' '}
                                        <Button variant="danger" onClick={handleClose1}>
                                            Cancel
                                        </Button>
                                    </Modal.Body>
                                </Modal>
                                <Modal show={show2} onHide={handleClose2}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit Subject</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Subject</Form.Label>
                                            <Form.Control type="text" defaultValue={editname} onChange={e => setName(e.target.value)} placeholder="Enter Subject Name" />
                                        </Form.Group>
                                        <div>
                                            <div className="text-start mt-2 me-2">
                                                <Button onClick={
                                                    () => {
                                                        permissionupdate()
                                                        handleClose2()
                                                    }
                                                } >Update</Button>{' '}
                                                <Button variant="danger" onClick={handleClose2} >Cancel</Button>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                </Modal>
                                <Modal show={show3} onHide={handleClose3}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit role</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>role title</Form.Label>
                                            <Form.Control type="text" placeholder="Role Title" defaultValue={roleeditname} onChange={e => setName1(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label >status</Form.Label>
                                        </Form.Group>
                                        <Form.Check>
                                            <Form.Check.Input type="radio" name="customRadio0" id="automatically" defaultChecked />{' '}
                                            <Form.Check.Label htmlFor="automatically" className="pl-2">yes</Form.Check.Label>
                                        </Form.Check>
                                        <Form.Check className="mb-3">
                                            <Form.Check.Input type="radio" name="customRadio0" id="automatically" defaultChecked />{' '}
                                            <Form.Check.Label htmlFor="automatically" className="pl-2">no</Form.Check.Label>
                                        </Form.Check>
                                        <Button variant="primary" onClick={
                                            () => {
                                                roleupdate()
                                                handleClose3()
                                            }
                                        }>
                                            Update
                                        </Button>{' '}
                                        <Button variant="danger" onClick={handleClose3}>
                                            Cancel
                                        </Button>
                                    </Modal.Body>
                                </Modal>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            {
                                                role.map((item, index) =>

                                                (
                                                    <th className="text-center" key={index} >{item.name}
                                                        <div style={{ float: "right" }}>
                                                            <Link className="btn btn-sm btn-icon text-primary flex-end" data-bs-toggle="tooltip" title="Edit User" to="#" onClick={() => { roleedit(item.name, true, index) }}>
                                                                <span className="btn-inner">
                                                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                                        <path d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                        <path d="M15.1655 4.60254L19.7315 9.16854" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                    </svg>
                                                                </span>
                                                            </Link>
                                                            <Link className="btn btn-sm btn-icon text-danger" data-bs-toggle="tooltip" title="Delete User" to="#" onClick={() => { roledeleted(index) }}>
                                                                <span className="btn-inner">
                                                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                                        <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                        <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                        <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                    </svg>
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    </th>
                                                ))
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            permission.map((item, index) =>
                                            (
                                                <tr className="" key={index} >
                                                    <td className="">{item.name}
                                                        <div style={{ float: "right" }}>
                                                            <Link className="btn btn-sm btn-icon text-primary flex-end" data-bs-toggle="tooltip" title="Edit User" to="#" onClick={() => { permissionedit(item.name, true, index) }} >
                                                                <span className="btn-inner">
                                                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                                        <path d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                        <path d="M15.1655 4.60254L19.7315 9.16854" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                    </svg>
                                                                </span>
                                                            </Link>
                                                            <Link className="btn btn-sm btn-icon text-danger " data-bs-toggle="tooltip" title="Delete User" to="#" onClick={() => { permissiondeleted(index) }}  >


                                                                <span className="btn-inner">
                                                                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                                        <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                        <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                        <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                    </svg>
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    {roles1.map((item1, index) => (
                                                        <td className="text-center" key={index} onDoubleClick={handleShow}>
                                                            {/* {item1.status && item.status === true ?
                                                                <input className="form-check-input" type="checkbox" defaultChecked />
                                                                : <input className="form-check-input" type="checkbox" />

                                                            } */}
                                                            <span>{item1.name}</span>
                                                        </td>
                                                    ))}
                                                    {/* <td className="text-center">
                                                            <input className="form-check-input" type="checkbox"/>
                                                        </td>
                                                        <td className="text-center">
                                                            <input className="form-check-input" type="checkbox"/>
                                                        </td> */}
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                {/* <div className="text-center">
                                    <Button onClick={() => history.push('/dashboard/admin/admin')} type="button" variant="primary">Save</Button>
                                </div> */}
                            </div>
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
        </>
    )
}
export default ClassTimeTable3;