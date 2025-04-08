import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Constants from '../../Constants';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export class ErrorPage extends Component {

    render() {
        if (history.location && history.location.state)
            this.id = history.location.state
        return (
            <div>
                <h4>{Constants.ErrorHeading}</h4>
                <p>{Constants.SupportText} {this.id}</p>
                <p><Link to="/">Back to Home</Link></p>
            </div>)
    }
}

export default ErrorPage