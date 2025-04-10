import React, { Component } from 'react';
import { Route, Routes } from 'react-router';
import { Layout } from './components/Core/Layout';
import './components/css/Global.css';
import { RequireAuth, AuthRoutes } from './components/Helpers/RequireAuth';
import { ApplicationErrors } from './components/Pages/Admin/ApplicationErrors';
import { ApplicationLogs } from './components/Pages/Admin/ApplicationLogs';
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
                    <Route exact={true} path='/' element={<Home />} />
                    <Route element={<AuthRoutes />}>
                        <Route exact={true} path='/Employees' element={<Employees />} />
                        <Route exact={true} path='/Departments' element={<Departments />} />
                        <Route exact={true} path='/AddDepartment' element={<AddDepartment />} />
                        <Route exact={true} path='/EditDepartment' element={<EditDepartment />} />
                        <Route exact={true} path='/AddEmployee' element={<AddEditEmployee />} />
                        <Route exact={true} path='/EditEmployee' element={<AddEditEmployee />} />
                        <Route exact={true} path='/UserProfile' element={<UserProfile />} />
                        <Route exact={true} path='/ChangePassword' element={<ChangePassword />} />
                        <Route exact={true} path='/ResetPassword' element={<ChangePassword />} />
                        <Route exact={true} path='/EditUser' element={<EditUserProfile />} />
                        <Route exact={true} path='/CreateUser' element={<CreateUser />} />
                        <Route exact={true} path='/Users' element={<Users />} />
                        <Route exact={true} path='/ApplicationLogs' element={<ApplicationLogs />} />
                        <Route exact={true} path='/ApplicationErrors' element={<ApplicationErrors />} />
                        <Route exact={true} path='/Error' element={<ErrorPage />} />
                    </Route>
                    <Route path='/*' element={<NotFoundPage />} />
                </Routes>
            </Layout>
        );
    }
}
