import React, { useState } from 'react'
import TimeoutModal from './timeoutModal';
import { getUserDetails } from '../../../utils/permissions';
import { fetchSingleStudent } from '../../../store/actions/student-actions';
import { connect } from "react-redux";
const OnlineClass = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [roomId, setRoomId] = useState(false);
 
  React.useEffect(() => {
  let getUserDetail = getUserDetails()
  props.fetchSingleStudent(getUserDetail?.id);
   setShowModal(true);
  }, []);

  React.useEffect(() => {
    setRoomId(props?.selectedStudent?.sessionClassID)//get session class from profile
    }, [props]);

  return (
    <>
   {roomId && <TimeoutModal showModal={showModal} roomId={roomId} setShowModal = {setShowModal}/>}
    </>
  )
}
function mapStateToProps(state) {
  return {
    selectedStudent: state.student.selectedStudent,
    loader:state.student
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSingleStudent: (studentAccountId) => fetchSingleStudent(studentAccountId)(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OnlineClass);