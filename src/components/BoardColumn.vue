<template>
  <v-card
    class="mr-4"
    outlined
    min-width="350px"
    draggable
    @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    @dragstart.self="pickupColumn($event, columnIndex)"
  >
    <v-card-title>{{ column.name }}</v-card-title>
    <v-divider></v-divider>
    <ColumnTask
      v-for="(task, $taskIndex) of column.tasks"
      :key="$taskIndex"
      :task="task"
      :taskIndex="$taskIndex"
      :column="column"
      :columnIndex="columnIndex"
      :board="board"
    />
    <v-list-item>
      <v-text-field label="+ Enter new task" @keyup.enter="createTask($event, column.tasks)"></v-text-field>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Task } from "@/models/Task";
import ColumnTask from "@/components/ColumnTask.vue";
import MovingClassAndColumnsMixin from "@/mixins/movingTasksAndColumnsMixin";

@Component({
  components: {
    ColumnTask
  },
  mixins: [MovingClassAndColumnsMixin]
})
export default class BoardColumn extends Vue {
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

  createTask(event: KeyboardEvent, tasks: Task[]) {
    const target = event.target as HTMLInputElement;
    this.$store.commit("CREATE_TASK", {
      tasks,
      name: target.value
    });
    target.value = "";
  }
}
</script>