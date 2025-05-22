// updateTrustedSite.js
const axios = require('axios');

// 1. Put your Outseta API Key here:
const OUTSETA_API_KEY = process.env.OUTSETA_API_KEY; // we'll set this next

/**
 * Updates the trustedsite property for a given person
 * @param {string} personId  - The Outseta Person's ID (you get this after they sign up)
 * @param {string} trustedSite - The site name they entered (e.g., "Trustpilot")
 */
async function updateTrustedSite(personId, trustedSite) {
  const url = `https://api.outseta.com/api/v1/crm/people/${personId}`;
  const authHeader = Buffer.from(`${OUTSETA_API_KEY}:`).toString('base64');

  const payload = {
    custom_fields: { trustedsite: trustedSite }
  };

  const response = await axios.patch(url, payload, {
    headers: {
      'Authorization': `Basic ${authHeader}`,
      'Content-Type': 'application/json'
    }
  });

  console.log('Update succeeded:', response.data.custom_fields.trustedsite);
}

// Example: Replace these placeholders with real values
const personId = 'PERSON_ID_FROM_SIGNUP';
const reviewSite = 'Trustpilot';

updateTrustedSite(personId, reviewSite).catch(err => {
  console.error('Update failed:', err.response?.data || err.message);
});
