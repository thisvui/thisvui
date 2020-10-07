import common from "../../mixins/common";
import background from "../../mixins/background";
import flex from "../../mixins/flex";
import padding from "../../mixins/padding";
import {ComponentNames} from "../../utils/constants";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: ComponentNames.TColumn,
  mixins: [common, background, flex, padding],
  props: {
    span: Number,
    gutters: Number,
    half: Boolean,
    flex: Boolean
  },
  data() {
    return {
      parent: []
    };
  },
  watch: {
    span: function(val, oldVal) {
      if (val) {
        this.parent.$emit("update:auto", val);
      }
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    css: function() {
      const css = new CssArchitect(`${ComponentNames.TColumn}`);
      css.addClass("half", this.half);
      css.flexible({ condition: this.flex });
      css.addClass(this.getBackgroundModifiers);
      css.addClass(this.getFlexModifiers, this.flex);
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
      css.addStyles([this.getFlexStyles], this.flex);
      css.addStyles([this.getPaddingStyles]);
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
  },
  mounted() {
    if (this.span) {
      this.parent.$emit("update:auto", this.span);
    }
  }
};
