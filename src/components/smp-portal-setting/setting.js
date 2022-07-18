// import { Col, Nav, Row, Tab, Tabs } from 'react-bootstrap';
// import SchoolSetting from './school-setting';


// function Setting() {
//   return (
//     <>
//       <Row className=''>
//         <Col className='col-md-2 p-3 mt-5'>
//           <div className='mb-3'>
//             <h3>Setting</h3>
//           </div>
//           <div className='border-bottom border-top border-start  border-light p-3' style={{ cursor: 'pointer', maxHeight: 90, maxWidth: '100%' }}>
//             <Row>
//               <Col className='col-1 me-2'>
//                 <span>
//                   <svg width="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d='M9.13478 20.7733V17.7156C9.13478 16.9351 9.77217 16.3023 10.5584 16.3023H13.4326C13.8102 16.3023 14.1723 16.4512 14.4393 16.7163C14.7063 16.9813 14.8563 17.3408 14.8563 17.7156V20.7733C14.8539 21.0978 14.9821 21.4099 15.2124 21.6402C15.4427 21.8705 15.7561 22 16.0829 22H18.0438C18.9596 22.0023 19.8388 21.6428 20.4872 21.0008C21.1356 20.3588 21.5 19.487 21.5 18.5778V9.86686C21.5 9.13246 21.1721 8.43584 20.6046 7.96467L13.934 2.67587C12.7737 1.74856 11.1111 1.7785 9.98539 2.74698L3.46701 7.96467C2.87274 8.42195 2.51755 9.12064 2.5 9.86686V18.5689C2.5 20.4639 4.04738 22 5.95617 22H7.87229C8.55123 22 9.103 21.4562 9.10792 20.7822L9.13478 20.7733Z' fill="currentColor"></path></svg>
//                 </span>
//               </Col>
//               <Col>
//                 <span className='text-dark fw-bold'>SCHOOL SETTINGS</span>
//                 <p>General School system setting</p>
//               </Col>
//             </Row>
//           </div>
//           <div className='border-bottom border-start border-light p-3' style={{ cursor: 'pointer', maxHeight: 90, maxWidth: '100%' }}>
//             <Row>
//               <Col className='col-1 me-2'>
//                 <span>
//                   <svg width="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d='M7.33049 2.00049H16.6695C20.0705 2.00049 21.9905 3.92949 22.0005 7.33049V16.6705C22.0005 20.0705 20.0705 22.0005 16.6695 22.0005H7.33049C3.92949 22.0005 2.00049 20.0705 2.00049 16.6705V7.33049C2.00049 3.92949 3.92949 2.00049 7.33049 2.00049ZM12.0495 17.8605C12.4805 17.8605 12.8395 17.5405 12.8795 17.1105V6.92049C12.9195 6.61049 12.7705 6.29949 12.5005 6.13049C12.2195 5.96049 11.8795 5.96049 11.6105 6.13049C11.3395 6.29949 11.1905 6.61049 11.2195 6.92049V17.1105C11.2705 17.5405 11.6295 17.8605 12.0495 17.8605ZM16.6505 17.8605C17.0705 17.8605 17.4295 17.5405 17.4805 17.1105V13.8305C17.5095 13.5095 17.3605 13.2105 17.0895 13.0405C16.8205 12.8705 16.4805 12.8705 16.2005 13.0405C15.9295 13.2105 15.7805 13.5095 15.8205 13.8305V17.1105C15.8605 17.5405 16.2195 17.8605 16.6505 17.8605ZM8.21949 17.1105C8.17949 17.5405 7.82049 17.8605 7.38949 17.8605C6.95949 17.8605 6.59949 17.5405 6.56049 17.1105V10.2005C6.53049 9.88949 6.67949 9.58049 6.95049 9.41049C7.21949 9.24049 7.56049 9.24049 7.83049 9.41049C8.09949 9.58049 8.25049 9.88949 8.21949 10.2005V17.1105Z' fill="currentColor"></path></svg>
//                 </span>
//               </Col>
//               <Col>
//                 <span className='text-dark fw-bold'>RESULT SETTINGS</span>
//                 <p>General School system setting</p>
//               </Col>
//             </Row>
//           </div>
//           <div className='border-bottom border-start border-light p-3' style={{ cursor: 'pointer', maxHeight: 90, maxWidth: '100%' }}>
//             <Row>
//               <Col className='col-1 me-2'>
//                 <span>
//                   <svg width="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d='M18.7071 8.79633C18.7071 10.0523 19.039 10.7925 19.7695 11.6456C20.3231 12.2741 20.5 13.0808 20.5 13.956C20.5 14.8302 20.2128 15.6601 19.6373 16.3339C18.884 17.1417 17.8215 17.6573 16.7372 17.747C15.1659 17.8809 13.5937 17.9937 12.0005 17.9937C10.4063 17.9937 8.83505 17.9263 7.26375 17.747C6.17846 17.6573 5.11602 17.1417 4.36367 16.3339C3.78822 15.6601 3.5 14.8302 3.5 13.956C3.5 13.0808 3.6779 12.2741 4.23049 11.6456C4.98384 10.7925 5.29392 10.0523 5.29392 8.79633V8.3703C5.29392 6.68834 5.71333 5.58852 6.577 4.51186C7.86106 2.9417 9.91935 2 11.9558 2H12.0452C14.1254 2 16.2502 2.98702 17.5125 4.62466C18.3314 5.67916 18.7071 6.73265 18.7071 8.3703V8.79633ZM9.07367 20.0608C9.07367 19.5573 9.53582 19.3266 9.96318 19.2279C10.4631 19.1222 13.5093 19.1222 14.0092 19.2279C14.4366 19.3266 14.8987 19.5573 14.8987 20.0608C14.8738 20.5402 14.5926 20.9653 14.204 21.2352C13.7001 21.628 13.1088 21.8767 12.4906 21.9664C12.1487 22.0107 11.8128 22.0117 11.4828 21.9664C10.8636 21.8767 10.2723 21.628 9.76938 21.2342C9.37978 20.9653 9.09852 20.5402 9.07367 20.0608Z' fill="currentColor"></path></svg>
//                 </span>
//               </Col>
//               <Col>
//                 <span className='text-dark fw-bold'>NOTIFICATION</span>
//                 <p>General School system setting</p>
//               </Col>
//             </Row>
//           </div>
//         </Col>
//         <Col>
//           <SchoolSetting />
//         </Col>
//       </Row>
//     </>
//   );
// }

