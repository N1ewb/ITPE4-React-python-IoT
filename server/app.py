from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import inspect
from views import views
from auth import auth, init_app
from extensions import db
# Initialize Flask app, database, and SocketIO
# app = Flask(__name__)

# db.init_app(app)

socketio = SocketIO(cors_allowed_origins=["http://localhost:5173", "http://127.0.0.1:5173", "https://middleware-iot.vercel.app"])

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:itpe4-iot-middleware@db.eemlsfydvnkuyfspddml.supabase.co:5432/postgres"
    CORS(app, 
        resources={r"/*": {
            "origins": ["http://localhost:5173", "http://127.0.0.1:5173", "https://middleware-iot.vercel.app"],
            "methods": ["GET", "POST", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"]
        }},
        supports_credentials=True)

    db.init_app(app)
    socketio.init_app(app)

    app.register_blueprint(views, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/auth")

    with app.app_context():
        inspector = inspect(db.engine)
        
        required_tables = {'user', 'face_data'}
        existing_tables = set(inspector.get_table_names())

        missing_tables = required_tables - existing_tables
        if missing_tables:
            db.create_all()
            print(f"Created missing tables: {missing_tables}")
        else:
            print("All required tables already exist.")

    return app

if __name__ == "__main__":
    print("Starting server...")
    app = create_app()
    init_app(app)
    socketio.run(app, debug=True, port=5000)

# if __name__ == "__main__":
#     print("Starting server...")
#     socketio.run(app, debug=True, port=5000)
