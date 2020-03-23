<template>
  <div @drop.stop="onDrop">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AppDrop extends Vue {
  onDrop(event: DragEvent) {
    const transferDataString = event.dataTransfer?.getData("payload") || "";
    const transferData = JSON.parse(transferDataString);

    this.$emit("drop", transferData);
  }
}
</script>