from config import get_connection_db
from mysql.connector import Error



def insert_productData(productName, currentStock, unitPrice, category, minStock):
    conn = get_connection_db()
    cursor = conn.cursor()

    try:
        cursor.execute('INSERT INTO produtos (nome_produto, quantidade, preco_unitario, categoria, estoque_minimo) VALUES (%s, %s, %s, %s, %s)', 
                       (productName, currentStock, unitPrice, category, minStock))
        conn.commit()
    except Error as e:
        print(f'Erro ao inserir na tabela produtos {e}')
        conn.rollback()
    finally:
        cursor.close()
        conn.close()


def get_all_products():
    conn = get_connection_db()
    cursor = conn.cursor(dictionary=True) 
    try:
        cursor.execute("SELECT * FROM produtos")
        results = cursor.fetchall()
        return results
    except Error as e:
        print(f"Erro ao buscar produtos: {e}")
        return []
    finally:
        cursor.close()
        conn.close()

        

def update_productData(productName_update, currentStock_update, unitPrice_update, category_update, minStock_update, product_id):
    conn = get_connection_db()
    cursor = conn.cursor()

    try:
        cursor.execute('''
            UPDATE produtos
            SET nome_produto = %s,
                quantidade = %s,
                preco_unitario = %s,
                categoria = %s,
                estoque_minimo = %s
            WHERE id_produto = %s
        ''', (productName_update, currentStock_update, unitPrice_update, category_update, minStock_update, product_id))

        conn.commit()
        print("Produto atualizado com sucesso!")

    except Exception as e:
        print("Erro ao atualizar produto:", e)
        conn.rollback()

    finally:
        cursor.close()
        conn.close()
