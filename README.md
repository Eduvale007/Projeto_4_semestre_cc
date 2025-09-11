# 📦 GestãoPro - Sistema de Gestão de Estoque com Previsão de Demanda

## 🔹 Descrição
O **GestãoPro** é uma aplicação web para controle completo de inventário, permitindo:

- Cadastro, edição e exclusão de produtos.  
- Monitoramento do estoque atual e estoque mínimo.  
- Dashboard com estatísticas do inventário (total de produtos, estoque baixo, valor total).  
- Visualização de gráficos de distribuição por categoria e níveis de estoque.  
- Previsão de demanda baseada em **regressão linear**, auxiliando no planejamento de estoque.  
- Busca de produtos por nome ou número da tabela.

A aplicação é intuitiva, responsiva e focada em tornar a gestão de inventário mais eficiente.

---

## 🛠 Tecnologias Utilizadas

- **Frontend:** HTML, CSS, JavaScript (Vanilla)  
- **Gráficos:** Chart.js  
- **Backend:** API REST (Flask)  
- **Banco de Dados:** MySQL

---

## ⚡ Funcionalidades

1. **Gerenciamento de Produtos**  
   - Adicionar novos produtos com nome, categoria, quantidade, estoque mínimo e preço.  
   - Editar informações de produtos existentes.  
   - Excluir produtos do inventário.

2. **Dashboard**  
   - Total de produtos cadastrados.  
   - Produtos com estoque baixo destacados.  
   - Valor total do estoque calculado automaticamente.

3. **Gráficos de Controle**  
   - Distribuição de produtos por categoria (Doughnut).  
   - Comparativo entre estoque atual e estoque mínimo (Bar chart).

4. **Previsão de Demanda**  
   - Calcula a demanda futura baseada em regressão linear dos últimos 30 dias.  
   - Exibe recomendação automática sobre ajustes de estoque.

5. **Busca de Produtos**  
   - Filtra produtos pelo nome ou pelo número da tabela.  
   - Mantém funcionalidade de editar e excluir produtos filtrados.

---

## 🖥 Tela de Demonstração
*(Adicione aqui capturas de tela do dashboard e da previsão de demanda)*  

---

## 📦 Como Executar o Projeto

### 1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/gestaopro.git
cd gestaopro



# 📦 GestãoPro - Estrutura do Projeto

## 🔹 Estrutura de Pastas e Arquivos
gestaopro/
├─ static/ # Arquivos estáticos (CSS, JS, imagens)
├─ templates/ # Arquivos HTML do front-end
│ ├─ footer.html # Footer compartilhado
│ ├─ header.html # Header compartilhado
│ └─ index.html # Página principal
├─ .env # Variáveis de ambiente (credenciais, configs)
├─ .gitignore # Arquivos e pastas ignoradas pelo Git
├─ app.py # Arquivo principal da aplicação (inicialização)
├─ cli.py # Script de linha de comando (se houver comandos específicos)
├─ config.py # Configurações da aplicação (ex: banco de dados, debug)
├─ create_db_tables.py # Script para criar tabelas do banco de dados
├─ models.py # Modelos de dados / ORM
├─ routes.py # Rotas da aplicação (endpoints da API e páginas)
├─ teste.py # Script de testes ou prototipagem
└─ README.md # Este arquivo