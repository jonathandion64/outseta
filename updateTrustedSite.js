// updateTrustedSite.js
require('dotenv').config();
const axios = require('axios');

const BASE_URL = 'https://critik.outseta.com/api/v1';
const { OUTSETA_API_KEY, OUTSETA_API_SECRET } = process.env;

if (!OUTSETA_API_KEY || !OUTSETA_API_SECRET) {
  console.error('⚠️  Missing OUTSETA_API_KEY or OUTSETA_API_SECRET in .env');
  process.exit(1);
}

const personId   = process.argv[2]; // e.g. jW7A5LZQ
const trustedsit = process.argv[3]; // e.g. Trustpilot

if (!personId || !trustedsit) {
  console.error('Usage: node updateTrustedSite.js <PersonID> <TrustedSite>');
  process.exit(1);
}

const authHeader = `Outseta ${OUTSETA_API_KEY}:${OUTSETA_API_SECRET}`;
const url        = `${BASE_URL}/crm/people/${personId}`;
const payload    = { custom_fields: { trustedsite: trustedsit } };

axios.put(url, payload, {
  headers: {
    'Authorization': authHeader,
    'Content-Type':  'application/json',
    'Accept':        'application/json'
  }
})
.then(res => {
  // Outseta returns custom_fields as a JSON string, so parse if needed
  let cf = res.data.custom_fields;
  if (typeof cf === 'string') {
    try { cf = JSON.parse(cf); }
    catch (e) { console.warn('⚠️ Could not parse custom_fields:', e); cf = {}; }
  }
  console.log('✅ Trusted site now set to:', cf.trustedsite);
})
.catch(err => {
  console.error(
    '❌ Update failed:',
    err.response?.status,
    err.response?.data || err.message
  );
});
