import App from './pages/home';
import Courses from './pages/courses';
import MyLearning from './pages/mylearning';

const routes = [
    { path: '/', component: App, exact: true },
    { path: '/courses', component: Courses },
    { path: '/mylearning', component: MyLearning },
];

export default routes;
