import React from 'react';
import {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";


export default class NavigationBar extends Component {
    render() {
        return (
            <Navbar bg="light" expand="sm">
                <Navbar.Brand href="#home">Covider</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/TestingSites">TestingSites</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>

            </Navbar>
        );
    }
}
