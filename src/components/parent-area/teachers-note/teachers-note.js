import React, { useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap';

const TeachersNote = () => {

  const [studentList, setStudentList] = useState([
    { name: "Kelechi Paschal", RegNo: "ABC/098098/XYZ", studentClass: "JSS1", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ4TkZqylMd-fTMbb3UQFUiac3BxV53dKwIw&usqp=CAU" },
    { name: "Michel Paschal", RegNo: "ABC/888098/XYZ", studentClass: "JSS2", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR72u8YIhgOzopVMdV_WQj0j7Z7zxI-7wZ6GQ&usqp=CAU" },
    { name: "Rose Paschal", RegNo: "ABC/093298/XYZ", studentClass: "JSS3", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX3P1cgEFErruxnQzd99nB0pRPsCSffiUy0A&usqp=CAU" },
    { name: "Andrew Paschal", RegNo: "ABC/091198/XYZ", studentClass: "SS1", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzNp23uU60xK2i-3ISQWMpgT8t8OscQ9emVQ&usqp=CAU" },
  ]);

  return (
    <Row>
      <Card>
        <Card.Header>
          <div className='bg-light'>
            <h4>Teacher Note</h4>
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            {studentList?.map((item, index) => (
              <Col key={item.index}>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={item.photo}
                    style={{ width: "18rem", height: "18rem"}}
                    alt="Student Photo"
                  />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Title>{item.RegNo}</Card.Title>
                    <Card.Title>{item.studentClass}</Card.Title>
                    {/* <Card.Text>
                      Some quick example text to build on the card title and make up the
                      bulk of the card's content.
                    </Card.Text> */}
                    <Button variant="primary">View Student Note</Button>
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