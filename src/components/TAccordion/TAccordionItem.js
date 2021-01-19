import helper from "../../mixins/helpers";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import TExpand from "../TAnimation/TExpand";
import TIcon from "../TIcon/TIcon";
import themes from "../../mixins/themes";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";
import { ComponentNames } from "../../utils/constants";

export default {
  name: ComponentNames.TAccordionItem,
  components: { TIcon, TExpand },
  mixins: [common, icons, helper, themes],
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
    iconClass: {
      type: String
    },
    icon: {
      type: String
    },
    collapsedIcon: {
      type: String
    },
    iconLeft: {
      type: Boolean
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
      const css = new CssArchitect(`${ComponentNames.TAccordion}__item`);
      css.addClass(this.getColorClasses);
      css.addClass(this.getSizesModifiers);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the header element
     * @returns { A String with the chained css classes }
     */
    getHeaderClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TAccordion}__heading`);
      css.addClass("icon-left", this.iconLeft);
      css.addClass("item-opened", this.isItemOpen);
      this.isFilled(css);
      this.isBordered(css);
      css.addClass(this.getColorClasses);
      css.addClass(this.headerClass, this.headerClass);
      return css.getClasses();
    },
    getColorClasses: function() {
      const css = new CssArchitect();
      css.addClass(this.getThemeModifiers);
      css.addClass(this.targetClass, this.targetClass !== undefined);
      this.setupThemeModifier(css);
      css.addClass(
        "is-primary",
        !this.$parent.hasThemeModifier && !this.hasThemeModifier
      );
      css.addClass(
        this.$parent.themeModifier,
        this.$parent.hasThemeModifier && !this.hasThemeModifier
      );
      this.setupThemeModifier(css);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the body element
     * @returns { A String with the chained css classes }
     */
    getBodyClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TAccordion}__body`);
      css.addClass(this.bodyClass, this.bodyClass);
      css.addClass("is-closed", !this.isItemOpen);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the icon container element
     * @returns { A String with the chained css classes }
     */
    getIconClasses: function() {
      const css = new CssArchitect();
      css.addClass(this.iconClass, this.isNotNull(this.iconClass));
      css.addClass("is-primary", !this.hasThemeModifier);
      css.addClass(this.themeModifier, this.hasThemeModifier);
      css.addClass("inverted");
      return css.getClasses();
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
      this.itemIcon = this.isItemOpen ? this.getIcon : this.getCollapsedIcon;
    },
    /**
     * Open or close the accordion item and triggers and event for closing inactive items
     */
    toggleOpen() {
      this.isItemOpen = !this.isItemOpen;
      if (this.isItemOpen) {
        this.$parent.$emit("close-others", this.id);
      }
    },
    createHeadingIcon(architect, condition) {
      if (this.getShowIcon && condition) {
        let icon = architect.createIcon(this.getIconClasses);
        icon.setProps({
          icon: this.itemIcon,
          iconLib: this.iconLib,
          preserveDefaults: !this.overrideDefaults
        });
        architect.addChild(icon);
      }
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "article", this.getClasses);
    root.setId(this.id);

    let header = root.createDiv(this.getHeaderClasses);
    header.addEvent("click", this.toggleOpen);

    let title = root.createSpan(`${ComponentNames.TAccordion}__heading__text`);
    title.addDomProp("innerHTML", this.title);

    this.createHeadingIcon(header, this.iconLeft);
    header.addChild(title);
    this.createHeadingIcon(header, !this.iconLeft);

    let body = root.createDiv(this.getBodyClasses);
    let content = root.createElement(TExpand);
    content.setProps({
      expanded: this.isItemOpen,
      containerClass: `${ComponentNames.TAccordion}__content`
    });
    let contentBody = root.createDiv(
      `${ComponentNames.TAccordion}__content__body`
    );
    contentBody.setChildren(this.$slots.default);
    content.addChild(contentBody);
    body.addChild(content);

    root.addChild(header);
    root.addChild(body);
    return root.create();
  },
  mounted() {
    this.includeBgModifiers = false;
  }
};
