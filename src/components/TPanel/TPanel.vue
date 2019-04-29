<template>
  <nav :id="id" :class="getClasses">
    <t-panel-heading
      v-if="title !== undefined"
      :icon-lib="iconLib"
      :override-defaults="overrideDefaults"
      :class="headingClass"
      :heading-text="title"
      :heading-icon="icon"
      :heading-icon-class="headingIconClass"
      @click="toggleOpen"
    />
    <t-expand>
      <div :class="getBodyClasses" v-if="isOpen">
        <div class="panel-content">
          <slot />
        </div>
      </div>
    </t-expand>
  </nav>
</template>

<script>
import helpers from "../../mixins/helpers";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import TPanelHeading from "./TPanelHeading";
import CssArchitect from "../../utils/css-architect";
import TExpand from "../TAnimation/TExpand";
import colors from "../../mixins/colors";

export default {
  name: "t-panel",
  mixins: [common, colors, icons, helpers],
  components: { TExpand, TPanelHeading },
  props: {
    title: {
      type: String
    },
    isCollapsible: {
      type: Boolean,
      default: false
    },
    headingClass: {
      type: String
    },
    headingIcon: {
      type: String
    },
    headingIconClass: {
      type: String
    },
    collapsedHeadingIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.collapse;
      }
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("panel");
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(this.getHelpersModifiers);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the panel body
     * @returns { A String with the chained css classes }
     */
    getBodyClasses: function() {
      const cssArchitect = new CssArchitect("panel-body");
      cssArchitect.addClass("is-closed is-shadowless", !this.isOpen);
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {
      isOpen: true,
      icon: this.headingIcon
    };
  },
  methods: {
    /**
     * Open or close the panel dynamically
     */
    toggleOpen() {
      if (this.isCollapsible) {
        this.isOpen = !this.isOpen;
        this.icon =
          this.headingIcon !== undefined && this.isOpen
            ? this.headingIcon
            : this.headingIcon !== undefined && !this.isOpen
            ? this.collapsedHeadingIcon
            : undefined;
      }
    }
  }
};
</script>
