import colors from "../../mixins/colors";
import common from "../../mixins/common";
import flex from "../../mixins/flex";
import alignment from "../../mixins/alignment";

import CssArchitect from "../../utils/css-architect";
import { createDiv } from "../../utils/element-architect";

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
      const css = new CssArchitect("t-toolbar");
      this.filled(css);
      css.flexible();
      css.addClass(this.getColorsModifiers);
      css.addClass(this.getFlexModifiers);
      css.addClass(this.getAlignmentModifiers);
      css.addClass("flex-direction-column", this.isVertical);
      css.addClass("is-left", !this.isRight && !this.isCentered);
      this.setupColorModifier(css, true);
      return css.getClasses();
    }
  },
  render: function(h) {
    let root = createDiv(h, this.getClasses);
    root.setId(this.id).setChildren(this.$slots.default);
    return root.create();
  }
};
