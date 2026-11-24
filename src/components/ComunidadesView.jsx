import { useState } from "react";

const REGIONES_COLOMBIA = [
  "Antioquia",
  "Amazonas",
  "Casanare",
  "Cauca",
  "Nariño",
  "Boyacá",
  "Meta",
  "Santander",
  "Pacífico",
  "Andina",
];

function ComunidadesView({
  comunidades,
  onAgregarComunidad,
  onEliminarComunidad,
  esAdmin,
  onIrACursos,
  onIrAVacantes,
}) {
  const [nombre, setNombre] = useState("");
  const [regionSeleccionada, setRegionSeleccionada] = useState("");
  const [otraRegion, setOtraRegion] = useState("");
  const [miembros, setMiembros] = useState("");
  const [email, setEmail] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const regionFinal =
    regionSeleccionada === "Otra" ? otraRegion.trim() : regionSeleccionada.trim();

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !regionFinal) return;

    onAgregarComunidad({
      id: Date.now(),
      nombre: nombre.trim(),
      region: regionFinal,
      miembros: Number(miembros) || 0,
      email: email.trim() || "contacto@comunidad.co",
      descripcion: descripcion.trim() || "Comunidad rural vinculada a la red.",
    });

    setNombre("");
    setRegionSeleccionada("");
    setOtraRegion("");
    setMiembros("");
    setEmail("");
    setDescripcion("");
  };

  return (
    <div>
      <div className="section-banner">
        <span>👥 Comunidades Rurales</span>
      </div>

      <div className="grid-comunidades">
        <section className="card">
          <h2 className="card-title title-green">✏️ Registrar Nueva Comunidad</h2>
          <form className="form-stack" onSubmit={manejarSubmit}>
            <div>
              <label className="meta-row" htmlFor="com-nombre">
                <strong>Nombre de la Comunidad:</strong>
              </label>
              <input
                id="com-nombre"
                className="input"
                type="text"
                placeholder="Ex: Vector, Casanare"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="meta-row" htmlFor="com-region">
                <strong>Región / Departamento:</strong>
              </label>
              <select
                id="com-region"
                className="select"
                value={regionSeleccionada}
                onChange={(e) => {
                  const valor = e.target.value;
                  setRegionSeleccionada(valor);
                  if (valor !== "Otra") {
                    setOtraRegion("");
                  }
                }}
                required
              >
                <option value="">Selecciona una región</option>
                {REGIONES_COLOMBIA.map((reg) => (
                  <option key={reg} value={reg}>
                    {reg}
                  </option>
                ))}
                <option value="Otra">Otra</option>
              </select>
            </div>

            {regionSeleccionada === "Otra" && (
              <div>
                <label className="meta-row" htmlFor="com-otra-region">
                  <strong>Especifica la Región / Departamento:</strong>
                </label>
                <input
                  id="com-otra-region"
                  className="input"
                  type="text"
                  placeholder="Ex: Putumayo, Guajira, Orinoquía..."
                  value={otraRegion}
                  onChange={(e) => setOtraRegion(e.target.value)}
                  required
                />
              </div>
            )}

            <div>
              <label className="meta-row" htmlFor="com-miembros">
                <strong>Número de Miembros:</strong>
              </label>
              <input
                id="com-miembros"
                className="input"
                type="number"
                min="1"
                placeholder="Ex: 150"
                value={miembros}
                onChange={(e) => setMiembros(e.target.value)}
              />
            </div>

            <div>
              <label className="meta-row" htmlFor="com-email">
                <strong>Email de Contacto:</strong>
              </label>
              <input
                id="com-email"
                className="input"
                type="email"
                placeholder="comunidad@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="meta-row" htmlFor="com-desc">
                <strong>Descripción:</strong>
              </label>
              <textarea
                id="com-desc"
                className="textarea"
                placeholder="Describe tu comunidad rural..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-green btn-full">
              💾 Guardar Comunidad
            </button>
          </form>
        </section>

        <section className="grid-2">
          {comunidades.map((com) => (
            <article key={com.id} className="card card-hover card-accent-green">
              <div className="card-header-row">
                <div>
                  <h3 className="card-title title-green">📍 {com.nombre}</h3>
                  <p className="meta-row">
                    <strong>{com.region}</strong>
                  </p>
                </div>
                <span className="badge badge-amber">{com.miembros} miembros</span>
              </div>

              <p className="meta-row">✉️ {com.email}</p>
              <p className="card-desc">ℹ️ {com.descripcion}</p>

              <div className="card-actions">
                <button
                  type="button"
                  className="btn btn-outline-blue"
                  onClick={onIrACursos}
                >
                  🎓 Inscribir a Curso
                </button>
                <button
                  type="button"
                  className="btn btn-outline-green"
                  onClick={onIrAVacantes}
                >
                  💼 Inscribir a Trabajo
                </button>
                {esAdmin && (
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => onEliminarComunidad(com.id)}
                  >
                    🗑️ Eliminar
                  </button>
                )}
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

export default ComunidadesView;