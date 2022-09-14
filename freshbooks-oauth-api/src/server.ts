import express, { Request, Response } from "express";
const app = express();
const port = 9991;
app.use(express.bodyParser());

app.get("/api/1.0/oauth", (req: Request, res: Response) => {
  console.log(req.params);
  console.log(`Method: ${req.method}`);
  console.log("------------------------");
  res.send("Hello");
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
