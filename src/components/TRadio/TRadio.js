import inputs from "../../mixins/inputs";
import {ComponentNames} from "../../utils/constants";

import CssArchitect from "../../utils/css-architect";
import { createDiv } from "../../utils/element-architect";

export default {
  name: ComponentNames.TRadio,
  mixins: [inputs],
  props: {
    value: {
      type: [String, Number, Object]
    },
    items: {
      type: Array
    },
    labelLeft: {
      type: Boolean
    },
    centered: {
      type: Boolean
    },
    noLabel: {
      type: Boolean
    },
    solid: {
      type: Boolean
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the field div
     * @returns { A String with the chained css classes }
     */
    getContainerClass: function() {
      const css = new CssArchitect("group");
      css.flexible({ flexWrap: true });
      css.addClass(this.containerClass, this.containerClass !== undefined);
      css.addClass("is-horizontal", this.isHorizontal);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TRadio}__input`);
      css.addClass(
        this.targetClass,
        this.isNotNull(this.targetClass) && this.errors.length === 0
      );
      css.addClass("is-centered", this.centered);
      css.addClass(this.getThemeModifiers);
      this.setupThemeModifier(css, true);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the label that emulates the radio element
     * @returns { A String with the chained css classes }
     */
    getRadioLabelCss: function() {
      const css = new CssArchitect();
      if (this.solid) {
        this.alpha(css, { bg: 0.9 });
        this.isFilled(css);
        css.addClass(this.themeModifier, this.hasThemeModifier);
      }
      css.addClass("solid", this.solid);
      css.addClass("no-label", this.noLabel);
      css.addClass(this.getSizesModifiers);
      return css;
    },
    /**
     * Dynamically build the css classes for the checker element
     * @returns { A String with the chained css classes }
     */
    getRadioCheckedClass: function() {
      const css = new CssArchitect();
      if (!this.solid) {
        this.isFilled(css);
        css.addClass(this.themeModifier, this.hasThemeModifier);
      }
      css.addClass("solid", this.solid);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the text label element
     * @returns { A String with the chained css classes }
     */
    getTextLabelClass: function() {
      const css = new CssArchitect(`${ComponentNames.TRadio}__label`);
      css.addClass("is-left", this.labelLeft);
      css.addClass("is-centered", this.centered);
      css.addClass(this.labelClass, this.labelClass !== undefined);
      css.addClass(this.getSizesModifiers);
      return css.getClasses();
    }
  },
  methods: {
    onInput(value) {
      this.validateOnEvent("input");
      this.$emit(this.$thisvui.events.common.input, value);
    },
    onChange(value) {
      this.validateOnEvent("change");
      this.$emit(this.$thisvui.events.common.change, value);
    },
    compare(obj1, obj2) {
      if (!obj1 || !obj2) {
        return false;
      }
      //Loop through properties in object 1
      for (let p in obj1) {
        //Check property exists on both objects
        if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false;

        switch (typeof obj1[p]) {
          //Deep compare objects
          case "object":
            if (!this.compare(obj1[p], obj2[p])) return false;
            break;
          //Compare function code
          case "function":
            if (
              typeof obj2[p] == "undefined" ||
              (p != "compare" && obj1[p].toString() != obj2[p].toString())
            )
              return false;
            break;
          //Compare values
          default:
            if (obj1[p] != obj2[p]) return false;
        }
      }

      //Check object 2 for any extra properties
      for (let p in obj2) {
        if (typeof obj1[p] == "undefined") return false;
      }
      return true;
    },
    /**
     * Creates the radio container section
     */
    createRadioContainer(architect, id, item) {
      let container = architect.createDiv(`${ComponentNames.TRadio}__container`);
      this.createTextLabel(container, item, this.labelLeft);
      this.createRadio(container, id, item);
      this.createRadioLabel(container, id);
      this.createTextLabel(container, item, !this.labelLeft);
      architect.addChild(container);
    },
    /**
     * Creates the radio inputs
     */
    createRadio(architect, id, item) {
      let input = architect.createInput(this.getClasses);
      input.setId(id);
      input.setKey(id);
      let inputAttrs = {
        placeholder: this.placeholder,
        value: item.value,
        checked: item.checked || this.compare(this.value, item),
        name: this.id,
        disabled: this.disabled,
        validationScope: this.validationScope,
        readonly: this.readonly,
        rows: this.rows,
        cols: this.cols,
        min: this.min,
        max: this.max,
        type: "radio"
      };
      input.value(item.value);
      input.setAttrs(inputAttrs);
      input.addEvent("change", () => {
        this.onChange(item);
      });
      input.addEvent("input", () => {
        this.onInput(item);
      });
      input.addEvent("blur", this.onBlur);
      architect.addChild(input);
    },
    /**
     * Creates the field label section
     */
    createRadioLabel(architect, id) {
      let label = architect.createLabel();
      label.addClass(
        this.getRadioLabelCss.getClasses(),
        this.isNotEmpty(this.getRadioLabelCss.getClasses())
      );
      if (this.isNotEmpty(this.getRadioLabelCss.getClasses())) {
        label.setStyles(this.getRadioLabelCss.getStyles());
      }
      label.addAttr("for", id);
      let checked = architect.createSpan(this.getRadioCheckedClass);
      label.addChild(checked);
      architect.addChild(label);
    },
    /**
     * Creates the field label section
     */
    createTextLabel(architect, item, condition = false) {
      if (item.label && condition) {
        let label = architect.createSpan(this.getTextLabelClass);
        label.addDomProp("innerHTML", item.label);
        architect.addChild(label);
      }
    }
  },
  render: function(h) {
    let root = createDiv(h, this.getContainerClass);

    for (let index in this.items) {
      let item = this.items[index];
      this.createRadioContainer(root, `${this.id}${index}`, item);
    }

    return root.create();
  },
  beforeMount() {
    this.complexValidation = true;
  }
};
