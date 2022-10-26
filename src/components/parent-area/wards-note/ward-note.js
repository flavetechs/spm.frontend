import React, { useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { wardsNoteLocations } from '../../../router/parents-path-locations';

const WardsNote = () => {

  const [studentList, setStudentList] = useState([
    { name: "Kelechi Paschal", RegNo: "ABC/098098/XYZ", studentClass: "JSS1", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ4TkZqylMd-fTMbb3UQFUiac3BxV53dKwIw&usqp=CAU" },
    { name: "Michel Paschal", RegNo: "ABC/888098/XYZ", studentClass: "JSS2", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR72u8YIhgOzopVMdV_WQj0j7Z7zxI-7wZ6GQ&usqp=CAU" },
    { name: "Rose Paschal", RegNo: "ABC/093298/XYZ", studentClass: "JSS3", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX3P1cgEFErruxnQzd99nB0pRPsCSffiUy0A&usqp=CAU" },
    { name: "Andrew Paschal", RegNo: "ABC/091198/XYZ", studentClass: "SS1", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzNp23uU60xK2i-3ISQWMpgT8t8OscQ9emVQ&usqp=CAU" },
  ]);

  return (
    <Row>
      <Card>
        <Card>
          <Card.Body>
            <div className=''>
              <h4>Wards Note</h4>
            </div>
          </Card.Body>
        </Card>
        <Card.Body>
          <Row>
            {studentList?.map((item, index) => (
              <Col key={index}>
                <Card style={{ width: '16rem' }}>
                  <Card.Img variant="top" src={item.photo}
                    style={{ width: "16rem", height: "16rem" }}
                    alt="Student Photo"
                  />
                  <Card.Body >
                    <Card.Title className='bg-light'>{item.name}</Card.Title>
                    <Card.Title>{item.RegNo}</Card.Title>
                    <Card.Title>{item.studentClass}</Card.Title>
                      <Link
                      className='btn btn-primary'
                      to={`${wardsNoteLocations.wardsNotesView}`}
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

export default WardsNote;