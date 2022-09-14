import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

export type Props = {
  endpoint: string;
  method?: string;
};
export const fetchFromHarvest = async ({ endpoint, method }: Props) => {
  const requiredEnvVars = ["HARVEST_ACCESS_TOKEN", "HARVEST_ACCOUNT_ID"];
  for (let requiredEnvVar of requiredEnvVars) {
    if (!process.env[requiredEnvVar]) {
      throw new Error(`${requiredEnvVar} must be set in .env`);
    }
  }
  const headers = {
    "User-Agent": "timesheet-test app",
    Authorization: "Bearer " + process.env.HARVEST_ACCESS_TOKEN || "",
    "Harvest-Account-ID": process.env.HARVEST_ACCOUNT_ID || "",
  };
  const host = "https://api.harvestapp.com";
  const url = `${host}${endpoint}`;
  const response = await fetch(url, {
    method: method || "GET",
    headers,
  });

  const responseJson = await response.json();
  return responseJson;
};
