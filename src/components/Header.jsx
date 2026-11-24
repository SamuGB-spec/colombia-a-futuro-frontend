function Header({ onAbrirAdmin, esAdmin }) {
  return (
    <header className="top-header">
      <div className="brand-box">
        <div className="brand-icon" aria-hidden="true">🌲</div>
        <div className="brand-text">
          <h1>Colombia a Futuro</h1>
          <span>Educación gratuita y empleo para comunidades rurales</span>
        </div>
      </div>

      <button
        type="button"
        className="admin-trigger-btn"
        onClick={onAbrirAdmin}
        title={esAdmin ? "Panel de Administrador (Activo)" : "Acceso Administrativo"}
        aria-label="Abrir acceso administrativo"
      >
        ☰
      </button>
    </header>
  );
}

export default Header;