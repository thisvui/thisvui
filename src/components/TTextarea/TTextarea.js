import inputs from "../../mixins/inputs";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-textarea",
  mixins: [inputs],
  props: {
    value: {
      type: [String, Number]
    },
    rows: {
      type: Number
    },
    cols: {
      type: Number
    }
  },
  methods: {
    /**
     * Creates the field input section
     */
    createTextarea(architect) {
      let root = architect.createDiv(this.getWrapperCss.getClasses());
      root.setStyles(this.getWrapperCss.getStyles());
      let control = architect.createDiv(this.getControlClass); // The control element
      control.addClass("align-items-start");

      this.createIcon(root, this.iconPosition.left, "is-textarea");
      // Creating the html input element
      let textarea = architect.createElement("textarea", this.getTextareaClass);
      textarea.setId(this.id);
      let textareaAttrs = {
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
      textarea.value(this.value);
      textarea.setAttrs(textareaAttrs);
      textarea.addAttr(
        "maxlength",
        this.maxLength,
        this.isNotEmpty(this.maxLength)
      );
      textarea.setRef("inputField");

      // Handling events
      textarea.addListeners(this.$listeners);
      textarea.addChange(this.onChange);
      textarea.addInput(this.onInput);
      textarea.addFocus(this.onFocus);
      textarea.addBlur(this.onBlur);
      textarea.addEvent("keypress", this.allowOnlyNumber, this.numeric);
      control.addChild(textarea);

      let labelParent = this.classic ? architect : control;
      this.createLabel(labelParent, { cssClasses: "is-textarea" });
      root.addChild(control);
      this.createIcon(root, this.iconPosition.right, "is-textarea");
      this.createStateIcon(root);
      this.createErrorHelpers(root);
      architect.addChild(root);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getContainerClass);
    this.createTextarea(root);
    return root.create();
  }
};
