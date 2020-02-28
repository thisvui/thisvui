import icons from "../../mixins/icons";
import themes from "../../mixins/themes";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-panel-heading",
  mixins: [icons, themes],
  props: {
    text: {
      type: String
    },
    icon: {
      type: String
    },
    iconClass: {
      type: String
    },
    alignContentRight: {
      type: Boolean,
      default: false
    },
    showIcon: Boolean,
    iconLeft: Boolean
  },
  watch: {
    icon: function(newVal, oldVal) {
      this.icon = newVal;
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getCss: function() {
      const css = new CssArchitect("panel__heading");
      this.isFilled(css);
      this.isBordered(css);
      css.addClass("icon-left", this.iconLeft);
      css.addClass(this.getThemeModifiers);
      css.addClass(
        this.$parent.themeModifier,
        this.$parent.hasThemeModifier && !this.hasThemeModifier
      );
      return css;
    },
    /**
     * Dynamically build the css classes for the heading icon
     * @returns { A String with the chained css classes }
     */
    getIconClasses: function() {
      const css = new CssArchitect("level-right");
      css.addClass(this.iconClass, this.iconClass !== undefined);
      return css.getClasses();
    }
  },
  data() {
    return {
      headingIcon: this.icon
    };
  },
  methods: {
    onClick() {
      this.$emit(this.$thisvui.events.common.click);
    },
    createHeadingIcon(architect, condition) {
      if (this.showIcon && this.icon && condition) {
        let icon = architect.createIcon(this.getIconClasses);
        icon.setProps({
          icon: this.icon,
          preserveDefaults: !this.overrideDefaults
        });
        architect.addChild(icon);
      }
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getCss.getClasses());
    root.addClick(this.onClick);
    root.addVNodeChildren(this.$slots.default, !this.alignContentRight);
    this.createHeadingIcon(root, this.iconLeft);
    if (this.text) {
      let text = root.createSpan("panel__heading__text is-size-6");
      text.innerHTML(this.text);
      root.addChild(text);
    }
    this.createHeadingIcon(root, !this.iconLeft);
    root.addVNodeChildren(this.$slots.default, this.alignContentRight);
    return root.create();
  }
};
