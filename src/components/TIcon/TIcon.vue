<template>
  <span :class="getContainerClass" :key="`${id}-${icon}`">
    <i :class="getMaterialIconsClass" :data-tooltip="dataTooltip" v-if="isMd">
      {{ icon }}
    </i>
    <i :class="getClasses" :data-tooltip="dataTooltip" v-if="!isMd" />
  </span>
</template>

<script>
import syntax from "../../mixins/syntax";
import sizes from "../../mixins/sizes";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-icon",
  mixins: [common, syntax, sizes],
  props: {
    icon: {
      type: String,
      required: true
    },
    iconLib: {
      type: String
    },
    preserveDefaults: {
      type: Boolean,
      default: false
    },
    dataTooltip: {
      type: String
    },
    targetClass: {
      type: String
    },
    containerClass: {
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
      iconLibrary: ""
    };
  },
  computed: {
    isMd() {
      return "md" === this.iconLibrary;
    },
    /**
     * Dynamically build the css classes for the icon container element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect(this.icon);
      cssArchitect.addClass(this.targetClass, this.targetClass !== undefined);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the icon container element
     * @returns { A String with the chained css classes }
     */
    getContainerClass: function() {
      const cssArchitect = new CssArchitect("t-icon icon");
      cssArchitect.addClass(this.getSyntaxModifiers);
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(
        this.containerClass,
        this.containerClass !== undefined
      );
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
    getMaterialIconsClass: function() {
      const cssArchitect = new CssArchitect("material-icons");
      cssArchitect.addClass(this.targetClass, this.targetClass !== undefined);
      cssArchitect.addClass(this.getTooltipClass);
      return cssArchitect.getClasses();
    }
  },
  methods: {
    configureIconLib() {
      if (this.preserveDefaults) {
        this.iconLibrary = this.$thisvui.iconLib;
      } else {
        let parent = this.$parent;
        let pIconLib = parent && parent.$props ? parent.$props.iconLib : null;
        this.iconLibrary = this.iconLib
          ? this.iconLib
          : parent && pIconLib
          ? pIconLib
          : this.$thisvui.iconLib;
      }
    }
  },
  mounted() {
    this.configureIconLib();
  }
};
</script>
