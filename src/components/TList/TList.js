import TPaginator from "../TPaginator/TPaginator";
import list from "../../mixins/list";
import responsive from "../../mixins/responsive";
import dimension from "../../mixins/dimension";
import common from "../../mixins/common";
import TProgress from "../TProgress/TProgress";
import TListItem from "./TListItem";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-list",
  components: { TPaginator },
  mixins: [common, list, responsive, dimension],
  filters: {
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  },
  props: {
    header: {
      type: String
    },
    headerClass: {
      type: String
    },
    showHeader: {
      type: Boolean,
      default: false
    },
    isResponsive: {
      type: Boolean,
      default: true
    },
    isFullwidth: {
      type: Boolean,
      default: true
    },
    compact: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.isRelative();
      cssArchitect.addClass(this.getResponsiveModifiers);
      cssArchitect.addClass(this.getDimensionModifiers);
      cssArchitect.addClass(this.getHelpersModifiers);
      cssArchitect.addClass("is-compact", this.compact);
      return cssArchitect.getClasses();
    },
    getHeaderClasses: function() {
      const cssArchitect = new CssArchitect("t-list-header");
      cssArchitect.addClass(this.headerClass, this.headerClass !== undefined);
      return cssArchitect.getClasses();
    },
    hasHeader: function() {
      return this.showHeader || this.header;
    }
  },
  methods: {
    createHeader(architect) {
      if (this.hasHeader) {
        let header = architect.createDiv(this.getHeaderClasses);
        if (this.checkable) {
          this.createCheckAll(header, this.getCheckAllClasses);
        }

        if (this.header) {
          let text = architect.createH(2);
          text.innerHTML(this.header);
          header.addChild(text);
        }
        if (this.$slots["header"]) {
          let slotHeader = architect
            .createSpan()
            .setChildren(this.$slots["header"]);
          header.addChild(slotHeader);
        }
        architect.addChild(header);
      }
    },
    createList(architect) {
      let ul = architect.createUl(this.getClasses);
      let transition = architect.createTransition("fade");
      if (this.isLoading) {
        let loading = architect.createDiv("t-loading-block is-absolute");
        let progress = architect
          .createElement(TProgress)
          .setProps({ indeterminate: true, compact: true });
        let block = architect.createDiv("t-loading-block-ui is-absolute");
        loading.addChild(progress);
        loading.addChild(block);
        transition.addChild(loading);
      }
      this.createLoading(ul);
      ul.addChild(transition);

      for (let index in this.getItems) {
        let item = this.getItems[index];
        let li = architect.createLi().setKey(`${this.id}-li-${index}`);
        if (this.isCheckable(item)) {
          let listItem = architect.createElement(TListItem);
          this.createRowChecker(li, item, {
            inputClass: this.getRowCheckerClasses,
            container: listItem
          });
        }
        li.addChildren(
          this.$scopedSlots["items"]({
            item: item,
            index: index
          })
        );
        ul.addChild(li);
      }

      architect.addChild(ul);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", "t-list-container");

    this.createSearch(root);
    this.createPaginator(root, this.isPaginated && this.isPaginatorAtTop);
    this.createHeader(root);
    this.createList(root);
    this.createPaginator(root, this.isPaginated && !this.isPaginatorAtTop);

    return root.create();
  }
};
