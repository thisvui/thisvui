import helpers from "../../mixins/helpers";
import tree from "../../mixins/tree";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import themes from "../../mixins/themes";

import TTreeNav from "../TTree/TTreeNav";

import CssArchitect from "../../utils/css-architect";
import { createDiv } from "../../utils/element-architect";

export default {
  name: "t-nav-drawer",
  components: { TTreeNav },
  mixins: [common, tree, icons, themes, helpers],
  props: {
    model: {
      type: Array,
      required: true
    },
    width: {
      type: [Number, String],
      default: 300
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
    containerCss: function() {
      const css = new CssArchitect("t-nav-drawer");
      css
        .flexible({ direction: "column", alignItems: "stretch" })
        .isFullheight();
      css.addClass(this.containerClass, this.containerClass !== undefined);
      css.addClass("is-nav-opened", this.isOpen);
      css.addClass(this.getHelpersModifiers);
      css.addClass(this.getThemeModifiers);
      css.addStyle("width", css.addPx(this.width), this.isNotEmpty(this.width));
      this.setupThemeModifier(css);
      return css;
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
    /**
     * Creates the menu items
     * @param architect
     */
    createMenuItems(architect) {
      let menu = architect.createDiv("menu");
      for (let $index in this.model) {
        let $menu = this.model[$index];

        if (!this.hideLabel) {
          let label = menu.createP(this.getLabelClass);
          label.setKey(`${this.id}-ml-${$index}`);
          label.innerHTML($menu.name);
          menu.addChild(label);
        }

        let treeContainer = menu.createUl("menu-list");
        treeContainer.setKey(`${this.id}-ml-tree${$index}`);

        for (let $treeIndex in $menu.children) {
          let $treeItem = $menu.children[$treeIndex];

          let treeNav = menu.createElement(TTreeNav, "item");
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
        menu.addChild(treeContainer);
      }
      architect.addChild(menu);
    }
  },
  render: function(h) {
    let root = createDiv(h, this.containerCss.getClasses());
    root.setStyles(this.containerCss.getStyles());
    this.createMenuItems(root);
    return root.create();
  },
  mounted(){
    this.$on("close-siblings", id => {
      this.$emit("close-children", id);
    });

  }
};
