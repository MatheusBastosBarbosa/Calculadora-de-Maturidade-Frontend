import React, { useState } from 'react';
import Login from './components/Login';
import DashboardAdmin from './components/DashboardAdmin';
import DashboardAvaliador from './components/DashboardAvaliador';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (usuario) => {
    setUser(usuario);
  };

  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <div>
      {user.tipo_usuario === 'administrador' ? (
        <DashboardAdmin usuario={user} />
      ) : (
        <DashboardAvaliador usuario={user} />
      )}
    </div>
  );
}

export default App;
