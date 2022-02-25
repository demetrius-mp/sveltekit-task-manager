import type { Task, TaskGroup as TaskGroupType, User as UserType } from '$lib/types';
import { writable, type Writable } from 'svelte/store';

interface TaskGroup extends TaskGroupType {
	isCurrent?: boolean;
}

interface User extends UserType {
	taskGroups: TaskGroup[];
}

interface UserStore extends Writable<User> {
	addTaskGroup: (taskGroup: TaskGroupType) => Promise<TaskGroupType>;
	updateTaskGroup: (taskGroup: TaskGroupType) => Promise<void>;
	addTaskToTaskGroup: (taskGroup: TaskGroupType, task: Task) => Promise<Task>;
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
			const newTask: Task = {
				name,
				id: Date.now(),
				complete: false,
				createdAt: new Date()
			};

			taskGroup.tasks = [...taskGroup.tasks, newTask];
			updateTaskGroup(taskGroup);

			return newTask;
		}
	};
}

export const userStore = createUserStore();
