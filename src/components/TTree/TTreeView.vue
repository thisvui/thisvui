<template>
  <div
    :id="id"
    :class="getContainerClass"
    key="tree-view-container"
    ref="navdrawercontainer"
  >
    <div class="tree-view">
      <ul class="tree-view-list">
        <t-tree-nav
          class="item"
          :tag-class="tagClass"
          v-for="(item, index) in model"
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
    </div>
  </div>
</template>

<script>
import helpers from "../../mixins/helpers";
import sizes from "../../mixins/sizes";
import tree from "../../mixins/tree";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import CssArchitect from "../../utils/css-architect";
import TTreeNav from "./TTreeNav";

export default {
  name: "t-tree-view",
  components: { TTreeNav },
  mixins: [helpers, sizes, tree, common, icons],
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
      const cssArchitect = new CssArchitect("t-tree-view");
      cssArchitect.addClass(
        this.containerClass,
        this.containerClass !== undefined
      );
      cssArchitect.addClass("is-nav-opened", this.isOpen);
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(this.getHelpersModifiers);
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
  }
};
</script>

<style scoped>
.content ul {
  margin-top: 0;
}
.content ul ul {
  margin-top: 0;
}
</style>
