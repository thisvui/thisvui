import block from "../../mixins/block";
import common from "../../mixins/common";
import themes from "../../mixins/themes";
import { ComponentNames } from "../../utils/constants";
import CssArchitect from "../../utils/css-architect";

import { createDiv } from "../../utils/element-architect";

export default {
  name: ComponentNames.TBlockUI,
  mixins: [common, themes, block],
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect(ComponentNames.TBlockUI);
      css.addClass(this.getThemeModifiers);
      this.setupThemeModifier(css, true);
      return css.getClasses();
    }
  },
  render: function(h) {
    let root = createDiv(h, this.getClasses);
    root.setId(this.id).setChildren(this.$slots.default);
    this.createLoading(root, this.getThemeModifiers);
    return root.create();
  }
};
