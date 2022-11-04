import React, { useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { teachersNoteLocations } from '../../../router/parents-path-locations';
import { getMyWardsList } from '../../../store/actions/parent-actions';

const TeachersNote = () => {

  const [studentList, setStudentList] = useState([
    { name: "Kelechi Paschal", RegNo: "ABC/098098/XYZ", studentClass: "JSS1", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ4TkZqylMd-fTMbb3UQFUiac3BxV53dKwIw&usqp=CAU" },
    { name: "Michel Paschal", RegNo: "ABC/888098/XYZ", studentClass: "JSS2", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR72u8YIhgOzopVMdV_WQj0j7Z7zxI-7wZ6GQ&usqp=CAU" },
    { name: "Rose Paschal", RegNo: "ABC/093298/XYZ", studentClass: "JSS3", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX3P1cgEFErruxnQzd99nB0pRPsCSffiUy0A&usqp=CAU" },
    { name: "Andrew Paschal", RegNo: "ABC/091198/XYZ", studentClass: "SS1", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzNp23uU60xK2i-3ISQWMpgT8t8OscQ9emVQ&usqp=CAU" },
  ]);

  //VARIABLE DECLARATIONS
  let history = useHistory();
  const dispatch = useDispatch();
  //VARIABLE DECLARATIONS

  // ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { myWardList, filterProps } = state.parent;
  // ACCESSING STATE FROM REDUX STORE

  React.useEffect(() => {
    getMyWardsList(1)(dispatch);
  }, [dispatch]);

  return (
    <Row>
      <Card>
        <Card>
          <Card.Body>
            <div className=''>
              <h4>Teacher's Note</h4>
            </div>
          </Card.Body>
        </Card>
        <Card.Body>
          <Row>
            {myWardList?.map((item, index) => (
              <Col key={index}>
                <Card style={{ width: '16rem' }}>
                  <Card.Img variant="top" src={item.photo}
                    style={{ width: "16rem", height: "16rem" }}
                    alt="Student Photo"
                  />
                  <Card.Body >
                    <Card.Title className='bg-light'>{item.fullnaName}</Card.Title>
                    <Card.Title>{item.registrationNumber}</Card.Title>
                    <Card.Title>{item.class}</Card.Title>
                    <Link
                      className='btn btn-primary'
                      to={`${teachersNoteLocations.teachersNotesView}?classId=${item.classId}`}

                    >
                      View Student Note
                    </Link>

                    {/* </Button> */}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>
    </Row>
  )
}

export default TeachersNote;