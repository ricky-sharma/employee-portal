import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { usePromiseTracker } from "react-promise-tracker";
import Loader from 'react-loader-spinner'

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
            <Loader type="ThreeDots" color="#2BAD60" height={70} width={70} />    </div>
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
