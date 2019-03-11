<template>
  <div :id="id" :class="getClasses">
    <slot></slot>
  </div>
</template>

<script>
import columns from "../../mixins/columns";
import grid from "../../mixins/12-columns";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "ThisColumn",
  mixins: [common, columns, grid],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("column");
      cssArchitect.addClass(this.getColumnModifiers);
      cssArchitect.addClass(this.getGridModifiers);
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {};
  }
};
</script>
