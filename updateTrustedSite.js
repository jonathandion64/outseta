// updateTrustedSite.js
require('dotenv').config();             // Loads .env
const axios = require('axios');

const BASE_URL = 'https://critik.outseta.com/api/v1';
const { OUTSETA_API_KEY, OUTSETA_API_SECRET } = process.env;

function getAuthHeader() {
// Outseta requires: Authorization: Outseta [API_KEY]:[API_SECRET]
return Outseta ${OUTSETA_API_KEY}:${OUTSETA_API_SECRET};
}

/**

Updates the 'reviewsite' custom field for a given Person ID.

@param {string} personId    - The Outseta Person ID (alphanumeric)

@param {string} reviewSite  - The review site value to save
*/
async function updateReviewSite(personId, reviewSite) {
const url = ${BASE_URL}/crm/people/${personId};
return axios.put(
url,
{ custom_fields: { reviewsite: reviewSite } },
{ headers: {
'Authorization': getAuthHeader(),
'Content-Type':  'application/json',
'Accept':        'application/json'
}}
);
}

// Command-line interface
// Usage: node updateTrustedSite.js  
(async () => {
const [personId, reviewSite] = process.argv.slice(2);
if (!personId || !reviewSite) {
console.error('Usage: node updateTrustedSite.js  ');
process.exit(1);
}
try {
const res = await updateReviewSite(personId, reviewSite);
// Log the field from response, checking both possible casing
console.log('Update succeeded:',
res.data.custom_fields?.reviewsite ||
res.data.CustomFields?.reviewsite
);
} catch (err) {
console.error('Update failed:', err.response?.status, err.response?.data || err.message);
}
})();

