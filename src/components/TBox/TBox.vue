<template>
  <div :id="id" :class="getClasses">
    <slot></slot>
  </div>
</template>

<script>
import CssArchitect from "../../utils/css-architect";
import syntax from "../../mixins/syntax";
import common from "../../mixins/common";
import helpers from "../../mixins/helpers";

export default {
  name: "t-box",
  mixins: [common, syntax, helpers],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("box");
      cssArchitect.addClass(this.getSyntaxModifiers);
      cssArchitect.addClass(this.getHelpersModifiers);
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {};
  }
};
</script>
