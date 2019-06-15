import CssArchitect from "../../utils/css-architect";
import dimension from "../../mixins/dimension";
import flex from "../../mixins/flex";
import alignment from "../../mixins/alignment";
import background from "../../mixins/background";

export default {
  name: "t-flex",
  mixins: [flex, dimension, alignment, background],
  props: {
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
    justifyContent: {
      type: String
    },
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
    width: {
      type: Number,
      default: 300
    },
    unity: {
      type: String,
      default: "px"
    },
    zIndex: {
      type: [Number, String]
    }
  },
  data: function() {
    return {
      targetClass: ""
    };
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("t-flex");
      cssArchitect.addClass(`flex-wrap`, this.flexWrap);
      cssArchitect.addClass(`flex-wrap-nowrap`, this.flexNoWrap);
      cssArchitect.addClass(`flex-wrap-reverse`, this.flexWrapReverse);
      cssArchitect.addClass(this.getFlexModifiers);
      cssArchitect.addClass(this.getDimensionModifiers);
      cssArchitect.addClass(this.getAlignmentModifiers);
      cssArchitect.addClass(this.getBackgroundModifiers);
      return cssArchitect.getClasses();
    },
    getStyles: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addStyle("--flex-grow", this.flexGrow, this.flexGrow)
      cssArchitect.addStyle("--flex-direction", this.flexDirection, this.flexDirection)
      cssArchitect.addStyle("--align-items", this.alignItems, this.alignItems)
      cssArchitect.addStyle("--align-self", this.alignSelf, this.alignSelf)
      cssArchitect.addStyle("--justify-content", this.justifyContent, this.justifyContent)
      cssArchitect.addStyle("--align-content", this.alignContent, this.alignContent)
      return cssArchitect.getStyles();
    }
  },
  render: function(createElement) {
    return createElement("div", {
      class: this.getClasses,
      style: this.getStyles,
    }, this.$slots.default);
  },
};
