import { acceptHMRUpdate, defineStore } from "pinia";
import { TASKS_MOCK } from "~/src/shared/mocks/tasksMock";
import type { Task } from "~/src/shared/types";

export interface NetworkEntitiesCommon {
  loading: boolean;
  success: boolean;
  error: Error | null | boolean;
}

export interface NetworkEntity<T> extends NetworkEntitiesCommon {
  item: T | null;
}

interface RootState {
  tasks: NetworkEntity<Task[]>;
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
    async checkQuizTask(taskId: number, answerId: number) {
      const correctAnswerId = 4;

      this.tasks.loading = true;
      this.tasks.error = null;
      this.tasks.success = false;
      const currentQuestionIndex = this.tasks.item?.findIndex((task) => task.id === taskId);

      try {
        if (typeof currentQuestionIndex === 'number' && this.tasks.item) {
          this.tasks.item[currentQuestionIndex] = {
            ...this.tasks.item[currentQuestionIndex],
            is_correct: answerId === correctAnswerId,
            correct_answer_id: correctAnswerId,
          };
          this.tasks.success = true;
        }
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
