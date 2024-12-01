import Home from './pages/home';
import Courses from './pages/Courses/Courses';

const routes = [
    { path: '/', component: Home, exact: true }, // Use Home for the main path
    { path: '/home', component: Home }, // '/home' should also point to Home if needed
    { path: '/courses', component: Courses }, // Keep Courses as it is
];

export default routes;
