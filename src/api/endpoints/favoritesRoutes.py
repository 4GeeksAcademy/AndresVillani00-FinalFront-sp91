"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, CharacterFavorites, PlanetFavorites


favorites_api = Blueprint('favoritesApi', __name__)
CORS(favorites_api)  # Allow CORS requests to this API


@favorites_api.route('/characters_fav', methods=['GET', 'POST'])
def favorites_characters():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(CharacterFavorites)).scalars()
        list_characters_favorites = [ row.serialize() for row in rows ]
        response_body['message'] = f'Listado de todos los personajes favoritos de todos los usuarios'
        response_body["results"] = list_characters_favorites
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = CharacterFavorites(user_id=data.get('user_id'),
                                 character_id=data.get('character_id'))
        response_body['message'] = f'Agregar nuevo personaje favorito'
        response_body['results'] = row.serialize()
        return response_body, 200 
    

@favorites_api.route('/characters_fav/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def favorite_character(id):
    response_body = {}
    row = db.session.execute(db.select(CharacterFavorites).where(CharacterFavorites.id == id)).scalars()
    if not row:
        response_body['message'] = f'El Personaje favorito de id: {id}, no existe'
    if request.method == 'GET':
        response_body['message'] = f'Personaje favorito con id: {id}'
        response_body["results"] = row.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.user_id=data.get('user_id'),
        row.character_id=data.get('character_id')
        response_body['message'] = f'Personaje favorito con id: {id}. Actualizado'
        response_body["results"] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Personaje favorito con id: {id}. Eliminado'
        return response_body, 200
    

@favorites_api.route('/planets_fav', methods=['GET', 'POST'])
def favorites_planets():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(PlanetFavorites)).scalars()
        list_planets_favorites = [ row.serialize() for row in rows ]
        response_body['message'] = f'Listado de todos los planetas favoritos de todos los usuarios'
        response_body["results"] = list_planets_favorites
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = PlanetFavorites(user_id=data.get('user_id'),
                              planet_id=data.get('planet_id'))
        response_body['message'] = f'Agregar nuevo Planeta favorito'
        response_body['results'] = row.serialize()
        return response_body, 200 


@favorites_api.route('/planets_fav/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def favorite_planet(id):
    response_body = {}
    row = db.session.execute(db.select(PlanetFavorites).where(PlanetFavorites.id == id)).scalars()
    if not row:
        response_body['message'] = f'El Planeta favorito de id: {id}, no existe'
    if request.method == 'GET':
        response_body['message'] = f'Planeta favorito con id: {id}'
        response_body["results"] = row.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.user_id=data.get('user_id'),
        row.planet_id=data.get('planet_id')
        response_body['message'] = f'Planeta favorito con id: {id}. Actualizado'
        response_body["results"] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Planeta favorito con id: {id}. Eliminado'
        return response_body, 200


@favorites_api.route('/users/<int:user_id>/characters_fav', methods=['GET'])
def user_favorites_characters(user_id):
    response_body = {}
    row = db.session.execute(db.select(CharacterFavorites).where(CharacterFavorites.user_id == user_id)).scalars()
    if not row:
        response_body['message'] = f'No hay Personajes favoritos del usuario con id: {user_id}'
    if request.method == 'GET':
        response_body['message'] = f'Personajes favoritos del usuario con id: {user_id}'
        response_body["results"] = row.serialize()


@favorites_api.route('/users/<int:user_id>/planets_fav', methods=['GET'])
def user_favorites_planets(user_id):
    response_body = {}
    row = db.session.execute(db.select(PlanetFavorites).where(PlanetFavorites.user_id == user_id)).scalars()
    if not row:
        response_body['message'] = f'No hay Planetas favoritos del usuario con id: {user_id}'
    if request.method == 'GET':
        response_body['message'] = f'Planetas favoritos del usuario con id: {user_id}'
        response_body["results"] = row.serialize()
