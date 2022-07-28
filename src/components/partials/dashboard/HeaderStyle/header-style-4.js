import React from 'react'
import {Link} from 'react-router-dom'
import {Navbar,Container,Nav,NavDropdown} from 'react-bootstrap'
// logo
import Logo from '../../components/logo'

const HeaderStyle4 = () => {
    var userDetail = JSON.parse(localStorage.getItem('userDetail'));
    
    return (
        <>
            <Navbar bg='dark' expand="lg" variant="dark" className="fixed-top iq-navbar" aria-label="Main navigation">
                <Container fluid>
                    <Link to="/dashboard" className="navbar-brand d-flex align-items-center">
                        <Logo color={true} />
                        <h4 className="logo-title text-light ms-3 mb-0"> {userDetail?.schoolAbbreviation ?? ''}</h4>
                    </Link>
                    <Navbar.Toggle className="p-0 border-0"  aria-controls="navbarSideCollapse" >
                        <span className="navbar-toggler-icon">
                            <span className="navbar-toggler-bar bar1 mt-2"></span>
                            <span className="navbar-toggler-bar bar2"></span>
                            <span className="navbar-toggler-bar bar3"></span>
                        </span>
                    </Navbar.Toggle>
                    <Navbar.Collapse className="offcanvas-collapse" >
                        <Nav as="ul" className=" me-auto mb-2 mb-lg-0">
                            <Nav.Item as="li">
                                <Nav.Link  active aria-current="page" href="#">Dashboard</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link  href="#">Notifications</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link  href="#">Profile</Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link  href="#">Switch account</Nav.Link>
                            </Nav.Item>
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something else here</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-primary" type="submit">Search</button>
                        </form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="nav-scroller bg-body shadow-sm">
                <nav className="nav nav-underline" aria-label="Secondary navigation">
                    <Nav.Link aria-current="page" href="#">Dashboard</Nav.Link>
                    <Nav.Link href="#">
                        Friends
                        <span className="badge bg-light text-dark rounded-pill align-text-bottom">27</span>
                    </Nav.Link>
                    <Nav.Link href="#">Explore</Nav.Link>
                    <Nav.Link href="#">Suggestions</Nav.Link>
                    <Nav.Link href="#">Link</Nav.Link>
                    <Nav.Link href="#">Link</Nav.Link>
                    <Nav.Link href="#">Link</Nav.Link>
                    <Nav.Link href="#">Link</Nav.Link>
                    <Nav.Link href="#">Link</Nav.Link>
                </nav>
            </div>     
        </>
    )
}

export default HeaderStyle4
