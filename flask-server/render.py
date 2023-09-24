import cv2


def render_detected_face(frame, top, right, bottom, left,name):
    cv2.rectangle(frame, (left, top),
                  (right, bottom), (0, 0, 255), 2)

    cv2.rectangle(frame, (left, bottom - 35),
                  (right, bottom), (0, 0, 255), cv2.FILLED)
    font = cv2.FONT_HERSHEY_DUPLEX
    cv2.putText(frame, name, (left + 6, bottom - 6),
                font, 1.0, (255, 255, 255), 1)


def render_drowsiness_n_yawn(frame, left_eye, right_eye, lip):
    cv2.polylines(frame, [left_eye], True,
                  (0, 255, 255), 1, cv2.LINE_AA)
    cv2.polylines(frame, [right_eye], True,
                  (0, 255, 255), 1, cv2.LINE_AA)
    cv2.polylines(frame, [lip], True,
                  (0, 255, 255), 1, cv2.LINE_AA)
