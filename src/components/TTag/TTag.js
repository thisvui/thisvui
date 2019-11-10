import sizes from "../../mixins/sizes";
import colors from "../../mixins/colors";

import CssArchitect from "../../utils/css-architect";
import { createSpan } from "../../utils/element-architect";

export default {
  name: "t-tag",
  mixins: [colors, sizes],
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
      this.filled(css);
      css.addClass(this.getColorsModifiers);
      css.addClass(this.getSizesModifiers);
      css.addClass(this.targetClass);
      css.addClass("classic", this.classic);
      css.addClass("rounded", this.rounded);
      css.addClass("is-delete", this.delete);
      this.setupColorModifier(css, true);
      return css.getClasses();
    }
  },
  render: function(h) {
    let root = createSpan(h, this.getClasses);
    root.setChildren(this.$slots.default);
    return root.create();
  }
};
