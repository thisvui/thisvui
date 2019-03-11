<template>
  <div :id="id" :class="getClasses">
    <slot></slot>
  </div>
</template>

<script>
import helper from "../../mixins/helpers";
import responsive from "../../mixins/responsive";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "ThisContainer",
  mixins: [common, helper, responsive],
  props: {
    isFluid: {
      type: [Boolean, String],
      default: false
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("container");
      cssArchitect.addClass("is-fluid", this.getBoolean(this.isFluid));
      cssArchitect.addClass(this.getResponsiveModifiers);
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {};
  }
};
</script>
