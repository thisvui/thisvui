import CssArchitect from "../utils/css-architect";

export default {
  props: {
    margin: {
      type: Number
    },
    marginTop: {
      type: Number
    },
    marginRight: {
      type: Number
    },
    marginBottom: {
      type: Number
    },
    marginLeft: {
      type: Number
    },
    marginUnit: {
      type: String,
      default: "px"
    },
  },
  computed: {
    /**
     * Dynamically adds the modifiers css styles based on mixin props
     * @returns { A String with the chained css styles }
     */
    getMarginStyles() {
      const css = new CssArchitect();
      css.addStyle("margin", css.addUnit(this.margin, this.marginUnit), this.margin !== undefined);
      css.addStyle("margin-top", css.addUnit(this.marginTop, this.marginUnit), this.marginTop !== undefined);
      css.addStyle("margin-right", css.addUnit(this.marginRight, this.marginUnit), this.marginRight !== undefined);
      css.addStyle("margin-bottom", css.addUnit(this.marginBottom, this.marginUnit), this.marginBottom !== undefined);
      css.addStyle("margin-left", css.addUnit(this.marginLeft, this.marginUnit), this.marginLeft !== undefined);
      return css.getStyles();
    },
  }
};
