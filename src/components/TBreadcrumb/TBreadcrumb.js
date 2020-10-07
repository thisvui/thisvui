import alignment from "../../mixins/alignment";
import themes from "../../mixins/themes";
import common from "../../mixins/common";
import {ComponentNames} from "../../utils/constants";

import ElementArchitect from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";

export default {
  name: ComponentNames.TBreadcrumb,
  mixins: [common, themes, alignment],
  props: {
    model: {
      type: Array
    },
    custom: Boolean,
    preventUrlNavigation: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      items: []
    };
  },
  computed: {
    /**
     * Build and returns the breadcrumb items
     */
    getItems() {
      let items = [];
      this.model.forEach(item => {
        item.isActive = false;
        items.push(item);
      });
      return items;
    },
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TBreadcrumb}`);
      this.isBordered(css);
      css.addClass(this.getThemeModifiers);
      this.setupThemeModifier(css, true);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the content element
     * @returns { A String with the chained css classes }
     */
    getContentClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TBreadcrumb}__content`);
      css.addClass(this.getAlignmentModifiers);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the list element
     * @returns { A String with the chained css classes }
     */
    getItemsClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TBreadcrumb}__items`);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the number element
     * @returns { A String with the chained css classes }
     */
    getNumberClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TBreadcrumb}__number`);
      this.isFilled(css);
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the icon element
     * @returns { A String with the chained css classes }
     */
    getIconClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TBreadcrumb}__icon`);
      css.addClass(this.themeModifier, this.hasThemeModifier);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the name element
     * @returns { A String with the chained css classes }
     */
    getNameClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TBreadcrumb}__name`);
      return css.getClasses();
    }
  },
  methods: {
    /**
     * Determines which item is active
     */
    toggleActive(name) {
      let items = [];
      this.items.forEach(item => {
        item.isActive = item.name === name;
        items.push(item);
      });
      this.items = items;
    },
    /**
     * Executed when a breadcrumb item is clicked
     */
    onClick(name, event) {
      if (event && this.preventUrlNavigation) {
        event.preventDefault();
      }
      if (!this.custom) {
        this.toggleActive(name);
        this.$emit(this.$thisvui.events.common.click, name);
      }
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getClasses);
    root.setId(this.id);

    let content = root.createDiv(this.getContentClasses);

    if (!this.custom) {
      let ul = root.createUl(this.getItemsClasses);
      for (let index in this.items) {
        let item = this.items[index];
        let li = root.createLi();
        li.setKey(`breadcrumb-item${index}`);
        li.addClass("is-active", item.isActive);

        let name = root.createDiv(this.getNameClasses);
        name.innerHTML(item.name);

        // Creating the link element. if item.view is present creates a router-link
        let link = root.createElement(
          item.url || (!item.url && !item.view) ? "a" : "router-link",
          `${ComponentNames.TBreadcrumb}__item`
        );
        link.addAttr("href", item.url, item.url);
        link.addProp("to", { name: item.view }, item.view);
        link.addClick(event => {
          this.onClick(item.name, event);
        });

        // Creating the icon element if present
        if (item.icon) {
          let icon = root.createIcon(this.getIconClasses);
          icon.addProp("icon", item.icon);
          link.addChild(icon);
        } else {
          // Creating the number element if no icon is present
          let number = root.createDiv(this.getNumberClasses);
          number.innerHTML(parseInt(index) + 1);
          link.addChild(number);
        }

        link.addChild(name);
        li.addChild(link);
        ul.addChild(li);
      }
      content.addChild(ul);
    } else {
      content.setChildren(this.$slots.default);
    }
    root.addChild(content);
    return root.create();
  },
  created() {
    if (!this.custom) {
      this.model.forEach(item => {
        item.isActive = false;
        this.items.push(item);
      });
    }
  }
};
