import { fetchFromHarvest } from "./fetchFromHarvest";

export const getMyProfile = async () => {
  const endpoint = `/v2/users/me`;
  return fetchFromHarvest({ endpoint });
};
