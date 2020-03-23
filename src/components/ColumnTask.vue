<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag :transferData="{type: 'task', fromColumnIndex: columnIndex, fromTaskIndex: taskIndex}">
      <v-list-item @click="goToTask(task)" class="py-2" :key="`task-${taskIndex}`">
        <v-list-item-content>
          <v-list-item-title v-text="task.name"></v-list-item-title>
          <v-list-item-subtitle v-if="task.description" v-text="task.description"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider :key="`divider-${taskIndex}`"></v-divider>
    </AppDrag>
  </AppDrop>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Task } from "../models/Task";
import MovingClassAndColumnsMixin from "@/mixins/movingTasksAndColumnsMixin";
import AppDrag from "@/components/AppDrag.vue";
import AppDrop from "@/components/AppDrop.vue";

@Component({
  components: {
    AppDrag,
    AppDrop
  },
  mixins: [MovingClassAndColumnsMixin]
})
export default class ColumnTask extends Vue {
  @Prop({ required: true }) task!: Task;
  @Prop({ required: true }) taskIndex!: number;

  goToTask(task: Task) {
    this.$router.push({ name: "task", params: { id: task.id } });
  }
}
</script>