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

export default {
  name: "ThisNavbarBurger",
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
      const cssArchitect = new CssArchitect("navbar-burger");
      cssArchitect.addClass("is-active", this.getBoolean(this.isActive));
      return cssArchitect.getClasses();
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
</script>
