<template>
  <nav :id="id" :class="getClasses">
    <this-panel-heading
      v-if="title !== undefined"
      :class="headingClass"
      :heading-text="title"
      :heading-icon="icon"
      :heading-icon-class="headingIconClass"
      @click="toggleOpen"
    />
    <this-expand>
      <div :class="getBodyClasses" v-if="isOpen">
        <div class="panel-content">
          <slot />
        </div>
      </div>
    </this-expand>
  </nav>
</template>

<script>
import syntax from "../../mixins/syntax";
import helpers from "../../mixins/helpers";
import common from "../../mixins/common";
import ThisPanelHeading from "./ThisPanelHeading";
import CssArchitect from "../../utils/css-architect";
import ThisExpand from "../ThisAnimation/ThisExpand";

export default {
  name: "ThisPanel",
  mixins: [common, helpers, syntax],
  components: { ThisExpand, ThisPanelHeading },
  props: {
    title: {
      type: String
    },
    isCollapsible: {
      type: [Boolean, String],
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
      cssArchitect.addClass(this.getSyntaxModifiers);
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
      if (this.getBoolean(this.isCollapsible)) {
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
