<template>
  <span :class="getContainerClass" :key="`${id}-${icon}`">
    <span :class="getFa5LayerClass" :data-tooltip="dataTooltip" v-if="isFa5">
      <i :class="icon" />
    </span>
    <i :class="getMaterialIconsClass" :data-tooltip="dataTooltip" v-if="isMd">
      {{ icon }}
    </i>
    <i :class="icon" :data-tooltip="dataTooltip" v-if="isFa4" />
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
    iconLib: {
      type: String
    },
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
      layerContainerClass: "fa-layers fa-fw ",
      iconLibrary: ""
    };
  },
  computed: {
    isFa5() {
      return "fa5" === this.iconLibrary;
    },
    isFa4() {
      return "fa4" === this.iconLibrary;
    },
    isMd() {
      return "md" === this.iconLibrary;
    },
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
    getFa5LayerClass: function() {
      const cssArchitect = new CssArchitect("fa-layers fa-fw");
      cssArchitect.addClass(this.layerClass);
      cssArchitect.addClass(this.getTooltipClass);
      return cssArchitect.getClasses();
    },
    getMaterialIconsClass: function() {
      const cssArchitect = new CssArchitect("material-icons");
      cssArchitect.addClass(this.getTooltipClass);
      return cssArchitect.getClasses();
    }
  },
  methods: {
    configureIconLib() {
      let parent = this.$parent;
      let iconLib = parent && parent.$props ? parent.$props.iconLib : null;
      this.iconLibrary =
        parent && iconLib
          ? iconLib
          : this.iconLib
          ? this.iconLib
          : this.$thisvui.iconLib;
    }
  },
  mounted() {
    this.configureIconLib();
  }
};
</script>
