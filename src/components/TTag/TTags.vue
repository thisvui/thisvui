<template>
  <span :class="getClasses">
    <slot></slot>
  </span>
</template>

<script>
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-tags",
  props: {
    hasAddons: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("tags");
      cssArchitect.addClass("has-addons", this.hasAddons);
      return cssArchitect.getClasses();
    }
  }
};
</script>
