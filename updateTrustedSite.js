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

// Example usage via command-line arguments:
// Run with: node updateTrustedSite.js <PersonID> <ReviewSite>
(async () => {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: node updateTrustedSite.js <PersonID> <ReviewSite>');
    process.exit(1);
  }
  const [personId, reviewSite] = args;

  try {
    await updateTrustedSite(personId, reviewSite);
  } catch (err) {
    console.error('Update failed:', err.response?.status, err.response?.data || err.message);
  }
})();
