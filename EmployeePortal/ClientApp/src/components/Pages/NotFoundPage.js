import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class NotFoundPage extends Component {
    render() {
        return (
            <div>
                <h4>Page Not Found</h4>
                <p>Sorry, there is nothing to see here.</p>
                <p><Link to="/">Back to Home</Link></p>
            </div>
        )
    }
}

export default NotFoundPage
