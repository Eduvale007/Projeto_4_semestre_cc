from flask import Flask
from routes import paginas
from cli import init_app as init_cli


app = Flask(__name__)

app.register_blueprint(paginas)
init_cli(app)

if __name__ == '__main__':
    app.run(debug=True)