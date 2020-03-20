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
          <v-list-item @click="noClick" class="py-2" :key="`task-${$taskIndex}`" color="white">
            <v-list-item-content>
              <v-list-item-title v-text="task.name"></v-list-item-title>
              <v-list-item-subtitle v-if="task.description" v-text="task.description"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="`divider-${$taskIndex}`"></v-divider>
        </template>
      </v-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Board extends Vue {
  get board() {
    return this.$store.state.board;
  }

  noClick() {
    return;
  }
}
</script>

<style scoped>
.board-container {
  overflow-x: auto;
  height: calc(100vh - 8.6rem);
}
</style>