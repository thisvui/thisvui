import sizes from "../../mixins/sizes";
import themes from "../../mixins/themes";

import CssArchitect from "../../utils/css-architect";
import { createSpan } from "../../utils/element-architect";

export default {
  name: "t-tag",
  mixins: [themes, sizes],
  props: {
    targetClass: {
      type: String
    },
    classic: {
      type: Boolean
    },
    rounded: {
      type: Boolean
    },
    delete: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect("tag");
      this.isFilled(css);
      css.addClass(this.getThemeModifiers);
      css.addClass(this.getSizesModifiers);
      css.addClass(this.targetClass);
      css.addClass("classic", this.classic);
      css.addClass("rounded", this.rounded);
      css.addClass("is-delete", this.delete);
      this.setupThemeModifier(css, true);
      return css.getClasses();
    }
  },
  render: function(h) {
    let root = createSpan(h, this.getClasses);
    root.setChildren(this.$slots.default);
    return root.create();
  }
};
