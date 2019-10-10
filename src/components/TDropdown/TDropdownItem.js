import colors from "../../mixins/colors";

import { createDiv } from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";


export default {
  name: "t-dropdown-item",
  mixins: [colors],
  props: {
    targetClass: {
      type: String
    }
  },
  computed: {
    getClasses: function() {
      const css = new CssArchitect("dropdown__item");
      this.filled(css);
      css.addClass("hovered lighten has-text-dark");
      css.addClass(this.targetClass);
      return css.getClasses();
    },
  },
  render: function(h) {
    let root = createDiv(h, this.getClasses);
    root.setChildren(this.$slots.default);
    return root.create();
  }
};
