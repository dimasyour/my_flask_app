import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_mail import Mail
from pygallery.config import Config


db = SQLAlchemy()
bcrypt = Bcrypt()
login_manager = LoginManager()
login_manager.login_view = 'usuarios.login'
login_manager.login_message = 'Вы должны авторизоваться, чтобы получить доступ к этой странице!'
login_manager.login_message_category = 'info'
login_manager.session_protection = 'strong'

mail = Mail()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(Config)

    from pygallery.usuarios.routes import usuarios
    from pygallery.imagenes.routes import imagenes
    from pygallery.main.routes import main
    from pygallery.errors.handlers import errors
    from pygallery.repositorios.routes import repositorios
    from pygallery.events.routes import events

    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    mail.init_app(app)

    app.register_blueprint(usuarios)
    app.register_blueprint(imagenes)
    app.register_blueprint(main)
    app.register_blueprint(errors)
    app.register_blueprint(repositorios)
    app.register_blueprint(events)


    with app.app_context():
        db.create_all()


    return app
