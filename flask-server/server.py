from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

import os
print("Files in directory:", os.listdir('flask-server'))

with open('flask-server/best_catboost_model.pkl', 'rb') as file:
    model = pickle.load(file)


@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Air Quality Prediction API"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        temp = float(data['temperature'])
        co = float(data['co'])
        no2 = float(data['no2'])
        humidity = float(data['humidity'])
        pop_density = float(data['pop_density'])
        
        # Calculate interaction terms
        temp_co = temp * co
        no2_co = no2 * co
        humidity_co = humidity * co
        co_pop_density = co * pop_density

        input_data = pd.DataFrame({
            'CO': [co],
            'Temperature CO': [temp_co],
            'NO2 CO': [no2_co],
            'Humidity CO': [humidity_co],
            'CO Population_Density': [co_pop_density]
        })
        
        prediction = model.predict(input_data)[0]
        result = "Good" if prediction == 1.0 else "Poor"
        return jsonify({"prediction": result})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=10000, debug=True)
