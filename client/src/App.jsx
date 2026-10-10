import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    correo: '',
    telefono: '',
    ciudad: '',
    carrera: '',
    asistenciaMonumental: '',
    nivelConocimiento: '',
    comentario: ''
  });

  const [estadoEnvio, setEstadoEnvio] = useState({
    cargando: false,
    mensaje: '',
    tipo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstadoEnvio({ cargando: true, mensaje: '', tipo: '' });

    try {
      const response = await fetch('http://localhost:5000/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setEstadoEnvio({
          cargando: false,
          mensaje: data.mensaje || 'Cuestionario enviado!',
          tipo: 'exito'
        });
      } else {
        setEstadoEnvio({
          cargando: false,
          mensaje: data.mensaje || 'Hubo un problema al procesar el formulario.',
          tipo: 'error'
        });
      }
    } catch (error) {
      setEstadoEnvio({
        cargando: false,
        mensaje: 'No se pudo conectar con el servidor',
        tipo: 'error'
      });
    }
  };

  const handleReset = () => {
    setFormData({
      nombre: '',
      apellido: '',
      dni: '',
      correo: '',
      telefono: '',
      ciudad: '',
      carrera: '',
      asistenciaMonumental: 'si',
      nivelConocimiento: 'intermedio',
      comentario: ''
    });
    setEstadoEnvio({ cargando: false, mensaje: '', tipo: '' });
  };

  return (
    <div className="fondo-estadio">
      <div className="overlay-estadio">
        <main className="contenedor-principal">
          <div className="tarjeta-formulario">
            <header className="cabecera-tarjeta">
              <div className="badge-tp">EFA - Desarrollo Web</div>
              <h1>Cuestionario</h1>
              <p className="descripcion-cabecera">
                Completá tu ficha ingresando los siguientes datos.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="formulario-contenido">
              <div className="bloque-seccion">
                <div className="encabezado-seccion">
                  <span className="numero-paso">1</span>
                  <div>
                    <h2>Información Personal</h2>
                    <p>Ingresá tus datos identificatorios principales.</p>
                  </div>
                </div>

                <div className="grid-dos-columnas">
                  <div className="campo-grupo">
                    <label htmlFor="nombre">Nombre <span className="requerido">*</span></label>
                    <input
                      id="nombre"
                      type="text"
                      name="nombre"
                      placeholder="Ej: Franco"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="campo-grupo">
                    <label htmlFor="apellido">Apellido <span className="requerido">*</span></label>
                    <input
                      id="apellido"
                      type="text"
                      name="apellido"
                      placeholder="Ej: Mastantuono"
                      value={formData.apellido}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="campo-grupo">
                  <label htmlFor="dni">Documento (DNI) <span className="requerido">*</span></label>
                  <input
                    id="dni"
                    type="text"
                    name="dni"
                    placeholder="Número de documento sin puntos."
                    value={formData.dni}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="bloque-seccion">
                <div className="encabezado-seccion">
                  <span className="numero-paso">2</span>
                  <div>
                    <h2>Contacto y Estudios</h2>
                    <p>Medios de comunicación y carrera actual.</p>
                  </div>
                </div>

                <div className="grid-dos-columnas">
                  <div className="campo-grupo">
                    <label htmlFor="correo">Correo Electrónico <span className="requerido">*</span></label>
                    <input
                      id="correo"
                      type="email"
                      name="correo"
                      placeholder="fmastan@email.com"
                      value={formData.correo}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="campo-grupo">
                    <label htmlFor="telefono">Teléfono <span className="requerido">*</span></label>
                    <input
                      id="telefono"
                      type="tel"
                      name="telefono"
                      placeholder="+54 11 0912-2018"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid-dos-columnas">
                  <div className="campo-grupo">
                    <label htmlFor="ciudad">Ciudad de Residencia</label>
                    <input
                      id="ciudad"
                      type="text"
                      name="ciudad"
                      placeholder="Ej: Buenos Aires"
                      value={formData.ciudad}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="campo-grupo">
                    <label htmlFor="carrera">Carrera / Curso</label>
                    <input
                      id="carrera"
                      type="text"
                      name="carrera"
                      placeholder="Ej: Licenciatura en Sistemas"
                      value={formData.carrera}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="bloque-seccion">
                <div className="encabezado-seccion">
                  <span className="numero-paso">3</span>
                  <div>
                    <h2>Preguntas y Preferencias</h2>
                    <p>Información complementaria del cuestionario.</p>
                  </div>
                </div>

                <div className="grid-dos-columnas">
                  <div className="campo-grupo">
                    <label htmlFor="asistenciaMonumental">Conocés o fuiste al Estadio Monumental?</label>
                    <select
                      id="asistenciaMonumental"
                      name="asistenciaMonumental"
                      value={formData.asistenciaMonumental}
                      onChange={handleChange}
                    >
                      <option value="si">Sí, lo conozco</option>
                      <option value="no">No, todavía no</option>
                      <option value="socio">Sí, voy habitualmente</option>
                    </select>
                  </div>

                  <div className="campo-grupo">
                    <label htmlFor="nivelConocimiento">Nivel previo en Programación</label>
                    <select
                      id="nivelConocimiento"
                      name="nivelConocimiento"
                      value={formData.nivelConocimiento}
                      onChange={handleChange}
                    >
                      <option value="inicial">Inicial</option>
                      <option value="intermedio">Intermedio </option>
                      <option value="avanzado">Avanzado </option>
                    </select>
                  </div>
                </div>

                <div className="campo-grupo">
                  <label htmlFor="comentario">
                    Comentarios <span className="opcional">(opcional)</span>
                  </label>
                  <textarea
                    id="comentario"
                    name="comentario"
                    rows="3"
                    placeholder="Podes escribir tus pensamientos sobre el fútbol o la programación..."
                    value={formData.comentario}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="acciones-formulario">
                <div className="botones-grupo">
                  <button
                    type="submit"
                    className="boton-primario"
                    disabled={estadoEnvio.cargando}
                  >
                    {estadoEnvio.cargando ? 'Enviando...' : 'Enviar cuestionario'}
                  </button>
                  <button
                    type="button"
                    className="boton-secundario"
                    onClick={handleReset}
                    disabled={estadoEnvio.cargando}
                  >
                    Limpiar
                  </button>
                </div>
                <span className="leyenda-obligatoria">* Campos obligatorios</span>
              </div>

              {estadoEnvio.mensaje && (
                <div className={`alerta-mensaje alerta-${estadoEnvio.tipo}`}>
                  <strong>
                    {estadoEnvio.tipo === 'exito' ? 'Exito' : 'Aviso: '}
                  </strong>
                  {estadoEnvio.mensaje}
                </div>
              )}
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;