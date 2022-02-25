import type { Task, TaskGroup } from '$lib/types';
import { derived, get, type Writable } from 'svelte/store';
import { userStore } from './user.store';

interface CurrentTaskGroupStore {
	subscribe: Writable<TaskGroup>['subscribe'];
	set: Writable<TaskGroup>['set'];
	addTask: (task: Task) => Promise<Task>;
}

function createCurrentTaskGroupStore(): CurrentTaskGroupStore {
	const derivedStore = derived(userStore, ($userStore) => {
		return $userStore?.taskGroups.find((v) => v.isCurrent);
	});

	return {
		subscribe: derivedStore.subscribe,
		set: (taskGroup) => {
			userStore.update((user) => {
				const updatedTaskGroups = user.taskGroups.map((v) => {
					v.isCurrent = v.id === taskGroup.id;
					return v;
				});

				return {
					...user,
					taskGroups: updatedTaskGroups
				};
			});
		},
		addTask: async (task) => {
			return userStore.addTaskToTaskGroup(get(derivedStore), task);
		}
	};
}

export const currentTaskGroupStore = createCurrentTaskGroupStore();
