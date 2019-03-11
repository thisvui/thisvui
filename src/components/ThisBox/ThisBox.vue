<template>
  <div :id="id" :class="getClasses">
    <slot></slot>
  </div>
</template>

<script>
import CssArchitect from "../../utils/css-architect";
import syntax from "../../mixins/syntax";
import sizes from "../../mixins/sizes";
import common from "../../mixins/common";

export default {
  name: "ThisBox",
  mixins: [common, syntax, sizes],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("box");
      cssArchitect.addClass(this.getSyntaxModifiers);
      cssArchitect.addClass(this.getSizesModifiers);
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {};
  }
};
</script>
