"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.endpoints.userRoutes import users_api
from api.endpoints.postRoutes import post_api
from api.endpoints.mediasRoutes import medias_api
from api.endpoints.commentsRoutes import comments_api
from api.endpoints.followersRoutes import followers_api
from api.endpoints.charactersRoutes import characters_api
from api.endpoints.planetsRoutes import planets_api
from api.endpoints.favoritesRoutes import favorites_api
from api.admin import setup_admin
from api.commands import setup_commands
# from models import Person


ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False
# Database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)
setup_admin(app)  # add the admin
setup_commands(app)  # add the admin
app.register_blueprint(api, url_prefix='/api')  # Add all endpoints form the API with a "api" prefix
app.register_blueprint(users_api, url_prefix='/usersApi')
app.register_blueprint(post_api, url_prefix='/postApi')
app.register_blueprint(medias_api, url_prefix='/medias_api')
app.register_blueprint(comments_api, url_prefix='/commentsApi')
app.register_blueprint(followers_api, url_prefix='/followersApi')
app.register_blueprint(characters_api, url_prefix='/charactersApi')
app.register_blueprint(planets_api, url_prefix='/planetsApi')
app.register_blueprint(favorites_api, url_prefix='/favoritesApi')


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


# This only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
