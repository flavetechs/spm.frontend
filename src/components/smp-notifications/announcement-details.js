import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const AnnouncementDetails = () => {
  const history = useHistory();
  const announcementData = {
    subject: "Library Book",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla egestas eu lacus, libero. Non mollis nunc commodo cursus urna pharetra aliquam. Est mi diam sed ac ut id. Metus gravida enim porta molestie sagittis condimentum interdum risus. Turpis porta erat mauris urna sit dapibus. Auctor nibh sit magna netus vulputate enim vulputate. Purus, tortor lobortis eget fermentum.",
    dateAndTime: "18-08-2007 10:00AM",
    senderName: "Abu Johnson",
  };

  return (
    <div className="col-md-8 mx-auto">
      <Row>
        <Col sm="12">
          <Card className="">
            <Card.Body>
              <div className="d-flex justify-content-between mt-3 flex-wrap">
                <div>
                  <h6>{announcementData.senderName}</h6>
                </div>
                <div className="text-end text-primary">
                  {announcementData.dateAndTime}
                </div>
              </div>
              <div className="d-flex justify-content-start mt-4">
                <div>
                  <button
                    type="button"
                    className="btn btn-soft-secondary btn-icon rounded-circle avatar-50 d-flex align-items-center justify-content-center"
                  >
                    <span>
                      <svg
                        className="icon-24"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M11.949 14.5399C8.49903 14.5399 5.58807 15.1037 5.58807 17.2794C5.58807 19.4561 8.51783 20 11.949 20C15.399 20 18.31 19.4362 18.31 17.2605C18.31 15.0839 15.3802 14.5399 11.949 14.5399Z"
                          fill="currentColor"
                        ></path>
                        <path
                          opacity="0.4"
                          d="M11.949 12.467C14.2851 12.467 16.1583 10.5831 16.1583 8.23351C16.1583 5.88306 14.2851 4 11.949 4C9.61293 4 7.73975 5.88306 7.73975 8.23351C7.73975 10.5831 9.61293 12.467 11.949 12.467Z"
                          fill="currentColor"
                        ></path>
                        <path
                          opacity="0.4"
                          d="M21.0879 9.21926C21.6923 6.84179 19.9203 4.70657 17.6639 4.70657C17.4186 4.70657 17.184 4.73359 16.9548 4.77952C16.9243 4.78672 16.8903 4.80203 16.8724 4.82905C16.8518 4.86327 16.867 4.9092 16.8894 4.93892C17.5672 5.89531 17.9567 7.05973 17.9567 8.3097C17.9567 9.50744 17.5995 10.6241 16.9727 11.5508C16.9082 11.6463 16.9655 11.775 17.0792 11.7949C17.2368 11.8228 17.398 11.8372 17.5627 11.8417C19.2058 11.8849 20.6805 10.8213 21.0879 9.21926Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M22.8093 14.8169C22.5084 14.1721 21.7823 13.73 20.6782 13.5129C20.1571 13.385 18.7468 13.2049 17.4351 13.2292C17.4154 13.2319 17.4046 13.2455 17.4028 13.2545C17.4002 13.2671 17.4055 13.2887 17.4315 13.3022C18.0377 13.6039 20.381 14.916 20.0864 17.6834C20.0738 17.8032 20.1696 17.9067 20.2887 17.8887C20.8654 17.8059 22.349 17.4853 22.8093 16.4866C23.0636 15.9588 23.0636 15.3456 22.8093 14.8169Z"
                          fill="currentColor"
                        ></path>
                        <path
                          opacity="0.4"
                          d="M7.04483 4.77979C6.8165 4.73296 6.58101 4.70685 6.33567 4.70685C4.07926 4.70685 2.30726 6.84207 2.91255 9.21953C3.31906 10.8216 4.79379 11.8852 6.43685 11.842C6.60161 11.8375 6.76368 11.8221 6.92037 11.7951C7.03409 11.7753 7.09139 11.6465 7.02692 11.5511C6.40014 10.6235 6.04288 9.50771 6.04288 8.30997C6.04288 7.0591 6.43327 5.89468 7.11109 4.93919C7.13258 4.90947 7.1487 4.86354 7.12721 4.82932C7.1093 4.80141 7.07617 4.787 7.04483 4.77979Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M3.32156 13.5127C2.21752 13.7297 1.49225 14.1719 1.19139 14.8167C0.936203 15.3453 0.936203 15.9586 1.19139 16.4872C1.65163 17.485 3.13531 17.8065 3.71195 17.8885C3.83104 17.9065 3.92595 17.8038 3.91342 17.6831C3.61883 14.9166 5.9621 13.6045 6.56918 13.3028C6.59425 13.2884 6.59962 13.2677 6.59694 13.2542C6.59515 13.2452 6.5853 13.2317 6.5656 13.2299C5.25294 13.2047 3.84358 13.3848 3.32156 13.5127Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
                <div className="ms-2 mt-2 fw-bold">
                  <span>{announcementData.subject}</span>
                  <br />
                </div>
              </div>
              <div>
                <p className="my-4">{announcementData.body}</p>
              </div>
              <hr />

              <div className="mt-5 mt-sm-0 d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-primary btn-md me-2"
                  onClick={() => {
                    history.goBack();
                  }}
                >
                  <svg
                    className="icon-24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9.35028 4.34498L2.14451 11.6129C2.06531 11.6927 2.06754 11.8222 2.14945 11.8993L9.35522 18.6827C9.48285 18.8028 9.69231 18.7123 9.69231 18.537V14.3448H13.7949C17.795 14.3448 21.2577 18.3928 22.229 19.6392C22.2948 19.7236 22.433 19.6659 22.4101 19.5613C21.9529 17.4746 19.6729 8.65517 13.7949 8.65517H9.69231V4.48579C9.69231 4.30719 9.47602 4.21815 9.35028 4.34498Z"
                      stroke="white"
                    ></path>
                  </svg>{" "}
                  Back
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AnnouncementDetails;
