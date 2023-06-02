import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import Card from '../../Card';
import { useSelector } from 'react-redux';
import { getAllStaffClasses } from '../../../store/actions/results-actions';
import TimeoutModal from './timeoutModal';

const OnlineClass = () => {
  const [showModal, setShowModal] = useState(false);
  const [roomId,setRoomId] = useState('');
  const state = useSelector((state) => state);
  const { staffClasses } = state.results;

  React.useEffect(() => {
    getAllStaffClasses();
  }, []);

  return (
    <>
    <TimeoutModal showModal={showModal} roomId={roomId} setShowModal = {setShowModal}/>
      <div>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title">
                  <h4 className="card-title mb-3">
                    <b>Online Class</b>
                  </h4>
                </div>
              </Card.Header>
              
              <Card.Body className="px-0">
                <div className=''>
                 {/* {staffClasses.map((item, idx) => ( */}
                <div className='d-flex justify-content-around'>
                <h6>JSS1</h6>
                <div>
                  <button className='btn-sm bg-primary border-0 text-white' onClick={()=>{setShowModal(true);setRoomId('111')}}>Join Room</button>
                </div>
                </div>
                <hr className='bg-secondary'/>
                <div className='d-flex justify-content-around'>
                <h6>JSS2</h6>
                <div>
                  <button className='btn-sm bg-primary border-0 text-white' onClick={()=>{setShowModal(true);setRoomId('111')}}>Join Room</button>
                </div>
                </div>
                <hr className='bg-secondary'/>
                 {/* ))} */}
                </div>
              </Card.Body>
             
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default OnlineClass