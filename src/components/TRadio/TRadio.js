import input from "../../mixins/input";
import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-radio",
  mixins: [input],
  props: {
    items: {
      type: Array
    },
    isRtl: {
      type: Boolean,
      default: false
    },
    hasNoBorder: {
      type: Boolean,
      default: false
    },
    hasBackgroundColor: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the target element
     * @returns { A String with the chained css classes }
     */
    getClasses: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(this.getCheckradioClass);
      cssArchitect.addClass("is-rtl", this.isRtl);
      cssArchitect.addClass("has-no-border", this.hasNoBorder);
      cssArchitect.addClass("has-background-color", this.hasBackgroundColor);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the label element
     * @returns { A String with the chained css classes }
     */
    getLabelClass: function() {
      const cssArchitect = new CssArchitect("label has-text-left");
      cssArchitect.addClass(this.labelClass, this.labelClass !== undefined);
      return cssArchitect.getClasses();
    }
  },
  methods: {
    onInput(value) {
      this.validateOnEvent("input");
      this.$emit(this.$thisvui.events.common.input, value);
    },
    /**
     * Creates the radio inputs
     */
    createRadio(architect, id, item) {
      // Creating the html input element
      let input = architect.createInput(this.getClasses);
      input.setId(id);
      input.setKey(id);
      let inputAttrs = {
        placeholder: this.placeholder,
        value: item.value,
        checked: item.checked,
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
        this.onInput(item);
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
    createLabel(architect, id, item) {
      let label = architect.createLabel(this.getLabelClass);
      label.addAttr("for", id);
      label.addDomProp("innerHTML", item.label);

      architect.addChild(label);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(h, "div", this.getContainerClass);

    for (let index in this.items) {
      let item = this.items[index];
      this.createRadio(root, `${this.id}${index}`, item);
      this.createLabel(root, `${this.id}${index}`, item);
    }

    return root.create();
  }
};
