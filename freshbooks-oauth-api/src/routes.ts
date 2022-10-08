import dotenv from "dotenv";
import express, { Request, Response } from "express";
// import fetch from "node-fetch";
dotenv.config();
export const router = express.Router();

router.options("/", (req: Request, res: Response) => {
  res
    .status(405)
    .setHeader("Allow", "OPTIONS, GET, HEAD, POST")
    .setHeader("Content-Length", "0")
    .setHeader("Access-Control-Allow-Origin", "*")
    .send("");
});

router.head("/", (req: Request, res: Response) => {
  res.send("");
});

router.options("/api/1.0/oauth", (req: Request, res: Response) => {
  res
    .status(405)
    .setHeader("Allow", "OPTIONS, GET, HEAD, POST")
    .setHeader("Content-Length", "0")
    .setHeader("Access-Control-Allow-Origin", "*")
    .send("");
});

router.head("/api/1.0/oauth", (req: Request, res: Response) => {
  res.send("");
});

router.get("/api/1.0/oauth", async (req: Request, res: Response) => {
  console.log(req.params);
  console.log(`Method: ${req.method}`);
  const code = req.query.code as string;
  if (code) {
    const url = "https://api.freshbooks.com/auth/oauth/token";
    const headers = {
      "Api-Version": "alpha",
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    };
    const data = {
      grant_type: "authorization_code",
      client_id: process.env.FRESHBOOKS_CLIENT_ID!,
      client_secret: process.env.FRESHBOOKS_CLIENT_SECRET!,
      code,
      redirect_uri: process.env.FRESHBOOKS_REDIRECT_URI!,
    };
    console.log({ headers });
    console.log({ data });
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    console.log(`status: ${response.status} ${response.statusText}`);
    const responseBody = await response.text();
    console.log({ body: responseBody });
    const responseJson = JSON.parse(responseBody);
    // const responseJson = await response.json();
    // console.log(responseJson);
    let output = "":
    if (responseJson.error) {
      output = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">
        <title>Freshbooks Auth</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body>
        <div class="container">
          <div class="row">
            <div class="col">
              <h1>Freshbooks Auth</h1>
              <p>Response from Freshbooks:</p> 
              <div>Status: ${response.status} ${response.statusText}</div>
              <div>Response:</div>
              <div>Error: ${responseJson.error}</div>
              <div class="alert alert-danger" role="alert">
                ${responseJson.error_description}
              </div>
              <pre>${JSON.stringify(responseJson, null, 2)}</pre>
            </div>
          </div>
        </div>
      </body>
    </html>`;
    } else {
      output = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="">
        <meta name="author" content="">
        <title>Freshbooks Auth</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body>
        <div class="container">
          <div class="row">
            <div class="col">
              <h1>Freshbooks Auth</h1>
              <p>Response from Freshbooks:</p> 
              <div>Status: ${response.status} ${response.statusText}</div>
              <div>Response:</div>
              <pre>${JSON.stringify(responseJson, null, 2)}</pre>
            </div>
          </div>
        </div>
      </body>
    </html>`;

    }
    res.send(output);
  }
  console.log("------------------------");
});
