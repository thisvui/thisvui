import CssArchitect from "../utils/css-architect";

export default {
  props: {
    isBlock: {
      type: Boolean
    },
    isFlex: {
      type: Boolean
    },
    isInline: {
      type: Boolean
    },
    isInlineBlock: {
      type: Boolean
    },
    isInlineFlex: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getDisplayModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("is-block", this.isBlock);
      cssArchitect.addClass("is-flex", this.isFlex);
      cssArchitect.addClass("is-inline", this.isInline);
      cssArchitect.addClass("is-inline-block", this.isInlineBlock);
      cssArchitect.addClass("is-inline-flex", this.isInlineFlex);
      return cssArchitect.getClasses();
    }
  }
};
