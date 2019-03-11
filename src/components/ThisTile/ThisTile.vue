<template>
  <section :id="id" :class="getClasses">
    <slot></slot>
  </section>
</template>

<script>
import grid from "../../mixins/12-columns";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "ThisTile",
  mixins: [common, grid],
  props: {
    isAncestor: {
      type: [String, Boolean]
    },
    isParent: {
      type: [String, Boolean]
    },
    isChild: {
      type: [String, Boolean]
    },
    isVertical: {
      type: [String, Boolean]
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("tile");
      cssArchitect.addClass(this.getGridModifiers);
      cssArchitect.addClass("is-ancestor", this.getBoolean(this.isAncestor));
      cssArchitect.addClass("is-parent", this.getBoolean(this.isParent));
      cssArchitect.addClass("is-child", this.getBoolean(this.isChild));
      cssArchitect.addClass("is-vertical", this.getBoolean(this.isVertical));

      return cssArchitect.getClasses();
    }
  },
  data() {
    return {};
  }
};
</script>
