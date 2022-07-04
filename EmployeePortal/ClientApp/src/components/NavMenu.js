import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import './css/NavMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

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
    }

    static getDerivedStateFromProps(state, prev) {
        if (!prev.collapsed && !prev.IsButtonClicked) {
            return { collapsed: true }
        }
        return { collapsed: prev.collapsed, IsButtonClicked: false }
    }

    render() {
        let User, SignOut;
        const isLoggedIn = localStorage.getItem("myToken");

        SignOut = <NavLink tag={Link} type="button" onClick={this.handleSignOut} to="/" className="btn btn-danger button-signout margin-rt10 float-rt m-0"><FontAwesomeIcon icon={faPowerOff} /></NavLink>
        User = <NavLink tag={Link} className="text-white float-rt mt-1 margin-rt10 margin-rt20" to='/UserProfile'>{localStorage.getItem("myFullUserName") ?? localStorage.getItem("myUserName")}</NavLink>

        return (
            <header className="row p-0 m-0">
                <div className="col-sm-11 col-12 p-0">
                    <Navbar className="theme1 navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
                        <Container className="justifycontent-normal container-width">
                            <NavbarBrand className="text-black mb-4 mt-4 wrdbreak" tag={Link} to="/">
                                <h3>
                                    <b>Employee Portal</b>
                                </h3>
                            </NavbarBrand>
                            <NavbarToggler onClick={this.toggleNavbar} className="mr-2 marginleft55 marginleft40" />
                            <Collapse className={"d-sm-inline-flex flex-sm-row-reverse boxshadow " + (!isLoggedIn ? "d-none" : "")} isOpen={!this.state.collapsed} navbar>
                                <ul className={"navbar-nav flex-grow ml-1 " + (!isLoggedIn ? "d-none" : "")}>

                                    <NavItem className="text-black padding-5">
                                        <NavLink tag={Link} className="text-black d-none d-md-block d-lg-block d-xl-block" to="/"><b>Home</b></NavLink>
                                        <NavLink tag={Link} className="text-black d-md-none" onClick={this.toggleNavbar} to="/"><b>Home</b></NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown className="text-black padding-5" nav inNavbar>
                                        <DropdownToggle nav>
                                            <b>Employee Management</b>
                                        </DropdownToggle>
                                        <DropdownMenu className="theme1">
                                            <DropdownItem className="theme1">
                                                <NavItem>
                                                    <NavLink tag={Link} className="text-black d-none d-md-block d-lg-block d-xl-block" to="/Employees"><b>Employees</b></NavLink>
                                                    <NavLink tag={Link} className="text-black d-md-none" onClick={this.toggleNavbar} to="/Employees"><b>Employees</b></NavLink>
                                                </NavItem>
                                            </DropdownItem>
                                            <DropdownItem className="theme1">
                                                <NavItem>
                                                    <NavLink tag={Link} className="text-black d-none d-md-block d-lg-block d-xl-block" to="/Departments"><b>Departments</b></NavLink>
                                                    <NavLink tag={Link} className="text-black d-md-none" onClick={this.toggleNavbar} to="/Departments"><b>Departments</b></NavLink>
                                                </NavItem>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <UncontrolledDropdown className="text-black padding-5" nav inNavbar>
                                        <DropdownToggle nav>
                                            <b>Admin</b>
                                        </DropdownToggle>
                                        <DropdownMenu className="theme1">
                                            <DropdownItem className="theme1">
                                                <NavItem className="text-black padding-5">
                                                    <NavLink tag={Link} className="text-black d-none d-md-block d-lg-block d-xl-block" to="/Users"><b>Users</b></NavLink>
                                                    <NavLink tag={Link} className="text-black d-md-none" onClick={this.toggleNavbar} to="/Users"><b>Users</b></NavLink>
                                                </NavItem>
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <NavItem className="d-sm-none">
                                        <div><small>{User}</small></div>
                                    </NavItem>
                                    <NavItem className="d-sm-none">
                                        <div><small>{SignOut}</small></div>
                                    </NavItem>
                                </ul>
                            </Collapse>
                        </Container>
                    </Navbar>
                </div>
                <div className="col-sm-1 mb-3 p-0 d-none d-sm-block d-md-block d-lg-block d-xl-block">
                    <div className={(!isLoggedIn ? "d-none theme1 userName p-0 m-0" : "theme1 userName p-0 m-0")} >
                        <div className="row col-12 p-0 m-0 pt-3" style={{ height: "50%" }}>
                            <div className="col-lg-8 col-md-9 col-10 p-0 m-0"><small>{SignOut}</small></div>
                        </div>
                        <div className="row col-12 p-0 m-0 pt-2" style={{ height: "50%" }}>
                            <div><small>{User}</small></div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
