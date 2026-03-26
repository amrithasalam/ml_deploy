from flask import Flask, jsonify, request
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
model = joblib.load("decision_iris_model.joblib")
fish_class = ['setosa', 'versicolor' ,'virginica']



@app.route("/", methods=['GET'])
def hello_api():
    """Returns a simple JSON greeting."""
    return jsonify(message="Hello, World! This is a Flask API endpoint.")

@app.route("/predict", methods=['POST'])
def predict():
    try:
        data = request.get_json()
        features = data.get("features")
        if not features or len(features) != 4:
            return jsonify ({"Error": "Invalid Features"}), 400
        x = np.array(features).reshape(1,-1)
        res = model.predict(x)
        result = fish_class[res[0]]
        return jsonify({"fish_prediction":result}), 200
    except Exception as e:
        return jsonify ({"Error": str(e)}), 500


# Main block to run the application
if __name__ == "__main__":
    # Run the app on the default port 5000 in debug mode
    app.run(debug=True)