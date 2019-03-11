<template>
  <div :id="id" class="this-thumbnails">
    <slot></slot>
  </div>
</template>

<script>
import common from "../../mixins/common";

export default {
  name: "ThisThumbnails",
  mixins: [common]
};
</script>

<style></style>
