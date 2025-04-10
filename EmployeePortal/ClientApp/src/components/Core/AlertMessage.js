import React from 'react'
import { Alert } from 'reactstrap'

function AlertMessage(props) {
    const { message, type, visible } = props
    let className
    if (!visible)
        className = "d-none"

    return (
        <div className={'alignCenter ' + className}>
            <div className="col-8">
                <Alert className="txt-center opacity-100" color={type}> {message} </Alert>
            </div>
        </div>
    )
}

export default AlertMessage