/**
 * Helper class for chaining css classes dynamically
 */
export default class CssArchitect {
  constructor(mainClass) {
    this.mainClass = mainClass;
    this.classes = [];
    this.styles = [];
    if (this.mainClass) {
      this.classes.push(this.mainClass);
    }
  }

  /**
   * Add class value to the array
   * @param cssClass
   * @param conditionStatement
   * @param unlessClass
   */
  addClass(cssClass, condition, unlessClass = false) {
    let conditionStatement = condition !== undefined ? condition : true;
    if (cssClass !== undefined && conditionStatement) {
      this.classes.push(cssClass);
    } else if (unlessClass) {
      this.classes.push(unlessClass);
    }
  }

  /**
   * Merge array of classes with the main classes array
   * @param cssClasses
   * @param condition
   */
  addClasses(cssClasses, condition) {
    let conditionStatement = condition !== undefined ? condition : true;
    if (cssClasses !== undefined && conditionStatement) {
      this.classes = [...this.classes, ...cssClasses];
    }
  }

  /**
   * Add style value to the array
   * @param cssStyle
   * @param conditionStatement
   * @param unlessStyle
   */
  addStyle(name, value, conditionStatement = true) {
    if (name !== undefined && value !== undefined && conditionStatement) {
      let cssStyle = `${name}: ${value}`;
      this.styles.push(cssStyle);
    }
  }

  /**
   * Merge array of styles with the main styles array
   * @param cssStyles
   * @param condition
   */
  addStyles(cssStyles, condition) {
    let conditionStatement = condition !== undefined ? condition : true;
    if (cssStyles !== undefined && conditionStatement) {
      this.styles = [...this.styles, ...cssStyles];
    }
  }

  /**
   * Returns a String of the chained css classes
   * @returns {string}
   */
  getClasses() {
    let resultClass = this.classes.join(" ");
    return resultClass.trim();
  }

  /**
   * Returns a String of the chained css styles
   * @returns {string}
   */
  getStyles() {
    let resultStyles = this.styles.join("; ");
    return resultStyles.trim();
  }

  isString(obj) {
    if (obj === undefined || obj === null) {
      return false;
    }
    let toString = Object.prototype.toString;
    return toString.call(obj) == "[object String]";
  }

  isNumber(n) {
    if (n === undefined || n === null) {
      return false;
    }
    return !isNaN(parseFloat(n)) && !isNaN(n - 0);
  }

  /**
   * Attach a unit if param is a valid number. If not return the string.
   * @returns {string}
   */
  addUnitOrString(number, unit = "px") {
    if (this.isString(number)) {
      return number;
    }
    return this.addUnit(number, unit);
  }

  /**
   * Attach a unit to number value
   * @returns {string}
   */
  addUnit(number, unit = "px") {
    if (number !== undefined) {
      if (!this.isNumber(number)) {
        throw new Error(
          `To attach a ${unit} unit value must be a valid number`
        );
      }
      return `${number}${unit}`;
    }
  }

  /**
   * Attach px unit to int value
   * @returns {string}
   */
  addPx(number) {
    return this.addUnitOrString(number);
  }

  /**
   * Attach em unit to int value
   * @returns {string}
   */
  addEm(number) {
    return this.addUnitOrString(number, "em");
  }

  /**
   * Attach percentage unit to int value
   * @returns {string}
   */
  addPercent(number) {
    return this.addUnitOrString(number, "%");
  }

  getClassesArray() {
    return this.classes;
  }

  isAbsolute() {
    this.addClass("is-absolute");
    return this;
  }

  isRelative() {
    this.addClass("is-relative");
    return this;
  }

  isFullwidth() {
    this.addClass("is-fullwidth");
    return this;
  }

  isFullheight() {
    this.addClass("is-fullheight");
    return this;
  }

  isCentered() {
    this.addClass("is-centered");
    return this;
  }

  flexible(config = {}) {
      let {
        direction = "row",
        flexWrap = false,
        alignItems = false,
        justifyContent = false,
        alignSelf = false,
        alignContent = false,
        condition = true
      } = config;
    if(condition) {
      this.addClass(`t-flex is-${direction}`);
      this.addClass("flex-wrap", flexWrap);
      this.addStyle("--align-items", alignItems, alignItems);
      this.addStyle("--align-self", alignSelf, alignSelf);
      this.addStyle("--align-content", alignContent, alignContent);
      this.addStyle("--justify-content", justifyContent, justifyContent);
    }
    return this;
  }

  isColored({ inverted = false } = {}) {
    this.addClass(`colored`);
    this.addClass(`inverted`, inverted);
  }
}
