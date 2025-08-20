from flask import  Blueprint , render_template


paginas = Blueprint('paginas', __name__)


@paginas.route('/')
def home():
    return render_template('index.html')