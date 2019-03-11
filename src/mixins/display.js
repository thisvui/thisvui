import utils from "../utils/utils";
import CssArchitect from "../utils/css-architect";

export default {
  props: {
    isBlock: {
      type: [String, Boolean]
    },
    isFlex: {
      type: [String, Boolean]
    },
    isInline: {
      type: [String, Boolean]
    },
    isInlineBlock: {
      type: [String, Boolean]
    },
    isInlineFlex: {
      type: [String, Boolean]
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getDisplayModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(
        "is-block",
        utils.convert.stringToBoolean(this.isBlock)
      );
      cssArchitect.addClass(
        "is-flex",
        utils.convert.stringToBoolean(this.isFlex)
      );
      cssArchitect.addClass(
        "is-inline",
        utils.convert.stringToBoolean(this.isInline)
      );
      cssArchitect.addClass(
        "is-inline-block",
        utils.convert.stringToBoolean(this.isInlineBlock)
      );
      cssArchitect.addClass(
        "is-inline-flex",
        utils.convert.stringToBoolean(this.isInlineFlex)
      );
      return cssArchitect.getClasses();
    }
  }
};
