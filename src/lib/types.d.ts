export interface ITask {
	id?: number;
	name: string;
	createdAt?: Date;
	complete?: boolean;
	completedAt?: Date;
}

export interface ITaskGroup {
	id?: number;
	name: string;
	tasks: Task[];
}

interface IUser {
	avatarUrl?: string;
	taskGroups: TaskGroup[];
}
