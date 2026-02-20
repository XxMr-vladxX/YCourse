import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { courses, categories } from '../data/courses';
import {
  Star,
  Clock,
  PlayCircle,
  CheckCircle,
  ChevronLeft,
  Award,
  Globe,
  Smartphone,
  Download,
  BookOpen,
  Trophy,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import {
  isEnrolled,
  enrollCourse,
  toggleLessonComplete,
  isLessonCompleted,
} from '../lib/enrollment';

export function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === Number(id));

  const [enrolled, setEnrolled] = useState(false);
  const [completedMap, setCompletedMap] = useState<Record<number, boolean>>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [justEnrolled, setJustEnrolled] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('ycourse_user');
    setIsLoggedIn(!!user);

    if (course) {
      setEnrolled(isEnrolled(course.id));
      const map: Record<number, boolean> = {};
      course.lessons.forEach(l => {
        map[l.id] = isLessonCompleted(course.id, l.id);
      });
      setCompletedMap(map);
    }
  }, [course]);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Curso no encontrado</h1>
          <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const category = categories.find(c => c.id === course.categoryId);
  const completedCount = Object.values(completedMap).filter(Boolean).length;
  const progressPercentage = (completedCount / course.lessons.length) * 100;

  const handleEnroll = () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    enrollCourse(course.id);
    setEnrolled(true);
    setJustEnrolled(true);
    setTimeout(() => setJustEnrolled(false), 3000);
  };

  const handleToggleLesson = (lessonId: number) => {
    if (!enrolled) return;
    toggleLessonComplete(course.id, lessonId);
    setCompletedMap(prev => ({ ...prev, [lessonId]: !prev[lessonId] }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
            <ChevronLeft className="h-4 w-4" />
            Volver a cursos
          </Link>
          {enrolled && (
            <Link to="/my-courses" className="text-sm font-medium text-blue-600 hover:underline">
              Ver mis cursos →
            </Link>
          )}
        </div>
      </div>

      {/* Notificación de inscripción */}
      {justEnrolled && (
        <div className="bg-green-500 text-white text-center py-3 text-sm font-medium animate-pulse">
          🎉 ¡Te has inscrito exitosamente! Ya puedes marcar tu progreso en las lecciones.
        </div>
      )}

      {/* Course Header */}
      <div
        className="relative overflow-hidden"
        style={{
          background: category
            ? `linear-gradient(135deg, ${category.color}dd, ${category.color}99)`
            : 'linear-gradient(135deg, #1e3a5f, #2d1b69)',
        }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />

        <div className="container relative mx-auto px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-semibold text-white backdrop-blur">
                  {course.category}
                </span>
              </div>
              <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">{course.title}</h1>
              <p className="mb-6 text-lg text-white/90">{course.description}</p>
              <div className="flex flex-wrap items-center gap-6 text-white">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-white/80">({course.studentsCount.toLocaleString()} estudiantes)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{course.duration} de contenido</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span>{course.lessons.length} lecciones</span>
                </div>
              </div>
              <div className="mt-4 text-white/90">
                Instructor: <span className="font-semibold text-white">{course.instructor}</span>
              </div>
            </div>

            {/* Card lateral */}
            <div className="lg:col-span-1">
              <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="relative aspect-video bg-gray-100">
                  <ImageWithFallback
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 backdrop-blur">
                      <PlayCircle className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  {enrolled ? (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span className="font-medium">Tu progreso</span>
                        <span>{completedCount}/{course.lessons.length} lecciones</span>
                      </div>
                      <Progress
                        value={progressPercentage}
                        className="h-3 [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-purple-500"
                      />
                      <div className="text-right text-sm font-semibold text-gray-700 mt-1">
                        {Math.round(progressPercentage)}%
                      </div>
                      {progressPercentage === 100 && (
                        <div className="mt-3 flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-green-700">
                          <Trophy className="h-5 w-5 text-yellow-500" />
                          <span className="text-sm font-semibold">¡Curso completado!</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Button
                      onClick={handleEnroll}
                      className="w-full mb-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      {isLoggedIn ? 'Inscribirse ahora' : 'Inicia sesión para inscribirte'}
                    </Button>
                  )}

                  <div className="mt-4 space-y-3 text-sm">
                    {[
                      { icon: Award, color: 'text-green-600', label: 'Certificado de finalización' },
                      { icon: Globe, color: 'text-blue-600', label: 'Acceso en cualquier dispositivo' },
                      { icon: Smartphone, color: 'text-purple-600', label: 'Compatible con móviles' },
                      { icon: Download, color: 'text-orange-600', label: 'Recursos descargables' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-gray-700">
                        <item.icon className={`h-5 w-5 ${item.color}`} />
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {/* Lo que aprenderás */}
            <div className="mb-8 rounded-2xl border bg-white p-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Lo que aprenderás</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  'Dominar las tecnologías fundamentales',
                  'Crear proyectos profesionales',
                  'Mejores prácticas de la industria',
                  'Técnicas avanzadas y optimización',
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-600" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lecciones */}
            <div className="rounded-2xl border bg-white p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Contenido del curso</h2>
                <span className="text-sm text-gray-500">
                  {completedCount} de {course.lessons.length} completadas
                </span>
              </div>

              {enrolled && progressPercentage > 0 && (
                <div className="mb-6 rounded-xl bg-gray-50 p-4">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">Tu progreso</span>
                    <span className="text-gray-600">{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              )}

              <div className="space-y-2">
                {course.lessons.map((lesson, index) => {
                  const completed = completedMap[lesson.id];
                  return (
                    <div
                      key={lesson.id}
                      onClick={() => handleToggleLesson(lesson.id)}
                      className={`group rounded-xl border p-4 transition-all ${
                        enrolled
                          ? 'cursor-pointer hover:shadow-md'
                          : 'cursor-default opacity-80'
                      } ${
                        completed
                          ? 'border-green-200 bg-green-50'
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold shadow-sm ${
                            completed
                              ? 'bg-green-500 text-white'
                              : 'bg-white text-gray-700'
                          }`}>
                            {completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
                          </div>
                          <div>
                            <div className={`font-medium ${completed ? 'text-green-800 line-through' : 'text-gray-900'}`}>
                              {lesson.title}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <PlayCircle className="h-3.5 w-3.5" />
                              {lesson.duration}
                            </div>
                          </div>
                        </div>
                        {enrolled && (
                          <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                            completed
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-200 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600'
                          }`}>
                            {completed ? 'Completada' : 'Marcar'}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {!enrolled && (
                <div className="mt-6 rounded-xl bg-blue-50 border border-blue-100 px-5 py-4 text-center">
                  <p className="text-sm text-blue-700">
                    <span className="font-semibold">Inscríbete</span> para marcar tu progreso en las lecciones.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            {/* Instructor */}
            <div className="mb-6 rounded-2xl border bg-white p-6">
              <h3 className="mb-4 text-lg font-bold text-gray-900">Sobre el instructor</h3>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-2xl font-bold text-white">
                  {course.instructor.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{course.instructor}</div>
                  <div className="text-sm text-gray-600">Instructor profesional</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-700">
                Experto en {course.category.toLowerCase()} con más de 10 años de experiencia en la industria.
              </p>
            </div>

            {/* Info del curso */}
            <div className="rounded-2xl border bg-white p-6">
              <h3 className="mb-4 text-lg font-bold text-gray-900">Información del curso</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Nivel', value: course.level },
                  { label: 'Duración', value: course.duration },
                  { label: 'Lecciones', value: course.lessons.length },
                  { label: 'Categoría', value: course.category },
                  { label: 'Estudiantes', value: course.studentsCount.toLocaleString() },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-gray-600">{item.label}:</span>
                    <span className="font-medium text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}