// updateTrustedSite.js

// …snip…
axios.put(url,
-  { custom_fields: { trustedsite: trustedsit } },
+  // write the Pascal-case field at top-level
+  { Trustedsite: trustedsit },
  {
    headers: {
      'Authorization': authHeader,
      'Content-Type':  'application/json',
      'Accept':        'application/json'
    }
  }
)
// …snip…
.then(res => {
-  let cf = res.data.custom_fields
-  if (typeof cf === 'string') {
-    try { cf = JSON.parse(cf) }
-    catch (e) { cf = {} }
-  }
-  console.log('✅ Trusted site now set to:', cf.trustedsite)
+  console.log('✅ Trustedsite now set to:', res.data.Trustedsite)
})
