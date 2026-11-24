import { useState } from "react";

function DetalleOportunidadView({
  tipo,
  item,
  comunidades = [],
  onVolver,
  onConfirmarInscripcion,
}) {
  const esCurso = tipo === "curso";
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [documento, setDocumento] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [comunidad, setComunidad] = useState(comunidades[0]?.nombre || "Vector");
  const [mensajeExtra, setMensajeExtra] = useState("");

  if (!item) return null;

  const totalCupos = item.cuposTotales ?? 20;
  const ocupados = esCurso ? (item.inscritos ?? 0) : (item.postulados ?? 0);
  const disponibles = Math.max(0, totalCupos - ocupados);
  const porcentaje = totalCupos > 0 ? Math.round((disponibles / totalCupos) * 100) : 0;

  const requisitosLista =
    item.requisitos && item.requisitos.length > 0
      ? item.requisitos
      : esCurso
        ? [
            "Pertenecer o estar vinculado a una comunidad rural.",
            "Contar con disponibilidad horaria para cumplir las sesiones.",
            "Documento de identidad vigente para el certificado final.",
          ]
        : [
            "Documento de identidad vigente y disponibilidad en la zona.",
            "Compromiso con el trabajo en equipo y normas de seguridad.",
            item.experiencia || "Disposición para recibir inducción en campo.",
          ];

  const beneficiosLista =
    item.beneficios && item.beneficios.length > 0
      ? item.beneficios
      : esCurso
        ? [
            "Formación 100 % gratuita con certificado al finalizar.",
            "Material práctico adaptado al contexto rural.",
            "Acompañamiento de tutores durante todo el proceso.",
          ]
        : [
            "Contrato formal con todas las prestaciones de ley.",
            "Capacitación inicial pagada por la empresa.",
            "Estabilidad laboral y oportunidad de crecimiento regional.",
          ];

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!nombreCompleto.trim() || !documento.trim() || !correo.trim()) return;

    onConfirmarInscripcion(item, {
      nombreCompleto: nombreCompleto.trim(),
      documento: documento.trim(),
      correo: correo.trim(),
      telefono: telefono.trim(),
      comunidad: comunidad || "Comunidad Rural",
      mensajeExtra: mensajeExtra.trim(),
    });

    setNombreCompleto("");
    setDocumento("");
    setCorreo("");
    setTelefono("");
    setMensajeExtra("");
    setMostrarFormulario(false);
  };

  return (
    <div>
      <div className="section-banner">
        <span>
          {esCurso ? "🎓 Detalle del Curso Gratuito" : "💼 Detalle de la Oportunidad de Trabajo"}
        </span>
        <button type="button" className="btn btn-dark" onClick={onVolver}>
          ← Volver al listado
        </button>
      </div>

      <article
        className={`card ${esCurso ? "card-accent-blue" : "card-accent-green"}`}
        style={{ gap: "18px" }}
      >
        <div className="card-header-row">
          <div>
            <h2
              className={`card-title ${esCurso ? "title-blue" : "title-green"}`}
              style={{ fontSize: "1.45rem" }}
            >
              {item.titulo}
            </h2>
            <p className="meta-row">
              🏢 <strong>{esCurso ? "Institución:" : "Empresa:"}</strong>{" "}
              {esCurso ? item.institucion : item.empresa}
            </p>
          </div>
          <span className={`badge ${esCurso ? "badge-blue" : "badge-green"}`}>
            {item.categoria || (esCurso ? "Formación" : "Empleo Rural")}
          </span>
        </div>

        <div className="grid-2">
          {esCurso ? (
            <>
              <p className="meta-row">
                ⏱️ <strong>Duración:</strong> {item.duracion}
              </p>
              <p className="meta-row">
                💻 <strong>Modalidad:</strong> {item.modalidad}
              </p>
              <p className="meta-row">
                💵 <strong>Costo:</strong> GRATIS
              </p>
              {item.fechas && (
                <p className="meta-row">
                  📅 <strong>Fechas:</strong> {item.fechas}
                </p>
              )}
            </>
          ) : (
            <>
              {item.salario && (
                <p className="meta-row">
                  💰 <strong>Salario:</strong> {item.salario}
                </p>
              )}
              <p className="meta-row">
                📍 <strong>Ubicación:</strong> {item.ubicacion}
              </p>
              <p className="meta-row">
                🕒 <strong>Tipo de contrato:</strong> {item.contrato}
              </p>
              {item.experiencia && (
                <p className="meta-row">
                  📌 <strong>Experiencia:</strong> {item.experiencia}
                </p>
              )}
              {item.limite && (
                <p className="meta-row">
                  📅 <strong>Fecha límite:</strong> {item.limite}
                </p>
              )}
            </>
          )}
        </div>

        {/* Descripción amplia */}
        <div
          className="card"
          style={{ background: "#f8fafc", boxShadow: "none", padding: "16px" }}
        >
          <h3 className="card-title" style={{ fontSize: "1.05rem" }}>
            📝 {esCurso ? "¿En qué consiste este curso?" : "¿En qué consiste este trabajo?"}
          </h3>
          <p className="card-desc" style={{ color: "var(--text)", fontSize: "0.95rem" }}>
            {item.descripcion}
          </p>
          <p className="card-desc" style={{ color: "var(--text)", fontSize: "0.95rem" }}>
            {item.detallesAmplios ||
              (esCurso
                ? "Este programa formativo está diseñado para fortalecer las capacidades técnicas y productivas de los habitantes rurales mediante talleres prácticos y acompañamiento continuo."
                : "La empresa busca talento local comprometido para apoyar las operaciones diarias en la región, brindando herramientas de trabajo, inducción completa y condiciones dignas.")}
          </p>
        </div>

        {/* Requisitos y Beneficios */}
        <div className="grid-2">
          <div
            className="card"
            style={{ background: "#f8fafc", boxShadow: "none", padding: "16px" }}
          >
            <h3 className="card-title" style={{ fontSize: "1.02rem" }}>
              📋 Requisitos
            </h3>
            <ul style={{ paddingLeft: "18px", color: "var(--text)", fontSize: "0.92rem" }}>
              {requisitosLista.map((req, idx) => (
                <li key={idx} style={{ marginBottom: "6px" }}>
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="card"
            style={{ background: "#f8fafc", boxShadow: "none", padding: "16px" }}
          >
            <h3 className="card-title" style={{ fontSize: "1.02rem" }}>
              ⭐ {esCurso ? "¿Qué incluye el curso?" : "Beneficios ofrecidos"}
            </h3>
            <ul style={{ paddingLeft: "18px", color: "var(--text)", fontSize: "0.92rem" }}>
              {beneficiosLista.map((ben, idx) => (
                <li key={idx} style={{ marginBottom: "6px" }}>
                  {ben}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cupos */}
        <div className="quota-box">
          <div className="quota-header">
            <span>Cupos disponibles:</span>
            <span>
              {disponibles} de {totalCupos} disponibles
            </span>
          </div>
          <div className="progress-track">
            <div
              className={esCurso ? "progress-fill-blue" : "progress-fill-green"}
              style={{ width: `${porcentaje}%` }}
            />
          </div>
        </div>

        {/* Botón para abrir inscripción */}
        <div className="card-actions" style={{ paddingTop: "8px" }}>
          <button
            type="button"
            className={`btn ${esCurso ? "btn-blue" : "btn-green"}`}
            disabled={disponibles === 0}
            onClick={() => setMostrarFormulario((prev) => !prev)}
          >
            {disponibles === 0
              ? "Sin cupos disponibles"
              : mostrarFormulario
                ? "Ocultar formulario de inscripción"
                : esCurso
                  ? "✍️ Inscribirme a este Curso"
                  : "✍️ Inscribirme a este Trabajo"}
          </button>
        </div>

        {/* Formulario de datos personales */}
        {mostrarFormulario && disponibles > 0 && (
          <form
            onSubmit={manejarEnvio}
            className="card form-stack"
            style={{ background: "#f8fafc", marginTop: "6px" }}
          >
            <h3 className={`card-title ${esCurso ? "title-blue" : "title-green"}`}>
              👤 Datos Personales para {esCurso ? "la Inscripción" : "la Postulación"}
            </h3>

            <div className="grid-2">
              <div>
                <label className="meta-row" htmlFor="ins-nombre">
                  <strong>Nombre completo *</strong>
                </label>
                <input
                  id="ins-nombre"
                  className="input"
                  type="text"
                  placeholder="Ej: María Fernanda López"
                  value={nombreCompleto}
                  onChange={(e) => setNombreCompleto(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="meta-row" htmlFor="ins-doc">
                  <strong>Número de documento *</strong>
                </label>
                <input
                  id="ins-doc"
                  className="input"
                  type="text"
                  placeholder="Ej: 1085234567"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="meta-row" htmlFor="ins-correo">
                  <strong>Correo electrónico *</strong>
                </label>
                <input
                  id="ins-correo"
                  className="input"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="meta-row" htmlFor="ins-tel">
                  <strong>Teléfono de contacto *</strong>
                </label>
                <input
                  id="ins-tel"
                  className="input"
                  type="tel"
                  placeholder="Ej: 3150000000"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="meta-row" htmlFor="ins-comunidad">
                <strong>Comunidad rural</strong>
              </label>
              <select
                id="ins-comunidad"
                className="select"
                value={comunidad}
                onChange={(e) => setComunidad(e.target.value)}
              >
                {comunidades.map((com) => (
                  <option key={com.id} value={com.nombre}>
                    {com.nombre} ({com.region})
                  </option>
                ))}
                <option value="Comunidad Rural Independiente">Comunidad Rural Independiente</option>
              </select>
            </div>

            <div>
              <label className="meta-row" htmlFor="ins-nota">
                <strong>{esCurso ? "Motivación o disponibilidad" : "Experiencia o nota breve"}</strong>
              </label>
              <textarea
                id="ins-nota"
                className="textarea"
                placeholder={
                  esCurso
                    ? "¿Por qué te interesa este curso o qué horario prefieres?"
                    : "Cuéntanos brevemente tu experiencia o disponibilidad..."
                }
                value={mensajeExtra}
                onChange={(e) => setMensajeExtra(e.target.value)}
              />
            </div>

            <div className="card-actions">
              <button
                type="submit"
                className={`btn ${esCurso ? "btn-blue" : "btn-green"}`}
              >
                ✅ Confirmar {esCurso ? "inscripción" : "postulación"}
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => setMostrarFormulario(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </article>
    </div>
  );
}

export default DetalleOportunidadView;