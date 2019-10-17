import colors from "../../mixins/colors";
import gradient from "../../mixins/gradient";
import common from "../../mixins/common";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-footer",
  mixins: [common, colors, gradient],
  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    height: {
      type: [String, Number],
      default: 52
    },
    unit: {
      type: String,
      default: "px"
    },
    zIndex: {
      type: [String, Number]
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect("t-footer");
      css.isFullwidth();
      this.filled(css, { removeInit: true });
      css.addClass(this.getColorsModifiers);
      css.addClass(this.getGradientModifiers);
      css.addClass("is-fixed", this.fixed);
      return css.getClasses();
    },
    getHeight: function() {
      let height = `${this.height}${this.unit}`;
      return height;
    }
  },
  methods: {
    getStyle() {
      const css = new CssArchitect("t-header");
      css.addStyle(
        "height",
        css.addUnit(this.height, this.unit),
        this.isNotNull(this.height)
      );
      css.addStyle("z-index", this.zIndex, this.isNotNull(this.zIndex));
      css.addStyles([this.getAlphaModifiers]);
      return css.getStyles();
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getClasses);
    root.setId(this.id);
    root.setStyles(this.getStyle());
    root.setChildren(this.$slots.default);
    return root.create();
  }
};
