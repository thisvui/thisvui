import utils from "../../utils/utils";
import input from "../../mixins/input";
import alignment from "../../mixins/alignment";

import CssArchitect from "../../utils/css-architect";
import ElementArchitect from "../../utils/element-architect";

export default {
  name: "t-autocomplete",
  mixins: [input, alignment],
  props: {
    items: {
      type: Array,
      default: () => []
    },
    isAsync: {
      type: Boolean,
      required: false,
      default: false
    },
    serverSide: {
      type: Boolean,
      required: false,
      default: false
    },
    customTemplate: {
      type: Boolean,
      required: false,
      default: false
    },
    filterMethod: {
      type: Function,
      required: false
    },
    display: {
      type: String
    },
    initialValue: {
      type: String
    },
    val: {
      type: String
    },
    height: {
      type: String,
      default: "270"
    },
    resultsClass: {
      type: String
    },
    resultClass: {
      type: String
    },
    noResultsText: {
      type: "No result available"
    }
  },
  data() {
    return {
      isOpen: false,
      results: [],
      search: "",
      selectedValue: null,
      isAutocompleteLoading: false,
      arrowCounter: -1
    };
  },
  watch: {
    /**
     * Once the items content changes, it means the parent component
     * provided the needed data
     */
    items: function(value, oldValue) {
      // we want to make sure we only do this when it's an async request
      if (this.isAsync) {
        this.results = value;
        this.isOpen = true;
        this.isAutocompleteLoading = false;
      }
    },
    /**
     * Opens the result container when search keyword changes
     */
    search: function(value, oldValue) {
      // we want to make sure we only do this when it's an async request
      if (this.isAsync) {
        this.results = value;
        this.isOpen = true;
        this.isAutocompleteLoading = false;
      }
    }
  },
  computed: {
    /**
     * Dynamically build the css classes for the autocomplete container element
     * @returns { A String with the chained css classes }
     */
    getAutocompleteContainerClass: function() {
      const cssArchitect = new CssArchitect("field t-autocomplete");
      cssArchitect.addClass(
        this.containerClass,
        this.containerClass !== undefined
      );
      cssArchitect.addClass(this.getSyntaxModifiers);
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass(this.getAlignmentModifiers);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the autocomplete results container
     * @returns { A String with the chained css classes }
     */
    getAutocompleteResultsClass: function() {
      const cssArchitect = new CssArchitect("t-autocomplete-results");
      cssArchitect.isAbsolute().isFullwidth();
      cssArchitect.addClass(this.resultsClass, this.resultsClass !== undefined);
      this.colorize(cssArchitect, "border", true);
      cssArchitect.addClass(this.colorModifier, this.hasColorModifier);
      return cssArchitect.getClasses();
    },
    getClearIconClass: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass(this.getColorsModifiers);
      cssArchitect.addClass("is-radiusless is-absolute");
      return cssArchitect.getClasses();
    },
    getClearIconStyles: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addStyle("border-left", "none");
      return cssArchitect.getStyles();
    },
    getAutocompleteContainerStyles: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addStyle("max-height", `${this.height}px`, this.height);
      return cssArchitect.getStyles();
    },
    isPrimitive() {
      let isString = this.items.every(function(i) {
        return typeof i === "string";
      });
      let isNumeric = this.items.every(function(i) {
        return typeof i === "number";
      });
      let isBoolean = this.items.every(function(i) {
        return typeof i === "boolean";
      });
      return isString || isNumeric || isBoolean;
    },
    showClearIcon: function() {
      return this.selectedValue && this.selectedValue !== "";
    }
  },
  methods: {
    /**
     * Dynamically build the css classes for each individual result item
     * @returns { A String with the chained css classes }
     */
    getAutocompleteResultClass: function(isActive = false) {
      const cssArchitect = new CssArchitect("t-autocomplete-result");
      cssArchitect.addClass(this.resultClass, this.resultClass !== undefined);
      this.colorize(cssArchitect, "bg-hover", true);
      cssArchitect.addClass("has-bg-color", isActive);
      cssArchitect.addClass(this.colorModifier, this.hasColorModifier);
      return cssArchitect.getClasses();
    },
    /**
     * Executed on input
     */
    onInput(event) {
      // Let's warn the parent that a change was made
      this.search = event.target.value;
      this.validateOnEvent("input");

      // Is the data given by an outside ajax request?
      if (this.isAsync) {
        this.isAutocompleteLoading = true;
      } else {
        // Data is sync, we can search our flat array
        this.filterResults();
        this.isOpen = true;
      }
    },
    empty() {
      this.validateOnEvent("input");
      this.$refs.inputField.value = "";
      this.search = "";
      this.selectedValue = null;
      this.$emit(this.$thisvui.events.common.input, this.selectedValue);
      this.isOpen = false;
    },
    setSelected() {
      if (this.selectedValue) {
        this.$refs.inputField.value =
          this.display === undefined
            ? this.selectedValue
            : this.selectedValue[this.display];
        this.search =
          this.display === undefined
            ? this.selectedValue
            : this.selectedValue[this.display];
        this.$emit(this.$thisvui.events.common.input, this.selectedValue);
      } else {
        this.empty();
      }
    },
    /**
     * Returns the autocomplete result
     */
    getAutocompleteResult: function(result) {
      return this.display === undefined ? result : result[this.display];
    },
    /**
     * Sets the autocomplete result. If display and value are set means the item is an complex object
     */
    setAutocompleteResult(result) {
      this.selectedValue = result;
      this.isOpen = false;
      this.setSelected();
    },
    /**
     * Filter results matching the search keyword
     */
    async filterResults() {
      let match = [];

      if (this.serverSide && !this.filterMethod)
        throw new Error(
          "You should provide a filter function when server side is active"
        );
      // If server side is active, executes the filter method
      if (this.serverSide) {
        match = await this.filterMethod(this.search);
      } else {
        for (let i = 0; i < this.items.length; i++) {
          let item =
            this.display !== undefined
              ? this.items[i][this.display]
              : this.items[i];
          if (typeof item === "number") {
            item = item.toString();
          }
          if (item.toLowerCase().includes(this.search.toLowerCase())) {
            match.push(this.items[i]);
          }
        }
      }
      this.results = match;
    },
    filter(a, display) {
      let match = [];
      for (let i = 0; i < this.items.length; i++) {
        let item = display !== undefined ? a[i][display] : a[i];
        if (item.toLowerCase() === this.search.toLowerCase()) {
          match.push(a[i]);
        }
      }
      return match;
    },
    fixScrolling() {
      const liHeight = this.$refs.results.children[this.arrowCounter]
        .clientHeight;
      this.$refs.results.scrollTop = liHeight * this.arrowCounter;
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length - 1) {
        this.arrowCounter = this.arrowCounter + 1;
        this.fixScrolling();
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
        this.fixScrolling();
      }
    },
    onEnter() {
      this.setAutocompleteResult(this.results[this.arrowCounter]);
      this.arrowCounter = -1;
    },
    onFocus(evt) {
      if (this.search !== undefined && this.search !== "") {
        this.isOpen = true;
      }
    },
    /**
     * Close the results container when clicked outside
     */
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
        this.setSelected();
      }
    },
    /**
     * Creates the clear icon
     */
    createClearIcon(architect) {
      // Creating the clear icon for the input
      if (this.showClearIcon) {
        let clearIcon = architect.createButton();
        clearIcon.addProp("icon", this.$thisvui.icons.remove);
        clearIcon.addProp("targetClass", this.getClearIconClass);
        clearIcon.addProp("iconClass", this.getColorsModifiers);
        clearIcon.addProp("isOutlined", true);
        clearIcon.setStyles(this.getClearIconStyles);
        clearIcon.addEvent("click", this.empty);
        architect.addChild(clearIcon, this.icon);
      }
    },
    /**
     * Creates the options
     */
    createResults(architect) {
      let results = architect.createUl(this.getAutocompleteResultsClass);
      results.setStyles(this.getAutocompleteContainerStyles);
      results.setRef("results");
      let loading = architect.createLi("loading");

      results.addChild(loading, this.isAutocompleteLoading);
      if (!this.results || this.results.length === 0) {
        let emptyResults = architect.createLi("loading");
        emptyResults.addDomProp("innerHTML", this.noResultsText);
        results.addChild(emptyResults);
      } else {
        for (let index in this.results) {
          let result = this.results[index];

          let resultEl = architect.createLi(
            this.getAutocompleteResultClass(index == this.arrowCounter)
          );
          resultEl.setKey(index);
          resultEl.addEvent("click", () => {
            this.setAutocompleteResult(result);
          });

          if (!this.customTemplate) {
            let defaultContent = architect.createSpan();
            defaultContent.addDomProp(
              "innerHTML",
              this.getAutocompleteResult(result)
            );
            resultEl.addChild(defaultContent);
          } else {
            resultEl.setChildren(
              this.$scopedSlots.default({
                item: result
              })
            );
          }

          results.addChild(resultEl);
        }
      }
      architect.addChild(results, this.isOpen);
    },
    /**
     * Creates the input element
     */
    createInput(architect) {
      let root = architect.createDiv("field-body");
      let field = architect.createDiv("field");
      let control = architect.createDiv(this.getControlClass); // The control element

      // Creating the html input element
      let input = architect.createInput(this.getInputClass);
      input.addClass("is-radiusless is-shadowless");
      input.setId(this.id);
      let inputAttrs = {
        placeholder: this.placeholder,
        value: this.search,
        disabled: this.disabled,
        validationScope: this.validationScope,
        type: this.type,
        readonly: this.readonly,
        min: this.min,
        max: this.max
      };
      input.value(this.search);
      input.setAttrs(inputAttrs);
      input.setRef("inputField");
      input.addEvent("change", this.onChange);
      input.addEvent("input", this.onInput);
      input.addEvent("blur", this.onBlur);
      input.addEvent("focus", this.onFocus);

      input.addKeydown({
        key: architect.keycode.downArrow,
        handler: this.onArrowDown
      });
      input.addKeydown({
        key: architect.keycode.upArrow,
        handler: this.onArrowUp
      });
      input.addKeydown({
        key: architect.keycode.enter,
        handler: this.onEnter
      });
      input.addKeydown({
        key: architect.keycode.delete,
        handler: this.empty
      });
      control.addChild(input);

      this.createIcons(control);
      this.createErrorHelpers(control);
      this.createClearIcon(control);

      field.addChild(control);
      root.addChild(field);

      architect.addChild(root);
    }
  },
  render: function(h) {
    let root = new ElementArchitect(
      h,
      "div",
      this.getAutocompleteContainerClass
    );

    this.createLabel(root);
    this.createInput(root);
    this.createResults(root);

    return root.create();
  },
  mounted() {
    if (utils.check.notEmpty(this.initialValue)) {
      this.search = this.initialValue;
    }
    document.addEventListener("click", this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener("click", this.handleClickOutside);
  }
};
