"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Planets


planets_api = Blueprint('planetsApi', __name__)
CORS(planets_api)  # Allow CORS requests to this API


@planets_api.route('/planets')
def planets():
    response_body = {}
    url = 'https://www.swapi.tech/api/planets'
    response = request.get(url)
    if response.status_code == 200:
        data = response.json()
        response_body['message'] = f'Listado de planetas'
        response_body["results"] = data
