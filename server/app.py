from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import os

app = Flask(__name__)

# Load your trained model (replace 'your_model.h5' with your model's path)
model = load_model('your_model.h5')

# Directory to temporarily store uploaded images
UPLOAD_FOLDER = 'uploads/'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    image_file = request.files['image']
    image_path = os.path.join(UPLOAD_FOLDER, image_file.filename)
    image_file.save(image_path)

    # Preprocess the image (adjust this based on your model's input size)
    image = Image.open(image_path).resize((224, 224))
    image_array = np.array(image) / 255.0  # Normalize image
    image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension

    # Get prediction from the model
    prediction = model.predict(image_array)
    result = np.argmax(prediction)

    # Return the result (you may customize based on your model output)
    if result == 0:
        return jsonify({'message': 'No hidden data detected'})
    else:
        return jsonify({'message': 'Steganography detected'})

if __name__ == '__main__':
    app.run(debug=True)
