<template>
  <span :class="getClasses">
    <slot></slot>
  </span>
</template>

<script>
import CssArchitect from "../../utils/css-architect";
import check from "../../mixins/check";

export default {
  name: "t-tags",
  mixins: [check],
  props: {
    hasAddons: {
      type: [String, Boolean]
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("tags");
      cssArchitect.addClass("has-addons", this.getBoolean(this.hasAddons));

      return cssArchitect.getClasses();
    }
  }
};
</script>
