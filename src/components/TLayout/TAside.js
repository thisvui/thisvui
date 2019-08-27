import colors from "../../mixins/colors";
import common from "../../mixins/common";
import flex from "../../mixins/flex";
import CssArchitect from "../../utils/css-architect";
import TSlide from "../TAnimation/TSlide";
import slide from "../../mixins/slide";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-aside",
  components: { TSlide },
  mixins: [common, colors, flex, slide],
  props: {
    containerClass: {
      type: String
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("t-aside");
      cssArchitect
        .isFlexible("column", "stretch", false, "start")
        .isFullwidth()
        .isFullheight();
      this.colorize(cssArchitect, "bg", true);
      this.colorize(cssArchitect, "router-link");
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(this.getFlexModifiers);
      cssArchitect.addClass(
        this.containerClass,
        this.containerClass !== undefined
      );
      return cssArchitect.getClasses();
    }
  },
  methods: {
    getStyle() {
      let styleObject = {
        width: `${this.calculatedWidth}px`
      };
      return styleObject;
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, TSlide);
    let rootProps = {
      isOpen: this.isOpen,
      width: this.width,
      animationDuration: this.animationDuration,
      animationFill: this.animationFill,
      isAbsolute: this.isAbsolute,
      zIndex: this.zIndex
    };
    root.setProps(rootProps);
    root.addEvent("clicked-outside", this.handleOutsideClick);
    root.addEvent("change-width", this.updateCalculatedWith);
    let aside = root.createElement("aside", this.getClasses);
    aside.setId(this.id);
    aside.setRef("asidecontainer");
    aside.setStyles(this.getStyle());
    aside.setChildren(this.$slots.default);
    root.addChild(aside);
    return root.create();
  }
};
