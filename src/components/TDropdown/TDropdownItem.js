import themes from "../../mixins/themes";

import { createDiv } from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";


export default {
  name: "t-dropdown-item",
  mixins: [themes],
  props: {
    targetClass: {
      type: String
    }
  },
  computed: {
    getClasses: function() {
      const css = new CssArchitect("dropdown__item");
      this.isFilled(css);
      css.addClass("hovered tint-75 color-dark");
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
