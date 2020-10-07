import helpers from "../../mixins/helpers";
import tree from "../../mixins/tree";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import {ComponentNames} from "../../utils/constants";
import TIcon from "../TIcon/TIcon";

import TTag from "../TTag/TTag";
import TExpand from "../TAnimation/TExpand";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: ComponentNames.TTreeNav,
  mixins: [common, tree, icons, helpers],
  components: {
    TExpand,
    TTag,
    TIcon
  },
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      open: false
    };
  },
  computed: {
    isFolder: function() {
      return this.model.children && this.model.children.length;
    },
    hasView: function() {
      return this.model.view && this.model.view.length;
    },
    hasTag: function() {
      return this.model.tag && this.model.tag.length;
    },
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect(ComponentNames.TTreeNav);
      cssArchitect.addClass("list-style-none", this.removeListStyle);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the children container
     * @returns { A String with the chained css classes }
     */
    getChildrenClasses: function() {
      const cssArchitect = new CssArchitect(`${ComponentNames.TTreeNav}__children`);
      cssArchitect.addClass("is-collapsed", !this.open);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the tag elements
     * @returns { A String with the chained css classes }
     */
    getTagClasses: function() {
      const cssArchitect = new CssArchitect("t-tag");
      cssArchitect.addClass(this.tagClass, this.tagClass);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the link elements
     * @returns { A String with the chained css classes }
     */
    getLinkClasses: function() {
      const cssArchitect = new CssArchitect(`${ComponentNames.TTreeNav}__link`);
      cssArchitect.addClass("is-active", this.open);
      cssArchitect.addClass(this.linkClass, this.linkClass);
      cssArchitect.addClass(this.linkOpenedClass, this.open);
      return cssArchitect.getClasses();
    }
  },
  created() {
    this.$parent.$on("close-children", id => {
      if (this.id !== id) {
        this.open = false;
      }
    });
  },
  methods: {
    toggle: function() {
      if (this.isFolder) {
        this.open = !this.open;
        if (this.open && this.exclusive) {
          this.$parent.$emit("close-siblings", this.id);
        }
      }
      if (this.model.action) {
        this.model.action();
      }
    },
    /**
     * Creates the Icon
     * @param architect
     */
    createIcon(architect) {
      if (this.model.icon) {
        let icon = architect.createIcon();
        icon.addClass(this.model.iconClass || this.iconClass);
        icon.setProps({ icon: this.model.icon });
        architect.addChild(icon);
      }
    },
    /**
     * Creates the tag
     * @param architect
     */
    createTag(architect) {
      if (this.hasTag) {
        let tag = architect.createElement(TTag);
        tag.addClass(this.model.tagClass || this.getTagClasses);
        tag.innerHTML(this.model.tag);
        architect.addChild(tag);
      }
    },
    /**
     * Creates the Link
     * @param architect
     */
    createLink(architect) {
      let elementType = this.hasView ? "router-link" : "a";
      let link = architect.createElement(elementType, this.getLinkClasses);
      link.addProp("to", { name: this.model.view }, this.hasView);
      link.addClick(this.toggle);
      link.addChild(this.model.name, true, true);

      this.createTag(link);

      if (this.isFolder) {
        let iconContainer = architect.createDiv(`${ComponentNames.TTreeNav}__icon-container`);
        let icon = architect.createIcon();
        icon.setProps({
          preserveDefaults: !this.overrideDefaults,
          icon: this.open ? this.openedIcon : this.closedIcon,
          containerClass: this.controlIconClass
        });
        iconContainer.addChild(icon);
        link.addChild(iconContainer);
      }
      architect.addChild(link);
    },
    /**
     * Creates the tree children
     * @param architect
     */
    createChildren(architect) {
      let expand = architect.createElement(TExpand);
      if (this.isFolder && this.open) {
        let children = architect.createDiv(this.getChildrenClasses);
        children.setRef("children");

        let ul = architect.createUl();
        let css = new CssArchitect();
        css.addStyle("margin-top", 0);
        ul.setStyles(css.getStyles());

        for (let index in this.model.children) {
          let child = this.model.children[index];
          let treeNav = architect.createElement("t-tree-nav", `${ComponentNames.TTreeNav}__item`);
          treeNav.setKey(`${this.id}-${index}`);
          treeNav.setProps({
            model: child,
            tagClass: this.tagClass,
            iconClass: this.iconClass,
            linkClass: this.linkClass,
            linkOpenedClass: this.linkOpenedClass,
            controlIconClass: this.controlIconClass
          });
          ul.addChild(treeNav);
        }
        children.addChild(ul);
        expand.addChild(children);
      }
      architect.addChild(expand);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "li", this.getClasses);
    root.setId(this.id);
    root.setRef("container");
    this.createIcon(root);
    this.createLink(root);
    this.createChildren(root);
    return root.create();
  }
};
