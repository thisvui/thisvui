import common from "../../mixins/common";
import background from "../../mixins/background";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-columns",
  mixins: [common, background],
  props: {
    gapless: {
      type: Boolean
    },
    gridWidth: {
      type: Number,
      default: 960
    },
    gridColumns: {
      type: Number,
      default: 12
    },
    gridColumnWidth: {
      type: Number,
      default: 60
    }
  },
  data() {
    return {
      items: [],
      auto: true
    };
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    css: function() {
      const css = new CssArchitect("columns");
      css.addClass("gapless", this.gapless);
      css.addClass("auto", this.auto);
      css.addClass(this.getBackgroundModifiers);
      css.addStyle("--grid-width", this.gridWidth, this.gridWidth !== 960);
      css.addStyle(
        "--grid-column-width",
        this.gridColumnWidth,
        this.gridColumnWidth !== 60
      );
      css.addStyle("--grid-columns", this.gridColumns, this.gridColumns !== 12);
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
    this.items = this.$children;
    this.$on("update:auto", value => {
      this.auto = !this.isNotEmpty(value);
    });
  }
};
