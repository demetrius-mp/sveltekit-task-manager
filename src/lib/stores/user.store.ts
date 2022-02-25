import type { TaskGroup, User } from '$lib/types';
import { writable, type Writable } from 'svelte/store';

interface UserStore extends Writable<User> {
	addTaskGroup: (taskGroup: TaskGroup) => Promise<TaskGroup>;
}

function createUserStore(): UserStore {
	const { subscribe, set, update } = writable<User>(null);

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
		}
	};
}

export const userStore = createUserStore();
