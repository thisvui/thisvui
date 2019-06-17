/**
 * Helper class for building elements dynamically
 */
export default class ElementArchitect {
  constructor(createFunction, type, classes) {
    this.createFunction = createFunction;
    this.type = type;
    this.classes = classes;
    this.styles = [];
    this.children = [];
    this.attrs = {};
    this.props = {};
  }

  /**
   * Add class value to the array
   * @param cssClass
   * @param conditionStatement
   * @param unlessClass
   */
  setClasses(classes) {
    this.classes = classes;
    return this;
  }

  setStyles(styles) {
    this.styles = styles;
    return this;
  }

  setId(id) {
    if (id) {
      this.addAttr("id", id);
    }
    return this;
  }

  setAttrs(attrs) {
    if (attrs) {
      this.attrs = attrs;
    }
    return this;
  }

  addAttr(name, value, conditionStatement = true) {
    if (name !== undefined && value !== undefined && conditionStatement) {
      this.attrs[name] = value;
    }
    return this;
  }

  setProps(props) {
    if (props) {
      this.props = props;
    }
    return this;
  }

  addProp(name, value, conditionStatement = true) {
    if (name !== undefined && value !== undefined && conditionStatement) {
      this.props[name] = value;
    }
    return this;
  }

  setSlot(slot) {
    this.slot = slot;
    return this;
  }

  setChildren(children) {
    if (children) {
      this.children = children;
    }
    return this;
  }

  addChild(child, conditionStatement = true) {
    if (child && conditionStatement) {
      this.children.push(child.create());
    }
    return this;
  }

  /**
   * Returns a String of the chained css classes
   * @returns {string}
   */
  create() {
    let element = {};
    if (this.classes) {
      element.class = this.classes;
    }
    if (this.attrs) {
      element.attrs = this.attrs;
    }
    if (this.props) {
      element.props = this.props;
    }
    if (this.styles) {
      element.style = this.styles;
    }
    if (this.slot) {
      element.slot = this.slot;
    }
    return this.createFunction(this.type, element, this.children);
  }

  createDiv(classes) {
    return new ElementArchitect(this.createFunction, "div", classes);
  }

  createSpan(classes) {
    return new ElementArchitect(this.createFunction, "span", classes);
  }

  createImg(classes) {
    return new ElementArchitect(this.createFunction, "img", classes);
  }
}
