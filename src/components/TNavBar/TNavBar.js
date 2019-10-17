import colors from "../../mixins/colors";
import common from "../../mixins/common";
import dimension from "../../mixins/dimension";
import padding from "../../mixins/padding";
import margin from "../../mixins/margin";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-navbar",
  mixins: [common, dimension, padding, margin, colors],
  props: {
    targetClass: {
      type: String
    },
    transparent: {
      type: Boolean,
      default: false
    },
    fixedTop: {
      type: Boolean,
      default: false
    },
    fixedBottom: {
      type: Boolean,
      default: false
    },
    mobile: Boolean
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getCss: function() {
      const css = new CssArchitect("t-navbar navbar");
      this.filled(css);
      css.addClass(this.getColorsModifiers);
      css.addClass("transparent", this.transparent);
      css.addClass("fixed-top", this.fixedTop);
      css.addClass("fixed-bottom", this.fixedBottom);
      css.addClass("mobile", this.mobile);
      css.addClass(this.targetClass);
      css.addStyles([
        this.getDimensionStyles,
        this.getPaddingStyles,
        this.getMarginStyles
      ]);
      css.addStyles([this.getAlphaModifiers]);
      this.setupColorModifier(css);
      return css;
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "nav", this.getCss.getClasses());
    root.setId(this.id).setChildren(this.$slots.default);
    root.setStyles(this.getCss.getStyles());
    return root.create();
  }
};
