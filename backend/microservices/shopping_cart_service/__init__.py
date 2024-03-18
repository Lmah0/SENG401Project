import os, json
from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from flask_swagger_ui import get_swaggerui_blueprint

ENVIRONMENT = 'development'
db = SQLAlchemy()

# To run: 'flask --app shopping_cart_service run --debug' in console
# To run on a specific port: 'flask --app shopping_cart_service run --debug --port 5008' in console
def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})

    SWAGGER_URL = '/swagger'
    API_URL = 'http://127.0.0.1:5008/swagger.json'
    swaggerui_blueprint = get_swaggerui_blueprint(
        SWAGGER_URL,
        API_URL,
        config={
            'app_name': "API Documentation"
        }
    )
    app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

    @app.route('/swagger.json')
    def swagger():
        with open('./shopping_cart_service/swagger.json', 'r') as f:
            return jsonify(json.load(f))


    app.config.from_pyfile('config.py', silent=True)
    if ENVIRONMENT == 'production':
        load_dotenv()
        app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL').replace('postgres:', 'postgresql:')

    db.init_app(app)

    from . import models
    from . import ShoppingCartService

    app.register_blueprint(ShoppingCartService.main)

    # TODO: Remove method before deploying
    @app.route('/db_reset', methods=['GET'])
    def db_create():
        db.session.execute(text("DROP TABLE IF EXISTS shopping_cart;"))
        db.session.commit()
        with app.app_context():
            db.create_all()

        return 'Tables Reset!'

    return app
