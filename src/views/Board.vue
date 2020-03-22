<template>
  <div class="ma-3">
    <div class="board-container d-flex align-start">
      <v-card
        v-for="(column, $columnIndex) of board.columns"
        :key="`${column.name}-column`"
        class="mr-4"
        outlined
        min-width="350px"
        draggable
        @drop="moveTaskOrColumn($event, column.tasks, $columnIndex)"
        @dragover.prevent
        @dragenter.prevent
        @dragstart.self="pickupColumn($event, $columnIndex)"
      >
        <v-card-title>{{ column.name }}</v-card-title>
        <v-divider></v-divider>
        <div
          v-for="(task, $taskIndex) of column.tasks"
          :key="$taskIndex"
          draggable
          @dragstart="pickupTask($event, $taskIndex, $columnIndex)"
          @dragover.prevent
          @dragenter.prevent
          @drop.stop="moveTaskOrColumn($event, column.tasks, $columnIndex, $taskIndex)"
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
      <v-card class="mr-4" outlined min-width="350px">
        <v-card-title>
          <v-text-field
            v-model="newColumnName"
            label="Enter new Column"
            @keyup.enter="createColumn"
          ></v-text-field>
        </v-card-title>
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
  newColumnName = "";

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

  createColumn() {
    this.$store.commit("CREATE_COLUMN", { name: this.newColumnName });
    this.newColumnName = "";
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
      event.dataTransfer.setData("from-task-index", taskIndex.toString());
      event.dataTransfer.setData(
        "from-column-index",
        fromColumnIndex.toString()
      );
      event.dataTransfer.setData("type", "task");
    }
  }

  pickupColumn(event: DragEvent, fromColumnIndex: number) {
    if (event.dataTransfer != null) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.setData(
        "from-column-index",
        fromColumnIndex.toString()
      );
      event.dataTransfer.setData("type", "column");
    }
  }

  moveTaskOrColumn(
    event: DragEvent,
    toColumn: Task[],
    toColumnIndex: number,
    toTaskIndex?: number
  ) {
    const type = event.dataTransfer?.getData("type") || "";
    if (type === "task") {
      const taskIndex =
        toTaskIndex !== undefined ? toTaskIndex : toColumn.length;
      this.moveTask(event, toColumn, taskIndex);
    } else {
      this.moveColumn(event, toColumnIndex);
    }
  }

  moveTask(event: DragEvent, toColumn: Task[], toTaskIndex?: number) {
    const columnData = event.dataTransfer?.getData("from-column-index") || "";
    const taskData = event.dataTransfer?.getData("from-task-index") || "";
    const fromColumnIndex = parseInt(columnData);
    const fromTaskIndex = parseInt(taskData);
    const fromTasks = this.board.columns[fromColumnIndex].tasks;

    this.$store.commit("MOVE_TASK", {
      fromColumn: fromTasks,
      toColumn: toColumn,
      fromTaskIndex: fromTaskIndex,
      toTaskIndex: toTaskIndex
    });
  }

  moveColumn(event: DragEvent, toColumnIndex: number) {
    const columnData = event.dataTransfer?.getData("from-column-index") || "";
    const fromColumnIndex = parseInt(columnData);

    this.$store.commit("MOVE_COLUMN", {
      fromColumnIndex,
      toColumnIndex
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