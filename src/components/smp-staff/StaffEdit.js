import React, {useState} from 'react'
import { Row, Col, Image, Form, Button } from 'react-bootstrap'
// import Card from '../../../components/Card'
import Card from '../Card'
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
// img
import avatars1 from '../../assets/images/avatars/01.png'
import avatars2 from '../../assets/images/avatars/avtar_2.png'
import avatars3 from '../../assets/images/avatars/avtar_2.png'
import avatars4 from '../../assets/images/avatars/avtar_3.png'
import avatars5 from '../../assets/images/avatars/avtar_4.png'
import avatars6 from '../../assets/images/avatars/avtar_5.png'
import { staffLocations } from '../../router/spm-path-locations'
import { fetchSingleStaff, updateStaffAccount } from '../../store/actions/staff-actions';

const StaffEdit = () => {


   //VARIABLE DECLARATIONS
   const history = useHistory();
   const dispatch = useDispatch();
   const locations = useLocation();
   const [images, setImages] = useState([])
   const [imageURLs, setImageURLs] = useState([])
   //VARIABLE DECLARATIONS

   //VALIDATIONS SCHEMA
   const validation = Yup.object().shape({
      firstName: Yup.string()
         .required('First Name is required')
         .min(2, 'Name Too Short!'),
      lastName: Yup.string()
         .required('Last Name is required')
         .min(2, 'Name Too Short!'),
      email: Yup.string().required("Please Enter Email")
         .email('Must be a valid email'),
      phone: Yup.string().required("Please enter phone Number"),
      dob: Yup.string().required("Please enter date of birth"),
   });
   //VALIDATIONS SCHEMA



   // ACCESSING STATE FROM REDUX STORE
   const state = useSelector((state) => state);
   const { isSuccessful, message, selectedItem } = state.staff;
   console.log("selecteditem", selectedItem);
   // ACCESSING STATE FROM REDUX STORE

   React.useEffect(() => {
      const queryParams = new URLSearchParams(locations.search);
      const teacherAccountId = queryParams.get("teacherAccountId");
      if (!teacherAccountId) return;
      fetchSingleStaff(teacherAccountId)(dispatch)
   }, []);


   if (isSuccessful) {
      history.push(staffLocations.staffList);
   }

   React.useEffect(() => {
      if(images.length < 1) return;
      const newImageUrls = [];
      images.forEach(image => newImageUrls.push(URL.createObjectURL(image)));
      setImageURLs(newImageUrls)
   }, [images])

   function onImageChanges(e) {
      setImages([...e.target.files])
   }

   return (
      <>
         <div>
            <Formik
               enableReinitialize={true}
               initialValues={{
                  firstName: selectedItem?.firstName,
                  lastName: selectedItem?.lastName,
                  middleName: selectedItem?.middleName,
                  email: selectedItem?.email,
                  phone: selectedItem?.phone,
                  photo: selectedItem?.photo,
                  teacherUserAccountId: selectedItem?.teacherUserAccountId,
                  dob: selectedItem?.dob,
               }}
               validationSchema={validation}
               onSubmit={values => {
                  console.log(values);
                  updateStaffAccount(values)(dispatch)
               }}
            >
               {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  touched,
                  errors,
                  isValid }) => (
                  <Row>
                     <Col xl="3" lg="4" className="">
                        <Card>
                           <Card.Header className="d-flex justify-content-between">
                              <div className="header-title">
                                 <h4 className="card-title">Edit Staff Photo</h4>
                              </div>
                           </Card.Header>
                           <Card.Body>
                              <div>
                                 <Form.Group className="form-group">
                                    <div className="profile-img-edit position-relative">
                                       <Image className="theme-color-default-img  profile-pic rounded avatar-100" src={avatars1} alt="profile-pic" />
                                       <Image className="theme-color-purple-img profile-pic rounded avatar-100" src={avatars2} alt="profile-pic" />
                                       <Image className="theme-color-blue-img profile-pic rounded avatar-100" src={avatars3} alt="profile-pic" />
                                       <Image className="theme-color-green-img profile-pic rounded avatar-100" src={avatars5} alt="profile-pic" />
                                       <Image className="theme-color-yellow-img profile-pic rounded avatar-100" src={avatars6} alt="profile-pic" />
                                       <Image className="theme-color-pink-img profile-pic rounded avatar-100" src={avatars4} alt="profile-pic" />
                                       <div className="upload-icone bg-primary">

                                          <svg className="upload-button" width="14" height="14" viewBox="0 0 24 24">
                                             <path fill="#ffffff" d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                                          </svg>
               
                                       </div>
                                    </div>
                                    <div className="img-extension mt-3">
                                       <div className="d-inline-block align-items-center">
                                          <span>Only</span>{' '}
                                          <Link to="#">.jpg</Link>{' '}
                                          <Link to="#">.png</Link>{' '}
                                          <Link to="#">.jpeg</Link>{' '}
                                          <span>allowed</span>
                                          {/* <Form.Control type="file" id="customFile1" name='photo' /> */}
                                          <Field type="file" id="customFile1" name='photo'  onChange={onImageChanges}/>
                                          {imageURLs.map((imageSrc, index) => {
                                             return (
                                                <img key={index} src={imageSrc} style={{ width: 350, height:300, borderRadius: 10, marginTop: 15}}/>
                                             )
                                          })}
                                       </div>
                                    </div>
                                 </Form.Group>
                              </div>
                           </Card.Body>
                        </Card>
                     </Col>
                     <Col xl="9" lg="8">
                        <Card>
                           <Card.Header className="d-flex justify-content-between">
                              <div className="header-title">
                                 <h4 className="card-title">New Staff Information</h4>
                              </div>
                           </Card.Header>
                           <Card.Body>
                              <div className="new-user-info">

                                 <div>
                                    {message && <div className='text-danger'>{message}</div>}
                                    {(touched.firstName && errors.firstName) && <div className='text-danger'>{errors.firstName}</div>}
                                    {(touched.lastName && errors.lastName) && <div className='text-danger'>{errors.lastName}</div>}
                                    {(touched.middleName && errors.middleName) && <div className='text-danger'>{errors.middleName}</div>}
                                    {(touched.email && errors.email) && <div className='text-danger'>{errors.email}</div>}
                                    {(touched.phone && errors.phone) && <div className='text-danger'>{errors.phone}</div>}
                                    {(touched.dob && errors.dob) && <div className='text-danger'>{errors.dob}</div>}
                                    <div className="row">
                                       <Form.Group className="col-md-6 form-group">
                                          <label htmlFor="firstName" className="form-label"> First Name:</label>
                                          <Field type="text" className="form-control" name="firstName" id="firstName" aria-describedby="name" required placeholder="First Name" />
                                       </Form.Group>
                                       <Form.Group className="col-md-6 form-group">
                                          <label htmlFor="lastName" className="form-label"> Last Name:</label>
                                          <Field type="text" className="form-control" name="lastName" id="lastName" aria-describedby="name" required placeholder="Last Name" />
                                       </Form.Group>
                                       <Form.Group className="col-md-6 form-group">
                                          <label htmlFor="middleName" className="form-label"> Middle Name:</label>
                                          <Field type="text" className="form-control" name="middleName" id="middleName" aria-describedby="name" placeholder="Middle Name" />
                                       </Form.Group>
                                       <Form.Group className="col-md-6 form-group">
                                          <label htmlFor="email" className="form-label"> Email:</label>
                                          <Field type="text" className="form-control" name="email" id="email" aria-describedby="name" required placeholder="Email e.g schoolmgt@yahoo.com" />
                                       </Form.Group>
                                       <Form.Group className="col-md-3  form-group">
                                          <label htmlFor="phone" className="form-label"> Phone No.</label>
                                          <Field type="text" className="form-control" name="phone" id="phone" aria-describedby="name" required placeholder="Phone No. e.g 08222222" />
                                       </Form.Group>
                                       <Form.Group className="col-md-3  form-group">
                                          <label htmlFor="dob" className="form-label"> Date of Birth.</label>
                                          <Field type="date" className="form-control" name="dob" id="dob" aria-describedby="name" required placeholder="Enter Date of Birth" />
                                       </Form.Group>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                       <Button type="button" variant="btn btn-danger mx-2" onClick={() => { history.push(staffLocations.staffList) }}>Cancel</Button>{' '}
                                       <Button type="button" variant="btn btn-primary" onClick={handleSubmit}>Submit</Button>
                                    </div>
                                 </div>

                              </div>
                           </Card.Body>
                        </Card>
                     </Col>
                  </Row>
               )}
            </Formik>
         </div>
      </>
   )

}

export default StaffEdit;