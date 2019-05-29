<template>
  <router-link v-if="view" :to="{ name: view }" :class="getClasses">
    <slot></slot>
  </router-link>
  <a :id="id" :class="getClasses" v-else>
    <slot></slot>
  </a>
</template>

<script>
import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-navbar-item",
  mixins: [common, helper],
  props: {
    view: String,
    hasDropdown: Boolean,
    isHoverable: Boolean,
    isActive: Boolean
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("navbar-item");
      cssArchitect.addClass(this.getHelpersModifiers);
      cssArchitect.addClass("has-dropdown", this.hasDropdown);
      cssArchitect.addClass("is-hoverable", this.isHoverable);
      cssArchitect.addClass("is-active", this.isActive);
      return cssArchitect.getClasses();
    }
  }
};
</script>
