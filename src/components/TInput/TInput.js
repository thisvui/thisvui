import inputs from "../../mixins/inputs";
import { ComponentNames } from "../../utils/constants";
import { createDiv } from "../../utils/element-architect";

import utils from "../../utils/utils";

export default {
  name: ComponentNames.TInput,
  mixins: [inputs],
  props: {
    value: {
      type: [String, Number]
    },
    type: {
      type: String,
      default: "text"
    }
  },
  computed: {
    formattedValue: {
      get: function() {
        if (!this.mask || !this.value) {
          return this.value;
        }
        if (this.focused) {
          return this.numeric
            ? parseFloat(this.value.toString())
            : this.value.toString();
        } else {
          // Format display value when user is not modifying
          return utils.number.format(parseFloat(this.value), {
            thousandsSeparator: this.thousandsSeparator,
            decimalSeparator: this.decimalSeparator
          });
        }
      },
      set: function(modifiedValue) {
        if (!this.mask) {
          return modifiedValue;
        }
        // Recalculate value removing special characters
        let newValue = parseFloat(utils.number.unFormat(modifiedValue));
        // Ensure that it is not NaN
        if (isNaN(newValue)) {
          newValue = 0;
        }
        this.$emit(this.$thisvui.events.common.input, newValue);
      }
    }
  },
  methods: {
    /**
     * Creates the field input with controls
     */
    createInput(architect) {
      let root = architect.createDiv(this.getWrapperCss.getClasses());
      root.setStyles(this.getWrapperCss.getStyles());
      let control = architect.createDiv(this.getControlClass); // The control element

      this.createIcon(root, this.iconPosition.left);
      // Creating the html input element
      let input = architect.createInput(this.getInputClass);
      input.setId(this.id);
      let inputAttrs = {
        placeholder: this.placeholder,
        value: this.formattedValue,
        disabled: this.disabled,
        validationScope: this.validationScope,
        type: this.type,
        readonly: this.readonly,
        min: this.min,
        max: this.max
      };
      input.value(this.formattedValue);
      input.setAttrs(inputAttrs);
      input.addAttr(
        "maxlength",
        this.maxLength,
        this.isNotEmpty(this.maxLength)
      );
      input.setRef("inputField");

      // Handling events
      input.addListeners(this.$listeners);
      input.addChange(this.onChange);
      input.addInput(this.onInput);
      input.addFocus(this.onFocus);
      input.addBlur(this.onBlur);
      input.addEvent("keypress", this.allowOnlyNumber, this.numeric);
      control.addChild(input);

      let labelParent = this.modern ? control : architect;
      this.createLabel(labelParent);

      root.addChild(control);
      this.createIcon(root, this.iconPosition.right);
      this.createStateIcon(root);
      this.createErrorHelpers(root);
      architect.addChild(root);
    }
  },
  render: function(h) {
    let root = createDiv(h, this.getContainerClass);
    this.createInput(root);
    return root.create();
  }
};
