import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Constants from '../../Constants';
import IsNull, { GetCookie } from '../common/Common';
import '../css/Home.css';
import GetUserInfo from '../Helpers/GetUserInfo';
import { WebApi } from '../Helpers/WebApi.ts';
import { mapDispatchToProps, mapStateToProps } from './../../redux/reducers/userSlice';
import { Logger } from './../Helpers/Logger.ts';

class HomeComponent extends Component {
    constructor(props) {
        super(props)
        const { authToken } = props
        this.state = {
            Username: '',
            Password: '',
            token: authToken || '',
            loggedInUser: '',
            rememberMe: false
        };
    }

    componentDidMount = () => {
        let user = GetCookie('email');
        let pswd = GetCookie('password');
        let remember = GetCookie('rememberme');
        this.setState({
            Username: user,
            Password: pswd,
            rememberMe: remember === 'yes' ? true : false
        })
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
                        this.props.setAuthToken(this.state.token)
                        GetUserInfo(0)
                            .then(response => {
                                if (!IsNull(response)) {
                                    this.props.setUserFullName(response.FullName ?? null);
                                    this.props.setUsername(response.Username ?? this.state.loggedInUser)
                                    Logger({ 'LogMessage': 'User LogIn', 'Type': 'UserActivity' });
                                    this.props.navigate('/Employees')
                                }
                            })
                    });
                }
            });
    }

    handleRememberMe = (e) => {
        this.setState({ rememberMe: e.target.checked })
        if (e.target.checked) {
            let u = this.state.Username;
            let p = this.state.Password;
            document.cookie = "rememberme=yes;path=" + (window.location.protocol !== 'https:' ? Constants.DevAPPURL : Constants.APPURL)
            document.cookie = "email=" + u + ";path=" + (window.location.protocol !== 'https:' ? Constants.DevAPPURL : Constants.APPURL)
            document.cookie = "password=" + p + ";path=" + (window.location.protocol !== 'https:' ? Constants.DevAPPURL : Constants.APPURL)
        }
        else {
            document.cookie = "rememberme=no;path=" + (window.location.protocol !== 'https:' ? Constants.DevAPPURL : Constants.APPURL)
            document.cookie = "email=;path=" + (window.location.protocol !== 'https:' ? Constants.DevAPPURL : Constants.APPURL)
            document.cookie = "password=;path=" + (window.location.protocol !== 'https:' ? Constants.DevAPPURL : Constants.APPURL)
        }
    }

    render() {
        const isLoggedIn = !this.props.loggedOut;
        if (isLoggedIn)
            return (<div className="row justify-content-md-center m-0 p-0">Welcome to the Employee portal.</div>)
        return (
            <div>
                <div className="row">
                    <div className="col-sm-8 col-md-6 col-lg-4 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Sign In</h5>
                                <div className="form-label-group">
                                    <input type="email" id="inputUsername" className="form-control" placeholder="Username" value={this.state.Username} onChange={(e) => { this.setState({ Username: e.target.value }) }} />
                                </div>
                                <div className="form-label-group">
                                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" value={this.state.Password} onChange={(e) => { this.setState({ Password: e.target.value }) }} />
                                </div>
                                <div className="custom-control custom-checkbox mb-3">
                                    <input type="checkbox" className="custom-control-input" id="rememberMe" checked={this.state.rememberMe} onChange={this.handleRememberMe} />
                                    <label className="custom-control-label" htmlFor="rememberMe">Remember me</label>
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

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);