<template>
  <span :class="getClasses">
    <slot></slot>
  </span>
</template>

<script>
import CssArchitect from "../../utils/css-architect";
import sizes from "../../mixins/sizes";
import colors from "../../mixins/colors";

export default {
  name: "t-tag",
  mixins: [colors, sizes],
  props: {
    targetClass: {
      type: String
    },
    isRounded: {
      type: Boolean
    },
    isDelete: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("tag");
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(this.targetClass);
      cssArchitect.addClass("is-rounded", this.isRounded);
      cssArchitect.addClass("is-delete", this.isDelete);
      return cssArchitect.getClasses();
    }
  }
};
</script>
