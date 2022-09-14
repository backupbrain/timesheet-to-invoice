import { delayMillis } from "../delayMillis";
import { getTimeEntries } from "./getTimeEntries";

export type Props = {
  startPage: number;
  numPagesToDownload: number;
};
export const getAllTimeEntries = async ({
  startPage,
  numPagesToDownload,
}: Props) => {
  let nextPage = 1;
  let start = 1;
  let page = 1;
  if (startPage && startPage > 0) {
    start = startPage;
    page = startPage;
    nextPage = startPage;
  }
  let pageLimit = 10;
  if (numPagesToDownload && numPagesToDownload > 0) {
    pageLimit = numPagesToDownload;
  }
  console.log({ startPage, page, start });
  console.log({ numPagesToDownload, pageLimit });
  let totalPages = 1;
  const resultsPerPage = 100;
  let areMorePagesAvailable = true;
  let timeEntries = [];
  do {
    page = nextPage;
    const report = await getTimeEntries({ page, resultsPerPage });
    console.log("End of list");
    if (report.time_entries.length === 0) {
      return {
        timeEntries,
        page,
      };
    }
    if (report.time_entries) {
      timeEntries = timeEntries.concat(report.time_entries);
    }
    totalPages = report.total_pages;
    if (!report.next_page) {
      areMorePagesAvailable = false;
    } else {
      nextPage = report.next_page;
      await delayMillis({ delay: 200 });
    }
    // console.log(`entries up till now: ${timeEntries.length}`);
    // console.log(`total entries: ${report.total_entries}`);
    console.log(`current page: ${page}`);
    //console.log(`next page: ${nextPage}`);
  } while (areMorePagesAvailable && 1 + page - start < pageLimit);
  return {
    timeEntries,
    page,
  };
};
