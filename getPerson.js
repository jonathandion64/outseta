// getPerson.js
require('dotenv').config();
const axios = require('axios');

const BASE_URL = 'https://critik.outseta.com/api/v1';     // your subdomain
const authHeader = `Outseta ${process.env.OUTSETA_API_KEY}:${process.env.OUTSETA_API_SECRET}`;

const personId = process.argv[2];
if (!personId) {
  console.error('Usage: node getPerson.js <GUID>');
  process.exit(1);
}

axios.get(
  `${BASE_URL}/crm/people/${personId}`,
  { headers: { Authorization: authHeader, Accept: 'application/json' } }
)
.then(res => {
  console.log('GET succeeded:', res.status);
  console.log(JSON.stringify(res.data, null, 2));
})
.catch(err => {
  console.error('GET failed:', err.response?.status, err.response?.data || err.message);
});
