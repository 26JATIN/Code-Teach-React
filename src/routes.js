import { lazy } from 'react';

const Home = lazy(() => import('./pages/home'));
const Courses = lazy(() => import('./pages/Courses/Courses'));

const routes = [
    { path: '/', component: Home },
    { path: '/home', component: Home },
    { path: '/courses', component: Courses },
];

export default routes;
