import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router";
import { generalOnlineClassLocations } from "../../../router/spm-path-locations";

const TimeoutModal = ({ showModal, roomId,setShowModal }) => {
  const history = useHistory();
  const [counter, setCounter] = useState(5);

  let count;
  useEffect(() => {
    if (showModal) {
      let count = 5;
      const countdown = setInterval(() => {
        setCounter((counter) => count - 1);
        count--;
        if (count === 0) {
         window.open(`${generalOnlineClassLocations.room}?roomId=${roomId}`, '_blank');
         setShowModal(false)
        }
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [count, showModal]);

  return (
    <Modal
      show={showModal}
      onHide={() => {
        showModal(false);
      }}
      id="viewModal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="h6">
          <div>
            Routing to Class Room in{" "}
            <span className="text-danger">{counter}</span>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>redirecting to Online Class Room.....</p>
<div className="d-flex justify-content-end">
        <Button
          variant="danger"
          className="mx-2"
          onClick={() => {
            setShowModal(false)
          }}
        >
          Cancel
        </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TimeoutModal;
