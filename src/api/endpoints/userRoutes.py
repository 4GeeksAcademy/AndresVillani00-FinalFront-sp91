"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt
from flask_cors import CORS
from api.models import db, Users


users_api = Blueprint('usersApi', __name__)
CORS(users_api)  # Allow CORS requests to this API


@users_api.route('/users', methods=['GET'])
def users():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Users)).scalars()
        list_users = [ row.serialize() for row in rows ]
        response_body['message'] = f'Listado de usuarios'
        response_body['results'] = list_users
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Users(email=data.get('email'),
                    password=data.get('password'),
                    is_active=data.get('is_active'),
                    first_name=data.get('first_name'),
                    last_name=data.get('last_name'))
        response_body['message'] = f'Agregar nueva publicacion'
        response_body['results'] = row.serialize()
        return response_body, 200  
    

@users_api.route('/users/<int:id>', methods=['GET'])
@jwt_required()
def user_get(id):
    response_body = {}
    additional_claims = get_jwt()
    if id != additional_claims['id']:
        response_body['message'] = f'No tiene autorizacion el Usuario: {id}'
        return response_body, 200
    row = db.session.execute(db.select(Users).where(Users.id == id)).scalar()
    if not row:
        response_body['message'] = f'El Usuario de id: {id}, no existe'
        return response_body, 401
    if request.method == 'GET':
        response_body['message'] = f'Usuario con id: {id}'
        response_body["results"] = row.serialize()
        return response_body, 200


@users_api.route('/users/<int:id>', methods=['PUT', 'DELETE'])
def user(id):
    response_body = {}
    row = db.session.execute(db.select(Users).where(Users.id == id)).scalars()
    if not row:
        response_body['message'] = f'El Usuario de id: {id}, no existe'
        return response_body, 401
    if request.method == 'PUT':
        data = request.json
        row.email=data.get('email'),
        row.password=data.get('password'),
        row.is_active=data.get('is_active'),
        row.first_name=data.get('first_name'),
        row.last_name=data.get('last_name')
        response_body['message'] = f'Usuario con id: {id}. Actualizado'
        response_body["results"] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Usuario con id: {id}. Eliminad'
        return response_body, 200
