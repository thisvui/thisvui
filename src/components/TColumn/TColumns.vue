<template>
  <div :id="id" :class="getClasses">
    <slot></slot>
  </div>
</template>

<script>
import CssArchitect from "../../utils/css-architect";
import common from "../../mixins/common";
import devices from "../../mixins/devices";

export default {
  name: "t-columns",
  mixins: [common, devices],
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
      cssArchitect.addClass(this.getDevicesModifiers);
      cssArchitect.addClass("is-gapless", this.isGapless);
      cssArchitect.addClass("is-multiline", this.isMultiline);

      return cssArchitect.getClasses();
    }
  },
  data() {
    return {};
  }
};
</script>
