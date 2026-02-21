import { useState } from 'react';
import { Header } from '../components/Header';
import { CategoryFilter } from '../components/CategoryFilter';
import { CourseCard } from '../components/CourseCard';
import { useCursos } from '../hooks/useCursos';
import { BookOpen, Search, Sparkles, X } from 'lucide-react';

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { cursos, loading } = useCursos();

  // Mapeamos los campos de la BD a los que espera CourseCard
  const courses = cursos.map(c => ({
    id: c.idCurso,
    title: c.titulo,
    description: c.descripcion ?? '',
    thumbnail: c.imagen_url ?? '',
    category: c.categoria ?? 'General',
    categoryId: c.idCategoria,
    level: c.nivel,
    instructor: 'YouTube',
    rating: 5.0,
    studentsCount: 0,
    duration: `${c.duracion_total} lecciones`,
    price: '',
    lessons: [],
  }));

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory ? course.categoryId === selectedCategory : true;
    const q = searchQuery.toLowerCase();
    const matchesSearch = q
      ? course.title.toLowerCase().includes(q) ||
        course.category.toLowerCase().includes(q) ||
        course.description.toLowerCase().includes(q)
      : true;
    return matchesCategory && matchesSearch;
  });

  const hasFilters = selectedCategory !== null || searchQuery !== '';

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-700 to-blue-400">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />

        <div className="container relative mx-auto px-4 py-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-100 backdrop-blur">
              <Sparkles className="h-4 w-4 text-blue-300" />
              Plataforma de cursos online gratuita
            </div>
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white md:text-7xl">
              Aprende habilidades que impulsan tu carrera
            </h1>
            <p className="mb-10 text-xl text-blue-100/90 leading-relaxed max-w-2xl mx-auto">
              Descubre cursos de programación, diseño, modelado 3D y desarrollo de videojuegos. Aprende gratis y a tu ritmo.
            </p>

            {/* Barra de búsqueda en hero */}
            <div className="relative mx-auto max-w-xl mb-8">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="¿Qué quieres aprender hoy?"
                className="w-full rounded-2xl border-0 bg-white py-4 pl-14 pr-12 text-gray-900 shadow-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-white">
                <BookOpen className="h-5 w-5 text-blue-400" />
                <span className="font-semibold">{courses.length}+ Cursos</span>
              </div>
              <div className="h-1.5 w-1.5 rounded-full bg-blue-400/50" />
              <span className="font-semibold text-white">Instructores expertos</span>
              <div className="h-1.5 w-1.5 rounded-full bg-blue-400/50" />
              <span className="font-semibold text-white">Certificados oficiales</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </div>

      {/* Grid de cursos */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {searchQuery
                ? `Resultados para "${searchQuery}"`
                : selectedCategory
                  ? `Cursos de ${courses.find(c => c.categoryId === selectedCategory)?.category}`
                  : 'Todos los cursos'}
            </h2>
            <p className="mt-1 text-gray-600">
              {filteredCourses.length} curso{filteredCourses.length !== 1 ? 's' : ''} disponible{filteredCourses.length !== 1 ? 's' : ''}
            </p>
          </div>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <X className="h-4 w-4" />
              Limpiar filtros
            </button>
          )}
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mb-4" />
            <p className="text-gray-500">Cargando cursos...</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="py-24 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sin resultados</h3>
                <p className="text-gray-500 mb-6">
                  No encontramos cursos para{' '}
                  {searchQuery ? `"${searchQuery}"` : 'esta categoría'}.
                </p>
                <button
                  onClick={clearFilters}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Ver todos los cursos
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t bg-blue-50/30">
        <div className="container mx-auto px-4 py-16">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-200">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold text-blue-950">EduPlatform</span>
              </div>
              <p className="text-sm text-blue-800/70 leading-relaxed">
                La mejor plataforma para aprender habilidades digitales del futuro con cursos totalmente gratuitos.
              </p>
            </div>
            <div>
              <h3 className="mb-5 font-bold text-blue-950">Categorías</h3>
              <ul className="space-y-3 text-sm text-blue-800/80">
                <li className="hover:text-blue-600 transition-colors cursor-pointer">Programación</li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">Diseño</li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">Diseño 3D</li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">Videojuegos</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-5 font-bold text-blue-950">Recursos</h3>
              <ul className="space-y-3 text-sm text-blue-800/80">
                <li className="hover:text-blue-600 transition-colors cursor-pointer">Blog</li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">Tutoriales</li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">Documentación</li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">Comunidad</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-5 font-bold text-blue-950">Empresa</h3>
              <ul className="space-y-3 text-sm text-blue-800/80">
                <li className="hover:text-blue-600 transition-colors cursor-pointer">Sobre nosotros</li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">Conviértete en instructor</li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">Contacto</li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">Ayuda</li>
              </ul>
            </div>
          </div>
          <div className="mt-16 border-t border-blue-100 pt-8 text-center text-sm text-blue-800/60">
            <p>&copy; {new Date().getFullYear()} EduPlatform. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}