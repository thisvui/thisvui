import helpers from "../../mixins/helpers";
import icons from "../../mixins/icons";
import { ComponentNames } from "../../utils/constants";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: ComponentNames.TPaginatorControl,
  mixins: [helpers, icons],
  props: {
    showText: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    containerClass: {
      type: String
    },
    btnClass: {
      type: String
    },
    text: {
      type: String,
      default: "Previous"
    },
    icon: {
      type: String
    },
    iconClass: {
      type: String,
      default: "is-size-5"
    },
    iconTooltip: {
      type: String
    },
    iconTooltipClass: {
      type: String
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the container element
     * @returns { A String with the chained css classes }
     */
    getContainerClass() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(
        this.containerClass,
        this.containerClass !== undefined
      );
      cssArchitect.addClass(this.getHelpersModifiers);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the icon element
     * @returns { A String with the chained css classes }
     */
    getIconClass() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(this.iconClass, this.iconClass !== undefined);
      return cssArchitect.getClasses();
    }
  },
  methods: {
    onClick() {
      this.$emit(this.$thisvui.events.common.click);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "span", this.getContainerClass);
    root.setId(this.id);

    // Creating the button element
    let button = root.createButton(this.btnClass);
    let buttonProps = {
      text: true,
      disabled: this.disabled,
      paddingless: true,
      marginless: true
    };
    button.setProps(buttonProps);
    button.addEvent("click", this.onClick);

    // Creating the icon element
    let icon = root.createIcon(this.getIconClass);
    let iconProps = {
      preserveDefaults: !this.overrideDefaults,
      icon: this.icon,
      dataTooltip: this.iconTooltip,
      tooltipClass: this.iconTooltipClass
    };
    icon.setProps(iconProps);
    // Creating the text element
    let text = root.createSpan();
    text.addDomProp("innerHTML", this.text);

    button.addChild(icon, this.icon);
    button.addChild(text, this.showText);
    root.addChild(button);
    return root.create();
  }
};
