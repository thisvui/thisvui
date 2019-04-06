<template>
  <span :class="getClasses">
    <slot></slot>
  </span>
</template>

<script>
import CssArchitect from "../../utils/css-architect";
import syntax from "../../mixins/syntax";
import sizes from "../../mixins/sizes";
import check from "../../mixins/check";

export default {
  name: "t-tag",
  mixins: [syntax, sizes, check],
  props: {
    isRounded: {
      type: [String, Boolean]
    },
    isDelete: {
      type: [String, Boolean]
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("tag");
      cssArchitect.addClass(this.getSyntaxModifiers);
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass("is-rounded", this.getBoolean(this.isRounded));
      cssArchitect.addClass("is-delete", this.getBoolean(this.isDelete));

      return cssArchitect.getClasses();
    }
  }
};
</script>
