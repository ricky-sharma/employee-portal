import React from 'react'
import { Alert } from 'reactstrap'

function AlertMessage(props) {
    const { message, type, visible } = props
    let className
    if (!visible)
        className = "d-none"

    return (
        <div className={className}>
            <div className="col-lg-2"></div>
            <div className="col-12 col-lg-8 margin-top-75">
                <Alert className="txt-center opacity-100" color={type}> {message} </Alert>
            </div>
        </div>
    )
}

export default AlertMessage