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
  res.send("OK");
  console.log(req.params);
  console.log(`Method: ${req.method}`);
  const code = req.query.code as string;
  if (code) {
    const url = "https://api.freshbooks.com/auth/oauth/token";
    const headers = {
      "Api-Version": "alpha",
      "Content-Type": "application/json",
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
      body: new URLSearchParams(data).toString(),
    });
    console.log(`status: ${response.status} ${response.statusText}`);
    const responseBody = await response.text();
    console.log({ body: responseBody });
    const responseJson = await response.json();
    console.log(responseJson);
  }
  console.log("------------------------");
});
