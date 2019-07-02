import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import TExpand from "../TAnimation/TExpand";
import TLevel from "../TLevel/TLevel";
import TIcon from "../TIcon/TIcon";
import colors from "../../mixins/colors";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-accordion-item",
  components: { TIcon, TLevel, TExpand },
  mixins: [common, icons, helper, colors],
  props: {
    title: {
      type: String
    },
    targetClass: {
      type: String
    },
    headerClass: {
      type: String
    },
    bodyClass: {
      type: String
    },
    iconContainerClass: {
      type: String
    },
    iconClass: {
      type: String
    },
    icon: {
      type: String
    },
    collapseIcon: {
      type: String
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Determines if icon must be shown. Check both the parent and child props
     * @returns { A boolean value }
     */
    getShowIcon: function() {
      let showIcon = this.showIcon
        ? this.showIcon
        : this.parentProps.showIcon
        ? this.parentProps.showIcon
        : false;
      return showIcon;
    },
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect("t-accordion-item");
      cssArchitect.addClass(this.getColorClasses);
      cssArchitect.addClass(this.getSizesModifiers);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the header element
     * @returns { A String with the chained css classes }
     */
    getHeaderClasses: function() {
      const cssArchitect = new CssArchitect("t-accordion-header");
      this.colorize(cssArchitect, "bg-color", true);
      cssArchitect.addClass(this.getColorClasses);
      cssArchitect.addClass(this.headerClass, this.headerClass);
      return cssArchitect.getClasses();
    },
    getColorClasses: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(this.targetClass, this.targetClass !== undefined);
      this.setupColorModifier(cssArchitect);
      cssArchitect.addClass(
        "is-primary",
        !this.$parent.hasColorModifier && !this.hasColorModifier
      );
      cssArchitect.addClass(
        this.$parent.colorModifier,
        this.$parent.hasColorModifier && !this.hasColorModifier
      );
      this.setupColorModifier(cssArchitect);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the body element
     * @returns { A String with the chained css classes }
     */
    getBodyClasses: function() {
      const cssArchitect = new CssArchitect("t-accordion-body");
      cssArchitect.addClass(this.bodyClass, this.bodyClass);
      cssArchitect.addClass("is-closed", !this.isItemOpen);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the icon container element
     * @returns { A String with the chained css classes }
     */
    getIconContainerClasses: function() {
      const cssArchitect = new CssArchitect();
      this.colorize(cssArchitect, "bg", true);
      cssArchitect.addClass(this.getColorClasses);
      cssArchitect.addClass(this.iconContainerClass, this.iconContainerClass);
      return cssArchitect.getClasses();
    },
    /**
     * Returns the icon to be shown. Check both the parent and child props
     */
    getIcon: function() {
      let icon = this.icon
        ? this.icon
        : this.parentProps.icon
        ? this.parentProps.icon
        : false;
      return icon;
    },
    /**
     * Returns the icon to be shown when item is collapsed. Check both the parent and child props
     */
    getCollapsedIcon: function() {
      let icon = this.collapsedIcon
        ? this.collapsedIcon
        : this.parentProps.collapsedIcon
        ? this.parentProps.collapsedIcon
        : false;
      return icon;
    }
  },
  /**
   * Reloads the icon whe the isItemOpen data property changes
   */
  watch: {
    isItemOpen: function(newVal, oldVal) {
      // watch it
      this.loadIcon();
    }
  },
  data() {
    return {
      isItemOpen: this.isOpen,
      parentProps: this.$parent.$props,
      itemIcon: this.icon
    };
  },
  created() {
    this.loadIcon();
  },
  methods: {
    /**
     * Loads the corresponding icon based on child state
     */
    loadIcon() {
      this.itemIcon =
        this.getIcon !== undefined && this.isItemOpen
          ? this.getIcon
          : this.getIcon !== undefined && !this.isItemOpen
          ? this.getCollapsedIcon
          : undefined;
    },
    /**
     * Open or close the accordion item and triggers and event for closing inactive items
     */
    toggleOpen() {
      this.isItemOpen = !this.isItemOpen;
      if (this.isItemOpen) {
        this.$parent.$emit("close-others", this.id);
      }
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "article", this.getClasses);
    root.setId(this.id);

    let header = root.createDiv(this.getHeaderClasses);
    header.addEvent("click", this.toggleOpen);

    let level = root.createElement(TLevel, "is-flex-mobile");
    level.addProp("rightClass", "is-marginless");
    let title = root.createSpan();
    title.addDomProp("innerHTML", this.title);
    let iconContainer = root.createA(this.getIconContainerClasses);
    let icon = root.createIcon(this.iconClass);
    icon.setProps({
      icon: this.itemIcon,
      iconLib: this.iconLib,
      preserveDefaults: !this.overrideDefaults
    });
    iconContainer.addChild(icon);

    title.setSlot("level-left");
    iconContainer.setSlot("level-right", this.getShowIcon);

    level.addChild(title);
    level.addChild(iconContainer, this.getShowIcon);

    header.addChild(level);

    let body = root.createDiv(this.getBodyClasses);
    let expand = root.createElement(TExpand);
    let content = root.createDiv("t-accordion-content");
    let contentBody = root.createDiv("t-accordion-content-body");
    contentBody.setChildren(this.$slots.default);
    content.addChild(contentBody);
    expand.addChild(content, this.isItemOpen);
    body.addChild(expand);

    root.addChild(header);
    root.addChild(body);
    return root.create();
  },
  mounted() {
    this.includeBgModifiers = false;
  }
};
