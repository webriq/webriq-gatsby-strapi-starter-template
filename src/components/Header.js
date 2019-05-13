import React from "react"
import { Link } from 'gatsby'
import Sticky from 'react-sticky-el'
import SideBarMenu from './Sidebar'
import styl from './header.module.css'

const Header = () => (
  <header>
    <Sticky 
      className={styl.stickyWrapper}
      stickyClassName={styl.isSticky}
      stickyStyle={{ transform: 'unset', zIndex: '2' }}
      >
        <div className={`bg-primary ${styl.menuContainer}`}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-6">
                <Link className="text-white" to="/">LOGO</Link>  
              </div>
              <div className="col-6">
                <SideBarMenu/>
              </div>
            </div>
          </div>
        </div>
    </Sticky>
  </header>
)

export default Header
