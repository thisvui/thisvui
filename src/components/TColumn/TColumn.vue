<template>
  <div :id="id" :class="getClasses">
    <slot></slot>
  </div>
</template>

<script>
import columns from "../../mixins/columns";
import twelveColumns from "../../mixins/12-columns";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-column",
  mixins: [common, columns, twelveColumns],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("column");
      cssArchitect.addClass(this.getColumnModifiers);
      cssArchitect.addClass(this.get12ColumnsModifiers);
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {};
  }
};
</script>
