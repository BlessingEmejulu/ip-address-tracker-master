//  To get the IP Address locations, you'll be using the IP Geolocation API by IPify. To generate the map, we recommend using LeafletJS.

// 1. Get the user's IP Address
// 2. Use the IP Geolocation API by IPify to get the user's location
// 3. Use LeafletJS to generate a map
// 4. Display the user's location on the map

import { apiKey } from './config.js';

// const apiKey = 'at_IN9AsmjNWtxLOeH4ChRr7M6KznToj'; 
const apiUrl = 'https://geo.ipify.org/api/v2/country,city?apiKey=';

const searchBtn = document.getElementById('search-btn');
const ipInput = document.getElementById('ip-input');

// const ipInfoElement = document.getElementById('error');
const ipAddressElement = document.getElementById('ip-address');
const locationElement = document.getElementById('location');
const timezoneElement = document.getElementById('timezone');
const ispElement = document.getElementById('isp');

const map = L.map('map').setView([0, 0], 13); // Initialize Leaflet map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

async function fetchIPDetails(query = '') {
    try {
        const url = query ? `${apiUrl}${apiKey}&ipAddress=${query}` : `${apiUrl}${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        ipAddressElement.textContent = data.ip;
        locationElement.textContent = `${data.location.city}, ${data.location.region}`;
        timezoneElement.textContent = `UTC ${data.location.timezone}`;
        ispElement.textContent = data.isp;

        map.setView([data.location.lat, data.location.lng], 13);
        L.marker([data.location.lat, data.location.lng]).addTo(map);
    } catch (error) {
        console.error('Error fetching IP details:', error);

        // document.getElementById('error').style.display = 'block';  // Show error message
        // document.getElementById('error').textContent = "Error fetching IP details!";

        // const ipInfoContainer = document.getElementById('ip-info-container');
        // ipInfoContainer.style.display = 'none';

    }
}

searchBtn.addEventListener('click', (event) => {
    const query = ipInput.value.trim();
    event.preventDefault();
    fetchIPDetails(query);
});


// Fetch details for the default IP
fetchIPDetails();
