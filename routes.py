from flask import  Blueprint , render_template ,  request, flash, redirect, url_for
from models import insert_productData , get_all_products


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


