<template>
  <div class="ma-3">
    <div class="board-container d-flex align-start">
      <v-card
        v-for="column of board.columns"
        :key="`${column.name}-column`"
        class="mr-4"
        outlined
        min-width="350px"
      >
        <v-card-title>{{ column.name }}</v-card-title>
        <v-divider></v-divider>
        <template v-for="(task, $taskIndex) of column.tasks">
          <v-list-item
            @click="goToTask(task)"
            class="py-2"
            :key="`task-${$taskIndex}`"
            color="white"
          >
            <v-list-item-content>
              <v-list-item-title v-text="task.name"></v-list-item-title>
              <v-list-item-subtitle v-if="task.description" v-text="task.description"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="`divider-${$taskIndex}`"></v-divider>
        </template>
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

@Component
export default class Board extends Vue {
  get board() {
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
}
</script>

<style scoped>
.board-container {
  overflow-x: auto;
  height: calc(100vh - 8.6rem);
}
</style>