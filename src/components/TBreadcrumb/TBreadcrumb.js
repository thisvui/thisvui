import alignment from "../../mixins/alignment";
import sizes from "../../mixins/sizes";
import common from "../../mixins/common";
import TImage from "../TImage/TImage";
import TIcon from "../TIcon/TIcon";
import ElementArchitect from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";

export default {
  name: "t-breadcrumb",
  mixins: [common, alignment, sizes],
  components: { TIcon, TImage },
  props: {
    model: {
      type: Array
    },
    hasCustomContent: {
      type: Boolean,
      default: false
    },
    hasArrowSeparator: {
      type: Boolean,
      default: false
    },
    hasBulletSeparator: {
      type: Boolean,
      default: false
    },
    hasDotSeparator: {
      type: Boolean,
      default: false
    },
    hasSucceedsSeparator: {
      type: Boolean,
      default: false
    },
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
      const cssArchitect = new CssArchitect("breadcrumb");
      cssArchitect.addClass(this.getAlignmentModifiers);
      cssArchitect.addClass(this.getSizesModifiers);
      cssArchitect.addClass("has-arrow-separator", this.hasArrowSeparator);
      cssArchitect.addClass("has-bullet-separator", this.hasBulletSeparator);
      cssArchitect.addClass("has-dot-separator", this.hasDotSeparator);
      cssArchitect.addClass(
        "has-succeeds-separator",
        this.hasSucceedsSeparator
      );
      return cssArchitect.getClasses();
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
      if (!this.hasCustomContent) {
        this.toggleActive(name);
        this.$emit(this.$thisvui.events.common.click, name);
      }
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "nav", this.getClasses);
    root.setId(this.id)
    root.addAttr("aria-label", "breadcrumbs");

    if (!this.hasCustomContent) {
      let ul = root.createUl();
      for (let index in this.items) {
        let item = this.items[index];
        let li = root.createLi();
        li.setKey(`breadcrumb-item${index}`);
        li.addClass("is-active", item.isActive);

        let name = root.createSpan();
        name.innerHtml(item.name);

        // Creating the link element. if item.view is present creates a router-link
        let link = root.createElement(
          item.url || (!item.url && !item.view) ? "a" : "router-link"
        );
        link.addAttr("href", item.url, item.url);
        link.addProp("to", { name: item.view }, item.view);
        link.addClick(event => {
          this.onClick(item.name, event);
        });

        // Creating the icon element if present
        if (item.icon) {
          let icon = root.createIcon();
          icon.addProp("icon", item.icon);
          link.addChild(icon);
        }

        link.addChild(name);
        li.addChild(link);
        ul.addChild(li);
      }
      root.addChild(ul);
    } else {
      root.setChildren(this.$slots.default);
    }
    return root.create();
  },
  created() {
    if (!this.hasCustomContent) {
      this.model.forEach(item => {
        item.isActive = false;
        this.items.push(item);
      });
    }
  }
};
