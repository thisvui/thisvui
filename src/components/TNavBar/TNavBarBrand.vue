<template>
  <div :id="id" :class="getClasses">
    <slot></slot>
  </div>
</template>

<script>
import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-navbar-brand",
  mixins: [common, helper],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("navbar-brand");
      cssArchitect.addClass(this.getHelpersModifiers);
      return cssArchitect.getClasses();
    }
  }
};
</script>
