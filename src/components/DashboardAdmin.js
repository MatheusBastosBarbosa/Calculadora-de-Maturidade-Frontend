import React from 'react';
import PerguntaForm from './PerguntaForm';
import Relatorio from './Relatorio';

function DashboardAdmin({ usuario }) {
  return (
    <div>
      <h2>Painel do Administrador</h2>
      <p>Bem-vindo, {usuario.nome}</p>
      <PerguntaForm />
      <Relatorio />
    </div>
  );
}

export default DashboardAdmin;
