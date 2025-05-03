import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Oval } from 'react-loader-spinner';
import { usePromiseTracker } from "react-promise-tracker";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import ComponentWrapper from './components/helpers/ComponentWrapper';
import ErrorBoundary from './components/helpers/ErrorBoundary';
import { persistor, store } from './redux/store'; // Store created with @reduxjs/toolkit
import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
const LoadingIndicator = () => {
    const { promiseInProgress } = usePromiseTracker();
    return (
        promiseInProgress &&
        <div>
            <div className="loading-image">
                <Oval ariaLabel="loading-indicator" height={90} width={90} strokeWidth={5} color="#00BFFF" secondaryColor="#00BFFF" />
            </div>
        </div>);
}

root.render(
    <>
        <BrowserRouter basename={baseUrl}>
            <ComponentWrapper component={ErrorBoundary}>
                <div>
                    <Provider store={store}>
                        <PersistGate loading={<LoadingIndicator />} persistor={persistor}>
                            <App />
                        </PersistGate>
                    </Provider>
                    <LoadingIndicator />
                </div>
                <div id="alertDialogDiv" className="alert-Dialog" />
            </ComponentWrapper>
        </BrowserRouter>
    </>);

registerServiceWorker();
