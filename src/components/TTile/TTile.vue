<template>
  <section :id="id" :class="getClasses">
    <slot></slot>
  </section>
</template>

<script>
import twelveColumns from "../../mixins/12-columns";
import common from "../../mixins/common";
import CssArchitect from "../../utils/css-architect";
import background from "../../mixins/background";

export default {
  name: "t-tile",
  mixins: [common, twelveColumns, background],
  props: {
    isAncestor: {
      type: Boolean
    },
    isParent: {
      type: Boolean
    },
    isChild: {
      type: Boolean
    },
    isVertical: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("tile");
      cssArchitect.addClass("is-ancestor", this.isAncestor);
      cssArchitect.addClass("is-parent", this.isParent);
      cssArchitect.addClass("is-child", this.isChild);
      cssArchitect.addClass("is-vertical", this.isVertical);
      cssArchitect.addClass(this.get12ColumnsModifiers);
      cssArchitect.addClass(this.getBackgroundModifiers);
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {};
  }
};
</script>
