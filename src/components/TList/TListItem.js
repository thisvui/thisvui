import syntax from "../../mixins/syntax";
import common from "../../mixins/common";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-list-item",
  mixins: [common, syntax],
  props: {
    is20: Boolean,
    is30: Boolean,
    is40: Boolean,
    is50: Boolean,
    is60: Boolean,
    is70: Boolean,
    is80: Boolean,
    is90: Boolean,
    is100: Boolean
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("t-list-item");
      cssArchitect.addClass(this.getSyntaxModifiers);
      cssArchitect.addClass("is-20", this.is20);
      cssArchitect.addClass("is-30", this.is30);
      cssArchitect.addClass("is-40", this.is40);
      cssArchitect.addClass("is-50", this.is50);
      cssArchitect.addClass("is-60", this.is60);
      cssArchitect.addClass("is-70", this.is70);
      cssArchitect.addClass("is-80", this.is80);
      cssArchitect.addClass("is-90", this.is90);
      cssArchitect.addClass("is-100", this.is100);
      return cssArchitect.getClasses();
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getClasses);
    root.setId(this.id).setChildren(this.$slots.default);
    return root.create();
  }
};
