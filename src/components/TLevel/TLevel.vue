<template>
  <div :id="id" :class="getClasses">
    <slot></slot>
    <!-- Left side -->
    <div v-if="!suppressLr" :class="getLeftClasses">
      <slot name="level-left"></slot>
    </div>
    <!-- Right side -->
    <div v-if="!suppressLr" :class="getRightClasses">
      <slot name="level-right"></slot>
    </div>
  </div>
</template>

<script>
import responsive from "../../mixins/responsive";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";
import background from "../../mixins/background";

export default {
  name: "t-level",
  mixins: [common, responsive, background],
  props: {
    suppressLr: {
      type: Boolean
    },
    leftClass: String,
    rightClass: String
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("level");
      cssArchitect.addClass(this.getResponsiveModifiers);
      cssArchitect.addClass(this.getBackgroundModifiers);
      return cssArchitect.getClasses();
    },
    getLeftClasses: function() {
      const cssArchitect = new CssArchitect("level-left");
      cssArchitect.addClass(this.leftClass, this.leftClass !== undefined);
      return cssArchitect.getClasses();
    },
    getRightClasses: function() {
      const cssArchitect = new CssArchitect("level-right");
      cssArchitect.addClass(this.rightClass, this.rightClass !== undefined);
      return cssArchitect.getClasses();
    }
  }
};
</script>
