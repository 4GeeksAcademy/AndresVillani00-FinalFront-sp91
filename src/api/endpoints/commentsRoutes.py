"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Comments


comments_api = Blueprint('commentsApi', __name__)
CORS(comments_api)  # Allow CORS requests to this API


@comments_api.route('/comments', methods=['GET', 'POST'])
def coments():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Comments)).scalars()
        list_coments = [ row.serialize() for row in rows ]
        response_body['message'] = f'Listado de todas las publicaciones de todos los usuarios'
        response_body["results"] = list_coments
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Comments(body=data.get('body', 'BODY por defecto'),
                    user_id=data.get('user_id'),
                    post_id=data.get('post_id'))
        response_body['message'] = f'Agregar nuevo comentario'
        response_body['results'] = row.serialize()
        return response_body, 200 
    

@comments_api.route('/comments/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def coment(id):
    response_body = {}
    row = db.session.execute(db.select(Comments).where(Comments.id == id)).scalars()
    if not row:
        response_body['message'] = f'El comentario de id: {id}, no existe'
    if request.method == 'GET':
        response_body['message'] = f'Comentario con id: {id}'
        response_body["results"] = row.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.body=data.get('body', 'BODY por defecto'),
        row.user_id=data.get('user_id'),
        row.post_id=data.get('post_id')
        response_body['message'] = f'Comentario con id: {id}. Actualizado'
        response_body["results"] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Comentario con id: {id}. Eliminado'
        return response_body, 200
    

@comments_api.route('/post/<int:post_id>/comments', methods=['GET'])
def post_comments(post_id):
    response_body = {}
    row = db.session.execute(db.select(Comments).where(Comments.post_id == post_id)).scalars()
    if not row:
        response_body['message'] = f'No hay comentarios de la publicacion con id: {post_id}'
    if request.method == 'GET':
        response_body['message'] = f'Comentarios de la publicacion con id: {post_id}'
        response_body["results"] = row.serialize()


@comments_api.route('/users/<int:user_id>/comments', methods=['GET'])
def user_comments(user_id):
    response_body = {}
    row = db.session.execute(db.select(Comments).where(Comments.user_id == user_id)).scalars()
    if not row:
        response_body['message'] = f'No hay comentarios de la publicacion con id: {user_id}'
    if request.method == 'GET':
        response_body['message'] = f'Comentarios de la publicacion con id: {user_id}'
        response_body["results"] = row.serialize()