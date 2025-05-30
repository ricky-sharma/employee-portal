import { Component } from 'react';
import IsNull from '../common/Common';
import { WebApi } from '../helpers/WebApi.ts';

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
                this.props.navigate('/Error', { state: resp.ErrorCode })
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