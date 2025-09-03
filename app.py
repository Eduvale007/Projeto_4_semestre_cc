from flask import Flask
from routes import paginas
from cli import init_app as init_cli
from  dotenv import load_dotenv

import os


load_dotenv()



app = Flask(__name__)




app.secret_key = os.getenv('SECRET_KEY')

app.register_blueprint(paginas)
init_cli(app)

if __name__ == '__main__':
    app.run(debug=True)