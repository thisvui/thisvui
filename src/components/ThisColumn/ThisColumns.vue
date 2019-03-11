<template>
  <div :id="id" :class="getClasses">
    <slot></slot>
  </div>
</template>

<script>
import CssArchitect from "../../utils/css-architect";
import responsive from "../../mixins/responsive";
import common from "../../mixins/common";

export default {
  name: "ThisColumns",
  mixins: [common, responsive],
  props: {
    isGapless: {
      type: [String, Boolean]
    },
    isMultiline: {
      type: [String, Boolean]
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("columns");
      cssArchitect.addClass(this.getResponsiveModifiers);
      cssArchitect.addClass("is-gapless", this.getBoolean(this.isGapless));
      cssArchitect.addClass("is-multiline", this.getBoolean(this.isMultiline));

      return cssArchitect.getClasses();
    }
  },
  data() {
    return {};
  }
};
</script>