// export default Setting;
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { getSchoolSettingList } from "../../store/actions/portal-setting-action";
import NotificationSetting from './notification-setting';
import ResultSetting from './result-setting';
import SchoolSetting from './school-setting';
import "./setting.scss";

function Setting() {

  //VARIABLE DECLARATION
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(true);
  //VARIABLE DECLARATION

  //ACCESSING STATE FROM REDUX STORE
  const state = useSelector((state) => state);
  const { isSuccessful, message, schoolSettingList, resultSettingList, notificationSettingList } = state.portal;
  // console.log('schoolSettingList now', schoolSettingList);
  // console.log('schoolSettingList now', resultSettingList);
  // let result = Array.isArray(resultSettingList);
  // console.log('resultSettingList is array', result);
  // ACCESSING STATE FROM REDUX STORE



  return (
    <>
      <Card>
        <Card.Body className=''>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row className='mt-5 gx-3'>
              <Col sm={3} className='col-md-2'>
                <Nav variant="" className="flex-column" >
                  <Nav.Item className='border-bottom border-top border-3'>
                    <Nav.Link eventKey="first" href="#"
                      onClick={() => {
                        setDisable(true)
                      }}
                    >
                      <Row className=" text-dark">
                        <Col className='col-1 me-2'>
                          <svg width="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M9.15722 20.7714V17.7047C9.1572 16.9246 9.79312 16.2908 10.581 16.2856H13.4671C14.2587 16.2856 14.9005 16.9209 14.9005 17.7047V17.7047V20.7809C14.9003 21.4432 15.4343 21.9845 16.103 22H18.0271C19.9451 22 21.5 20.4607 21.5 18.5618V18.5618V9.83784C21.4898 9.09083 21.1355 8.38935 20.538 7.93303L13.9577 2.6853C12.8049 1.77157 11.1662 1.77157 10.0134 2.6853L3.46203 7.94256C2.86226 8.39702 2.50739 9.09967 2.5 9.84736V18.5618C2.5 20.4607 4.05488 22 5.97291 22H7.89696C8.58235 22 9.13797 21.4499 9.13797 20.7714V20.7714"
                              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Col>
                        <Col>
                          <span className='fw-bold'>School Setting</span>
                          <p>Change school setting</p>
                        </Col>
                      </Row>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className='border-bottom border-3'>
                    <Nav.Link eventKey="second" href="#">
                      <Row className=" text-dark">
                        <Col className='col-1 me-2'>
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
                        <Col>
                          <span className='fw-bold'>Result Setting</span>
                          <p>Make changes to result setting</p>
                        </Col>
                      </Row>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className='border-bottom border-3'>
                    <Nav.Link eventKey="third" href="#">
                      <Row className=" text-dark">
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
                          <p>Choose Email notification mode</p>
                        </Col>
                      </Row>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9} className=''>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <SchoolSetting
                      // schoolSettingList={schoolSettingList}
                      setDisable={setDisable}
                      disable={disable}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <ResultSetting
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <NotificationSetting
                    />
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