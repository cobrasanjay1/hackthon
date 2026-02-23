from flask import Flask, jsonify
import random

app = Flask(__name__)

# Mocked historical data and AI risk predictions
def get_sensor_data():
    base_sensors = [
        {"id": 1, "name": "Downtown Drain A", "lat": 51.505, "lng": -0.09, "waterLevel": 40, "rainfall": 10},
        {"id": 2, "name": "Market St Underpass", "lat": 51.51, "lng": -0.1, "waterLevel": 75, "rainfall": 45},
        {"id": 3, "name": "River Road Outlet", "lat": 51.515, "lng": -0.09, "waterLevel": 95, "rainfall": 85},
        {"id": 4, "name": "North Side Station", "lat": 51.495, "lng": -0.08, "waterLevel": 20, "rainfall": 5},
    ]
    
    # Simulate a basic Random Forest logic: High Water + High Rain = HIGH
    for s in base_sensors:
        s['waterLevel'] += random.randint(-5, 5)
        s['waterLevel'] = max(0, min(100, s['waterLevel']))
        
        if s['waterLevel'] > 85 and s['rainfall'] > 50:
             s['risk'] = "HIGH"
        elif s['waterLevel'] > 60:
             s['risk'] = "MEDIUM"
        else:
             s['risk'] = "LOW"
             
    return base_sensors

@app.route('/api/sensors', methods=['GET'])
def get_sensors():
    """Returns simulated IoT sensor readouts and ML predictions."""
    return jsonify({
        "status": "success",
        "timestamp": "real-time",
        "data": get_sensor_data()
    })

@app.route('/api/predict', methods=['POST'])
def predict_flood():
    """Mock ML Endpoint simulating Random Forest prediction."""
    return jsonify({"prediction": "HIGH RISK", "confidence": 0.92})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
