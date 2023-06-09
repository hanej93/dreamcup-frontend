import React from 'react';
import { Button } from 'react-bootstrap';

const About = ({handleOpenModal}) => {
  const openModal = () => {
    handleOpenModal('About', 'About Content');
  };

  return (
    <div>
      <h1>About Page</h1>
      <p>This is the About Page of our website.</p>
      <Button onClick={openModal}>
        Open Modal
      </Button>
    </div>
  );
};

export default About;