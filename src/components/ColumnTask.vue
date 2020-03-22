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
import MovingClassAndColumnsMixin from "@/mixins/movingTasksAndColumnsMixin";

@Component({
  mixins: [MovingClassAndColumnsMixin]
})
export default class ColumnTask extends Vue {
  @Prop({ required: true }) task!: Task;
  @Prop({ required: true }) taskIndex!: number;

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
}
</script>