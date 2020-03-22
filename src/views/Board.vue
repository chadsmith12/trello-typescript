<template>
  <div class="ma-3">
    <div class="board-container d-flex align-start">
      <BoardColumn
        v-for="(column, $columnIndex) of board.columns"
        :key="`${column.name}-column`"
        :column="column"
        :columnIndex="$columnIndex"
        :board="board"
      />
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
import { Board } from "@/models/Board";
import BoardColumn from "@/components/BoardColumn.vue";

@Component({
  components: {
    BoardColumn
  }
})
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
}
</script>

<style scoped>
.board-container {
  overflow-x: auto;
  height: calc(100vh - 8.6rem);
}
</style>