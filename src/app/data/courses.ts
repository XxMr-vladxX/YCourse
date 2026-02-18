export interface Lesson {
  id: number;
  title: string;
  duration: string;
  videoUrl: string;
  order: number;
  completed: boolean;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  categoryId: number;
  category: string;
  level: 'Principiante' | 'Intermedio' | 'Avanzado';
  duration: string;
  instructor: string;
  thumbnail: string;
  rating: number;
  studentsCount: number;
  price: string;
  lessons: Lesson[];
}

export const categories = [
  { id: 1, name: 'Programación', color: '#3B82F6', icon: 'code' },
  { id: 2, name: 'Diseño', color: '#EC4899', icon: 'palette' },
  { id: 3, name: 'Diseño 3D', color: '#10B981', icon: 'box' },
  { id: 4, name: 'Videojuegos', color: '#8B5CF6', icon: 'gamepad-2' },
];

export const courses: Course[] = [
  // Programación
  {
    id: 1,
    title: 'Desarrollo Web Full Stack con React y Node.js',
    description: 'Aprende a crear aplicaciones web completas desde cero. Domina React, Node.js, Express y MongoDB para convertirte en un desarrollador full stack profesional.',
    categoryId: 1,
    category: 'Programación',
    level: 'Intermedio',
    duration: '45 horas',
    instructor: 'Carlos Martínez',
    thumbnail: 'https://images.unsplash.com/photo-1675495666589-94cdafbcfcc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGUlMjBjb21wdXRlcnxlbnwxfHx8fDE3NzExOTk3MTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    studentsCount: 12450,
    price: "",
    lessons: [
      { id: 1, title: 'Introducción al desarrollo web moderno', duration: '15:30', videoUrl: '', order: 1, completed: false },
      { id: 2, title: 'Fundamentos de React', duration: '25:45', videoUrl: '', order: 2, completed: false },
      { id: 3, title: 'Componentes y Props', duration: '32:15', videoUrl: '', order: 3, completed: false },
      { id: 4, title: 'Estado y Hooks', duration: '28:40', videoUrl: '', order: 4, completed: false },
      { id: 5, title: 'Configuración de Node.js y Express', duration: '22:10', videoUrl: '', order: 5, completed: false },
      { id: 6, title: 'APIs RESTful', duration: '35:20', videoUrl: '', order: 6, completed: false },
    ]
  },
  {
    id: 2,
    title: 'Python para Ciencia de Datos y Machine Learning',
    description: 'Domina Python y las librerías más populares para análisis de datos, visualización y machine learning. Ideal para comenzar tu carrera en Data Science.',
    categoryId: 1,
    category: 'Programación',
    level: 'Principiante',
    duration: '38 horas',
    instructor: 'Ana Silva',
    thumbnail: 'https://images.unsplash.com/photo-1675495666589-94cdafbcfcc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGUlMjBjb21wdXRlcnxlbnwxfHx8fDE3NzExOTk3MTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    studentsCount: 8320,
    price: "",
    lessons: [
      { id: 1, title: 'Fundamentos de Python', duration: '18:20', videoUrl: '', order: 1, completed: false },
      { id: 2, title: 'NumPy y Arrays', duration: '24:15', videoUrl: '', order: 2, completed: false },
      { id: 3, title: 'Pandas para análisis de datos', duration: '31:45', videoUrl: '', order: 3, completed: false },
      { id: 4, title: 'Visualización con Matplotlib', duration: '26:30', videoUrl: '', order: 4, completed: false },
    ]
  },
  {
    id: 3,
    title: 'Desarrollo Móvil con React Native',
    description: 'Crea aplicaciones móviles nativas para iOS y Android usando React Native. Aprende a desarrollar apps profesionales con una sola base de código.',
    categoryId: 1,
    category: 'Programación',
    level: 'Intermedio',
    duration: '32 horas',
    instructor: 'Miguel Rodríguez',
    thumbnail: 'https://images.unsplash.com/photo-1675495666589-94cdafbcfcc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGUlMjBjb21wdXRlcnxlbnwxfHx8fDE3NzExOTk3MTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    studentsCount: 6540,
    price: "",
    lessons: [
      { id: 1, title: 'Configuración del entorno', duration: '20:15', videoUrl: '', order: 1, completed: false },
      { id: 2, title: 'Componentes nativos', duration: '28:40', videoUrl: '', order: 2, completed: false },
      { id: 3, title: 'Navegación en apps móviles', duration: '25:50', videoUrl: '', order: 3, completed: false },
    ]
  },
  // Diseño
  {
    id: 4,
    title: 'Diseño UX/UI desde Cero con Figma',
    description: 'Aprende los fundamentos del diseño de experiencia de usuario e interfaces. Domina Figma y crea diseños profesionales para aplicaciones web y móviles.',
    categoryId: 2,
    category: 'Diseño',
    level: 'Principiante',
    duration: '28 horas',
    instructor: 'Laura González',
    thumbnail: 'https://images.unsplash.com/photo-1661246627162-feb0269e0c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzcxMTUxMTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    studentsCount: 15230,
    price: "",
    lessons: [
      { id: 1, title: 'Introducción al diseño UX/UI', duration: '16:30', videoUrl: '', order: 1, completed: false },
      { id: 2, title: 'Principios de diseño visual', duration: '22:15', videoUrl: '', order: 2, completed: false },
      { id: 3, title: 'Wireframes y prototipos', duration: '29:40', videoUrl: '', order: 3, completed: false },
      { id: 4, title: 'Sistema de diseño', duration: '25:20', videoUrl: '', order: 4, completed: false },
      { id: 5, title: 'Componentes reutilizables', duration: '27:50', videoUrl: '', order: 5, completed: false },
    ]
  },
  {
    id: 5,
    title: 'Ilustración Digital con Adobe Illustrator',
    description: 'Conviértete en un ilustrador profesional. Aprende técnicas avanzadas de ilustración vectorial y crea arte increíble para proyectos comerciales.',
    categoryId: 2,
    category: 'Diseño',
    level: 'Intermedio',
    duration: '35 horas',
    instructor: 'Sofía Ramírez',
    thumbnail: 'https://images.unsplash.com/photo-1661246627162-feb0269e0c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzcxMTUxMTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    studentsCount: 9870,
    price: "",
    lessons: [
      { id: 1, title: 'Herramientas básicas de Illustrator', duration: '19:45', videoUrl: '', order: 1, completed: false },
      { id: 2, title: 'Técnicas de dibujo vectorial', duration: '33:20', videoUrl: '', order: 2, completed: false },
      { id: 3, title: 'Color y composición', duration: '28:15', videoUrl: '', order: 3, completed: false },
    ]
  },
  {
    id: 6,
    title: 'Branding y Diseño de Identidad Corporativa',
    description: 'Aprende a crear identidades de marca completas y profesionales. Desde el concepto hasta la guía de estilo, domina el branding estratégico.',
    categoryId: 2,
    category: 'Diseño',
    level: 'Avanzado',
    duration: '30 horas',
    instructor: 'Diego Torres',
    thumbnail: 'https://images.unsplash.com/photo-1661246627162-feb0269e0c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzcxMTUxMTE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    studentsCount: 7650,
    price: "",
    lessons: [
      { id: 1, title: 'Fundamentos del branding', duration: '21:30', videoUrl: '', order: 1, completed: false },
      { id: 2, title: 'Investigación de marca', duration: '26:45', videoUrl: '', order: 2, completed: false },
      { id: 3, title: 'Diseño de logotipos', duration: '34:20', videoUrl: '', order: 3, completed: false },
    ]
  },
  // Diseño 3D
  {
    id: 7,
    title: 'Modelado 3D con Blender - De Principiante a Profesional',
    description: 'Domina Blender, el software de modelado 3D más potente y gratuito. Aprende modelado, texturizado, iluminación y renderizado profesional.',
    categoryId: 3,
    category: 'Diseño 3D',
    level: 'Principiante',
    duration: '50 horas',
    instructor: 'Javier López',
    thumbnail: 'https://images.unsplash.com/photo-1723666760758-abda06be10fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMG1vZGVsaW5nJTIwYmxlbmRlcnxlbnwxfHx8fDE3NzExOTk3MjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    studentsCount: 11230,
    price: "",
    lessons: [
      { id: 1, title: 'Introducción a Blender', duration: '18:30', videoUrl: '', order: 1, completed: false },
      { id: 2, title: 'Modelado básico', duration: '30:15', videoUrl: '', order: 2, completed: false },
      { id: 3, title: 'Modificadores y herramientas avanzadas', duration: '35:40', videoUrl: '', order: 3, completed: false },
      { id: 4, title: 'Materiales y texturas', duration: '28:20', videoUrl: '', order: 4, completed: false },
      { id: 5, title: 'Iluminación y renderizado', duration: '32:50', videoUrl: '', order: 5, completed: false },
    ]
  },
  {
    id: 8,
    title: 'Animación 3D y Motion Graphics',
    description: 'Aprende a dar vida a tus modelos 3D. Domina técnicas de animación, rigging y motion graphics para crear contenido visual impactante.',
    categoryId: 3,
    category: 'Diseño 3D',
    level: 'Intermedio',
    duration: '42 horas',
    instructor: 'María Fernández',
    thumbnail: 'https://images.unsplash.com/photo-1723666760758-abda06be10fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMG1vZGVsaW5nJTIwYmxlbmRlcnxlbnwxfHx8fDE3NzExOTk3MjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    studentsCount: 6890,
    price: "",
    lessons: [
      { id: 1, title: 'Principios de animación', duration: '24:15', videoUrl: '', order: 1, completed: false },
      { id: 2, title: 'Rigging de personajes', duration: '38:30', videoUrl: '', order: 2, completed: false },
      { id: 3, title: 'Keyframes y curvas de animación', duration: '29:45', videoUrl: '', order: 3, completed: false },
      { id: 4, title: 'Motion graphics y efectos', duration: '31:20', videoUrl: '', order: 4, completed: false },
    ]
  },
  {
    id: 9,
    title: 'Escultura Digital con ZBrush',
    description: 'Aprende escultura digital profesional con ZBrush. Crea personajes, criaturas y assets de alta calidad para videojuegos y películas.',
    categoryId: 3,
    category: 'Diseño 3D',
    level: 'Avanzado',
    duration: '38 horas',
    instructor: 'Roberto Díaz',
    thumbnail: 'https://images.unsplash.com/photo-1723666760758-abda06be10fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHwzZCUyMG1vZGVsaW5nJTIwYmxlbmRlcnxlbnwxfHx8fDE3NzExOTk3MjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    studentsCount: 5430,
    price: "",
    lessons: [
      { id: 1, title: 'Interfaz y herramientas de ZBrush', duration: '22:40', videoUrl: '', order: 1, completed: false },
      { id: 2, title: 'Técnicas de escultura digital', duration: '35:15', videoUrl: '', order: 2, completed: false },
      { id: 3, title: 'Retopología y optimización', duration: '28:50', videoUrl: '', order: 3, completed: false },
    ]
  },
  // Videojuegos
  {
    id: 10,
    title: 'Desarrollo de Videojuegos con Unity',
    description: 'Crea tus propios videojuegos con Unity, uno de los motores más populares. Aprende programación en C#, física, IA y publicación de juegos.',
    categoryId: 4,
    category: 'Videojuegos',
    level: 'Principiante',
    duration: '55 horas',
    instructor: 'Pablo Mendoza',
    thumbnail: 'https://images.unsplash.com/photo-1556438064-2d7646166914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGdhbWUlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NzEwOTY4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    studentsCount: 18450,
    price: "",
    lessons: [
      { id: 1, title: 'Introducción a Unity', duration: '17:30', videoUrl: '', order: 1, completed: false },
      { id: 2, title: 'Fundamentos de C# para Unity', duration: '28:45', videoUrl: '', order: 2, completed: false },
      { id: 3, title: 'GameObjects y Components', duration: '25:20', videoUrl: '', order: 3, completed: false },
      { id: 4, title: 'Física y colisiones', duration: '32:15', videoUrl: '', order: 4, completed: false },
      { id: 5, title: 'Sistema de partículas y efectos', duration: '29:40', videoUrl: '', order: 5, completed: false },
      { id: 6, title: 'Inteligencia artificial básica', duration: '36:50', videoUrl: '', order: 6, completed: false },
    ]
  },
  {
    id: 11,
    title: 'Diseño de Niveles y Game Design',
    description: 'Aprende a diseñar niveles y mecánicas de juego que enganchen a los jugadores. Principios de game design, balanceo y experiencia de usuario.',
    categoryId: 4,
    category: 'Videojuegos',
    level: 'Intermedio',
    duration: '34 horas',
    instructor: 'Carmen Ruiz',
    thumbnail: 'https://images.unsplash.com/photo-1556438064-2d7646166914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGdhbWUlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NzEwOTY4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    studentsCount: 9320,
    price: "",
    lessons: [
      { id: 1, title: 'Fundamentos del game design', duration: '20:30', videoUrl: '', order: 1, completed: false },
      { id: 2, title: 'Diseño de mecánicas de juego', duration: '27:15', videoUrl: '', order: 2, completed: false },
      { id: 3, title: 'Creación de niveles efectivos', duration: '31:40', videoUrl: '', order: 3, completed: false },
      { id: 4, title: 'Balanceo y dificultad', duration: '25:50', videoUrl: '', order: 4, completed: false },
    ]
  },
  {
    id: 12,
    title: 'Desarrollo de Juegos 2D con Godot',
    description: 'Domina Godot Engine para crear juegos 2D increíbles. Aprende desde lo básico hasta técnicas avanzadas de desarrollo de videojuegos.',
    categoryId: 4,
    category: 'Videojuegos',
    level: 'Principiante',
    duration: '40 horas',
    instructor: 'Andrés Castro',
    thumbnail: 'https://images.unsplash.com/photo-1556438064-2d7646166914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGdhbWUlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NzEwOTY4NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    studentsCount: 7680,
    price: "",
    lessons: [
      { id: 1, title: 'Introducción a Godot', duration: '16:20', videoUrl: '', order: 1, completed: false },
      { id: 2, title: 'Nodos y escenas', duration: '23:45', videoUrl: '', order: 2, completed: false },
      { id: 3, title: 'GDScript básico', duration: '28:30', videoUrl: '', order: 3, completed: false },
      { id: 4, title: 'Sprites y animaciones', duration: '26:15', videoUrl: '', order: 4, completed: false },
    ]
  },
];
