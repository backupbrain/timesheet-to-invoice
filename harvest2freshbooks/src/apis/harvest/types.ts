export type Client = {
  id?: string;
  harvestId: number;
  name: string;
  currency: string;
  projects?: Project[];
  taskTimes?: TaskTime[];
};

export type Project = {
  id?: string;
  harvestId: number;
  name: string;
  clientId?: string | null | undefined;
  client?: Client;
  taskTimes?: TaskTime[];
  tasks?: Task[];
};

export type Task = {
  id?: string;
  harvestId: number;
  name: string;
  projectId?: string | null | undefined;
  project?: Project;
  taskTimes?: TaskTime[];
};

export type User = {
  id?: string;
  harvestId: number;
  name: string;
  taskTimes?: TaskTime[];
};

export type UserAssignment = {
  id?: string;
  harvestId: number;
  name: string;
  isProjectManager: boolean;
  isActive: boolean;
  useDefaultRates: boolean;
  budget?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
  taskTimes?: TaskTime[];
};

export type TaskAssignment = {
  id?: string;
  harvestId: number;
  name: string;
  billable: boolean;
  isActive: boolean;
  hourlyRate?: number | null;
  budget?: number | null;
  taskTimes?: TaskTime[];
};

export type TaskTime = {
  id?: string;
  harvestId: number;
  spentDate: string;
  hours: number;
  hoursWithoutTimer: number;
  roundedHours: number;
  notes?: string | null;
  lockedReason?: string | null;
  isClosed?: boolean;
  isBilled?: boolean;
  timerStartedAt?: Date | null;
  startedTime?: string | null; // HH:MMap
  endedTime?: string | null; // HH:MMap
  isRunning?: boolean;
  billable?: boolean;
  budgeted?: boolean;
  billableRate?: number | null;
  costRate?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
  invoice?: string | null;
  externalReference?: string | null;
  userId?: string | null | undefined;
  clientId?: string | null | undefined;
  projectId?: string | null | undefined;
  taskId?: string | null | undefined;
  userAssignmentId?: string | null | undefined;
  taskAssignmentId?: string | null | undefined;
};

export type HarvestClient = {
  id: number;
  name: string;
  currency: string;
  projects?: Project[];
  task_times?: TaskTime[];
};

export type HarvestProject = {
  id: number;
  name: string;
  client_id: string;
  client?: Client;
  task_times?: TaskTime[];
};

export type HarvestTask = {
  id: number;
  name: string;
  task_times?: TaskTime[];
};

export type HarvestUser = {
  id: number;
  name: string;
  task_times?: TaskTime[];
};

export type HarvestUserAssignment = {
  id: number;
  name: string;
  is_project_manager: boolean;
  is_active: boolean;
  use_default_rates: boolean;
  budget?: number | null;
  created_at: Date;
  updated_at: Date;
  task_times?: TaskTime[];
};

export type HarvestTaskAssignment = {
  id: number;
  name: string;
  billable: boolean;
  is_active: boolean;
  hourly_rate?: number;
  budget?: number | null;
  task_times?: TaskTime[];
};

export type HarvestTaskTime = {
  id: number;
  spent_date: string;
  hours: number;
  hours_without_timer: number;
  rounded_hours: number;
  notes?: string | null;
  locked_reason?: string | null;
  is_closed?: boolean;
  is_billed?: boolean;
  timer_started_at?: Date | null;
  started_time?: string | null; // HH:MMap
  ended_time?: string | null; // HH:MMap
  is_running?: boolean;
  billable?: boolean;
  budgeted?: boolean;
  billable_rate?: number | null;
  cost_rate?: number | null;
  created_at: Date;
  updated_at: Date;
  invoice?: string | null;
  external_reference?: string | null;
  user?: HarvestUser;
  client?: HarvestClient;
  project?: HarvestProject;
  task?: HarvestTask;
  user_assignment?: HarvestUserAssignment;
  task_assignment?: HarvestTaskAssignment;
};

export const harvestClientToClient = (harvestData: HarvestClient) => {
  const result: Client = {
    harvestId: harvestData.id,
    name: harvestData.name,
    currency: harvestData.currency,
  };
  return result;
};

export const harvestProjectToProject = (harvestData: HarvestProject) => {
  const result: Project = {
    harvestId: harvestData.id,
    name: harvestData.name,
    clientId: "",
  };
  return result;
};

export const harvestTaskToTask = (harvestData: HarvestTask) => {
  const result: Task = {
    harvestId: harvestData.id,
    name: harvestData.name,
  };
  return result;
};

export const harvestUserToUser = (harvestData: HarvestUser) => {
  const result: User = {
    harvestId: harvestData.id,
    name: harvestData.name,
  };
  return result;
};

export const harvestUserAssignmentToUserAssignment = (
  harvestData: HarvestUserAssignment
) => {
  const result: UserAssignment = {
    harvestId: harvestData.id,
    name: harvestData.name,
    isProjectManager: harvestData.is_project_manager,
    isActive: harvestData.is_active,
    useDefaultRates: harvestData.use_default_rates,
    budget: harvestData.budget,
    createdAt: new Date(harvestData.created_at),
    updatedAt: new Date(harvestData.updated_at),
  };
  return result;
};

export const harvestTaskAssignmentToTaskAssignment = (
  harvestData: HarvestTaskAssignment
) => {
  const result: TaskAssignment = {
    harvestId: harvestData.id,
    name: harvestData.name,
    isActive: harvestData.is_active,
    billable: harvestData.billable,
    hourlyRate: harvestData.hourly_rate,
    budget: harvestData.budget,
  };
  return result;
};

export const harvestTaskTimeToTaskTime = (harvestData: HarvestTaskTime) => {
  const result: TaskTime = {
    harvestId: harvestData.id,
    spentDate: harvestData.spent_date,
    hours: harvestData.hours,
    hoursWithoutTimer: harvestData.hours_without_timer,
    roundedHours: harvestData.rounded_hours,
    notes: harvestData.notes,
    lockedReason: harvestData.locked_reason,
    isClosed: harvestData.is_closed,
    isBilled: harvestData.is_billed,
    timerStartedAt: harvestData.timer_started_at,
    startedTime: harvestData.started_time,
    endedTime: harvestData.ended_time,
    isRunning: harvestData.is_running,
    billable: harvestData.billable,
    budgeted: harvestData.budgeted,
    billableRate: harvestData.billable_rate,
    costRate: harvestData.cost_rate,
    createdAt: new Date(harvestData.created_at),
    updatedAt: new Date(harvestData.updated_at),
    invoice: JSON.stringify(harvestData.invoice),
    externalReference: JSON.stringify(harvestData.external_reference),
  };
  return result;
};

export const harvestDataToLocalData = (harvestData: HarvestTaskTime) => {
  const {
    user,
    task,
    project,
    client,
    user_assignment,
    task_assignment,
    ...task_time
  } = harvestData;
  const localUser = harvestUserToUser(user!);
  const localTask = harvestTaskToTask(task!);
  const localProject = harvestProjectToProject(project!);
  const localClient = harvestClientToClient(client!);
  const localUserAssignment = harvestUserAssignmentToUserAssignment(
    user_assignment!
  );
  const localTaskAssignment = harvestTaskAssignmentToTaskAssignment(
    task_assignment!
  );
  const localTaskTime = harvestTaskTimeToTaskTime(task_time);
  return {
    user: localUser,
    task: localTask,
    project: localProject,
    client: localClient,
    userAssignment: localUserAssignment,
    taskAssignment: localTaskAssignment,
    taskTime: localTaskTime,
  };
};
