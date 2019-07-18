import helpers from "../../mixins/helpers";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import TPanelHeading from "./TPanelHeading";
import TExpand from "../TAnimation/TExpand";
import colors from "../../mixins/colors";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-panel",
  mixins: [common, colors, icons, helpers],
  components: { TExpand, TPanelHeading },
  props: {
    title: {
      type: String
    },
    expandable: {
      type: Boolean,
      default: false
    },
    expanded: {
      type: Boolean,
      default: true
    },
    headingClass: {
      type: String
    },
    headingIcon: {
      type: String
    },
    headingIconClass: {
      type: String
    },
    collapsedHeadingIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.collapse;
      }
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("panel");
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(this.getHelpersModifiers);
      this.setupColorModifier(cssArchitect);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the panel body
     * @returns { A String with the chained css classes }
     */
    getBodyClasses: function() {
      const cssArchitect = new CssArchitect("panel-body");
      cssArchitect.addClass("is-closed is-shadowless", !this.isExpanded);
      this.colorize(cssArchitect, "border", true);
      cssArchitect.addClass(this.colorModifier, this.hasColorModifier);
      return cssArchitect.getClasses();
    }
  },
  watch: {
    expanded: function(value, oldValue) {
      this.toggleExpanded(value);
    }
  },
  data() {
    return {
      isExpanded: this.expanded,
      icon: this.headingIcon
    };
  },
  methods: {
    /**
     * Expands or collapse the panel dynamically
     */
    toggleExpanded(expanded) {
      this.isExpanded = expanded ? expanded : !this.isExpanded;
      this.icon =
        this.headingIcon !== undefined && this.isExpanded
          ? this.headingIcon
          : this.headingIcon !== undefined && !this.isExpanded
          ? this.collapsedHeadingIcon
          : undefined;
      this.$emit(this.$thisvui.events.panel.updateExpanded, this.isExpanded);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getClasses);
    root.setId(this.id);

    if (this.title) {
      let heading = root.createElement(TPanelHeading, this.headingClass);
      heading.setProps({
        iconLib: this.iconLib,
        overrideDefaults: this.overrideDefaults,
        headingText: this.title,
        headingIcon: this.icon,
        headingIconClass: this.headingIconClass
      });
      root.addClick(() => this.toggleExpanded(), this.expandable);
      root.addChild(heading);
    }

    let expand = root.createElement(TExpand);
    let body = root.createDiv(this.getBodyClasses);
    let content = root.createDiv("panel-content");

    content.setChildren(this.$slots.default);
    body.addChild(content);
    expand.addChild(body, this.isExpanded);
    root.addChild(expand);
    return root.create();
  },
  mounted() {
    this.includeBgModifiers = false;
  }
};