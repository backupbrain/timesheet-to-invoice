require("dotenv").config();
// https://www.freshbooks.com/api/get-authenticated-on-the-freshbooks-api
let queryParams1 = new URLSearchParams({
  grant_type: "authorization_code",
  client_id: process.env.FRESHBOOKS_CLIENT_ID,
  client_secret: process.env.FRESHBOOKS_CLIENT_SECRET,
  code: "32f6a8128b1e5ffaf6c1879d0f1ae34df76935cfd9570f8fcdebf53bfc7b03ce",
  redirect_uri: "https://phonephilosopher.backupbrain.co/api/1.0/oauth",
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

console.log(`
curl -L -X POST 'https://api.freshbooks.com/auth/oauth/token' \\
-F 'grant_type="authorization_code"' \\
-F 'client_id="${process.env.FRESHBOOKS_CLIENT_ID}"' \\
-F 'client_secret="${process.env.FRESHBOOKS_CLIENT_SECRET}"' \\
-F 'code="32f6a8128b1e5ffaf6c1879d0f1ae34df76935cfd9570f8fcdebf53bfc7b03ce"' \\
-F 'redirect_uri="https://phonephilosopher.backupbrain.co/api/1.0/oauth"'
`);

let response =
  '{"access_token":"eyJraWQiOiJhMTlPSlR5aVlKOXhPM3FoWnhWeE1KZE5ZNXJ4cUhpQzBSTUY0TWRheGtjIiwiYWxnIjoiUlMyNTYifQ.eyJqdGkiOiI1NWY2NGNhY2EyM2ZjOGFmYjAwYjZiZDZjZGFmMDVlOTZjZTE0MWMzNDUxM2YwNTM2ZTMzNmEzZTFjMDVjM2ZhIiwiaWF0IjoxNjY0OTk4NTIyLCJleHAiOjE2NjUwNDE3MjIsInN1YiI6IlNtdXhJZGVudGl0eTszNDYwMjE3IiwiY2xpZW50X2lkIjoiMmNkY2FhMGFmOTk4YzliMzVlMzhmNDdjNWRkZjkxZjdkMDZiMzI5OWZmNTFhMWUzNmZjYzdkMjRiZjY1OGM1NCIsInNjb3BlIjoidXNlcjpwcm9maWxlOnJlYWQgdXNlcjppbnZvaWNlczpyZWFkIHVzZXI6aW52b2ljZXM6d3JpdGUgdXNlcjpleHBlbnNlczpyZWFkIHVzZXI6ZXhwZW5zZXM6d3JpdGUgdXNlcjpwcm9qZWN0czpyZWFkIHVzZXI6dGF4ZXM6cmVhZCB1c2VyOmNsaWVudHM6cmVhZCIsImF1dGguZnJlc2hib29rcy5jb20vc3ViX3R5cGUiOiJyZXNvdXJjZV9vd25lciIsImF1dGguZnJlc2hib29rcy5jb20vcHVibGljX2FwaV92ZXJzaW9uIjoiMjAxOS0wNy0xMCJ9.0peS64lX5t4wRIHTETBMsUyqnMFQ3fZSUT60MqS_mLNSvTVmr7HoGTSfDA91EtZMQUQBLSXRWgRx-IaVhb1Wmnk5DQ28AezFWMY8OQLUDC_xJthJgHihyOwNlY6Pzd7I28y7ltcqce0GjKialwuQ6ZQyn75Tv3nmk2rd_Q6vsZdHUsEFPI7dGki9Y0cFp64B1PU7CEkoj6y9JPsEhXUzUEf-tTWAzfTZmmUIzFQqksiAeCOTxQooDvhBksQcYSiUIhJf3M0CJ2Aux8Ga08UkyLTkL5kTr7ZaIZe65gD1WYfb6wjEYpnS8boS3K241AzzHgFonsntP5aeG8UEVNPgzQ","token_type":"Bearer","expires_in":43199,"refresh_token":"09d18843939593e71ee306872e45001bb6d1d2b9aca65a7a628d5db294adc91d","scope":"user:profile:read user:invoices:read user:invoices:write user:expenses:read user:expenses:write user:projects:read user:taxes:read user:clients:read","created_at":1664998522,"direct_buy_tokens":{}}';
let authToken = JSON.parse(response);

// let authToken = {
//     access_token: 'eyJraWQiOiJhMTlPSlR5aVlKOXhPM3FoWnhWeE1KZE5ZNXJ4cUhpQzBSTUY0TWRheGtjIiwiYWxnIjoiUlMyNTYifQ.eyJqdGkiOiJhMTRiNWUyZjZhMWQ2ODA5NzI1YjBlNjA3NGU4ZjViMTYwOGU4NWEzYWUwYzIyYzM5NjhkMTRjNzJmYzZiYjJiIiwiaWF0IjoxNjY0OTk0NjE4LCJleHAiOjE2NjUwMzc4MTgsInN1YiI6IlNtdXhJZGVudGl0eTszNDYwMjE3IiwiY2xpZW50X2lkIjoiMmNkY2FhMGFmOTk4YzliMzVlMzhmNDdjNWRkZjkxZjdkMDZiMzI5OWZmNTFhMWUzNmZjYzdkMjRiZjY1OGM1NCIsInNjb3BlIjoidXNlcjpwcm9maWxlOnJlYWQgdXNlcjppbnZvaWNlczpyZWFkIHVzZXI6aW52b2ljZXM6d3JpdGUgdXNlcjpleHBlbnNlczpyZWFkIHVzZXI6ZXhwZW5zZXM6d3JpdGUgdXNlcjpwcm9qZWN0czpyZWFkIHVzZXI6dGF4ZXM6cmVhZCIsImF1dGguZnJlc2hib29rcy5jb20vc3ViX3R5cGUiOiJyZXNvdXJjZV9vd25lciIsImF1dGguZnJlc2hib29rcy5jb20vcHVibGljX2FwaV92ZXJzaW9uIjoiMjAxOS0wNy0xMCJ9.FGxlDmgkCW4umj3udIkz1EDE7BWORN-IkPoepW7tLYdDtGk11iM25em7J2lvx_F_po7wOCcutRGdLiX2Txhvc1DpGuEZQGxcsW8JyLeuUfYcWtJPONKZbUBqlKk1EGV9VCmRtBdFwR8rl1vdqS3YVUW0LPC14xwQCekvgdHuLMDBGAB3tj3A4Tq1tQ4wqk54nTuR7wU02ZQ9HEh1OfZiZqlwMyPEssYC5ISkdc3ZsuzxP3yqHB-GTBB9pCfqYzV5idE0DeW4MkP-K6E-lvj7SvNSExzUvlJAdnav8U4XYOtL4_SYS89kXO4d4vyQucQt1AmJ0O-6gNEZ-uyEKIybSw',
//     token_type: 'Bearer',
//     expires_in: 43199,
//     refresh_token: 'cf75eb54920790ba70d71bb39f781e4e75bb0a541a68a7eea7aef3949be0b23b',
//     scope: 'user:profile:read user:invoices:read user:invoices:write user:expenses:read user:expenses:write user:projects:read user:taxes:read',
//     created_at: 1664994618,
//     direct_buy_tokens: {}
// }

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
