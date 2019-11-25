import themes from "../../mixins/themes";

import { createDiv } from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-dropdown-divider",
  mixins: [themes],
  props: {
    targetClass: {
      type: String
    }
  },
  computed: {
    getClasses: function() {
      const css = new CssArchitect("dropdown__divider");
      this.isFilled(css);
      css.addClass(this.getThemeModifiers);
      css.addClass(this.targetClass);
      this.setupThemeModifier(css);
      css.addClass(
        this.$parent.themeModifier,
        this.$parent.hasThemeModifier && !this.hasThemeModifier
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
