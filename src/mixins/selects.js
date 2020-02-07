import CssArchitect from "../utils/css-architect";

export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    customTemplate: {
      type: Boolean,
      required: false,
      default: false
    },
    selectable: {
      type: Boolean,
      required: false,
      default: true
    },
    display: {
      type: String
    },
    value: {
      type: [String, Number, Object]
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
      type: String,
      default: "No results found"
    }
  },
  data() {
    return {
      isOpen: false,
      results: this.items,
      search: "",
      selectedValue: null,
      isResultsLoading: false,
      arrowCounter: -1
    };
  },
  computed: {
    /**
     * Dynamically build the css classes for the container element
     * @returns { A String with the chained css classes }
     */
    getSelectContainerClass: function() {
      const cssArchitect = new CssArchitect("t-select group");
      cssArchitect.addClass(
        this.containerClass,
        this.containerClass !== undefined
      );
      cssArchitect.addClass(this.getSyntaxModifiers);
      cssArchitect.addClass(this.getThemeModifiers);
      cssArchitect.addClass(this.getAlignmentModifiers);
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the results
     * @returns { A String with the chained css classes }
     */
    getResultsClass: function() {
      const cssArchitect = new CssArchitect("t-select__results");
      cssArchitect.addClass("opened", this.isOpen);
      cssArchitect.isAbsolute();
      return cssArchitect.getClasses();
    },
    /**
     * Dynamically build the css classes for the results content
     * @returns { A String with the chained css classes }
     */
    getResultsContentClass: function() {
      const cssArchitect = new CssArchitect(
        "t-select__results__content marginless"
      );
      cssArchitect.isAbsolute().isFullwidth();
      cssArchitect.addClass(this.resultsClass, this.resultsClass !== undefined);
      cssArchitect.addClass("bordered");
      cssArchitect.addClass(this.themeModifier, this.hasThemeModifier);
      return cssArchitect.getClasses();
    },
    getClearIconClass: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addClass("colored");
      cssArchitect.addClass(this.themeModifier, this.hasThemeModifier);
      cssArchitect.addClass("cursor-pointer");
      return cssArchitect.getClasses();
    },
    getArrowClass: function() {
      const cssArchitect = new CssArchitect("arrow");
      cssArchitect.addClass("bordered");
      cssArchitect.addClass(this.themeModifier, this.hasThemeModifier);
      return cssArchitect.getClasses();
    },
    getContainerStyles: function() {
      const cssArchitect = new CssArchitect();
      cssArchitect.addStyle("max-height", `${this.height}px`, this.isOpen);
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
      return this.isNotEmpty(this.selectedValue) && !this.disabled;
    }
  },
  methods: {
    /**
     * Dynamically build the css classes for each individual result item
     * @returns { A String with the chained css classes }
     */
    getResultClass: function(isActive = false) {
      const cssArchitect = new CssArchitect("t-select__result");
      cssArchitect.addClass("hovered", this.selectable);
      cssArchitect.addClass("filled", isActive);
      cssArchitect.addClass(this.themeModifier, this.hasThemeModifier);
      cssArchitect.addClass(this.resultClass, this.resultClass !== undefined);
      return cssArchitect.getClasses();
    },
    /**
     * Returns the result
     */
    getResult: function(result) {
      return this.display === undefined ? result : result[this.display];
    },
    /**
     * Sets the result. If display and value are set means the item is an complex object
     */
    setResult(result) {
      this.selectedValue = result;
      this.isOpen = false;
      this.setSelected();
    },
    empty() {
      if (this.$refs.inputField) {
        this.$refs.inputField.value = "";
        this.search = "";
        this.selectedValue = null;
        this.hasValue = false;
        this.$emit(this.$thisvui.events.common.input, this.selectedValue);
        this.$emit(this.$thisvui.events.common.change, this.selectedValue);
        this.validateOnEvent("input");
      }
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
        this.$emit(this.$thisvui.events.common.change, this.selectedValue);
        this.validateOnEvent("input");
        this.hasValue = true;
      } else {
        this.empty();
      }
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
      this.setResult(this.results[this.arrowCounter]);
      this.arrowCounter = -1;
    },
    /**
     * Creates the clear icon
     */
    createClearIcon(architect, small = true) {
      if (this.showClearIcon) {
        let clearIconWrapper = architect.createA();
        let clearIcon = architect.createIcon(this.getClearIconClass);
        clearIcon.setRef("clear");
        clearIcon.addProp("icon", this.$thisvui.icons.remove);
        clearIcon.addProp("isSmall", small);
        clearIcon.addProp("preserveDefaults", !this.overrideDefaults);
        clearIconWrapper.addClick(this.empty);
        clearIconWrapper.addChild(clearIcon);
        architect.addChild(clearIconWrapper);
      }
    },
    /**
     * Creates the arrow icon
     */
    createArrow(architect) {
      let arrow = architect.createDiv(this.getArrowClass);
      architect.addChild(arrow, this.isOpen);
    },
    /**
     * Creates the results
     */
    createResults(architect) {
      let results = architect.createDiv(this.getResultsClass);
      this.createArrow(results);
      let content = architect.createUl(this.getResultsContentClass);
      content.setStyles(this.getContainerStyles);
      content.setRef("results");
      let loading = architect.createLi("loading");
      content.addChild(loading, this.isResultsLoading);

      if (!this.results || this.results.length === 0) {
        let emptyResults = architect.createLi("t-select__result empty");
        emptyResults.innerHTML(this.noResultsText);
        content.addChild(emptyResults);
      } else {
        for (let index in this.results) {
          let result = this.results[index];

          let resultEl = architect.createLi(
            this.getResultClass(index == this.arrowCounter)
          );
          resultEl.setKey(index);
          resultEl.addEvent(
            "click",
            () => {
              this.setResult(result);
            },
            this.selectable
          );

          if (!this.customTemplate) {
            let defaultContent = architect.createSpan();
            defaultContent.addDomProp("innerHTML", this.getResult(result));
            resultEl.addChild(defaultContent);
          } else {
            resultEl.setChildren(
              this.$scopedSlots["items"]({
                item: result
              })
            );
          }

          content.addChild(resultEl);
        }
      }
      results.addDirective({
        name: "overlay-box",
        value: {
          showOn: this.isOpen,
          target: `${this.id}-wrapper`
        }
      });

      results.addChild(content);
      architect.addChild(results);
    }
  }
};
