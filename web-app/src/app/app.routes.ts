import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Departments } from './pages/departments/departments';
import { Employee } from './pages/employee/employee';
import { Login } from './pages/login/login';
import { Employeedashboard } from './pages/employeedashboard/employeedashboard';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
    {
        path: '',
        component:Home,
    },
    {
        path:'Employee-Dashboard',
        component:Employeedashboard,
    },
    {
        path:'Department',
        component:Departments,
    },
    {
        path:"Employee",
        component:Employee,
    },
    {
        path:"Login",
        component:Login,
    },
    {
        path:"Profile",
        component:Profile,
    },
];
