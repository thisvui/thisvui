<template>
  <div :class="getClasses" :style="getStyles">
    <slot></slot>
  </div>
</template>

<script>
import CssArchitect from "../../utils/css-architect";
import dimension from "../../mixins/dimension";
import flex from "../../mixins/flex";
import alignment from "../../mixins/alignment";

export default {
  name: "t-flex",
  mixins: [flex, dimension, alignment],
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
    flexGrow:{
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
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("t-flex");
      cssArchitect.addClass(
        `flex-direction-${this.flexDirection}`,
        this.flexDirection !== undefined
      );
      cssArchitect.addClass(
        `align-items-${this.alignItems}`,
        this.alignItems !== undefined
      );
      cssArchitect.addClass(
        `align-self-${this.alignSelf}`,
        this.alignSelf !== undefined
      );
      cssArchitect.addClass(
        `justify-content-${this.justifyContent}`,
        this.justifyContent !== undefined
      );
      cssArchitect.addClass(`flex-wrap`, this.flexWrap);
      cssArchitect.addClass(`flex-wrap-nowrap`, this.flexNoWrap);
      cssArchitect.addClass(`flex-wrap-reverse`, this.flexWrapReverse);
      cssArchitect.addClass(this.getFlexModifiers);
      cssArchitect.addClass(this.getDimensionModifiers);
      cssArchitect.addClass(this.getAlignmentModifiers);
      return cssArchitect.getClasses();
    },
    getStyles: function() {
      let styles
      if(this.flexGrow){
        styles = `--flex-grow: ${this.flexGrow}`
      }
      return styles;
    }
  },
  data: function() {
    return {
      targetClass: ""
    };
  }
};
</script>
