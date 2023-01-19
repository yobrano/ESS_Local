import React, { useState,Fragment } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import ReactStickyHeader from 'react-sticky-header';

import {
    Navbar,
    Nav,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    Container,
    Collapse,
    // Button,
  } from "reactstrap";
import { isAuthenticated } from '../../../store/selectors/AuthSelectors';

  // import "./../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./bootstrap.min.css";
import "./custome.css";


function NavbarPg(props) {
    const [isOpenMenu,setIsOpenMenu]=useState(false)
    const [showreg,setShowreg] = useState('btn btn-primary btn-rounded mx-1')

    let navItems=[

    ]


    let login=()=>{
      return props.history.push('/login')
    }
    let signup=()=>{
      return props.history.push('/signup')
    }
    
    console.log(props.isAuthenticated);
  return (
    <Fragment>
      
            <Navbar
              expand="lg"
              fixed="top"
              className={
                props.navClass + " navbar-custom sticky sticky-dark"
              }>
            
              <Container>
                <NavbarBrand className="logo" href="/" style={{width:'150px'}}>
                  <img src={props.navIcon} alt="logo" style={{width:'100%',height:'100%'}}/>
                  {/* <i className="mdi mdi-alien"></i> */}
                  {/* <span className="title ms-1">
                  {process.env.REACT_APP_NAME}
                  </span> */}
                </NavbarBrand>

                <NavbarToggler className="p-0" onClick={()=>setIsOpenMenu(!isOpenMenu)}>
                  <i className="mdi mdi-menu"></i>
                </NavbarToggler>

                <Collapse
                  id="navbarCollapse"
                  isOpen={isOpenMenu}
                  navbar
                  
                >
                 
                  <Nav className="navbar-nav navbar-center" id="mySidenav">
                      {navItems.map((item, key) => (
                        <NavItem
                          key={key}
                          className={item.navheading === "Home" ? "active" : ""}
                        >
                          <NavLink href={"#" + item.idnm}>
                            {" "}
                            {item.navheading}
                          </NavLink>
                        </NavItem>
                      ))}
                  </Nav>

                  <div className="nav-button ms-auto">
                    <Nav className="navbar-right flex-row justify-content-end" navbar>
                      {/* <NavItem> */}
                        <button
                          type="button"
                          className="btn btn-primary btn-rounded mx-1 me-sm-2"
                          onClick={login}
                          id="loginBtn"
                        >
                          Login
                        </button>
                        

                        <button
                          type="button"
                          className={showreg}
                          onClick={signup}
                          id="registerBtn"
                        >
                          Register
                        </button>
                      {/* </NavItem> */}
                    </Nav>
                  </div>
                </Collapse>

              </Container>
            </Navbar>
        
      </Fragment>
  )
}
const mapStateToProps = (state) => {
  return {
      isAuthenticated: isAuthenticated(state),
  };
};
export default withRouter(connect(mapStateToProps)(NavbarPg))