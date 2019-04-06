<template>
  <div :id="id" :class="getClasses">
    <slot> </slot>
  </div>
</template>

<script>
import CssArchitect from "../../utils/css-architect";
import syntax from "../../mixins/syntax";
import common from "../../mixins/common";

export default {
  name: "t-list-item",
  mixins: [common, syntax],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("list-item");
      cssArchitect.addClass(this.getSyntaxModifiers);
      return cssArchitect.getClasses();
    }
  }
};
</script>
