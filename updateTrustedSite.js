// updateReviewSite.js
require('dotenv').config();
const axios = require('axios');

const BASE_URL = 'https://critik.outseta.com/api/v1';
const { OUTSETA_API_KEY, OUTSETA_API_SECRET } = process.env;
const personUid = process.argv[2];      // e.g. jW7A5LZQ
const reviewSite = process.argv[3];     // e.g. Trustpilot

if (!personUid || !reviewSite) {
  console.error('Usage: node updateReviewSite.js <PersonUID> <ReviewSite>');
  process.exit(1);
}

// 1️⃣ Build the JSON payload exactly like the docs do
const data = JSON.stringify({
  custom_fields: {
    reviewsite: reviewSite
  }
});

// 2️⃣ Assemble your axios config
const config = {
  method: 'put',
  maxBodyLength: Infinity,
  url:    `${BASE_URL}/crm/people/${personUid}`,
  headers: {
    'Authorization': `Outseta ${OUTSETA_API_KEY}:${OUTSETA_API_SECRET}`,
    'Content-Type':  'application/json'
  },
  data: data
};

// 3️⃣ Send the request
axios(config)
  .then(response => {
    // Inspect the full object to see where your field landed:
    console.log(JSON.stringify(response.data, null, 2));
    // Or just log the field:
    console.log('Reviewsite now set to:', 
      response.data.custom_fields?.reviewsite || 
      response.data.CustomFields?.reviewsite
    );
  })
  .catch(error => {
    console.error('Update failed:', 
      error.response?.status, 
      error.response?.data || error.message
    );
  });
