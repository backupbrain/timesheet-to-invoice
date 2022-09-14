import { fetchFromHarvest } from "./fetchFromHarvest";

export const fetchClients = async () => {
  const endpoint = `/v2/clients`;
  return fetchFromHarvest({ endpoint });
};
