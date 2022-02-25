import type { ITask, ITaskGroup, IUser } from '$lib/types';
import { writable, type Writable } from 'svelte/store';

interface TaskGroup extends ITaskGroup {
	isCurrent?: boolean;
}

interface User extends IUser {
	taskGroups: TaskGroup[];
}

interface UserStore extends Writable<User> {
	addTaskGroup: (taskGroup: ITaskGroup) => Promise<ITaskGroup>;
	updateTaskGroup: (taskGroup: ITaskGroup) => Promise<void>;
	addTaskToTaskGroup: (taskGroup: ITaskGroup, task: ITask) => Promise<ITask>;
	deleteTaskFromGroup: (taskGroup: ITaskGroup, task: ITask) => Promise<void>;
}

function createUserStore(): UserStore {
	const { subscribe, set, update } = writable<User>(null);

	const updateTaskGroup: UserStore['updateTaskGroup'] = async (taskGroup) => {
		update((user) => {
			const updatedTaskGroups: TaskGroup[] = user.taskGroups.map((v) => {
				return v.id === taskGroup.id ? taskGroup : v;
			});

			return {
				...user,
				taskGroups: updatedTaskGroups
			};
		});
	};

	return {
		subscribe,
		set,
		update,
		addTaskGroup: async ({ name, tasks }) => {
			const newTaskGroup: TaskGroup = {
				id: Date.now(),
				name,
				tasks
			};

			update((user) => {
				return {
					...user,
					taskGroups: [...user.taskGroups, newTaskGroup]
				};
			});

			return newTaskGroup;
		},
		updateTaskGroup,
		addTaskToTaskGroup: async (taskGroup, { name }) => {
			const newTask: ITask = {
				name,
				id: Date.now(),
				complete: false,
				createdAt: new Date()
			};

			taskGroup.tasks = [...taskGroup.tasks, newTask];
			await updateTaskGroup(taskGroup);

			return newTask;
		},
		deleteTaskFromGroup: async (taskGroup, task) => {
			const updatedTaskList = taskGroup.tasks.filter((value) => {
				return task.id !== value.id;
			});

			const updatedTaskGroup: ITaskGroup = {
				...taskGroup,
				tasks: updatedTaskList
			};

			await updateTaskGroup(updatedTaskGroup);
		}
	};
}

export const userStore = createUserStore();
