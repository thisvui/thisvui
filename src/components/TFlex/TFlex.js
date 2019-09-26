import dimension from "../../mixins/dimension";
import flex from "../../mixins/flex";
import alignment from "../../mixins/alignment";
import background from "../../mixins/background";
import overflow from "../../mixins/overflow";

import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-flex",
  mixins: [flex, dimension, alignment, background, overflow],
  data: function() {
    return {
      targetClass: ""
    };
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("t-flex");
      cssArchitect.addClass(this.getFlexModifiers);
      cssArchitect.addClass(this.getDimensionModifiers);
      cssArchitect.addClass(this.getAlignmentModifiers);
      cssArchitect.addClass(this.getBackgroundModifiers);
      cssArchitect.addClass(this.getOverflowModifiers);
      return cssArchitect.getClasses();
    }
  },
  render: function(createElement) {
    return createElement("div", {
      class: this.getClasses,
      style: this.getFlexStyles,
    }, this.$slots.default);
  },
};
