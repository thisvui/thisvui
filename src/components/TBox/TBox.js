import common from "../../mixins/common";
import helpers from "../../mixins/helpers";
import elevation from "../../mixins/elevation";
import dimension from "../../mixins/dimension";
import display from "../../mixins/display";
import themes from "../../mixins/themes";

import ElementArchitect from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-box",
  mixins: [common, display, themes, elevation, dimension, helpers],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect("box");
      this.isFilled(css);
      css.addClass(this.getThemeModifiers);
      css.addClass(this.getSyntaxModifiers);
      css.addClass(this.getElevationModifiers);
      css.addClass(this.getDimensionModifiers);
      css.addClass(this.getDisplayModifiers);
      css.addClass(this.getHelpersModifiers);
      return css.getClasses();
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getClasses);
    root.setId(this.id).setChildren(this.$slots.default);
    root.setStyles(this.getDimensionStyles);
    return root.create();
  }
};
