import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class ErrorPage extends Component {

    render() {
        if (this.props.location && this.props.location.state)
            this.id = this.props.location.state
        return (
            <div>
                <h4>Something went wrong</h4>
                <p>Please share the following error code with the support team: {this.id}</p>
                <p><Link to="/">Back to Home</Link></p>
            </div>)
    }
}

export default ErrorPage