import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { showHideModal } from "../../store/actions/toaster-actions";
import { TemplateModal } from "./template-modal";

const TemplateSetting = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [imageDisplay, setImageDisplay] = useState("");
  const imageData = [
    {
      image:
        "https://templates.iqonic.design/hope-ui/pro/html/file-manager/assets/images/8.png",
      isChecked: true,
    },
    {
      image:
        "https://templates.iqonic.design/hope-ui/pro/html/file-manager/assets/images/7.png",
      isChecked: false,
    },
    {
      image:
        "https://templates.iqonic.design/hope-ui/pro/html/file-manager/assets/images/2.png",
      isChecked: false,
    },
    {
      image:
        "https://templates.iqonic.design/hope-ui/pro/html/file-manager/assets/images/1.png",
      isChecked: false,
    },
    {
      image:
        "https://templates.iqonic.design/hope-ui/pro/html/file-manager/assets/images/6.png",
      isChecked: false,
    },
    {
      image:
        "https://templates.iqonic.design/hope-ui/pro/html/file-manager/assets/images/5.png",
      isChecked: false,
    },
    {
      image:
        "https://templates.iqonic.design/hope-ui/pro/html/file-manager/assets/images/4.png",
      isChecked: false,
    },
    {
      image:
        "https://templates.iqonic.design/hope-ui/pro/html/file-manager/assets/images/8.png",
      isChecked: false,
    },
  ];
  return (
    <>
      <div className="col-md-12 mx-auto">
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header>
                <h4>CHOOSE TEMPLATE</h4>
              </Card.Header>
              <TemplateModal>
                <img src={imageDisplay} alt="display" />
              </TemplateModal>
              <Card.Body>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                  {imageData.map((data, idx) => (
                    <div className="col">
                      <div className="card iq-file-manager">
                        <div className="card-body card-thumbnail">
                          <img
                            src={data.image}
                            className="img-fluid"
                            alt="8.png"
                            loading="lazy"
                            onClick={() => {
                              showHideModal(true)(dispatch);
                              setImageDisplay(data.image);
                            }}
                          />
                          <div className="mt-3">
                            <div className="d-flex align-items-center mb-2 text-primary gap-2">
                              <input
                                type="radio"
                                name="radioButton"
                                defaultChecked={data.isChecked}
                                onChange={()=>{}}
                              />
                              <p className=" mb-0 text-dark">Select Template</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default TemplateSetting;
