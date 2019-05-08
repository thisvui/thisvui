<template>
  <div :id="id" :class="getClasses">
    <slot></slot>
  </div>
</template>

<script>
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-section",
  mixins: [common],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("section");
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {};
  }
};
</script>
