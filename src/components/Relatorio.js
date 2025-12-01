import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Relatorio() {
  const [data, setData] = useState({ labels: [], datasets: [] });

  const fetchRelatorio = async () => {
    const res = await axios.get('http://localhost:3001/api/relatorio');
    const labels = res.data.map(r => `Usuário ${r.id_usuario}`);
    const valores = res.data.map(r => r.percentual);

    setData({
      labels,
      datasets: [{
        label: '% de Aproveitamento',
        data: valores,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      }]
    });
  };

  useEffect(() => { fetchRelatorio(); }, []);

  return (
    <div>
      <h3>Relatório de Aprovação</h3>
      <Bar data={data} />
    </div>
  );
}

export default Relatorio;
