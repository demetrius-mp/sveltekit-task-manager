import type { ITask, ITaskGroup } from '$lib/types';
import { derived, get, type Writable } from 'svelte/store';
import { userStore } from './user.store';

interface CurrentTaskGroupStore {
	subscribe: Writable<ITaskGroup>['subscribe'];
	set: Writable<ITaskGroup>['set'];
	addTask: (task: ITask) => Promise<ITask>;
	deleteTask: (task: ITask) => Promise<void>;
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
			return await userStore.addTaskToTaskGroup(get(derivedStore), task);
		},
		deleteTask: async (task) => {
			await userStore.deleteTaskFromGroup(get(derivedStore), task);
		}
	};
}

export const currentTaskGroupStore = createCurrentTaskGroupStore();
