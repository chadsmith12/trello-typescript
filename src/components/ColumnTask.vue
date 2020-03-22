<template>
  <div
    draggable
    @dragstart="pickupTask($event, taskIndex, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    @drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, taskIndex)"
  >
    <v-list-item @click="goToTask(task)" class="py-2" :key="`task-${taskIndex}`">
      <v-list-item-content>
        <v-list-item-title v-text="task.name"></v-list-item-title>
        <v-list-item-subtitle v-if="task.description" v-text="task.description"></v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider :key="`divider-${taskIndex}`"></v-divider>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Task } from "../models/Task";
import { Column } from "../models/Column";
import { Board } from "../models/Board";

@Component
export default class ColumnTask extends Vue {
  @Prop({ required: true }) task!: Task;
  @Prop({ required: true }) taskIndex!: number;
  @Prop({ required: true }) column!: Column;
  @Prop({ required: true }) columnIndex!: number;
  @Prop({ required: true }) board!: Board;

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

  goToTask(task: Task) {
    this.$router.push({ name: "task", params: { id: task.id } });
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