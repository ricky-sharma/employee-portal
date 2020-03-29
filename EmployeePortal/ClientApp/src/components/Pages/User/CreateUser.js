import React, { Component } from 'react'
import { Container } from 'reactstrap';
import { Redirect } from 'react-router-dom'

export class CreateUser extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    

    render() {
        const isLoggedIn = localStorage.getItem("myToken");
        if (!isLoggedIn)
            return <Redirect to='/' />

        return (
            <div>
                  <Container className="border">

                  </Container>                
            </div>
        )
    }
}

export default CreateUser
