<template>
  <a :id="id" :class="getClasses">
    <slot></slot>
  </a>
</template>

<script>
import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-navbar-dropdown",
  mixins: [common, helper],
  props: {
    isBoxed: Boolean
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("navbar-dropdown");
      cssArchitect.addClass("is-boxed", this.isBoxed);
      return cssArchitect.getClasses();
    }
  }
};
</script>
