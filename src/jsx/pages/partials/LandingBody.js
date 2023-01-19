import React, { useState,Fragment } from 'react'
import { withRouter } from 'react-router-dom';
// import ReactStickyHeader from 'react-sticky-header';
import background from "./../../../images/landing.jpg";
import {
    Navbar,
    Nav,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    Container,
    Collapse,
    Row
    ,Col
    // Button,
  } from "reactstrap";
import "./custome.css"

function LandingBody(props) {
  return (
    <>
     <section className="section bg-home home-half" id="home" style={{ backgroundImage: `url(${background})` }}> 
          <div className="bg-overlay"></div>
          <Container>
            <Row>
              <Col
                lg={{ size: 8, offset: 2 }}
                className="text-white text-center"
              >
                <h4 className="home-small-title">{process.env.REACT_APP_NAME}</h4>
                <h1 className="home-title">
                {process.env.REACT_APP_HOMEPAGE_SLOGAN}
                </h1>
                
              
              </Col>
             
            </Row>
          </Container>
        </section>
    </>
  )
}

export default LandingBody