import input from "../../mixins/input";
import utils from "../../utils/utils";
import TIcon from "../TIcon/TIcon";

import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-textarea",
  components: { TIcon },
  mixins: [input],
  props: {
    value: {
      type: String
    },
    rows: {
      type: Number
    },
    cols: {
      type: Number
    }
  },
  methods: {
    onInput() {
      let value = this.$refs.inputField.value;
      this.validateOnEvent("input");
      if (this.transformValue && utils.check.notEmpty(this.transform)) {
        value = utils.text.transform(value, this.transform);
      }
      this.$emit(this.$thisvui.events.common.input, value);
    },
    /**
     * Creates the field input section
     */
    createTextarea(architect) {
      let root = architect.createDiv("field-body");
      let field = architect.createDiv("field");
      let control = architect.createDiv(this.getControlClass); // The control element

      // Creating the html input element
      let input = architect.createElement("textarea", this.getTextareaClass);
      input.setId(this.id);
      let inputProps = {
        placeholder: this.placeholder,
        value: this.value,
        disabled: this.disabled,
        validationScope: this.validationScope,
        readonly: this.readonly,
        rows: this.rows,
        cols: this.cols,
        min: this.min,
        max: this.max
      };
      input.setProps(inputProps);
      input.setRef("inputField");
      input.addEvent("change", this.onChange);
      input.addEvent("input", this.onInput);
      input.addEvent("blur", this.onBlur);
      input.addEvent("keyup", this.onKeyup);
      control.addChild(input);

      this.createIcons(control);
      this.createErrorHelpers(control);

      field.addChild(control);
      root.addChild(field);

      architect.addChild(root);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getContainerClass);

    this.createLabel(root);
    this.createTextarea(root);

    return root.create();
  }
};
