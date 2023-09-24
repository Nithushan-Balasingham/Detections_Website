import cv2 as cv
import numpy as np
import mediapipe as mp
from scipy.spatial import distance as dis
cap = cv.VideoCapture(0)


def euclidean_distance(image, top, bottom):
    height, width = image.shape[0:2]

    point1 = int(top.x * width), int(top.y * height)
    point2 = int(bottom.x * width), int(bottom.y * height)

    distance = dis.euclidean(point1, point2)
    return distance
def get_aspect_ratio(image, outputs, top_bottom, left_right):
    if outputs.multi_face_landmarks:
        landmark = outputs.multi_face_landmarks[0]
        top = landmark.landmark[top_bottom[0]]
        bottom = landmark.landmark[top_bottom[1]]
        top_bottom_dis = euclidean_distance(image, top, bottom)
        left = landmark.landmark[left_right[0]]
        right = landmark.landmark[left_right[1]]
        left_right_dis = euclidean_distance(image, left, right)
        aspect_ratio = left_right_dis / top_bottom_dis
        return aspect_ratio
    else:
        return None
def open_len(arr):
    y_arr = []
    for _, y in arr:
        y_arr.append(y)
    min_y = min(y_arr)
    max_y = max(y_arr)
    return max_y - min_y
mp_face_mesh = mp.solutions.face_mesh
RIGHT_EYE = [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398]
LEFT_EYE = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246]
LIPS = [61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291, 308, 324, 318, 402, 317, 14, 87, 178, 88, 95,
        185, 40, 39, 37, 0, 267, 269, 270, 409, 415, 310, 311, 312, 13, 82, 81, 42, 183, 78]
UPPER_LOWER_LIPS = [13, 14]
LEFT_RIGHT_LIPS = [78, 308]
cap = cv.VideoCapture(0)
with mp_face_mesh.FaceMesh(
        max_num_faces=2,
        refine_landmarks=True,
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5
) as face_mesh:
    drowsy_frames = 0
    max_left = 0
    max_right = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        frame = cv.flip(frame, 1)
        rgb_frame = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
        img_h, img_w = frame.shape[:2]
        results = face_mesh.process(rgb_frame)
        if results.multi_face_landmarks:
            frame_rgb = cv.cvtColor(frame, cv.COLOR_BGR2RGB)
            outputs = face_mesh.process(frame_rgb)
            all_landmarks = np.array(
                [np.multiply([p.x, p.y], [img_w, img_h]).astype(int) for p in results.multi_face_landmarks[0].landmark])
            right_eye = all_landmarks[RIGHT_EYE]
            left_eye = all_landmarks[LEFT_EYE]
            lip = all_landmarks[LIPS]
            cv.polylines(frame, [left_eye], True, (0, 255, 255), 1, cv.LINE_AA)
            cv.polylines(frame, [right_eye], True, (0, 255,255), 1, cv.LINE_AA)
            cv.polylines(frame, [lip], True, (0, 255, 255), 1, cv.LINE_AA)
            len_left = open_len(right_eye)
            len_right = open_len(left_eye)
            if len_left > max_left:
                max_left = len_left
            if len_right > max_right:
                max_right = len_right
            if (len_left <= int(max_left / 2) + 1 and len_right <= int(max_right / 2) + 1):
                drowsy_frames += 1
            else:
                drowsy_frames = 0
            if (drowsy_frames > 30):
                cv.putText(img=frame, text='DROWSINESS ALERT', fontFace=0, org=(100, 100), fontScale=1.0, color=(0, 255, 0),
                           thickness=3)
            ratio_lips = get_aspect_ratio(frame, outputs, UPPER_LOWER_LIPS, LEFT_RIGHT_LIPS)
            if all_landmarks is not None:
                if ratio_lips < 1.8:
                    cv.putText(frame, "YAWN Alert!", (10, 30),cv.FONT_HERSHEY_SIMPLEX, 1.0, (0, 0, 255), 2),
                    cv.imshow('img', frame)
        cv.imshow('img', frame)
        key = cv.waitKey(1)
        if key == ord('q'):
            break
cap.release()
cv.destroyAllWindows()