import React from 'react';

import { Modal, Button, Container } from 'react-bootstrap';

const CommonModal = ({ show, onHide, title, content }) => {
    console.log("show " + show);
    console.log("title " + title);
    console.log("content " + content);

    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>{content}</Container>
          {content}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
export default CommonModal;