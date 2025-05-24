// updateTrustedSite.js
//
// A standalone script to update the top‐level “Trustedsite” field
// on an Outseta Person record via the REST API.
//
// Usage:
//   node updateTrustedSite.js <PersonID> <TrustedSite>
// Example:
//   node updateTrustedSite.js jW7A5LZQ Trustpilot

require('dotenv').config();           // Loads OUTSETA_API_KEY and OUTSETA_API_SECRET from .env
const axios = require('axios');

const { OUTSETA_API_KEY, OUTSETA_API_SECRET } = process.env;
if (!OUTSETA_API_KEY || !OUTSETA_API_SECRET) {
  console.error('⚠️  Missing OUTSETA_API_KEY or OUTSETA_API_SECRET in your .env');
  process.exit(1);
}

const BASE_URL = 'https://critik.outseta.com/api/v1';  // ← your Outseta subdomain
function getAuthHeader() {
  // Format exactly "Outseta <APIKey>:<SecretKey>"
  return `Outseta ${OUTSETA_API_KEY}:${OUTSETA_API_SECRET}`;
}

// Parse CLI arguments
const [personId, trustedSite] = process.argv.slice(2);
if (!personId || !trustedSite) {
  console.error('Usage: node updateTrustedSite.js <PersonID> <TrustedSite>');
  process.exit(1);
}

// Build the PUT request
const url = `${BASE_URL}/crm/people/${personId}`;
const payload = { Trustedsite: trustedSite };

axios
  .put(url, payload, {
    headers: {
      'Authorization': getAuthHeader(),
      'Accept':        'application/json',
      'Content-Type':  'application/json'
    }
  })
  .then(response => {
    // Log the updated top‐level field
    console.log('✅ Trustedsite now set to:', response.data.Trustedsite);
  })
  .catch(error => {
    console.error(
      '❌ Update failed:',
      error.response?.status,
      error.response?.data || error.message
    );
    process.exit(1);
  });
