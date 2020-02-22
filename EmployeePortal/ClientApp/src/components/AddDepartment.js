import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Alert } from 'reactstrap';

export class AddDepartment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Name: '',
            Location: '',
            token: localStorage.getItem('myToken') || '',
            successAlert: false,
            errorAlert: false
        }
    }

    handleSubmit = () => {
        if (this.state.Name === '' || this.state.Location === '') {
            
            return this.setState({ errorAlert: true }, () => { console.log(this.state.errorAlert); console.log(this.state.successAlert)})
        }
        fetch('http://employee.service.com/api/Departments', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": 'Bearer ' + this.state.token
            },
            body: JSON.stringify({
                "ID": 0,
                "Name": this.state.Name,
                "Location": this.state.Location
            })

        }).then(res => {
            if (res.ok) {
                this.setState({ successAlert: true })
            } else {
                throw Error(res.statusText);
            }
        }).catch(error => console.error(error));
    }

    handleBack = () => {
        return this.props.history.goBack()
    }

    render() {
        let alertUI;
        const isLoggedIn = localStorage.getItem("myToken");
        console.log("isLoggedIn:" + isLoggedIn)
        if (!isLoggedIn)
            return <Redirect to='/' />
        if (this.state.successAlert)
            alertUI = <div className="col-sm-5 col-5 col-md-5 col-lg-8" style={{ marginTop: "75px" }}> <Alert style={{opacity:"100%"}} color="success"> Department has been added successfully. </Alert></div>
        if (this.state.errorAlert)
            alertUI = <div className="col-sm-5 col-5 col-md-5 col-lg-8" style={{ marginTop: "75px" }}> <Alert style={{ opacity: "100%" }} color="danger"> Name and Location fields cannot be empty. </Alert></div>
        return (
            <div>
            <div className="container border">

                <div><h5>Add Department </h5></div>

                <div className="col-4">
                    <div className="row">
                        <div>
                            <label style={{ marginRight: "53px" }} className="mt-1 mb-1">Name</label>
                        </div>
                        <div>
                            <input value={this.state.Name} onChange={(e) => { this.setState({ Name: e.target.value, successAlert: false, errorAlert: false }) }} className="mt-1" type="text">
                            </input>
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <label style={{ marginRight: "35px" }} className="mt-1 mb-1">Location</label>
                        </div>
                        <div>
                            <input value={this.state.Location} onChange={(e) => { this.setState({ Location: e.target.value, successAlert: false, errorAlert: false }) }} className="mt-1" type="text">
                            </input>
                        </div>
                    </div>
                    <div className="row mt-1 mr-lg-5 float-lg-right">
                        <p>
                            <input className="mr-lg-1 btn btn-success btn-md" onClick={this.handleSubmit} type="button" value="Submit"/>
                            <input className="mr-lg-1 btn bg-dark text-white btn-md" onClick={this.handleBack} type="button" value="Back"/>
                        </p>
                    </div>
                </div>  
            </div>
            {alertUI}
            </div>
        )
    }
}

export default AddDepartment
