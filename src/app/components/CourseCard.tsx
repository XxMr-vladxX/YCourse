import { Link } from 'react-router';
import { Star, Users, Clock, TrendingUp } from 'lucide-react';
import { Course, categories } from '../data/courses';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const category = categories.find(c => c.id === course.categoryId);
  
  return (
    <Link to={`/course/${course.id}`} className="group">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:shadow-xl hover:-translate-y-1 hover:border-gray-300">
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3">
            <span
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white shadow-lg"
              style={{ backgroundColor: category?.color }}
            >
              {course.category}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-700 shadow-lg backdrop-blur">
              {course.level}
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {course.title}
          </h3>
          
          <p className="mb-4 line-clamp-2 text-sm text-gray-600">
            {course.description}
          </p>

          <div className="mb-4 flex items-center gap-1 text-sm text-gray-600">
            <span className="font-medium text-gray-900">{course.instructor}</span>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-900">{course.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{course.studentsCount.toLocaleString()} estudiantes</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900">{course.price}</span>
              {course.studentsCount > 10000 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                  <TrendingUp className="h-3 w-3" />
                  Popular
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
