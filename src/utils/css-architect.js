/**
 * Helper class for chaining css classes dynamically
 */
export default class CssArchitect {
  constructor(mainClass) {
    this.mainClass = mainClass;
    this.classes = [];
    this.styles = [];
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
   * Returns a String of the chained css classes
   * @returns {string}
   */
  getClasses() {
    if (this.mainClass) {
      this.classes.push(this.mainClass);
    }
    let resultClass = this.classes.join(" ");
    return resultClass.trim();
  }

  /**
   * Returns a String of the chained css styles
   * @returns {string}
   */
  getStyles() {
    let resultClass = this.styles.join("; ");
    return resultClass.trim();
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

  isFlexible(
    direction = "row",
    alignItems = false,
    justifyContent = false,
    alignSelf = false,
    alignContent = false
  ) {
    this.addClass(`t-flex is-${direction}`);
    this.addStyle("--align-items", alignItems, alignItems);
    this.addStyle("--align-self", alignSelf, alignSelf);
    this.addStyle("--align-content", alignContent, alignContent);
    this.addStyle("--justify-content", justifyContent, justifyContent);
    return this;
  }
}
