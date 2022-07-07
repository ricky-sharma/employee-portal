import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from 'react-loader-spinner'

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const LoadingIndicator = props => {
    const { promiseInProgress } = usePromiseTracker();
    return (
        promiseInProgress &&
        <div
            style={{
                width: "100%",
                height: "70",
                display: "flex",
                justifyContent: "center", alignItems: "center"
            }}
        >
            <ThreeDots color="#00BFFF" height={80} width={80} />   </div>
    );
}

ReactDOM.render(
    <>
        <BrowserRouter basename={baseUrl}>
            <div>
                <App />
                <LoadingIndicator />
            </div>
        </BrowserRouter>
        <div id="alertDialogDiv"></div>
    </>,
    rootElement);

registerServiceWorker();
