"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, TokenBlockedList, Events
from api.utils import generate_sitemap, APIException
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, get_jwt
from datetime import datetime, timezone

api = Blueprint('api', __name__)
#estandar para toda la inicialización de bcrypt
app=Flask(__name__)
bcrypt = Bcrypt(app)
@api.route('/update-profile-image', methods=['POST'])
# Middleware para verificar la autenticación
def update_profile_image():
    # Obtener el ID del usuario autenticado desde el token
    user_id = get_jwt_identity()

    # Comprobar si se ha enviado un archivo en la solicitud
    if 'profile_image' not in request.files:
        return jsonify({"error": "No se ha enviado un archivo de imagen"}), 400

    profile_image = request.files['profile_image']

    # Verificar que el archivo sea una imagen (puedes agregar más validaciones según tus necesidades)
    allowed_extensions = {'jpg', 'jpeg', 'png', 'gif'}
    if not profile_image.filename.lower().endswith(tuple(allowed_extensions)):
        return jsonify({"error": "Tipo de archivo no permitido"}), 400

    # Guardar la imagen en el sistema de archivos (ajusta la ubicación según tu preferencia)
    upload_folder = 'profile_images'
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)

    # Generar un nombre único para la imagen
    filename = f"user_{user_id}_profile.jpg"  # Puedes cambiar la extensión según el tipo de archivo

    # Guardar la imagen
    profile_image.save(os.path.join(upload_folder, filename))

    # Generar la URL completa de la imagen
    base_url = 'https://tu-sitio-web.com'  # Reemplaza con la URL de tu sitio web
    profile_image_url = f'{base_url}/{upload_folder}/{filename}'

    # Actualizar la URL de la imagen en la base de datos
    user = User.query.get(user_id)
    user.profile_image_url = profile_image_url
    db.session.commit()

    # Ejemplo de respuesta exitosa:
    return jsonify({"message": "Imagen de perfil actualizada correctamente"}), 200


    # Ejemplo de respuesta exitosa:
    return jsonify({"message": "Imagen de perfil actualizada correctamente"}), 200
@api.route('/signup', methods=['POST'])
def create_user():
    #recibir correo y password
    email = request.json.get("email")
    password = request.json.get("password")
    name = request.json.get("name")
    #buscar usuario en la bd, que me traiga el primer resultado
    user = User.query.filter_by(email = email).first()
    #si existe el usuario mostrar error
    if user is not None:
        return jsonify({"message": "User already exist"}), 401
    #definir secure_password que se va a guardar en el campo de la bd
    secure_password = bcrypt.generate_password_hash(password, 10).decode("utf-8")
    #crear nuevo usuario a partir de esta data
    #new_event = User(email=data.email, password=data.password)
    new_event = User()
    new_event.email = email
    new_event.password = secure_password
    new_event.is_active = True
    new_event.name = name
    new_event.address = ""
    new_event.phone = ""
    db.session.add(new_event)
    db.session.commit()
    return jsonify({"msg":"Usuario registrado"}), 201

@api.route('/login', methods=['POST'])
def login_user():
    #recibir datos del cuerpo de la petición
    email = request.json.get("email")
    password = request.json.get("password")
    #verificación de la contraseña
    #ubicar usuario en la bd, que me traiga el primer resultado
    user = User.query.filter_by(email = email).first()
    #si no se encontró el usuario
    if user is None:
        return jsonify({"message": "User not found"}), 401
    #si la clave no es válida regresamos error
    #verificando el pass del usuario que me regresó de la bd (user.password)
    #con el password de la petición de json (password)
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "Wrong password"}), 401
    #después de las validaciones enviar msje de confirmación, se genera el token
    #ya podemos verificar la clave encriptada a la hr de inicio de sesión
    #pasando contenido al token, id del usuario de la bd
    token = create_access_token(identity=user.id, additional_claims={"role":"organizador"})
    return jsonify({"message": "Login successful", "token":token}), 200

