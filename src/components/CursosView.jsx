import { useState } from "react";
import CursoCard from "./CursoCard.jsx";

function CursosView({ cursos, onVerDetalle, esAdmin, onEliminar }) {
  const [busqueda, setBusqueda] = useState("");

  const cursosFiltrados = cursos.filter(
    (curso) =>
      curso.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      curso.institucion.toLowerCase().includes(busqueda.toLowerCase()) ||
      (curso.categoria || "").toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <div className="section-banner">
        <span>🎓 Cursos de Educación Gratuita</span>
      </div>
      <p className="section-subtitle">
        ℹ️ Empresas y organizaciones ofrecen cursos gratuitos. Revisa los detalles antes de inscribirte.
      </p>

      <div className="card" style={{ marginBottom: "18px" }}>
        <input
          className="input"
          type="text"
          placeholder="🔍 Buscar curso por nombre, categoría o institución (ej: SENA, Microsoft)..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {cursosFiltrados.length === 0 ? (
        <div className="card">
          <p className="card-desc">No se encontraron cursos con "{busqueda}".</p>
        </div>
      ) : (
        <div className="grid-2">
          {cursosFiltrados.map((curso) => (
            <CursoCard
              key={curso.id}
              curso={curso}
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

export default CursosView;