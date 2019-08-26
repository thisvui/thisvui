import colors from "../../mixins/colors";
import common from "../../mixins/common";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-navbar",
  mixins: [common, colors],
  props: {
    targetClass: {
      type: String
    },
    isTransparent: {
      type: Boolean,
      default: false
    },
    isFixedTop: {
      type: Boolean,
      default: false
    },
    isFixedBottom: {
      type: Boolean,
      default: false
    },
    alpha: {
      type: Number
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("t-navbar navbar");
      this.colorize(cssArchitect, "bg", true);
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass("is-transparent", this.isTransparent);
      cssArchitect.addClass("is-fixed-top", this.isFixedTop);
      cssArchitect.addClass("is-fixed-bottom", this.isFixedBottom);
      cssArchitect.addClass(this.targetClass);
      this.setupColorModifier(cssArchitect);
      return cssArchitect.getClasses();
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "nav", this.getClasses);
    root.setId(this.id).setChildren(this.$slots.default);
    root.setStyles(this.getAlphaModifiers)
    return root.create();
  }
};
