import { useState } from "react";

function AdminModal({ abierto, onCerrar, esAdmin, onLoginAdmin, onLogoutAdmin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!abierto) return null;

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    onLoginAdmin(email.trim());
    setEmail("");
    setPassword("");
    onCerrar();
  };

  return (
    <div className="modal-backdrop" onClick={onCerrar}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>🛡️ Acceso Administrativo</h3>
          <button type="button" className="modal-close" onClick={onCerrar} aria-label="Cerrar">
            ✕
          </button>
        </div>

        <div className="modal-body">
          <form className="form-stack" onSubmit={manejarSubmit}>
            <div className="field-group">
              <label>Correo de Administrador</label>
              <input
                className="input"
                type="email"
                placeholder="admin@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field-group">
              <label>Contraseña</label>
              <input
                className="input"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-dark">
              Ingresar como Administrador
            </button>
          </form>

          <div className="divider-note">
            {esAdmin && <p>Modo administrador activo</p>}
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => {
                onLogoutAdmin();
                onCerrar();
              }}
            >
              ↪ Cerrar Sesión de Administrador
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminModal;