from flask import Flask, jsonify, request
from flask_socketio import SocketIO
from flask_cors import CORS
import cv2
import base64
import threading
import time
from db import  uploadUserData


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}})
socketio = SocketIO(app, cors_allowed_origins=["http://localhost:5173", "http://127.0.0.1:5173"])

streaming = False
stream_thread = None

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

    while streaming:
        ret, frame = cap.read()
        if not ret:
            print("Error: Could not read frame.")
            break
        frame = cv2.resize(frame, (640, 480)) 
        _, buffer = cv2.imencode('.jpg', frame)
        frame_data = base64.b64encode(buffer).decode('utf-8')
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)
        for(x,y,w,h) in faces:
            cv2.rectangle(frame, (x,y), (x+w, y+h), (255, 0, 0), 5)
            roi_gray = gray[ y:y+w, x:x+w]
            roi_color = frame[ y:y+h, x:x+w]
            eyes = eye_cascade.detectMultiScale(roi_gray, 1.3, 5)
            for (ex, ey, ew, eh) in eyes:
                cv2.rectangle(roi_color, (ex, ey), (ex+ ew, ey+ eh), (0, 255, 0), 5)
        socketio.emit('video_frame', {'data': frame_data})
        time.sleep(0.02)
        cv2.imshow("Frame", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            streaming = False  

    cap.release()
    cv2.destroyAllWindows()



@socketio.on('start_stream')
def handle_start_stream():
    global stream_thread
    if not streaming:
        stream_thread = threading.Thread(target=start_stream)
        stream_thread.start()

@socketio.on('stop_stream')
def handle_stop_stream():
    global streaming
    streaming = False
    if stream_thread is not None:
        stream_thread.join()

@app.route('/api/postUser', methods=['POST'])
def handleuploadUserData():
    return uploadUserData()



if __name__ == "__main__":
    print("Starting server...")
    socketio.run(app, debug=True, port=5173, allow_unsafe_werkzeug=True)