#utilizar intermediarios middlewares
#solo para usuarios autenticados
#para eso importar depurador de jwt_extended jwt_required
#para usuarios que tengan en el encabezado de la petición un token válido
@api.route('/helloprotected')
@jwt_required() #convierte la ruta en protegida
def hello_protected():
    #traer el subject de mi token (pasado anteriormente al hacer create_access_token identity=user.id)
    #en este caso el id del usuario obtenido de la bd
    user_id = get_jwt_identity()
    claims = get_jwt()
    #con la información del token, traer datos del usuario de la bd
    user = User.query.get(user_id)
    response = {
        "userId": user_id,
        "email" : user.email,
        "claims": claims,
        "isActive": user.is_active,
        "name": user.name,
        "address": user.address,
        "phone": user.phone,
    }
    return jsonify(response)

@api.route('/logout', methods=['POST'])
@jwt_required()
def user_logout():
    #obtener el jti del token que traemos en claims (get_jwt)
    jti= get_jwt()["jti"]
    now = datetime.now(timezone.utc)
    tokenBlocked = TokenBlockedList(token = jti, created_at = now)
    #guardarlo en la bd
    db.session.add(tokenBlocked)
    db.session.commit()
    return jsonify({"message": "User logged out"}), 200

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Excellent, the request was succesfull"
    }

    return jsonify(response_body), 200
  
@api.route('/newevent', methods=['POST'])
def create_event():
    #recibir datos del evento
    nombre_event= request.json.get("nombre_event")
    descr_corta= request.json.get("descr_corta")
    fecha_ini= request.json.get("fecha_ini")
    fecha_fin= request.json.get("fecha_fin")
    ubicacion= request.json.get("ubicacion")
    logotipo= request.json.get("logotipo")
    descr_larga= request.json.get("descr_larga")
    reglas= request.json.get("reglas")
    fecha_lim= request.json.get("fecha_lim")
    email_contacto= request.json.get("email_contacto")
    tel_contacto= request.json.get("tel_contacto")
    nombre_contacto= request.json.get("nombre_contacto")
    costo= request.json.get("costo")
    id_user= request.json.get("id_user")
    #buscar usuario en la bd, que me traiga el primer resultado
    #user = User.query.filter_by(id = id_user).first()
    #si no existe el usuario mostrar error
    #if user is None:
    #    return jsonify({"message": "User not exist"}), 401
    #crear nuevo evento a partir de esta data
    new_event = Events()
    new_event.nombre_event = nombre_event
    new_event.descr_corta = descr_corta
    new_event.fecha_ini = fecha_ini
    new_event.fecha_fin = fecha_fin
    new_event.ubicacion = ubicacion
    new_event.logotipo = logotipo
    new_event.descr_larga = descr_larga
    new_event.reglas = reglas
    new_event.fecha_lim = fecha_lim
    new_event.email_contacto = email_contacto
    new_event.tel_contacto = tel_contacto
    new_event.nombre_contacto = nombre_contacto
    new_event.costo = costo
    new_event.id_user = id_user
    db.session.add(new_event)
    db.session.commit()
    return jsonify({"msg":"Evento registrado"}), 201

@api.route('/loadevents', methods=['POST'])
def load_events():
    #recibir datos del cuerpo de la petición
    user = request.json.get("userId")
    #ubicar usuario en la bd, que me traiga todos los resultados
    events = Events.query.filter(Events.id_user == user)
    #si no se encontró el evento
    if events is None:
        return jsonify({"message": "Events not found"}), 401
    #después de las validaciones enviar msje de confirmación
    #pasando contenido
    response = []
    for item in events:
        response.append ({
            "nombre_evento" : item.nombre_evento,
            "descr_corta" : item.descr_corta,
            "fecha_ini" : item.fecha_ini,
            "fecha_fin" : item.fecha_fin,
            "ubicacion" : item.ubicacion,
            "logotipo" : item.logotipo,
            "descr_larga" : item.descr_larga,
            "reglas" : item.reglas,
            "fecha_lim" : item.fecha_lim,
            "email_contacto" : item.email_contacto,
            "tel_contacto" : item.tel_contacto,
            "nombre_contacto" : item.nombre_contacto,
            "costo" : item.costo,
            "id_user" : item.id_user
        })
    return jsonify(response, 200)