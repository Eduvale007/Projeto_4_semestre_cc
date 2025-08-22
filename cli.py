from flask import Flask
from create_db_tables import setup_database

def init_app(app: Flask): # função para iniciar a criação dos bancos e das tabelas caso não existam
    @app.cli.command("init-db")
    def init_db():
        """Inicializa o banco de dados (cria tabelas)."""
        setup_database()
