import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './css/NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            IsButtonClicked: false
        };
    }

    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            IsButtonClicked: true
        });
    }

    handleSignOut = () => {
        localStorage.removeItem('myToken')
        console.log("session expired")
    }

    static getDerivedStateFromProps(state, prev) {
        if (!prev.collapsed && !prev.IsButtonClicked) {
            return { collapsed : true }
        }
        return { collapsed: prev.collapsed, IsButtonClicked: false }
    }

    render() {
        let User, SignOut;
        const isLoggedIn = localStorage.getItem("myToken");
        if (isLoggedIn) {
            SignOut = <NavLink tag={Link} type="button" onClick={this.handleSignOut} to="/" className="btn btn-danger button-signout margin-rt10 float-rt">Sign Out</NavLink>
            User = <NavLink tag={Link} className="text-white float-rt mt-1 margin-rt10 margin-rt20" to='/UserProfile'>{localStorage.getItem("myUserName")}</NavLink>
        }
        return (
            <header>
                <Navbar className="theme1 navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                    <Container className="justifycontent-normal">
                        <NavbarBrand className="text-black mb-4 mt-4 wrdbreak" tag={Link} to="/">
                            <h3>
                                <b>Employee Portal</b>
                            </h3>
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2 marginleft55 marginleft40" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse boxshadow" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow ml-1">

                                <NavItem>
                                    <NavLink tag={Link} className="text-black d-none d-md-block d-lg-block d-xl-block" to="/"><b>Home</b></NavLink>
                                    <NavLink tag={Link} className="text-black d-md-none" onClick={this.toggleNavbar} to="/"><b>Home</b></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-black d-none d-md-block d-lg-block d-xl-block" to="/Employees"><b>Employees</b></NavLink>
                                    <NavLink tag={Link} className="text-black d-md-none" onClick={this.toggleNavbar} to="/Employees"><b>Employees</b></NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-black d-none d-md-block d-lg-block d-xl-block" to="/Departments"><b>Departments</b></NavLink>
                                    <NavLink tag={Link} className="text-black d-md-none" onClick={this.toggleNavbar} to="/Departments"><b>Departments</b></NavLink>
                                </NavItem>
                                <NavItem className="d-md-none">
                                    <div><small>{User}</small></div>
                                </NavItem>
                                <NavItem className="d-md-none">
                                    <div><small>{SignOut}</small></div>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                    <div className="d-none d-md-block d-lg-block d-xl-block"><small>{User}</small></div>
                    <div className="d-none d-md-block d-lg-block d-xl-block"><small>{SignOut}</small></div>
                </Navbar>
            </header>
        );
    }
}
