from config import get_connection_db


def delete():
    conn = get_connection_db()  # função que retorna a conexão com o banco
    cursor = conn.cursor()

    try:
        # Executa o comando DELETE
        cursor.execute('DELETE FROM produtos WHERE id_produto = 1')

        # Confirma a alteração no banco
        conn.commit()
        print("Registro deletado com sucesso!")

    except Exception as e:
        print("Erro ao deletar o registro:", e)
        conn.rollback()  # desfaz a operação em caso de erro

    finally:
        # Fecha o cursor e a conexão
        cursor.close()
        conn.close()