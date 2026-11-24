function Navbar({ pestanaActiva, onCambiarPestana }) {
  const pestanas = [
    { id: "comunidades", label: "👥 Comunidades" },
    { id: "cursos", label: "🎓 Cursos Gratuitos" },
    { id: "vacantes", label: "💼 Oportunidades de Trabajo" },
    { id: "inscripciones", label: "📋 Tus Inscripciones" },
    { id: "empresas", label: "🏢 Panel de Empresas" },
    { id: "auth", label: "🔐 Ingresar / Registro" },
  ];

  return (
    <nav className="navbar" aria-label="Navegación principal">
      {pestanas.map((p) => (
        <button
          key={p.id}
          type="button"
          className={`nav-btn ${pestanaActiva === p.id ? "active" : ""}`}
          onClick={() => onCambiarPestana(p.id)}
        >
          {p.label}
        </button>
      ))}
    </nav>
  );
}

export default Navbar;