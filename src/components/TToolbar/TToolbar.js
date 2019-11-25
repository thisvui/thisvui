import themes from "../../mixins/themes";
import common from "../../mixins/common";
import flex from "../../mixins/flex";
import alignment from "../../mixins/alignment";

import CssArchitect from "../../utils/css-architect";
import { createDiv } from "../../utils/element-architect";

export default {
  name: "t-toolbar",
  mixins: [common, themes, flex, alignment],
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
      this.isFilled(css);
      css.flexible();
      css.addClass(this.getThemeModifiers);
      css.addClass(this.getFlexModifiers);
      css.addClass(this.getAlignmentModifiers);
      css.addClass("flex-direction-column", this.isVertical);
      css.addClass("is-left", !this.isRight && !this.isCentered);
      this.setupThemeModifier(css, true);
      return css.getClasses();
    }
  },
  render: function(h) {
    let root = createDiv(h, this.getClasses);
    root.setId(this.id).setChildren(this.$slots.default);
    return root.create();
  }
};
