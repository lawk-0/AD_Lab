# =========================================
# MNIST Digit Recognition - Flask Backend
# =========================================

import os
from flask import Flask, render_template, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image

# -----------------------------------------
# Flask app initialization
# -----------------------------------------
app = Flask(__name__)

# -----------------------------------------
# Resolve absolute path to model safely
# -----------------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model", "mnist_model.h5")

print("Looking for model at:")
print(MODEL_PATH)

# -----------------------------------------
# Load trained MNIST model
# -----------------------------------------
model = tf.keras.models.load_model(MODEL_PATH)
print("MNIST model loaded successfully")

# -----------------------------------------
# Home route (loads frontend)
# -----------------------------------------
@app.route("/")
def index():
    return render_template("index.html")

# -----------------------------------------
# Prediction route
# -----------------------------------------
@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image file found"})

    file = request.files["image"]

    try:
        # Open image and preprocess
        image = Image.open(file).convert("L")   # grayscale
        image = image.resize((28, 28))

        image_array = np.array(image)
        image_array = image_array.astype("float32") / 255.0

        # Invert colors (MNIST-style)
        image_array = 1.0 - image_array

        # Flatten to (1, 784)
        image_array = image_array.reshape(1, 784)

        # Predict
        prediction = model.predict(image_array)
        predicted_digit = int(np.argmax(prediction))

        return jsonify({"prediction": predicted_digit})

    except Exception as e:
        return jsonify({"error": str(e)})

# -----------------------------------------
# Run Flask server
# -----------------------------------------
if __name__ == "__main__":
    app.run(debug=True)
