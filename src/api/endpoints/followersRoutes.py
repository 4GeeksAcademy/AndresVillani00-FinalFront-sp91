"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Followers


followers_api = Blueprint('followersApi', __name__)
CORS(followers_api)  # Allow CORS requests to this API


@followers_api.route('/followers', methods=['GET', 'POST'])
def followers():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Followers)).scalars()
        list_followers = [ row.serialize() for row in rows ]
        response_body['message'] = f'Listado de todas las publicaciones de todos los usuarios'
        response_body["results"] = list_followers
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Followers(follower_id=data.get('follower_id'),
                        following_id=data.get('following_id'))
        response_body['message'] = f'Agregar nuevo follower'
        response_body['results'] = row.serialize()
        return response_body, 200 


@followers_api.route('/followers/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def follower(id):
    response_body = {}
    row = db.session.execute(db.select(Followers).where(Followers.id == id)).scalars()
    if not row:
        response_body['message'] = f'El follower de id: {id}, no existe'
    if request.method == 'GET':
        response_body['message'] = f'Follower con id: {id}'
        response_body["results"] = row.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.follower_id=data.get('follower_id'),
        row.following_id=data.get('following_id')
        response_body['message'] = f'Follower con id: {id}. Actualizado'
        response_body["results"] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Follower con id: {id}. Eliminada'
        return response_body, 200


@followers_api.route('/users/<int:follower_id>/followers', methods=['GET'])
def user_followers(follower_id):
    response_body = {}
    row = db.session.execute(db.select(Followers).where(Followers.follower_id == follower_id)).scalars()
    if not row:
        response_body['message'] = f'No hay followers del usuario con id: {follower_id}'
    if request.method == 'GET':
        response_body['message'] = f'Followers del usuario con id: {follower_id}'
        response_body["results"] = row.serialize()


@followers_api.route('/users/<int:following_id>/followers', methods=['GET'])
def user_following(following_id):
    response_body = {}
    row = db.session.execute(db.select(Followers).where(Followers.following_id == following_id)).scalars()
    if not row:
        response_body['message'] = f'El usuario con id: {following_id}, no esta Following'
    if request.method == 'GET':
        response_body['message'] = f'Followers a los que sigue el usuario con id: {following_id}'
        response_body["results"] = row.serialize()
