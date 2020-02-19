import themes from "../../mixins/themes";
import gradient from "../../mixins/gradient";
import common from "../../mixins/common";
import TSlide from "../TAnimation/TSlide";
import slide from "../../mixins/slide";
import padding from "../../mixins/padding";
import helpers from "../../mixins/helpers";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-aside",
  components: { TSlide },
  mixins: [common, themes, gradient, slide, padding, helpers],
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
      this.isFilled(css);
      css.addClass(this.getThemeModifiers);
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
    root.addClass(this.getHelpersModifiers);
    let rootProps = {
      isOpen: this.isOpen,
      width: this.width,
      animationDuration: this.animationDuration,
      animationFill: this.animationFill,
      isAbsolute: this.isAbsolute,
      zIndex: this.zIndex,
      hasShadow: this.hasShadow
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
