import colors from "../../mixins/colors";

import { createDiv } from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-dropdown-divider",
  mixins: [colors],
  props: {
    targetClass: {
      type: String
    }
  },
  computed: {
    getClasses: function() {
      const css = new CssArchitect("dropdown__divider");
      this.filled(css);
      css.addClass(this.getColorsModifiers);
      css.addClass(this.targetClass);
      this.setupColorModifier(css);
      css.addClass(
        this.$parent.colorModifier,
        this.$parent.hasColorModifier && !this.hasColorModifier
      );
      css.addClass("halftone");
      return css.getClasses();
    },
  },
  render: function(h) {
    let root = createDiv(h, this.getClasses);
    root.setChildren(this.$slots.default);
    return root.create();
  }
};
