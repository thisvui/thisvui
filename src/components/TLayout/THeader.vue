<template>
  <header :id="id" :class="getClasses" :style="getStyle()">
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
    },
    zIndex: {
      type: [String, Number]
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
      cssArchitect.addClass("has-shadow-1");
      return cssArchitect.getClasses();
    },
    getHeight: function() {
      let height = `${this.height}${this.unity}`;
      return height;
    }
  },
  methods: {
    getStyle() {
      let styleObject = {
        height: this.getHeight
      };
      if (this.zIndex) {
        styleObject.zIndex = parseInt(this.zIndex);
      }
      return styleObject;
    }
  }
};
</script>
