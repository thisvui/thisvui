<template>
  <span :class="getContainerClass" :key="`${id}-${icon}`">
    <span :class="getLayerClass" :data-tooltip="dataTooltip">
      <i :class="icon" />
    </span>
  </span>
</template>

<script>
import syntax from "../../mixins/syntax";
import sizes from "../../mixins/sizes";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "ThisIcon",
  mixins: [common, syntax, sizes],
  props: {
    icon: {
      type: String,
      required: true
    },
    dataTooltip: {
      type: String
    },
    tooltipClass: {
      type: String
    },
    layerClass: {
      type: String
    }
  },
  data() {
    return {
      containerClass: "icon ",
      tooltipContainerClass: "tooltip ",
      layerContainerClass: "fa-layers fa-fw "
    };
  },
  computed: {
    /**
     * Dynamically build the css classes for the icon container element
     * @returns { A String with the chained css classes }
     */
    getContainerClass: function() {
      const cssArchitect = new CssArchitect("icon");
      cssArchitect.addClass(this.getSyntaxModifiers);
      cssArchitect.addClass(this.getSizesModifiers);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the tooltip element
     * @returns { A String with the chained css classes }
     */
    getTooltipClass: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("tooltip", this.dataTooltip !== undefined);
      cssArchitect.addClass(this.tooltipClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the layer element
     * @returns { A String with the chained css classes }
     */
    getLayerClass: function() {
      const cssArchitect = new CssArchitect("fa-layers fa-fw");
      cssArchitect.addClass(this.layerClass);
      cssArchitect.addClass(this.getTooltipClass);
      return cssArchitect.getClasses();
    }
  }
};
</script>
