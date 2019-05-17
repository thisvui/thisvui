<template>
  <span :class="getContainerClass">
    <t-button is-text :disabled="disabled" :class="btnClass" @click="onClick">
      <t-icon
        v-if="icon"
        :preserve-defaults="!overrideDefaults"
        :icon="icon"
        :class="getIconClass"
        :data-tooltip="iconTooltip"
        :tooltip-class="iconTooltipClass"
      />
      <span v-if="showText">{{ text }}</span>
    </t-button>
  </span>
</template>
<script>
import TButton from "../TButton/TButton";
import TIcon from "../TIcon/TIcon";
import CssArchitect from "../../utils/css-architect";
import helpers from "../../mixins/helpers";
import icons from "../../mixins/icons";

export default {
  name: "t-paginator-control",
  components: { TIcon, TButton },
  mixins: [helpers, icons],
  props: {
    showText: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    containerClass: {
      type: String
    },
    btnClass: {
      type: String
    },
    text: {
      type: String,
      default: "Previous"
    },
    icon: {
      type: String
    },
    iconClass: {
      type: String,
      default: "is-size-5"
    },
    iconTooltip: {
      type: String
    },
    iconTooltipClass: {
      type: String
    }
  },
  data() {
    return {
      currentPageNumber: 0 // default to page 0
    };
  },
  computed: {
    /**
     * Dynamically build the css classes for the container element
     * @returns { A String with the chained css classes }
     */
    getContainerClass() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(
        this.containerClass,
        this.containerClass !== undefined
      );
      cssArchitect.addClass(this.getHelpersModifiers);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the icon element
     * @returns { A String with the chained css classes }
     */
    getIconClass() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(this.iconClass, this.iconClass !== undefined);
      return cssArchitect.getClasses();
    }
  },
  methods: {
    onClick() {
      this.$emit(this.$thisvui.events.common.click);
    }
  }
};
</script>
