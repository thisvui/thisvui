<template>
  <footer :id="id" :class="getClasses" :style="{ height: getHeight }">
    <slot></slot>
  </footer>
</template>

<script>
import colors from "../../mixins/colors";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-footer",
  mixins: [common, colors],
  props: {
    isFixed: {
      type: Boolean,
      default: false
    },
    height: {
      type: [String, Number],
      default: 52
    },
    unity: {
      type: String,
      default: "px"
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("t-footer");
      cssArchitect.isFullwidth();
      this.colorize(cssArchitect, "bg", true);
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass("is-fixed", this.isFixed);
      return cssArchitect.getClasses();
    },
    getHeight: function() {
      let height = `${this.height}${this.unity}`;
      return height;
    }
  }
};
</script>
