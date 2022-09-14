import {
  Client as PrismaClient,
  Project as PrismaProject,
  Task as PrismaTask,
  TaskAssignment as PrismaTaskAssignment,
  TaskTime as PrismaTaskTime,
  User as PrismaUser,
  UserAssignment as PrismaUserAssignment,
} from "@prisma/client";
import { getAllTimeEntries } from "./apis/harvest/getAllTimeEntries";
import { getHarvestJob } from "./apis/harvest/getHarvestJob";
import { harvestDataToLocalData } from "./apis/harvest/types";
import { prisma } from "./database/client";

// const startPage = 1;
// const numPagesToDownload = 3;
// getAllTimeEntries({ startPage, numPagesToDownload }).then((response) => {
//   console.log(response.timeEntries.length);
//   console.log(response.page);
// });

const runJob = async () => {
  const harvestJob = await getHarvestJob();
  const startPage = harvestJob.lastPageDownloaded + 1;
  const numPagesToDownload = 100;
  console.log(`Fetching ${numPagesToDownload} pages...`);
  const timesheetData = await getAllTimeEntries({
    startPage,
    numPagesToDownload,
  });
  const existingUsers = await prisma.user.findMany();
  const existingClients = await prisma.client.findMany();
  const existingProjects = await prisma.project.findMany();
  const existingTasks = await prisma.task.findMany();
  const existingUserAssignments = await prisma.userAssignment.findMany();
  const exisingTaskAssignments = await prisma.taskAssignment.findMany();
  const existingTaskTimes = await prisma.taskTime.findMany();

  const userIdLookup: { [harvestId: string]: PrismaUser } = {};
  const clientIdLookup: { [harvestId: string]: PrismaClient } = {};
  const projectIdLookup: { [harvestId: string]: PrismaProject } = {};
  const taskIdLookup: { [harvestId: string]: PrismaTask } = {};
  const userAssignmentIdLookup: { [harvestId: string]: PrismaUserAssignment } =
    {};
  const taskAssignemntIdLookup: { [harvestId: string]: PrismaTaskAssignment } =
    {};
  const taskTimeIdLookup: { [harvestId: string]: PrismaTaskTime } = {};

  const users: PrismaUser[] = [];
  const clients: PrismaClient[] = [];
  const projects: PrismaProject[] = [];
  const tasks: PrismaTask[] = [];
  const userAssignments: PrismaUserAssignment[] = [];
  const taskAssignments: PrismaTaskAssignment[] = [];
  const taskTimes: PrismaTaskTime[] = [];

  existingUsers.forEach((user) => {
    users.push(user);
    userIdLookup[user.harvestId] = user;
  });
  existingClients.forEach((client) => {
    clients.push(client);
    clientIdLookup[client.harvestId] = client;
  });
  existingProjects.forEach((project) => {
    projects.push(project);
    projectIdLookup[project.harvestId] = project;
  });
  existingTasks.forEach((task) => {
    tasks.push(task);
    taskIdLookup[task.harvestId] = task;
  });
  existingUserAssignments.forEach((userAssignment) => {
    userAssignments.push(userAssignment);
    userAssignmentIdLookup[userAssignment.harvestId] = userAssignment;
  });
  exisingTaskAssignments.forEach((taskAssignment) => {
    taskAssignments.push(taskAssignment);
    taskAssignemntIdLookup[taskAssignment.harvestId] = taskAssignment;
  });
  existingTaskTimes.forEach((taskTime) => {
    taskTimes.push(taskTime);
    taskTimeIdLookup[taskTime.harvestId] = taskTime;
  });

  for (let timeEntry of timesheetData.timeEntries) {
    // console.log(timeEntry);
    const {
      user,
      client,
      project,
      task,
      userAssignment,
      taskAssignment,
      taskTime,
    } = harvestDataToLocalData(timeEntry);
    // console.log({ taskTime });

    let createdUser: PrismaUser | undefined = undefined;
    if (user.harvestId in userIdLookup) {
      createdUser = userIdLookup[user.harvestId];
    } else {
      createdUser = await prisma.user.create({ data: user });
      users.push(createdUser);
      userIdLookup[user.harvestId] = createdUser;
    }

    let createdClient: PrismaClient | undefined = undefined;
    if (client.harvestId in clientIdLookup) {
      createdClient = clientIdLookup[client.harvestId];
    } else {
      createdClient = await prisma.client.create({ data: client });
      clients.push(createdClient);
      clientIdLookup[client.harvestId] = createdClient;
    }

    let createdProject: PrismaProject | undefined = undefined;
    if (project.harvestId in projectIdLookup) {
      createdProject = projectIdLookup[project.harvestId];
    } else {
      createdProject = await prisma.project.create({
        data: {
          harvestId: project.harvestId,
          name: project.name,
          client: {
            connect: {
              id: createdClient.id,
            },
          },
        },
      });
      projects.push(createdProject);
      projectIdLookup[project.harvestId] = createdProject;
    }

    let createdTask: PrismaTask | undefined = undefined;
    if (task.harvestId in taskIdLookup) {
      createdTask = taskIdLookup[task.harvestId];
    } else {
      createdTask = await prisma.task.create({
        data: {
          harvestId: task.harvestId,
          name: task.name,
          project: {
            connect: {
              id: createdProject?.id,
            },
          },
        },
      });
      tasks.push(createdTask);
      taskIdLookup[task.harvestId] = createdTask;
    }

    let createdUserAssignment: PrismaUserAssignment | undefined = undefined;
    if (userAssignment.harvestId in userAssignmentIdLookup) {
      createdUserAssignment = userAssignmentIdLookup[userAssignment.harvestId];
    } else {
      createdUserAssignment = await prisma.userAssignment.create({
        data: userAssignment,
      });
      userAssignments.push(createdUserAssignment);
      userAssignmentIdLookup[userAssignment.harvestId] = createdUserAssignment;
    }

    let createdTaskAssignment: PrismaTaskAssignment | undefined = undefined;
    if (taskAssignment.harvestId in taskAssignemntIdLookup) {
      createdTaskAssignment = taskAssignemntIdLookup[taskAssignment.harvestId];
    } else {
      createdTaskAssignment = await prisma.taskAssignment.create({
        data: taskAssignment,
      });
      taskAssignments.push(createdTaskAssignment);
      taskAssignemntIdLookup[taskAssignment.harvestId] = createdTaskAssignment;
    }

    let createdTaskTime: PrismaTaskTime | undefined = undefined;
    if (taskTime.harvestId in taskTimeIdLookup) {
      createdTaskTime = taskTimeIdLookup[taskTime.harvestId];
    } else {
      taskTime.userId = createdUser.id;
      taskTime.clientId = createdClient.id;
      taskTime.projectId = createdProject.id;
      taskTime.taskId = createdTask.id;
      taskTime.userAssignmentId = createdUserAssignment.id;
      taskTime.taskAssignmentId = createdTaskAssignment.id;
      createdTaskTime = await prisma.taskTime.create({ data: taskTime });
      taskTimes.push(createdTaskTime);
      taskTimeIdLookup[taskTime.harvestId] = createdTaskTime;
    }
  }
  await prisma.harvestJob.update({
    where: { id: harvestJob.id },
    data: { lastPageDownloaded: timesheetData.page },
  });
};

runJob().then(() => {
  console.log("done");
});
