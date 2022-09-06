import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setTemplateSettingState } from "../../../store/actions/results-actions";
import { respondDialog, showHideDialog, showHideModal } from "../../../store/actions/toaster-actions";
import { TemplateModal } from "./template-modal";

const TemplateSetting = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { dialogResponse } = state.alert;
  const { templateSetting } = state.results;
  const [imageDisplay, setImageDisplay] = useState("");
  const [templateName, setTemplateName] = useState("");

  const imageData = [
    {
      image:
        "http://flavetech-001-site1.etempurl.com/ProfileImage/0cb16f26-cb41-4c75-99e1-4ed12ac1023d.PNG",
      isChecked: templateSetting == "template-one" ? true : false,
      templateName:"template-one",
    },
    {
      image:
        "http://flavetech-001-site1.etempurl.com/ProfileImage/c3c356a9-2bb3-4132-b43b-a62c210e29c5.PNG",
      isChecked: templateSetting == "template-two" ? true : false,
      templateName:"template-two",
    },
    {
      image:
        "https://templates.iqonic.design/hope-ui/pro/html/file-manager/assets/images/2.png",
      isChecked: templateSetting == "template-three" ? true : false,
      templateName:"template-three",
    },
    {
      image:
        "https://templates.iqonic.design/hope-ui/pro/html/file-manager/assets/images/1.png",
      isChecked: templateSetting == "template-four" ? true : false,
      templateName:"template-four",
    },
    {
      image:
        "https://templates.iqonic.design/hope-ui/pro/html/file-manager/assets/images/6.png",
      isChecked: templateSetting == "template-five" ? true : false,
      templateName:"template-five",
    },
    {
      image:
        "https://templates.iqonic.design/hope-ui/pro/html/file-manager/assets/images/5.png",
      isChecked: templateSetting == "template-six" ? true : false,
      templateName:"template-six",
    },
    {
      image:
        "https://templates.iqonic.design/hope-ui/pro/html/file-manager/assets/images/4.png",
      isChecked: templateSetting == "template-seven" ? true : false,
      templateName:"template-seven",
    },
    {
      image:
        "https://templates.iqonic.design/hope-ui/pro/html/file-manager/assets/images/8.png",
      isChecked: templateSetting == "template-eight" ? true : false,
      templateName:"template-eight",
    },
  ];
  React.useEffect(() => {
    if(!templateName){
    setTemplateName(imageData.find(d=>d.isChecked == true)?.templateName)
    }
  }, [imageData]);

  React.useEffect(() => {
    if (dialogResponse === "continue") {
      setTemplateSettingState(templateName)(dispatch);
      showHideDialog(false, null)(dispatch);
      respondDialog("")(dispatch);
    }
    return () => {
      respondDialog("")(dispatch);
    };
  }, [dialogResponse]);

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
                                onClick={() => {
                                  setTemplateName(data.templateName)
                                  showHideDialog(
                                    true,
                                    "Are you sure you want to choose this as default template"
                                  )(dispatch);
                                }}
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
