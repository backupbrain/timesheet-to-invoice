import dotenv from "dotenv";
import express, { Request, Response } from "express";
dotenv.config();
const app = express();
const port = 9991;
app.use(express.json());

app.options("/", (req: Request, res: Response) => {
  res
    .status(405)
    .setHeader("Allow", "OPTIONS, GET, HEAD, POST")
    .setHeader("Content-Length", "0")
    .setHeader("Access-Control-Allow-Origin:", "*")
    .send("");
});

app.head("/", (req: Request, res: Response) => {
  res.send("");
});

app.options("/api/1.0/oauth", (req: Request, res: Response) => {
  res
    .status(405)
    .setHeader("Allow", "OPTIONS, GET, HEAD, POST")
    .setHeader("Content-Length", "0")
    .setHeader("Access-Control-Allow-Origin", "*")
    .send("");
});

app.head("/api/1.0/oauth", (req: Request, res: Response) => {
  res.send("");
});

app.get("/api/1.0/oauth", async (req: Request, res: Response) => {
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

app.post("/api/1.0/oauth", (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.params);
  console.log(`Method: ${req.method}`);
  console.log("------------------------");
  res.send("Hello");
});

app.put("/api/1.0/oauth", (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.params);
  console.log(`Method: ${req.method}`);
  console.log("------------------------");
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
