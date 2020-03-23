<template>
  <div draggable @dragstart.self="onDrag" @dragover.prevent @dragenter.prevent>
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class AppDrag extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Prop({ required: true, type: Object }) transferData!: Record<string, any>;

  onDrag(event: DragEvent) {
    if (event.dataTransfer != null) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer?.setData("payload", JSON.stringify(this.transferData));
    }
  }
}
</script>