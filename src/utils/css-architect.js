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
  addClass(cssClass, condition) {
    let conditionStatement = condition !== undefined ? condition : true;
    if (cssClass !== undefined && conditionStatement) {
      this.classes.push(cssClass);
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
}
