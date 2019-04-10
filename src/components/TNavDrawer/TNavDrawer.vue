<template>
  <t-aside
    :id="id"
    :container-class="getContainerClass"
    :is-open="isOpen"
    :is-absolute="isAbsolute"
    :width="width"
    :z-index="zIndex"
    :animation-duration="animationDuration"
    :animation-fill="animationFill"
    @clickedOutside="handleOutsideClick"
  >
    <div class="menu">
      <template v-for="(menu, index) in model">
        <p
          :key="`ml-${index}`"
          :class="getLabelClass"
          v-if="!getBoolean(hideLabel)"
        >
          {{ menu.name }}
        </p>
        <ul class="menu-list" :key="`tree${index}`">
          <t-tree-nav
            class="item"
            :tag-class="tagClass"
            v-for="(item, index) in menu.children"
            :key="index"
            :model="item"
            :icon-class="getIconClass"
            :link-class="getLinkClass"
            :opened-icon="openedIcon"
            :closed-icon="closedIcon"
            :icon-lib="iconLib"
            :override-defaults="overrideDefaults"
          >
          </t-tree-nav>
        </ul>
      </template>
    </div>
  </t-aside>
</template>

<script>
import helpers from "../../mixins/helpers";
import sizes from "../../mixins/sizes";
import tree from "../../mixins/tree";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import CssArchitect from "../../utils/css-architect";
import TTreeNav from "../TTree/TTreeNav";
import TSlide from "../TAnimation/TSlide";
import colors from "../../mixins/colors";
import slide from "../../mixins/slide";
import TAside from "../TLayout/TAside";

export default {
  name: "t-nav-drawer",
  components: { TAside, TSlide, TTreeNav },
  mixins: [helpers, sizes, tree, common, icons, colors, slide],
  props: {
    model: {
      type: Array,
      required: true
    },
    hideLabel: {
      type: [Boolean, String],
      default: false
    },
    containerClass: {
      type: String
    },
    labelClass: {
      type: String
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the main container
     * @returns { A String with the chained css classes }
     */
    getContainerClass: function() {
      const cssArchitect = new CssArchitect("t-nav-drawer");
      cssArchitect.addClass(
        this.containerClass,
        this.containerClass !== undefined
      );
      cssArchitect.addClass("is-nav-opened", this.isOpen);
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(this.getHelpersModifiers);
      cssArchitect.addClass(this.getColorsModifiers);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for each label element
     * @returns { A String with the chained css classes }
     */
    getLabelClass: function() {
      const cssArchitect = new CssArchitect("menu-label");
      cssArchitect.addClass(this.labelClass, this.labelClass !== undefined);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for each item icon
     * @returns { A String with the chained css classes }
     */
    getIconClass: function() {
      const cssArchitect = new CssArchitect("is-inline-block");
      cssArchitect.addClass(this.iconClass, this.iconClass !== undefined);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for each item link
     * @returns { A String with the chained css classes }
     */
    getLinkClass: function() {
      const cssArchitect = new CssArchitect("is-inline-block");
      cssArchitect.addClass(this.linkClass, this.linkClass !== undefined);
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {
      parentProps: this.$parent.$props
    };
  },
  methods: {
    handleOutsideClick(e) {
      this.$emit("clickedOutside", e);
    }
  }
};
</script>
