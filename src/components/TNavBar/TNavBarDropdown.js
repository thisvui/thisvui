import helper from "../../mixins/helpers";
import common from "../../mixins/common";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-navbar-dropdown",
  mixins: [common, helper],
  props: {
    isBoxed: Boolean
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("navbar__dropdown");
      cssArchitect.addClass("is-boxed", this.isBoxed);
      return cssArchitect.getClasses();
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "a", this.getClasses);
    root.setId(this.id).setChildren(this.$slots.default);
    return root.create();
  }
};
