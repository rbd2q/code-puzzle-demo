import { acceptHMRUpdate, defineStore } from "pinia";
import {TASKS_MOCK} from "~/src/shared/mocks/tasksMock";
import {TaskType} from "~/src/shared/types";

export interface NetworkEntitiesCommon {
  loading: boolean;
  success: boolean;
  error: Error | null | boolean;
}

export interface NetworkEntity<T> extends NetworkEntitiesCommon {
  item: T | null;
}

interface RootState {
  tasks: NetworkEntity<TaskType[]>;
}

export const useTasksStore = defineStore("tasks", {
  state: (): RootState => {
    return {
      tasks: {
        item: null,
        loading: false,
        error: false,
        success: false,
      },
    };
  },
  getters: {},
  actions: {
    async getTasks() {
      this.tasks.loading = true;
      this.tasks.error = null;
      this.tasks.success = false;
      try {
        const data = TASKS_MOCK;
        console.log("task data", data);
        if (data) {
          this.tasks.item = data;
        }
        this.tasks.success = true;
      } catch (e: any) {
        this.tasks.error = true;
        this.tasks.success = false;
      } finally {
        this.tasks.loading = false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot));
}
