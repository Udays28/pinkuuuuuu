const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json());

const OPENSKY_API_URL = 'https://opensky-network.org/api';
const EXCHANGE_RATE_API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

// Function to get the latest USD to INR exchange rate
async function getUSDtoINRRate() {
  try {
    const response = await axios.get(EXCHANGE_RATE_API_URL);
    return response.data.rates.INR;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return 75; // Fallback exchange rate if API fails
  }
}

app.get('/api/flights', async (req, res) => {
  try {
    const { origin, destination, date } = req.query;

    // Fetch flight data
    const response = await axios.get(`${OPENSKY_API_URL}/states/all`, {
      params: {
        lamin: 45.8389,
        lomin: 5.9962,
        lamax: 47.8229,
        lomax: 10.5226,
      }
    });

    // Get the current USD to INR exchange rate
    const usdToInrRate = await getUSDtoINRRate();

    const flights = response.data.states.map(flight => ({
      id: flight[0],
      callsign: flight[1].trim(),
      origin_country: flight[2],
      longitude: flight[5],
      latitude: flight[6],
      altitude: flight[7],
      velocity: flight[9],
      true_track: flight[10],
    })).filter(flight => flight.callsign);

    // Simulate departure and arrival times based on current time
    const currentTime = new Date();
    flights.forEach(flight => {
      flight.departureTime = new Date(currentTime.getTime() + Math.random() * 24 * 60 * 60 * 1000).toISOString();
      flight.arrivalTime = new Date(new Date(flight.departureTime).getTime() + Math.random() * 5 * 60 * 60 * 1000).toISOString();
      const priceUSD = Math.floor(100 + Math.random() * 900);
      flight.price = Math.round(priceUSD * usdToInrRate);
      flight.currency = 'INR';
    });

    res.json(flights.slice(0, 5)); // Limit to 5 flights for simplicity
  } catch (error) {
    console.error('Error fetching flights:', error);
    res.status(500).json({ error: 'An error occurred while fetching flights' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});