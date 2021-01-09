import CssArchitect from "../utils/css-architect";

export default {
  props: {
    margin: {
      type: [String, Number]
    },
    marginTop: {
      type: [String, Number]
    },
    marginRight: {
      type: [String, Number]
    },
    marginBottom: {
      type: [String, Number]
    },
    marginLeft: {
      type: [String, Number]
    },
    marginUnit: {
      type: String,
      default: "px"
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css styles based on mixin props
     * @returns { A String with the chained css styles }
     */
    getMarginStyles() {
      const css = new CssArchitect();
      css.addStyle(
        "margin",
        css.addUnitOrString(this.margin, this.marginUnit),
        this.margin !== undefined
      );
      css.addStyle(
        "margin-top",
        css.addUnitOrString(this.marginTop, this.marginUnit),
        this.marginTop !== undefined
      );
      css.addStyle(
        "margin-right",
        css.addUnitOrString(this.marginRight, this.marginUnit),
        this.marginRight !== undefined
      );
      css.addStyle(
        "margin-bottom",
        css.addUnitOrString(this.marginBottom, this.marginUnit),
        this.marginBottom !== undefined
      );
      css.addStyle(
        "margin-left",
        css.addUnitOrString(this.marginLeft, this.marginUnit),
        this.marginLeft !== undefined
      );
      return css.getStyles();
    }
  }
};
