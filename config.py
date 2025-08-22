
import mysql.connector
from mysql.connector import Error
import os



def get_connection_db():
    try:
        conn = mysql.connector.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            database=os.getenv('DB_NAME')
        )

        if conn.is_connected():
            print('Conectado ao bando de dados com sucesso!!!')
            return conn
        else:
            print('Erro ao se conectar ao banco')
            conn.close()
            return None
    
    except Error as e:
        print(f'Erro ao se conectar ao banco {e}')
        return None