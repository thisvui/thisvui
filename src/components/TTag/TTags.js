import CssArchitect from "../../utils/css-architect";
import { createSpan } from "../../utils/element-architect";

export default {
  name: "t-tags",
  props: {
    attached: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect("tags");
      css.addClass("attached", this.attached);
      return css.getClasses();
    }
  },
  render: function(h) {
    let root = createSpan(h, this.getClasses);
    root.setChildren(this.$slots.default);
    return root.create();
  }
};
