import React, { Component } from 'react';
import { Route, Routes } from 'react-router';
import { Layout } from './components/Core/Layout';
import './components/css/Global.css';
import ComponentWrapper from './components/helpers/ComponentWrapper';
import { AuthRoutes } from './components/helpers/RequireAuth';
import { Errors } from './components/Pages/Admin/Errors';
import { Logs } from './components/Pages/Admin/Logs';
import { ChangePassword } from './components/Pages/Admin/user/ChangePassword';
import { CreateUser } from './components/Pages/Admin/user/CreateUser';
import { EditUserProfile } from './components/Pages/Admin/user/EditUserProfile';
import { UserProfile } from './components/Pages/Admin/user/UserProfile';
import { Users } from './components/Pages/Admin/user/Users';
import { AddDepartment } from './components/Pages/department/AddDepartment';
import { Departments } from './components/Pages/department/Departments';
import { EditDepartment } from './components/Pages/department/EditDepartment';
import { AddEditEmployee } from './components/Pages/employee/AddEditEmployee';
import { Employees } from './components/Pages/employee/Employees';
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
