import { createBrowserRouter } from 'react-router';
import { Home } from './pages/Home';
import { CourseDetail } from './pages/CourseDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/course/:id',
    Component: CourseDetail,
  },
]);
