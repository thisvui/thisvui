import helper from "../../mixins/helpers";
import themes from "../../mixins/themes";
import common from "../../mixins/common";
import padding from "../../mixins/padding";
import justify from "../../mixins/justify";
import { ComponentNames } from "../../utils/constants";

import CssArchitect from "../../utils/css-architect";
import { createDiv } from "../../utils/element-architect";

export default {
  name: ComponentNames.TNavBarItems,
  mixins: [common, themes, padding, justify, helper],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getCss: function() {
      const css = new CssArchitect(`${ComponentNames.TNavBar}__items`);
      css.addClass(this.$parent.themeModifier, this.$parent.hasThemeModifier);
      this.setupThemeModifier(css);
      css.addClass(this.getJustifyModifiers);
      css.addClass(this.getHelpersModifiers);
      css.addStyles([this.getPaddingStyles]);
      return css;
    }
  },
  render: function(h) {
    let root = createDiv(h, this.getCss.getClasses());
    root.setId(this.id).setChildren(this.$slots.default);
    root.setStyles(this.getCss.getStyles());
    return root.create();
  }
};
