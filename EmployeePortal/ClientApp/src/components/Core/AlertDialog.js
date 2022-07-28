import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import ReactDOM from 'react-dom';
import '../css/Alert.css';
import IsNull from '../Common/Common';

const node = document.createElement("div");

function AlertDialog(message, callback = () => { }, heading = '') {
    document.getElementById('alertDialogDiv').appendChild(node);
    const AlertDialogContent = () => {
        return (
            <div className="alertDialog">
                <div id="myModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">{heading !== '' ? heading : 'ALERT'}</h4>
                                <button onClick={onHide} type="button" className="close alertClose" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                {typeof (message) === 'function' ? message() : <p>{message}</p>}
                            </div>
                            <div className="modal-footer">
                                <button onClick={onHide} type="button" className="btn btn-default btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    const onHide = () => {
        ReactDOM.unmountComponentAtNode(node);
        node.remove();
        if (!IsNull(callback)) {
            callback();
        }
    }

    ReactDOM.render(<AlertDialogContent />, node);
};

export default AlertDialog