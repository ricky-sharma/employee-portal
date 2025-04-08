import { createBrowserHistory } from 'history';
import { Component } from 'react';
import IsNull from '../Common/Common';
import { WebApi } from '../Helpers/WebApi.ts';

const history = createBrowserHistory();

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        };
    }

    componentDidCatch(error, errorInfo) {
        this.logError(error, errorInfo)
        return {
            hasError: false
        };
    }

    logError = (error, errorInfo) => {
        var errorData = { "Error": '"' + error + '"', "ErrorInfo": JSON.stringify(errorInfo) }
        WebApi('/api/Error', JSON.stringify(errorData)).then(resp => {
            if (!IsNull(resp) && resp.Message === 'SUCCESS') {
                history.push('/Error', resp.ErrorCode)
                history.go(0)
            }
        });
    }

    render() {
        if (this.state.hasError) {
            return null
        }
        return this.props.children;
    }
}

export default ErrorBoundary