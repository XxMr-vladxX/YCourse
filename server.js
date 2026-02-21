// server.js
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
app.use(cors());
app.use(express.json());

// ─── Conexión MySQL ───────────────────────────────
const db = await mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',        // si tienes contraseña en XAMPP ponla aquí
  database: 'ycourse',
  port: 3306
});

const YT_API_KEY = 'AIzaSyA4Yxa7YGrYLH5yZvwvUIFwbQRO02wRLX0';
const YT_BASE    = 'https://www.googleapis.com/youtube/v3';

// ─── RUTAS ────────────────────────────────────────

// Traer todos los cursos
app.get('/api/cursos', async (req, res) => {
  const [rows] = await db.query(`
    SELECT c.*, cat.nombre AS categoria
    FROM Cursos c
    LEFT JOIN Categorias cat ON c.idCategoria = cat.idCategoria
  `);
  res.json(rows);
});

// Traer lecciones de un curso
app.get('/api/cursos/:id/lecciones', async (req, res) => {
  const [rows] = await db.query(
    'SELECT * FROM Lecciones WHERE idCurso = ? ORDER BY orden',
    [req.params.id]
  );
  res.json(rows);
});

// Traer categorias
app.get('/api/categorias', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM Categorias');
  res.json(rows);
});

// Importar playlist de YouTube y guardarla como curso
app.post('/api/importar-playlist', async (req, res) => {
  const { playlistId, idCategoria, nivel } = req.body;

  try {
    // 1. Traer datos de la playlist
    const plRes = await fetch(
      `${YT_BASE}/playlists?part=snippet&id=${playlistId}&key=${YT_API_KEY}`
    );
    const plData = await plRes.json();
    const playlist = plData.items[0].snippet;

    // 2. Guardar el curso en BD
    const [result] = await db.query(
      `INSERT INTO Cursos (api_externa_id, idCategoria, titulo, descripcion, nivel, imagen_url, duracion_total)
       VALUES (?, ?, ?, ?, ?, ?, 0)
       ON DUPLICATE KEY UPDATE titulo = titulo`,
      [
        playlistId,
        idCategoria,
        playlist.title,
        playlist.description,
        nivel,
        playlist.thumbnails?.high?.url || ''
      ]
    );

    const idCurso = result.insertId;

    // 3. Traer videos de la playlist
    const vidRes = await fetch(
      `${YT_BASE}/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${YT_API_KEY}`
    );
    const vidData = await vidRes.json();

    // 4. Guardar cada lección
    for (const item of vidData.items) {
      const { title, resourceId, position } = item.snippet;
      await db.query(
        `INSERT IGNORE INTO Lecciones (idCurso, video_api_id, titulo, orden)
         VALUES (?, ?, ?, ?)`,
        [idCurso, resourceId.videoId, title, position]
      );
    }

    // 5. Actualizar duración total
    await db.query(
      'UPDATE Cursos SET duracion_total = ? WHERE idCurso = ?',
      [vidData.items.length, idCurso]
    );

    res.json({ ok: true, mensaje: `Curso importado con ${vidData.items.length} lecciones` });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log('✅ Servidor corriendo en http://localhost:3001'));
