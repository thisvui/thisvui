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
    maxWidth: {
      type: Number
    },
    maxHeight: {
      type: Number
    },
    minWidth: {
      type: Number
    },
    minHeight: {
      type: Number
    },
    heightUnit: {
      type: String,
      default: "px"
    },
    widthUnit: {
      type: String,
      default: "px"
    }
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
      css.addStyle(
        "width",
        css.addUnit(this.width, this.widthUnit),
        this.width !== undefined
      );
      css.addStyle(
        "height",
        css.addUnit(this.height, this.heightUnit),
        this.height !== undefined
      );
      css.addStyle(
        "min-width",
        css.addUnit(this.minWidth, this.widthUnit),
        this.minWidth !== undefined
      );
      css.addStyle(
        "min-height",
        css.addUnit(this.minHeight, this.heightUnit),
        this.minHeight !== undefined
      );
      css.addStyle(
        "max-width",
        css.addUnit(this.maxWidth, this.widthUnit),
        this.maxWidth !== undefined
      );
      css.addStyle(
        "max-height",
        css.addUnit(this.maxHeight, this.heightUnit),
        this.maxHeight !== undefined
      );
      return css.getStyles();
    }
  }
};
