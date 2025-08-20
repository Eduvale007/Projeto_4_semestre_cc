// Dados de exemplo (simulando um banco de dados)
// Em uma aplicação real, estes dados viriam do back-end
const mockProducts = [
    { id: 1, name: 'Parafuso Sextavado 1/4"', quantity: 1500, sales_history: [
        { period: 1, demand: 200 }, { period: 2, demand: 220 },
        { period: 3, demand: 250 }, { period: 4, demand: 240 },
        { period: 5, demand: 280 }, { period: 6, demand: 300 },
    ]},
    { id: 2, name: 'Arruela Lisa 1/4"', quantity: 3200, sales_history: [
        { period: 1, demand: 500 }, { period: 2, demand: 510 },
        { period: 3, demand: 530 }, { period: 4, demand: 525 },
        { period: 5, demand: 560 }, { period: 6, demand: 580 },
    ]},
    { id: 3, name: 'Porca 1/4"', quantity: 2100, sales_history: [
        { period: 1, demand: 300 }, { period: 2, demand: 320 },
        { period: 3, demand: 310 }, { period: 4, demand: 340 },
        { period: 5, demand: 350 }, { period: 6, demand: 380 },
    ]},
];

let myChart;

// Função para exibir a view correta (Estoque ou Previsão)
function showView(viewId) {
    document.getElementById('inventoryView').style.display = 'none';
    document.getElementById('forecastView').style.display = 'none';
    document.getElementById(viewId).style.display = 'block';
}

// Função para renderizar a tabela de estoque
function renderInventoryTable() {
    const tableBody = document.getElementById('inventoryTableBody');
    tableBody.innerHTML = ''; // Limpa a tabela
    mockProducts.forEach(product => {
        const row = `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>
                    <button class="btn btn-sm btn-warning">Editar</button>
                    <button class="btn btn-sm btn-danger">Excluir</button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Função para popular o select de produtos na página de previsão
function populateProductSelect() {
    const select = document.getElementById('productSelect');
    select.innerHTML = '';
    mockProducts.forEach(product => {
        const option = `<option value="${product.id}">${product.name}</option>`;
        select.innerHTML += option;
    });
}

// Função para chamar o back-end e obter a previsão
async function getForecast() {
    const productId = document.getElementById('productSelect').value;
    const periodToForecast = document.getElementById('periodsToForecast').value;
    const product = mockProducts.find(p => p.id == productId);

    if (!product) {
        alert('Produto não encontrado!');
        return;
    }

    // Em uma aplicação real, aqui faríamos a chamada para o back-end
    // const response = await fetch('http://127.0.0.1:5000/api/forecast', { ... });
    // Por enquanto, vamos simular a chamada e o cálculo aqui.
    try {
        const response = await fetch('http://127.0.0.1:5000/api/forecast', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                historical_data: product.sales_history,
                period_to_predict: parseInt(periodToForecast)
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar previsão do servidor.');
        }

        const data = await response.json();
        const predictedDemand = Math.round(data.predicted_demand);

        const resultDiv = document.getElementById('forecastResult');
        resultDiv.innerHTML = `A previsão de demanda para o período <strong>${periodToForecast}</strong> é de <strong>${predictedDemand}</strong> unidades.`;
        resultDiv.style.display = 'block';

        updateChart(product.sales_history, data.regression_line, periodToForecast, predictedDemand);

    } catch (error) {
        console.error('Erro:', error);
        const resultDiv = document.getElementById('forecastResult');
        resultDiv.innerHTML = `Não foi possível conectar ao back-end. Verifique se ele está rodando.`;
        resultDiv.style.display = 'block';
        resultDiv.className = 'mt-3 alert alert-danger';
    }
}

// Função para atualizar o gráfico
function updateChart(historicalData, regressionLine, predictedPeriod, predictedValue) {
    const ctx = document.getElementById('demandChart').getContext('2d');
    const labels = historicalData.map(d => `Período ${d.period}`);
    const actualDemand = historicalData.map(d => d.demand);

    // Adiciona o ponto previsto ao gráfico
    const extendedLabels = [...labels, `Período ${predictedPeriod} (Previsto)`];
    const regressionPoints = [...regressionLine, {period: predictedPeriod, demand: predictedValue}];

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: extendedLabels,
            datasets: [{
                label: 'Demanda Real',
                data: actualDemand,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.1)',
                tension: 0.1
            }, {
                label: 'Linha de Regressão (Tendência)',
                data: regressionPoints.map(p => p.demand),
                borderColor: 'red',
                borderDash: [5, 5],
                backgroundColor: 'transparent',
                type: 'line',
                fill: false,
            }, {
                label: 'Demanda Prevista',
                data: [...new Array(actualDemand.length).fill(null), predictedValue], // Preenche com nulos para posicionar o ponto
                borderColor: 'green',
                backgroundColor: 'green',
                pointRadius: 8,
                type: 'bubble'
            }]
        },
        options: {
            scales: { y: { beginAtZero: true } }
        }
    });
}


// Inicialização da página
document.addEventListener('DOMContentLoaded', () => {
    renderInventoryTable();
    populateProductSelect();
});