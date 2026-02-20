import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { CourseDetail } from './pages/CourseDetail';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { MyCourses } from './pages/MyCourses';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/course/:id',
    Component: CourseDetail,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/register',
    Component: Register,
  },
  {
    path: '/my-courses',
    Component: MyCourses,
  },
]);