import helpers from "../../mixins/helpers";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import themes from "../../mixins/themes";

import ElementArchitect from "../../utils/element-architect";
import CssArchitect from "../../utils/css-architect";
import { ComponentNames } from "../../utils/constants";

export default {
  name: ComponentNames.TAccordion,
  mixins: [common, icons, themes, helpers],
  props: {
    borderless: {
      type: Boolean
    },
    targetClass: {
      type: String
    },
    iconClass: {
      type: String
    },
    icon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.add;
      }
    },
    collapsedIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.cancel;
      }
    },
    remainOpen: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect(ComponentNames.TAccordion);
      cssArchitect.addClass(this.getThemeModifiers);
      cssArchitect.addClass(this.getHelpersModifiers);
      cssArchitect.addClass("borderless", this.borderless);
      cssArchitect.addClass("elevation-1");
      cssArchitect.addClass(this.targetClass, this.targetClass !== undefined);
      this.setupThemeModifier(cssArchitect);
      return cssArchitect.getClasses();
    }
  },
  data() {
    return {
      items: []
    };
  },
  created() {
    this.items = this.$children;
    this.$on("close-others", id => {
      this.closeInactiveItems(id);
    });
  },
  methods: {
    closeInactiveItems(id) {
      if (!this.remainOpen) {
        this.items.forEach(function(item) {
          item.isItemOpen = item.id === id;
        });
      }
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getClasses);
    root.setId(this.id).setChildren(this.$slots.default);
    return root.create();
  },
  mounted() {
    this.includeBgModifiers = false;
  }
};
