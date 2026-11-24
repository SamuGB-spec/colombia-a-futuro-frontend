import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Navbar from "./components/Navbar.jsx";
import ComunidadesView from "./components/ComunidadesView.jsx";
import CursosView from "./components/CursosView.jsx";
import VacantesView from "./components/VacantesView.jsx";
import DetalleOportunidadView from "./components/DetalleOportunidadView.jsx";
import InscripcionesView from "./components/InscripcionesView.jsx";
import PanelEmpresasView from "./components/PanelEmpresasView.jsx";
import AuthUsuariosView from "./components/AuthUsuariosView.jsx";
import AdminModal from "./components/AdminModal.jsx";

function App() {
  const [pestana, setPestana] = useState("comunidades");
  const [detalleSeleccionado, setDetalleSeleccionado] = useState(null);
  const [modalAdminAbierto, setModalAdminAbierto] = useState(false);
  const [esAdmin, setEsAdmin] = useState(false);
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [aviso, setAviso] = useState("");

  const [comunidades, setComunidades] = useState([
    {
      id: 1,
      nombre: "Vector",
      region: "Casanare",
      miembros: 150,
      email: "vector@email.com",
      descripcion:
        "Comunidad rural dedicada a la agricultura y ganadería sostenible en el oriente colombiano.",
    },
    {
      id: 2,
      nombre: "La Esperanza",
      region: "Amazonas",
      miembros: 85,
      email: "esperanza@email.com",
      descripcion:
        "Comunidad indígena y rural en la selva amazónica, conservando tradiciones ancestrales.",
    },
    {
      id: 3,
      nombre: "San Francisco",
      region: "Antioquia",
      miembros: 220,
      email: "sanfrancisco@email.com",
      descripcion:
        "Pueblo rural en las montañas antioqueñas, conocido por su café de calidad.",
    },
  ]);

  const [cursos, setCursos] = useState([
    {
      id: 1,
      titulo: "Computación Básica",
      categoria: "Tecnología",
      institucion: "Microsoft Colombia",
      duracion: "40 horas",
      modalidad: "100% Virtual",
      fechas: "2026-07-01 al 2026-08-30",
      cuposTotales: 50,
      inscritos: 0,
      descripcion:
        "Curso gratuito de 40 horas para aprender a usar computadora, Word, Excel e internet.",
      detallesAmplios:
        "Aprenderás desde cero el manejo básico del computador, creación y formato de documentos en Word, hojas de cálculo en Excel para organizar presupuestos comunitarios y uso seguro del correo electrónico e internet con acompañamiento virtual.",
      requisitos: [
        "Pertenecer o estar vinculado a una comunidad rural.",
        "Contar con acceso a computador o punto digital comunitario.",
        "Disponibilidad de 4 horas semanales.",
      ],
      beneficios: [
        "Certificado digital respaldado por Microsoft Colombia.",
        "Guías prácticas descargables paso a paso.",
        "Acompañamiento de tutores durante todo el curso.",
      ],
    },
    {
      id: 2,
      titulo: "Agricultura Sostenible",
      categoria: "Agricultura",
      institucion: "SENA",
      duracion: "60 horas",
      modalidad: "Virtual / Presencial",
      fechas: "2026-07-15 al 2026-09-30",
      cuposTotales: 30,
      inscritos: 0,
      descripcion:
        "Curso de técnicas de agricultura sostenible, cultivo orgánico y manejo de suelos.",
      detallesAmplios:
        "Formación teórico-práctica enfocada en preparación de abonos orgánicos, rotación de cultivos, manejo responsable de suelos, control biológico de plagas y optimización del riego para fortalecer las parcelas rurales.",
      requisitos: [
        "Interés o vínculo con labores agrícolas o pecuarias en su región.",
        "Documento de identidad vigente.",
        "Compromiso para asistir a las sesiones y prácticas programadas.",
      ],
      beneficios: [
        "Certificación del programa formativo del SENA.",
        "Material técnico sobre compostaje y cuidado de suelos.",
        "Orientación práctica aplicable a proyectos rurales.",
      ],
    },
    {
      id: 3,
      titulo: "Emprendimiento Rural",
      categoria: "Emprendimiento",
      institucion: "Bancóldex",
      duracion: "30 horas",
      modalidad: "100% Virtual",
      fechas: "2026-08-01 al 2026-09-15",
      cuposTotales: 40,
      inscritos: 0,
      descripcion:
        "Curso de negocio y emprendimiento para comunidades rurales. Aprende a crear tu propio negocio.",
      detallesAmplios:
        "Diseñado para emprendedores y asociaciones rurales que buscan estructurar su modelo de negocio, calcular costos reales de producción, fijar precios sostenibles y mejorar la comercialización de sus productos.",
      requisitos: [
        "Tener una idea productiva o iniciativa comunitaria.",
        "Disponibilidad de 3 horas semanales.",
        "Conexión básica para acceder a las clases y talleres.",
      ],
      beneficios: [
        "Plantillas de costos y plan de negocio listas para usar.",
        "Certificado de participación al completar el curso.",
        "Ejercicios prácticos enfocados en mercados locales.",
      ],
    },
  ]);

  const [vacantes, setVacantes] = useState([
    {
      id: 1,
      titulo: "Operador de Bodega",
      categoria: "Logística",
      empresa: "Grupo Éxito",
      salario: "$1.5M - $2M COP",
      ubicacion: "Casanare, Colombia",
      contrato: "Full-time",
      experiencia: "No requiere experiencia",
      limite: "2026-07-30",
      cuposTotales: 10,
      postulados: 0,
      descripcion:
        "Posición de operador de bodega para distribución de productos. Incluye capacitación.",
      detallesAmplios:
        "El cargo consiste en apoyar la recepción, clasificación, almacenamiento, control de inventario y despacho de mercancía en centro de acopio o punto logístico regional, siguiendo protocolos de orden y seguridad.",
      requisitos: [
        "Ser mayor de edad con documento de identidad vigente.",
        "Residir en Casanare o zonas cercanas a la operación.",
        "Disponibilidad para turnos acordados y trabajo en equipo.",
      ],
      beneficios: [
        "Capacitación inicial para desempeñar el cargo.",
        "Salario competitivo más prestaciones de ley.",
        "Dotación y acompañamiento en el puesto de trabajo.",
      ],
    },
    {
      id: 2,
      titulo: "Agricultor de Café",
      categoria: "Agricultura",
      empresa: "Juan Valdez",
      salario: "$1.8M - $2.5M COP",
      ubicacion: "Antioquia, Colombia",
      contrato: "Full-time",
      experiencia: "1 año mínimo en agricultura",
      limite: "2026-08-15",
      cuposTotales: 15,
      postulados: 0,
      descripcion: "Trabajo en cultivo y procesamiento de café orgánico. Salario + beneficios.",
      detallesAmplios:
        "Consiste en realizar labores de mantenimiento de cultivos de café, fertilización orgánica, recolección selectiva del grano y apoyo en los procesos de beneficio y secado manteniendo estándares de calidad rural.",
      requisitos: [
        "Mínimo 1 año de experiencia en agricultura o labores de campo.",
        "Conocimiento o disposición para recolección selectiva de café.",
        "Disponibilidad para laborar en la zona rural de Antioquia.",
      ],
      beneficios: [
        "Salario base más bonificaciones por desempeño y cosecha.",
        "Afiliación a seguridad social y beneficios del cargo.",
        "Capacitación continua en buenas prácticas agrícolas.",
      ],
    },
  ]);

  const [inscripciones, setInscripciones] = useState([
    {
      id: 101,
      tipo: "curso",
      titulo: "Computación Básica",
      comunidad: "Vector",
      participante: "Juan Pérez",
      fecha: "2026-06-10",
      estado: "Inscrito",
    },
    {
      id: 102,
      tipo: "trabajo",
      titulo: "Operador de Bodega",
      comunidad: "La Esperanza",
      participante: "Ana Gómez",
      fecha: "2026-06-12",
      estado: "Pendiente",
    },
  ]);

  useEffect(() => {
    const titulos = {
      comunidades: "Comunidades | Colombia a Futuro",
      cursos: "Cursos Gratuitos | Colombia a Futuro",
      vacantes: "Vacantes Rurales | Colombia a Futuro",
      inscripciones: "Tus Inscripciones | Colombia a Futuro",
      empresas: "Panel de Empresas | Colombia a Futuro",
      auth: "Acceso Usuarios | Colombia a Futuro",
    };
    document.title = titulos[pestana] || "Colombia a Futuro";
  }, [pestana]);

  const mostrarAviso = (mensaje) => {
    setAviso(mensaje);
  };

  const cambiarPestana = (nuevaPestana) => {
    setPestana(nuevaPestana);
    setDetalleSeleccionado(null);
  };

  const manejarInscribirCurso = (curso, datosPersonales) => {
    setCursos(
      cursos.map((c) =>
        c.id === curso.id ? { ...c, inscritos: Math.min(c.cuposTotales, c.inscritos + 1) } : c
      )
    );
    setInscripciones([
      {
        id: Date.now(),
        tipo: "curso",
        titulo: curso.titulo,
        comunidad: datosPersonales?.comunidad || comunidades[0]?.nombre || "Vector",
        participante:
          datosPersonales?.nombreCompleto ||
          usuarioActivo?.nombre ||
          usuarioActivo?.email ||
          "Participante Rural",
        documento: datosPersonales?.documento || "",
        correo: datosPersonales?.correo || "",
        telefono: datosPersonales?.telefono || "",
        fecha: new Date().toISOString().slice(0, 10),
        estado: "Inscrito",
      },
      ...inscripciones,
    ]);
    mostrarAviso(
      `Inscripción visual registrada para ${datosPersonales?.nombreCompleto || "el participante"} en "${curso.titulo}".`
    );
  };

  const manejarPostularVacante = (vacante, datosPersonales) => {
    setVacantes(
      vacantes.map((v) =>
        v.id === vacante.id ? { ...v, postulados: Math.min(v.cuposTotales, v.postulados + 1) } : v
      )
    );
    setInscripciones([
      {
        id: Date.now(),
        tipo: "trabajo",
        titulo: vacante.titulo,
        comunidad: datosPersonales?.comunidad || comunidades[0]?.nombre || "La Esperanza",
        participante:
          datosPersonales?.nombreCompleto ||
          usuarioActivo?.nombre ||
          usuarioActivo?.email ||
          "Candidato Rural",
        documento: datosPersonales?.documento || "",
        correo: datosPersonales?.correo || "",
        telefono: datosPersonales?.telefono || "",
        fecha: new Date().toISOString().slice(0, 10),
        estado: "Pendiente",
      },
      ...inscripciones,
    ]);
    mostrarAviso(
      `Postulación visual enviada para ${datosPersonales?.nombreCompleto || "el candidato"} en "${vacante.titulo}".`
    );
  };

  const cursoDetalleActual =
    detalleSeleccionado?.tipo === "curso"
      ? cursos.find((c) => c.id === detalleSeleccionado.id)
      : null;

  const vacanteDetalleActual =
    detalleSeleccionado?.tipo === "trabajo"
      ? vacantes.find((v) => v.id === detalleSeleccionado.id)
      : null;

  return (
    <div className="app-shell">
      <Header onAbrirAdmin={() => setModalAdminAbierto(true)} esAdmin={esAdmin} />
      <Navbar pestanaActiva={pestana} onCambiarPestana={cambiarPestana} />

      {/* Resumen de métricas pulido */}
      <section className="stats-grid" aria-label="Resumen de la plataforma">
        <div className="stat-card stat-blue">
          <div>
            <div className="stat-number">{comunidades.length}</div>
            <div className="stat-label">Comunidades</div>
          </div>
          <div className="stat-icon">👥</div>
        </div>

        <div className="stat-card stat-blue">
          <div>
            <div className="stat-number">{cursos.length}</div>
            <div className="stat-label">Cursos Disponibles</div>
          </div>
          <div className="stat-icon">🎓</div>
        </div>

        <div className="stat-card stat-green">
          <div>
            <div className="stat-number">{vacantes.length}</div>
            <div className="stat-label">Oportunidades de Trabajo</div>
          </div>
          <div className="stat-icon">💼</div>
        </div>

        <div className="stat-card stat-amber">
          <div>
            <div className="stat-number">{inscripciones.length}</div>
            <div className="stat-label">Inscripciones</div>
          </div>
          <div className="stat-icon">📋</div>
        </div>
      </section>

      {aviso && (
        <div className="toast-banner" role="status">
          <span>✅ {aviso}</span>
          <button
            type="button"
            className="toast-close"
            onClick={() => setAviso("")}
            aria-label="Cerrar aviso"
          >
            ✕
          </button>
        </div>
      )}

      <main>
        {pestana === "comunidades" && (
          <ComunidadesView
            comunidades={comunidades}
            esAdmin={esAdmin}
            onAgregarComunidad={(nueva) => {
              setComunidades([nueva, ...comunidades]);
              mostrarAviso(`Comunidad "${nueva.nombre}" agregada en la vista.`);
            }}
            onEliminarComunidad={(id) => {
              setComunidades(comunidades.filter((com) => com.id !== id));
              mostrarAviso("Comunidad eliminada de la vista.");
            }}
            onIrACursos={() => cambiarPestana("cursos")}
            onIrAVacantes={() => cambiarPestana("vacantes")}
          />
        )}

        {pestana === "cursos" &&
          (cursoDetalleActual ? (
            <DetalleOportunidadView
              tipo="curso"
              item={cursoDetalleActual}
              comunidades={comunidades}
              onVolver={() => setDetalleSeleccionado(null)}
              onConfirmarInscripcion={manejarInscribirCurso}
            />
          ) : (
            <CursosView
              cursos={cursos}
              esAdmin={esAdmin}
              onVerDetalle={(curso) => setDetalleSeleccionado({ tipo: "curso", id: curso.id })}
              onEliminar={(id) => {
                setCursos(cursos.filter((c) => c.id !== id));
                mostrarAviso("Curso eliminado de la vista.");
              }}
            />
          ))}

        {pestana === "vacantes" &&
          (vacanteDetalleActual ? (
            <DetalleOportunidadView
              tipo="trabajo"
              item={vacanteDetalleActual}
              comunidades={comunidades}
              onVolver={() => setDetalleSeleccionado(null)}
              onConfirmarInscripcion={manejarPostularVacante}
            />
          ) : (
            <VacantesView
              vacantes={vacantes}
              esAdmin={esAdmin}
              onVerDetalle={(vac) => setDetalleSeleccionado({ tipo: "trabajo", id: vac.id })}
              onEliminar={(id) => {
                setVacantes(vacantes.filter((v) => v.id !== id));
                mostrarAviso("Vacante eliminada de la vista.");
              }}
            />
          ))}

        {pestana === "inscripciones" && (
          <InscripcionesView
            inscripciones={inscripciones}
            onEliminarInscripcion={(id) => {
              setInscripciones(inscripciones.filter((item) => item.id !== id));
              mostrarAviso("Registro eliminado de Tus Inscripciones.");
            }}
          />
        )}

        {pestana === "empresas" && (
          <PanelEmpresasView
            onPublicarCurso={(nuevoCurso) => {
              setCursos([
                {
                  id: Date.now(),
                  categoria: "Formación",
                  fechas: "2026-09-01 al 2026-10-30",
                  cuposTotales: 40,
                  ...nuevoCurso,
                  inscritos: 0,
                },
                ...cursos,
              ]);
              cambiarPestana("cursos");
              mostrarAviso(`Curso "${nuevoCurso.titulo}" publicado en la vista.`);
            }}
            onPublicarVacante={(nuevaVacante) => {
              setVacantes([
                {
                  id: Date.now(),
                  categoria: "Empleo Rural",
                  salario: "$1.6M - $2.2M COP",
                  experiencia: "Según perfil",
                  limite: "2026-09-30",
                  cuposTotales: 12,
                  ...nuevaVacante,
                  postulados: 0,
                },
                ...vacantes,
              ]);
              cambiarPestana("vacantes");
              mostrarAviso(`Vacante "${nuevaVacante.titulo}" publicada en la vista.`);
            }}
          />
        )}

        {pestana === "auth" && (
          <AuthUsuariosView
            usuarioActivo={usuarioActivo}
            onLoginUsuario={(usuario) => {
              setUsuarioActivo(usuario);
              mostrarAviso(`Sesión visual iniciada para ${usuario.email}.`);
            }}
            onLogoutUsuario={() => {
              setUsuarioActivo(null);
              mostrarAviso("Sesión de usuario cerrada en la vista.");
            }}
          />
        )}
      </main>

      <AdminModal
        abierto={modalAdminAbierto}
        onCerrar={() => setModalAdminAbierto(false)}
        esAdmin={esAdmin}
        onLoginAdmin={() => {
          setEsAdmin(true);
          mostrarAviso("Modo administrador visual activado.");
        }}
        onLogoutAdmin={() => {
          setEsAdmin(false);
          mostrarAviso("Modo administrador desactivado.");
        }}
      />
    </div>
  );
}

export default App;