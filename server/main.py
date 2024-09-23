import eventlet
import cv2
import base64
import time
from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:itpe4-iot-middleware@db.eemlsfydvnkuyfspddml.supabase.co:5432/postgres"
db.init_app(app)

CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}})
socketio = SocketIO(app, cors_allowed_origins=["http://localhost:5173", "http://127.0.0.1:5173"])



#Socketop
streaming = False

@app.route('/')
def index():
    return "WebSocket server is running!"

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

def start_stream():
    global streaming
    cap = cv2.VideoCapture(0)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')
    streaming = True

    if not cap.isOpened():
        print("Error: Could not open video capture.")
        return

    print('Streaming started')
    frame_count = 0
    while streaming:
        ret, frame = cap.read()
        if not ret:
            print("Error: Could not read frame.")
            break

        frame = cv2.resize(frame, (440, 280))
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)
        for (x, y, w, h) in faces:
            cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
            roi_gray = gray[y:y+h, x:x+w]
            roi_color = frame[y:y+h, x:x+w]
            eyes = eye_cascade.detectMultiScale(roi_gray, 1.3, 5)
            for (ex, ey, ew, eh) in eyes:
                cv2.rectangle(roi_color, (ex, ey), (ex + ew, ey + eh), (0, 255, 0), 2)

        _, buffer = cv2.imencode('.jpg', frame)
        frame_data = base64.b64encode(buffer).decode('utf-8')

        try:
            socketio.emit('video_data', {'data': frame_data})
            frame_count += 1
            if frame_count % 30 == 0:  # Log every 30 frames
                print(f"Emitted frame {frame_count}")
        except Exception as e:
            print(f"Error emitting data: {e}")
            break

        socketio.sleep(0.03)  # Use socketio.sleep instead of time.sleep

    print(f'Streaming stopped. Total frames sent: {frame_count}')
    cap.release()

@socketio.on('start_stream')
def handle_start_stream():
    global streaming
    print("Received start_stream event")
    if not streaming:
        print("Starting new stream")
        streaming = True
        eventlet.spawn(start_stream)  # Use eventlet.spawn instead of threading
    else:
        print("Stream already running")

@socketio.on('stop_stream')
def handle_stop_stream():
    global streaming
    print("Received stop_stream event")
    streaming = False

if __name__ == "__main__":
    print("Starting server...")
    socketio.run(app, debug=True, port=5000)
