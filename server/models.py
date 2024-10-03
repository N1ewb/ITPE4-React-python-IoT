import enum
from extensions import db
from sqlalchemy import  ForeignKey
from sqlalchemy.orm import relationship
from flask_login import UserMixin

class RoleEnum(enum.Enum):
    ADMIN = 'Admin'
    USER = 'User'
    MODERATOR = 'Moderator'
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String)
    password = db.Column(db.String(256), nullable=False)

    role = db.Column(db.Enum(RoleEnum), default=RoleEnum.USER, nullable=False)

    face_data = relationship('FaceData', backref='user', lazy=True)
    
class FaceData(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    faceEncodings = db.Column(db.Integer)
    
    user_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)


