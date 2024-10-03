from flask import Blueprint, request, jsonify, make_response
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_login import login_user, logout_user
from extensions import db
from models import User

auth = Blueprint( __name__,'auth')
bcrypt = Bcrypt()

def init_app(app):
    bcrypt.init_app(app)

@auth.route('/register', methods=['GET', 'POST', 'OPTIONS'])
def register():
    print(f"Received {request.method} request to /register")
    if request.method == 'OPTIONS':
        return make_response(jsonify({"message": "OK"}), 200)
    
    if request.method == 'GET':
        return jsonify({'message': 'Registration endpoint. Please use POST to register.'}), 200
    
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'message': 'No input data provided'}), 400
    
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
    
        if not username or not email or not password :
            return jsonify({'message': 'Missing required fields'}), 400
        if User.query.filter_by(email=email).first():
            return jsonify({'message': 'User already exists'}), 400
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        new_user = User(username=username, email=email, password=hashed_password)

        db.session.add(new_user)   
        db.session.commit()

        return jsonify({'message': 'User created successfully'}), 201
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@auth.route('/login', methods=['GET', 'POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return make_response(jsonify({"message": "OK"}), 200)
    
    if request.method == 'GET':
        return jsonify({'message': 'Login endpoint. Please use POST to login.'}), 200
    
    # POST request handling
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'message': 'No input data provided'}), 400
        
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'message': 'Missing email or password'}), 400

        user = User.query.filter_by(email=email).first()

        if user and bcrypt.check_password_hash(user.password, password):
            login_user(user)
            access_token = create_access_token(identity=user.id)
            return jsonify({
                'message': 'Login successful',
                'access_token': access_token,
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            }), 200
        else:
            return jsonify({'message': 'Invalid credentials'}), 401
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@auth.route('/profile', methods=['GET', 'OPTIONS'])
@jwt_required()
def profile():
    if request.method == 'OPTIONS':
        return make_response(jsonify({"message": "OK"}), 200)
    
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'message': 'User not found'}), 404
            
        return jsonify({
            'username': user.username,
            'email': user.email
        }), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@auth.route('/logout', methods=['POST', 'GET', 'OPTIONS'])
@jwt_required()
def logout():
    if request.method == 'OPTIONS':
        return make_response(jsonify({"message": "OK"}), 200)
    
    if request.method == 'GET':
        return jsonify({'message': 'Logout endpoint. Please use POST to logout.'}), 200
    
    try:
        logout_user()
        return jsonify({'message': 'Logged out successfully'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500