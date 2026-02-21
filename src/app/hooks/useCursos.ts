import { useEffect, useState } from 'react';

export function useCursos() {
  const [cursos, setCursos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cursos')
      .then(res => res.json())
      .then(data => {
        setCursos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar cursos:', err);
        setLoading(false);
      });
  }, []);

  return { cursos, loading };
}