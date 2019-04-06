<template>
  <header :id="id" :class="getClasses">
    <slot></slot>
  </header>
</template>

<script>
import colors from "../../mixins/colors";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-header",
  mixins: [common, colors],
  props: {
    isFixed: {
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
      const cssArchitect = new CssArchitect("t-header");
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass("is-fixed", this.isFixed);
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {};
  }
};
</script>
