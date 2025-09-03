import mysql.connector
from dotenv import load_dotenv
import os

load_dotenv()


def setup_database():
    try:
        conn = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD')
        )

        cursor =  conn.cursor()

        cursor.execute('CREATE DATABASE IF NOT EXISTS gestaopro')
        print('Banco criado (ou já existia).')

        cursor.close()
        conn.close()

        conn = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            database='gestaopro'
        )

        cursor = conn.cursor()

        cursor.execute("""
                    CREATE TABLE Produtos ( 
                       id_produto INT AUTO_INCREMENT PRIMARY KEY
                       ,nome_produto VARCHAR(100) NOT NULL, 
                       quantidade INT NOT NULL, 
                       preco_unitario DECIMAL(10,2) NOT NULL, 
                       categoria VARCHAR(50) NOT NULL, 
                       estoque_minimo INT NOT NULL, 
                       data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP );

                    """)
        
        cursor.execute("""
                 CREATE TABLE Vendas (
                    id_venda INT AUTO_INCREMENT PRIMARY KEY,
                    id_produto INT NOT NULL,
                    quantidade_vendida INT NOT NULL,
                    valor_total DECIMAL(10,2) NOT NULL,
                    data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (id_produto) REFERENCES Produtos(id_produto)
);
                    """)
        
        conn.commit()
        print('Banco e tabelas criados com sucesso!')

    
    except Exception as e:
        print(f'Erro ao criar o banco de dados ou tabelas: {e}')


    finally:
        try:
            cursor.close()
        except:
            pass
        try:
            conn.close()
        except:
            pass