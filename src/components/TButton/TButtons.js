import helpers from "../../mixins/helpers";
import alignment from "../../mixins/alignment";
import flex from "../../mixins/flex";
import common from "../../mixins/common";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-buttons",
  mixins: [common, flex, alignment, helpers],
  props: {
    targetClass: {
      type: String
    },
    attached: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("buttons");
      cssArchitect.flexible({
        flexWrap: true,
        alignItems: "center",
        justifyContent: "flex-start"
      });
      cssArchitect.addClass(this.getFlexModifiers);
      cssArchitect.addClass(this.getAlignmentModifiers);
      cssArchitect.addClass(this.getHelpersModifiers);
      cssArchitect.addClass(this.targetClass);
      cssArchitect.addClass("attached", this.attached);
      return cssArchitect.getClasses();
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getClasses);
    root.setId(this.id).setChildren(this.$slots.default);
    root.setStyles(this.getFlexStyles);
    return root.create();
  }
};
