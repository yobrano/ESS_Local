import React from 'react'
import Header from './partials/NavbarPg'

import landing from "./../../images/icon.png"
import LandingBody from './partials/LandingBody'
import Joblist from './partials/Joblist'
import Footer from './partials/Footer'

function Landing() {
  return (
      <>
        <Header  navClass="navbar-white" navIcon={landing} />
        <LandingBody bgimg={landing} />
        <Joblist/>
        <Footer/>
      </>
  )
}

export default Landing