import React from 'react'
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Input } from "reactstrap";
import Footerlinks from './Footerlinks';

function Footer() {

  let footerItems = [
    {
      title: process.env.REACT_APP_NAME,
      links: [
        // { linkTitle: "Home", link: "/" },
        // { linkTitle: "About us", link: "#" },
        // { linkTitle: "Careers", link: "#" },
        // { linkTitle: "Contact us", link: "#" },
        { linkTitle: "Staff", link: "/asignup" },
        // { linkTitle: "Contact", link: "#" },

      ],
    },
    // {
    //   title: "Information",
    //   links: [
    //     { linkTitle: "Terms & Condition", link: "#" },
    //     { linkTitle: "About us", link: "#" },
    //     { linkTitle: "Jobs", link: "#" },
    //     // { linkTitle: "Bookmarks", link: "#" },
    //   ],
    // },
    // {
    //   title: "Support",
    //   links: [
    //     { linkTitle: "FAQ", link: "#" },
    //     { linkTitle: "Contact", link: "#" },
    //     // { linkTitle: "Disscusion", link: "#" },
    //   ],
    // },
  ]
  return (
    <>
      <footer className="footer2">
          <Container>
            <Row>
              {footerItems.map((item, key) => (
                <Col lg="4" className="mt-4" key={key}>
                  <h4 style={{textTransform:'uppercase'}}>{item.title}</h4>
                  <div className="text-muted mt-4">
                    <ul className="list-unstyled footer-list">
                      {item.links.map((link, key) => (
                        <li key={key}>
                          <Link to={link.link} className="btn btn-white" style={{backgroundColor:'white',fontSize:'1.5rem',color:'black'}}>{link.linkTitle}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
              ))}

              {/* <Col lg="3" className="mt-4">
                <h4>Subscribe</h4>
                <div className="text-muted mt-4">
                  <p>
                    In an ideal world this text wouldn’t exist, a client would
                    acknowledge the importance of having web copy before the
                    design starts.
                  </p>
                </div>
                <Form className="form subscribe">
                  <Input
                    placeholder="Email"
                    className="form-control"
                    required
                  />
                  <Link to="#" className="submit">
                    <i className="pe-7s-paper-plane"></i>
                  </Link>
                </Form>
              </Col> */}
            </Row>
          </Container>
      </footer>
      <Footerlinks/>

    </>
  )
}

export default Footer