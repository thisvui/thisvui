import CssArchitect from "../utils/css-architect";

export default {
  props: {
    isColumn: {
      type: Boolean
    },
    isRow: {
      type: Boolean
    },
    isColumnReverse: {
      type: Boolean
    },
    isRowReverse: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically adds the modifiers css classes based on mixin props
     * @returns { A String with the chained css classes }
     */
    getFlexModifiers: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("is-column", this.isColumn);
      cssArchitect.addClass("is-row", this.isRow);
      cssArchitect.addClass("is-column-reverse", this.isColumnReverse);
      cssArchitect.addClass("is-row-reverse", this.isRowReverse);
      return cssArchitect.getClasses();
    }
  }
};
