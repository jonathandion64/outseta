// updateTrustedSite.js
require('dotenv').config();             // Loads .env
const axios = require('axios');

const BASE_URL = 'https://api.outseta.com/api/v1';
const { OUTSETA_API_KEY, OUTSETA_API_SECRET } = process.env;

function getAuthHeader() {
  // Outseta requires: Authorization: Outseta [API_KEY]:[API_SECRET]
  return `Outseta ${OUTSETA_API_KEY}:${OUTSETA_API_SECRET}`;
}

async function updateTrustedSite(personId, trustedSite) {
  const url = `${BASE_URL}/crm/people/${personId}`;
  return axios.patch(
    url,
    { custom_fields: { trustedsite: trustedSite } },
    { headers: {
        'Authorization': getAuthHeader(),
        'Content-Type':  'application/json',
        'Accept':        'application/json'
    }}
  );
}

// Command-line interface
// Usage: node updateTrustedSite.js <PersonID> <ReviewSite>
(async () => {
  const [personId, reviewSite] = process.argv.slice(2);
  if (!personId || !reviewSite) {
    console.error('Usage: node updateTrustedSite.js <PersonID> <ReviewSite>');
    process.exit(1);
  }
  try {
    const res = await updateTrustedSite(personId, reviewSite);
    console.log('Update succeeded:', res.data.custom_fields.trustedsite);
  } catch (err) {
    console.error('Update failed:', err.response?.status, err.response?.data || err.message);
  }
})();
