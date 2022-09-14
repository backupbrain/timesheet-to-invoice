import { fetchFromHarvest } from "./fetchFromHarvest";

export type Props = {
  page?: number;
  resultsPerPage?: number;
};
export const getTimeEntries = async ({ page, resultsPerPage }: Props) => {
  let currentPage = 1;
  if (page && page > 0) {
    currentPage = page;
  }
  let perPage = 100;
  if (resultsPerPage && resultsPerPage > 0) {
    perPage = resultsPerPage;
  }
  const endpoint = `/v2/time_entries?page=${currentPage}&per_page=${perPage}`;
  return fetchFromHarvest({ endpoint });
};
