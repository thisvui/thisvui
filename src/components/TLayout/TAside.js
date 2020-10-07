import themes from "../../mixins/themes";
import gradient from "../../mixins/gradient";
import common from "../../mixins/common";
import slide from "../../mixins/slide";
import padding from "../../mixins/padding";
import helpers from "../../mixins/helpers";
import {ComponentNames} from "../../utils/constants";

import CssArchitect from "../../utils/css-architect";

export default {
  name: ComponentNames.TAside,
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
    css: function() {
      const css = new CssArchitect(ComponentNames.TAside);
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
      return css;
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
    let root = this.createSlideContainer(h);
    root.addClass(this.getHelpersModifiers);
    let aside = root.createElement("aside", this.css.getClasses());
    aside.setId(this.id);
    aside.setRef("asidecontainer");
    aside.setStyles(this.getStyle());
    aside.setChildren(this.$slots.default);
    root.addChild(aside);
    return root.create();
  },
  mounted() {
    this.$nextTick(function() {
      this.toggleSlide();
    });
  },
  created: function() {
    this.addResizeListener();
  },
  beforeDestroy: function() {
    this.clearSlideTimer();
    this.removeResizeListener();
  }
};
