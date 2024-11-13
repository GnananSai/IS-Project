from flask import Flask, request, jsonify
from flask_cors import CORS  # New import
import torch
import cv2
import numpy as np
import albumentations as A
from albumentations.pytorch import ToTensorV2
from efficientnet_pytorch import EfficientNet
import torch.nn.functional as F
from torch import nn
from PIL import Image
import io

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS

# Define the model class
class Net(nn.Module):
    def __init__(self, num_classes):
        super().__init__()
        self.model = EfficientNet.from_pretrained('efficientnet-b0')
        self.dense_output = nn.Linear(1280, num_classes)

    def forward(self, x):
        feat = self.model.extract_features(x)
        feat = F.adaptive_avg_pool2d(feat, 1).reshape(-1, 1280)
        return self.dense_output(feat)

# Load the model and weights
device = 'cuda' if torch.cuda.is_available() else 'cpu'
model = Net(num_classes=10)  # Assuming 10 classes
model.load_state_dict(torch.load('val_loss_6.08_auc_0.875.pth', map_location=device))
model.to(device)
model.eval()


AUGMENTATIONS_TEST = A.Compose([
    A.ToFloat(max_value=255),
    A.pytorch.transforms.ToTensorV2()
])

# Function to preprocess and predict a single image
def predict_single_image(image, model, augmentations):
    image = np.array(image)
    augmented = augmentations(image=image)
    image = augmented['image']
    image = image.unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(image)
        probabilities = F.softmax(output, dim=1).cpu().numpy().flatten()

    cover_probability = probabilities[0]
    stego_probability = 1 - cover_probability if probabilities.argmax() == 0 else probabilities[1:].sum()

    return probabilities, stego_probability

# Define class names
class_names = ["Cover", "JMiPOD_75", "JMiPOD_90", "JMiPOD_95", "JUNIWARD_75", "JUNIWARD_90", "JUNIWARD_95", "UERD_75", "UERD_90", "UERD_95"]

# Route for handling image upload and prediction
@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    try:
        image = Image.open(file.stream).convert('RGB')
        probabilities, stego_probability = predict_single_image(image, model, AUGMENTATIONS_TEST)
        response = {
            "probabilities": {class_name: float(prob) for class_name, prob in zip(class_names, probabilities)},
            "steganography_probability": float(stego_probability)
        }
        print(response)
        return jsonify(response), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
