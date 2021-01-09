import display from "../../mixins/display";
import helpers from "../../mixins/helpers";
import { ComponentNames } from "../../utils/constants";

import CssArchitect from "../../utils/css-architect";
import { createElement } from "../../utils/element-architect";

export default {
  name: ComponentNames.TCell,
  mixins: [display, helpers],
  props: {
    head: Boolean,
    center: {
      type: Boolean,
      default: true
    },
    left: Boolean,
    right: Boolean
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TTable}__cell`);
      css.addClass("center", this.alignment.center);
      css.addClass("left", this.alignment.left);
      css.addClass("right", this.alignment.right);
      css.addClass(this.getHelpersModifiers);
      css.addClass(this.getDisplayModifiers);
      return css.getClasses();
    },
    alignment: function() {
      let center = false;
      let left = false;
      let right = false;
      if (this.center) {
        center = true;
      }
      if (this.left) {
        center = false;
        left = true;
      }
      if (this.right) {
        center = false;
        left = false;
        right = true;
      }
      return {
        center: center,
        left: left,
        right: right
      };
    }
  },
  methods: {
    onClick(event) {
      this.$emit(this.$thisvui.events.common.click);
    }
  },
  render: function(h) {
    let type = this.head ? "th" : "td";
    let root = createElement(h, type, this.getClasses);
    root.addClick(this.onClick);
    root.setChildren(this.$slots.default);
    return root.create();
  }
};
