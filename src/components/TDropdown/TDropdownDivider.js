import themes from "../../mixins/themes";
import {ComponentNames} from "../../utils/constants";

import { createDiv } from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";

export default {
  name: ComponentNames.TDropdownDivider,
  mixins: [themes],
  props: {
    targetClass: {
      type: String
    }
  },
  computed: {
    getClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TDropdown}__divider`);
      this.isFilled(css, { tint: 50 });
      css.addClass(this.getThemeModifiers);
      css.addClass(this.targetClass);
      this.setupThemeModifier(css);
      css.addClass(
        this.$parent.themeModifier,
        this.$parent.hasThemeModifier && !this.hasThemeModifier
      );
      return css.getClasses();
    },
  },
  render: function(h) {
    let root = createDiv(h, this.getClasses);
    root.setChildren(this.$slots.default);
    return root.create();
  }
};
