import CssArchitect from "../utils/css-architect";

export default {
  props: {
    colorAlpha: {
      type: String | Number
    },
    borderAlpha: {
      type: String | Number
    },
    bgAlpha: {
      type: String | Number
    },
    bgHoverAlpha: {
      type: String | Number
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getAlphaModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addStyle(
        "--color-alpha",
        parseInt(this.colorAlpha),
        this.colorAlpha !== undefined
      );
      cssArchitect.addStyle(
        "--border-alpha",
        parseInt(this.borderAlpha),
        this.borderAlpha !== undefined
      );
      cssArchitect.addStyle(
        "--bg-alpha",
        parseInt(this.bgAlpha),
        this.bgAlpha !== undefined
      );
      cssArchitect.addStyle(
        "--bg-hover-alpha",
        parseInt(this.bgHoverAlpha),
        this.bgHoverAlpha !== undefined
      );
      return cssArchitect.getStyles();
    }
  }
};