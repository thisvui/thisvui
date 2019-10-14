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
    unit: {
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
      css.addStyle("padding", css.addUnit(this.padding, this.unit), this.padding !== undefined);
      css.addStyle("padding-top", css.addUnit(this.paddingTop, this.unit), this.paddingTop !== undefined);
      css.addStyle("padding-right", css.addUnit(this.paddingRight, this.unit), this.paddingRight !== undefined);
      css.addStyle("padding-bottom", css.addUnit(this.paddingBottom, this.unit), this.paddingBottom !== undefined);
      css.addStyle("padding-left", css.addUnit(this.paddingLeft, this.unit), this.paddingLeft !== undefined);
      return css.getStyles();
    },
  }
};
