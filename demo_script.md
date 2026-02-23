# 🎤 Hackathon Demo & Viva Script

## 1️⃣ Introduction (1 Minute)
Good [Morning/Afternoon] Judges. Urban flooding is a huge problem in our cities, causing property damage, traffic paralysis, and risk to life. The main issue? We are always reacting *after* it happens.

Our solution is **AquaGuard AI** — a smart, low-cost prediction system that shifts the paradigm from reaction to **prediction**. We aim to predict flooding 30-60 minutes before it occurs.

## 2️⃣ Architecture Overview (1 Minute)
Our system consists of three main components:
1. **The Edge (IoT):** We deploy rugged ESP32 microcontrollers with Ultrasonic and Rainfall sensors inside critical drainage points.
2. **The Brain (AI):** Our Python backend runs a Machine Learning model (Random Forest Classifier) that processes real-time sensor data and Weather API forecasts.
3. **The Interface (Dashboard):** A ReactJS dashboard providing a real-time visual map to city officials and automatically triggering alerts to citizens.

## 3️⃣ Live Demo Walkthrough (1.5 Minutes)
Let me walk you through our live prototype.

*(Open the React Dashboard)*
* As you can see, the map plots our simulated sensors across the city.
* The system is currently scanning... Most areas are **Green (LOW RISK)**.
* *(Point to a specific sensor)* Here we simulate incoming data. Watch as the 'River Road Outlet' sensor registers a sudden spike in water level and rainfall.
* *(Wait for the UI to update)* Because the water level has surpassed 85% capacity with a high rainfall rate, our ML model correctly flags this zone as **Red (HIGH RISK)**!
* Instantly, the dashboard updates, and our system would trigger an SMS alert to citizens in that specific geofence to avoid the area.

## 4️⃣ Conclusion & Impact (30 Seconds)
Our solution is highly scalable, extremely low-cost to deploy city-wide using basic IoT components, and can be integrated into existing Smart City control rooms. 
Thank you. We are happy to take any questions!

---

## 🤔 Potential Viva Questions & Answers

**Q1: How accurate is your model?**
> Currently, we used a simulated dataset to train a Random Forest Classifier since historical, high-frequency granular flood data is hard to obtain. However, in a real-world scenario, we would partner with the municipality to ingest historical weather and flooding logs, achieving high accuracy by cross-referencing rainfall intensity against pipe diameter capacity.

**Q2: Why use an Ultrasonic sensor?**
> Ultrasonic sensors (like HC-SR04) are extremely cheap, easy to replace, and measure distance accurately without touching the actual dirty drain water, increasing their lifespan dramatically.

**Q3: How will you handle sensor failure?**
> The backend expects a heartbeat ping from every sensor every few minutes. If a sensor drops offline, the dashboard marks it as 'Offline/Grey' and alerts maintenance teams, while the AI temporarily relies on nearby sensor clusters and weather APIs to interpolate the missing data.

**Q4: Is this a scalable solution?**
> Yes. Each IoT node costs under $15-$20. Instead of digging up streets to expand overall drainage which costs millions, throwing a network of cheap sensors down drains provides immediate ROI by enabling early warnings and identifying specific clogs efficiently.
