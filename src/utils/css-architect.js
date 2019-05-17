/**
 * Helper class for chaining css classes dynamically
 */
export default class CssArchitect {
  constructor(mainClass) {
    this.mainClass = mainClass || "";
    this.classes = [];
  }

  /**
   * Add class value to the array
   * @param cssClass
   * @param condition
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
   * Returns a String of the chained css classes
   * @returns {string}
   */
  getClasses() {
    let resultClass = this.mainClass;
    for (let cssClass of this.classes) {
      if (cssClass) {
        resultClass += " " + cssClass;
      }
    }
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
    this.addClass(`align-items-${alignItems}`, alignItems !== false);
    this.addClass(
      `justify-content-${justifyContent}`,
      justifyContent !== false
    );
    this.addClass(`align-self-${alignSelf}`, alignSelf !== false);
    this.addClass(`align-content-${alignContent}`, alignContent !== false);
    return this;
  }
}
