// updateTrustedSite.js
require('dotenv').config();             // Loads .env
const axios = require('axios');

const BASE_URL = 'https://api.outseta.com/api/v1';
const { OUTSETA_API_KEY, OUTSETA_API_SECRET } = process.env;

function getAuthHeader() {
  // Must match Outseta docs: "Authorization: Outseta [API_KEY]:[API_SECRET]"
  return `Outseta ${OUTSETA_API_KEY}:${OUTSETA_API_SECRET}`;
}

async function updateTrustedSite(personId, trustedSite) {
  const url = `${BASE_URL}/crm/people/${personId}`;
  const response = await axios.patch(
    url,
    { custom_fields: { trustedsite: trustedSite } },
    { headers: {
        'Authorization': getAuthHeader(),
        'Content-Type':  'application/json',
        'Accept':        'application/json'
    }}
  );
  console.log('Update succeeded:', response.data.custom_fields.trustedsite);
}

// Example usage—replace with your actual Person ID and site:
(async () => {
  // Paste your ID from the URL fragment after '/people/'
  // e.g. URL: https://critik.outseta.com/#/app/crm/people/jW7A5LZQ
  const personId  = 'jW7A5LZQ';
  const reviewSite = 'Trustpilot';

  try {
    await updateTrustedSite(personId, reviewSite);
  } catch (err) {
    console.error('Update failed:', err.response?.status, err.response?.data || err.message);
  }
})();
