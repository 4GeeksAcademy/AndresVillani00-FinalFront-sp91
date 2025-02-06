"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Medias


medias_api = Blueprint('mediasApi', __name__)
CORS(medias_api)  # Allow CORS requests to this API


@medias_api.route('/medias', methods=['GET', 'POST'])
def medias():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Medias)).scalars()
        list_medias = [ row.serialize() for row in rows ]
        response_body['message'] = f'Listado de todas las medias de todos los posts'
        response_body["results"] = list_medias
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Medias(media_Type=data.get('media_Type'),
                    url=data.get('url'),
                    post_id=data.get('post_id'))
        response_body['message'] = f'Agregar nueva media'
        response_body['results'] = row.serialize()
        return response_body, 200 
    

@medias_api.route('/medias/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def media(id):
    response_body = {}
    row = db.session.execute(db.select(Medias).where(Medias.id == id)).scalars()
    if not row:
        response_body['message'] = f'La media de id: {id}, no existe'
    if request.method == 'GET':
        response_body['message'] = f'Media con id: {id}'
        response_body["results"] = row.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.media_Type=data.get('media_Type'),
        row.url=data.get('url'),
        row.post_id=data.get('post_id')
        response_body['message'] = f'Media con id: {id}. Actualizada'
        response_body["results"] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Media con id: {id}. Eliminada'
        return response_body, 200

@medias_api.route('/post/<int:post_id>/medias', methods=['GET'])
def post_medias(post_id):
    response_body = {}
    row = db.session.execute(db.select(Medias).where(Medias.post_id == post_id)).scalars()
    if not row:
        response_body['message'] = f'No hay medias de la publicacion con id: {post_id}'
    if request.method == 'GET':
        response_body['message'] = f'Medias de la publicacion con id: {post_id}'
        response_body["results"] = row.serialize()
