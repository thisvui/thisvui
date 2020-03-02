import CssArchitect from "../utils/css-architect";

export default {
  props: {
    padding: {
      type: [String, Number]
    },
    paddingTop: {
      type: [String, Number]
    },
    paddingRight: {
      type: [String, Number]
    },
    paddingBottom: {
      type: [String, Number]
    },
    paddingLeft: {
      type: [String, Number]
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
      css.addStyle("padding", css.addUnitOrString(this.padding, this.paddingUnit), this.padding !== undefined);
      css.addStyle("padding-top", css.addUnitOrString(this.paddingTop, this.paddingUnit), this.paddingTop !== undefined);
      css.addStyle("padding-right", css.addUnitOrString(this.paddingRight, this.paddingUnit), this.paddingRight !== undefined);
      css.addStyle("padding-bottom", css.addUnitOrString(this.paddingBottom, this.paddingUnit), this.paddingBottom !== undefined);
      css.addStyle("padding-left", css.addUnitOrString(this.paddingLeft, this.paddingUnit), this.paddingLeft !== undefined);
      return css.getStyles();
    },
  }
};
