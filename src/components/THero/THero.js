import common from "../../mixins/common";
import dimension from "../../mixins/dimension";
import sizes from "../../mixins/sizes";
import colors from "../../mixins/colors";
import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-hero",
  mixins: [common, sizes, dimension, colors],
  props: {
    isBold: {
      type: Boolean
    },
    headClass: {
      type: String
    },
    bodyClass: {
      type: String
    },
    footClass: {
      type: String
    }
  },
  computed: {
    hasHeadSlot() {
      return !!this.$slots.head;
    },
    hasFootSlot() {
      return !!this.$slots.foot;
    },
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("hero");
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(this.getDimensionModifiers);
      cssArchitect.addClass("is-bold", this.isBold);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the hero head element
     * @returns { A String with the chained css classes }
     */
    getHeadClasses: function() {
      const cssArchitect = new CssArchitect("hero-head");
      cssArchitect.addClass(this.headClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the hero body element
     * @returns { A String with the chained css classes }
     */
    getBodyClasses: function() {
      const cssArchitect = new CssArchitect("hero-body");
      cssArchitect.addClass(this.bodyClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the hero foot element
     * @returns { A String with the chained css classes }
     */
    getFootClasses: function() {
      const cssArchitect = new CssArchitect("hero-foot");
      cssArchitect.addClass(this.footClass);
      return cssArchitect.getClasses();
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getClasses);
    root.setId(this.id);

    // Creating the head element
    let head = root.createDiv(this.getHeadClasses);
    head.setSlot("head").setChildren(this.$slots.head);

    // Creating the body element
    let body = root.createDiv(this.getBodyClasses);
    body.setChildren(this.$slots.default);

    // Creating the foot element
    let foot = root.createDiv(this.getFootClasses);
    foot.setSlot("foot").setChildren(this.$slots.foot);

    root.addChild(head, this.hasHeadSlot); // only if head slot is present
    root.addChild(body);
    root.addChild(foot, this.hasFootSlot); // only if foot slot is present
    return root.create();
  }
};
