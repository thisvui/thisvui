import icons from "../../mixins/icons";
import colors from "../../mixins/colors";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-panel-heading",
  mixins: [icons, colors],
  props: {
    headingText: {
      type: String
    },
    headingIcon: {
      type: String
    },
    headingIconClass: {
      type: String
    },
    alignContentToRight: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    headingIcon: function(newVal, oldVal) {
      this.icon = newVal;
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("panel-heading level");
      this.colorize(cssArchitect, "bg-color", true);
      this.colorize(cssArchitect, "border");
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(
        this.$parent.colorModifier,
        this.$parent.hasColorModifier && !this.hasColorModifier
      );
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the heading icon
     * @returns { A String with the chained css classes }
     */
    getIconClasses: function() {
      const cssArchitect = new CssArchitect("level-right");
      cssArchitect.addClass(
        this.headingIconClass,
        this.headingIconClass !== undefined
      );
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {
      icon: this.headingIcon
    };
  },
  methods: {
    onClick() {
      this.$emit(this.$thisvui.events.common.click);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getClasses);
    root.addClick(this.onClick);

    root.addChildren(this.$slots.default, !this.alignContentToRight);
    if (this.headingText) {
      let headingText = root.createSpan("is-size-6");
      headingText.innerHTML(this.headingText);
      root.addChild(headingText);
    }

    if (this.icon) {
      let headingIcon = root.createIcon(this.getIconClasses);
      headingIcon.setProps({
        icon: this.icon,
        preserveDefaults: !this.overrideDefaults
      });
      root.addChild(headingIcon);
    }
    root.addChildren(this.$slots.default, this.alignContentToRight);
    return root.create();
  }
};
