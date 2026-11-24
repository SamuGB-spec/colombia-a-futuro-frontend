function InscripcionesView({ inscripciones, onEliminarInscripcion }) {
  return (
    <div>
      <div className="section-banner">
        <span>📋 Tus Inscripciones</span>
      </div>

      {inscripciones.length === 0 ? (
        <div className="card">
          <p className="card-desc">Aún no hay inscripciones o postulaciones registradas en la vista.</p>
        </div>
      ) : (
        <div className="grid-2">
          {inscripciones.map((item) => {
            const esCurso = item.tipo === "curso";
            return (
              <article
                key={item.id}
                className={`card card-hover ${esCurso ? "card-accent-blue" : "card-accent-green"}`}
              >
                <div className="card-header-row">
                  <h3 className={`card-title ${esCurso ? "title-blue" : "title-green"}`}>
                    {esCurso ? "🎓" : "💼"} {item.titulo}
                  </h3>
                  <span className={`badge ${esCurso ? "badge-green" : "badge-amber"}`}>
                    {item.estado}
                  </span>
                </div>

                <p className="meta-row">
                  👥 <strong>Comunidad:</strong> {item.comunidad}
                </p>
                <p className="meta-row">
                  👤 <strong>{esCurso ? "Participante" : "Candidato"}:</strong> {item.participante}
                </p>
                <p className="meta-row">
                  📅 <strong>Inscripción:</strong> {item.fecha}
                </p>

                <div className="card-actions">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => onEliminarInscripcion(item.id)}
                  >
                    Quitar registro
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default InscripcionesView;