import React, { Component } from 'react';
import { Route, Routes } from 'react-router';
import { Layout } from './components/Core/Layout';
import './components/css/Global.css';
import { AuthRoutes } from './components/Helpers/RequireAuth';
import ComponentWrapper from './components/Helpers/ComponentWrapper';
import { Errors } from './components/Pages/Admin/Errors';
import { Logs } from './components/Pages/Admin/Logs';
import { ChangePassword } from './components/Pages/Admin/User/ChangePassword';
import { CreateUser } from './components/Pages/Admin/User/CreateUser';
import { EditUserProfile } from './components/Pages/Admin/User/EditUserProfile';
import { UserProfile } from './components/Pages/Admin/User/UserProfile';
import { Users } from './components/Pages/Admin/User/Users';
import { AddDepartment } from './components/Pages/Department/AddDepartment';
import { Departments } from './components/Pages/Department/Departments';
import { EditDepartment } from './components/Pages/Department/EditDepartment';
import { AddEditEmployee } from './components/Pages/Employee/AddEditEmployee';
import { Employees } from './components/Pages/Employee/Employees';
import { ErrorPage } from './components/Pages/ErrorPage';
import { Home } from './components/Pages/Home';
import { NotFoundPage } from './components/Pages/NotFoundPage';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Routes>
                    <Route exact={true} path='/' element={<ComponentWrapper component={Home} />} />
                    <Route element={<AuthRoutes />}>
                        <Route exact={true} path='/Employees' element={<ComponentWrapper component={Employees} />} />
                        <Route exact={true} path='/Departments' element={<ComponentWrapper component={Departments} />} />
                        <Route exact={true} path='/AddDepartment' element={<ComponentWrapper component={AddDepartment} />} />
                        <Route exact={true} path='/EditDepartment' element={<ComponentWrapper component={EditDepartment} />} />
                        <Route exact={true} path='/AddEmployee' element={<ComponentWrapper component={AddEditEmployee} />} />
                        <Route exact={true} path='/EditEmployee' element={<ComponentWrapper component={AddEditEmployee} />} />
                        <Route exact={true} path='/UserProfile' element={<ComponentWrapper component={UserProfile} />} />
                        <Route exact={true} path='/ChangePassword' element={<ComponentWrapper component={ChangePassword} />} />
                        <Route exact={true} path='/ResetPassword' element={<ComponentWrapper component={ChangePassword} />} />
                        <Route exact={true} path='/EditUser' element={<ComponentWrapper component={EditUserProfile} />} />
                        <Route exact={true} path='/CreateUser' element={<ComponentWrapper component={CreateUser} />} />
                        <Route exact={true} path='/Users' element={<ComponentWrapper component={Users} />} />
                        <Route exact={true} path='/Logs' element={<ComponentWrapper component={Logs} />} />
                        <Route exact={true} path='/Errors' element={<ComponentWrapper component={Errors} />} />
                        <Route exact={true} path='/Error' element={<ComponentWrapper component={ErrorPage} />} />
                    </Route>
                    <Route path='/*' element={<ComponentWrapper component={NotFoundPage} />} />
                </Routes>
            </Layout>
        );
    }
}
