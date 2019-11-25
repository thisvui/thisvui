import helpers from "../../mixins/helpers";
import tree from "../../mixins/tree";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import themes from "../../mixins/themes";
import slide from "../../mixins/slide";

import TTreeNav from "../TTree/TTreeNav";
import TSlide from "../TAnimation/TSlide";
import TAside from "../TLayout/TAside";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-nav-drawer",
  components: { TAside, TSlide, TTreeNav },
  mixins: [common, slide, tree, icons, themes, helpers],
  props: {
    model: {
      type: Array,
      required: true
    },
    hideLabel: {
      type: Boolean,
      default: false
    },
    containerClass: {
      type: String
    },
    labelClass: {
      type: String
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the main container
     * @returns { A String with the chained css classes }
     */
    getContainerClass: function() {
      const css = new CssArchitect("t-nav-drawer");
      css
        .flexible({ direction: "column", alignItems: "stretch" })
        .isFullheight();
      css.addClass(this.containerClass, this.containerClass !== undefined);
      css.addClass("is-nav-opened", this.isOpen);
      css.addClass(this.getHelpersModifiers);
      css.addClass(this.getThemeModifiers);
      this.setupThemeModifier(css);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for each label element
     * @returns { A String with the chained css classes }
     */
    getLabelClass: function() {
      const css = new CssArchitect("menu-label");
      this.isFilled(css);
      css.addClass(this.labelClass, this.labelClass !== undefined);
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for each item icon
     * @returns { A String with the chained css classes }
     */
    getIconClass: function() {
      const css = new CssArchitect("is-inline-block");
      css.addClass(this.iconClass, this.iconClass !== undefined);
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for each item link
     * @returns { A String with the chained css classes }
     */
    getLinkClass: function() {
      const css = new CssArchitect("is-inline-block");
      this.isHovered(css);
      css.addClass(this.linkClass, this.linkClass !== undefined);
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css.getClasses();
    },
    getControlIconClass: function() {
      const css = new CssArchitect();
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css.getClasses();
    },
    getLinkOpenedClass: function() {
      const css = new CssArchitect();
      this.isFilled(css);
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css.getClasses();
    }
  },
  data() {
    return {
      parentProps: this.$parent.$props
    };
  },
  methods: {
    getStyle() {
      const css = new CssArchitect();
      css.addStyle("width", `${this.calculatedWidth}px`);
      return css.getStyles();
    },
    /**
     * Creates the menu items
     * @param architect
     */
    createMenuItems(architect) {
      let menuItems = architect.createDiv("menu");
      menuItems.setStyles(this.getStyle());

      for (let $index in this.model) {
        let $menu = this.model[$index];

        if (!this.hideLabel) {
          let label = architect.createP(this.getLabelClass);
          label.setKey(`${this.id}-ml-${$index}`);
          label.innerHTML($menu.name);
          menuItems.addChild(label);
        }

        let treeContainer = architect.createUl("menu-list");
        treeContainer.setKey(`${this.id}-ml-tree${$index}`);

        for (let $treeIndex in $menu.children) {
          let $treeItem = $menu.children[$treeIndex];

          let treeNav = architect.createElement(TTreeNav, "item");
          treeNav.setKey(`${this.id}-ml-tree-item${$treeIndex}`);
          treeNav.setProps({
            tagClass: this.tagClass,
            model: $treeItem,
            iconClass: this.getIconClass,
            linkClass: this.getLinkClass,
            linkOpenedClass: this.getLinkOpenedClass,
            controlIconClass: this.getControlIconClass,
            openedIcon: this.openedIcon,
            closedIcon: this.closedIcon,
            iconLib: this.iconLib,
            overrideDefaults: this.overrideDefaults,
            exclusive: this.exclusive
          });
          treeContainer.addChild(treeNav);
        }
        menuItems.addChild(treeContainer);
      }
      architect.addChild(menuItems);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, TAside);
    root.setId(this.id);
    root.setProps({
      containerClass: this.getContainerClass,
      isOpen: this.isOpen,
      isAbsolute: this.isAbsolute,
      width: this.width,
      zIndex: this.zIndex,
      animationDuration: this.animationDuration,
      animationFill: this.animationFill
    });
    root.addEvent("clicked-outside", this.handleOutsideClick);
    root.addEvent("change-width", this.updateCalculatedWith);
    this.createMenuItems(root);
    return root.create();
  }
};
