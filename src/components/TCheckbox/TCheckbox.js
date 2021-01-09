import inputs from "../../mixins/inputs";
import { ComponentNames } from "../../utils/constants";

import CssArchitect from "../../utils/css-architect";
import { createDiv } from "../../utils/element-architect";

export default {
  name: ComponentNames.TCheckbox,
  mixins: [inputs],
  props: {
    value: {
      type: Boolean
    },
    circular: {
      type: Boolean,
      default: false
    },
    labelLeft: {
      type: Boolean
    },
    noLabel: {
      type: Boolean
    },
    solid: {
      type: Boolean
    },
    switch: {
      type: Boolean
    },
    checkedIcon: {
      type: String,
      default: function() {
        return this.$thisvui.icons.check;
      }
    }
  },
  watch: {
    value: function(newVal, oldVal) {
      this.$refs.inputField.checked = newVal;
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const css = new CssArchitect(`${ComponentNames.TCheckbox}__input`);
      css.addClass(
        this.targetClass,
        this.isNotNull(this.targetClass) && this.errors.length === 0
      );
      css.addClass("circular", this.circular);
      css.addClass(this.getThemeModifiers);
      this.setupThemeModifier(css, true);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the label that emulates the radio element
     * @returns { A String with the chained css classes }
     */
    getCheckboxLabelCss: function() {
      const css = new CssArchitect();
      if (this.solid) {
        this.alpha(css, { bg: 0.9 });
        this.isFilled(css);
        css.addClass(this.themeModifier, this.hasThemeModifier);
      } else {
        this.isBordered(css);
      }
      css.addClass("solid", this.solid);
      css.addClass("circular", this.circular);
      css.addClass("no-label", this.noLabel);
      css.addClass("switch", this.switch);
      css.addClass(this.getSizesModifiers);
      return css;
    },
    /**
     * Dynamically build the css classes for the checker element
     * @returns { A String with the chained css classes }
     */
    getCheckboxCheckedCss: function() {
      const css = new CssArchitect();
      if (this.switch) {
        this.alpha(css, { bg: 0.9 });
        this.isFilled(css);
        css.addClass(this.themeModifier, this.hasThemeModifier);
      }
      css.addClass("circular", this.circular);
      css.addClass("switch", this.switch);
      return css;
    },
    /**
     * Dynamically build the css classes for the checker icon element
     * @returns { A String with the chained css classes }
     */
    getCheckedIconClass: function() {
      const css = new CssArchitect();
      css.addClass(this.themeModifier, this.hasThemeModifier);
      css.addClass("inverted", this.solid);
      css.addClass("switch", this.switch);
      return css.getClasses();
    },
    /**
     * Dynamically build the css classes for the text label element
     * @returns { A String with the chained css classes }
     */
    getTextLabelClass: function() {
      const css = new CssArchitect(`${ComponentNames.TRadio}__label`);
      css.addClass("is-left", this.labelLeft);
      css.addClass(this.labelClass, this.labelClass !== undefined);
      css.addClass(this.getSizesModifiers);
      return css.getClasses();
    }
  },
  methods: {
    onInput() {
      let value = this.$refs.inputField.checked;
      this.validateOnEvent("input");
      this.onChange();
      this.$emit(this.$thisvui.events.common.input, value);
    },
    /**
     * Creates the checkbox input section
     */
    createCheckbox(architect) {
      let input = architect.createInput(this.getClasses);
      input.setId(this.id);
      let inputAttrs = {
        placeholder: this.placeholder,
        value: this.value,
        disabled: this.disabled,
        validationScope: this.validationScope,
        readonly: this.readonly,
        rows: this.rows,
        cols: this.cols,
        min: this.min,
        max: this.max,
        type: "checkbox"
      };
      input.value(this.value);
      input.setAttrs(inputAttrs);
      input.setRef("inputField");
      input.addEvent("change", this.onInput);
      input.addEvent("input", this.onInput);
      input.addEvent("blur", this.onBlur);
      architect.addChild(input);
    },
    /**
     * Creates the field label section
     */
    createCheckboxlabel(architect) {
      let label = architect.createLabel();
      label.addClass(
        this.getCheckboxLabelCss.getClasses(),
        this.isNotEmpty(this.getCheckboxLabelCss.getClasses())
      );
      if (this.isNotEmpty(this.getCheckboxLabelCss.getClasses())) {
        label.setStyles(this.getCheckboxLabelCss.getStyles());
      }
      label.addAttr("for", this.id);
      let checked = architect.createSpan(
        this.getCheckboxCheckedCss.getClasses()
      );
      this.createIcon(checked, !this.switch);
      label.addChild(checked);
      architect.addChild(label);
    },
    /**
     * Creates the label icon
     */
    createIcon(architect, condition = true) {
      if (condition) {
        let icon = architect.createIcon(this.getCheckedIconClass);
        icon.addProp("icon", this.checkedIcon);
        architect.addChild(icon);
      }
    },
    /**
     * Creates the field label section
     */
    createTextLabel(architect, condition = false) {
      if (this.label && condition) {
        let label = architect.createSpan(this.getTextLabelClass);
        label.addDomProp("innerHTML", this.label);
        architect.addChild(label);
      }
    }
  },
  render: function(h) {
    let root = createDiv(h, this.getContainerClass);

    this.createTextLabel(root, this.labelLeft);
    this.createCheckbox(root);
    this.createCheckboxlabel(root);
    this.createTextLabel(root, !this.labelLeft);

    return root.create();
  },
  mounted() {
    this.$nextTick(function() {
      this.$refs.inputField.checked = this.value;
    });
  }
};
