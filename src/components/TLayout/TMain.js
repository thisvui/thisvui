import colors from "../../mixins/colors";
import common from "../../mixins/common";
import flex from "../../mixins/flex";
import overflow from "../../mixins/overflow";

import ElementArchitect from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-main",
  mixins: [common, colors, flex, overflow],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("t-main");
      cssArchitect.isFlexible("column", "stretch");
      this.colorize(cssArchitect, "bg", true);
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(this.getFlexModifiers);
      return cssArchitect.getClasses();
    },
    getStyles: function() {
      return this.getOverflowModifiers;
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getClasses);
    root.setId(this.id);
    root.setChildren(this.$slots.default);
    root.setStyles(this.getStyles);
    return root.create();
  }
};
