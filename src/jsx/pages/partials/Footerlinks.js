import React from 'react'
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

function Footerlinks() {
    let socials = [
        { icon: "mdi mdi-facebook", link: "#" },
        { icon: "mdi mdi-twitter", link: "#" },
        { icon: "mdi mdi-linkedin", link: "#" },
        // { icon: "mdi mdi-google-plus", link: "#" },
        // { icon: "mdi mdi-dribbble", link: "#" },
    ];

  return (
    <>
     <div className="footer-alt">
          <Container>
            <Row>
              <Col lg="12">
                <div className="float-start pull-none">
                  <p className="copy-rights text-muted mb-3 mb-sm-0">
                    {/* &copy; {new Date().getFullYear()}- {process.env.REACT_APP_NAME} */}
                    <a href={"https://intergral-gs.com/"} rel="noreferrer" target="_blank" className="text-muted" style={{textDecoration:'none',color:'unset',fontSize: '13px'}}>© {new Date().getFullYear()} {process.env.REACT_APP_NAME} Design by Intergral Group Solution Ltd</a>

                  </p>
                </div>
                <div className="float-end pull-none ">
                  <ul className="list-inline social m-0">
                    {socials.map((social, key) => (
                      <li className="list-inline-item" key={key}>
                        <Link to={social.link} className="social-icon2">
                          <i className={social.icon}></i>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="clearfix"></div>
              </Col>
            </Row>
          </Container>
        </div>
    </>
  )
}

export default Footerlinks