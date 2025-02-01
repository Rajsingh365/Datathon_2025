from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow requests from all origins

# Load the saved model and encoders
with open("customer_churn_model.pkl", "rb") as f:
    model_data = pickle.load(f)

loaded_model = model_data["model"]
feature_names = model_data["features_names"]

with open("encoders.pkl", "rb") as f:
    encoders = pickle.load(f)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Customer Churn Prediction API is running!"})

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        input_data_df = pd.DataFrame([data])
        
        # Encode categorical features
        for column, encoder in encoders.items():
            if column in input_data_df.columns:
                input_data_df[column] = encoder.transform(input_data_df[column])
                
        # Make prediction
        prediction = loaded_model.predict(input_data_df)
        pred_prob = loaded_model.predict_proba(input_data_df)
        
        result = {
            "prediction": "Churn" if prediction[0] == 1 else "No Churn",
            "prediction_probability": pred_prob.tolist()
        }
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(port=3001, debug=True)
