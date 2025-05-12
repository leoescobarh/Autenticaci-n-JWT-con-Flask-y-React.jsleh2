"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/signup', methods=['POST'])
def signup():
    data = request.json
    hashed_password = generate_password_hash(data['password'])
    new_user = User(email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created successfully"}), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password, data['password']):
        payload = {
            "id": user.id,
            "exp": datetime.utcnow() + timedelta(hours=1)
        }
        token = jwt.encode(payload, os.getenv("FLASK_APP_KEY"), algorithm="HS256")
        return jsonify({"token": token}), 200
    return jsonify({"message": "Invalid credentials"}), 401

@api.route('/private', methods=['GET'])
def private():
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({"message": "Token is missing"}), 401

    token = auth_header.split(" ")[1]
    try:
        payload = jwt.decode(token, os.getenv("FLASK_APP_KEY"), algorithms=["HS256"])
        user = User.query.get(payload['id'])
        return jsonify({"message": f"Welcome {user.email} to the private route!"}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401