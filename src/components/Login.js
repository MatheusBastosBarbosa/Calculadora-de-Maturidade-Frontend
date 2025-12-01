import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/login', { email, senha });
      if(res.data.success){
        onLogin(res.data.usuario);
      } else {
        alert('Email ou senha incorretos');
      }
    } catch (error) {
      console.error(error);
      alert('Erro na conexão com o servidor');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} required />
      <button type="submit">Entrar</button>
    </form>
  );
}

export default Login;
