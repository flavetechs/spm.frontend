
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import AdmissionSettingsList from './admission-settings-list';
import NotificationSetting from './notification-setting';
import ResultSetting from './result-setting';
import SchoolSetting from './school-setting';
import "./setting.scss";

function Setting() {

  const [selectedSetting, setSelectedSetting] = useState('first')

  return (
    <>
      <Card>
        <Card.Body className=''>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row className='mt-5 gx-1'>
              <Col sm={3} className='col-md-3'>
                <Nav variant="" className="flex-column portal-tab" >
                  <Nav.Item className=''>
                    <Nav.Link eventKey="first" href="#" onClick={() => {
                      setSelectedSetting('first')
                    }}
                    >
                      <Row className="">
                        <Col className='me-2 col-1 col-sm-1 col-md-1'>
                          <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M9.15722 20.7714V17.7047C9.1572 16.9246 9.79312 16.2908 10.581 16.2856H13.4671C14.2587 16.2856 14.9005 16.9209 14.9005 17.7047V17.7047V20.7809C14.9003 21.4432 15.4343 21.9845 16.103 22H18.0271C19.9451 22 21.5 20.4607 21.5 18.5618V18.5618V9.83784C21.4898 9.09083 21.1355 8.38935 20.538 7.93303L13.9577 2.6853C12.8049 1.77157 11.1662 1.77157 10.0134 2.6853L3.46203 7.94256C2.86226 8.39702 2.50739 9.09967 2.5 9.84736V18.5618C2.5 20.4607 4.05488 22 5.97291 22H7.89696C8.58235 22 9.13797 21.4499 9.13797 20.7714V20.7714"
                              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Col>
                        <Col className='text-wrap col-sm-9 col-md-9'>
                          <span className='fw-bold'>School Setting</span>
                          <p>Update school current details</p>
                        </Col>
                      </Row>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className=' text-wrap'>
                    <Nav.Link eventKey="second" href="#" onClick={() => {
                      setSelectedSetting('second')
                    }}
                    >
                      <Row className="">
                        <Col className='col-1 me-2 col-sm-1 col-md-1'>
                          <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.37121 10.2017V17.0618" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round" />
                            <path d="M12.0382 6.91919V17.0619" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round" />
                            <path d="M16.6285 13.8269V17.0619" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round" />
                            <path fillRule="evenodd" clipRule="evenodd"
                              d="M16.6857 2H7.31429C4.04762 2 2 4.31208 2 7.58516V16.4148C2 19.6879 4.0381 22 7.31429 22H16.6857C19.9619 22 22 19.6879 22 16.4148V7.58516C22 4.31208 19.9619 2 16.6857 2Z"
                              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Col>
                        <Col className='col-sm-9 col-md-9'>
                          <span className='fw-bold'>Result Setting  </span>
                          <p>Review school result setting</p>
                        </Col>
                      </Row>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className=''>
                    <Nav.Link eventKey="third" href="#" onClick={() => {
                      setSelectedSetting('third')
                    }}>
                      <Row className="">
                        <Col className='col-1 me-2'>
                          <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                              d="M12 17.8476C17.6392 17.8476 20.2481 17.1242 20.5 14.2205C20.5 11.3188 18.6812 11.5054 18.6812 7.94511C18.6812 5.16414 16.0452 2 12 2C7.95477 2 5.31885 5.16414 5.31885 7.94511C5.31885 11.5054 3.5 11.3188 3.5 14.2205C3.75295 17.1352 6.36177 17.8476 12 17.8476Z"
                              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14.3889 20.8572C13.0247 22.3719 10.8967 22.3899 9.51953 20.8572" stroke="currentColor" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Col>
                        <Col>
                          <span className='fw-bold'>Notification</span>
                          <p>Manage your notification mode</p>
                        </Col>
                      </Row>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className=''>
                    <Nav.Link eventKey="fourth" href="#" onClick={() => {
                      setSelectedSetting('fourth')
                    }}>
                      <Row className="">
                        <Col className='col-1 me-2'>
                          <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                              d="M9.87651 15.2063C6.03251 15.2063 2.74951 15.7873 2.74951 18.1153C2.74951 20.4433 6.01251 21.0453 9.87651 21.0453C13.7215 21.0453 17.0035 20.4633 17.0035 18.1363C17.0035 15.8093 13.7415 15.2063 9.87651 15.2063Z"
                              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path fillRule="evenodd" clipRule="evenodd"
                              d="M9.8766 11.886C12.3996 11.886 14.4446 9.841 14.4446 7.318C14.4446 4.795 12.3996 2.75 9.8766 2.75C7.3546 2.75 5.3096 4.795 5.3096 7.318C5.3006 9.832 7.3306 11.877 9.8456 11.886H9.8766Z"
                              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19.2036 8.66919V12.6792" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round" />
                            <path d="M21.2497 10.6741H17.1597" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                              strokeLinejoin="round" />
                          </svg>
                        </Col>
                        <Col>
                          <span className='fw-bold'>Admission</span>
                          <p>Control school admission patterns</p>
                        </Col>
                      </Row>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9} className=''>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    {selectedSetting === "first" && <SchoolSetting />}
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    {selectedSetting === "second" && <ResultSetting />}
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    {selectedSetting === "third" && <NotificationSetting />}
                  </Tab.Pane>
                  <Tab.Pane eventKey="fourth">
                    {selectedSetting === "fourth" && <AdmissionSettingsList />}
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Card.Body>
      </Card>
    </>
  );
}

export default Setting;