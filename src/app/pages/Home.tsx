import { useState } from 'react';
import { Header } from '../components/Header';
import { CategoryFilter } from '../components/CategoryFilter';
import { CourseCard } from '../components/CourseCard';
import { courses } from '../data/courses';
import { BookOpen, Search, X } from 'lucide-react';

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory ? course.categoryId === selectedCategory : true;
    const q = searchQuery.toLowerCase();
    const matchesSearch = q
      ? course.title.toLowerCase().includes(q) ||
        course.category.toLowerCase().includes(q) ||
        course.instructor.toLowerCase().includes(q) ||
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
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
        <div className="container relative mx-auto px-4 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl">
              Aprende habilidades que impulsan tu carrera
            </h1>
            <p className="mb-8 text-xl text-white/90">
              Descubre cursos de programación, diseño, modelado 3D y desarrollo de videojuegos.
            </p>

            {/* Barra de búsqueda en hero */}
            <div className="relative mx-auto max-w-xl">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="¿Qué quieres aprender hoy?"
                className="w-full rounded-2xl border-0 bg-white py-4 pl-14 pr-12 text-gray-900 shadow-2xl text-sm focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
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

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-white">
                <BookOpen className="h-5 w-5" />
                <span className="font-semibold">{courses.length}+ Cursos</span>
              </div>
              <div className="h-1 w-1 rounded-full bg-white/50" />
              <span className="font-semibold text-white">Instrucciones claras</span>
              <div className="h-1 w-1 rounded-full bg-white/50" />
              <span className="font-semibold text-white">Certificados</span>
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
      </div>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-gray-900">EduPlatform</span>
              </div>
              <p className="text-sm text-gray-600">
                De las mejores plataformas para expandir tu conocimiento.
              </p>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Categorías</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Programación</li>
                <li>Diseño</li>
                <li>Diseño 3D</li>
                <li>Videojuegos</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Recursos</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Blog</li>
                <li>Tutoriales</li>
                <li>Documentación</li>
                <li>Comunidad</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Empresa</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Sobre nosotros</li>
                <li>Contacto</li>
                <li>Ayuda</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-gray-600">
            <p>&copy; 2026 YCourse IDGS 7-3</p>
          </div>
        </div>
      </footer>
    </div>
  );
}