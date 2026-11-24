import { useState } from "react";

function AuthUsuariosView({ usuarioActivo, onLoginUsuario, onLogoutUsuario }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [regNombre, setRegNombre] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");

  const manejarLogin = (e) => {
    e.preventDefault();
    if (!loginEmail.trim()) return;
    onLoginUsuario({ nombre: loginEmail.split("@")[0], email: loginEmail.trim() });
    setLoginEmail("");
    setLoginPass("");
  };

  const manejarRegistro = (e) => {
    e.preventDefault();
    if (!regNombre.trim() || !regEmail.trim()) return;
    onLoginUsuario({ nombre: regNombre.trim(), email: regEmail.trim() });
    setRegNombre("");
    setRegEmail("");
    setRegPass("");
  };

  return (
    <div className="grid-2">
      <section className="card">
        <h2 className="card-title title-green">↪ Iniciar Sesión (Usuarios)</h2>
        <form className="form-stack" onSubmit={manejarLogin}>
          <div className="field-group">
            <label>Correo Electrónico</label>
            <input
              className="input"
              type="email"
              placeholder="correo@ejemplo.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
          </div>
          <div className="field-group">
            <label>Contraseña</label>
            <input
              className="input"
              type="password"
              placeholder="********"
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-green">
            Entrar
          </button>
        </form>

        <div className="divider-note">
          <p>
            {usuarioActivo
              ? `Sesión iniciada como ${usuarioActivo.email}`
              : "¿Quieres salir de tu cuenta de usuario?"}
          </p>
          <button type="button" className="btn btn-outline-danger" onClick={onLogoutUsuario}>
            ↪ Cerrar Sesión
          </button>
        </div>
      </section>

      <section className="card">
        <h2 className="card-title title-blue">👤+ Registrarse</h2>
        <form className="form-stack" onSubmit={manejarRegistro}>
          <div className="field-group">
            <label>Nombre</label>
            <input
              className="input"
              type="text"
              placeholder="Tu nombre"
              value={regNombre}
              onChange={(e) => setRegNombre(e.target.value)}
              required
            />
          </div>
          <div className="field-group">
            <label>Correo Electrónico</label>
            <input
              className="input"
              type="email"
              placeholder="correo@ejemplo.com"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              required
            />
          </div>
          <div className="field-group">
            <label>Contraseña</label>
            <input
              className="input"
              type="password"
              placeholder="********"
              value={regPass}
              onChange={(e) => setRegPass(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-blue">
            Crear Cuenta
          </button>
        </form>
      </section>
    </div>
  );
}

export default AuthUsuariosView;