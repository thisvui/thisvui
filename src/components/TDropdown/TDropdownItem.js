import themes from "../../mixins/themes";
import { ComponentNames } from "../../utils/constants";

import { createDiv } from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";

export default {
  name: ComponentNames.TDropdownItem,
  mixins: [themes],
  props: {
    targetClass: {
      type: String
    }
  },
  computed: {
    getClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TDropdown}__item`);
      this.isFilled(css);
      css.addClass("hovered tint-75 color-dark");
      css.addClass(this.targetClass);
      return css.getClasses();
    }
  },
  render: function(h) {
    let root = createDiv(h, this.getClasses);
    root.setChildren(this.$slots.default);
    return root.create();
  }
};
