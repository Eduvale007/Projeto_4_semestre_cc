 // Global variables
        let products = [];
        let categoryChart, stockChart;

        // Sample data for demonstration
        const sampleProducts = [
            { name: "Parafuso Sextavado 1/4", stock: 1500, minStock: 500, price: 0.25, category: "Parafusos" },
            { name: "Arruela Lisa 1/4", stock: 3200, minStock: 1000, price: 0.15, category: "Arruelas" },
            { name: "Porca 1/4", stock: 2100, minStock: 800, price: 0.20, category: "Porcas" }
        ];

        // Tab navigation
        function showTab(tabName) {
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Remove active class from all nav tabs
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Show selected tab
            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
        }

        // Initialize the application
        function init() {
            // Load sample data
            products = [...sampleProducts];
            updateDashboard();
            renderProductsTable();
            initializeCharts();
            updateProductSelect();
            
            // Add form event listener
            document.getElementById('productForm').addEventListener('submit', handleAddProduct);
        }

        // Handle adding new product

        /*
        function handleAddProduct(e) {
            e.preventDefault();
            
            const product = {
                name: document.getElementById('productName').value,
                stock: parseInt(document.getElementById('currentStock').value),
                minStock: parseInt(document.getElementById('minStock').value),
                price: parseFloat(document.getElementById('unitPrice').value),
                category: document.getElementById('category').value
            };
            
            products.push(product);
            updateDashboard();
            renderProductsTable();
            updateCharts();
            updateProductSelect();
            
            // Reset form
            document.getElementById('productForm').reset();
        }

        // Update dashboard statistics
        function updateDashboard() {
            const totalProducts = products.length;
            const lowStockCount = products.filter(p => p.stock <= p.minStock).length;
            const totalValue = products.reduce((sum, p) => sum + (p.stock * p.price), 0);
            
            document.getElementById('totalProducts').textContent = totalProducts;
            document.getElementById('lowStockCount').textContent = lowStockCount;
            document.getElementById('totalValue').textContent = `R$ ${totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        }
            */
           // Handle adding new product
 
