<template>
  <div class="ma-3">
    <div class="board-container d-flex align-start">
      <v-card
        v-for="(column, $columnIndex) of board.columns"
        :key="`${column.name}-column`"
        class="mr-4"
        outlined
        min-width="350px"
        @drop="moveTask($event, column.tasks)"
        @dragover.prevent
        @dragenter.prevent
      >
        <v-card-title>{{ column.name }}</v-card-title>
        <v-divider></v-divider>
        <div
          v-for="(task, $taskIndex) of column.tasks"
          :key="$taskIndex"
          draggable
          @dragstart="pickupTask($event, $taskIndex, $columnIndex)"
        >
          <v-list-item @click="goToTask(task)" class="py-2" :key="`task-${$taskIndex}`">
            <v-list-item-content>
              <v-list-item-title v-text="task.name"></v-list-item-title>
              <v-list-item-subtitle v-if="task.description" v-text="task.description"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider :key="`divider-${$taskIndex}`"></v-divider>
        </div>
        <v-list-item>
          <v-text-field label="+ Enter new task" @keyup.enter="createTask($event, column.tasks)"></v-text-field>
        </v-list-item>
      </v-card>
    </div>

    <v-dialog v-model="isTaskOpen" max-width="650px">
      <router-view />
    </v-dialog>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";
import { Task } from "@/models/Task";
import { Board } from "@/models/Board";

@Component
export default class BoardView extends Vue {
  get board(): Board {
    return this.$store.state.board;
  }

  get isTaskOpen() {
    return this.$route.name == "task";
  }
  set isTaskOpen(newValue: boolean) {
    if (!newValue) {
      this.$router.push({ name: "board" });
    }
  }

  goToTask(task: Task) {
    this.$router.push({ name: "task", params: { id: task.id } });
  }

  createTask(event: KeyboardEvent, tasks: Task[]) {
    const target = event.target as HTMLInputElement;
    this.$store.commit("CREATE_TASK", {
      tasks,
      name: target.value
    });
    target.value = "";
  }

  pickupTask(event: DragEvent, taskIndex: number, fromColumnIndex: number) {
    if (event.dataTransfer != null) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.setData("task-index", taskIndex.toString());
      event.dataTransfer.setData(
        "from-column-index",
        fromColumnIndex.toString()
      );
    }
  }

  moveTask(event: DragEvent, toColumn: Task[]) {
    const columnData = event.dataTransfer?.getData("from-column-index") || "";
    const taskData = event.dataTransfer?.getData("task-index") || "";
    const fromColumnIndex = parseInt(columnData);
    const fromTaskIndex = parseInt(taskData);
    const fromTasks = this.board.columns[fromColumnIndex].tasks;

    this.$store.commit("MOVE_TASK", {
      fromColumn: fromTasks,
      toColumn: toColumn,
      taskIndex: fromTaskIndex
    });
  }
}
</script>

<style scoped>
.board-container {
  overflow-x: auto;
  height: calc(100vh - 8.6rem);
}
</style>