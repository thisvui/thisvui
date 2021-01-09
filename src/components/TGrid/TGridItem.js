import common from "../../mixins/common";
import background from "../../mixins/background";
import { ComponentNames } from "../../utils/constants";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: ComponentNames.TGridItem,
  mixins: [common, background],
  props: {
    column: String,
    row: String,
    columnStart: String,
    columnEnd: String,
    rowStart: String,
    rowEnd: String,
    area: String,
    justifySelf: String,
    alignSelf: String,
    placeSelf: String
  },
  data() {
    return {
      parent: []
    };
  },
  computed: {
    /**
     * Dynamically build the css classes and styles for the target element
     * @returns { A String with the chained css classes }
     */
    css: function() {
      const css = new CssArchitect(`${ComponentNames.TGrid}__item`);
      // Classes
      css.addClass(this.getBackgroundModifiers);

      // Styles
      css.addStyle("grid-column", this.column, this.isNotNull(this.column));
      css.addStyle("grid-row", this.row, this.isNotNull(this.row));
      css.addStyle(
        "grid-column-start",
        this.columnStart,
        this.isNotNull(this.columnStart)
      );
      css.addStyle(
        "grid-row-start",
        this.rowStart,
        this.isNotNull(this.rowStart)
      );
      css.addStyle(
        "grid-column-end",
        this.columnEnd,
        this.isNotNull(this.columnEnd)
      );
      css.addStyle("grid-row-end", this.rowEnd, this.isNotNull(this.rowEnd));
      css.addStyle("grid-area", this.area, this.isNotNull(this.area));

      // Positioning
      css.addStyle(
        "justify-self",
        this.justifySelf,
        this.isNotNull(this.justifySelf)
      );
      css.addStyle(
        "align-self",
        this.alignSelf,
        this.isNotNull(this.alignSelf)
      );
      css.addStyle(
        "place-self",
        this.placeSelf,
        this.isNotNull(this.placeSelf)
      );
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
