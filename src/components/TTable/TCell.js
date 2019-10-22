import { createElement } from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-cell",
  props: {
    head: Boolean,
    center: {
      type: Boolean,
      default: true
    },
    left: Boolean,
    right: Boolean
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect("table__cell");
      css.addClass("center", this.center);
      css.addClass("left", this.left);
      css.addClass("right", this.right);
      return css.getClasses();
    }
  },
  render: function(h) {
    let type = this.head ? "th" : "td";
    let root = createElement(h, type, this.getClasses);
    root.setChildren(this.$slots.default);
    return root.create();
  }
};
