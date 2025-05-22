// testAuth.js
require('dotenv').config();
const axios = require('axios');

const authHeader = `Outseta ${process.env.OUTSETA_API_KEY}:${process.env.OUTSETA_API_SECRET}`;

axios.get(
  'https://critik.outseta.com/api/v1',
  { headers: { Authorization: authHeader, Accept: 'application/json' } }
)
.then(res => console.log('Auth OK:', res.status))
.catch(err => console.error('Auth failed:', err.response?.status, err.response?.data || err.message));
