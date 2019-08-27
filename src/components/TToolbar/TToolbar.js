import colors from "../../mixins/colors";
import common from "../../mixins/common";
import flex from "../../mixins/flex";
import alignment from "../../mixins/alignment";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-toolbar",
  mixins: [common, colors, flex, alignment],
  props: {
    isVertical: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {};
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("t-toolbar");
      cssArchitect.addClass("t-flex");
      this.colorize(cssArchitect, "bg", true);
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(this.getFlexModifiers);
      cssArchitect.addClass(this.getAlignmentModifiers);
      cssArchitect.addClass("flex-direction-column", this.isVertical);
      cssArchitect.addClass("is-left", !this.isRight && !this.isCentered);
      return cssArchitect.getClasses();
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getClasses);
    root.setId(this.id).setChildren(this.$slots.default);
    return root.create();
  }
};
