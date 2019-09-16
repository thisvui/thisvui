import CssArchitect from "../utils/css-architect";

export default {
  props: {
    isFullheight: {
      type: Boolean
    },
    isFullwidth: {
      type: Boolean
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    unit: {
      type: String,
      default: "px"
    },
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getDimensionModifiers: function() {
      const css = new CssArchitect();
      css.addClass("is-fullheight", this.isFullheight);
      css.addClass("is-fullwidth", this.isFullwidth);
      return css.getClasses();
    },
    getDimensionStyles() {
      const css = new CssArchitect();
      css.addStyle("width", css.addUnit(this.width, this.unit), this.width !== undefined);
      css.addStyle("height", css.addUnit(this.height, this.unit), this.height !== undefined);
      return css.getStyles();
    },
  }
};
