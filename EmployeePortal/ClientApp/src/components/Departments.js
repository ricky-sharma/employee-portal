import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './css/Table.css'

export class Departments extends Component {
    constructor(props) {
        super(props)

        this.state = {
            token: localStorage.getItem('myToken') || '',
            departmentData: [],
            keys: []
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
            this.setState({ departmentData: json, keys: Object.keys(json[0]) }, () => {
                console.log("departmentData:" + this.state.departmentData)
            })

        }).catch(error => console.error(error));
    }

    renderTableData() {
        return this.state.departmentData.map((department, index) => {
            const { ID, Name, Location } = department //destructuring
            return (
                <tr key={index}>
                    <td>{ID}</td>
                    <td>{Name}</td>
                    <td>{Location}</td>
                    <td>                        
                    <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>                       
                </td>
                </tr>
            )
        })
    }

    renderTableHeader() {
        let header = this.state.keys
        header.push(...[''])
        console.log("header:" + header)
        return header.map((key, index) => {
            if(key==='')
            {
                return <th key={index}></th>
            }
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    handleAddDepartment =() =>{
        this.props.history.push('/AddDepartment')
    }

    render() {
        const isLoggedIn = localStorage.getItem("myToken");
        if (!isLoggedIn)
            return <Redirect to='/' />

        return ( <div class="container">
        <div class="table-wrapper">
            <div class="table-title">
                <div class="row">
                    <div class="col-sm-8"><h2>Department <b>Details</b></h2></div>
                    <div class="col-sm-4">
                        <button type="button" onClick={this.handleAddDepartment} class="btn btn-success add-new"><i class="fa fa-plus"></i> Add New</button>
                    </div>
                </div>
            </div>
            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr className="bg-secondary">
                        {this.renderTableHeader()}   
                    </tr>
                </thead>
                <tbody>
                       {this.renderTableData()}              
                </tbody>
            </table>
        </div>
    </div> )
    }
}

export default Departments
