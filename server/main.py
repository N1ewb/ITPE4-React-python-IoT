from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS
import cv2
import base64
import threading
import time

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
    streaming = True

    if not cap.isOpened():
        print("Error: Could not open video capture.")
        return

    while streaming:
        ret, frame = cap.read()
        if not ret:
            print("Error: Could not read frame.")
            break
        
        _, buffer = cv2.imencode('.jpg', frame)
        frame_data = base64.b64encode(buffer).decode('utf-8')
       
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

if __name__ == "__main__":
    print("Starting server...")
    socketio.run(app, debug=True, port=5173, allow_unsafe_werkzeug=True)
