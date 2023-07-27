from flask import jsonify, url_for
from sqlalchemy import exc
from src.api.models import db, Category, Product, User
import re

class APIException(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)

def generate_sitemap(app):
    links = ['/admin/']
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            if "/admin/" not in url:
                links.append(url)

    links_html = "".join(["<li><a href='" + y + "'>" + y + "</a></li>" for y in links])
    return """
        <div style="text-align: center;">
        <img style="max-height: 80px" src='https://storage.googleapis.com/breathecode/boilerplates/rigo-baby.jpeg' />
        <h1>Rigo welcomes you to your API!!</h1>
        <p>API HOST: <script>document.write('<input style="padding: 5px; width: 300px" type="text" value="'+window.location.href+'" />');</script></p>
        <p>Start working on your project by following the <a href="https://start.4geeksacademy.com/starters/full-stack" target="_blank">Quick Start</a></p>
        <p>Remember to specify a real endpoint path like: </p>
        <ul style="text-align: left;">"""+links_html+"</ul></div>"

def db_load_categories(app, db):
    clothing = Category(id=1, name='clothing')
    accesories = Category(id=2, name='accessories')
    shoes = Category(id=3, name='shoes')
    
    try:
        with app.app_context():
            db.session.add(clothing)
            db.session.add(accesories)
            db.session.add(shoes)
            db.session.commit()
            print('Created categories')
    except:
        print('All categories already exists')


def generate_error_message(error_text):
    key_text = re.search(r'(?<=Key \().*?(?=\))', error_text).group(0)
    text = re.search(r'\(.*\)\s+(.*)', error_text).group(1)
    return f'<{key_text}> {text}'

def save_new_product(request_body):
    required_values = ['name', 'price', 'category_id']
    missing_values = []
    for key in required_values:
        if key not in request_body:
            missing_values.append(key)
    
    if len(missing_values) > 0:
        raise APIException(
            message=f'Missing value for: {", ".join(missing_values)}', status_code=422, 
            payload={'missing_values': missing_values}
        )
    try:
        product = Product(name=request_body['name'], price=request_body['price'],
            description=request_body.get('description'), color=request_body.get('color'),
            image_url=request_body.get('image_url'), category_id=request_body['category_id']
        )
        db.session.add(product)
        db.session.commit()
    except exc.IntegrityError as e:
        db.session.rollback()
        message = generate_error_message(str(e.orig))
        raise APIException(message=message, status_code=400)

    return product

def update_product_by_id(id, request_body):
    product = Product.query.get(id)
    if product is None:
        raise APIException(message='Product not found', status_code=404)

    for key in product.__dict__.keys():
        if key in request_body:
            setattr(product, key, request_body[key])

    try:
        db.session.commit()
    except exc.IntegrityError as e:
        db.session.rollback()
        message = generate_error_message(str(e.orig))
        raise APIException(message=message, status_code=400)
    return product

# Lanza un APIException si el usuario no es admin
def check_is_admin_by_user_id(user_id):
    user = User.query.get(user_id)
    if not user.is_admin:
        raise APIException(message='Must be admin to modify a product', status_code=401)