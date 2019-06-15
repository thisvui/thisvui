<template>
  <div :id="id" :class="getClasses">
    <slot></slot>
  </div>
</template>

<script>
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";
import sizes from "../../mixins/sizes";
import background from "../../mixins/background";

export default {
  name: "t-section",
  mixins: [common, sizes, background],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("section");
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(this.getBackgroundModifiers);
      return cssArchitect.getClasses();
    }
  }
};
</script>
