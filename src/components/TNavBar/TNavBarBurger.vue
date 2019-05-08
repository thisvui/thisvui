<template>
  <a
    :id="id"
    role="button"
    :class="getClasses"
    aria-label="menu"
    aria-expanded="false"
    @click="onClick"
  >
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
  </a>
</template>

<script>
import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";
import colors from "../../mixins/colors";

export default {
  name: "t-navbar-burger",
  mixins: [common, helper, colors],
  props: {
    isActive: {
      type: Boolean
    },
    isMobileOnly: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("navbar-burger");
      cssArchitect.addClass("is-active", this.isActive);
      cssArchitect.addClass("is-mobile-only", this.isMobileOnly);
      cssArchitect.addClass(this.getColorsModifiers);
      return cssArchitect.getClasses();
    }
  },
  methods: {
    onClick() {
      this.$emit(this.$thisvui.events.common.click);
    }
  }
};
</script>
