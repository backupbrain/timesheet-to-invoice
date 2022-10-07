import { getDataFromHarvest } from "./jobs/getDataFromHarvest";

getDataFromHarvest().then(() => {
  console.log("done");
});

// after scrapting from harvest,
// we must put int the Address and Client.addressId
// also the Client.freshbooksId and Client.freshbooksName
// for each client
