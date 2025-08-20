from flask import Flask
from routes import paginas

app = Flask(__name__)

app.register_blueprint(paginas)

if __name__ == '__main__':
    app.run(debug=True)