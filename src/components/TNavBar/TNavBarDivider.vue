<template>
  <hr :class="getClasses" />
</template>

<script>
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-navbar-divider",
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("navbar-divider");
      return cssArchitect.getClasses();
    }
  }
};
</script>
