import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Pages/Home';
import { Employees } from './components/Pages/Employees';
import { Departments } from './components/Pages/Departments';
import { AddDepartment } from './components/Pages/AddDepartment';
import { AddEmployee } from './components/Pages/AddEmployee';
import { UserProfile } from './components/Pages/UserProfile';
import {NotFoundPage} from './components/Pages/NotFoundPage';
import {ChangePassword} from './components/Pages/ChangePassword';
import './components/css/Global.css';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/Employees' component={Employees} />
                <Route path='/Departments' component={Departments} />
                <Route path='/AddDepartment' component={AddDepartment} /> 
                <Route path='/AddEmployee' component={AddEmployee} /> 
                <Route path='/UserProfile' component={UserProfile} />   
                <Route path='/ChangePassword' component={ChangePassword} /> 
                <Route path='/*' exact={true} component={NotFoundPage} />   
              </Switch>         
            </Layout>
        );
    }
}
