<template>
  <div :id="id" :class="getClasses">
    <slot></slot>
    <!-- Left side -->
    <div v-if="!suppressLr" class="level-left">
      <slot name="level-left"></slot>
    </div>
    <!-- Right side -->
    <div v-if="!suppressLr" class="level-right">
      <slot name="level-right"></slot>
    </div>
  </div>
</template>

<script>
import responsive from "../../mixins/responsive";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "ThisLevel",
  mixins: [common, responsive],
  props: {
    suppressLr: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("level");
      cssArchitect.addClass(this.getResponsiveModifiers);
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {};
  }
};
</script>
