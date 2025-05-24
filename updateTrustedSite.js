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
    // 4️⃣ Parse the custom_fields string if necessary
    let cf = response.data.custom_fields;
    if (typeof cf === 'string') {
      try {
        cf = JSON.parse(cf);
      } catch (err) {
        console.warn('Could not parse custom_fields:', err);
        cf = {};
      }
    }

    // 5️⃣ Log the full response (for debugging) and the specific field
    console.log('Full response:', JSON.stringify(response.data, null, 2));
    console.log('Reviewsite now set to:', cf.reviewsite);
  })
  .catch(error => {
    console.error(
      'Update failed:',
      error.response?.status,
      error.response?.data || error.message
    );
  });
