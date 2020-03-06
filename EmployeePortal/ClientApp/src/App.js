import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Pages/Home';
import { Employees } from './components/Pages/Employee/Employees';
import { Departments } from './components/Pages/Department/Departments';
import { AddDepartment } from './components/Pages/Department/AddDepartment';
import { EditDepartment } from './components/Pages/Department/EditDepartment';
import { AddEmployee } from './components/Pages/Employee/AddEmployee';
import { EditEmployee } from './components/Pages/Employee/EditEmployee';
import { UserProfile } from './components/Pages/User/UserProfile';
import { NotFoundPage } from './components/Pages/NotFoundPage';
import { ChangePassword } from './components/Pages/User/ChangePassword';
import { EditUserProfile } from './components/Pages/User/EditUserProfile';
import './components/css/Global.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact={true} path='/' component={Home} />
          <Route exact={true} path='/Employees' component={Employees} />
          <Route exact={true} path='/Departments' component={Departments} />
          <Route exact={true} path='/AddDepartment' component={AddDepartment} />
          <Route exact={true} path='/EditDepartment' component={EditDepartment} />
          <Route exact={true} path='/AddEmployee' component={AddEmployee} />
          <Route exact={true} path='/EditEmployee' component={EditEmployee} />
          <Route exact={true} path='/UserProfile' component={UserProfile} />
          <Route exact={true} path='/ChangePassword' component={ChangePassword} />
          <Route exact={true} path='/EditUserProfile' component={EditUserProfile} />
          <Route path='/*' component={NotFoundPage} />
        </Switch>
      </Layout>
    );
  }
}
