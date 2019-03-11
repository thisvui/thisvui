<template>
  <div :id="id" :class="getClasses">
    <slot></slot>
  </div>
</template>

<script>
import colors from "../../mixins/colors";
import common from "../../mixins/common";
import flex from "../../mixins/flex-direction";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "ThisContent",
  mixins: [common, colors, flex],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("this-content is-flex");
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(this.getFlexModifiers);
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {};
  }
};
</script>
