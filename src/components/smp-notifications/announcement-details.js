import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const AnnouncementDetails = () => {
  const history = useHistory();
  const announcementData = 
    {
      subject: "Library Book",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egestas eu lacus, libero. Non mollis nunc commodo cursus urna pharetra aliquam. Est mi diam sed ac ut id. Metus gravida enim porta molestie sagittis condimentum interdum risus. Turpis porta erat mauris urna sit dapibus. Auctor nibh sit magna netus vulputate enim vulputate. Purus, tortor lobortis eget fermentum.",
      dateAndTime: "18-08-2007 10:00AM",
      senderName: "Abu Johnson",
    }
  
  return (
    <div className="col-md-8 mx-auto">
      <Row>
        <Col sm="12">
          <Card className="">
            <Card.Body>
                <div className="d-md-flex justify-content-between">
<h6 className="pt-2">{announcementData.senderName}</h6>
<h6 className="pt-2">{announcementData.dateAndTime}</h6>
</div>
<div className="mt-4">
<h4 className="fw-bold">{announcementData.subject}</h4>
<p className="mt-3">{announcementData.body}</p>
</div>
              <div className="d-flex justify-content-end">
                <Button
                  type="button"
                  className="btn-sm mt-4"
                  variant="btn btn-danger"
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  Back
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AnnouncementDetails;
