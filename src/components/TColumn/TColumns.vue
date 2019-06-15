<template>
  <div :id="id" :class="getClasses">
    <slot></slot>
  </div>
</template>

<script>
import CssArchitect from "../../utils/css-architect";
import common from "../../mixins/common";
import devices from "../../mixins/devices";
import background from "../../mixins/background";

export default {
  name: "t-columns",
  mixins: [common, devices, background],
  props: {
    isGapless: {
      type: Boolean
    },
    isMultiline: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("columns");
      cssArchitect.addClass("is-gapless", this.isGapless);
      cssArchitect.addClass("is-multiline", this.isMultiline);
      cssArchitect.addClass(this.getDevicesModifiers);
      cssArchitect.addClass(this.getBackgroundModifiers);
      return cssArchitect.getClasses();
    }
  }
};
</script>
