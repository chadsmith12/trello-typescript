<template>
  <v-card>
    <v-card-title class="headline">{{task.name}}</v-card-title>
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
}
</script>