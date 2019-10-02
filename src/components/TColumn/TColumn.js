import common from "../../mixins/common";
import background from "../../mixins/background";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-column",
  mixins: [common, background],
  props: {
    span: Number,
    gutters: Number
  },
  data() {
    return {
      parent: []
    };
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    css: function() {
      const css = new CssArchitect("column");
      css.addClass(this.getBackgroundModifiers);
      if (this.isNotNull(this.span) && this.parent) {
        let gridColumns = this.parent.$props.gridColumns;
        let span = this.span;
        if (span > gridColumns) {
          span = gridColumns;
        }
        css.addStyle("--column-span", span);
      }

      if (this.isNotNull(this.gutters) && this.parent) {
        let gridColumns = this.parent.$props.gridColumns;
        let gutters = this.gutters;
        if (gutters > gridColumns) {
          gutters = gridColumns;
        }
        css.addStyle("--column-gutters", gutters);
      }
      return css;
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.css.getClasses());
    root.setId(this.id);
    root.setStyles(this.css.getStyles());
    root.setChildren(this.$slots.default);
    return root.create();
  },
  created() {
    this.parent = this.$parent;
  }
};
