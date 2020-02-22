import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Select from 'react-select';

export class AddEmployee extends Component {
    constructor(props) {
        super(props)
    
        this.state = {  
            token: localStorage.getItem('myToken') || '',
            DepartmentOptions:[]
         }  
    }
    
    componentDidMount = () => {
        fetch('http://employee.service.com/api/Departments', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": 'Bearer ' + this.state.token
            },

        }).then(res => {
            if (res.ok) {
                console.log("res:" + res)
                return res.json();
            } else {
                throw Error(res.statusText);
            }
        }).then(json => {
            const departments = json.map((dep ,index) => <option key={index+1} value={dep.ID}>{dep.Name} ({dep.Location}) </option>)
            this.setState({ DepartmentOptions: departments}, () => {
                console.log("departmentData:" + this.state.departments)
               
            })

        }).catch(error => console.error(error));
    }
    
    render() {    
        const GenderOptions = [<option key="1" value= "Male">Male</option>, <option key="2" value="Female">Female</option>];    
        const isLoggedIn = localStorage.getItem("myToken");
        console.log("isLoggedIn:" + isLoggedIn)
        if (!isLoggedIn)
            return <Redirect to='/' />
        return (          

            <div>
                <div className="container border">
                    <h4 className="mt-2 mb-5"><b>Add Employee</b></h4>                    
                    <div className="row  p-2"><div className="col-4"><label>First name</label></div><input type="text"></input></div>
                    <div className="row  p-2"><div className="col-4"><label>Last name</label></div><input type="text"></input></div>
                    <div className="row  p-2">
                    <div className="col-4"><label>Gender</label></div>
                    <select className="select-width"><option  key="0" value="select">Select</option>{GenderOptions}</select></div>
                    <div className="row  p-2"><div className="col-4"><label>Salary</label></div><input type="text"></input></div>
                    <div className="row  p-2"><div className="col-4"><label>Department</label></div><select><option key="0"  value="select">Select</option>{this.state.DepartmentOptions}</select></div>
                    <div className="row  p-2"><div className="col-4"><label>Job Title</label></div><input type="text"></input></div>
                    <div className="row p-2"><div className="col-4"></div><input className="btn btn-success mr-1" value="Submit" onClick={this.handleSubmit} type="button"></input>
                   <input className="mr-lg-1 btn bg-dark text-white btn-md" onClick={this.handleBack} type="button" value="Back"/></div>
                </div>
            </div>
        )
    }
}

export default AddEmployee
