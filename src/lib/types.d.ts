export interface Task {
	id?: number;
	name: string;
	createdAt?: Date;
	complete?: boolean;
	completedAt?: Date;
}

export interface TaskGroup {
	id?: number;
	name: string;
	tasks: Task[];
}

interface User {
	avatarUrl?: string;
	taskGroups: TaskGroup[];
}
