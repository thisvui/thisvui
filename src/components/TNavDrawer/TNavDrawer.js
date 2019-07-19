import helpers from "../../mixins/helpers";
import tree from "../../mixins/tree";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import colors from "../../mixins/colors";
import slide from "../../mixins/slide";

import TTreeNav from "../TTree/TTreeNav";
import TSlide from "../TAnimation/TSlide";
import TAside from "../TLayout/TAside";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-nav-drawer",
  components: { TAside, TSlide, TTreeNav },
  mixins: [common, slide, tree, icons, colors, helpers],
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
      const cssArchitect = new CssArchitect("t-nav-drawer");
      cssArchitect.isFlexible("column", "stretch").isFullheight();
      cssArchitect.addClass(
        this.containerClass,
        this.containerClass !== undefined
      );
      cssArchitect.addClass("is-nav-opened", this.isOpen);
      cssArchitect.addClass(this.getHelpersModifiers);
      cssArchitect.addClass(this.getColorsModifiers);
      this.setupColorModifier(cssArchitect);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for each label element
     * @returns { A String with the chained css classes }
     */
    getLabelClass: function() {
      const cssArchitect = new CssArchitect("menu-label");
      this.colorize(cssArchitect, "bg-color", true);
      cssArchitect.addClass(this.labelClass, this.labelClass !== undefined);
      cssArchitect.addClass(this.colorModifier, this.hasColorModifier);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for each item icon
     * @returns { A String with the chained css classes }
     */
    getIconClass: function() {
      const cssArchitect = new CssArchitect("is-inline-block");
      cssArchitect.addClass(this.iconClass, this.iconClass !== undefined);
      cssArchitect.addClass(this.colorModifier, this.hasColorModifier);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for each item link
     * @returns { A String with the chained css classes }
     */
    getLinkClass: function() {
      const cssArchitect = new CssArchitect("is-inline-block");
      this.colorize(cssArchitect, "bg-hover", true);
      cssArchitect.addClass(this.linkClass, this.linkClass !== undefined);
      cssArchitect.addClass(this.colorModifier, this.hasColorModifier);
      return cssArchitect.getClasses();
    },
    getControlIconClass: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(this.colorModifier, this.hasColorModifier);
      return cssArchitect.getClasses();
    },
    getLinkOpenedClass: function() {
      const cssArchitect = new CssArchitect();
      this.colorize(cssArchitect, "bg-color");
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {
      parentProps: this.$parent.$props
    };
  },
  methods: {
    getStyle() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addStyle("width", `${this.calculatedWidth}px`);
      return cssArchitect.getStyles();
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
