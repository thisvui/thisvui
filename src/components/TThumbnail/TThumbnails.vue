<template>
  <div :id="id" class="t-thumbnails">
    <slot></slot>
  </div>
</template>

<script>
import common from "../../mixins/common";

export default {
  name: "t-thumbnails",
  mixins: [common]
};
</script>

<style></style>
