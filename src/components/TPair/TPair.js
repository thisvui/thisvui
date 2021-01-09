import helpers from "../../mixins/helpers";
import common from "../../mixins/common";
import icons from "../../mixins/icons";
import { ComponentNames } from "../../utils/constants";
import TIcon from "../TIcon/TIcon";
import dimension from "../../mixins/dimension";
import flex from "../../mixins/flex";
import alignment from "../../mixins/alignment";

import CssArchitect from "../../utils/css-architect";
import { createDiv } from "../../utils/element-architect";

export default {
  name: ComponentNames.TPair,
  components: { TIcon },
  mixins: [common, helpers, icons, alignment, dimension, flex],
  props: {
    name: {
      type: String
    },
    label: {
      type: String
    },
    labelClass: {
      type: String,
      default: "text-left"
    },
    value: {
      type: [String, Number]
    },
    valueClass: {
      type: String,
      default: "text-left"
    },
    valueSpan: {
      type: [String, Number]
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
    transformLabel: {
      type: String
    },
    transformValue: {
      type: String
    },
    lowercase: {
      type: Boolean,
      default: false
    },
    uppercase: {
      type: Boolean,
      default: false
    },
    capitalized: {
      type: Boolean,
      default: false
    },
    bold: {
      type: Boolean,
      default: false
    },
    boldLabel: {
      type: Boolean,
      default: false
    },
    boldValue: {
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
      const cssArchitect = new CssArchitect(ComponentNames.TPair);
      cssArchitect.addClass(
        this.containerClass,
        this.containerClass !== undefined
      );
      cssArchitect.addClass("text-lowercase", this.lowercase);
      cssArchitect.addClass("text-uppercase", this.uppercase);
      cssArchitect.addClass("text-capitalized", this.capitalized);
      cssArchitect.addClass("font-weight-bold", this.bold);
      cssArchitect.addClass(this.getHelpersModifiers);
      cssArchitect.addClass(this.getDimensionModifiers);
      cssArchitect.addClass(this.getFlexModifiers);
      cssArchitect.addClass(this.getAlignmentModifiers);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the label element
     * @returns { A String with the chained css classes }
     */
    getLabelClass: function() {
      const cssArchitect = new CssArchitect(`${ComponentNames.TPair}__label`);
      cssArchitect.addClass(this.labelClass, this.isNotNull(this.labelClass));
      cssArchitect.addClass("is-inline-flex", this.isNotNull(this.labelIcon));
      cssArchitect.addClass("font-weight-bold", this.boldLabel);
      cssArchitect.addClass(
        `is-${this.transformLabel}`,
        this.isNotNull(this.transformLabel)
      );
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the value element
     * @returns { A String with the chained css classes }
     */
    getValueClass: function() {
      const cssArchitect = new CssArchitect(`${ComponentNames.TPair}__value`);
      cssArchitect.addClass(this.valueClass, this.isNotNull(this.valueClass));
      cssArchitect.addClass("font-weight-bold", this.boldValue);
      cssArchitect.addClass(
        `is-${this.transformValue}`,
        this.isNotNull(this.transformValue)
      );
      return cssArchitect.getClasses();
    },
    getValueStyle() {
      const css = new CssArchitect();
      css.addStyle(
        "--value-span",
        parseInt(this.valueSpan),
        this.isNotNull(this.valueSpan)
      );
      return css.getStyles();
    },
    /**
     * Dynamically build the css classes for the icon element
     * @returns { A String with the chained css classes }
     */
    getIconClass: function() {
      const cssArchitect = new CssArchitect("is-small is-left is-inline-flex");
      cssArchitect.addClass(this.iconClass, this.isNotNull(this.iconClass));
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
    }
  },
  methods: {
    /**
     * Creates the label icon
     */
    createIcon(architect, $icon, classes, conditionStatement) {
      if ($icon && conditionStatement) {
        let iconContainer = architect.createDiv(classes);
        let icon = architect.createIcon();
        icon.addProp("icon", $icon);
        iconContainer.addChild(icon);
        architect.addChild(iconContainer, icon);
      }
    },
    /**
     * Creates the label
     */
    createLabel(architect) {
      if (this.label) {
        let labelContainer = architect.createElement("dt");
        this.createIcon(
          labelContainer,
          this.labelIcon,
          this.getLabelIconClass,
          !this.labelIconRight
        );
        let label = architect.createSpan(this.getLabelClass);
        label.innerHTML(this.label);
        labelContainer.addChild(label);
        this.createIcon(
          labelContainer,
          this.labelIcon,
          this.getLabelIconClass,
          this.labelIconRight
        );
        architect.addChild(labelContainer);
      }
    },
    /**
     * Creates the Value
     */
    createValue(architect) {
      if (this.value) {
        let valueContainer = architect.createElement("dd");
        valueContainer.setStyles(this.getValueStyle);
        this.createIcon(
          valueContainer,
          this.icon,
          this.getIconClass,
          !this.iconRight
        );
        let value = architect.createSpan(this.getValueClass);
        value.innerHTML(this.value);
        valueContainer.addChild(value);

        this.createIcon(
          valueContainer,
          this.icon,
          this.getIconClass,
          this.iconRight
        );
        architect.addChild(valueContainer);
      } else if (this.$slots["value"]) {
        let valueContainer = architect.createElement("dd");
        valueContainer.setStyles(this.getValueStyle);
        valueContainer.setChildren(this.$slots["value"]);
        architect.addChild(valueContainer);
      }
    }
  },
  render: function(h) {
    let root = createDiv(h, this.getContainerClasses);
    root.setId(this.id);
    root.setKey(`${this.id}-pair`);
    this.createLabel(root);
    this.createValue(root);
    return root.create();
  }
};
