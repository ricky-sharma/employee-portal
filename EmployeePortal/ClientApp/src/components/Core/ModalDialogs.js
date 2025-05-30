import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { createRoot } from 'react-dom/client';
import '../css/Alert.css';

let IsConfirmDialog = false
let YesCallback = undefined
let NoCallback = undefined

export function ConfirmDialog(message, heading = '', yesCallback = () => { }, noCallback = () => { }, maxWidth = false) {
    IsConfirmDialog = true
    YesCallback = yesCallback
    NoCallback = noCallback
    AlertDialog(message, null, heading, maxWidth)
}

function AlertDialog(message, callback = () => { }, heading = '', maxWidth = false) {
    if (document.getElementsByClassName('alertDialog').length === 0) {
        let node = document.createElement("div");
        const root = createRoot(node);
        var alertDialogDiv = document.getElementById('alertDialogDiv')
        alertDialogDiv.innerHTML = '';
        alertDialogDiv?.appendChild(node);
        let AlertDialogContent = () => {
            return (
                <>
                    <div className="backdrop"></div>
                    <div className="alertDialog">
                        <div role="dialog">
                            <div className={"modal-dialog " + (maxWidth ? "modal-dialog-width" : "")}>
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">{heading !== '' ? heading : 'ALERT'}</h4>
                                        <button onClick={onHide} type="button" className="close alertClose" data-dismiss="modal">&times;</button>
                                    </div>
                                    <div className="modal-body">
                                        {typeof (message) === 'function' ? message() : <p>{message}</p>}
                                    </div>
                                    <div className="modal-footer">
                                        {
                                            IsConfirmDialog === false ?
                                                (<button onClick={onHide} type="button" className="btn btn-default btn-secondary" data-dismiss="modal">Close</button>) :
                                                (<>
                                                    <button onClick={onNo} type="button" className="btn btn-default btn-secondary px-4" data-dismiss="modal">No</button>
                                                    <button onClick={onYes} type="button" className="btn btn-default mb-1 btn-success px-4" data-dismiss="modal">Yes</button>
                                                </>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        };

        let onNo = () => {

            if (NoCallback !== null && NoCallback !== undefined) {
                NoCallback();
            }
            onHide()
            resetConfirmDialog()
        }

        let onYes = () => {
            onHide()
            if (YesCallback !== null && YesCallback !== undefined) {
                YesCallback();
            }
            onHide()
            resetConfirmDialog()
        }

        let resetConfirmDialog = () => {
            IsConfirmDialog = false
            YesCallback = undefined
            NoCallback = undefined
        }

        let onHide = () => {
            root.unmount(node);
            node.remove();
            if (callback !== null && callback !== undefined) {
                callback();
            }
        }

        root.render(<AlertDialogContent />);
    }
};

export default AlertDialog