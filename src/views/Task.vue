<template>
  <v-card>
    <v-card-title class="headline">
      <v-text-field
        :value="task.name"
        label="Task Name"
        @change.native="updateTaskProperty($event, 'name')"
        @keyup.enter="updateTaskProperty($event, 'name')"
      ></v-text-field>
    </v-card-title>
    <v-container>
      <v-row>
        <v-col>
          <v-textarea
            :value="task.description"
            label="Task Description"
            outlined
            @change="updateTaskProperty($event, 'description')"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Task extends Vue {
  get getTask() {
    return this.$store.getters.getTask;
  }
  get task() {
    return this.getTask(this.$route.params.id);
  }

  updateTaskProperty(event: Event, key: string) {
    const target = event.target as HTMLInputElement;

    this.$store.commit("UPDATE_TASK", {
      task: this.task,
      key,
      value: target.value
    });
  }
}
</script>