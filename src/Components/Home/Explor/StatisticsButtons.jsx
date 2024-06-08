import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const StatisticsButtons = ({ onButtonClick }) => {
  return (
    <Container className="mt-1">
      <Row className="justify-content-center">
        <Col xs={6} md={4} lg={3} className="d-grid mb-3">
          <Button variant="dark" size="lg" onClick={() => onButtonClick('Users')}>
            Users
          </Button>
        </Col>
        <Col xs={6} md={4} lg={3} className="d-grid mb-3">
          <Button variant="dark" size="lg" onClick={() => onButtonClick('Posts')}>
            Posts
          </Button>
        </Col>
        <Col xs={6} md={4} lg={3} className="d-grid mb-3">
          <Button variant="dark" size="lg" onClick={() => onButtonClick('Jobs')}>
            Jobs
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default StatisticsButtons;
