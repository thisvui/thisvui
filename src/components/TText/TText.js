import utils from "../../utils/utils";

import helpers from "../../mixins/helpers";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import TIcon from "../TIcon/TIcon";
import dimension from "../../mixins/dimension";
import flex from "../../mixins/flex";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-text",
  components: { TIcon },
  mixins: [common, helpers, icons, dimension, flex],
  props: {
    name: {
      type: String
    },
    label: {
      type: String
    },
    labelClass: {
      type: String,
      default: "has-text-left"
    },
    value: {
      type: [String, Number]
    },
    valueClass: {
      type: String,
      default: "has-text-left"
    },
    icon: {
      type: String
    },
    iconRight: {
      type: Boolean,
      default: false
    },
    iconClass: {
      type: String
    },
    labelIcon: {
      type: String
    },
    labelIconRight: {
      type: Boolean,
      default: false
    },
    labelIconClass: {
      type: String
    },
    containerClass: {
      type: String
    },
    transform: {
      type: String
    },
    transformValue: {
      type: Boolean,
      default: true
    },
    center: {
      type: Boolean,
      default: false
    },
    bold: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the container element
     * @returns { A String with the chained css classes }
     */
    getContainerClasses: function() {
      const cssArchitect = new CssArchitect("t-text");
      cssArchitect.isFlexible("row", "start", "normal", false, "normal");
      cssArchitect.addClass(
        this.containerClass,
        this.containerClass !== undefined
      );
      cssArchitect.addClass("is-centered", this.center);
      cssArchitect.addClass("has-text-weight-bold", this.bold);
      cssArchitect.addClass(this.getHelpersModifiers);
      cssArchitect.addClass(this.getDimensionModifiers);
      cssArchitect.addClass(this.getFlexModifiers);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the label element
     * @returns { A String with the chained css classes }
     */
    getLabelClass: function() {
      const cssArchitect = new CssArchitect("t-text-label");
      cssArchitect.addClass(this.labelClass, this.labelClass !== undefined);
      cssArchitect.addClass("is-inline-flex", this.labelIcon !== undefined);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the value element
     * @returns { A String with the chained css classes }
     */
    getValueClass: function() {
      const cssArchitect = new CssArchitect("t-text-value");
      cssArchitect.addClass(this.valueClass, this.valueClass !== undefined);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the icon element
     * @returns { A String with the chained css classes }
     */
    getIconClass: function() {
      const cssArchitect = new CssArchitect(
        "icon is-small is-left is-inline-flex"
      );
      cssArchitect.addClass(this.iconClass, this.iconClass !== undefined);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the label icon element
     * @returns { A String with the chained css classes }
     */
    getLabelIconClass: function() {
      const cssArchitect = new CssArchitect("is-small is-left is-inline-flex");
      cssArchitect.addClass(
        this.labelIconClass,
        this.labelIconClass !== undefined
      );
      return cssArchitect.getClasses();
    },
    /**
     * Maps and returns the corresponding css transform class
     * @returns { A String }
     */
    getTransformClass: function() {
      let transformClass = "";
      if (utils.check.notEmpty(this.transform)) {
        switch (this.transform) {
          case "uppercase":
            transformClass = " is-uppercase";
            break;
          case "lowercase":
            transformClass = " is-lowercase";
            break;
          case "capitalize":
            transformClass = " is-capitalized";
            break;
          default:
            transformClass = "undefined";
            break;
        }
      }
      return transformClass;
    }
  },
  methods: {
    /**
     * Creates the icon
     */
    createIcons(architect, createStateIcon = true) {
      // Creating the icon for the input
      if (this.icon) {
        let inputIcon = architect.createIcon(this.getIconClass);
        inputIcon.addProp("icon", this.icon);
        architect.addChild(inputIcon, this.icon);
      }

      // Creating the icon to display when validation passed
      if (this.showValidStateIcon && !this.hideStateIcon && createStateIcon) {
        let inputIconRight = architect.createIcon(this.getValidStateIconClass);
        inputIconRight.addProp("icon", this.$thisvui.icons.check);
        inputIconRight.addProp("preserveDefaults", !this.overrideDefaults);
        architect.addChild(inputIconRight);
      }
    },
    /**
     * Creates the label icon
     */
    createIcon(architect, classses, conditionStatement) {
      if (conditionStatement) {
        let labelIconContainer = architect.createIcon(this.getLabelIconClass);
        let labelIcon = architect.createIcon();
        labelIcon.addProp("icon", this.labelIcon);
        labelIconContainer.addChild(labelIcon);
        architect.addChild(labelIconContainer, labelIcon);
      }
    },
    /**
     * Creates the label
     */
    createLabel(architect) {
      if (this.label) {
        let labelContainer = architect.createDiv("has-text-weight-normal");
        this.createIcon(
          labelContainer,
          this.getLabelIconClass,
          this.labelIcon && !this.labelIconRight
        );
        let label = architect.createSpan(this.getLabelClass);
        label.innerHTML(this.label);
        labelContainer.addChild(label);
        this.createIcon(
          labelContainer,
          this.getLabelIconClass,
          this.labelIcon && this.labelIconRight
        );
        architect.addChild(labelContainer);
      }
    },
    /**
     * Creates the Value
     */
    createValue(architect) {
      if (this.value) {
        let valueContainer = architect.createDiv("has-text-weight-normal");
        this.createIcon(
          valueContainer,
          this.getIconClass,
          this.icon && !this.iconRight
        );
        let value = architect.createSpan(this.getValueClass);
        value.innerHTML(this.value);
        valueContainer.addChild(value);
        this.createIcon(
          valueContainer,
          this.getIconClass,
          this.icon && this.iconRight
        );
        architect.addChild(valueContainer);
      }
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getContainerClasses);
    root.setId(this.id);
    this.createLabel(root);
    this.createValue(root);
    return root.create();
  }
};
