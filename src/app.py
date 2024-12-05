"""
This module takes care of starting the API Server, Loading the DB, and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS  # Add CORS support
from flask_jwt_extended import JWTManager  # Add JWT support
from api.utils import APIException, generate_sitemap
from api.models import db, User, Favorites, Wallet
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

# Determine environment
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# Enable CORS for frontend-backend communication
CORS(app)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "super-secret-key")  # Replace with your own secret key
jwt = JWTManager(app)  # Initialize JWT manager

# Database configuration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# Add the admin panel
setup_admin(app)

# Add custom commands
setup_commands(app)

# Register API routes with the "/api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# Any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # Avoid cache memory
    return response

@app.route('/favorites/<coin_id>', methods=['POST'])
def add_fav(coin_id):
    user_id = request.json['user_id']
    name = request.json['name']
    fav_crypto = Favorites(name=name, user_id=user_id, coin_id=coin_id)
    db.session.add(fav_crypto)
    db.session.commit()
    return jsonify(get_favs(user_id))

def get_favs (id):
    favorites = Favorites.query.filter_by(user_id=id)
    favorites = list(map(lambda x: x.serialize(), favorites))
    return favorites

@app.route('/wallet/<coin_id>', methods=['POST'])
def add_to_wallet(coin_id):
    user_id = request.json['user_id']
    name = request.json['name']
    wallet_crypto = Wallet(name=name, user_id=user_id, coin_id=coin_id)
    db.session.add(wallet_crypto)
    db.session.commit()
    return jsonify(get_wallet(user_id))

def get_wallet(id):
    wallet_items = Wallet.query.filter_by(user_id=id)
    wallet_items = list(map(lambda x: x.serialize(), wallet_items))
    return wallet_items





# Run the application
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)


