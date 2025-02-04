"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Posts


post_api = Blueprint('postApi', __name__)
CORS(post_api)  # Allow CORS requests to this API


@post_api.route('/posts', methods=['GET', 'POST'])
def posts():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Posts)).scalars()
        list_posts = [ row.serialize() for row in rows ]
        response_body['message'] = f'Listado de todas las publicaciones de todos los usuarios'
        response_body["results"] = list_posts
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Posts(title=data.get('title'),
                    description=data.get('email'),
                    body=data.get('body', 'BODY por defecto'),
                    date=data.get('date'),
                    image_url=data.get('image_url'),
                    user_id=data.get('user_id'))
        response_body['message'] = f'Agregar nueva publicacion'
        response_body['results'] = row.serialize()
        return response_body, 200  
    

@post_api.route('/posts/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def post(id):
    response_body = {}
    row = db.session.execute(db.select(Posts).where(Posts.id == id)).scalars()
    if not row:
        response_body['message'] = f'La publicacion de id: {id}, no existe'
    if request.method == 'GET':
        response_body['message'] = f'Publicacion con id: {id}'
        response_body["results"] = row.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.title=data.get('title'),
        row.description=data.get('email'),
        row.body=data.get('body', 'BODY por defecto'),
        row.date=data.get('date'),
        row.image_url=data.get('image_url'),
        row.user_id=data.get('user_id')
        response_body['message'] = f'Publicacion con id: {id}. Actualizada'
        response_body["results"] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Publicacion con id: {id}. Eliminada'
        return response_body, 200


@post_api.route('/users/<int:user_id>/posts', methods=['GET'])
def user_posts(user_id):
    response_body = {}
    row = db.session.execute(db.select(Posts).where(Posts.user_id == user_id)).scalars()
    if not row:
        response_body['message'] = f'No hay comentarios de la publicacion con id: {user_id}'
    if request.method == 'GET':
        response_body['message'] = f'Comentarios de la publicacion con id: {user_id}'
        response_body["results"] = row.serialize()
