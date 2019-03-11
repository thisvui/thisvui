<template>
  <div :class="getClasses" @click="onClick">
    <slot v-if="!alignContentRight" />
    <span v-if="headingText !== undefined" class="is-size-6">{{
      headingText
    }}</span>
    <this-icon v-if="icon !== undefined" :icon="icon" :class="getIconClasses">
    </this-icon>
    <slot v-if="alignContentRight" />
  </div>
</template>

<script>
import CssArchitect from "../../utils/css-architect";
import ThisIcon from "../ThisIcon/ThisIcon";

export default {
  name: "ThisPanelHeading",
  components: { ThisIcon },
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
      this.$emit("click");
    }
  }
};
</script>
