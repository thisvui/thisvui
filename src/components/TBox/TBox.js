import syntax from "../../mixins/syntax";
import common from "../../mixins/common";
import helpers from "../../mixins/helpers";
import elevation from "../../mixins/elevation";
import dimension from "../../mixins/dimension";

import ElementArchitect from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-box",
  mixins: [common, syntax, elevation, dimension, helpers],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("box");
      cssArchitect.addClass(this.getSyntaxModifiers);
      cssArchitect.addClass(this.getElevationModifiers);
      cssArchitect.addClass(this.getDimensionModifiers);
      cssArchitect.addClass(this.getHelpersModifiers);
      return cssArchitect.getClasses();
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getClasses);
    root.setId(this.id).setChildren(this.$slots.default);
    root.setStyles(this.getDimensionStyles);
    return root.create();
  }
};
