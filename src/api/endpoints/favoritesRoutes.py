"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, CharacterFavorites, PlanetFavorites


favorites_api = Blueprint('favoritesApi', __name__)
CORS(favorites_api)  # Allow CORS requests to this API

