import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Oval } from 'react-loader-spinner';
import { usePromiseTracker } from "react-promise-tracker";
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/Helpers/ErrorBoundary';
import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const LoadingIndicator = () => {
    const { promiseInProgress } = usePromiseTracker();
    return (
        promiseInProgress &&
        <div><div className="loading-image"> <Oval ariaLabel="loading-indicator" height={90} width={90} strokeWidth={5} color="#00BFFF" secondaryColor="#00BFFF" /></div></div>);
}

ReactDOM.render(
    <>
        <BrowserRouter basename={baseUrl}>
            <ErrorBoundary>
                <div>
                    <App />
                    <LoadingIndicator />
                </div>
                <div id="alertDialogDiv" className="alert-Dialog"></div>
            </ErrorBoundary>
        </BrowserRouter>
    </>,
    rootElement);

registerServiceWorker();
