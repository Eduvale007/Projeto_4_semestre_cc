from flask import  Blueprint , render_template ,  request, flash, redirect, url_for, jsonify
from models import insert_productData , get_all_products, update_productData
from config import get_connection_db



paginas = Blueprint('paginas', __name__)


@paginas.route('/', methods=['GET'])
def home():
    produtos = get_all_products()
    return render_template('index.html', produtos=produtos)



@paginas.route('/insertProduct', methods=['POST'])
def insert_product():

    productName = request.form['productName']
    currentStock = request.form['currentStock']
    unitPrice = request.form['unitPrice']
    category = request.form['category']
    minStock = request.form['minStock']
  

    insert_productData(productName, currentStock, unitPrice, category, minStock)
    flash('Dados inseridos com sucesso!')
    return redirect(url_for('paginas.home'))


@paginas.route('/edit/produtos/<int:produto_id>', methods=['PUT'])
def update_produto(produto_id):
    data = request.get_json()

    try:
        update_productData(
            data['nome'],
            data['estoque_atual'],
            data['preco_unitario'],
            data['categoria'],
            data['estoque_minimo'],
            produto_id
        )
        return jsonify({"message": "Produto atualizado com sucesso!"})

    except Exception as e:
        return jsonify({"error": str(e)}), 400



@paginas.route('/api/produtos', methods=['GET'])
def get_products():
    conn = get_connection_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM produtos")
    produtos = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(produtos)


@paginas.route('/api/produtos/<int:produto_id>', methods=['DELETE'])
def delete_product(produto_id):
    conn = get_connection_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM produtos WHERE id_produto = %s", (produto_id,))
    produto = cursor.fetchone()
    if not produto:
        cursor.close()
        conn.close()
        return jsonify({'error': 'Produto não encontrado'}), 404
    cursor.execute("DELETE FROM produtos WHERE id_produto = %s", (produto_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({'message': f'Produto com ID {produto_id} deletado com sucesso!'})



