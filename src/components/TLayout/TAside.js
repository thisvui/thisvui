import colors from "../../mixins/colors";
import gradient from "../../mixins/gradient";
import common from "../../mixins/common";
import TSlide from "../TAnimation/TSlide";
import slide from "../../mixins/slide";
import padding from "../../mixins/padding";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-aside",
  components: { TSlide },
  mixins: [common, colors, gradient, slide, padding],
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
      const css = new CssArchitect("t-aside");
      css
        .flexible({
          direction: "column",
          alignItems: "stretch",
          alignSelf: "start"
        })
        .isFullwidth()
        .isFullheight();
      this.filled(css, { removeInit: true });
      this.colorize(css, "router-link");
      css.addClass(this.getColorsModifiers);
      css.addClass(this.getGradientModifiers);
      css.addClass(this.getFlexModifiers);
      css.addClass(this.containerClass, this.containerClass !== undefined);
      return css.getClasses();
    }
  },
  methods: {
    getStyle() {
      const css = new CssArchitect();
      css.addStyle(
        "width",
        css.addUnit(this.width, this.unit),
        this.isNotNull(this.width)
      );
      css.addStyle("z-index", this.zIndex, this.isNotNull(this.zIndex));
      css.addStyles([this.getPaddingStyles, this.getAlphaModifiers]);
      return css.getStyles();
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
