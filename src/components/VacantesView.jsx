import { useState } from "react";
import VacanteCard from "./VacanteCard.jsx";

function VacantesView({ vacantes, onVerDetalle, esAdmin, onEliminar }) {
  const [busqueda, setBusqueda] = useState("");

  const vacantesFiltradas = vacantes.filter(
    (vac) =>
      vac.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      vac.ubicacion.toLowerCase().includes(busqueda.toLowerCase()) ||
      vac.empresa.toLowerCase().includes(busqueda.toLowerCase()) ||
      (vac.categoria || "").toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <div className="section-banner">
        <span>💼 Oportunidades de Trabajo</span>
      </div>
      <p className="section-subtitle">
        ℹ️ Empresas ofrecen oportunidades de trabajo. Revisa los detalles completos antes de postularte.
      </p>

      <div className="card" style={{ marginBottom: "18px" }}>
        <input
          className="input"
          type="text"
          placeholder="🔍 Buscar vacante por cargo, empresa, categoría o ubicación..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {vacantesFiltradas.length === 0 ? (
        <div className="card">
          <p className="card-desc">No se encontraron vacantes con "{busqueda}".</p>
        </div>
      ) : (
        <div className="grid-2">
          {vacantesFiltradas.map((vac) => (
            <VacanteCard
              key={vac.id}
              vacante={vac}
              onVerDetalle={onVerDetalle}
              esAdmin={esAdmin}
              onEliminar={onEliminar}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default VacantesView;