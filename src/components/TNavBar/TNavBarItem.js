import helper from "../../mixins/helpers";
import colors from "../../mixins/colors";
import common from "../../mixins/common";
import padding from "../../mixins/padding";

import CssArchitect from "../../utils/css-architect";
import { createElement } from "../../utils/element-architect";

export default {
  name: "t-navbar-item",
  mixins: [common, colors, padding, helper],
  props: {
    view: String,
    dropdown: Boolean,
    hoverable: Boolean,
    active: Boolean,
    mobile: Boolean
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getCss: function() {
      const css = new CssArchitect("navbar__item");
      css.colored({ inverted: this.$parent.hasColorModifier });
      css.addClass("hovered", this.hoverable);
      css.addClass("has-dropdown", this.dropdown);
      css.addClass("is-hoverable", this.hoverable);
      css.addClass("is-active", this.active);
      css.addClass("mobile", this.mobile);
      css.addClass(this.targetClass);
      css.addClass(this.$parent.colorModifier, this.$parent.hasColorModifier);
      this.setupColorModifier(css);
      css.addClass(this.getHelpersModifiers);
      css.addStyles([this.getPaddingStyles]);
      return css;
    }
  },
  render: function(h) {
    let hasView = this.view !== undefined;
    let elementType = hasView ? "router-link" : "a";
    let root = createElement(h, elementType, this.getCss.getClasses());
    root.setId(this.id).setChildren(this.$slots.default);
    root.setStyles(this.getCss.getStyles());
    if (hasView) {
      root.setProps({ to: { name: this.view } });
    }
    return root.create();
  }
};
