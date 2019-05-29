<template>
  <div :class="getClasses" @click="onClick">
    <slot v-if="!alignContentRight" />
    <span v-if="headingText !== undefined" class="is-size-6">{{
      headingText
    }}</span>
    <t-icon
      v-if="icon !== undefined"
      :preserve-defaults="!overrideDefaults"
      :icon="icon"
      :class="getIconClasses"
    >
    </t-icon>
    <slot v-if="alignContentRight" />
  </div>
</template>

<script>
import icons from "../../mixins/icons";
import CssArchitect from "../../utils/css-architect";
import TIcon from "../TIcon/TIcon";
import colors from "../../mixins/colors";

export default {
  name: "t-panel-heading",
  mixins: [icons, colors],
  components: { TIcon },
  props: {
    headingText: {
      type: String
    },
    headingIcon: {
      type: String
    },
    headingIconClass: {
      type: String
    },
    alignContentRight: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    headingIcon: function(newVal, oldVal) {
      // watch it
      this.icon = newVal;
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("panel-heading level");
      this.colorize(cssArchitect, "bg-color", true);
      this.colorize(cssArchitect, "border");
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(
        this.$parent.colorModifier,
        this.$parent.hasColorModifier && !this.hasColorModifier
      );
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the heading icon
     * @returns { A String with the chained css classes }
     */
    getIconClasses: function() {
      const cssArchitect = new CssArchitect("level-right");
      cssArchitect.addClass(
        this.headingIconClass,
        this.headingIconClass !== undefined
      );
      return cssArchitect.getClasses();
    },
    alignContentToTheRight: function() {
      if (typeof this.alignContentRight === "string") {
        const alignContentToTheRight = this.alignContentRight !== "false";
        return alignContentToTheRight;
      }
      return this.alignContentRight;
    }
  },
  data() {
    return {
      icon: this.headingIcon
    };
  },
  methods: {
    onClick() {
      this.$emit(this.$thisvui.events.common.click);
    }
  }
};
</script>
