import { useState } from "react";

function PanelEmpresasView({ onPublicarCurso, onPublicarVacante }) {
  const [curso, setCurso] = useState({
    titulo: "",
    institucion: "",
    duracion: "",
    modalidad: "Virtual",
    descripcion: "",
  });

  const [vacante, setVacante] = useState({
    titulo: "",
    empresa: "",
    ubicacion: "",
    contrato: "",
    descripcion: "",
  });

  const enviarCurso = (e) => {
    e.preventDefault();
    if (!curso.titulo.trim() || !curso.institucion.trim()) return;
    onPublicarCurso(curso);
    setCurso({ titulo: "", institucion: "", duracion: "", modalidad: "Virtual", descripcion: "" });
  };

  const enviarVacante = (e) => {
    e.preventDefault();
    if (!vacante.titulo.trim() || !vacante.empresa.trim()) return;
    onPublicarVacante(vacante);
    setVacante({ titulo: "", empresa: "", ubicacion: "", contrato: "", descripcion: "" });
  };

  return (
    <div className="grid-2">
      <section className="card">
        <h2 className="card-title title-green">📘 Publicar Curso Gratuito</h2>
        <form className="form-stack" onSubmit={enviarCurso}>
          <div className="field-group">
            <label>Título del Curso</label>
            <input
              className="input"
              type="text"
              placeholder="Ej: Agricultura Sostenible"
              value={curso.titulo}
              onChange={(e) => setCurso({ ...curso, titulo: e.target.value })}
              required
            />
          </div>
          <div className="field-group">
            <label>Instructor / Empresa</label>
            <input
              className="input"
              type="text"
              placeholder="Nombre de la empresa o instructor"
              value={curso.institucion}
              onChange={(e) => setCurso({ ...curso, institucion: e.target.value })}
              required
            />
          </div>
          <div className="field-group">
            <label>Duración</label>
            <input
              className="input"
              type="text"
              placeholder="Ej: 4 Semanas"
              value={curso.duracion}
              onChange={(e) => setCurso({ ...curso, duracion: e.target.value })}
            />
          </div>
          <div className="field-group">
            <label>Modalidad</label>
            <select
              className="select"
              value={curso.modalidad}
              onChange={(e) => setCurso({ ...curso, modalidad: e.target.value })}
            >
              <option value="Virtual">Virtual</option>
              <option value="100% Virtual">100% Virtual</option>
              <option value="Virtual / Presencial">Virtual / Presencial</option>
              <option value="Presencial">Presencial</option>
            </select>
          </div>
          <div className="field-group">
            <label>Descripción</label>
            <textarea
              className="textarea"
              placeholder="Breve descripción del curso"
              value={curso.descripcion}
              onChange={(e) => setCurso({ ...curso, descripcion: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-green">
            Publicar Curso
          </button>
        </form>
      </section>

      <section className="card">
        <h2 className="card-title title-blue">💼 Publicar Oferta Laboral</h2>
        <form className="form-stack" onSubmit={enviarVacante}>
          <div className="field-group">
            <label>Título de la Vacante</label>
            <input
              className="input"
              type="text"
              placeholder="Ej: Técnico de Campo"
              value={vacante.titulo}
              onChange={(e) => setVacante({ ...vacante, titulo: e.target.value })}
              required
            />
          </div>
          <div className="field-group">
            <label>Empresa</label>
            <input
              className="input"
              type="text"
              placeholder="Nombre de la compañía"
              value={vacante.empresa}
              onChange={(e) => setVacante({ ...vacante, empresa: e.target.value })}
              required
            />
          </div>
          <div className="field-group">
            <label>Ubicación</label>
            <input
              className="input"
              type="text"
              placeholder="Ej: Nariño, Colombia"
              value={vacante.ubicacion}
              onChange={(e) => setVacante({ ...vacante, ubicacion: e.target.value })}
            />
          </div>
          <div className="field-group">
            <label>Tipo de Contrato</label>
            <input
              className="input"
              type="text"
              placeholder="Ej: Tiempo completo / Temporal"
              value={vacante.contrato}
              onChange={(e) => setVacante({ ...vacante, contrato: e.target.value })}
            />
          </div>
          <div className="field-group">
            <label>Descripción</label>
            <textarea
              className="textarea"
              placeholder="Detalles de la oferta"
              value={vacante.descripcion}
              onChange={(e) => setVacante({ ...vacante, descripcion: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-blue">
            Publicar Oferta
          </button>
        </form>
      </section>
    </div>
  );
}

export default PanelEmpresasView;