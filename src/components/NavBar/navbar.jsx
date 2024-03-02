import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import './navbar.css';

const NavBar = () => {
    return (
        <Navbar expand="sm" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src="./src/img/index/icons/logo grande.jpg"
                        alt="Logo"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="collapsibleNavbar" />

                <Navbar.Collapse id="collapsibleNavbar">
                    <Nav className="mr-auto">
                        <Nav.Link href="/src/template/agenda.html">Agenda</Nav.Link>
                        <NavDropdown title="ChoriFest" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/chorifest/choris">Gestion Chorifest</NavDropdown.Item>
                            <NavDropdown.Item href="/chorifest/tipochori">Gestion Tipo de Chori</NavDropdown.Item>
                            <NavDropdown.Item href="/chorifest/rol">Gestion Roles</NavDropdown.Item>
                            <NavDropdown.Item href="/chorifest/usuarios">Gestion Usuarios</NavDropdown.Item>
                        </NavDropdown>                        
                        <Nav.Link href="/src/template/equipo_socorro.html">Equipo de Socorro</Nav.Link>
                        <Nav.Link href="/src/template/quienes_somos.html">Quienes Somos</Nav.Link>
                        <Nav.Item>
                            <Nav.Link>
                                <input type="checkbox" className="darkmode" id="btn_dark" />
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;
