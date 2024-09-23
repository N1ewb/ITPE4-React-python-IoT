from main import app
from main import db
from sqlalchemy import inspect

# Database model
class SupaUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String)

with app.app_context():
    inspector = inspect(db.engine)
    if 'supa_user' not in inspector.get_table_names():
        db.create_all()  
    else:
        print("Table 'supa_user' already exists.")
