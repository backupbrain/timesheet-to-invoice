import { prisma } from "../../database/client";

export const getHarvestJob = async () => {
  let harvestJob = await prisma.harvestJob.findFirst();
  if (!harvestJob) {
    harvestJob = await prisma.harvestJob.create({
      data: { lastPageDownloaded: 0 },
    });
  }
  return harvestJob;
};
