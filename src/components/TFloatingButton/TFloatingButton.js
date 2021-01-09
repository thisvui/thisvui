import sizes from "../../mixins/sizes";
import themes from "../../mixins/themes";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import { ComponentNames } from "../../utils/constants";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: ComponentNames.TFloatingButton,
  mixins: [common, sizes, themes, icons],
  props: {
    items: {
      type: Array
    },
    icon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.floatingButton;
      }
    },
    label: {
      type: String
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    isMenu: {
      type: Boolean,
      default: false
    },
    isTop: {
      type: Boolean,
      default: false
    },
    isBottom: {
      type: Boolean,
      default: true
    },
    isLeft: {
      type: Boolean,
      default: false
    },
    isRight: {
      type: Boolean,
      default: true
    },
    btnClass: {
      type: String
    },
    labelClass: {
      type: String
    },
    optionsClass: {
      type: String
    },
    optionBtnClass: {
      type: String
    },
    optionLabelClass: {
      type: String
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect(ComponentNames.TFloatingButton);
      css.addClass(this.getSizesModifiers);
      css.addClass(this.getThemeModifiers);
      css.addClass("is-top", this.isTop);
      css.addClass("is-bottom", this.isBottom);
      css.addClass("is-right", this.isRight);
      css.addClass("is-left", this.isLeft);
      this.setupThemeModifier(css);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the main button element
     * @returns { A String with the chained css classes }
     */
    getBtnClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TFloatingButton}__icon`);
      css.flexible().isCentered();
      this.isFilled(css);
      css.addClass(this.themeModifier, this.hasThemeModifier);
      css.addClass(this.btnClass);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the main label element
     * @returns { A String with the chained css classes }
     */
    getLabelClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TFloatingButton}__label`);
      css
        .flexible()
        .isCentered()
        .isFullwidth()
        .isFullheight();
      css.addClass(this.labelClass);
      return css.getClasses();
    },
    getIconClasses: function() {
      const css = new CssArchitect();
      css
        .flexible()
        .isCentered()
        .isFullwidth()
        .isFullheight();
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the options container
     * @returns { A String with the chained css classes }
     */
    getOptionsClasses: function() {
      const css = new CssArchitect(
        `${ComponentNames.TFloatingButton}__options`
      );
      css.addClass(this.optionsClass);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the option button element
     * @returns { A String with the chained css classes }
     */
    getOptionBtnClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TFloatingButton}__option`);
      css.addClass(this.optionBtnClass);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the option label element
     * @returns { A String with the chained css classes }
     */
    getOptionLabelClasses: function() {
      const css = new CssArchitect(
        `${ComponentNames.TFloatingButton}__option__label`
      );
      css.addClass(this.optionLabelClass);
      return css.getClasses();
    }
  },
  data() {
    return {
      showConfirmModal: false,
      triggerValidations: false
    };
  },
  methods: {
    onClick() {
      if (this.$attrs.disabled || this.$attrs.readOnly) {
        return;
      }
      this.$emit(this.$thisvui.events.common.click);
    },
    /**
     * Creates the icon
     * @param architect
     */
    createIcon(architect) {
      if (this.showIcon) {
        let icon = architect.createIcon();
        icon.setProps({
          icon: this.icon,
          preserveDefaults: !this.overrideDefaults,
          targetClass: this.getIconClasses
        });
        architect.addChild(icon);
      }
    },
    /**
     * Creates the menu button
     * @param architect
     */
    createMenuBtn(architect) {
      let btn = architect.createDiv(this.getBtnClasses);
      btn.addClick(this.onClick);
      if (this.label && !this.showIcon) {
        let label = architect.createSpan(this.getLabelClasses);
        label.innerHTML(this.label);
        btn.addChild(label);
      }

      this.createIcon(btn);
      architect.addChild(btn);
    },
    /**
     * Creates the menu options
     * @param architect
     */
    createMenuItems(architect) {
      if (this.isMenu) {
        let options = architect.createUl();
        for (let $index in this.items) {
          let $item = this.items[$index];

          let option = architect.createLi();
          let label = architect.createSpan(this.getOptionLabelClasses);
          label.innerHTML($item.label);

          let btn = architect.createDiv(this.getOptionBtnClasses);
          let icon = architect.createIcon();
          icon.setProps({
            icon: this.icon
          });
          btn.addChild(icon);
          option.addChild(label);
          option.addChild(btn);
          options.addChild(option);
        }

        architect.addChild(options);
      }
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getClasses);
    root.setId(this.id);
    this.createMenuBtn(root);
    this.createMenuItems(root);
    return root.create();
  }
};
