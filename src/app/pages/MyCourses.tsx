import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { courses } from '../data/courses';
import { getEnrolledCourses, getEnrolledCourseIds } from '../lib/enrollment';
import {
  BookOpen,
  PlayCircle,
  CheckCircle,
  Clock,
  Trophy,
  TrendingUp,
  ChevronRight,
  GraduationCap,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function MyCourses() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [enrolledIds, setEnrolledIds] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('ycourse_user');
    if (!stored) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(stored));
    setEnrolledIds(getEnrolledCourseIds());
  }, []);

  const enrolledCourses = courses.filter(c => enrolledIds.includes(c.id));
  const enrolledData = getEnrolledCourses();

  const getProgress = (courseId: number) => {
    const data = enrolledData[courseId];
    if (!data) return 0;
    const course = courses.find(c => c.id === courseId);
    if (!course) return 0;
    return Math.round((data.completedLessons.length / course.lessons.length) * 100);
  };

  const getCompletedLessons = (courseId: number) => {
    const data = enrolledData[courseId];
    return data ? data.completedLessons.length : 0;
  };

  const completedCourses = enrolledCourses.filter(c => getProgress(c.id) === 100);
  const inProgressCourses = enrolledCourses.filter(c => getProgress(c.id) > 0 && getProgress(c.id) < 100);
  const notStartedCourses = enrolledCourses.filter(c => getProgress(c.id) === 0);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
        <div className="container relative mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Mis Cursos
              </h1>
              <p className="text-white/80 text-lg">
                Hola, <span className="font-semibold text-white">{user.name}</span>. Continúa aprendiendo.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-4 flex-wrap">
              {[
                { label: 'Inscritos', value: enrolledCourses.length, icon: BookOpen },
                { label: 'En progreso', value: inProgressCourses.length, icon: TrendingUp },
                { label: 'Completados', value: completedCourses.length, icon: Trophy },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/15 backdrop-blur rounded-2xl px-5 py-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/70">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Sin cursos */}
        {enrolledCourses.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 mb-6">
              <GraduationCap className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Aún no tienes cursos</h2>
            <p className="text-gray-500 mb-8 max-w-sm">
              Explora nuestro catálogo e inscríbete en el curso que más te interese.
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" asChild>
              <Link to="/">Explorar cursos</Link>
            </Button>
          </div>
        )}

        {/* En progreso */}
        {inProgressCourses.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              En progreso
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {inProgressCourses.map(course => (
                <CourseProgressCard
                  key={course.id}
                  course={course}
                  progress={getProgress(course.id)}
                  completedLessons={getCompletedLessons(course.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* No iniciados */}
        {notStartedCourses.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <PlayCircle className="h-5 w-5 text-purple-600" />
              Sin empezar
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {notStartedCourses.map(course => (
                <CourseProgressCard
                  key={course.id}
                  course={course}
                  progress={0}
                  completedLessons={0}
                />
              ))}
            </div>
          </section>
        )}

        {/* Completados */}
        {completedCourses.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Completados
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {completedCourses.map(course => (
                <CourseProgressCard
                  key={course.id}
                  course={course}
                  progress={100}
                  completedLessons={course.lessons.length}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function CourseProgressCard({
  course,
  progress,
  completedLessons,
}: {
  course: any;
  progress: number;
  completedLessons: number;
}) {
  return (
    <Link to={`/course/${course.id}`} className="group block">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:shadow-xl hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          <ImageWithFallback
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {progress === 100 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-lg">
                <Trophy className="h-7 w-7 text-white" />
              </div>
            </div>
          )}
          {progress === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 backdrop-blur">
                <PlayCircle className="h-7 w-7 text-blue-600" />
              </div>
            </div>
          )}
        </div>

        <div className="p-5">
          <h3 className="mb-1 line-clamp-2 font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-gray-500 mb-4">{course.instructor}</p>

          {/* Progress bar */}
          <div className="mb-2">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{completedLessons} de {course.lessons.length} lecciones</span>
              <span className="font-semibold text-gray-700">{progress}%</span>
            </div>
            <Progress
              value={progress}
              className={`h-2 ${progress === 100 ? '[&>div]:bg-green-500' : '[&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-purple-500'}`}
            />
          </div>

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3.5 w-3.5" />
              <span>{course.duration}</span>
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:gap-2 transition-all">
              {progress === 0 ? 'Comenzar' : progress === 100 ? 'Repasar' : 'Continuar'}
              <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}