require("dotenv").config();
// https://www.freshbooks.com/api/get-authenticated-on-the-freshbooks-api
let queryParams1 = new URLSearchParams({
  grant_type: "authorization_code",
  client_id: process.env.FRESHBOOKS_CLIENT_ID,
  client_secret: process.env.FRESHBOOKS_CLIENT_SECRET,
  code: "",
  redirect_uri: process.env.FRESHBOOKS_REDIRECT_URI,
});
let queryParamsString1 = queryParams1.toString();
fetch(`https://api.freshbooks.com/auth/oauth/token`, {
  method: "POST",
  headers: {
    "Api-Version": "alpha",
  },
  body: queryParamsString1,
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });

let authCode = "";

console.log(`
curl -L -X POST 'https://api.freshbooks.com/auth/oauth/token' \\
-F 'grant_type="authorization_code"' \\
-F 'client_id="${process.env.FRESHBOOKS_CLIENT_ID}"' \\
-F 'client_secret="${process.env.FRESHBOOKS_CLIENT_SECRET}"' \\
-F 'code="${authCode}"' \\
-F 'redirect_uri="${process.env.FRESHBOOKS_REDIRECT_URI}"'
`);

let response = "";
let authToken = JSON.parse(response);
let accessToken = authToken.access_token;

fetch("https://api.freshbooks.com/test", {
  method: "GET",
  headers: {
    "Api-Version": "alpha",
    Authorization: `Bearer ${authToken.access_token}`,
  },
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });
