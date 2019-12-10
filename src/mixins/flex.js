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
    },
    flexDirection: {
      type: String,
      default: "row"
    },
    alignItems: {
      type: String
    },
    alignSelf: {
      type: String
    },
    alignContent: {
      type: String
    },
    alignStart: Boolean,
    alignCenter: Boolean,
    alignEnd: Boolean,
    justifyContent: {
      type: String
    },
    justifyStart: Boolean,
    justifyCenter: Boolean,
    justifyEnd: Boolean,
    flexWrap: {
      type: Boolean
    },
    flexNoWrap: {
      type: Boolean
    },
    flexWrapReverse: {
      type: Boolean
    },
    flexGrow: {
      type: Number
    },
    flex: {
      type: Number
    },
    full: {
      type: Boolean
    },
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
      cssArchitect.addClass(`flex-wrap`, this.flexWrap);
      cssArchitect.addClass(`flex-wrap-nowrap`, this.flexNoWrap);
      cssArchitect.addClass(`flex-wrap-reverse`, this.flexWrapReverse);
      cssArchitect.addClass(`align-items-start`, this.alignStart);
      cssArchitect.addClass(`align-items-center`, this.alignCenter);
      cssArchitect.addClass(`align-items-end`, this.alignEnd);
      cssArchitect.addClass(`justify-start`, this.justifyStart);
      cssArchitect.addClass(`justify-center`, this.justifyCenter);
      cssArchitect.addClass(`justify-end`, this.justifyEnd);
      cssArchitect.addClass(`full`, this.full);
      return cssArchitect.getClasses();
    },
    getFlexStyles: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addStyle("--flex", this.flex, this.flex)
      cssArchitect.addStyle("--flex-grow", this.flexGrow, this.flexGrow)
      cssArchitect.addStyle("--flex-direction", this.flexDirection, this.flexDirection)
      cssArchitect.addStyle("--align-items", this.alignItems, this.alignItems)
      cssArchitect.addStyle("--align-self", this.alignSelf, this.alignSelf)
      cssArchitect.addStyle("--justify-content", this.justifyContent, this.justifyContent)
      cssArchitect.addStyle("--align-content", this.alignContent, this.alignContent)
      return cssArchitect.getStyles();
    }
  }
};
