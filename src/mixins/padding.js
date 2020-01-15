import CssArchitect from "../utils/css-architect";

export default {
  props: {
    padding: {
      type: Number
    },
    paddingTop: {
      type: Number
    },
    paddingRight: {
      type: Number
    },
    paddingBottom: {
      type: Number
    },
    paddingLeft: {
      type: Number
    },
    paddingUnit: {
      type: String,
      default: "px"
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css styles based on mixin props
     * @returns { A String with the chained css styles }
     */
    getPaddingStyles() {
      const css = new CssArchitect();
      css.addStyle("padding", css.addUnit(this.padding, this.paddingUnit), this.padding !== undefined);
      css.addStyle("padding-top", css.addUnit(this.paddingTop, this.paddingUnit), this.paddingTop !== undefined);
      css.addStyle("padding-right", css.addUnit(this.paddingRight, this.paddingUnit), this.paddingRight !== undefined);
      css.addStyle("padding-bottom", css.addUnit(this.paddingBottom, this.paddingUnit), this.paddingBottom !== undefined);
      css.addStyle("padding-left", css.addUnit(this.paddingLeft, this.paddingUnit), this.paddingLeft !== undefined);
      return css.getStyles();
    },
  }
};
