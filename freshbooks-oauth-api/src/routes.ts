import express, { Request, Response } from "express";
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
  const code = req.params.code;
  if (code) {
    const url = "https://api.freshbooks.com/auth/oauth/token";
    const headers = {
      "Content-Type": "application/json",
    };
    const data = {
      grant_type: "authorization_code",
      code,
      client_id: process.env.FRESHBOOKS_CLIENT_ID,
      client_secret: process.env.FRESHBOOKS_CLIENT_SECRET,
      redirect_uri: "https://phonephilosopher.backupbrain.co/api/1.0/oauth",
    };
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    console.log(`status: ${response.status} ${response.statusText}`);
    const responseJson = await response.json();
    console.log(responseJson);
  }
  console.log("------------------------");
});

router.post("/api/1.0/oauth", (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.params);
  console.log(`Method: ${req.method}`);
  console.log("------------------------");
  res.send("Hello");
});

router.put("/api/1.0/oauth", (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.params);
  console.log(`Method: ${req.method}`);
  console.log("------------------------");
  res.send("Hello");
});