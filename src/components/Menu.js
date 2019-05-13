import React from "react";
import { Link } from "gatsby";
import { Nav, Dropdown, NavItem } from 'react-bootstrap'
import './menu.css'


export default () => (

  <div className="navigation">
    <Nav className="flex-column">
      <Nav.Item><Link to="/">Home</Link></Nav.Item>
      <Nav.Item><Link to="/blog">Blog</Link></Nav.Item>
      <Nav.Item><Link to="/contact">Contact Us</Link></Nav.Item>
      <Dropdown as={NavItem}>
        <Dropdown.Toggle as={Nav.Link}>Dropdown</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>Hello there!</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown as={NavItem}>
        <Link variant="success" className="float-left" to="/">Dropdown Split Button</Link>
        <Dropdown.Toggle split id="dropdown-split-basic"/>
        <Dropdown.Menu>
          <Dropdown.Item hred="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item hred="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item hred="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav>
  </div>
)
