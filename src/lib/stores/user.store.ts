import type { Task, TaskGroup, User } from '$lib/types';
import { writable, type Writable } from 'svelte/store';

interface UserStore extends Writable<User> {
	addTaskGroup: (taskGroup: TaskGroup) => Promise<TaskGroup>;
	updateTaskGroup: (taskGroup: TaskGroup) => Promise<void>;
	addTaskToTaskGroup: (taskGroup: TaskGroup, task: Task) => Promise<Task>;
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
export const currentTaskGroup = writable<TaskGroup>(null);
