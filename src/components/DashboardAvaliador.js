import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DashboardAvaliador({ usuario }) {
  const [nivel, setNivel] = useState(1);
  const [perguntas, setPerguntas] = useState([]);
  const [respostas, setRespostas] = useState({});

  const fetchPerguntas = async () => {
    const res = await axios.get(`http://localhost:3001/api/perguntas?nivel=${nivel}`);
    setPerguntas(res.data);
    setRespostas({});
  };

  useEffect(() => {
    fetchPerguntas();
  }, [nivel]);

  const handleResposta = (id, valor) => {
    setRespostas({ ...respostas, [id]: valor });
  };

  const handleSubmit = async () => {
    const respostasArray = Object.keys(respostas).map(id => ({
      id_pergunta: parseInt(id),
      resposta: parseInt(respostas[id])
    }));

    try {
      await axios.post('http://localhost:3001/api/avaliacoes', {
        id_usuario: usuario.id,
        nivel,
        respostas: respostasArray
      });
      alert('Avaliação enviada com sucesso!');
      fetchPerguntas(); // limpar respostas após enviar
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar avaliação');
    }
  };

  return (
    <div>
      <h2>Painel do Avaliador</h2>
      <p>Bem-vindo, {usuario.nome}</p>

      <div>
        <label>Nível:</label>
        <select value={nivel} onChange={e => setNivel(parseInt(e.target.value))}>
          <option value={1}>Nível 1</option>
          <option value={2}>Nível 2</option>
        </select>
      </div>

      <ul>
        {perguntas.map(p => (
          <li key={p.id_pergunta}>
            <p>{p.texto_pergunta}</p>
            <select onChange={e => handleResposta(p.id_pergunta, e.target.value)}>
              <option value="">Selecione</option>
              {[1,2,3,7,8,9,10].map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </li>
        ))}
      </ul>

      {perguntas.length > 0 && (
        <button onClick={handleSubmit}>Enviar Avaliação</button>
      )}
    </div>
  );
}

export default DashboardAvaliador;
