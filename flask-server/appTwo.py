import cv2
import numpy as np
import mediapipe as mp
from flask_cors import CORS
from flask import Flask, request
from keras.models import load_model
import torch

model = torch.hub.load('ultralytics/yolov5', 'custom', path='D:/Intern_2/Projects/Project_1/flask-server/Sananthan.pt')
predicted_classes=["1","2","3","4","5","6","7","8","9"]
device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')
model.to(device).eval()

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload(): 
    file = request.files['file']
    image = cv2.imdecode(np.fromstring(file.read(), np.uint8), cv2.IMREAD_COLOR)
    class_name=None

    try:
        results = model(image)
        print(results.pred,"asd")
        if results.pred[0] is not None:
            for detection in results.pred[0]:
                class_name =  model.names[int(detection[-1])]
                confidence = detection[4]
        return {"message": class_name if class_name in predicted_classes else "NONE"}

    except Exception as e:
        error_message = str(e)
        return {"error": error_message}, 500

if __name__ == "__main__":
    app.run(debug=True)
