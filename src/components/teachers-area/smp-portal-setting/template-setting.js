import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getResultSetting, updateSelectedResultTemplate } from "../../../store/actions/portal-setting-action";
import { setTemplateSettingState } from "../../../store/actions/results-actions";
import { respondDialog, showHideDialog, showHideModal } from "../../../store/actions/toaster-actions";
import { TemplateModal } from "./template-modal";

const TemplateSetting = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { dialogResponse,showModal } = state.alert;
  const { selectedTemplate } = state.portal;
  const [imageDisplay, setImageDisplay] = useState("");
  const [templateName, setTemplateName] = useState("");

  const imageData = [
    {
      image:
        "http://fwsapi.flaveconsole.com/ApplicationFiles/cba44e23-2f01-4ac9-bd1a-cfe7c8eefdbf.PNG",
      isChecked: selectedTemplate === "template-one" ? true : false,
      templateName:"template-one",
    },
    {
      image:
        "http://fwsapi.flaveconsole.com/ApplicationFiles/e6615cd3-cba2-46cf-98b6-bef9bc243244.PNG",
      isChecked: selectedTemplate === "template-two" ? true : false,
      templateName:"template-two",
    },
  
  ];
  useEffect(() => {
    showHideModal(false)(dispatch);
    getResultSetting()(dispatch);
  }, [])

  useEffect(() => {
    if (!templateName) {
      setTemplateName(imageData.find(d => d.isChecked === true)?.templateName)
    }
  }, [imageData, dispatch]);

  useEffect(() => {
    if (dialogResponse === "continue") {
      updateSelectedResultTemplate(templateName)(dispatch);
      setTemplateSettingState(templateName)(dispatch);
      showHideDialog(false, null)(dispatch);
      respondDialog("")(dispatch);
    }
    return () => {
      respondDialog("")(dispatch);
      showHideDialog(false, null)(dispatch);
    };
  }, [dialogResponse, dispatch]);

 
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
                <img  className="img-fluid" src={imageDisplay} alt="display" />
              </TemplateModal>
              <Card.Body>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                  {imageData.map((data, idx) => (
                    <div key={idx} className="col">
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
                                checked={data.isChecked || false}
                                onClick={() => {
                                  setTemplateName(data.templateName)
                                  showHideDialog(
                                    true,
                                    "Are you sure you want to choose this as default template"
                                  )(dispatch);
                                }}
                              />
                              <p className=" mb-0 h6">Select Template</p>
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
