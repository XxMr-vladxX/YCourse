import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { Header } from '../components/Header';
import { courses, categories } from '../data/courses';
import { 
  Star, 
  Users, 
  Clock, 
  PlayCircle, 
  CheckCircle, 
  ChevronLeft,
  Award,
  Globe,
  Smartphone,
  Download,
  BookOpen
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function CourseDetail() {
  const { id } = useParams();
  const course = courses.find(c => c.id === Number(id));
  const [expandedLessons, setExpandedLessons] = useState(true);

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
  const completedLessons = course.lessons.filter(l => l.completed).length;
  const progressPercentage = (completedLessons / course.lessons.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
            <ChevronLeft className="h-4 w-4" />
            Volver a cursos
          </Link>
        </div>
      </div>

      {/* Course Header */}
      <div 
        className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800"
        style={{
          background: category ? `linear-gradient(135deg, ${category.color}dd, ${category.color}99)` : undefined
        }}
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="container relative mx-auto px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-semibold text-white backdrop-blur">
                  {course.category}
                </span>
              </div>
              <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                {course.title}
              </h1>
              <p className="mb-6 text-lg text-white/90">
                {course.description}
              </p>
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

            <div className="lg:col-span-1">
              <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="relative aspect-video bg-gray-100">
                  <ImageWithFallback
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-transform hover:scale-110">
                      <PlayCircle className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-6 text-center">
                  </div>
                  <Button className="w-full mb-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    Inscribirse ahora
                  </Button>
                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Award className="h-5 w-5 text-green-600" />
                      <span>Certificado de finalización</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Globe className="h-5 w-5 text-blue-600" />
                      <span>Acceso en cualquier dispositivo</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Smartphone className="h-5 w-5 text-purple-600" />
                      <span>Compatible con móviles</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Download className="h-5 w-5 text-orange-600" />
                      <span>Recursos descargables</span>
                    </div>
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
            {/* What you'll learn */}
            <div className="mb-8 rounded-2xl border bg-white p-8">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Lo que aprenderás</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-600" />
                  <span className="text-gray-700">Dominar las tecnologías fundamentales</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-600" />
                  <span className="text-gray-700">Crear proyectos profesionales</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-600" />
                  <span className="text-gray-700">Mejores prácticas de la industria</span>
                </div>
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-600" />
                  <span className="text-gray-700">Técnicas avanzadas y optimización</span>
                </div>
              </div>
            </div>

            {/* Course Content/Lessons */}
            <div className="rounded-2xl border bg-white p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Contenido del curso</h2>
                <button
                  onClick={() => setExpandedLessons(!expandedLessons)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {expandedLessons ? 'Contraer todo' : 'Expandir todo'}
                </button>
              </div>

              {progressPercentage > 0 && (
                <div className="mb-6 rounded-xl bg-gray-50 p-4">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">Tu progreso</span>
                    <span className="text-gray-600">
                      {completedLessons} de {course.lessons.length} lecciones
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <div className="mt-1 text-right text-sm text-gray-600">
                    {Math.round(progressPercentage)}%
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {course.lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="group rounded-lg border border-gray-200 bg-gray-50 p-4 transition-all hover:bg-gray-100 hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-semibold text-gray-700 shadow-sm">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 group-hover:text-blue-600">
                            {lesson.title}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <PlayCircle className="h-4 w-4" />
                              {lesson.duration}
                            </span>
                            {lesson.completed && (
                              <span className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="h-4 w-4" />
                                Completada
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                        Ver
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
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

            {/* Course Info */}
            <div className="rounded-2xl border bg-white p-6">
              <h3 className="mb-4 text-lg font-bold text-gray-900">Información del curso</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nivel:</span>
                  <span className="font-medium text-gray-900">{course.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duración:</span>
                  <span className="font-medium text-gray-900">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lecciones:</span>
                  <span className="font-medium text-gray-900">{course.lessons.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Categoría:</span>
                  <span className="font-medium text-gray-900">{course.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estudiantes:</span>
                  <span className="font-medium text-gray-900">{course.studentsCount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
