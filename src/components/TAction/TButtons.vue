<template>
  <div :id="id" :class="getClasses">
    <slot></slot>
  </div>
</template>

<script>
import CssArchitect from "../../utils/css-architect";
import helpers from "../../mixins/helpers";
import alignment from "../../mixins/alignment";
import common from "../../mixins/common";

export default {
  name: "t-buttons",
  mixins: [common, alignment, helpers],
  props: {
    targetClass: {
      type: String
    },
    hasAddons: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("buttons");
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(this.getAlignmentModifiers);
      cssArchitect.addClass(this.targetClass);
      cssArchitect.addClass("has-addons", this.hasAddons);
      return cssArchitect.getClasses();
    }
  }
};
</script>
