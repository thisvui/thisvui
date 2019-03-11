<template>
  <nav :id="id" :class="getClasses" role="navigation">
    <slot></slot>
  </nav>
</template>

<script>
import helper from "../../mixins/helpers";
import colors from "../../mixins/colors";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";
import ThisNavBarItem from "./ThisNavBarItem";

export default {
  name: "ThisNavbar",
  components: { ThisNavBarItem },
  mixins: [common, helper, colors],
  props: {
    isTransparent: {
      type: [Boolean, String],
      default: false
    },
    isFixedTop: {
      type: [Boolean, String],
      default: false
    },
    isFixedBottom: {
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
      const cssArchitect = new CssArchitect("navbar");
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(
        "is-transparent",
        this.getBoolean(this.isTransparent)
      );
      cssArchitect.addClass("is-fixed-top", this.getBoolean(this.isFixedTop));
      cssArchitect.addClass(
        "is-fixed-bottom",
        this.getBoolean(this.isFixedBottom)
      );
      return cssArchitect.getClasses();
    }
  }
};
</script>
