import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Constants from '../../Constants';

export class ErrorPage extends Component {

    render() {
        const { location } = this.props;
        if (location && location.state)
            this.id = location.state
        return (
            <div>
                <h4>{Constants.ErrorHeading}</h4>
                <p>{Constants.SupportText} {this.id}</p>
                <p><Link to="/">Back to Home</Link></p>
            </div>)
    }
}

export default ErrorPage