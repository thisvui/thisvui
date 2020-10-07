import themes from "../../mixins/themes";
import common from "../../mixins/common";
import flex from "../../mixins/flex";
import alignment from "../../mixins/alignment";
import {ComponentNames} from "../../utils/constants";

import CssArchitect from "../../utils/css-architect";
import { createDiv } from "../../utils/element-architect";

export default {
  name: ComponentNames.TToolbar,
  mixins: [common, themes, flex, alignment],
  props: {
    isVertical: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {};
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect(ComponentNames.TToolbar);
      this.isFilled(css);
      css.flexible({direction: this.isVertical ? "column": "row"});
      css.addClass(this.getThemeModifiers);
      css.addClass(this.getFlexModifiers);
      css.addClass(this.getAlignmentModifiers);
      css.addClass("is-left", !this.isRight && !this.isCentered);
      this.setupThemeModifier(css, true);
      return css.getClasses();
    }
  },
  render: function(h) {
    let root = createDiv(h, this.getClasses);
    root.setId(this.id).setChildren(this.$slots.default);
    return root.create();
  }
};
