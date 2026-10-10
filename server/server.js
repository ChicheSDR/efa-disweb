const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/estado', (req, res) => {
  res.json({ ok: true, mensaje: 'Servidor activo.' });
});

app.post('/api/registro', (req, res) => {
  const datos = req.body;

  if (!datos.nombre || !datos.apellido || !datos.dni || !datos.correo) {
    return res.status(400).json({
      ok: false,
      mensaje: 'Faltan campos obligatorios requeridos (nombre, apellido, dni o correo).'
    });
  }

  console.log('--- Nuevo cuestionario recibido ---');
  console.log(`Fecha: ${new Date().toLocaleString()}`);
  console.log(`Estudiante: ${datos.nombre} ${datos.apellido} (DNI: ${datos.dni})`);
  console.log(`Contacto: ${datos.correo} | Tel: ${datos.telefono}`);
  console.log(`Carrera: ${datos.carrera || 'No especificada'} | Ciudad: ${datos.ciudad || 'No especificada'}`);
  console.log(`¿Conoce el Monumental?: ${datos.asistenciaMonumental}`);
  console.log(`Nivel de programación: ${datos.nivelConocimiento}`);
  if (datos.comentario) console.log(`Comentario: ${datos.comentario}`);
  console.log('-----------------------------------');

  res.status(200).json({
    ok: true,
    mensaje: `Tu cuestionario fue recibido, muchas gracias ${datos.nombre}!`,
    fechaRecepcion: new Date().toISOString(),
    idRegistro: Date.now()
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});