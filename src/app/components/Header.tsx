import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  GraduationCap,
  Search,
  User,
  Menu,
  X,
  LogOut,
  ChevronDown,
  BookOpen,
  Home,
  Trophy,
} from 'lucide-react';
import { Button } from './ui/button';
import { useCursos } from '../hooks/useCursos';

export function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Búsqueda
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { cursos } = useCursos();

  // Mapear cursos de BD al formato de búsqueda
  const courses = cursos.map(c => ({
    id: c.idCurso,
    title: c.titulo,
    category: c.categoria ?? 'General',
    instructor: 'YouTube',
  }));

  useEffect(() => {
    const stored = localStorage.getItem('ycourse_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Bloquear scroll con menú móvil abierto
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Lógica de búsqueda
  useEffect(() => {
    if (!query.trim()) { setSearchResults([]); return; }
    const q = query.toLowerCase();
    const results = courses.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
    ).slice(0, 5);
    setSearchResults(results);
  }, [query, cursos]);

  const handleLogout = () => {
    localStorage.removeItem('ycourse_user');
    setUser(null);
    setDropdownOpen(false);
    setMobileOpen(false);
    navigate('/');
  };

  const handleSelectResult = (id: number) => {
    setQuery('');
    setSearchResults([]);
    setSearchFocused(false);
    setMobileOpen(false);
    navigate(`/course/${id}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) handleSelectResult(searchResults[0].id);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between gap-4">

            {/* Logo — estilo de tu compañero */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0" onClick={() => setMobileOpen(false)}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-200">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-extrabold text-blue-950">
                EduPlatform
              </span>
            </Link>

            {/* Búsqueda desktop */}
            <div ref={searchRef} className="hidden md:flex flex-1 max-w-xl relative">
              <form onSubmit={handleSearchSubmit} className="w-full">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
                  <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    placeholder="Buscar cursos..."
                    className="w-full rounded-xl border border-blue-100 bg-blue-50/30 py-2.5 pl-11 pr-4 text-sm font-medium text-blue-900 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => { setQuery(''); setSearchResults([]); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </form>

              {/* Resultados */}
              {searchFocused && query && (
                <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-blue-100 bg-white shadow-2xl overflow-hidden z-50">
                  {searchResults.length > 0 ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs text-gray-400 font-medium">
                          {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} para "{query}"
                        </p>
                      </div>
                      {searchResults.map(course => (
                        <button
                          key={course.id}
                          onClick={() => handleSelectResult(course.id)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left"
                        >
                          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                            <BookOpen className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{course.title}</p>
                            <p className="text-xs text-gray-500">{course.category}</p>
                          </div>
                        </button>
                      ))}
                    </>
                  ) : (
                    <div className="px-4 py-6 text-center">
                      <p className="text-sm text-gray-500">Sin resultados para <span className="font-semibold">"{query}"</span></p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Acciones desktop */}
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              <Button variant="ghost" className="font-bold text-blue-900/70 hover:text-blue-600 hover:bg-blue-50">
                Explorar
              </Button>

              {user ? (
                <>
                  <Button variant="ghost" className="font-bold text-blue-900/70 hover:text-blue-600 hover:bg-blue-50" asChild>
                    <Link to="/my-courses">Mis Cursos</Link>
                  </Button>

                  {/* Dropdown usuario */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-3 py-2 text-sm font-bold text-blue-900/70 hover:bg-blue-50 transition-all"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-md shadow-blue-200">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span>{user.name}</span>
                      <ChevronDown className={`h-4 w-4 text-blue-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-52 rounded-xl border border-blue-100 bg-white shadow-xl py-1 z-50">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-xs text-gray-400">Conectado como</p>
                          <p className="text-sm font-semibold text-gray-900 truncate">{user.email}</p>
                        </div>
                        <Link
                          to="/my-courses"
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-blue-900/70 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          <Trophy className="h-4 w-4 text-blue-500" />
                          Mis Cursos
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          Cerrar sesión
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Button variant="outline" className="font-bold border-blue-100 text-blue-700 hover:bg-blue-50" asChild>
                    <Link to="/login">
                      <User className="h-4 w-4 mr-2" />
                      Iniciar Sesión
                    </Link>
                  </Button>
                  <Button className="font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200" asChild>
                    <Link to="/register">Registrarse</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Botones móvil */}
            <div className="flex md:hidden items-center gap-1">
              <Button variant="ghost" size="icon" className="text-blue-600" onClick={() => setMobileOpen(true)}>
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-blue-600" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>

          </div>
        </div>
      </header>

      {/* Menú móvil */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />

          <div className="absolute top-0 right-0 h-full w-80 max-w-full bg-white shadow-2xl flex flex-col">
            {/* Header panel */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-blue-50">
              <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-md shadow-blue-200">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <span className="font-extrabold text-blue-950">EduPlatform</span>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-blue-50">
                <X className="h-5 w-5 text-blue-600" />
              </button>
            </div>

            {/* Búsqueda móvil */}
            <div className="px-5 py-4 border-b border-blue-50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Buscar cursos..."
                  className="w-full rounded-xl border border-blue-100 bg-blue-50/30 py-2.5 pl-10 pr-4 text-sm font-medium text-blue-900 focus:border-blue-400 focus:bg-white focus:outline-none"
                  autoFocus
                />
              </div>
              {query && (
                <div className="mt-2 rounded-xl border border-blue-100 bg-white overflow-hidden shadow-sm">
                  {searchResults.length > 0 ? searchResults.map(course => (
                    <button
                      key={course.id}
                      onClick={() => handleSelectResult(course.id)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-blue-50 transition-colors text-left border-b border-blue-50 last:border-0"
                    >
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                        <BookOpen className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-blue-900 truncate">{course.title}</p>
                        <p className="text-xs text-blue-400">{course.category}</p>
                      </div>
                    </button>
                  )) : (
                    <p className="text-sm text-gray-500 text-center py-4">Sin resultados para "{query}"</p>
                  )}
                </div>
              )}
            </div>

            {/* Navegación móvil */}
            <nav className="flex-1 px-5 py-4 space-y-1 overflow-y-auto">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-blue-900/70 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <Home className="h-5 w-5 text-blue-400" />
                Inicio
              </Link>
              <Link
                to="/my-courses"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-blue-900/70 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <Trophy className="h-5 w-5 text-blue-400" />
                Mis Cursos
              </Link>
            </nav>

            {/* Auth móvil */}
            <div className="px-5 py-5 border-t border-blue-50 bg-blue-50/30">
              {user ? (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-md shadow-blue-200">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-blue-950">{user.name}</p>
                      <p className="text-xs text-blue-400 truncate">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button variant="outline" className="w-full font-bold border-blue-100 text-blue-700 hover:bg-blue-50" asChild>
                    <Link to="/login" onClick={() => setMobileOpen(false)}>
                      <User className="h-4 w-4 mr-2" />
                      Iniciar Sesión
                    </Link>
                  </Button>
                  <Button className="w-full font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200" asChild>
                    <Link to="/register" onClick={() => setMobileOpen(false)}>
                      Registrarse gratis
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}