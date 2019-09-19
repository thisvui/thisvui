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
  },
  methods: {
    alpha(cssArchitect, { color = false, border = false, bg = false, bgHover = false  } = {}) {
      if(!cssArchitect){
        throw new Error("alpha - Please provide css-architect parameter")
      }
      cssArchitect.addStyle(
        "--color-alpha",
        parseFloat(color),
        color && this.colorAlpha === undefined
      );
      cssArchitect.addStyle(
        "--border-alpha",
        parseFloat(border),
        border && this.borderAlpha === undefined
      );
      cssArchitect.addStyle(
        "--bg-alpha",
        parseFloat(bg),
        bg && this.bgAlpha === undefined
      );
      cssArchitect.addStyle(
        "--bg-hover-alpha",
        parseFloat(bgHover),
        bgHover && this.bgHoverAlpha === undefined
      );
    }
  }
};
