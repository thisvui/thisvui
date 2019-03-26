<template>
  <article :id="id" :class="getClasses">
    <div :class="getHeaderClasses" @click="toggleOpen">
      <this-level>
        <template slot="level-left">
          <span>{{ title }}</span>
        </template>
        <template slot="level-right">
          <a :class="getIconContainerClasses" v-if="getShowIcon">
            <this-icon
              v-if="itemIcon"
              :icon="itemIcon"
              :class="iconClass"
              :icon-lib="iconLib"
              :preserve-defaults="!overrideDefaults"
            ></this-icon>
          </a>
        </template>
      </this-level>
    </div>
    <div :class="getBodyClasses">
      <this-expand>
        <div class="this-accordion-content" v-show="isItemOpen">
          <div class="this-accordion-content-body">
            <slot></slot>
          </div>
        </div>
      </this-expand>
    </div>
  </article>
</template>

<script>
import syntax from "../../mixins/syntax";
import sizes from "../../mixins/sizes";
import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import CssArchitect from "../../utils/css-architect";
import ThisExpand from "../ThisAnimation/ThisExpand";
import ThisLevel from "../ThisLevel/ThisLevel";
import ThisIcon from "../ThisIcon/ThisIcon";

export default {
  name: "ThisAccordionItem",
  components: { ThisIcon, ThisLevel, ThisExpand },
  mixins: [common, syntax, sizes, helper, icons],
  props: {
    title: {
      type: String
    },
    targetClass: {
      type: String
    },
    headerClass: {
      type: String
    },
    bodyClass: {
      type: String
    },
    iconContainerClass: {
      type: String
    },
    iconClass: {
      type: String
    },
    icon: {
      type: String
    },
    collapseIcon: {
      type: String
    },
    isOpen: {
      type: [Boolean, String],
      default: false
    },
    showIcon: {
      type: [String, Boolean]
    }
  },
  computed: {
    /**
     * Determines if icon must be shown. Check both the parent and child props
     * @returns { A boolean value }
     */
    getShowIcon: function() {
      let showIcon = this.showIcon
        ? this.getBoolean(this.showIcon)
        : this.parentProps.showIcon
        ? this.getBoolean(this.parentProps.showIcon)
        : false;
      return showIcon;
    },
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("this-accordion-item");
      let targetClass = this.targetClass
        ? this.targetClass
        : this.parentProps.targetClass
        ? this.parentProps.targetClass
        : undefined;
      cssArchitect.addClass(this.getSyntaxModifiers);
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(targetClass, targetClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the header element
     * @returns { A String with the chained css classes }
     */
    getHeaderClasses: function() {
      const cssArchitect = new CssArchitect("this-accordion-header");
      cssArchitect.addClass(this.headerClass, this.headerClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the body element
     * @returns { A String with the chained css classes }
     */
    getBodyClasses: function() {
      const cssArchitect = new CssArchitect("this-accordion-body");
      cssArchitect.addClass(this.bodyClass, this.bodyClass);
      cssArchitect.addClass("is-closed", !this.isItemOpen);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the icon container element
     * @returns { A String with the chained css classes }
     */
    getIconContainerClasses: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(this.iconContainerClass, this.iconContainerClass);
      return cssArchitect.getClasses();
    },
    /**
     * Returns the icon to be shown. Check both the parent and child props
     */
    getIcon: function() {
      let icon = this.icon
        ? this.icon
        : this.parentProps.icon
        ? this.parentProps.icon
        : false;
      return icon;
    },
    /**
     * Returns the icon to be shown when item is collapsed. Check both the parent and child props
     */
    getCollapsedIcon: function() {
      let icon = this.collapsedIcon
        ? this.collapsedIcon
        : this.parentProps.collapsedIcon
        ? this.parentProps.collapsedIcon
        : false;
      return icon;
    }
  },
  /**
   * Reloads the icon whe the isItemOpen data property changes
   */
  watch: {
    isItemOpen: function(newVal, oldVal) {
      // watch it
      this.loadIcon();
    }
  },
  data() {
    return {
      isItemOpen: this.isOpen,
      parentProps: this.$parent.$props,
      itemIcon: this.icon
    };
  },
  created() {
    this.loadIcon();
  },
  methods: {
    /**
     * Loads the corresponding icon based on child state
     */
    loadIcon() {
      this.itemIcon =
        this.getIcon !== undefined && this.isItemOpen
          ? this.getIcon
          : this.getIcon !== undefined && !this.isItemOpen
          ? this.getCollapsedIcon
          : undefined;
    },
    /**
     * Open or close the accordion item and triggers and event for closing inactive items
     */
    toggleOpen() {
      this.isItemOpen = !this.isItemOpen;
      if (this.isItemOpen) {
        this.$parent.$emit("close-others", this.id);
      }
    }
  }
};
</script>
