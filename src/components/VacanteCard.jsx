function VacanteCard({ vacante, onVerDetalle, esAdmin, onEliminar }) {
  const disponibles = Math.max(0, vacante.cuposTotales - vacante.postulados);
  const porcentaje =
    vacante.cuposTotales > 0 ? Math.round((disponibles / vacante.cuposTotales) * 100) : 0;

  return (
    <article className="card card-hover card-accent-green">
      <div className="card-header-row">
        <h3 className="card-title title-green">💼 {vacante.titulo}</h3>
        <span className="badge badge-green">{vacante.categoria || "Empleo Rural"}</span>
      </div>

      <p className="meta-row">
        🏢 <strong>Empresa:</strong> {vacante.empresa}
      </p>
      {vacante.salario && (
        <p className="meta-row">
          <strong>Salario:</strong> {vacante.salario}
        </p>
      )}
      <p className="meta-row">
        <strong>Ubicación:</strong> {vacante.ubicacion}
      </p>
      <p className="meta-row">
        🕒 <strong>Tipo:</strong> {vacante.contrato}
      </p>
      <p className="card-desc">{vacante.descripcion}</p>
      {vacante.experiencia && (
        <p className="meta-row">
          ℹ️ <strong>Experiencia:</strong> {vacante.experiencia}
        </p>
      )}
      {vacante.limite && (
        <p className="meta-row">
          📅 <strong>Límite:</strong> {vacante.limite}
        </p>
      )}

      <div className="quota-box">
        <div className="quota-header">
          <span>Cupos:</span>
          <span>
            {disponibles} de {vacante.cuposTotales} disponibles
          </span>
        </div>
        <div className="progress-track">
          <div className="progress-fill-green" style={{ width: `${porcentaje}%` }} />
        </div>
      </div>

      <div className="card-actions">
        <button
          type="button"
          className="btn btn-green btn-full"
          onClick={() => onVerDetalle && onVerDetalle(vacante)}
        >
          👁️ Ver detalles
        </button>

        {esAdmin && (
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => onEliminar && onEliminar(vacante.id)}
          >
            🗑️ Eliminar
          </button>
        )}
      </div>
    </article>
  );
}

export default VacanteCard;