import helpers from "../../mixins/helpers";
import tree from "../../mixins/tree";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import {ComponentNames} from "../../utils/constants";

import TTreeNav from "./TTreeNav";

import CssArchitect from "../../utils/css-architect";
import {createDiv} from "../../utils/element-architect";

export default {
  name: ComponentNames.TTreeView,
  components: { TTreeNav },
  mixins: [common, tree, icons, helpers],
  props: {
    model: {
      type: Array,
      required: true
    },
    containerClass: {
      type: String
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the main container
     * @returns { A String with the chained css classes }
     */
    getContainerClasses: function() {
      const cssArchitect = new CssArchitect(ComponentNames.TTreeView);
      cssArchitect
        .flexible({ direction: "column", alignItems: "stretch" })
        .isFullheight();
      cssArchitect.addClass(
        this.containerClass,
        this.containerClass !== undefined
      );
      cssArchitect.addClass("is-nav-opened", this.isOpen);
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass(this.getHelpersModifiers);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for each item icon
     * @returns { A String with the chained css classes }
     */
    getIconClass: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(this.iconClass, this.iconClass !== undefined);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for each item link
     * @returns { A String with the chained css classes }
     */
    getLinkClass: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(this.linkClass, this.linkClass !== undefined);
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {
      parentProps: this.$parent.$props
    };
  },
  methods: {
    /**
     * Creates the tree items
     * @param architect
     */
    createItems(architect) {
      let treeItems = architect.createUl(`${ComponentNames.TTreeView}__list`);
      let css = new CssArchitect();
      css.addStyle("margin-top", 0);
      treeItems.setStyles(css.getStyles());
      for (let index in this.model) {
        let item = this.model[index];

        let treeItem = architect.createElement(TTreeNav, `${ComponentNames.TTreeNav}__item`);
        treeItem.setKey(`${this.id}${index}`);
        treeItem.setProps({
          model: item,
          tagClass: this.tagClass,
          iconClass: this.getIconClass,
          linkClass: this.getLinkClass,
          openedIcon: this.openedIcon,
          cloedIcon: this.cloedIcon,
          iconLib: this.iconLib,
          overrideDefaults: this.overrideDefaults
        });

        treeItems.addChild(treeItem);
      }
      architect.addChild(treeItems);
    }
  },
  render: function(h) {
    let root = createDiv(h, this.getContainerClasses);
    root.setId(this.id);
    root.setKey(`${this.id}-tree-view-container`);

    let treeEl = root.createDiv(ComponentNames.TTreeView);
    this.createItems(treeEl);
    root.addChild(treeEl);
    return root.create();
  }
};
