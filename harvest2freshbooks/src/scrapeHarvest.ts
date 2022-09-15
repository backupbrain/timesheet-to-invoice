import { getDataFromHarvest } from "./jobs/getDataFromHarvest";

getDataFromHarvest().then(() => {
  console.log("done");
});