/*        
function handleAddProduct(e) {
    e.preventDefault(); // Evita o envio padrão do form

    // Pega os dados do formulário
    const product = {
        productName: document.getElementById('productName').value,
        category: document.getElementById('category').value,
        currentStock: parseInt(document.getElementById('currentStock').value),
        minStock: parseInt(document.getElementById('minStock').value),
        unitPrice: parseFloat(document.getElementById('unitPrice').value)
    };

    // Atualiza o array local e front-end
    products.push({
        name: product.productName,
        category: product.category,
        stock: product.currentStock,
        minStock: product.minStock,
        price: product.unitPrice
    });
    updateDashboard();
    renderProductsTable();
    updateCharts();
    updateProductSelect();

    // Envia os dados para o Flask/MySQL via POST
    fetch("/insertProduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product)
    })
    .then(res => res.json())
    .then(data => console.log(data.message))
    .catch(err => console.error("Erro ao enviar para o servidor:", err));

    // Reseta o formulário
    document.getElementById('productForm').reset();
}
    */

        // Render products table
        function renderProductsTable() {
            const tbody = document.getElementById('productsTable');
            
            if (products.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="7" style="text-align: center; color: #6b7280; padding: 40px;">
                            Nenhum produto cadastrado
                        </td>
                    </tr>
                `;
                return;
            }
            
            tbody.innerHTML = products.map((product, index) => {
                const stockStatus = product.stock <= product.minStock ? 'status-low' : 
                                  product.stock <= product.minStock * 1.5 ? 'status-warning' : 'status-normal';
                
                return `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${product.name}</td>
                        <td>${product.category}</td>
                        <td class="${stockStatus}">${product.stock}</td>
                        <td>${product.minStock}</td>
                        <td>R$ ${product.price.toFixed(2)}</td>
                        <td>
                            <button onclick="editProduct(${index})" class="btn-edit">Editar</button>
                            <button onclick="removeProduct(${index})" class="btn-delete">Excluir</button>
                        </td>
                    </tr>
                `;
            }).join('');
        }

        // Remove product
        function removeProduct(index) {
            if (confirm('Tem certeza que deseja remover este produto?')) {
                products.splice(index, 1);
                updateDashboard();
                renderProductsTable();
                updateCharts();
                updateProductSelect();
            }
        }

        // Edit product (placeholder)
        function editProduct(index) {
            alert('Funcionalidade de edição será implementada em breve!');
        }

        // Initialize charts
        function initializeCharts() {
            // Category Chart
            const categoryCtx = document.getElementById('categoryChart').getContext('2d');
            categoryChart = new Chart(categoryCtx, {
                type: 'doughnut',
                data: {
                    labels: [],
                    datasets: [{
                        data: [],
                        backgroundColor: [
                            '#3b82f6', '#1d4ed8', '#06b6d4', '#0891b2',
                            '#059669', '#047857', '#dc2626', '#b91c1c'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });

            // Stock Chart
            const stockCtx = document.getElementById('stockChart').getContext('2d');
            stockChart = new Chart(stockCtx, {
                type: 'bar',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'Estoque Atual',
                        data: [],
                        backgroundColor: 'rgba(59, 130, 246, 0.8)',
                        borderColor: '#3b82f6',
                        borderWidth: 2
                    }, {
                        label: 'Estoque Mínimo',
                        data: [],
                        backgroundColor: 'rgba(220, 38, 38, 0.8)',
                        borderColor: '#dc2626',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            updateCharts();
        }

        // Update charts
        function updateCharts() {
            // Update category chart
            const categoryData = {};
            products.forEach(product => {
                categoryData[product.category] = (categoryData[product.category] || 0) + 1;
            });

            categoryChart.data.labels = Object.keys(categoryData);
            categoryChart.data.datasets[0].data = Object.values(categoryData);
            categoryChart.update();

            // Update stock chart
            const topProducts = products.slice(0, 8);
            stockChart.data.labels = topProducts.map(p => p.name.length > 20 ? p.name.substring(0, 20) + '...' : p.name);
            stockChart.data.datasets[0].data = topProducts.map(p => p.stock);
            stockChart.data.datasets[1].data = topProducts.map(p => p.minStock);
            stockChart.update();
        }

        // Update product select for prediction
        function updateProductSelect() {
            const select = document.getElementById('predictProduct');
            select.innerHTML = '<option value="">Selecione um produto</option>' +
                products.map((product, index) => 
                    `<option value="${index}">${product.name}</option>`
                ).join('');
        }

        // Generate prediction using linear regression
        function generatePrediction() {
            const productIndex = document.getElementById('predictProduct').value;
            const days = parseInt(document.getElementById('predictDays').value);
            
            if (!productIndex || !days) {
                alert('Por favor, selecione um produto e informe o número de dias.');
                return;
            }
            
            const product = products[productIndex];
            
            // Simulate historical data for demonstration
            const historicalDemand = generateHistoricalData(product);
            
            // Simple linear regression calculation
            const prediction = calculateLinearRegression(historicalDemand, days);
            
            // Display result
            const resultDiv = document.getElementById('predictionResult');
            resultDiv.innerHTML = `
                <div class="prediction-result">
                    <div class="prediction-value">${prediction.demand} unidades</div>
                    <div>Demanda prevista para ${days} dias - ${product.name}</div>
                    <div style="margin-top: 10px;">
                        Tendência: ${prediction.trend > 0 ? '📈 Crescente' : prediction.trend < 0 ? '📉 Decrescente' : '➡️ Estável'}
                    </div>
                    <div class="prediction-recommendation">
                        <strong>Recomendação:</strong><br>
                        ${prediction.recommendation}
                    </div>
                </div>
            `;
        }

        // Generate simulated historical data
        function generateHistoricalData(product) {
            const data = [];
            const basedemand = Math.max(1, Math.floor(product.stock / 30));
            
            for (let i = 30; i >= 0; i--) {
                const variation = (Math.random() - 0.5) * 0.4;
                const seasonality = Math.sin(i * Math.PI / 15) * 0.2;
                const trend = -i * 0.01;
                
                const demand = Math.max(1, Math.floor(basedemand * (1 + variation + seasonality + trend)));
                data.push({ day: 30 - i, demand: demand });
            }
            
            return data;
        }

        // Calculate linear regression
        function calculateLinearRegression(data, forecastDays) {
            const n = data.length;
            const sumX = data.reduce((sum, d) => sum + d.day, 0);
            const sumY = data.reduce((sum, d) => sum + d.demand, 0);
            const sumXY = data.reduce((sum, d) => sum + (d.day * d.demand), 0);
            const sumX2 = data.reduce((sum, d) => sum + (d.day * d.day), 0);
            
            const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
            const intercept = (sumY - slope * sumX) / n;
            
            const futureDemand = Math.max(1, Math.floor(slope * (30 + forecastDays) + intercept));
            
            let recommendation = "";
            if (slope > 0.5) {
                recommendation = "Demanda crescente detectada. Considere aumentar o estoque em 20-30%.";
            } else if (slope < -0.5) {
                recommendation = "Demanda decrescente. Monitore o estoque para evitar excesso.";
            } else {
                recommendation = "Demanda estável. Mantenha os níveis atuais de estoque.";
            }
            
            return {
                demand: futureDemand,
                trend: slope,
                recommendation: recommendation
            };
        }

        // Initialize the application when page loads
        document.addEventListener('DOMContentLoaded', init);