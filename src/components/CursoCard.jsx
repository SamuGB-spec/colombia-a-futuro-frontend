function CursoCard({ curso, onVerDetalle, esAdmin, onEliminar }) {
  const disponibles = Math.max(0, curso.cuposTotales - curso.inscritos);
  const porcentaje =
    curso.cuposTotales > 0 ? Math.round((disponibles / curso.cuposTotales) * 100) : 0;

  return (
    <article className="card card-hover card-accent-blue">
      <div className="card-header-row">
        <h3 className="card-title title-blue">🎓 {curso.titulo}</h3>
        <span className="badge badge-blue">{curso.categoria || "Formación"}</span>
      </div>

      <p className="meta-row">
        🏢 <strong>Institución:</strong> {curso.institucion}
      </p>
      <p className="meta-row">
        ⏱️ <strong>Duración:</strong> {curso.duracion} · <strong>Modalidad:</strong> {curso.modalidad}
      </p>
      <p className="meta-row">
        💵 <strong>Costo:</strong> GRATIS
      </p>
      <p className="card-desc">{curso.descripcion}</p>
      {curso.fechas && <p className="meta-row">📅 {curso.fechas}</p>}

      <div className="quota-box">
        <div className="quota-header">
          <span>Cupos:</span>
          <span>
            {disponibles} de {curso.cuposTotales} disponibles
          </span>
        </div>
        <div className="progress-track">
          <div className="progress-fill-green" style={{ width: `${porcentaje}%` }} />
        </div>
      </div>

      <div className="card-actions">
        <button
          type="button"
          className="btn btn-blue btn-full"
          onClick={() => onVerDetalle && onVerDetalle(curso)}
        >
          👁️ Ver detalles
        </button>

        {esAdmin && (
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => onEliminar && onEliminar(curso.id)}
          >
            🗑️ Eliminar
          </button>
        )}
      </div>
    </article>
  );
}

export default CursoCard;