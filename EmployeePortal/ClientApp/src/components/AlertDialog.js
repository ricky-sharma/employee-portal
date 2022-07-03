import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './css/Alert.css';

const node = document.createElement("div");

function AlertDialog(message) {
    document.body.appendChild(node);
    const AlertDialogContent = () => {
        return (
            <div className="alertDialog">
                <div id="myModal" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">ALERT</h4>
                                <button onClick={onHide} type="button" className="close alertClose" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <p>{message}</p>
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
    }

    ReactDOM.render(<AlertDialogContent />, node);
};

export default AlertDialog