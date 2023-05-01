import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function EditModal() {
  const [show, setShow] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <>
      <Button className="me-2 mb-2" onClick={() => handleShow("sm-down")}>
        Full screen
      </Button>

      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Modal body content</Modal.Body>
        
      </Modal>
    </>
  );
}
