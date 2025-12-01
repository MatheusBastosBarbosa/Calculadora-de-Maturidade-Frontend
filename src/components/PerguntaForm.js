import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PerguntaForm() {
  const [nivel, setNivel] = useState(1);
  const [texto, setTexto] = useState('');
  const [perguntas, setPerguntas] = useState([]);

  const fetchPerguntas = async () => {
    const res = await axios.get(`http://localhost:3001/api/perguntas?nivel=${nivel}`);
    setPerguntas(res.data);
  };

  useEffect(() => { fetchPerguntas(); }, [nivel]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/api/perguntas', { nivel, texto });
    setTexto('');
    fetchPerguntas();
  };

  return (
    <div>
      <h3>Gerenciar Perguntas</h3>
      <form onSubmit={handleSubmit}>
        <select value={nivel} onChange={e => setNivel(parseInt(e.target.value))}>
          <option value={1}>Nível 1</option>
          <option value={2}>Nível 2</option>
        </select>
        <input type="text" placeholder="Texto da pergunta" value={texto} onChange={e => setTexto(e.target.value)} required />
        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {perguntas.map(p => (
          <li key={p.id_pergunta}>{p.texto_pergunta}</li>
        ))}
      </ul>
    </div>
  );
}

export default PerguntaForm;
