import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import screens from "../../mixins/screens";
import background from "../../mixins/background";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";
import dimension from "../../mixins/dimension";

export default {
  name: "t-container",
  mixins: [common, screens, background, dimension, helper],
  props: {
    fluid: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("container");
      cssArchitect.addClass("fluid", this.fluid);
      cssArchitect.addClass(this.getScreensModifiers);
      cssArchitect.addClass(this.getHelpersModifiers);
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
