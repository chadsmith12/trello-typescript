<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag :transferData="{type: 'column', fromColumnIndex: columnIndex}">
      <v-card class="mr-4" outlined min-width="350px">
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
    </AppDrag>
  </AppDrop>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Task } from "@/models/Task";
import ColumnTask from "@/components/ColumnTask.vue";
import AppDrag from "@/components/AppDrag.vue";
import AppDrop from "@/components/AppDrop.vue";
import MovingClassAndColumnsMixin from "@/mixins/movingTasksAndColumnsMixin";

@Component({
  components: {
    ColumnTask,
    AppDrag,
    AppDrop
  },
  mixins: [MovingClassAndColumnsMixin]
})
export default class BoardColumn extends Vue {
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