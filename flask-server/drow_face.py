import cv2
import numpy as np
import mediapipe as mp
from flask_cors import CORS
from flask import Flask, request
from keras.models import load_model
from render import render_detected_face, render_drowsiness_n_yawn
from utils import open_len, get_aspect_ratio
import mediapipe
import face_recognition
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from datetime import datetime


cred = credentials.Certificate("Fyp.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://final-fb73b-default-rtdb.firebaseio.com'
})
ref = db.reference('drowsiness')

app = Flask(__name__)
CORS(app)

known_faces = {
    "Nithushan": face_recognition.face_encodings(face_recognition.load_image_file("D:/Intern_2/Projects/Project_1/flask-server/Nithushan.jpg"))[0],
    "Shraff": face_recognition.face_encodings(face_recognition.load_image_file("D:/Intern_2/Projects/Project_1/flask-server/shraff.jpg"))[0],
    "Sugunan": face_recognition.face_encodings(face_recognition.load_image_file("D:/Intern_2/Projects/Project_1/flask-server/sugunan.jpg"))[0]
}

current_frame = 0
drowsy_frames = 0
max_left = 0
max_right = 0

mp_face_mesh = mp.solutions.face_mesh
RIGHT_EYE = [362, 382, 381, 380, 374, 373, 390,
             249, 263, 466, 388, 387, 386, 385, 384, 398]
LEFT_EYE = [33, 7, 163, 144, 145, 153, 154,
            155, 133, 173, 157, 158, 159, 160, 161, 246]
LIPS = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95,
        185, 40, 39, 37, 0, 267, 269, 270, 409, 415, 310, 311, 312, 13, 82, 81, 42, 183, 78]
UPPER_LOWER_LIPS = [13, 14]
LEFT_RIGHT_LIPS = [78, 308]

DROWSY_FRAMES_THRESHOLD = 2

@app.route('/upload', methods=['POST'])
def upload(): 
    file = request.files['file']
    image = cv2.imdecode(np.fromstring(file.read(), np.uint8), cv2.IMREAD_COLOR)
    try:
        out = gen_frames(image) 
    except:
        out={"error":"error"}
    print(out)
    return out
    
def gen_frames(image):
    print("test-1")
    global max_right, max_left,current_frame
    yawn = False
    drowsiness = False
    name = "No Face"
    
    with mp_face_mesh.FaceMesh(
            max_num_faces=2,
            refine_landmarks=True,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
    ) as face_mesh:
        img = cv2.cvtColor(image, cv2.COLOR_BGR2RGB) 
        frame = cv2.flip(img, 1)
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        img_h, img_w = frame.shape[:2]
        results = face_mesh.process(rgb_frame)

        face_locations = face_recognition.face_locations(rgb_frame)
        face_encodings = face_recognition.face_encodings(
                    rgb_frame, face_locations)
        face_names = []
        for face_encoding in face_encodings:
                matches = face_recognition.compare_faces(
                        list(known_faces.values()), face_encoding)
                name = "Unknown"
                face_distances = face_recognition.face_distance(
                        list(known_faces.values()), face_encoding)
                best_match_index = np.argmin(face_distances)
                if matches[best_match_index]:
                        name = list(known_faces.keys())[best_match_index]
                face_names.append(name)

        for (top, right, bottom, left), name in zip(face_locations, face_names):
                    render_detected_face(frame, top, right, bottom, left,name)

        if results.multi_face_landmarks:
                    all_landmarks = np.array(
                        [np.multiply([p.x, p.y], [img_w, img_h]).astype(int) for p in
                         results.multi_face_landmarks[0].landmark])
                    right_eye = all_landmarks[RIGHT_EYE]
                    left_eye = all_landmarks[LEFT_EYE]
                    lip = all_landmarks[LIPS]

                    render_drowsiness_n_yawn(frame, left_eye, right_eye, lip)

                    len_left = open_len(right_eye)
                    len_right = open_len(left_eye)

                    max_left = max(max_left, len_left)
                    max_right = max(max_right, len_right)

                    drowsy_frames = 1 if (len_left <= int(
                        max_left / 2) + 1 and len_right <= max_right // 2 + 1) else 0
                    
                    print(len_right,len_left,max_left,max_right)
                    print(drowsy_frames)
                    if(drowsy_frames):
                        current_frame+=1
                    else:
                        current_frame=0
                    if (current_frame > DROWSY_FRAMES_THRESHOLD):
                        drowsiness = True
                        current_datetime = datetime.now()
                        formatted_datetime= current_datetime.strftime("%Y-%m-%d %H:%M:%S")
                        date, time = formatted_datetime.split(' ')
                        data ={
                            'date' : date,
                            'time'  :time,
                            'status': 'Drowsy',
                            'name': name  # Add the recognized name to the data

                        }
                        ref.push(data)

                    ratio_lips = get_aspect_ratio(
                        frame, results, UPPER_LOWER_LIPS, LEFT_RIGHT_LIPS)
                    if all_landmarks is not None:
                        if ratio_lips < 1.8:
                            yawn = True
    
    return {"Name":name, "Yawn":yawn, "Drowsiness":drowsiness}

            

if __name__ == "__main__":
    app.run(debug=True)
