<template>
  <nav :id="id" :class="getClasses" role="navigation">
    <slot></slot>
  </nav>
</template>

<script>
import colors from "../../mixins/colors";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";
import TNavBarItem from "./TNavBarItem";

export default {
  name: "t-navbar",
  components: { TNavBarItem },
  mixins: [common, colors],
  props: {
    isTransparent: {
      type: Boolean,
      default: false
    },
    isFixedTop: {
      type: Boolean,
      default: false
    },
    isFixedBottom: {
      type: Boolean,
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
      cssArchitect.addClass("is-transparent", this.isTransparent);
      cssArchitect.addClass("is-fixed-top", this.isFixedTop);
      cssArchitect.addClass("is-fixed-bottom", this.isFixedBottom);
      return cssArchitect.getClasses();
    }
  }
};
</script>
