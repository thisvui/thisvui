<template>
  <div :id="id" :class="getClasses">
    <div class="navbar-start">
      <slot name="navbar-start"></slot>
    </div>
    <div class="navbar-end">
      <slot name="navbar-end"></slot>
    </div>
  </div>
</template>

<script>
import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-navbar-menu",
  mixins: [common, helper],
  props: {
    isActive: {
      type: [String, Boolean]
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("navbar-menu");
      cssArchitect.addClass("is-active", this.getBoolean(this.isActive));
      return cssArchitect.getClasses();
    }
  }
};
</script>
