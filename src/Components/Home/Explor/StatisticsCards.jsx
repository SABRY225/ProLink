import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEdit, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from '../../NavBar/SearchBar/SearchBar';

function StatisticsCards({ users, posts, jobs }) {
  return (
    <Container className="grey-bg container-fluid d-flex justify-content-center mt-5">
        <SearchBar/>
      <section id="minimal-statistics" className="w-100">
        <Row className="justify-content-center">
          <Col xl={3} lg={4} md={6} sm={8} xs={10} className="mb-3">
            <Card className="text-center">
              <Card.Body>
                <div className="media d-flex justify-content-between align-items-center">
                  <div className="media-body text-left">
                    <h3 className="text-success">{users}</h3>
                    <span>Users</span>
                  </div>
                  <div className="align-self-center">
                    <FontAwesomeIcon icon={faUser} className="text-success" size="2x" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={3} lg={4} md={6} sm={8} xs={10} className="mb-3">
            <Card className="text-center">
              <Card.Body>
                <div className="media d-flex justify-content-between align-items-center">
                  <div className="media-body text-left">
                    <h3 className="text-primary">{posts}</h3>
                    <span>Posts</span>
                  </div>
                  <div className="align-self-center">
                    <FontAwesomeIcon icon={faEdit} className="text-primary" size="2x" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={3} lg={4} md={6} sm={8} xs={10} className="mb-3">
            <Card className="text-center">
              <Card.Body>
                <div className="media d-flex justify-content-between align-items-center">
                  <div className="media-body text-left">
                    <h3 className="text-danger">{jobs}</h3>
                    <span>Jobs</span>
                  </div>
                  <div className="align-self-center">
                    <FontAwesomeIcon icon={faBriefcase} className="text-danger" size="2x" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>
    </Container>
  );
}

export default StatisticsCards;
