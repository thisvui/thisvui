<template>
  <div :id="id" :class="getClasses">
    <slot></slot>
  </div>
</template>

<script>
import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";
import screens from "../../mixins/screens";
import background from "../../mixins/background";

export default {
  name: "t-container",
  mixins: [common, screens, background, helper],
  props: {
    isFluid: {
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
      const cssArchitect = new CssArchitect("container");
      cssArchitect.addClass("is-fluid", this.isFluid);
      cssArchitect.addClass(this.getScreensModifiers);
      cssArchitect.addClass(this.getHelpersModifiers);
      cssArchitect.addClass(this.getBackgroundModifiers);
      return cssArchitect.getClasses();
    }
  }
};
</script>
