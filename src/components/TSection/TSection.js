import common from "../../mixins/common";
import sizes from "../../mixins/sizes";
import background from "../../mixins/background";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-section",
  mixins: [common, sizes, background],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("section");
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(this.getBackgroundModifiers);
      return cssArchitect.getClasses();
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getClasses);
    root.setId(this.id);
    root.setChildren(this.$slots.default);
    return root.create();
  }
};
