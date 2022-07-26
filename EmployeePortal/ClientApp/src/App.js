import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Core/Layout';
import './components/css/Global.css';
import { RequireAuth } from './components/Helpers/RequireAuth';
import { Logs } from './components/Pages/Admin/Logs';
import { ChangePassword } from './components/Pages/Admin/User/ChangePassword';
import { CreateUser } from './components/Pages/Admin/User/CreateUser';
import { EditUserProfile } from './components/Pages/Admin/User/EditUserProfile';
import { UserProfile } from './components/Pages/Admin/User/UserProfile';
import { Users } from './components/Pages/Admin/User/Users';
import { AddDepartment } from './components/Pages/Department/AddDepartment';
import { Departments } from './components/Pages/Department/Departments';
import { EditDepartment } from './components/Pages/Department/EditDepartment';
import { AddEmployee } from './components/Pages/Employee/AddEmployee';
import { EditEmployee } from './components/Pages/Employee/EditEmployee';
import { Employees } from './components/Pages/Employee/Employees';
import { ErrorPage } from './components/Pages/ErrorPage';
import { Home } from './components/Pages/Home';
import { NotFoundPage } from './components/Pages/NotFoundPage';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Switch>
                    <Route exact={true} path='/' component={Home} />
                    <Route exact={true} path='/Employees' component={RequireAuth(Employees)} />
                    <Route exact={true} path='/Departments' component={RequireAuth(Departments)} />
                    <Route exact={true} path='/AddDepartment' component={RequireAuth(AddDepartment)} />
                    <Route exact={true} path='/EditDepartment' component={RequireAuth(EditDepartment)} />
                    <Route exact={true} path='/AddEmployee' component={RequireAuth(AddEmployee)} />
                    <Route exact={true} path='/EditEmployee' component={RequireAuth(EditEmployee)} />
                    <Route exact={true} path='/UserProfile' component={RequireAuth(UserProfile)} />
                    <Route exact={true} path='/ChangePassword' component={RequireAuth(ChangePassword)} />
                    <Route exact={true} path='/ResetPassword' component={RequireAuth(ChangePassword)} />
                    <Route exact={true} path='/EditUserProfile' component={RequireAuth(EditUserProfile)} />
                    <Route exact={true} path='/CreateUser' component={RequireAuth(CreateUser)} />
                    <Route exact={true} path='/Users' component={RequireAuth(Users)} />
                    <Route exact={true} path='/Logs' component={RequireAuth(Logs)} />
                    <Route exact={true} path='/Error' component={RequireAuth(ErrorPage)} />
                    <Route path='/*' component={NotFoundPage} />
                </Switch>
            </Layout>
        );
    }
}
