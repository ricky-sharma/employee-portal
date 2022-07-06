import React, { Component } from 'react';
import '../css/Home.css';
import WebApi from '../Helpers/WebApi';
import GetUserInfo from '../Helpers/GetUserInfo';
import { Logger } from './../Helpers/Logger.ts';

export class Home extends Component {
    static displayName = Home.name;
    constructor(params) {
        super(params)
        this.state = {
            Username: '',
            Password: '',
            token: localStorage.getItem('myToken') || '',
            loggedInUser: ''
        };
    }

    handleClick = () => {
        let url = `/token`;
        let data = 'username=' + this.state.Username +
            '&password=' + this.state.Password + '&grant_type=password'

        WebApi(url, data, 'POST', false)
            .then(response => {
                if (response) {
                    this.setState({
                        token: response.access_token,
                        loggedInUser: response.userName
                    }, () => {
                        localStorage.setItem('myToken', this.state.token)
                        GetUserInfo(0)
                            .then(response => {
                                if (response) {
                                    localStorage.setItem('myUserName', response.Username ?? this.state.loggedInUser)
                                    localStorage.setItem('myFullUserName', response.FullName ?? null)
                                    Logger({ 'UserId': response.UserId, 'LogMessage': 'User LogIn', 'Type': 'UserActivity' });
                                    this.props.history.push('/Employees')
                                }
                            })
                    });
                }
            });
    }

    render() {
        const isLoggedIn = localStorage.getItem("myToken");
        if (isLoggedIn)
            return (<div className="row justify-content-md-center">Welcome to the Employee portal.</div>)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Sign In</h5>
                                <div className="form-label-group">
                                    <input type="email" className="form-control" placeholder="Username" value={this.state.Username} onChange={(e) => { this.setState({ Username: e.target.value }) }} />
                                </div>
                                <div className="form-label-group">
                                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" value={this.state.Password} onChange={(e) => { this.setState({ Password: e.target.value }) }} />
                                </div>
                                <div className="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                                </div>
                                <button className="btn btn-lg btn-success btn-block text-uppercase" value="Submit" onClick={this.handleClick} type="button">Sign in</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
