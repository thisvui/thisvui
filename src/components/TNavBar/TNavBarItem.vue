<template>
  <div :id="id" :class="getClasses">
    <router-link v-if="view" :to="{ name: view }">
      <slot></slot>
    </router-link>
    <slot v-if="!view"></slot>
  </div>
</template>

<script>
import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-navbar-item",
  mixins: [common, helper],
  props: {
    view: {
      type: String
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("navbar-item");
      cssArchitect.addClass(this.getHelpersModifiers);
      return cssArchitect.getClasses();
    }
  }
};
</script>
