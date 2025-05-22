// listPeople.js
require('dotenv').config();
const axios = require('axios');

const BASE_URL   = 'https://critik.outseta.com/api/v1';
const authHeader = `Outseta ${process.env.OUTSETA_API_KEY}:${process.env.OUTSETA_API_SECRET}`;

axios.get(
  `${BASE_URL}/crm/people?limit=5`,
  { headers: { Authorization: authHeader, Accept: 'application/json' } }
)
.then(response => {
  // Dump the JSON so we can inspect its structure
  console.log(JSON.stringify(response.data, null, 2));
})
.catch(error => {
  console.error('Error listing people:', error.response?.status, error.response?.data || error.message);
});
