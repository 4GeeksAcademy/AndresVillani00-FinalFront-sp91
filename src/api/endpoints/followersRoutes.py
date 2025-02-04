"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Followers


followers_api = Blueprint('followersApi', __name__)
CORS(followers_api)  # Allow CORS requests to this API


@followers_api.route('/followers', methods=['GET'])
def followers():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Followers)).scalars()
        list_followers = [ row.serialize() for row in rows ]
        response_body['message'] = f'Listado de todas las publicaciones de todos los usuarios'
        response_body["results"] = list_followers
        return response_body, 200


@followers_api.route('/followers/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def follower(id):
    response_body = {}
    row = db.session.execute(db.select(Followers).where(Followers.id == id)).scalars()
    if not row:
        response_body['message'] = f'El comentario de id: {id}, no existe'
    if request.method == 'GET':
        response_body['message'] = f'Comentario con id: {id}'
        response_body["results"] = row.serialize()
        return response_body, 200


@followers_api.route('/users/<int:follower_id>/followers', methods=['GET'])
def user_followers(follower_id):
    response_body = {}
    row = db.session.execute(db.select(Followers).where(Followers.follower_id == follower_id)).scalars()
    if not row:
        response_body['message'] = f'No hay comentarios de la publicacion con id: {follower_id}'
    if request.method == 'GET':
        response_body['message'] = f'Comentarios de la publicacion con id: {follower_id}'
        response_body["results"] = row.serialize()


@followers_api.route('/users/<int:following_id>/followers', methods=['GET'])
def user_following(following_id):
    response_body = {}
    row = db.session.execute(db.select(Followers).where(Followers.following_id == following_id)).scalars()
    if not row:
        response_body['message'] = f'No hay comentarios de la publicacion con id: {following_id}'
    if request.method == 'GET':
        response_body['message'] = f'Comentarios de la publicacion con id: {following_id}'
        response_body["results"] = row.serialize()
