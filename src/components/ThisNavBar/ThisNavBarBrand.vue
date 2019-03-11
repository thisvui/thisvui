<template>
  <div :id="id" class="navbar-brand">
    <slot></slot>
  </div>
</template>

<script>
import helper from "../../mixins/helpers";
import common from "../../mixins/common";

export default {
  name: "ThisNavbarBrand",
  mixins: [common, helper]
};
</script>
