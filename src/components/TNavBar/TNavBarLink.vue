<template>
  <router-link v-if="view" :to="{ name: view }" :class="getClasses">
    <slot></slot>
  </router-link>
  <a :id="id" :class="getClasses" v-else>
    <slot></slot>
  </a>
</template>

<script>
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-navbar-link",
  mixins: [common],
  props: {
    view: String
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("navbar-link");
      return cssArchitect.getClasses();
    }
  }
};
</script>
